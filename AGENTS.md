# AGENTS.md — Portfolio Site Auto-Activation Rules

## How skills and agents MUST be used here

**Never wait for the user to type a slash command, a skill name, or "use skill X".**
The moment a prompt touches this website (any page, component, style, content, animation,
build, or bug), automatically:

1. Read this routing table below.
2. Load (`skill`) the matching skills **before** doing the work — pick the relevant ones only, usually 2–5, never all of them.
3. Do the work using those skills' guidance.
4. Verify the change (see Verification), then report which skills you auto-loaded and why.

If a prompt is about this repo in any way, it is in scope. If no rule below matches, use the
closest one, plus `coding-standards`.

## Project stack (context for every task)

- React 19 + TypeScript 5.8 + Vite 6, `react-router-dom` 7 pages
- Tailwind CSS 4 (via `@tailwindcss/vite`), styles in `src/index.css`
- Animation: `gsap` + `@gsap/react`, `motion` (framer), `@react-three/fiber` + `three`
- Icons: `lucide-react` · Data/content: `src/data.ts`
- Pages: `src/pages/*` · Shared UI: `src/components/*`
- Scripts: `npm run dev` (port 3000), `npm run lint` (tsc), `npm run build`
- Playwright MCP is available for live browser checks

## Skill routing table — auto-load these

| When the user asks about... | Auto-load |
|---|---|
| Any visual/UI change, layout, spacing, typography, colors, polish | `frontend-design-direction`, `make-interfaces-feel-better`, `design-system` |
| Adding/changing React components, state, hooks, routing, pages | `react-patterns`, `frontend-patterns` |
| Animations, transitions, scroll effects, GSAP/motion/3D scenes | `motion-foundations`, `motion-patterns` (then `motion-advanced` for drag/SVG/complex timelines) |
| Tailwind/CSS, theming, design tokens, inconsistent look | `design-system`, `frontend-design-direction` |
| Performance, slow renders, bundle size, jank | `react-performance` |
| Accessibility, keyboard, focus, ARIA, contrast | `accessibility`, `frontend-a11y` |
| Vite config, build errors, HMR, env vars, deps | `vite-patterns`, `error-handling` |
| TypeScript errors, type design, lint failures | `coding-standards`, `error-handling` |
| SEO, meta tags, `index.html`, `metadata.json`, sitemap | `seo` |
| Testing, verifying a change in the browser, screenshots | `browser-qa`, `e2e-testing` |
| Content/copywriting for the site (projects, bio, headings) | `article-writing`, `brand-voice` |
| Git commits, branches, PRs for this repo | `git-workflow` |
| Planning a larger feature before coding it | `intent-driven-development` |
| Anything else in this repo, unclear category | `coding-standards` + closest row above |
| Want to discover more matching skills | the matching `*-category-pointer` skill (e.g. `frontend-category-pointer`) |

## Agents — auto-use these

- **explore agent**: auto-dispatch for "where is X", "how does this work", or before touching
  a file you have not read. Do not read 10 files one by one in the main thread.
- **general agent**: auto-dispatch independent, parallelizable chunks (e.g. updating every
  page's header while you handle routing).
- Never ask the user whether to spawn an agent for clearly-mechanical parallel work.

## Verification (run automatically after any code change, no prompting)

1. `npm run lint` — must pass (TypeScript).
2. `npm run build` — must pass.
3. If UI output matters, use Playwright MCP: `npm run dev`, open `http://localhost:3000`,
   screenshot the affected page, and check for console errors and layout regressions.
4. State plainly what was verified; if something could not be verified, say so.

## Guardrails

- Do not install new dependencies when the stack already covers it (GSAP/motion/Tailwind in use).
- Do not restyle the whole site when only one component was asked about.
- Keep changes consistent with the existing look, naming, and file structure.
- `src/data.ts` holds content — edit data, not hardcoded strings in components.
- Never commit secrets; `.env.example` documents env vars.
