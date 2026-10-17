import * as esbuild from 'esbuild';
import fs from 'node:fs';

const watch = process.argv.includes('--watch');

const options = {
  entryPoints: ['frontend/src/app-root.js'],
  bundle: true,
  minify: !watch,
  sourcemap: true,
  format: 'esm',
  splitting: true,
  target: ['es2020'],
  outdir: 'frontend/dist',
  entryNames: '[name]',
  logLevel: 'info',
};

fs.rmSync('frontend/dist', { recursive: true, force: true });

const wa = 'node_modules/@awesome.me/webawesome/dist';
fs.cpSync(`${wa}/styles`, 'frontend/dist/webawesome/styles', { recursive: true });
if (fs.existsSync(`${wa}/assets`)) {
  fs.cpSync(`${wa}/assets`, 'frontend/dist/webawesome/assets', { recursive: true });
}

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
} else {
  await esbuild.build(options);
}