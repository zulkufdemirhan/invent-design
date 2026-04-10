# Skill: Navigation & Routing

This skill runs on every output that involves page creation or navigation changes.

---

## 1. URL Structure

```
/[module]/[screen]                    ← list / dashboard view
/[module]/[sub-module]/[screen]       ← nested module screen
/[module]/[sub-module]/[id]/detail    ← detail / edit view
```

Examples:
```
/mfp/bottom-up-planning
/mfp/bottom-up-planning/12345/detail
/allocation/store-transfers
/allocation/store-transfers/new
```

---

## 2. Route Registration

Every new screen requires **two** registrations in
`src/components/AppShell/AppShell.tsx`:

### 2a. ROUTE_MAP — pathname to breadcrumbs + selectedKey

```ts
'/[module]/[screen]': {
  breadcrumbs: [
    { key: 'bc-module', label: '[Module Label]', icon: fa[Icon] },
    { key: 'bc-screen', label: '[Screen Label]' },
  ],
  selectedKey: '[menu-item-key]',
},
```

### 2b. KEY_TO_ROUTE — menu key to pathname (enables click-to-navigate)

```ts
'[menu-item-key]': '/[module]/[screen]',
```

### 2c. Menu Item — add to DEFAULT_MENU_ITEMS in CubMenu

If the screen needs a sidebar link, add the item to the appropriate
section of `DEFAULT_MENU_ITEMS` in `src/components/CubMenu/CubMenu.tsx`.
Use the same `key` referenced in `KEY_TO_ROUTE`.

> **Do NOT create a new CubMenu or CubTopNavigationBar.**
> These already exist globally in `AppShell`. Only register routes
> and add menu items to the existing structures.

---

## 3. State Persistence via URL Params

The following states are kept in URL search params
so that browser back/forward preserves the user's context:

| State | Param | Example |
|-------|-------|---------|
| Active tab | `?tab=` | `?tab=overview` |
| Page number | `?page=` | `?page=3` |
| Page size | `?pageSize=` | `?pageSize=50` |
| Active filters | `?filter.[name]=` | `?filter.status=active&filter.region=east` |
| Sort | `?sort=` | `?sort=date:desc` |

### Implementation Pattern

```tsx
'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const searchParams = useSearchParams();
const router = useRouter();
const pathname = usePathname();

// Read
const currentTab = searchParams.get('tab') ?? 'overview';
const currentPage = Number(searchParams.get('page') ?? '1');

// Write — replace, don't push, for filter/tab changes
const updateParam = (key: string, value: string) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(key, value);
  router.replace(`${pathname}?${params.toString()}`);
};
```

---

## 4. Dirty Form Guard

If a form has been modified and the user tries to leave the page
(via browser back, sidebar click, or breadcrumb click):

```tsx
import { Modal } from 'antd';

const handleNavigation = (targetPath: string) => {
  if (isDirty) {
    Modal.confirm({
      title: 'Unsaved changes',
      content: 'You have unsaved changes. Are you sure you want to leave?',
      okText: 'Leave',
      cancelText: 'Stay',
      okType: 'danger',
      onOk: () => router.push(targetPath),
    });
  } else {
    router.push(targetPath);
  }
};
```

The guard should be applied:
- Before `router.push()` in sidebar navigation
- Before `router.back()` in breadcrumb clicks
- On the browser's `beforeunload` event for hard refreshes

---

## 5. Navigation Decision Matrix

| Scenario | Navigation Type |
|----------|----------------|
| Table row → full detail page | `router.push('/module/screen/[id]/detail')` |
| Table row → quick view | Open a Drawer (no URL change) |
| Table row → edit form | Open a Modal (no URL change) |
| Create new entity | `router.push('/module/screen/new')` or Modal |
| Tab switch | URL param `?tab=` (no page reload) |
| Breadcrumb click | `router.push()` to ancestor path |
| Sidebar click | `router.push()` via `KEY_TO_ROUTE` |

---

## 6. 404 and Error Handling

If a route does not match any entry in `ROUTE_MAP`:
- The breadcrumb falls back to the dynamic `buildBreadcrumbPath` logic
  using the menu item hierarchy
- If no match is found at all, the breadcrumb renders empty

For detail pages with invalid IDs:
- Show an inline error state: "Record not found"
- Provide a "Go back" button that calls `router.back()`
