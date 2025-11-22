import prettier, { Options } from 'prettier';
import { resolve as resolvePath } from 'node:path';
import * as fs from 'node:fs/promises';
const prettierConfigPath = '../.prettierrc.json';

export async function format(
  content: string,
  userOptions: Options = { parser: 'typescript' }
) {
  const defaultOptionBuffer = await fs.readFile(
    resolvePath(__dirname, prettierConfigPath)
  );
  const defaultOptions = JSON.parse(defaultOptionBuffer.toString());
  const options = Object.assign({}, defaultOptions, userOptions);
  return prettier.format(content, options);
}
