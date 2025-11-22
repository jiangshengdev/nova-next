import path from 'node:path';
import { spawn } from 'node:child_process';

export async function rollupDts() {
  const bin = path.join(
    process.cwd(),
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'vue-tsc.cmd' : 'vue-tsc'
  );

  await new Promise<void>((resolve, reject) => {
    const args = [
      '--project',
      'tsconfig.app.json',
      '--declaration',
      '--emitDeclarationOnly',
      '--outDir',
      'temp',
    ];

    const child = spawn(bin, args, {
      stdio: 'inherit',
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`vue-tsc exited with code ${code}`));
      }
    });

    child.on('error', reject);
  });
}
