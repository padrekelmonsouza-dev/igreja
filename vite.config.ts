import { copyFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const HTACCESS = `# Igreja Ortodoxa Grega no Brasil — Hostinger / Apache

DirectorySlash Off

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteRule ^index\\.html$ - [L]
  RewriteRule ^vatican-article\\.php$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ index.html [L]
</IfModule>

ErrorDocument 404 /index.html

<IfModule mod_mime.c>
  AddType application/javascript .js
  AddType application/javascript .mjs
  AddType text/css .css
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(html|htm)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
  </FilesMatch>
  <FilesMatch "\\.js$">
    Header set Content-Type "application/javascript; charset=utf-8"
  </FilesMatch>
</IfModule>
`;

const LEGACY_BUNDLES = [
  "index-MRjjP1fG.js",
  "index-BI_quxwH.js",
  "index-B8rvoxVv.js",
  "index-B9yqSosC.js",
  "index-CJUOFLpA.js",
  "index-CN8TjWGy.js",
];

function isVaticanArticleUrl(href: string) {
  return /^https:\/\/www\.vaticannews\.va\/pt\/[A-Za-z0-9_./-]+\.html$/i.test(href);
}

function vaticanArticleDevProxy() {
  async function handle(req: { url?: string }, res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body: string) => void }, next: () => void) {
    const raw = req.url || "";
    if (!raw.startsWith("/vatican-article.php")) {
      next();
      return;
    }
    const href = new URL(raw, "http://localhost").searchParams.get("url") || "";
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (!isVaticanArticleUrl(href)) {
      res.statusCode = 400;
      res.end(JSON.stringify({ paragraphs: [] }));
      return;
    }
    try {
      const response = await fetch(href, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; IgrejaOrtodoxaGrega/1.0)" },
      });
      const html = response.ok ? await response.text() : "";
      res.end(JSON.stringify({ html }));
    } catch {
      res.statusCode = 502;
      res.end(JSON.stringify({ paragraphs: [] }));
    }
  }

  return {
    name: "vatican-article-dev-proxy",
    configureServer(server: { middlewares: { use: (fn: typeof handle) => void } }) {
      server.middlewares.use(handle);
    },
    configurePreviewServer(server: { middlewares: { use: (fn: typeof handle) => void } }) {
      server.middlewares.use(handle);
    },
  };
}

function hostingerSpaFallback() {
  return {
    name: "hostinger-spa-fallback",
    closeBundle() {
      const dist = resolve(process.cwd(), "dist");
      writeFileSync(resolve(dist, ".htaccess"), HTACCESS, "utf8");
      const index = resolve(dist, "index.html");
      if (existsSync(index)) {
        copyFileSync(index, resolve(dist, "404.html"));
      }
      const assets = resolve(dist, "assets");
      const main = readdirSync(assets).find((file) => /^index-.*\.js$/.test(file));
      if (!main) return;
      const stub = `import "/assets/${main}";\n`;
      for (const name of LEGACY_BUNDLES) {
        if (name === main) continue;
        writeFileSync(resolve(assets, name), stub, "utf8");
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), vaticanArticleDevProxy(), hostingerSpaFallback()],
  server: {
    proxy: {
      "/proxy/ecclesia": {
        target: "https://news.ecclesia.org.br",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/ecclesia/, ""),
      },
      "/proxy/vatican": {
        target: "https://www.vaticannews.va",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/vatican/, ""),
      },
    },
  },
  build: {
    target: ["es2019", "safari14", "ios14"],
    cssTarget: ["safari14"],
    modulePreload: { polyfill: false },
  },
});
