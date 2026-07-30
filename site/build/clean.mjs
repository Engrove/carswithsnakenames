import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const targets = [
  path.join(ROOT, 'dist'),
  path.join(ROOT, 'public-gen'),
  ...fs
    .readdirSync(path.join(ROOT, 'pages'), { withFileTypes: true })
    .filter((d) => d.name !== 'src')
    .map((d) => path.join(ROOT, 'pages', d.name)),
];

for (const target of targets) {
  fs.rmSync(target, { recursive: true, force: true });
  console.log(`  removed ${path.relative(ROOT, target)}`);
}
