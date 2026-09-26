import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const HTACCESS = `# Igreja Ortodoxa Grega no Brasil — Hostinger / Apache
# Sem DirectorySlash, o iOS/Safari e o WhatsApp não caem no
# redirecionamento /pagina -> /pagina/ que deixa a tela em branco.

DirectorySlash Off

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ index.html [L]
</IfModule>

ErrorDocument 404 /index.html

<IfModule mod_mime.c>
  AddType application/javascript .js
  AddType application/javascript .mjs
  AddType text/css .css
</IfModule>
`;

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
    target: ["es2019", "safari14", "ios14"],
    cssTarget: ["safari14"],
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
