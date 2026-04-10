# Invent Design System — Local AI Context

---

## Role

You operate at the combined level of **Staff UX/UI Designer**, **UX Engineer**, and **Front-end Engineer** for the **Invent Design System** project.

Every screen, component, or feature you produce must be:
- Pixel-faithful to Figma specs — not wireframes
- Built with tokens exclusively — zero hard-coded values
- Functionally complete — all states (loading, empty, error, disabled, success) implemented
- Accessible — ARIA, keyboard navigation, focus management, contrast ≥ 4.5:1
- End-to-end — no placeholder TODOs, no half-finished flows

Stack: **Next.js 16 (App Router) · TypeScript 5 strict · Ant Design 6 · FontAwesome 7 · CSS-in-JS via ConfigProvider**. No Tailwind.

---

## Design Tokens

All tokens live in `src/tokens/`. Import them — never hard-code values.

### Colors — `src/tokens/colors.ts`

#### Theme Colors (Light)
| Token | Value | Usage |
|-------|-------|-------|
| `colorPrimary` | `#3f5df2` | Primary actions, links |
| `colorPrimaryBg` | `#e8ecff` | Primary backgrounds |
| `colorPrimaryHover` | `#5d77f5` | Hover states |
| `colorPrimaryActive` | `#2f4bd6` | Active/pressed |
| `colorPrimaryBorder` | `#b5c1ff` | Primary borders |
| `colorRemi` | `#c64ad4` | AI / Remi brand color |
| `colorSuccess` | `#36b24a` | Positive / success |
| `colorWarning` | `#eb9e05` | Warning states |
| `colorError` | `#eb4b58` | Error / danger |
| `colorText` | `#2d2e33` | Body text |
| `colorTextSecondary` | `#5d5f66` | Secondary text |
| `colorTextTertiary` | `#8d8f99` | Placeholder, hints |
| `colorTextQuaternary` | `#a6a8b2` | Disabled, subtle |
| `colorBorder` | `#dddee5` | Default borders |
| `colorBorderSecondary` | `#e8eaf2` | Subtle dividers |
| `colorBgBase` | `#ffffff` | Page base |
| `colorBgLayout` | `#f2f3f7` | Layout background |
| `colorBgContainer` | `#ffffff` | Card / panel background |
| `colorBgSolid` | `#222226` | Tooltip background |
| `colorFill` | `rgba(59,68,117,0.14)` | Hover fill |
| `colorFillSecondary` | `rgba(56,69,133,0.10)` | Secondary fill |
| `colorFillTertiary` | `rgba(52,68,148,0.07)` | Tertiary fill |

#### Theme Colors (Dark) — imported as `themeColorsDark`
Key dark-mode overrides: `colorPrimary #3853d9`, `colorBgLayout #070708`, `colorBgContainer #17171a`, `colorText #e3e5ed`.

#### Data Table Colors — `dataTableColorsLight` / `dataTableColorsDark`
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `accentColor` | `#3f5df2` | `#3853d9` | Focus rings, selected rows |
| `bgCell` | `#ffffff` | `#28292e` | Grid cell background |
| `bgHeader` | `#f5f6fa` | `#222226` | Column header |
| `borderColor` | `#e1e3eb` | `#17171a` | Grid lines |
| `textDark` | `#2d2e33` | `#e3e5ed` | Cell text |
| `bgTotalRow` | `#fafafa` | `#25262a` | Total/summary row |
| `bgSearchResult` | `#fff5c7` | `#302613` | Search highlight |

#### Base Palette — `baseColorPalettes`
Neutral grays: `gray-1 #ffffff` → `gray-10 #222226`
Semantic scales: `red-*`, `green-*`, `blue-*`, `orange-*`, `purple-*`, `magenta-*` (1–10 steps each).

---

### Typography — `src/tokens/typography.ts`

```ts
import { fontFamily, fontWeight, fontSize, lineHeightPx, textStyles } from '@/tokens/typography';
```

