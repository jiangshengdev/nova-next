## Linting toolchain notes

- `xo@1.2.3` still depends on `@eslint/plugin-kit@0.2.8` (all versions `<0.3.4` are affected by the ReDoS advisory). A `pnpm` override pins `@eslint/plugin-kit` to `^0.4.1` until `xo` ships a fixed release. Drop the override after upgrading `xo` to a version that natively consumes `@eslint/plugin-kit` ≥ 0.3.4.
- `pnpm run xo` remains available for consistency with the prior toolchain; the override is what keeps its dependency chain on a safe `@eslint/plugin-kit` version.
