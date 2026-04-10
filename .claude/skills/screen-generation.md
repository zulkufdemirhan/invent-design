# Skill: Screen Generation

This skill runs after `domain-analysis.md` is complete.
**Phase 1 does not begin until the Domain Summary is approved.**

---

## Purpose

Use the approved domain context to produce the screen in 3 phases:
- **Phase 1** — Propose the flow, get approval
- **Phase 2** — Write the code, apply token and component rules
- **Phase 3** — Apply iterations, preserve prior decisions

---

## Phase 1 — Flow Proposal (Approval Required)

### What to do
Using the Domain Summary, produce the structural plan for the screen.
Do not write code. Write a decision document.

### Output Format

```
## Screen Plan: [Screen Name]

### Layout
- Shell: CubMenu (collapsed: false) + CubTopNavigationBar
- Main area: [Layout type — single panel / split / full-width grid]
- Page width: [Fixed / Fluid]

### Breadcrumb
[Module] › [Sub-module] › [Screen name]

### Tab Bar (if applicable)
Tab 1: [Name] | Tab 2: [Name] | ...
Active: Tab 1

### Regions (top to bottom)
1. **KPI Bar** — [How many cards, which metrics]
2. **Filter Bar** — [Quick Filters / Regular Filters, how many filters]
3. **Toolbar** — [Editable / None Editable, which actions]
4. **DataTable** — [How many columns, which cell types, pagination]
5. **Modal / Drawer** — [Which action triggers it, what it contains]

### Navigation Flow
[Previous screen] → this screen → [Next screen]
Triggering action: [e.g. clicking a table row]

### State Plan
| State | Behavior |
|-------|----------|
| Loading | [Skeleton or spinner, which region] |
| Empty | [Message, icon, CTA] |
| Error | [Toast / inline, retry available] |
| Success | [Toast message] |

### Open Decisions
- [Items requiring a design decision — ask the user]
```

### Approval Question

```
Does this plan look right? I'll start coding once you approve.
Is there any section you'd like to change?
```

**Phase 2 does not begin without approval.**

---

## Phase 2 — Code Generation

### AppShell Architecture — MUST READ BEFORE CODING

This project uses a global shell. Before writing any code, understand the layer hierarchy:

```
src/app/layout.tsx
  └── AntdRegistry          ← ConfigProvider (lightTheme) lives here globally
        └── AppShell        ← CubMenu + CubTopNavigationBar live here globally
              └── <main>    ← Your [ScreenName]View renders HERE as children
```

**Rules that follow from this:**
- NEVER add `ConfigProvider`, `CubMenu`, or `CubTopNavigationBar` inside a View file.
  They are already rendered globally. Adding them again creates duplicate shells.
- The View file receives `height: 100%` from `<main>`. Use `display: flex; flex-direction: column; height: 100%` as its root.
- Breadcrumbs and `selectedKey` for the new screen must be registered in
  `src/components/AppShell/AppShell.tsx`:
  1. Add the route to `ROUTE_MAP` (pathname → breadcrumbs + selectedKey)
  2. Add the menu key to `KEY_TO_ROUTE` (menu key → pathname)

### Pre-flight Checks (Run Before Every Generation)

Before writing any code, verify:

```
[ ] Domain Summary approved
[ ] Screen Plan approved
[ ] src/components/AppShell/AppShell.tsx read — understand ROUTE_MAP and KEY_TO_ROUTE
[ ] Existing page file read (if revision)
[ ] Source file of every DS component to be used has been read
```

### Production Order

Produce parts in this sequence — complete each before moving to the next:

```
1. AppShell Registration
   └── Add route to ROUTE_MAP + menu key to KEY_TO_ROUTE in AppShell.tsx

2. KPI Bar (if applicable)
   └── KpiCard array, state and container props configured

3. Filter Bar
   └── FilterBar, type and props per Screen Plan

4. Toolbar
   └── DataTableToolbar, type and breakpoints configured

5. DataTable
   └── Column definitions, cell components, DataSheetTitles

6. Modal / Drawer (if applicable)
   └── Trigger connections, content form, submit flow

7. States
   └── Loading skeleton, empty state, error state, success toast
```

