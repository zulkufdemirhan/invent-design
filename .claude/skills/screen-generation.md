# Skill: Screen Generation

Applied on every new screen request and every iteration on an existing screen.

---

## Step 1 — Understand Intent

Before touching any code, answer these questions:

1. **Goal** — What is the user trying to accomplish on this screen?
2. **Screen type** — Which pattern fits?
   - Data table / filterable list → `ListPageLayout`
   - KPI metrics / charts / overview → `DashboardPageLayout`
   - Form / detail view / wizard → `DetailPageLayout`
3. **Domain** — What entities are shown? Use real domain language (e.g. "transfer runs", "store scenario", "bottom-up plan") — never generic placeholders.
4. **Actions** — What can the user do? (view, filter, edit, create, export, approve?)
5. **Route** — Which module does this belong to? Is the `NavItem` already in `src/config/navigation.ts`?

**If anything is ambiguous:** Ask ONE targeted clarifying question. Never silently assume and proceed.

Do not advance to Step 2 until intent is clear.

---

## Step 2 — Select Layout

Choose exactly one layout from `src/layouts/`. Never create a new layout.

| Screen type | Layout | Import |
|-------------|--------|--------|
| Table / list with filters | `ListPageLayout` | `import { ListPageLayout } from '@/layouts'` |
| Dashboard / KPI / charts | `DashboardPageLayout` | `import { DashboardPageLayout } from '@/layouts'` |
| Form / detail / wizard | `DetailPageLayout` | `import { DetailPageLayout } from '@/layouts'` |

The layout is the **outermost element** of the page component.
AppShell (shell + topnav + sidebar) wraps it automatically — never include shell components inside a page.

---

## Step 3 — Map UI to Components

Resolve every UI element through this hierarchy. Never skip a level.

### Level 1 — DS Component (`src/components/`)
Check the Component Inventory in CLAUDE.md first.
If it exists → use it. Consult `component-rules.md` for which variant and props.
Never re-implement an existing component.

### Level 2 — Ant Design 6
Use when no DS component covers the need.
The app-level theme is pre-configured — Ant Design components inherit it automatically.
Never override Ant Design defaults with arbitrary values.

### Level 3 — Token-built element
Use only when neither Level 1 nor Level 2 fits.
- Place in `src/app/[module]/[screen]/` as a local file
- Never place inside `src/components/` (team-managed)
- Use only tokens from `src/tokens/` — no literals
- Add comment: `// No DS component exists for this pattern`

---

## Step 4 — Handle Missing Pieces

If a UI element cannot be satisfied by existing components:

1. Confirm it's truly missing — re-check the full Component Inventory
2. Build from DS tokens only — no external libraries, no new npm packages
3. Keep it minimal: solve only the current need, no speculative abstraction
4. Document it with a comment so the team knows to eventually promote it to `src/components/`

---

## Step 5 — Apply All States & Behaviors

Every screen must implement the following before delivery. These are not optional.

### Mandatory states

| State | Implementation |
|-------|---------------|
| **Loading** | Ant Design `Skeleton` or `Spin` — matches the layout of the loaded content |
| **Empty** | Message explaining why it's empty + optional primary CTA |
| **Error** | Inline error message + "Try again" button that retries the failed operation |
| **Success** | `message.success()` from Ant Design after mutations |

### Interactive element behaviors

Every button, row, link, and form control must have:
- `hover` — visual feedback (background change, underline, color shift)
- `focus` — visible focus ring for keyboard navigation
- `active` — pressed state
- `disabled` — visually distinct, not interactive, not focusable

### Interaction Inference

When a naturally interactive element has no explicitly specified behavior, default to the most user-friendly, contextually appropriate pattern. Never leave an interaction undefined.

| Element | Default behavior when unspecified |
|---------|-----------------------------------|
| Filter chip / filter item | Opens a dropdown or select panel scoped to that filter |
| Table row | Navigates to detail view, or opens a detail drawer if the screen owns both list and detail |
| Column header | Toggles sort ascending → descending → none |
| Truncated text | Shows full value in a tooltip on hover |
| Icon-only button | Shows label tooltip on hover |
| Empty state | Renders a primary CTA that triggers the creation or import flow |
| Long / unbounded list | Paginates or virtualizes — never renders all items flat |
| Multi-select table | Activates a contextual bulk-action bar above the table |
| Form field with validation | Shows inline error message below the field on blur, not just on submit |

**The rule:** if a pattern is naturally interactive, the interaction must be implemented — not deferred. "User didn't specify" is not an excuse to skip it.

### Accessibility

- Semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<header>`)
- ARIA labels on icon-only buttons: `aria-label="Export data"`
- Keyboard navigation: Tab order is logical, Enter/Space activate buttons, Escape closes modals
- Color contrast ≥ 4.5:1 for all text

---

## Step 6 — Register Route

Before delivering the screen, verify:

- [ ] `NavItem` with the correct `route` exists in `src/config/navigation.ts`
- [ ] Page file is at `src/app/[module]/[screen]/page.tsx`
- [ ] No hardcoded breadcrumbs anywhere — AppShell derives them automatically

### Module and screen names are not guessed

File paths must match the nav config exactly. The AI **never invents** a module name or guesses a directory.

| Source of truth | Derivation |
|-----------------|------------|
| `[module]` directory name | Top-level parent `NavItem.key` (e.g. `transfer`, `financial`, `assortment`) |
| `[screen]` directory name | Leaf `NavItem.key` minus the module prefix (e.g. `store-scenario`, `bottom-up-planning`) |
| `route` value | Must equal `/[module]/[screen]` — no shortcuts, no aliases |

**Order of operations (strict):**
1. If the module does not exist in `navigation.ts`, add the parent `NavItem` first — never create `src/app/[module]/` without the config entry.
2. Add the leaf `NavItem` with its `route`.
3. Only then create `src/app/[module]/[screen]/page.tsx`.

Also forbidden:
- Placing a screen directly under `src/app/[screen]/` (no module) — every screen belongs to a module.
- Creating files anywhere under `src/components/` while building a screen — that directory is team-managed. Sub-components for the current screen go in `src/app/[module]/[screen]/`.

See `navigation-and-routing.md` for the full registration checklist.

---

## Iteration Fast-Path

When the change is scoped to an **existing** screen (bug fix, adding a filter, changing a token, adding a column):

- Skip Steps 1–2
- Start at Step 3
- Still apply Steps 5–6 if new interactions or routes are introduced
- Preserve all prior layout and component decisions
- Declare only what changed and why

---

## Output Checklist

Before delivering any screen output, verify:

- [ ] Intent is confirmed (Step 1)
- [ ] One layout wrapper used — and nothing wraps it inside the page (Step 2)
- [ ] Every UI element mapped to the lowest appropriate level (Step 3)
- [ ] No hardcoded hex / px / font-size values (token-only)
- [ ] Loading, empty, and error states implemented (Step 5)
- [ ] Route registered in navigation config (Step 6)
- [ ] No `any` in TypeScript
- [ ] No default exports
- [ ] No component defined inside another component
- [ ] File is within size limits (see `code-quality.md`)
