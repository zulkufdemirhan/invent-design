# Skill: Component Rules

Decision rules for choosing the right component and the right variant.
Reference during Step 3 of `screen-generation.md` whenever a component choice must be made.

---

## Core Principle: Components Are Contextual

**No component is mandatory.** Every component in this guide is used only when the screen scenario requires it.

When generating a screen:
- Include a component if it serves the user's goal on that specific screen
- Omit a component if it adds no value in that context
- Configure each component with only the props the scenario needs — do not fill all props by default

This applies to every component, layout, cell type, toolbar, and filter bar in this system.

---

## Button

**File:** `src/components/Button/Button.tsx`

| Context | Props |
|---------|-------|
| Primary action (one per screen/section) | `type="primary"` |
| Secondary / cancel action | `type="default"` |
| Destructive action (delete, reject) | `type="primary" danger={true}` |
| Inline text link inside content | `type="link"` |
| Toolbar action with no background | `type="text"` |
| Dashed outline for "add" patterns | `type="dashed"` |

**Rules:**
- Never place two `type="primary"` buttons side by side
- `loading={true}` during async operations — always show loading, never silently block
- `block={true}` only for full-width form submit buttons
- `disabled` state must be visually distinct — use it only when the action is truly unavailable, not as a loading substitute

---

## KpiCard

**File:** `src/components/KpiCard/KpiCard.tsx`

### Size
| Context | Value |
|---------|-------|
| Primary metrics row on a dashboard (max 4 per row) | `size="large"` |
| Secondary / supporting metrics, condensed panels | `size="small"` |

### State
| Metric meaning | Value |
|----------------|-------|
| Value exceeds target / positive trend | `state="positive"` |
| Value below target / negative trend | `state="negative"` |
| At risk / borderline | `state="warning"` |
| Neutral or directionally undefined | `state="default"` |
| Requires a specific brand color | `state="custom" customColor="..."` |

### Container
| Layout context | Value |
|----------------|-------|
| Card sits directly on `colorBgLayout` | `container="simple"` |
| Card is inside another panel/card | `container="none"` |
| Card needs visual separation in a dense layout | `container="gray"` |
| No border, only gray background | `container="gray-borderless"` |

**Rules:**
- `showDiff={false}` — no comparison period available
- `showDescription={false}` — space is tight
- `showIcon={false}` — icon adds no semantic value in this context

---

## FilterBar

**File:** `src/components/FilterBar/FilterBar.tsx`

| Context | Type |
|---------|------|
| ≤5 predefined options, mutually exclusive | `type="Quick Filters"` |
| User-configurable, multiple active simultaneously | `type="Regular Filters"` |

**Rules:**
- `showCta={true}` → filters require explicit Apply (expensive queries)
- `showCta={false}` → filters apply reactively in real time
- `showWarning={true}` → a required filter is not yet applied
- `filterCount={true}` + `moreCount={N}` → when >4 filter chips overflow
- Never use Quick Filters and Regular Filters on the same screen

---

## Data Table Rendering Pattern

A DataSheet table is **not rendered cell-by-cell in JSX**. Writing 200 rows × 8 columns inline would blow past the 200-line `page.tsx` limit immediately.

**The required pattern:**

1. **Column definitions** live in `[screenName].config.ts`:
   ```ts
   export const transferRunsColumns: ColumnDef<TransferRun>[] = [
     { key: 'sku', label: 'SKU', width: 120, cellType: 'text' },
     { key: 'status', label: 'Status', width: 140, cellType: 'status' },
     { key: 'quantity', label: 'Qty', width: 80, cellType: 'numeric' },
     // ...
   ];
   ```

2. **Row data** lives in `use[ScreenName].ts` hook (or `[screenName].mock.ts` until wired to backend).

3. **Page file** composes them with `.map()` loops — never inline JSX per cell:
   ```tsx
   <DataTableContainer>
     <div>{columns.map(col => <DataSheetTitle key={col.key} {...col} />)}</div>
     {rows.map(row => (
       <div key={row.id}>
         {columns.map(col => renderCell(row, col))}
       </div>
     ))}
     <DataTableTotalRow ... />
   </DataTableContainer>
   ```

4. **`renderCell(row, col)`** is a local helper in the page file (or extracted if it exceeds ~30 lines). It switches on `col.cellType` and returns the right DataSheet component.

**Rules:**
- Never hand-write each cell in JSX
- Never inline more than 5 rows of data in the page file — extract to `.config.ts` or a hook
- Column count, labels, and widths are **config**, not JSX
- If the table has hierarchical rows (Level 1/2/3), the config holds the tree; the page recursively maps it

---

