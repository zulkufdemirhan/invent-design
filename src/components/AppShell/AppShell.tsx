'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMoneyBillWave, type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import CubMenu, {
  DEFAULT_MENU_ITEMS,
  DEFAULT_SECONDARY_ITEMS,
  type CubMenuItem,
  type CubMenuSubItem,
} from '@/components/CubMenu/CubMenu';
import CubTopNavigationBar, { type CubTopNavBreadcrumb } from '@/components/CubTopNavigationBar/CubTopNavigationBar';
import { themeColorsLight } from '@/tokens/colors';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AppShellProps {
  children: React.ReactNode;
}

// ─── Breadcrumb helpers ───────────────────────────────────────────────────────

interface BreadcrumbNode {
  label: string;
  icon?: IconDefinition;
}

/** Recursively search sub-items for the target key. Returns label chain or null. */
function findInSubItems(key: string, items: CubMenuSubItem[]): BreadcrumbNode[] | null {
  for (const item of items) {
    if (item.key === key) return [{ label: item.label }];
    if (item.children) {
      const found = findInSubItems(key, item.children);
      if (found) return [{ label: item.label }, ...found];
    }
  }
  return null;
}

/**
 * Returns the breadcrumb path for `key` across all top-level items.
 * e.g. key='pricing-item-2' → [{ label:'Pricing', icon:faCamera }, { label:'Menu Item 2' }]
 */
function buildBreadcrumbPath(key: string, items: CubMenuItem[]): BreadcrumbNode[] | null {
  for (const item of items) {
    if (item.key === key) return [{ label: item.label, icon: item.icon }];
    if (item.children) {
      const found = findInSubItems(key, item.children);
      if (found) return [{ label: item.label, icon: item.icon }, ...found];
    }
  }
  return null;
}

const ALL_ITEMS = [...DEFAULT_MENU_ITEMS, ...DEFAULT_SECONDARY_ITEMS];

// ─── Route → breadcrumb + selectedKey map ────────────────────────────────────

interface RouteConfig {
  breadcrumbs: CubTopNavBreadcrumb[];
  selectedKey: string;
}

const ROUTE_MAP: Record<string, RouteConfig> = {
  '/mfp/bottom-up-planning': {
    breadcrumbs: [
      { key: 'bc-mfp', label: 'Merchandising Financial Plan', icon: faMoneyBillWave },
      { key: 'bc-bup', label: 'Bottom-up Planning' },
    ],
    selectedKey: 'financial-item-1',
  },
};

/** Maps a menu leaf key → the pathname to push when the item is clicked. */
const KEY_TO_ROUTE: Record<string, string> = {
  'home': '/',
  'financial-item-1': '/mfp/bottom-up-planning',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('home');
  const pathname = usePathname();
  const router = useRouter();

  // Sync selectedKey when navigating via URL (browser back/forward, direct link)
  useEffect(() => {
    const routeConfig = ROUTE_MAP[pathname];
    if (routeConfig) setSelectedKey(routeConfig.selectedKey);
  }, [pathname]);

  const handleItemClick = (key: string) => {
    setSelectedKey(key);
    const route = KEY_TO_ROUTE[key];
    if (route) router.push(route);
  };

  const routeConfig = ROUTE_MAP[pathname];
  const path = routeConfig ? null : buildBreadcrumbPath(selectedKey, ALL_ITEMS);
  const breadcrumbs: CubTopNavBreadcrumb[] = routeConfig?.breadcrumbs ?? path?.map((node, index) => ({
    key: `bc-${index}`,
    label: node.label,
    // Icon only on the first (parent) segment
    icon: index === 0 ? node.icon : undefined,
  })) ?? [];

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        background: themeColorsLight.colorBgLayout,
      }}
    >
      {/* ── Sidebar ── */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <CubMenu
          collapsed={collapsed}
          selectedKey={selectedKey}
          onItemClick={handleItemClick}
          logoIcon={
            <img
              src="/images/logo.png"
              alt="invent.ai"
              style={{ width: 28, height: 28, objectFit: 'contain', display: 'block' }}
            />
          }
          footerWordmark={
            <img
              src="/images/wordmark.png"
              alt="invent.ai"
              style={{ height: 18, objectFit: 'contain', display: 'block' }}
            />
          }
          footerLogoIcon={
            <img
              src="/images/logo.png"
              alt="invent.ai"
              style={{ width: 24, height: 24, objectFit: 'contain', display: 'block' }}
            />
          }
        />

        {/* Collapse toggle — sits at the sidebar edge */}
        <button
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setCollapsed((c) => !c)}
          style={{
            position: 'absolute',
            top: 14,
            right: -12,
            width: 24,
            height: 24,
            borderRadius: '50%',
            border: `1px solid ${themeColorsLight.colorBorderSecondary}`,
            background: themeColorsLight.colorBgContainer,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            padding: 0,
            color: themeColorsLight.colorTextSecondary,
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          }}
        >
          <FontAwesomeIcon
            icon={collapsed ? faChevronRight : faChevronLeft}
            style={{ width: 10, height: 10 }}
          />
        </button>
      </div>

      {/* ── Main Column ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {/* Top Navigation Bar */}
        <CubTopNavigationBar
          breadcrumbs={breadcrumbs}
          showTabs={false}
        />

        {/* Page Content */}
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            background: themeColorsLight.colorBgLayout,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
