import assert from "node:assert/strict";
import test from "node:test";

const { default: worker } = await import("../dist/server/index.js");
async function render(pathname) {
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} });
}
const routes = [
  ["/", "查看代表项目"], ["/projects", "个人作品"],
  ["/projects/gogoghost", "存档与单局流程"], ["/articles", "已发布文章"],
  ["/articles/cpp-client-overview", "客户端应用"], ["/articles/series", "学习与求职手记"],
  ["/articles/series/cpp-client", "正文待补充"], ["/articles/series/practice-notes", "作品集不是项目仓库"],
];

for (const [path, marker] of routes) {
  test(`renders ${path} with the three primary navigation entries`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(html.includes(marker), marker);
    const nav = html.match(/<nav aria-label="主导航">([\s\S]*?)<\/nav>/)?.[1];
    assert.ok(nav);
    assert.equal([...nav.matchAll(/<a\b/g)].length, 3);
    for (const href of ["/", "/projects", "/articles"]) assert.ok(nav.includes(`href="${href}"`));
    assert.equal([...nav.matchAll(/aria-current="page"/g)].length, 1);
  });
}

test("keeps project video and module chapters on the detail page", async () => {
  const list = await (await render("/projects")).text();
  const detail = await (await render("/projects/gogoghost")).text();
  assert.doesNotMatch(list, /<video/);
  assert.match(list, /href="\/projects\/gogoghost"/);
  assert.match(detail, /src="\/media\/gogoghost-demo.mp4"/);
  for (const id of ["combat", "interface", "save", "weapons", "hud"]) assert.ok(detail.includes(`id="${id}"`));
});

test("only published prose is offered in the article list", async () => {
  const html = await (await render("/articles")).text();
  assert.match(html, /href="\/articles\/cpp-client-overview"/);
  assert.doesNotMatch(html, /前端面试地图|三层笔记法|作品集不是项目仓库/);
  const article = await (await render("/articles/cpp-client-overview")).text();
  assert.match(article, /href="\/articles\/series\/cpp-client"/);
  assert.match(article, /href="\/articles\?category=cpp"/);
});

test("series topics have stable links without pretending to be finished articles", async () => {
  const html = await (await render("/articles/series/cpp-client")).text();
  for (let i = 1; i <= 20; i++) {
    const id = `topic-${String(i).padStart(2, "0")}`;
    assert.ok(html.includes(`id="${id}"`));
    assert.ok(html.includes(`href="#${id}"`));
  }
  assert.equal([...html.matchAll(/<span class="pending-label">正文待补充<\/span>/g)].length, 20);
});

test("keeps legacy links usable and rejects missing articles", async () => {
  const learning = await (await render("/learning")).text();
  const career = await (await render("/career")).text();
  assert.match(learning, /href="\/articles\/series\/cpp-client#cpp-roadmap"/);
  assert.match(career, /href="\/articles\?category=career"/);
  assert.equal((await render("/articles/not-a-published-article")).status, 404);
  assert.equal((await render("/novels")).status, 404);
});