### Tab State Management
For screens that contain tabs:
- Each tab manages its own loading / empty / error state independently
- When switching tabs, the previous tab's state is preserved
- The active tab is reflected in a URL param (`?tab=overview`)

### File Structure

For a new screen:
```
src/app/[module]/[screen]/
├── page.tsx              ← Next.js page (Server Component wrapper)
└── [ScreenName]View.tsx  ← Client Component (all UI lives here)
```

> Note: Never create files inside src/components/.
> src/components/ is managed manually by the team.
> All generated files go into src/app/[module]/[screen]/.

### Code Rules

```tsx
// ✅ Correct — token import
import { themeColorsLight } from '@/tokens/colors';
import { padding } from '@/tokens/spacing';
import { textStyles } from '@/tokens/typography';

// ❌ Wrong — hard-coded
style={{ color: '#3f5df2', padding: 16, fontSize: 13 }}

// ✅ Correct — token usage
style={{ color: themeColorsLight.colorPrimary, padding: padding.padding, ...textStyles.base }}

// ✅ Correct — named export
export const TransferView: React.FC<TransferViewProps> = ...

// ❌ Wrong — default export
export default function TransferView() ...

// ✅ Correct — typed interface
interface TransferViewProps {
  moduleId: string;
  readonly?: boolean;
}

// ❌ Wrong — any
const data: any = ...
```

### Template — Page Shell

> ⚠️ DO NOT add ConfigProvider, CubMenu, or CubTopNavigationBar.
> They are provided globally by AppShell + AntdRegistry.
> This View renders as the `children` inside AppShell's `<main>`.

**Step 1 — Register in AppShell.tsx:**
```ts
// ROUTE_MAP  →  pathname to breadcrumbs + selectedKey
'/[module]/[screen]': {
  breadcrumbs: [
    { key: 'bc-module', label: '[Module Label]', icon: fa[Icon] },
    { key: 'bc-screen', label: '[Screen Label]' },
  ],
  selectedKey: '[menu-item-key]',
},

// KEY_TO_ROUTE  →  menu key to pathname (enables click-to-navigate)
'[menu-item-key]': '/[module]/[screen]',
```

**Step 2 — View template (content only):**
```tsx
'use client';

import { themeColorsLight } from '@/tokens/colors';
import { padding as paddingTokens, margin as marginTokens } from '@/tokens/spacing';

// ConfigProvider, CubMenu, CubTopNavigationBar → already in AppShell. Do NOT import.

export const [ScreenName]View: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: themeColorsLight.colorBgLayout }}>
      {/* FilterBar — sits above the white table section, layout background */}
      {/* <FilterBar ... /> */}

      {/* DataTableSection — white container that wraps Toolbar + Grid + Pagination */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          margin: `${marginTokens.marginXXS}px ${marginTokens.marginSM}px`,
          background: themeColorsLight.colorBgContainer,
          borderRadius: 0,
        }}
      >
        {/* Toolbar — fixed height, no gap below */}
        {/* <DataTableToolbar ... /> */}

        {/* Grid area — fills all remaining height, scrollable horizontally */}
        <div style={{ flex: 1, overflow: 'hidden', overflowX: 'auto', display: 'flex', flexDirection: 'column' }}>
          {/* DataSheet columns render here */}
        </div>

        {/* Pagination — fixed height at the bottom of the white section */}
        {/* <Pagination ... /> */}
      </div>
    </div>
  );
};
```

### DataTable Screen Layout — Pixel Rules (from Figma)

This is the **canonical layout** for every screen that contains a DataTableToolbar + data grid.
Never deviate from this structure. It is derived from the Figma spec.