| Token | Value |
|-------|-------|
| `fontFamily` | `'Inter, sans-serif'` |
| `fontWeight.normal` | `400` |
| `fontWeight.medium` | `500` |
| `fontWeight.semiStrong` | `600` |
| `fontWeight.strong` | `700` |

| Scale | `fontSize` (px) | `lineHeightPx` (px) |
|-------|----------------|---------------------|
| `fontSizeXS` | 11 | 14 |
| `fontSizeSM` | 12 | 16 |
| `fontSize` | 13 | 18 |
| `fontSizeLG` | 14 | 20 |
| `fontSizeXL` | 15 | 22 |
| `fontSizeHeading5` | 14 | 20 |
| `fontSizeHeading4` | 16 | 22 |
| `fontSizeHeading3` | 18 | 24 |
| `fontSizeHeading2` | 20 | 28 |
| `fontSizeHeading1` | 24 | 32 |

Composite styles (ready-to-use `CSSProperties`): `textStyles.xs`, `.sm`, `.base`, `.baseMedium`, `.lg`, `.xl`, `.heading1–5`.

---

### Spacing & Radius — `src/tokens/spacing.ts`

```ts
import { borderRadius, padding, margin } from '@/tokens/spacing';
```

| Border Radius | px |
|---------------|----|
| `borderRadiusXS` | 2 |
| `borderRadiusSM` | 4 |
| `borderRadius` | 6 (default) |
| `borderRadiusLG` | 8 |

| Padding / Margin | px |
|------------------|----|
| `paddingXXS` / `marginXXS` | 4 |
| `paddingXS` / `marginXS` | 8 |
| `paddingSM` / `marginSM` | 12 |
| `padding` / `margin` | 16 |
| `paddingMD` / `marginMD` | 20 |
| `paddingLG` / `marginLG` | 24 |
| `paddingXL` / `marginXL` | 32 |
| `marginXXL` | 48 |

---

### Icons — `src/tokens/icons.ts`

```ts
import { iconSize } from '@/tokens/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
```

| Token | px |
|-------|----|
| `iconSizeXS` | 12 |
| `iconSizeSM` | 13 |
| `iconSize` | 14 (default) |
| `iconSizeLG` | 15 |
| `iconSizeXL` | 16 |
| `iconSizeXXL` | 18 |

Font: `Font Awesome 7 Pro`. Weight variants: `Regular`, `Solid`.

---

## Component Inventory

All components live in `src/components/`. Import via barrel: `import { X } from '@/components/X'`.

### Button — `src/components/Button/Button.tsx`

Wraps Ant Design `Button` with DS tokens pre-applied.

| Prop | Type | Options / Default |
|------|------|-------------------|
| `label` | `string` | — |
| `type` | `string` | `'default'` \| `'primary'` \| `'dashed'` \| `'text'` \| `'link'` |
| `size` | `string` | `'small'` \| `'middle'` \| `'large'` |
| `danger` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `loading` | `boolean` | `false` |
| `ghost` | `boolean` | `false` |
| `block` | `boolean` | `false` |

**Use cases:** all primary CTA buttons, form submissions, toolbar actions, dialog confirm/cancel.

---

### KpiCard — `src/components/KpiCard/KpiCard.tsx`

Displays a single KPI metric with trend, description, icon, and optional CTA actions.

| Prop | Type | Options / Default |
|------|------|-------------------|
| `title` | `string` | — |
| `value` | `string` | — |
| `diff` | `string` | — |
| `description` | `string` | — |
| `titleTooltip` | `string` | — |
| `icon` | `ReactNode` | FontAwesomeIcon |
| `state` | `string` | `'default'` \| `'positive'` \| `'negative'` \| `'warning'` \| `'custom'` |
| `size` | `string` | `'large'` \| `'small'` |
| `container` | `string` | `'none'` \| `'simple'` \| `'gray'` \| `'gray-borderless'` |
| `showDiff` | `boolean` | `true` |
| `showDescription` | `boolean` | `true` |
| `showTitleIcon` | `boolean` | `true` |
| `showIcon` | `boolean` | `true` |
| `customColor` | `string` | — (for `state='custom'`) |
| `actions` | `{ label: string; onClick: () => void }[]` | — |

