import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  { path: "/", title: "在技术与想象之间持续探索", marker: "个人主页" },
  { path: "/career", title: "求职手记", marker: "把每一次准备" },
  { path: "/learning", title: "学习笔记", marker: "游戏客户端 C++ 成长路线" },
  { path: "/projects", title: "项目复盘", marker: "比结果更重要的" },
  { path: "/novels", title: "小说连载", marker: "在真实生活之外" },
];

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

for (const route of routes) {
  test(`renders ${route.path} as an independent page`, async () => {
    const response = await render(route.path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

    const html = await response.text();
    assert.ok(html.includes(route.title));
    assert.ok(html.includes(route.marker));
    assert.match(html, /href="\/career"/);
    assert.match(html, /href="\/learning"/);
    assert.match(html, /href="\/projects"/);
    assert.match(html, /href="\/novels"/);
  });
}

test("keeps the homepage focused on the personal profile", async () => {
  const response = await render("/");
  const html = await response.text();

  assert.match(html, /你好，我是 LemonLC/);
  assert.match(html, /关于我/);
  assert.match(html, /四类记录现在拥有各自的页面/);
  assert.doesNotMatch(html, /role="tablist"/);
});

test("keeps route data and navigation in one shared source", async () => {
  const [content, header] = await Promise.all([
    readFile(new URL("../app/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
  ]);

  for (const route of routes.slice(1)) {
    assert.match(content, new RegExp(`href: "${route.path}"`));
  }
  assert.match(header, /channels\.map/);
  assert.match(header, /aria-current/);
});
