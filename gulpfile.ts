import style from './build/tasks/style';
import clean from './build/tasks/clean-directories';
import { series } from 'gulp';
import type { TaskFunction } from 'gulp';
import { rollupDts } from './build/tasks/rollup-dts';
import { apiExtractor } from './build/tasks/api-extractor';
import { bundleScript } from './build/tasks/bundle-script';
import { registerComponents } from './build/tasks/register-components';

const lib: TaskFunction = series(rollupDts, apiExtractor, bundleScript);
const doc: TaskFunction = series(registerComponents);

export { clean, style, lib, doc };
