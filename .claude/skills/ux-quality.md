# Skill: UX Quality & Consistency

This skill is **ENFORCED — applied on every output** alongside design-system.md.
It ensures that generated screens are not just technically correct but also
visually coherent, logically sound, and consistent across the product.

---

## 0. Design Thinking — Domain Drives Decisions

> **You are a Staff UX Designer, not a template filler.**
>
> Every screen starts with understanding:
> - What is the user's **primary task** on this screen?
> - What **information** do they need to complete that task?
> - What is the **optimal order** for presenting that information?
> - What **actions** must be reachable, and at what moment?
>
> Layout patterns, component choices, and region arrangement all follow
> from these questions. Two "data table" screens in different domains
> may have very different layouts if the user tasks differ.

### Adaptive Layout Decision Process

Before choosing a layout, ask:

```
1. What is the user doing?
   → Monitoring     → KPI-heavy, data scanning, minimal actions
   → Deciding       → Comparison data, filters, status visibility
   → Entering data  → Form-focused, validation, progressive disclosure
   → Reviewing      → Read-heavy, annotations, approve/reject flow
   → Configuring    → Settings, toggles, nested sections

2. How much data?
   → Few fields     → Single card or inline form
   → Medium list    → Table with filters, no KPIs needed
   → Dense grid     → Full DataTable layout with toolbar
   → Mixed          → Dashboard: KPIs + table + chart

3. What is the action frequency?
   → Rare actions   → Actions in context menu or row-level buttons
   → Frequent edits → Editable cells, inline save, toolbar edit mode
   → Batch work     → Bulk selection, toolbar batch actions
   → One-time flow  → Wizard with clear steps

4. What is the information hierarchy?
   → Overview first → KPIs → Filters → Table
   → Detail first   → Header card → Tabs → Related data
   → Action first   → Form fields → Submit → Confirmation
```

**Then** select the closest reference pattern from `screen-generation.md`
and **adapt** it. Add, remove, or rearrange regions to match the domain need.

### Layout Justification

In the Screen Plan, always include a brief rationale for the layout choice:

```
### Layout Rationale
This screen serves [user role] who needs to [primary task].
The dominant data is [type], with [frequency] interactions.
Layout: [pattern] adapted with [specific changes] because [reason].
```

---

## 1. Visual Hierarchy

Every screen has a reading order. Enforce it.

### Information Priority (top to bottom)

```
1. Context     — Where am I? (breadcrumb, page title, tabs)
2. Summary     — What's the big picture? (KPI cards, status banners)
3. Controls    — What can I do? (filters, toolbar actions)
4. Content     — What's the data? (table, cards, form)
5. Navigation  — Where do I go next? (pagination, CTAs, next steps)
```

**Rules:**
- Never place controls above context
- Never place content above controls
- Summary (KPI bar) is optional — but if present, always between context and controls
- Pagination always anchored at the bottom of the content area

### Visual Weight

| Importance | Treatment |
|------------|-----------|
| Primary action | `Button type="primary"` — max 1 per visible area |
| Secondary action | `Button type="default"` |
| Tertiary / destructive | `Button type="text"` or `type="link"` |
| Page title | `textStyles.heading3` or `textStyles.heading4` |
| Section label | `textStyles.baseMedium` with `colorTextSecondary` |
| Supporting text | `textStyles.sm` with `colorTextTertiary` |

**Rules:**
- Maximum **1 primary button** visible at a time per region
  (e.g. 1 in toolbar, 1 in modal footer — not 3 primary buttons in the same toolbar)
- Destructive actions (delete, cancel, reject) are **never** `type="primary"`
  unless combined with `danger={true}`
- Icon-only actions in tables use `type="text"` with `iconSize.iconSize`

---

## 2. Vertical Spacing Rhythm

Consistent vertical gaps between page regions. Token-based, no exceptions.

### Region Spacing Map

```
Page root (colorBgLayout)
  │
  ├── [KPI Bar]
  │     margin-bottom: marginXXS (4px)        ← tight coupling to filter
  │
  ├── [FilterBar]
  │     margin-bottom: marginXXS (4px)        ← tight coupling to table section
  │
  └── [DataTableSection]  (colorBgContainer)
        margin: marginXXS marginSM (4px 12px) ← gutter from page edge
        │
        ├── DataTableToolbar                   ← 0px gap to grid (built-in padding)
        ├── Grid                               ← flex: 1
        └── Pagination                         ← border-top separator
```

