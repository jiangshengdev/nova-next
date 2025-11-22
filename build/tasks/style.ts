import { access, mkdir } from 'node:fs/promises';
import { dest, series, src } from 'gulp';
import type { TaskFunction } from 'gulp';
import * as autoprefixer from 'autoprefixer';
import * as gulpPostcss from 'gulp-postcss';
import * as postcssImport from 'postcss-import';
import * as gulpRename from 'gulp-rename';
import * as postcssNested from 'postcss-nested';
import { globby } from 'globby';

const cssPath = './dist/css';

type GulpPostcss = typeof import('gulp-postcss');
type GulpRename = typeof import('gulp-rename');
type PostcssImportFactory = typeof import('postcss-import');
type AutoprefixerFactory = typeof import('autoprefixer');
type PostcssNestedFactory = typeof import('postcss-nested');

const interopDefault = <T>(mod: T) =>
  ((mod as unknown as { default?: unknown }).default ?? mod) as unknown;

const runPostcss = interopDefault(gulpPostcss) as GulpPostcss;
const renamePlugin = interopDefault(gulpRename) as GulpRename;
const atImport = interopDefault(postcssImport) as PostcssImportFactory;
const autoprefixerPlugin =
  interopDefault(autoprefixer) as AutoprefixerFactory;
const postcssNestedPlugin =
  interopDefault(postcssNested) as PostcssNestedFactory;
let ensureCssDirPromise: Promise<void> | null = null;

async function ensureCssDirectory(): Promise<void> {
  if (!ensureCssDirPromise) {
    ensureCssDirPromise = (async () => {
      try {
        await access(cssPath);
      } catch {
        await mkdir(cssPath, { recursive: true });
      }
    })();
  }

  await ensureCssDirPromise;
}

function component(inputPath: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = src(inputPath)
      .pipe(runPostcss([atImport(), autoprefixerPlugin(), postcssNestedPlugin()]))
      .pipe(renamePlugin(outputPath))
      .pipe(dest('.'));

    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

async function components() {
  await ensureCssDirectory();
  const files = await globby('src/components/*/styles/index.css');
  const list = files.map((file) => {
    const componentName = file.replace(/^.+components\/(.+)\/styles.+$/, '$1');
    return component(file, `./dist/css/${componentName}.css`);
  });

  await Promise.all(list);
}

async function bundle() {
  await ensureCssDirectory();
  await component('./src/styles/index.css', './dist/nova.css');
  await component('./src/styles/themes/index.css', './dist/css/themes.css');
}

const buildStyles: TaskFunction = series(components, bundle);

export default buildStyles;
