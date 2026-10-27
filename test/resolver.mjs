import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    const relativeTarget = specifier.slice(2);
    const resolvedPath = path.resolve(process.cwd(), 'src', relativeTarget);
    for (const ext of ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.js']) {
      const testPath = ext.startsWith('/') ? path.join(resolvedPath, ext.slice(1)) : resolvedPath + ext;
      if (fs.existsSync(testPath) && fs.statSync(testPath).isFile()) {
        return {
          shortCircuit: true,
          url: pathToFileURL(testPath).href
        };
      }
    }
  }

  try {
    return await nextResolve(specifier, context);
  } catch (err) {
    if ((err.code === 'ERR_MODULE_NOT_FOUND' || err.code === 'ERR_UNSUPPORTED_DIR_IMPORT') && context.parentURL) {
      const parentDir = path.dirname(fileURLToPath(context.parentURL));
      const targetPath = path.resolve(parentDir, specifier);
      for (const ext of ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.js']) {
        const testPath = ext.startsWith('/') ? path.join(targetPath, ext.slice(1)) : targetPath + ext;
        if (fs.existsSync(testPath) && fs.statSync(testPath).isFile()) {
          return {
            shortCircuit: true,
            url: pathToFileURL(testPath).href
          };
        }
      }
    }
    throw err;
  }
}

// Die Projektquellen (src/, next.config.ts) sind ES-Module ohne "type" in package.json; ohne festes
// Format rät Node je Datei und warnt (MODULE_TYPELESS_PACKAGE_JSON). node_modules bleibt unberührt.
const PROJEKT_URL = pathToFileURL(process.cwd() + path.sep).href;

export async function load(url, context, nextLoad) {
  if (url.startsWith(PROJEKT_URL) && !url.includes('/node_modules/') && !context.format) {
    if (url.endsWith('.ts')) return nextLoad(url, { ...context, format: 'module-typescript' });
    if (url.endsWith('.js')) return nextLoad(url, { ...context, format: 'module' });
  }
  return nextLoad(url, context);
}