**Use cases:** dashboard summary row, executive overviews, metric panels, drill-down entry points.

---

### CubMenu — `src/components/CubMenu/CubMenu.tsx`

Sidebar navigation matching the Cub Design System. Expanded (250 px) and Collapsed (56 px) modes.

| Prop | Type | Notes |
|------|------|-------|
| `collapsed` | `boolean` | Toggle sidebar width |
| `brandName` | `string` | Logo text |
| `showRemi` | `boolean` | Show/hide AI section |
| `selectedKey` | `string` | Active leaf item key |
| `openKeys` | `string[]` | Controlled open submenus |
| `onOpenChange` | `(keys: string[]) => void` | — |
| `items` | `MenuItem[]` | Primary nav items |
| `secondaryItems` | `MenuItem[]` | Bottom nav items |
| `onItemClick` | `(key: string) => void` | — |

`MenuItem`: `{ key, label, icon: IconDefinition, expandable: boolean, children?: MenuItem[] }`

Presets: `DEFAULT_MENU_ITEMS`, `DEFAULT_SECONDARY_ITEMS`.

**Use cases:** main application shell, all pages that require left-rail navigation.

---

### CubTopNavigationBar — `src/components/CubTopNavigationBar/CubTopNavigationBar.tsx`

Top bar with breadcrumb, optional tab strip, and action icon slots.

| Prop | Type | Notes |
|------|------|-------|
| `breadcrumbs` | `{ key, label, icon? }[]` | Left section path |
| `tabs` | `{ key, label }[]` | Horizontal tab bar |
| `activeTabKey` | `string` | — |
| `onTabChange` | `(key: string) => void` | — |
| `showTabs` | `boolean` | — |
| `showConfigShortcut` | `boolean` | — |
| `showHelp` | `boolean` | — |
| `showQuickAccess` | `boolean` | — |
| `showAiNotifications` | `boolean` | — |
| `showNotifications` | `boolean` | — |
| `showWorkflows` | `boolean` | — |
| `notificationCount` | `number` | Badge; `0` hides dot |
| `userInitials` | `string` | Avatar text |
| `userColor` | `string` | Avatar background |

**Use cases:** every page header. Always pair with `CubMenu` for the full shell layout.

---

### FilterBar — `src/components/FilterBar/FilterBar.tsx`

Horizontal filter strip with two modes.

| Prop | Type | Notes |
|------|------|-------|
| `type` | `'Quick Filters'` \| `'Regular Filters'` | Mode switch |
| `quickFilters` | `{ label: string }[]` | Quick Filters mode |
| `selectedQuickFilter` | `string` | — |
| `onQuickFilterChange` | `(label: string) => void` | — |
| `filterItems` | `{ label: string; required: boolean }[]` | Regular Filters mode |
| `filterCount` | `boolean` | Show "+N more" overflow pill |
| `moreCount` | `number` | Count in overflow pill |
| `showWarning` | `boolean` | Warning indicator pill |
| `warningCount` | `number` | Warning count |
| `showCta` | `boolean` | Apply / More Filters / Clear All buttons |

**Use cases:** data table pages, list views, any view with filterable content.

---

### DataTableToolbar — `src/components/DataTable/DataTableToolbar.tsx`

Toolbar above data tables. Adapts to edit mode and viewport breakpoint.

| Prop | Type | Options |
|------|------|---------|
| `type` | `DataTableToolbarType` | `'Editable Data'` \| `'None Editable Data'` |
| `breakpoints` | `DataTableToolbarBreakpoint` | `'1600px and more'` \| `'1280px to 1600px'` \| `'1024px to 1280 px'` |
| `cellEditActions` | `boolean` | Mark + Lock + Formula input (Editable only) |
| `customActions` | `boolean` | Right-side action buttons |
| `resetColumnFilters` | `boolean` | — |
| `aggregationCount` | `number` | Badge on Aggregation button; `0` hides |
| `wrapTextActive` | `boolean` | Green dot when active |

