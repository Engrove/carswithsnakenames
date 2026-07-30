import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

import { generate } from './site/build/generate.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const PAGES = path.join(here, 'pages');

/** Recursively collect every generated .html file so Vite treats them as MPA entries. */
function collectHtml(dir, found = []) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) collectHtml(full, found);
    else if (item.name.endsWith('.html')) found.push(full);
  }
  return found;
}

/**
 * Regenerate the whole site whenever data, templates or the generator itself
 * changes, then hard-reload the browser. The corpus is the source of truth;
 * the HTML is just its shadow.
 */
function ophidiaryPlugin() {
  return {
    name: 'ophidiary-generator',
    apply: 'serve',
    configureServer(server) {
      const watched = path.join(here, 'site');
      server.watcher.add(watched);
      let pending = null;
      server.watcher.on('all', (_event, file) => {
        if (!file.startsWith(watched)) return;
        clearTimeout(pending);
        pending = setTimeout(async () => {
          try {
            await generate({ mode: 'development' });
            server.ws.send({ type: 'full-reload', path: '*' });
            server.config.logger.info('  ❯ the ophidiary sheds its skin');
          } catch (err) {
            server.config.logger.error(`  ❯ moult failed: ${err.message}`);
          }
        }, 60);
      });
    },
  };
}

export default defineConfig(async ({ mode }) => {
  // Generation must happen before Rollup inputs are enumerated.
  await generate({ mode });

  const input = Object.fromEntries(
    collectHtml(PAGES).map((file) => [
      path.relative(PAGES, file).replace(/\.html$/, '').replace(/[\\/]/g, '__') || 'index',
      file,
    ]),
  );

  return {
    root: PAGES,
    publicDir: path.join(here, 'public-gen'),
    appType: 'mpa',
    base: '/',
    plugins: [ophidiaryPlugin()],
    server: { fs: { allow: [here] } },
    build: {
      outDir: path.join(here, 'dist'),
      emptyOutDir: true,
      cssCodeSplit: false,
      assetsInlineLimit: 2048,
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        input,
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
  };
});