## DataTableContainer

**File:** `src/components/DataTable/DataTableContainer.tsx`

Visual wrapper that provides the 1px border, 6px radius, and white background for all DataSheet cells.

| Context | Value |
|---------|-------|
| Inside `ListPageLayout` children slot | `height="100%"` (default) |
| Embedded in a page with fixed dimensions | `height={400}` (or any fixed value) |

**Rules:**
- Always wraps DataSheet cells — never render cells without a container
- Never wrap more than one DataTableContainer per screen section
- The container clips overflow — table cells scroll inside it

---

## DataTableToolbar

**File:** `src/components/DataTable/DataTableToolbar.tsx`

Use only when the screen has a data table with actions above it.

| Context | Type |
|---------|------|
| Users can modify cell values | `type="Editable Data"` |
| Read-only view | `type="None Editable Data"` |

### Breakpoints
| Viewport width | Value |
|----------------|-------|
| ≥ 1600px | `breakpoints="1600px and more"` |
| 1280 – 1600px | `breakpoints="1280px to 1600px"` |
| 1024 – 1280px | `breakpoints="1024px to 1280 px"` |

**Rules:**
- `aggregationCount={0}` hides the badge — use 0 when no aggregations are active
- `wrapTextActive={true}` only when wrap text is currently enabled
- `cellEditActions={true}` only with `type="Editable Data"`

---

## DataSheetTitle

**File:** `src/components/DataTable/DataSheetTitle.tsx`

Column header cell. Use for every column header in a DataSheet table.

| Context | Type |
|---------|------|
| Standard text column | `type="Default"` |
| Column that expands/collapses rows | `type="Expandable"` |
| Empty / spacer header cell | `type="Empty"` |
| Row selection column header | `type="Select All"` |

**Rules:**
- `showFilter={true}` when the column supports user filtering
- `filterApplied={true}` when a filter is currently active on this column — visually indicates filtered state
- `showInfo={string}` when the column header needs a tooltip explanation
- `twoLines={true}` only when the label cannot fit in one line and truncation is unacceptable
- `checked` + `indeterminate` + `onSelectAllChange` only with `type="Select All"`

---

## DataSheetTextCell

**File:** `src/components/DataTable/DataSheetTextCell.tsx`

### Type
| Context | Value |
|---------|-------|
| Display-only cell | `type="None Editable"` |
| User can modify the value | `type="Editable"` |
| Row can expand/collapse to reveal children | `type="Expandable"` |

### Level (Expandable only)
| Hierarchy depth | Value |
|-----------------|-------|
| Root row | `level="Level 1"` |
| First child | `level="Level 2"` |
| Second child | `level="Level 3"` |

### State
| Situation | Value |
|-----------|-------|
| Normal, unselected | `state="Default"` |
| Row is selected | `state="Default Selected"` |
| Multiple rows selected | `state="Multiple Selected"` |
| Cannot be interacted with | `state="Disabled"` |
| Selected while disabled | `state="Disabled Selected"` |
| Matches a search result | `state="Searchable"` |
| Has a validation problem | `state="Alert"` |
| Alert cell is selected | `state="Alert Selected"` |

**Rules:**
- `valueChanged={true}` — cell was modified in the current session (renders bold)
- `twoLines={true}` — content needs two lines; row height expands from 32px to 44px
- `showInfoIcon={true}` — tooltip available; pass a string value for Alert warning

---

## DataSheetNumericCell

**File:** `src/components/DataTable/DataSheetNumericCell.tsx`

Use for all numeric values: quantities, percentages, currency, ratios.

### Type
| Context | Value |
|---------|-------|
| Read-only numeric | `type="None Editable"` |
| User can edit the value | `type="Editable"` |
| Belongs to an expandable hierarchy | `type="Expandable"` |
| Cell is locked (formula-driven) | `type="Locked"` |
| Cell has a planning mark | `type="Marked"` |

Same `level`, `state`, and `valueChanged` rules as `DataSheetTextCell`.

**Rules:**
- Always right-aligned — never override text alignment
- `flag={true}` shows a corner triangle indicator (top-right) — use for cells awaiting confirmation
- `showCustomIcon={true}` for cells with an associated gear/config action

---

## DataSheetFunctionCell

**File:** `src/components/DataTable/DataSheetFunctionCell.tsx`

Use for interactive control cells: checkboxes, radios, and toggles.
Not for formula/computed values — those are `DataSheetNumericCell` with `type="Locked"`.