### Spacing Rules

| Between | Gap | Token |
|---------|-----|-------|
| KPI Bar → Filter Bar | 4px | `marginXXS` |
| Filter Bar → Table Section | 4px | `marginXXS` |
| KPI Bar → Table Section (no filter) | 4px | `marginXXS` |
| Table Section gutter (left/right) | 12px | `marginSM` |
| Table Section gutter (top/bottom) | 4px | `marginXXS` |
| Toolbar → Grid | 0px | No gap — built into toolbar |
| Grid → Pagination | 0px | `border-top` separator only |
| Form field → Form field | 16px | `margin` (Ant Form default) |
| Section → Section (within a form) | 24px | `marginLG` |
| Card → Card (in a grid) | 16px | `padding` |
| Modal body top padding | 16px | `padding` |

**Never invent new gaps.** If a spacing value is not in this table,
use the closest token from `src/tokens/spacing.ts`.

---

## 3. Cross-Screen Consistency

When generating multiple screens for the same product, these elements
must be identical across all screens:

### Position Consistency

| Element | Position | Rule |
|---------|----------|------|
| Filter Bar | Below KPI bar, above table | Same placement on every list screen |
| Primary action button | Right side of toolbar | Never on the left |
| Search input | Left side of toolbar | Never on the right |
| Pagination | Bottom of table section | Always `justify-content: flex-end` |
| Export button | Toolbar right actions | Never in Filter Bar |
| Breadcrumb | Top nav bar (global) | Auto from ROUTE_MAP |

### Behavior Consistency

| Pattern | Rule |
|---------|------|
| Row click → detail | If Screen A uses Drawer, all similar screens use Drawer |
| Edit action | If Screen A uses Modal, all similar screens use Modal |
| Delete | Always confirm dialog, always danger button |
| Success feedback | Always toast (top-right), always 3s duration |
| Error feedback | API errors → toast; validation → inline field errors |
| Empty state | Always centered, always icon + message + optional CTA |
| Loading | Always skeleton, never spinner (except submit buttons) |

### First-Screen Precedent Rule

The first screen generated in a product sets the pattern.
Every subsequent screen must follow the same choices unless
the user explicitly asks for a different approach.

Document the precedent:
```
**Precedent set by [first screen name]:**
- Row click: Drawer (width 720)
- Edit action: Modal (width 640)
- Filters: Regular Filters mode, 4 filter items
- Table: None Editable, export in toolbar
```

---

## 4. Content & Copy Standards

### Button Labels

| Action | Label | Never Use |
|--------|-------|-----------|
| Create new | "New [Entity]" or "Add [Entity]" | "Create", "Insert" |
| Save changes | "Save" | "Submit", "OK" |
| Apply filters | "Apply" | "Go", "Search", "Filter" |
| Clear filters | "Clear All" | "Reset", "Remove" |
| Cancel | "Cancel" | "Close", "Abort", "Back" |
| Delete | "Delete" | "Remove", "Erase", "Drop" |
| Confirm | "Confirm" | "Yes", "OK", "Accept" |
| Export | "Export" | "Download" |

### Empty State Messages

```
No filters active:  "No [entity plural] found yet."
Filters active:     "No [entity plural] match the selected filters."
Search active:      "No results for '[search term]'."
Error state:        "Something went wrong while loading [entity plural]."
```

Always include:
- A relevant icon (use `faTableList` for tables, `faInbox` for empty lists)
- A single-sentence message using the entity name from Domain Summary
- A CTA button when the user can take action (e.g. "Clear Filters", "Try Again")

### Notification Messages

| Event | Title | Description |
|-------|-------|-------------|
| Save success | "Saved" | "[Entity] has been saved successfully." |
| Delete success | "Deleted" | "[Entity] has been deleted." |
| Bulk action | "[N] [entities] updated" | — |
| API error | "Failed to [action]" | "Please try again. Contact support if the issue persists." |
| Validation error | (no toast) | Inline field errors only |

### Confirmation Dialogs

```
Delete:  "Are you sure you want to delete this [entity]?"
         "This action cannot be undone."
         Buttons: [Cancel] [Delete] (danger)

Bulk:    "Are you sure you want to [action] [N] [entities]?"
         "This will affect all selected records."
         Buttons: [Cancel] [Confirm] (primary)

Leave:   "Unsaved changes"
         "You have unsaved changes. Are you sure you want to leave?"
         Buttons: [Stay] [Leave] (danger)
```

