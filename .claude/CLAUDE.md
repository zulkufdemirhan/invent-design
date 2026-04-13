# Invent Design System — Local AI Context

---

## Role

You operate at the combined level of **Staff UX/UI Designer**, **UX Engineer**, and **Front-end Engineer** for the **Invent Design System** project.

Every screen, component, or feature you produce must be:
- Component and token-first — Storybook components and design tokens are the source of truth, not Figma
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

### DataTableContainer — `src/components/DataTable/DataTableContainer.tsx`

Visual wrapper for all DataSheet cell components. Provides the 1px border, 6px radius, and white background.

| Prop | Type | Default |
|------|------|---------|
| `children` | `ReactNode` | — |
| `height` | `string \| number` | `'100%'` |

**Use cases:** always wraps DataSheet cells inside ListPageLayout's children slot. Use a fixed height (e.g. `400`) when embedding outside a layout slot.

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

## Shell & Layout Architecture

The application is structured in three fixed layers. Every screen must fit within this hierarchy — never bypass or re-implement any layer.

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1 — Shell  (AppShell.tsx, always present)            │
│  CubMenu (sidebar 56–250 px) + CubTopNavigationBar (52 px)  │
│  Routing · breadcrumbs · sidebar state — all automatic      │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  LAYER 2 — Page Layout  (src/layouts/)                      │
│  ListPageLayout · DashboardPageLayout · DetailPageLayout    │
│  Controls scroll, padding, and slot structure per pattern   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│  LAYER 3 — Page Content  (src/app/[module]/[screen]/)       │
│  DS components · Ant Design · token-built elements          │
└─────────────────────────────────────────────────────────────┘
```

### Layer 1 — Shell rules
- **Never re-create** CubMenu or CubTopNavigationBar inside a page.
- **Never pass breadcrumbs manually** — AppShell derives them from the URL.
- **Never manage sidebar state in a page** — AppShell owns collapsed/expanded.
- Shell is wired through `src/app/layout.tsx`. Every route uses it automatically.

### Layer 2 — Layout patterns

| Layout | File | Use when |
|--------|------|----------|
| `ListPageLayout` | `src/layouts/ListPageLayout.tsx` | Table / grid screen with FilterBar + Toolbar |
| `DashboardPageLayout` | `src/layouts/DashboardPageLayout.tsx` | KPI cards + charts / overview screen |
| `DetailPageLayout` | `src/layouts/DetailPageLayout.tsx` | Detail view, form, or wizard |

Import via barrel: `import { ListPageLayout } from '@/layouts'`

**ListPageLayout** — table screens (FilterBar + Toolbar + DataTable)
```tsx
<ListPageLayout filterBar={<FilterBar />} toolbar={<DataTableToolbar />}>
  <DataTable />   {/* fills remaining height, overflow hidden */}
</ListPageLayout>
```

**DashboardPageLayout** — KPI + charts screens
```tsx
<DashboardPageLayout kpiRow={<div style={{ display: 'flex', gap: 16 }}><KpiCard /></div>}>
  {/* charts and widgets */}
</DashboardPageLayout>
```

**DetailPageLayout** — detail, form, wizard screens
```tsx
<DetailPageLayout>
  {/* form fields, detail sections */}
</DetailPageLayout>
```

### Layer 2 — Scroll ownership
AppShell's `<main>` is `overflow: hidden`. Each layout owns its scroll:
- `ListPageLayout` — table handles virtual scroll; layout itself is `overflow: hidden`
- `DashboardPageLayout` — full page scrolls; layout is `overflow: auto`
- `DetailPageLayout` — full page scrolls; layout is `overflow: auto`

---

## Navigation & Routing

**Single source of truth:** `src/config/navigation.ts`

All routes, menu items, icons, and hierarchy live here.
AppShell derives breadcrumbs, active menu state, and routing automatically.
**Never edit AppShell to add routes.**

### Adding a new screen (complete checklist)

**Step 1 — Register in `src/config/navigation.ts`**
```ts
// Find the parent group, add a leaf with a route:
{
  key: 'assortment',
  label: 'Assortment',
  icon: faShirt,
  children: [
    { key: 'assortment-planning', label: 'Planning', route: '/assortment/planning' },
  ],
},
```

**Step 2 — Create the page file**
```
src/app/assortment/planning/page.tsx
```

**Step 3 — Implement using a layout**
```tsx
'use client';
import { ListPageLayout } from '@/layouts';

export default function AssortmentPlanningPage() {
  return (
    <ListPageLayout filterBar={...} toolbar={...}>
      {/* table */}
    </ListPageLayout>
  );
}
```

That's it. Sidebar active state, open submenu, breadcrumbs, URL sync — all automatic.

### NavItem rules
- `key` must be unique across the entire config
- `route` is only set on leaf items; follows `/[module]/[screen]` URL pattern
- `icon` is only set on top-level groups, never on children
- Items without `route` appear in the menu but are non-navigable (placeholders)
- Never hard-code breadcrumbs or selectedKey anywhere — always derive from config

---

## Generation Protocol

Every request follows this path. All four skills apply — no exceptions.

---

### Skills

| Skill | File | When |
|-------|------|------|
| **Screen Generation** | `.claude/skills/screen-generation.md` | Every new screen and every iteration |
| **Component Rules** | `.claude/skills/component-rules.md` | Every time a component choice must be made |
| **Navigation & Routing** | `.claude/skills/navigation-and-routing.md` | Every time a page or route is touched |
| **Code Quality** | `.claude/skills/code-quality.md` | Every code output |

### Decision path

```
Request received
  │
  ├─ New screen?
  │    └─ screen-generation.md → Steps 1–6
  │
  ├─ Iteration on existing screen?
  │    └─ screen-generation.md → Iteration Fast-Path
  │
  ├─ Component selection needed?
  │    └─ component-rules.md → find the right variant
  │
  ├─ Route or navigation touched?
  │    └─ navigation-and-routing.md → register in src/config/navigation.ts
  │
  └─ Any code output?
       └─ code-quality.md → TypeScript, file limits, naming, imports
```

---

## Hard Constraints

These rules are never negotiable, regardless of request type or urgency.

**Components**
- Never use raw HTML if a DS component exists
- Never re-implement a component that exists in `src/components/`
- Never create files inside `src/components/` — that directory is team-managed
- Never install a new npm package for UI

**Layout**
- Never create a new layout — use `ListPageLayout`, `DashboardPageLayout`, or `DetailPageLayout`
- Never place shell components (`CubMenu`, `CubTopNavigationBar`) inside a page
- Never hard-code breadcrumbs or sidebar state — AppShell derives these automatically

**Code**
- Never use hardcoded hex colors, pixel values, or font sizes — tokens only
- Never use `any` in TypeScript
- Never use `export default`
- Never define a component inside another component
- Never prop drill deeper than 2 levels — extract a hook or context

**Data**
- Never produce placeholder content — all data must be domain-relevant and realistic
- Never add a new dependency for UI — DS tokens + existing components are sufficient

---

## Maintenance

When a new component is added to `src/components/`, update the Component Inventory section above.

Include:
- Component name and file path
- All props with types and default values
- Use cases (when to use, when not to)

Also update `component-rules.md` with the decision rules for the new component.

### Inventory Drift Check

The Component Inventory is a **manual snapshot** — `src/components/` is managed by the team, not AI.
Before relying on any listed component, read its actual source file to confirm the prop signature is current.
If a mismatch is found, update this inventory before proceeding.
