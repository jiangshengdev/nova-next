import { build, BuildOptions, Plugin } from 'esbuild';
import { transformAsync } from '@babel/core';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

function vueJsxTransformPlugin(): Plugin {
  return {
    name: 'vue-jsx-transform',
    setup(build) {
      build.onLoad({ filter: /\.[tj]sx$/ }, async (args) => {
        const source = await readFile(args.path, 'utf8');
        const result = await transformAsync(source, {
          filename: args.path,
          babelrc: false,
          configFile: false,
          presets: [
            [
              '@babel/preset-typescript',
              { isTSX: true, allExtensions: true, allowDeclareFields: true },
            ],
          ],
          plugins: [['@vue/babel-plugin-jsx', { optimize: true }]],
          sourceMaps: build.initialOptions.sourcemap === 'external',
        });

        if (!result || !result.code) {
          return {
            contents: '',
            loader: 'js',
          };
        }

        return {
          contents: result.code,
          loader: 'js',
          resolveDir: path.dirname(args.path),
        };
      });
    },
  };
}

const config: BuildOptions = {
  entryPoints: ['./src/index.ts'],
  sourcemap: 'external',
  bundle: true,
  target: 'es2020',
  platform: 'browser',
  format: 'esm',
  external: ['vue', '@jiangshengdev/material-design-icons-vue-next'],
  plugins: [vueJsxTransformPlugin()],
};

function bundleEsm() {
  return new Promise<void>((resolve, reject) => {
    build({
      ...config,
      format: 'esm',
      outfile: './dist/index.esm.js',
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function bundleCjs() {
  return new Promise<void>((resolve, reject) => {
    build({
      ...config,
      format: 'cjs',
      outfile: './dist/index.js',
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function bundleScript() {
  try {
    await Promise.all([bundleEsm(), bundleCjs()]);
    console.log(`Bundle script completed successfully`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
