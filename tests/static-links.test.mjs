import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

test("exported Pages routes, chapter links and media resolve under the repository base path", async () => {
  const root = path.resolve("out");
  const files = (await readdir(root, { recursive: true })).filter((name) => name.endsWith(".html"));
  assert.ok(files.includes(path.join("projects", "gogoghost", "index.html")));
  for (const file of files) {
    if (file.includes("404")) continue;
    const html = (await readFile(path.join(root, file), "utf8")).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    const route = file.replaceAll(path.sep, "/").replace(/index\.html$/, "");
    const current = new URL(`/Lemon-vios/${route}`, "https://example.test");
    for (const match of html.matchAll(/(?:href|src|poster)="([^"<>]+)"/g)) {
      const url = new URL(match[1].replaceAll("&amp;", "&"), current);
      if (url.origin !== current.origin) continue;
      assert.ok(url.pathname.startsWith("/Lemon-vios/"), `${file}: missing basePath in ${match[1]}`);
      const relative = decodeURIComponent(url.pathname.slice("/Lemon-vios/".length));
      let target = path.join(root, relative);
      if (!path.extname(target)) target = path.join(target, "index.html");
      assert.ok((await stat(target)).isFile(), `${file}: missing target ${target}`);
      if (url.hash && target.endsWith(".html")) {
        const targetHtml = await readFile(target, "utf8");
        assert.ok(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${file}: missing anchor ${match[1]}`);
      }
    }
  }
});
