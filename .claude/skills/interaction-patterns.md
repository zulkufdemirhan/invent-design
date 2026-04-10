# Skill: Interaction Patterns

This skill is applied **automatically** on every screen generation.
The patterns below are added to every relevant section even if the user does not explicitly request them.

---

## Purpose

Detect which regions the screen contains and automatically add the required
interaction patterns to each one.
No pattern is deferred with "I'll add it later" or "if needed."

---

## 1. Loading States

### When to Apply
Every component that fetches data. No exceptions.

### KPI Bar Loading
```tsx
// KPI card placeholder using Ant Design Skeleton
import { Skeleton } from 'antd';

{isLoading ? (
  <div style={{ display: 'flex', gap: padding.paddingLG }}>
    {Array.from({ length: kpiCount }).map((_, i) => (
      <div
        key={i}
        style={{
          width: 220,
          padding: padding.paddingLG,
          background: themeColorsLight.colorBgContainer,
          borderRadius: borderRadius.borderRadiusLG,
          border: `1px solid ${themeColorsLight.colorBorderSecondary}`,
        }}
      >
        <Skeleton active paragraph={{ rows: 2 }} title={{ width: '60%' }} />
      </div>
    ))}
  </div>
) : (
  <KpiCardRow cards={kpiData} />
)}
```

### DataTable Loading
```tsx
// Row skeleton while the table is loading
{isLoading ? (
  <div>
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} style={{ display: 'flex', borderBottom: `1px solid ${dataTableColorsLight.borderColor}` }}>
        {columns.map((col) => (
          <div key={col.key} style={{ width: col.width, padding: '8px 12px' }}>
            <Skeleton active title={{ width: '70%' }} paragraph={false} />
          </div>
        ))}
      </div>
    ))}
  </div>
) : (
  <DataTable ... />
)}
```

### Form Loading (during submit)
```tsx
// Loading state on the submit button
<Button
  type="primary"
  loading={isSubmitting}
  disabled={isSubmitting}
  label={isSubmitting ? 'Saving...' : 'Save'}
  onClick={handleSubmit}
/>
```

---

## 2. Empty States

### When to Apply
- When a table returns no rows (including filter results)
- When KPI data is unavailable
- When a list / card grid is empty

### Empty Table
```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';

const EmptyTable: React.FC<{ hasFilters?: boolean; onClearFilters?: () => void }> = ({
  hasFilters,
  onClearFilters,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${padding.paddingXL}px 0`,
      gap: padding.paddingMD,
    }}
  >
    <FontAwesomeIcon
      icon={faTableList}
      style={{ fontSize: iconSize.iconSizeXXL * 2, color: themeColorsLight.colorTextQuaternary }}
    />
    <div style={{ ...textStyles.base, color: themeColorsLight.colorTextSecondary, textAlign: 'center' }}>
      {hasFilters
        ? 'No records match the selected filters.'
        : 'No records found yet.'}
    </div>
    {hasFilters && onClearFilters && (
      <Button type="link" label="Clear Filters" onClick={onClearFilters} />
    )}
  </div>
);
```

### Empty State Messages
Use the entity name and context from the Domain Summary
to write the appropriate empty state message.

No filters active: "No [entity name] found yet."
Filters active:    "No [entity name] match the selected filters."

---

## 3. Error States

### When to Apply
After every async operation (fetch, submit, delete, export).

### API Error — Toast
```tsx
import { notification } from 'antd';

// Error
notification.error({
  message: 'Failed to load data',
  description: 'Please refresh the page and try again. Contact support if the issue persists.',
  duration: 5,
});

