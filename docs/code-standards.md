# Code Standards

## Scope

These standards reflect the current React/Vite codebase. Keep changes small, readable, and compatible with the existing JavaScript and Tailwind setup.

## Source Structure

| Location | Convention |
| --- | --- |
| `src/app.jsx` | Compose top-level page sections only. |
| `src/sections/` | Keep one default-exported page section per kebab-case file; re-export it from `src/sections/index.js`. |
| `src/components/` | Share presentational primitives used by multiple sections. |
| `src/data/` | Keep static content and external URLs centralized instead of duplicating them in components. |
| `src/styles.css` | Hold Tailwind import/theme tokens and global CSS only. |

## React and Interaction Rules

- Use function components and named imports consistent with the existing files.
- Keep UI state local when it serves one section, as the gallery's selected image does.
- Clean up browser listeners and intervals in `useEffect` return functions.
- Use `motion/react` for new Motion usage and honor user reduced-motion preferences.
- Give interactive controls an accessible name and retain visible `focus-visible` styles.
- Provide meaningful image `alt` text; use `loading="lazy"` for non-hero gallery and QR images.

## Styling Rules

- Prefer Tailwind utility classes for component styling.
- Reuse `section-shell`, display-font tokens, and the established warm color palette when appropriate.
- Preserve responsive breakpoints already used in the page (`sm` and `md`) unless the layout needs another verified breakpoint.
- Keep global CSS limited to rules that cannot sensibly live with a component.

## Verification

- Run `npm run build` after source changes.
- Check the page at narrow and desktop widths after layout or interaction changes.
- Test gallery open/close paths, including Escape, backdrop click, and the close button, when changing gallery behavior.

## References

- [Global styles](../src/styles.css)
- [Reusable motion components](../src/components/reveal.jsx)
- [Project scripts](../package.json)
