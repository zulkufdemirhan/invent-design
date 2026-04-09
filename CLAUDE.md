@AGENTS.md

---

# Project: Invent Design System

## Role & Quality Bar

You operate at the combined level of **Staff UX/UI Designer**, **UX Engineer**, and **Front-end Engineer**. Every screen, component, and feature you produce must be:

- **User-centered** — aligned with real user needs and domain-specific workflows
- **Domain-consistent** — respects industry patterns, terminology, and interaction standards
- **Functionally complete** — not just visually correct; all states (loading, empty, error, success, disabled) must be implemented
- **Accessible** — keyboard navigation, ARIA roles, color contrast, focus management
- **Visually polished** — consistent with the design system tokens and component library
- **End-to-end** — flows must be complete, not placeholders or wireframes

Never produce shallow layouts. Always include meaningful, domain-relevant data and labels. Take initiative and fill gaps using domain knowledge.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict mode) |
| UI Library | Ant Design 6 (antd) |
| Icons | FontAwesome 7 (`@fortawesome/react-fontawesome`) |
| Styling | Ant Design CSS-in-JS via `ConfigProvider` + custom design tokens |
| Testing | Vitest 4 + Storybook 10 (Playwright browser tests) |
| Path alias | `@/*` → `./src/*` |

**No Tailwind CSS.** All styling flows through Ant Design's token system and custom token files in `src/tokens/`.

---

## Design System — Figma

**Primary library:** `Cub Design System New - Variables`
**File Key:** `4QTeh40wExD0zXvxHeCHHC`

> RULE: Always use Cub Design System components first. Only fall back to Invent or Semantic UI Ant Design System libraries if no Cub equivalent exists.

### Component Resolution Order
1. `Cub Design System New - Variables` (primary)
2. `Invent - Cub Design System - Current`
3. `Semantic UI Ant Design System`

Do not re-scan or re-read the design system file. The component map in the global CLAUDE.md is the reference.

---

## Token System

All tokens live in `src/tokens/`. Always import tokens instead of hard-coding values.

| Token file | Exports | Use for |
|-----------|---------|---------|
| `colors.ts` | `themeColorsLight`, `themeColorsDark` | All color values |
| `typography.ts` | `fontFamily`, `fontWeights`, `fontSizes`, `lineHeights`, `textStyles` | All type styles |
| `spacing.ts` | `borderRadius`, `padding`, `margin` | All spacing and radius |
| `icons.ts` | Icon size tokens | Icon sizing |

Theme configuration is in `src/theme/antdTheme.ts`. Always wrap new page-level components in `ConfigProvider` with the appropriate theme.

---

## Component Conventions

### File Structure
```
src/components/ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.stories.tsx  # Storybook stories (required)
└── index.ts                   # Barrel export (named export only)
```

### Component Rules
- Functional React components with TypeScript only
- Props interface defined in the component file, named `ComponentNameProps`
- Extend Ant Design prop types where applicable (`extends AntXxxProps`)
- Named exports — no default exports
- Import from `@/tokens/` for any design values
- Import icons from `@fortawesome/react-fontawesome` + `@fortawesome/free-solid-svg-icons`

### Storybook Story Rules
- Every component must have a `.stories.tsx` file
- `meta` must include `tags: ['autodocs']`
- Include `argTypes` with appropriate control types
- Cover all meaningful visual states as named story exports

---

## Code Quality Rules

- Read `node_modules/next/dist/docs/` before writing any Next.js-specific code
- Do not add Tailwind classes — use Ant Design token props or inline styles with token values
- Do not hard-code colors, font sizes, spacing, or border radii — always use tokens
- Do not use `any` types — define proper interfaces
- Do not create new abstractions for one-time use — reuse existing components
- Do not add placeholder TODOs or incomplete implementations
- Validate only at system boundaries (user input, API calls) — trust internal logic
- All async operations must handle loading, error, and empty states

---

## Interaction & UX Standards

- Every interactive element must have hover, focus, active, and disabled states
- Form flows must include field validation, submission feedback, and error recovery
- Data tables must implement: sorting, filtering, empty state, loading skeleton, pagination
- Navigation must maintain active/selected state and support keyboard traversal
- Modals and drawers must trap focus, support Escape to close, and restore focus on close
- All user actions must provide immediate visual feedback (loading spinners, success toasts, etc.)

---

## Accessibility

- Semantic HTML elements over generic `div`s where possible
- All interactive elements must be keyboard accessible
- ARIA labels on icon-only buttons
- Color is never the sole conveyor of meaning
- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text

---

## File & Import Conventions

```typescript
// 1. React (if needed explicitly)
import React from 'react';

// 2. External libraries
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 3. Internal — components
import { SomeComponent } from '@/components/SomeComponent';

// 4. Internal — tokens/theme/lib
import { themeColorsLight } from '@/tokens/colors';
import { padding } from '@/tokens/spacing';
```