```
Page root
  background: colorBgLayout
  display: flex | flex-direction: column | height: 100%
  │
  ├── [FilterBar]  ← optional, sits on colorBgLayout background
  │
  └── DataTableSection  ← white container
        margin: 4px 12px (paddingXXS top/bottom, paddingSM left/right)
        background: colorBgContainer
        display: flex | flex-direction: column
        flex: 1 | overflow: hidden
        │
        ├── DataTableToolbar  ← height 48px (8px vertical padding + 32px buttons)
        │     padding: '8px 0'  ← already built into the component
        │     NO bottom margin. Grid starts immediately below.
        │
        ├── Grid area  ← fills all remaining space
        │     flex: 1 | overflow: hidden | overflowX: auto
        │     DataSheet columns render inside here as a flex row
        │
        └── Pagination  ← height 48px, shrinks to fit
              display: flex | align-items: center
              padding: 8px 0
              border-top: 1px solid colorBorderSecondary
```

**Critical rules:**
- `DataTableToolbar` and the grid area have **zero gap between them** — never add margin/gap between them.
- The grid area must have `flex: 1` so it fills remaining height after toolbar and before pagination.
- The white section uses `overflow: hidden` — scrolling only happens inside the grid area.
- `margin: 4px 12px` on the white section creates the colorBgLayout gutter visible around the table.
- **Never wrap DataTableToolbar in an extra div with padding** — the component already has `padding: '8px 0'` baked in.
- **Never add KPI cards inside the white section** — KpiCards sit between FilterBar and the white section, on colorBgLayout.

**Step 3 — page.tsx (Next.js server wrapper):**

> **Exception:** `page.tsx` and `layout.tsx` files use `export default`
> because Next.js App Router **requires** it. This is the only case
> where default exports are allowed. All other files use named exports.

```tsx
import { [ScreenName]View } from './[ScreenName]View';

export default function [ScreenName]Page() {
  return <[ScreenName]View />;
}
```

### Realistic Data
Do not use placeholders (Lorem ipsum, Item 1, Test data).
Use the entity names, metric types, and business context
from the approved Domain Summary to generate
realistic and domain-appropriate sample values.

---

## Phase 3 — Iteration

### Rule: Preserve Prior Decisions

When an iteration request arrives:

1. Apply only the requested change
2. Leave untouched regions exactly as they are
3. Do not change token or component choices (unless explicitly asked)
4. Do not remove added states (loading / empty / error)
5. Clearly declare what was changed

### Change Declaration Format

```
**Changed:** [Component or region]
**What:** [What was added / removed / modified]
**Untouched:** [Other regions]
**Affected prop/state:** [If any]
```

### Iteration Types

| Type | Approach |
|------|----------|
| Visual fine-tuning | Only the style prop or token value changes |
| New column / filter | Added to existing structure; other columns preserved |
| Adding a state | Loading / empty / error implementation added |
| Adding an action | Modal / drawer + trigger connection added |
| Layout change | Shell preserved; only `main` interior rearranged |

### If the User Says "Rewrite"

The Screen Plan must be updated before any full rewrite.
Return the "rewrite" request to Phase 1, get the updated plan approved.

### Iteration Limit
If the user has made 3+ iterations and the screen has diverged significantly
from the original plan, ask:
"These changes are moving the screen substantially away from the original plan.
I'd recommend updating and re-approving the Screen Plan — shall I continue?"

---

## Checklist — For Every Screen Output

Verify before delivering code:

```
[ ] AppShell.tsx updated — ROUTE_MAP + KEY_TO_ROUTE entries added
[ ] View does NOT contain ConfigProvider, CubMenu, or CubTopNavigationBar
[ ] All colors come from tokens
[ ] All spacing values come from tokens
[ ] Font size / weight come from tokens
[ ] No hard-coded hex, px, or font values
[ ] Loading state present
[ ] Empty state present (message + icon + optional CTA)
[ ] Error state present (toast or inline)
[ ] All interactive elements have hover / focus / disabled states
[ ] Tables: Toolbar + Grid + Pagination are inside a single white DataTableSection (colorBgContainer), with margin 4px 12px from the page edge
[ ] Grid area has flex:1 + overflow:hidden — not the page root
[ ] Zero gap between DataTableToolbar and grid (no margin between them)
[ ] Tables have toolbar + pagination
[ ] Forms have validation + submit feedback
[ ] Modals close on Escape, focus trap active
[ ] Named exports used
[ ] No any types used
[ ] Realistic domain data present (no placeholders)
```