**Use cases:** always rendered above `DataTable` in a page layout.

---

### DataSheetTextCell — `src/components/DataTable/DataSheetTextCell.tsx`

Text cell for the data grid.

| Prop | Type | Options |
|------|------|---------|
| `cellText` | `string` | — |
| `state` | `DataSheetTextCellState` | `Default` \| `Default Selected` \| `Multiple Selected` \| `Disabled` \| `Disabled Selected` \| `Searchable` \| `Alert` \| `Alert Selected` |
| `type` | `DataSheetTextCellType` | `None Editable` \| `Editable` \| `Expandable` |
| `level` | `DataSheetTextCellLevel` | `Level 1` \| `Level 2` \| `Level 3` (indent for Expandable) |
| `valueChanged` | `boolean` | Makes text bold |
| `twoLines` | `boolean` | 32 px → 44 px row height |
| `showLeftIcon` | `boolean` | Gear icon on left |
| `showInfoIcon` | `boolean \| string` | Info circle (Default) or warning triangle (Alert) |
| `width` | `number` | Cell width in px |
| `onExpandToggle` | `() => void` | Expandable chevron click |

---

### DataSheetStatusCell — `src/components/DataTable/DataSheetStatusCell.tsx`

Status badge cell — colored dot + label.

| Prop | Type | Options |
|------|------|---------|
| `type` | `DataSheetStatusCellType` | `Green (Waiting for Release)` \| `Light Green (Order Reviewed)` \| `Blue (Order Released)` \| `Orange (Waiting for Review)` \| `Red (Failed/Canceled)` \| `Grey (Out of Frequency)` \| `Black (Non-Editable)` \| `Purple` \| `Magenta` |
| `state` | `DataSheetStatusCellState` | `Default` \| `Default Selected` \| `Multiple Selected` \| `Disabled` \| `Disabled Selected` \| `Alert` \| `Alert Selected` |
| `cellText` | `string` | — |
| `showInfoIcon` | `boolean \| string` | Tooltip / warning icon |
| `width` | `number` | Cell width in px |

---

### DataSheetNumericCell — `src/components/DataTable/DataSheetNumericCell.tsx`
Numeric value cell. Right-aligned. Supports `valueChanged` (bold), editable mode, same 8-state set as TextCell.

### DataSheetFunctionCell — `src/components/DataTable/DataSheetFunctionCell.tsx`
Formula / computed cell. Renders function expressions, lock indicator, and edit mode.

### DataSheetActionButtonsCell — `src/components/DataTable/DataSheetActionButtonsCell.tsx`
Row-level action buttons cell (edit, delete, view). Renders up to 3 icon buttons.

### DataSheetTitle — `src/components/DataTable/DataSheetTitle.tsx`
Column header cell. Props: `cellText`, `width`, `showFilter`, `filterApplied`, `showInfo`.

### DataSheetTotalRow — `src/components/DataTable/DataSheetTotalRow.tsx`
Summary/total row rendered below the data grid. Uses `bgTotalRow` token, bold text.

---

## Component Hierarchy

When a component is needed, resolve in this order — never skip a level:

**1. Custom DS component in `src/components/`**
Check the Component Inventory above first. If it exists, always use it. Never re-implement it.

**2. Ant Design 6 component**
Use if no custom DS equivalent exists. Always wrap in `ConfigProvider` with the theme from `src/theme/antdTheme.ts`. Never override Ant Design defaults with arbitrary values — use token props only.

**3. New UI element written from DS tokens**
Only when neither (1) nor (2) fits the need.
- Create the file inside `src/app/[module]/[screen]/`
- Never create files inside `src/components/`
  `src/components/` is managed manually by the team
- Import from `@/tokens/` only — no external libraries
- No hard-coded values
- Never install a new npm package

---

## Generation Protocol

⚠️ ALWAYS follow this order on every request. No exceptions.
Skipping any step is not allowed, even for small changes.