### Type
| Context | Value |
|---------|-------|
| Multi-select checkbox | `type="Checkbox"` |
| Row selection checkbox (leftmost column) | `type="Checkbox Row Select"` |
| Single-select radio | `type="Radio"` |
| Row selection radio | `type="Radio Row Select"` |
| On/off toggle with label | `type="Toggle"` |
| On/off toggle without label | `type="Toggle Only"` |

**Rules:**
- `type="Checkbox Row Select"` and `type="Radio Row Select"` are narrow (43px) — always the leftmost column
- `label` is not shown for Row Select and Toggle Only types
- `onChange` is required for all interactive types

---

## DataSheetStatusCell

**File:** `src/components/DataTable/DataSheetStatusCell.tsx`

Map domain statuses to the correct type. Never invent new color mappings.

| Domain Status | Type value |
|---------------|------------|
| Waiting for downstream release | `Green (Waiting for Release)` |
| Reviewed, not yet released | `Light Green (Order Reviewed)` |
| Released and active | `Blue (Order Released)` |
| Pending review | `Orange (Waiting for Review)` |
| Failed or cancelled | `Red (Failed/Canceled)` |
| Out of replenishment cycle / skipped | `Grey (Out of Frequency)` |
| Non-editable flag | `Black (Non-Editable)` |
| Custom brand / product category color | `Purple` or `Magenta` |

Same 8-state model as TextCell applies.

---

## DataSheetActionButtonsCell

**File:** `src/components/DataTable/DataSheetActionButtonsCell.tsx`

Row-level action buttons cell. Use only when rows need inline actions.

### Type
| Context | Value |
|---------|-------|
| Full action set (file, edit, magic, more) | `type="All Actions"` |
| Three specific actions | `type="3 Actions"` |
| Two specific actions | `type="2 Actions"` |
| Single action | `type="1 Actions"` |
| Approve / Cancel pair | `type="Cancel/Approve"` |

**Rules:**
- Always the **rightmost column** — never interrupt content columns
- Use only the handlers the scenario requires — omit unused ones
- `type="Cancel/Approve"` for workflow approval actions (approve/reject patterns)
- Never duplicate actions that exist elsewhere on the screen (e.g. a dedicated toolbar button)

---

## DataSheetTotalRow

**File:** `src/components/DataTable/DataSheetTotalRow.tsx`

Summary row rendered at the bottom of a data table. Use only when aggregate totals are meaningful for the user's goal.

### Type
| Content | Value |
|---------|-------|
| Text label (e.g. "Total") | `type="Text"` |
| Numeric aggregate value | `type="Numeric"` |

**Rules:**
- Always the **last row** of the table — never between data rows
- `empty={true}` when the column has no meaningful total (renders "–")
- `cellNumber` for numeric totals, `cellText` for text labels
- Never use for non-aggregate rows (e.g. subtotals mid-table belong in the data, not here)
- State follows the same model as other cells (`Default`, `Selected`, `Alert`, etc.)

---

## CubMenu & CubTopNavigationBar

These are **Shell components** — managed exclusively by `AppShell`.

**Never use them inside a page component.**
- Do not import CubMenu or CubTopNavigationBar in any page file
- Do not pass breadcrumbs, tabs, or nav items from a page
- All navigation state is owned by AppShell and derived from `src/config/navigation.ts`

---

## Layout Components (`src/layouts/`)

These are **Layer 2 wrappers** — not DS components. Contextual: choose one only when a full page is being built.

| Need | Component |
|------|-----------|
| Table / filterable list screen | `ListPageLayout` |
| KPI + charts / overview screen | `DashboardPageLayout` |
| Form / detail / wizard screen | `DetailPageLayout` |

Never create a new layout. Never use more than one layout per page.
See CLAUDE.md → Shell & Layout Architecture for full usage rules.

---

## Progressive Disclosure

Never render all available content at once when the count exceeds optimal visible limits.

| Situation | Pattern |
|-----------|---------|
| Filter chips > 4 | Show 4, then "+N more" pill that opens a full filter panel |
| Table columns > visible viewport | Allow horizontal scroll inside the container; never shrink columns below readability |
| Action buttons per row > 3 | Collapse extras into a "more" (`⋯`) icon button |
| Navigation items overflow sidebar | Group under a collapsible section; never truncate labels |
| Long text in a cell | Truncate with ellipsis; show full value in tooltip |
| Search results | Paginate; default page size 20–50 rows depending on row density |

**The rule:** collapse overflow — never omit it. The "+N more" or pagination must be functional, not a visual stub.

---

## Fallback Strategy

When multiple components could work:
- Choose the most standard and composable one
- Prefer DS components over Ant Design over custom
- When in doubt, choose the option that requires fewer props and less customization
- Never choose a component because it "looks similar" — match semantic meaning
