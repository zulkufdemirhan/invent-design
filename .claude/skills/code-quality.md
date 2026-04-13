# Skill: Code Quality

Applied on every code output, without exception.

---

## TypeScript

- `strict: true` enforced — no exceptions
- Never use `any` — define a proper interface or type
- Prefer `interface` over `type` for object shapes
- All prop interfaces are exported (enables reuse across files)
- Generic type parameters over casting: `useState<string>('')` not `useState('')`

---

## File Size Limits

| File type | Max lines |
|-----------|-----------|
| Page component (`page.tsx`) | 200 |
| Shared local component | 150 |
| Custom hook (`use*.ts`) | 100 |
| Config / data file (`*.config.ts`) | 100 |

**When a file exceeds its limit, split it immediately:**
- Extract sub-components to separate files in the same directory
- Extract state and data logic to a `use[ScreenName].ts` hook
- Extract static data (columns, mock rows, filter options) to a `[screenName].config.ts` file

---

## Component Rules

- **Named exports only** — never `export default`
- **One component per file** — sub-components go in their own file in the same directory
- **Never define a component inside another component** — extract it to a sibling file
- **Never prop drill deeper than 2 levels** — extract a React context or custom hook

---

## Import Order

```ts
// 1. React — only when hooks or types are needed explicitly
import { useState, useEffect, useMemo } from 'react';

// 2. External libraries
import { Button, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// 3. Internal DS components
import { KpiCard } from '@/components/KpiCard';
import { FilterBar } from '@/components/FilterBar';

// 4. Layouts
import { ListPageLayout } from '@/layouts';

// 5. Navigation config
import { primaryNavConfig } from '@/config/navigation';

// 6. Tokens
import { themeColorsLight } from '@/tokens/colors';
import { padding, borderRadius } from '@/tokens/spacing';
import { textStyles, fontSize } from '@/tokens/typography';
import { iconSize } from '@/tokens/icons';
```

---

## Styling

- No Tailwind — ever
- No hardcoded hex colors, pixel values, or font sizes
- No `!important`
- CSS-in-JS via `style={{}}` props using token variables only
- No global CSS mutations for page-level styling

---

## SOLID in Practice

| Principle | Rule |
|-----------|------|
| **Single Responsibility** | One file = one concern. Page file handles layout composition. Hook handles data/state. Config file holds static data. |
| **Open/Closed** | Extend behavior via props, not by editing existing components. |
| **Dependency Inversion** | All style values depend on token abstractions — never on literal hex/px. |

---

## No Speculative Code

- No error handling for scenarios that cannot occur in this context
- No feature flags unless explicitly requested
- No backwards-compatibility shims for code that was just written
- No "future-proof" abstractions for hypothetical requirements
- No comments on self-evident code
- No placeholder TODOs in delivered code

---

## Layout & Responsiveness

- **No fixed-width layouts.** All page containers use `width: '100%'` and flex/grid — never a hard pixel width on the outer shell.
- **DataSheet column widths are proportional or flexible.** Prefer `flex: 1` or `minWidth` + auto-fill patterns. Fixed-px columns are acceptable only for narrow utility columns (checkbox: 40px, action buttons: 80–120px).
- **Avoid layouts that break above 1440px.** The shell expands to fill the viewport — content must fill the available space, not be pinned to a narrow center column.
- **Vertical rhythm is token-driven.** Use `paddingLG` (24px) for section gaps, `paddingSM` (12px) for intra-section spacing, `paddingXS` (8px) for tight groups. Never mix ad-hoc numbers.
- **Flex gap over margin.** Prefer `gap` on flex/grid containers instead of adding `marginBottom` to every child.
- **Test at three widths mentally:** 1024px (laptop), 1440px (desktop), 1920px (wide monitor). Layouts must be usable at all three — not just one.

---

## Accessibility

- Semantic HTML: `<button>`, `<nav>`, `<main>`, `<header>`, `<section>`
- Icon-only buttons require `aria-label`: `<button aria-label="Export data">`
- Interactive elements must be keyboard-reachable (Tab) and activatable (Enter/Space)
- `role` and `aria-*` attributes only when semantic HTML is insufficient

---

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Component | PascalCase | `TransferRunsTable` |
| Hook | camelCase with `use` prefix | `useTransferRuns` |
| Config file | camelCase | `transferRuns.config.ts` |
| Interface | PascalCase, no `I` prefix | `TransferRun`, `FilterOption` |
| CSS-in-JS style object | camelCase | `containerStyle`, `headerStyle` |
