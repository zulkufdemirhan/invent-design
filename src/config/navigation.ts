import {
  faHouse,
  faTag,
  faCamera,
  faChartPie,
  faLayerGroup,
  faCubes,
  faTruck,
  faArrowRightArrowLeft,
  faChartLine,
  faShirt,
  faMoneyBillWave,
  faDatabase,
  faLightbulb,
  faFileMedical,
  faCircleQuestion,
  faUserGear,
  faCode,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * A navigation item. Can be a leaf (has `route`) or a group (has `children`).
 *
 * Rules:
 * - Top-level items have `icon`.
 * - Leaf items have `route` — clicking them navigates to that URL.
 * - Group items have `children` — clicking them toggles the submenu.
 * - An item without `route` and without `children` is visible but non-navigable
 *   (placeholder for future screens).
 */
export interface NavItem {
  key: string;
  label: string;
  icon?: IconDefinition;
  route?: string;
  children?: NavItem[];
}

export interface BreadcrumbNode {
  key: string;
  label: string;
  icon?: IconDefinition;
}

// ─── Primary Navigation ───────────────────────────────────────────────────────

export const primaryNavConfig: NavItem[] = [
  { key: 'home', label: 'Home', icon: faHouse, route: '/' },
  {
    key: 'markdown',
    label: 'Markdown',
    icon: faTag,
    children: [
      { key: 'markdown-item-1', label: 'Menu Item 1' },
      { key: 'markdown-item-2', label: 'Menu Item 2' },
      { key: 'markdown-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'pricing',
    label: 'Pricing',
    icon: faCamera,
    children: [
      { key: 'pricing-item-1', label: 'Menu Item 1' },
      { key: 'pricing-item-2', label: 'Menu Item 2' },
      { key: 'pricing-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'promotion',
    label: 'Promotion Analysis',
    icon: faChartPie,
    children: [
      { key: 'promotion-item-1', label: 'Menu Item 1' },
      { key: 'promotion-item-2', label: 'Menu Item 2' },
      { key: 'promotion-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'inventory',
    label: 'Inventory Management',
    icon: faLayerGroup,
    children: [
      { key: 'inventory-item-1', label: 'Menu Item 1' },
      { key: 'inventory-item-2', label: 'Menu Item 2' },
      { key: 'inventory-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'prepack',
    label: 'Size Prepack Optimization',
    icon: faCubes,
    children: [
      { key: 'prepack-item-1', label: 'Menu Item 1' },
      { key: 'prepack-item-2', label: 'Menu Item 2' },
      { key: 'prepack-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'replenishment',
    label: 'DC Replenishment Orders',
    icon: faTruck,
    children: [
      { key: 'replenishment-item-1', label: 'Menu Item 1' },
      { key: 'replenishment-item-2', label: 'Menu Item 2' },
      { key: 'replenishment-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'allocation',
    label: 'Allocation',
    icon: faArrowRightArrowLeft,
    children: [
      { key: 'allocation-item-1', label: 'Menu Item 1' },
      { key: 'allocation-item-2', label: 'Menu Item 2' },
      { key: 'allocation-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'transfer',
    label: 'Transfer',
    icon: faArrowRightArrowLeft,
    children: [
      { key: 'transfer-store-scenario', label: 'Store Scenario', route: '/transfer/store-scenario' },
      { key: 'transfer-runs', label: 'Transfer Runs', route: '/transfer/transfer-runs' },
      {
        key: 'transfer-reports',
        label: 'Reports',
        children: [
          { key: 'transfer-reports-monthly', label: 'Monthly Transfer Performance Dashboard', route: '/transfer/reports/monthly' },
          { key: 'transfer-reports-inventory', label: 'Store Inventory Positions', route: '/transfer/reports/inventory' },
        ],
      },
    ],
  },
  {
    key: 'forecast',
    label: 'Forecast',
    icon: faChartLine,
    children: [
      { key: 'forecast-item-1', label: 'Menu Item 1' },
      { key: 'forecast-item-2', label: 'Menu Item 2' },
      { key: 'forecast-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'assortment',
    label: 'Assortment',
    icon: faShirt,
    children: [
      { key: 'assortment-item-1', label: 'Menu Item 1' },
      { key: 'assortment-item-2', label: 'Menu Item 2' },
      { key: 'assortment-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'financial',
    label: 'Merchandising Financial Plan',
    icon: faMoneyBillWave,
    children: [
      { key: 'financial-item-1', label: 'Bottom-up Planning', route: '/financial/bottom-up-planning' },
      { key: 'financial-item-2', label: 'Menu Item 2' },
      { key: 'financial-item-3', label: 'Menu Item 3' },
    ],
  },
];

// ─── Secondary Navigation ─────────────────────────────────────────────────────

export const secondaryNavConfig: NavItem[] = [
  {
    key: 'data-maintenance',
    label: 'Data Maintenance',
    icon: faDatabase,
    children: [
      { key: 'data-maintenance-item-1', label: 'Menu Item 1' },
      { key: 'data-maintenance-item-2', label: 'Menu Item 2' },
      { key: 'data-maintenance-item-3', label: 'Menu Item 3' },
    ],
  },
  { key: 'insight-hub', label: 'Insight Hub', icon: faLightbulb },
  {
    key: 'reports',
    label: 'Reports',
    icon: faFileMedical,
    children: [
      { key: 'reports-item-1', label: 'Menu Item 1' },
      { key: 'reports-item-2', label: 'Menu Item 2' },
      { key: 'reports-item-3', label: 'Menu Item 3' },
    ],
  },
  { key: 'documentation', label: 'Documentation', icon: faCircleQuestion },
  {
    key: 'admin',
    label: 'Admin',
    icon: faUserGear,
    children: [
      { key: 'admin-item-1', label: 'Menu Item 1' },
      { key: 'admin-item-2', label: 'Menu Item 2' },
      { key: 'admin-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'in-development',
    label: 'In Development',
    icon: faCode,
    children: [
      { key: 'in-development-item-1', label: 'Menu Item 1' },
      { key: 'in-development-item-2', label: 'Menu Item 2' },
      { key: 'in-development-item-3', label: 'Menu Item 3' },
    ],
  },
];

// ─── Utilities ────────────────────────────────────────────────────────────────

export function getAllNavItems(): NavItem[] {
  return [...primaryNavConfig, ...secondaryNavConfig];
}

/** Find an item by its `route` field (recursive). */
function findByRoute(items: NavItem[], route: string): NavItem | null {
  for (const item of items) {
    if (item.route === route) return item;
    if (item.children) {
      const found = findByRoute(item.children, route);
      if (found) return found;
    }
  }
  return null;
}

/** Find an item by its `key` field (recursive). */
function findByKey(items: NavItem[], key: string): NavItem | null {
  for (const item of items) {
    if (item.key === key) return item;
    if (item.children) {
      const found = findByKey(item.children, key);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Returns the URL for a given menu key.
 * Returns `undefined` if the item has no registered route.
 */
export function getRouteForKey(key: string): string | undefined {
  return findByKey(getAllNavItems(), key)?.route;
}

/**
 * Returns the menu key that should be selected for the current pathname.
 * Returns `undefined` if no item matches.
 */
export function getSelectedKeyForRoute(pathname: string): string | undefined {
  return findByRoute(getAllNavItems(), pathname)?.key;
}

/** Walk the tree and collect ancestors leading to a route match. */
function getBreadcrumbPath(
  items: NavItem[],
  pathname: string,
  ancestors: NavItem[] = [],
): NavItem[] | null {
  for (const item of items) {
    const current = [...ancestors, item];
    if (item.route === pathname) return current;
    if (item.children) {
      const found = getBreadcrumbPath(item.children, pathname, current);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Returns the breadcrumb trail for the current pathname.
 * Icon is only attached to the first (root) segment.
 */
export function getBreadcrumbsForRoute(pathname: string): BreadcrumbNode[] {
  const path = getBreadcrumbPath(getAllNavItems(), pathname);
  if (!path) return [];
  return path.map((item, index) => ({
    key: `bc-${index}`,
    label: item.label,
    icon: index === 0 ? item.icon : undefined,
  }));
}

/** Walk the tree and collect ancestor group keys leading to a route match. */
function getOpenKeysPath(
  items: NavItem[],
  pathname: string,
  parents: string[] = [],
): string[] | null {
  for (const item of items) {
    if (item.route === pathname) return parents;
    if (item.children) {
      const found = getOpenKeysPath(item.children, pathname, [...parents, item.key]);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Returns the submenu keys that must be open for the given pathname.
 * Used to auto-expand the sidebar when navigating directly to a deep URL.
 */
export function getOpenKeysForRoute(pathname: string): string[] {
  return getOpenKeysPath(getAllNavItems(), pathname) ?? [];
}
