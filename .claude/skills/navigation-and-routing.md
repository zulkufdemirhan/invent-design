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
/financial/bottom-up-planning
/transfer/transfer-runs
/transfer/reports/monthly
/allocation/store-transfers
/allocation/store-transfers/new
```

---

## 2. Route Registration

**Single file to edit:** `src/config/navigation.ts`

This is the **only** place to register routes. AppShell, breadcrumbs, and
active menu state all derive automatically from this config — no manual wiring.

### 2a. Add a NavItem to the config

Find the parent group and add a leaf with a `route`:

```ts
// src/config/navigation.ts

{
  key: 'assortment',
  label: 'Assortment',
  icon: faShirt,
  children: [
    // Add new screen here:
    { key: 'assortment-planning', label: 'Planning', route: '/assortment/planning' },
    { key: 'assortment-item-2', label: 'Menu Item 2' },
  ],
},
```

Rules:
- `key` must be unique across the entire config
- `route` follows the URL pattern from section 1
- Icon is only set on top-level group items, not on children
- Items without `route` are visible in the menu but non-navigable (placeholders)

### 2b. Create the page file

```
src/app/[module]/[screen]/page.tsx
```

That's it. Navigation, breadcrumbs, sidebar active state, and URL sync all
work automatically. No ROUTE_MAP, no KEY_TO_ROUTE, no manual breadcrumb config.

### What AppShell derives automatically from the config

| What | How |
|------|-----|
| Sidebar active item | `getSelectedKeyForRoute(pathname)` |
| Open submenu ancestors | `getOpenKeysForRoute(pathname)` |
| Breadcrumb trail | `getBreadcrumbsForRoute(pathname)` |
| Click → URL | `getRouteForKey(key)` |

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
| Sidebar click | Handled by AppShell via `getRouteForKey` |

---

## 6. 404 and Unregistered Routes

If a pathname has no matching `route` in `src/config/navigation.ts`:
- The breadcrumb renders empty
- The sidebar shows no active item

This means a page file exists but the nav config entry is missing.
**Always register the route in the config before creating the page file.**
