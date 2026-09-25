import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { REDIRECTS } from "./src/data/redirects";
import { ALL_INDEX_PATHS } from "./src/data/seo";

const HTACCESS = `# Igreja Ortodoxa Grega no Brasil — Hostinger / Apache
# Sem este arquivo, URLs como /catequese, /liturgia e /missoes
# devolvem o 404 da hospedagem em vez do aplicativo React.

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

ErrorDocument 404 /index.html
`;

function writeRouteIndexes(dist: string, index: string) {
  const paths = new Set([...ALL_INDEX_PATHS, ...Object.keys(REDIRECTS)]);
  for (const path of paths) {
    const clean = path.replace(/^\//, "").replace(/\/$/, "");
    if (!clean || clean.includes(".")) continue;
    const dir = resolve(dist, clean);
    mkdirSync(dir, { recursive: true });
    copyFileSync(index, resolve(dir, "index.html"));
  }
}

function hostingerSpaFallback() {
  return {
    name: "hostinger-spa-fallback",
    closeBundle() {
      const dist = resolve(process.cwd(), "dist");
      writeFileSync(resolve(dist, ".htaccess"), HTACCESS, "utf8");
      const index = resolve(dist, "index.html");
      if (!existsSync(index)) return;
      copyFileSync(index, resolve(dist, "404.html"));
      writeRouteIndexes(dist, index);
    },
  };
}

export default defineConfig({
  plugins: [react(), hostingerSpaFallback()],
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
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