// Success
notification.success({
  message: 'Saved',
  description: 'Your changes have been applied successfully.',
  duration: 3,
});
```

### Table Error State (Inline)
```tsx
{hasError ? (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${padding.paddingXL}px 0`,
      gap: padding.paddingSM,
    }}
  >
    <FontAwesomeIcon
      icon={faTriangleExclamation}
      style={{ fontSize: 24, color: themeColorsLight.colorError }}
    />
    <span style={{ ...textStyles.base, color: themeColorsLight.colorTextSecondary }}>
      An error occurred while loading data.
    </span>
    <Button type="default" label="Retry" onClick={onRetry} />
  </div>
) : null}
```

---

## 4. DataTable Automatic Pattern

### Required for Every Table

```
DataTableToolbar       ← always
FilterBar              ← by default (unless specified otherwise)
DataTable              ← core
Pagination             ← always
Empty state            ← always
Loading skeleton       ← always
Error state            ← always
```

### Pagination Template
```tsx
import { Pagination } from 'antd';
import { themeColorsLight } from '@/tokens/colors';
import { padding } from '@/tokens/spacing';

<div
  style={{
    display: 'flex',
    justifyContent: 'flex-end',
    padding: `${padding.paddingSM}px ${padding.paddingLG}px`,
    borderTop: `1px solid ${themeColorsLight.colorBorderSecondary}`,
    background: themeColorsLight.colorBgContainer,
  }}
>
  <Pagination
    current={page}
    pageSize={pageSize}
    total={total}
    showSizeChanger
    showQuickJumper
    showTotal={(total) => `Total ${total} records`}
    onChange={(page, size) => {
      setPage(page);
      setPageSize(size);
    }}
    pageSizeOptions={['20', '50', '100']}
  />
</div>
```

### Toolbar — Automatic Wiring

When table type is `Editable Data`:
- Bind `wrapTextActive` to state
- Bind `aggregationCount` to the active aggregation count
- Set `cellEditActions` to `true` when edit mode is open

When table type is `None Editable Data`:
- Add Primary (Export) + Secondary (Filter) to `customActions` on the right
- Do not show the Import button

---

## 5. Form Validation and Submit Flow

### Required for Every Form

```tsx
import { Form, notification } from 'antd';

const [form] = Form.useForm();
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async () => {
  try {
    const values = await form.validateFields(); // validation fires here
    setIsSubmitting(true);

    // API call
    await submitData(values);

    notification.success({
      message: 'Saved',
      description: 'The form was submitted successfully.',
    });

    form.resetFields();
    onClose(); // close the modal / drawer
  } catch (error) {
    if (error instanceof Error) {
      // API error
      notification.error({
        message: 'Save failed',
        description: error.message || 'Please try again.',
      });
    }
    // Validation error — Form.useForm() highlights fields automatically
  } finally {
    setIsSubmitting(false);
  }
};
```

### Validation Rules — Add Automatically

| Field type | Rule |
|------------|------|
| Required text | `required: true, message: '[Field name] is required'` |
| Number | `type: 'number', min: 0` |
| Date | `required: true` + future date check (if applicable) |
| Email | `type: 'email'` |
| Select | `required: true, message: 'Please make a selection'` |

---

## 6. Modal / Drawer Pattern

### Trigger Wiring — Automatic

Whenever a clickable action is added to a table row, the trigger is wired automatically:

```tsx
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedRow, setSelectedRow] = useState<RowType | null>(null);

// Connected to the action button in the table
const handleRowAction = (row: RowType) => {
  setSelectedRow(row);
  setIsModalOpen(true);
};
```

### Modal Template

```tsx
import { Modal } from 'antd';

<Modal
  open={isModalOpen}
  title="[Modal Title]"
  onCancel={() => {
    setIsModalOpen(false);
    setSelectedRow(null);
    form.resetFields();
  }}
  footer={[
    <Button key="cancel" type="default" label="Cancel" onClick={() => setIsModalOpen(false)} />,
    <Button key="submit" type="primary" label="Save" loading={isSubmitting} onClick={handleSubmit} />,
  ]}
  destroyOnClose
  width={640}
>
  {/* form content */}
</Modal>
```

### Required Modal Behaviors

```
✅ Closes on Escape (Ant Design default — do not override)
✅ Overlay click closes (onCancel wired)
✅ Form resets on close (form.resetFields())
✅ destroyOnClose={true} — starts clean on reopen
✅ Footer buttons show loading, not disabled, during submit
✅ Close icon has ARIA label (provided by Ant Design)
```

### Drawer Template (for wide forms or detail panels)

```tsx
import { Drawer } from 'antd';

<Drawer
  open={isDrawerOpen}
  title="[Drawer Title]"
  width={720}
  onClose={() => {
    setIsDrawerOpen(false);
    setSelectedRow(null);
    form.resetFields();
  }}
  extra={
    <div style={{ display: 'flex', gap: padding.paddingXS }}>
      <Button type="default" label="Cancel" onClick={() => setIsDrawerOpen(false)} />
      <Button type="primary" label="Save" loading={isSubmitting} onClick={handleSubmit} />
    </div>
  }
  destroyOnClose
>
  {/* form or detail content */}
</Drawer>
```

---

## 7. Confirm Dialog — Critical Actions

For delete, irreversible status changes, and bulk operation confirmations:

```tsx
import { Modal } from 'antd';

const handleDelete = (id: string) => {
  Modal.confirm({
    title: 'Are you sure you want to delete this record?',
    content: 'This action cannot be undone.',
    okText: 'Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    onOk: async () => {
      try {
        await deleteRecord(id);
        notification.success({ message: 'Record deleted.' });
        refetch();
      } catch {
        notification.error({ message: 'Delete failed.' });
      }
    },
  });
};
```

---

## 8. Keyboard Navigation

Apply these automatically to every new component:

| Element | Behavior |
|---------|----------|
| Buttons | Reachable via `Tab`, triggered by `Enter` / `Space` |
| Table rows | Navigable with `Arrow` keys (Ant Design default) |
| Modal | `Escape` closes, focus trap active |
| Select / Dropdown | `Arrow` + `Enter` to select |
| Icon-only button | `aria-label` required |

```tsx
// Icon-only button example
<button
  aria-label="Delete record"
  onClick={() => handleDelete(row.id)}
  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
>
  <FontAwesomeIcon icon={faTrash} style={{ fontSize: iconSize.iconSize }} />
</button>
```

---

## 9. Navigation Transitions

Row click decision:
- If the detail view needs an independent URL → navigate to a new page
- If it can be viewed without leaving the current context → Drawer
- Small form edit → Modal
- Large form edit → Drawer

Back navigation:
- Breadcrumb is mandatory on every detail page
- Browser back must work (`router.back()`)
- If the form is dirty, show an "Unsaved changes" confirm dialog before leaving the page

---

## 10. Bulk Action Pattern

When rows are selected, DataTableToolbar automatically switches to bulk action mode:
- "[N] items selected" is displayed
- Bulk action buttons become active
- Clearing the selection returns to normal mode
- A confirm dialog is mandatory before any bulk operation

---

## Pattern Application Matrix

The table below shows which patterns are automatically active for each screen region:

| Screen Region | Loading | Empty | Error | Pagination | Validation | Confirm |
|---------------|---------|-------|-------|------------|------------|---------|
| KPI Bar | ✅ | ✅ | ✅ | — | — | — |
| DataTable | ✅ | ✅ | ✅ | ✅ | — | — |
| Form / Modal | ✅ | — | ✅ | — | ✅ | — |
| Delete action | — | — | ✅ | — | — | ✅ |
| Bulk action | ✅ | — | ✅ | — | — | ✅ |
| Export | ✅ | — | ✅ | — | — | — |
| Navigation | — | — | ✅ | — | — | ✅ |
