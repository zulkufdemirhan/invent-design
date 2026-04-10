# Skill: Code Quality & Architecture

This skill runs passively on every code generation and every revision.
Rules are not optional — they apply to every output.

---

## Role Protocol

Switch active role based on the current phase.
Only one role is primary at a time.

| Phase | Active Role | Responsibility |
|-------|-------------|----------------|
| domain-analysis.md | UX Designer | Understand user needs, define flows, validate journeys |
| Screen Plan (Phase 1) | UX Engineer | Translate UX decisions into component structure and layout |
| Code Generation (Phase 2) | Frontend Engineer | Implement with tokens, components, SOLID principles |
| Iteration (Phase 3) | Staff Engineer | Preserve architecture, apply minimal targeted changes |

When writing code, the Frontend Engineer role is active.
Do not make UX decisions during code generation.
Do not write code during UX planning.

---

## File Size Limits

These limits are hard. If a limit is exceeded, split before delivering.

| File Type | Max Lines |
|-----------|-----------|
| `[Screen]View.tsx` | 300 |
| Any component `.tsx` | 150 |
| Any custom hook | 100 |
| Column definitions file | 120 |
| Type definitions file | No limit |

### What to do when the limit is reached

Do not ask. Split automatically and declare it:

```
**Split applied:** [ScreenName]View.tsx exceeded 300 lines.
**Extracted:**
- useTransferLogic.ts    ← state + handlers
- TransferColumns.tsx    ← column definitions
- TransferTypes.ts       ← interfaces
```

---

## Required File Structure

For every new screen, use this structure. No exceptions.

```
src/app/[module]/[screen]/
├── page.tsx                        ← Next.js Server Component wrapper only
├── [ScreenName]View.tsx            ← layout + render only (max 300 lines)
├── use[ScreenName]Logic.ts         ← all state, handlers, API calls
├── [ScreenName]Toolbar.tsx         ← toolbar (if screen has one)
├── [ScreenName]Columns.tsx         ← table column definitions (if table exists)
├── [ScreenName]Types.ts            ← all TypeScript interfaces for this screen
├── [ScreenName]Data.ts             ← mock / sample data (if needed)
└── [ScreenName]Context.tsx         ← React context (if prop drilling risk exists)
```

#### Placement Rule — src/app vs src/components

Before creating any file, ask:
"Will this file be used by more than one screen or module?"

YES → it is a shared DS component, already exists in src/components/
      use it, do not recreate it
NO  → place in src/app/[module]/[screen]/

Never create new files inside src/components/.
src/components/ is managed manually by the team.

---

## SOLID Enforcement

### S — Single Responsibility
Each file does exactly one thing.

```tsx
// ❌ View file doing logic
export const OrderView = () => {
  const [data, setData] = useState([]);
  const handleSubmit = async () => { ... API call ... };
  const filteredData = data.filter(...);
  return <OrderTable data={filteredData} />;
};

// ✅ Logic extracted to hook
export const OrderView = () => {
  const { data, handleSubmit } = useOrderLogic();
  return <OrderTable data={data} />;
};
```

### O — Open / Closed
Extend via props. Do not modify existing components to add new behavior.

```tsx
// ❌ Modifying existing component
export const Button = ({ label, type, newProp }) => { ... };

// ✅ Composing on top
export const DangerButton = (props: ButtonProps) => (
  <Button {...props} type="primary" danger />
);
```

### L — Liskov Substitution
A component that receives a base interface must work
when a more specific type is passed.
Always define base interfaces, then extend them.

```tsx
interface BaseRowProps { id: string; label: string; }
interface OrderRowProps extends BaseRowProps { status: OrderStatus; }
```

### I — Interface Segregation
Do not pass props a component does not use.
If a component uses 3 of 10 props, split the interface.

```tsx
// ❌ Fat interface
interface TableProps {
  data, columns, onEdit, onDelete, onExport,
  pagination, loading, filters, toolbar, ...
}

// ✅ Segregated
interface TableDataProps { data: Row[]; columns: Column[]; loading: boolean; }
interface TableActionsProps { onEdit?: (row: Row) => void; onDelete?: (id: string) => void; }
```

### D — Dependency Inversion
Views depend on abstractions (hooks, interfaces), not on concrete implementations.

```tsx
// ❌ Direct API call in view
const OrderView = () => {
  useEffect(() => { fetch('/api/orders').then(...) }, []);
};

// ✅ Abstracted via hook
const OrderView = () => {
  const { orders, isLoading } = useOrders();
};
```

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase | `TransferDetailDrawer` |
| Hook | camelCase, `use` prefix | `useTransferLogic` |
| Interface | PascalCase, no `I` prefix | `TransferRowProps` |
| Type alias | PascalCase | `OrderStatus` |
| Constant | UPPER_SNAKE_CASE | `DEFAULT_PAGE_SIZE` |
| Handler function | `handle` prefix | `handleRowClick` |
| Boolean state | `is` / `has` prefix | `isLoading`, `hasError` |

---

## Pre-delivery Architecture Check

Before delivering any code, verify:

```
[ ] No file exceeds its line limit
[ ] View file contains only layout and render logic
[ ] All state and handlers live in a hook
[ ] Column definitions are in a separate file (if table exists)
[ ] All interfaces are in a Types file
[ ] No prop drilling deeper than 2 levels
    (if deeper → extract context or pass via hook)
[ ] No inline anonymous functions in JSX
    (e.g. onClick={() => doSomething()} → extract to handler)
[ ] No component defined inside another component
[ ] Named exports only — no default exports
[ ] No `any` types
[ ] All generated files are in src/app/[module]/[screen]/
    Nothing was created inside src/components/
[ ] CubMenu sidebar link is wired and selectedKey is set
[ ] CubTopNavigationBar tabs wired (or showTabs={false})
[ ] URL params passed correctly from page.tsx to View
```

---

## Prop Drilling Rule

If a prop is passed through more than 2 component levels, stop and refactor:
- Extract a custom hook and consume it directly
- Or pass data via React Context if truly global

```tsx
// ❌ Prop drilling 3 levels deep
<PageLayout onSave={handleSave}>
  <FormSection onSave={handleSave}>
    <SubmitButton onSave={handleSave} />
  </FormSection>
</PageLayout>

// ✅ Hook consumed directly
const SubmitButton = () => {
  const { handleSave } = useFormLogic();
  return <Button label="Save" onClick={handleSave} />;
};
```

---

## Inline Function Rule

Do not define functions inline in JSX. Extract all handlers.

```tsx
// ❌ Inline
<Button onClick={() => { setOpen(true); setSelected(row); }} label="Edit" />

// ✅ Extracted
const handleEditClick = (row: OrderRow) => {
  setOpen(true);
  setSelected(row);
};
<Button onClick={() => handleEditClick(row)} label="Edit" />
```
