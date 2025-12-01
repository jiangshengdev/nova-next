## Overview
- Nova Next is a Vue 3 component library (TSX-first) exported from `src/index.ts`, currently shipping NovaButton/Input/ColorPicker/Dropdown/Environment plus language packs `enUS`/`zhCN`.
- `src/components/*` follow a strict layout: TSX implementation, `styles/index.css`, and Vitest suites under `__tests__/`; mirror this structure for any new component.
- Manual demos live in `playground/` (Vite app using `NovaEnvironment` to toggle `theme`, `language`, `dir`), while VitePress docs live in `docs/`; `issues/*.md` capture resolved design problems and should be consulted before changing behavior.

## Build & Run
- Use `pnpm dev` (tsdown --watch) while editing the library; it emits ESM + d.ts into `dist/` based on `tsdown.config.ts`.
- `pnpm play` runs the playground via Vite (alias `@ -> src` from `vite.config.ts`); `pnpm play:build` mimics CI by running `vue-tsc` then `vite build`.
- Styles are bundled separately: run `pnpm styles:build` to compile `src/styles/index.css` plus every `src/components/*/styles/index.css` into named files under `dist/styles/` (driven by `vite.styles.config.ts`).
- Docs/dev portals: `pnpm docs:dev` for VitePress editing, `pnpm docs:build`/`docs:preview` before publishing.
- Production release flow = `pnpm build && pnpm styles:build && pnpm gen:web-types` (automated via `prepublishOnly`).

## Architecture & Patterns
- Components are TSX functional/`defineComponent` hybrids that declare props via `ComponentPropsOptions`, set `inheritAttrs = false`, and manually spread native attrs (see `src/components/button/nova-button.tsx` + `input/nova-input.tsx`).
- Theming/localization flows through `NovaEnvironment` + `use-environment.ts`: props override injected refs, and every rendered root sets `data-nova-theme={themeRef.value}` so CSS variables under `src/styles/themes` activate correctly.
- Overlays rely on `NovaDropdown` + `use-dropdown.ts` (placement, focus trap, keyboard state). Pass `triggerAutoFocusRef`/`panelAutoFocusRef` through scoped slots the same way `NovaColorPicker` wires its trigger and panels.
- Pointer-heavy widgets reuse helpers in `src/uses/` (`use-move`, `use-touchmove`, `use-mousemove`), while color math sits in `src/components/color-picker/color.ts`; don’t reimplement drag math or HSVA conversions.
- CSS classes are namespaced (`nova-button-*`, `nova-dropdown-*`); keep sentinel elements like `.nova-trap` and `data-nova-theme`/`data-nova-trap` attributes untouched or update the related styles/tests simultaneously.
- Metadata tooling (`scripts/gen-component-meta.ts` → `temp/component-meta.json` → `scripts/gen-web-types.ts`) feeds IDE/web-types. New components must be registered in `components[]`, `customPropsMap`, and `customEventsDescMap` before running `pnpm gen:web-types`.

## Testing
- Unit tests use Vitest + jsdom (`pnpm test:unit`); config extends `vite.config.ts` so aliases/plugins match runtime, and `tests/setup.ts` disables Vue transition stubs for more faithful snapshots.
- Suites sit next to components under `__tests__/`; snapshot files live in `__snapshots__/`, and interaction specs (e.g., `button.behavior.test.tsx`) assert DOM attrs + events rather than only snapshots.
- Focus a single suite via `pnpm vitest src/components/button/__tests__/button.environment.test.tsx` or similar paths while iterating.
- Playwright (`pnpm test:e2e`) launches `pnpm play` on port 5173 locally and `pnpm preview`/4173 on CI; remember to `pnpm build && pnpm styles:build` before running in CI mode so dropdown/color-picker assets exist.

## Tooling & Quality
- Linting is two-step: `pnpm lint:oxlint` (Rust rules) plus `pnpm lint:eslint` (Vue + stylistic + @vitest). `pnpm lint` runs both via `npm-run-all`.
- Formatting uses Prettier 3 + `@prettier/plugin-oxc`; `pnpm format` targets docs/e2e/issues/playground/scripts/src/tests.
- Node 20.19+ or 22.12+ is required (see `package.json` engines); pnpm workspace locks `onlyBuiltDependencies` for deterministic installs.
- Use `pnpm type-check` (`vue-tsc --build`) before commits touching types—tsdown reuses the same tsconfig via `fromVite: true`, so type errors block dist builds.

## References & Tips
- The alias `@` always points to `src/`; keep imports absolute to satisfy Vite, tsdown, Vitest, and tooling like `vue-component-meta`.
- Language resources live in `src/environments/languages/*.ts` and must match the `Language` type (`src/types/language.ts`); UI copy (e.g., `NovaColorPicker`) reads from `environment.languageRef.value`.
- When clarifying requirements, review `issues/*.md` for historical context before diverging from current behavior, and update those docs if you change the contract.