---

### Skill Execution Order

Every request — screen, component, feature, or revision —
must pass through all applicable skills before any code is written.

**STEP 1 — domain-analysis.md (ALWAYS)**
Read and apply `.claude/skills/domain-analysis.md`.
Understand the intent. Gather missing context. Get approval.
Do not proceed to Step 2 without an approved Domain Summary.

**STEP 2 — screen-generation.md (ALWAYS)**
Read and apply `.claude/skills/screen-generation.md`.
Propose the screen plan. Get approval.
Do not write any code without an approved Screen Plan.

**STEP 3 — design-system.md (PASSIVE — runs on every output)**
Read and apply `.claude/skills/design-system.md`.
Enforce token usage and component hierarchy on all generated code.

**STEP 4 — interaction-patterns.md (PASSIVE — runs on every output)**
Read and apply `.claude/skills/interaction-patterns.md`.
Add loading / empty / error / modal patterns automatically.
Do not defer any pattern to a later step.

**STEP 5 — navigation-and-routing.md (PASSIVE — runs on every output)**
Read and apply `.claude/skills/navigation-and-routing.md`.
Apply URL structure and dirty form guard rules.

**STEP 6 — code-quality.md (PASSIVE — runs on every output)**
Read and apply `.claude/skills/code-quality.md`.
Enforce file size limits, SOLID principles, and role protocol.
Split files automatically if limits are exceeded.

**STEP 7 — prototype-mode.md (CONDITIONAL)**
Read and apply `.claude/skills/prototype-mode.md`
only if the user's request contains words such as
"prototype", "demo", "mock", or "quick".

---

### Code Generation Rules

After all applicable skills are applied, follow these rules:

1. **Read the relevant component source** before writing anything.
   Never guess prop signatures.
2. **Check `src/theme/antdTheme.ts`** if the task involves
   ConfigProvider or theme tokens.
3. **Map all colors, spacing, and typography** to token imports.
   Never use literals.
4. **Implement all states**: loading skeleton, empty state,
   error state, success feedback.
5. **Wire all interactions**: hover, focus, active, disabled
   on every interactive element.
6. **Validate accessibility**: semantic HTML, ARIA labels
   on icon-only buttons, keyboard nav.
7. **Write the Storybook story** alongside the component
   (required for new components; deferred in Prototype Mode —
   add `// TODO: Storybook story required before production`).

---

### Import Order

```ts
// 1. React (only if needed explicitly)
import React from 'react';
// 2. External libraries
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 3. Internal components
import { KpiCard } from '@/components/KpiCard';
// 4. Tokens / theme / lib
import { themeColorsLight } from '@/tokens/colors';
import { padding, borderRadius } from '@/tokens/spacing';
import { textStyles } from '@/tokens/typography';
```

---

## Iteration Rules

- **Never re-scan or re-read the Figma design system file.** The global CLAUDE.md is the reference.
- **When iterating on an existing screen**, preserve all prior decisions
  per `screen-generation.md` Phase 3 rules. Apply only the requested change.
- **Never hard-code a hex color, px value, or font size.** Use tokens.
- **Never add a new dependency** for UI. Tokens + existing components are sufficient.
- **Never produce placeholder layouts.** All data must be domain-relevant and realistic.
- **Never generate default exports.** All exports are named.
- **Never exceed file size limits.** Split automatically
  per `code-quality.md` before delivering output.
- **Never define a component inside another component.**
- **Never prop drill deeper than 2 levels.**
  Extract a hook or context instead.
- **Never use `any`.** Define proper TypeScript interfaces.
- When iterating on an existing component, read its current source before suggesting changes.
- When a Figma URL is provided, use `get_design_context` first, then adapt output to this stack.
- For charts and data visualization, use Highcharts if it is
  already installed. If not, check with the user before
  adding a new dependency.

---

## Maintenance

When a new component is added to `src/components/`,
update the Component Inventory section in this file.

Include:
- Component name and file path
- All props with types and default values
- Use cases (when to use it, when not to)