---

## 5. Flow Validation Checklist

Before delivering any screen, validate these flow rules:

### Every action must have a visible outcome

```
[ ] Button click → something visibly changes (toast, modal, navigation, state)
[ ] Form submit → success toast + close modal/drawer OR error + keep form open
[ ] Delete → confirm → success toast + row removed from table + count updated
[ ] Filter apply → table updates + empty state if no results
[ ] Tab switch → content changes + URL param updates
[ ] Row click → drawer/modal opens OR navigates to detail
```

### No dead ends

```
[ ] Empty state has a CTA (clear filters, create new, go back)
[ ] Error state has a retry option
[ ] After successful delete on a detail page → navigate back to list
[ ] After successful create → navigate to list or detail
[ ] Modal/Drawer always has Cancel + primary action
[ ] Every page is reachable from the sidebar menu or breadcrumb
```

### Recovery paths

```
[ ] User can undo or cancel any non-destructive action
[ ] Destructive actions require confirmation
[ ] Form data is preserved when switching tabs (within the same screen)
[ ] Browser back returns to the previous screen state (URL params)
[ ] Escape key closes any open modal/drawer
```

### Logical flow order

```
[ ] Filters → apply → table reflects → (optional) export filtered data
[ ] Create → fill form → validate → submit → success → list refreshed
[ ] Edit → open form → modify → validate → submit → success → data updated
[ ] Delete → confirm → success → row removed → (if detail page) navigate back
[ ] Bulk select → bulk action → confirm → success → selection cleared
```

---

## 6. Screen Type Quality Checks

Different screen types have different quality criteria.
Apply the relevant check based on the Screen Plan's screen type.

### Dashboard Screen
```
[ ] KPI cards show realistic values with trend indicators
[ ] Cards use consistent container style (all 'simple' or all 'gray')
[ ] Maximum 6 KPI cards per row (reflow with flex-wrap)
[ ] Chart area (if any) fills available width
[ ] No scrollable regions except the main content area
```

### Data Table Screen
```
[ ] Column widths are proportional to content type
    (status: 120px, text: 180-240px, numeric: 100-140px, actions: 80-120px)
[ ] Total row is present if numeric columns exist
[ ] Column alignment: text left, numbers right, status center
[ ] First column is sticky (if table is horizontally scrollable)
[ ] Row height is consistent (32px single-line, 44px two-line)
```

### Form Screen
```
[ ] Labels are above inputs (not inline) — Ant Design vertical layout
[ ] Required fields are marked with asterisk
[ ] Validation fires on blur AND on submit
[ ] Submit button is disabled during submission (loading state)
[ ] Form width does not exceed 720px for readability
[ ] Related fields are grouped in sections with section headers
```

### Detail / View Screen
```
[ ] Key information is visible without scrolling
[ ] Related data is organized in tabs or sections
[ ] Edit action is accessible from the page (not hidden)
[ ] Back navigation is available (breadcrumb + browser back)
```

### Wizard / Multi-Step Screen
```
[ ] Step indicator shows current position and total steps
[ ] User can go back to previous steps without losing data
[ ] Each step validates before allowing next
[ ] Final step shows summary before confirm
[ ] Cancel exits the entire wizard with confirmation
```

---

## 7. Anti-Patterns — Never Do These

| Anti-Pattern | Why It's Bad | What to Do Instead |
|-------------|--------------|-------------------|
| Multiple primary buttons in one view | Dilutes user attention, unclear CTA | 1 primary + rest default/text |
| Inline edit without visual indication | User doesn't know cells are editable | Show edit icon or hover border |
| Table without pagination | Performance + overwhelm on large datasets | Always paginate (20/50/100) |
| Confirm dialog for non-destructive actions | Interrupts flow unnecessarily | Only confirm deletes + irreversible |
| Toast for validation errors | User can't see which field has the error | Inline field-level errors |
| Truncated text without tooltip | Information hidden with no access | Add tooltip on overflow |
| Filter bar with 8+ filters visible | Cognitive overload | Show 4-5 + "More Filters" dropdown |
| Loading spinner for > 2s | User thinks app is frozen | Skeleton with shape hints |
| Action buttons with no disabled state | User clicks during loading → duplicate | Disable + loading indicator |
| Empty table with no message | User doesn't know if it's loading or empty | Always show empty state component |
