## Commands

Prefer `yarn` over `npm` for all commands.

```bash
# Dev server (demo app at localhost:5173)
yarn dev

# Build (compiles SCSS then TypeScript)
yarn build

# SCSS only
yarn compile:scss

# Clean dist/
yarn clean

# Publish to npm
yarn publish:npm

# Publish to GitHub Packages
yarn publish:github
```

No test suite exists. No linter configured.

## Architecture

Single-component library. Exports one default: `SleekScrollbar` (`src/index.tsx`).

**Component structure:**

- `__wrapper` — `overflow: hidden`, full height container
- `__content` — scrollable div with native scrollbar hidden (`scrollbar-width: none`)
- `__bar` — absolutely positioned custom scrollbar (left or right via `side` prop)
  - `__track` — full-height click target
  - `__thumb` — sized/positioned proportionally to scroll ratio

**Scroll mechanics:**

- `measureContent()` computes `clientHeight / scrollHeight` ratio → sets thumb height %; hides bar when ratio ≥ 1
- `handleScrollContent` updates `thumbEle.style.top` on every scroll event
- `handleClickTrack` maps click Y to scroll position
- `handleMouseDown` / `handleTouchStart` handle drag; listeners attach to `document`, clean up on mouseup/touchend

**`useResizeObserver`** (`src/hooks/useResizeObserver.ts`) — thin wrapper around `ResizeObserver`. Attached to both `contentRef` (inner div) and `contentContainerRef` (scrollable outer div) so `measureContent` fires whenever either dimension changes.

**CSS variables**

```css
--react-scrollify-thumb
--react-scrollify-thumb-hover
--react-scrollify-track
--react-scrollify-width
--react-scrollify-side
```

SCSS source: `src/styles/Scrollbar.scss` → compiled to `dist/styles/scrollbar.css`. The component imports `./styles/scrollbar.css` (compiled output), not the SCSS directly.

## Release workflow

PRs must target `dev`, not `master`. Merging `dev` → `master` triggers three workflows:

1. **package-publish** — builds and publishes to npm (OIDC trusted publisher) and GitHub Packages
2. **release-creator** — creates a GitHub release tagged with current `package.json` version
3. **version-bump** — bumps patch version in `dev` branch after merge, commits with `[skip ci]`

Requires `PAT_TOKEN` secret and `NPM_TOKEN` environment in repo settings.
