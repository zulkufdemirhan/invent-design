'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CubMenu, { type CubMenuItem, type CubMenuSubItem } from '@/components/CubMenu/CubMenu';
import CubTopNavigationBar from '@/components/CubTopNavigationBar/CubTopNavigationBar';
import { themeColorsLight } from '@/tokens/colors';
import {
  primaryNavConfig,
  secondaryNavConfig,
  type NavItem,
  getRouteForKey,
  getSelectedKeyForRoute,
  getBreadcrumbsForRoute,
  getOpenKeysForRoute,
} from '@/config/navigation';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AppShellProps {
  children: React.ReactNode;
}

// ─── Nav → CubMenu converters ─────────────────────────────────────────────────

function toSubItems(items: NavItem[]): CubMenuSubItem[] {
  return items.map((item) => ({
    key: item.key,
    label: item.label,
    children: item.children ? toSubItems(item.children) : undefined,
  }));
}

function toMenuItems(items: NavItem[]): CubMenuItem[] {
  return items.map((item) => ({
    key: item.key,
    label: item.label,
    icon: item.icon,
    expandable: !!(item.children?.length),
    children: item.children ? toSubItems(item.children) : undefined,
  }));
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>(
    () => getSelectedKeyForRoute(pathname) ?? 'home',
  );
  const [openKeys, setOpenKeys] = useState<string[]>(
    () => getOpenKeysForRoute(pathname),
  );

  // Sync selected + open keys when the URL changes (browser back/forward, direct links)
  useEffect(() => {
    const key = getSelectedKeyForRoute(pathname);
    const required = getOpenKeysForRoute(pathname);
    if (key) setSelectedKey(key);
    // Merge: keep any manually opened keys, add required ancestors
    setOpenKeys((prev) => Array.from(new Set([...prev, ...required])));
  }, [pathname]);

  const handleItemClick = (key: string) => {
    setSelectedKey(key);
    const route = getRouteForKey(key);
    if (route) router.push(route);
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const breadcrumbs = getBreadcrumbsForRoute(pathname);

  // Stable references — recalculated only when config changes (never at runtime)
  const menuItems = useMemo(() => toMenuItems(primaryNavConfig), []);
  const secondaryMenuItems = useMemo(() => toMenuItems(secondaryNavConfig), []);

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
          items={menuItems}
          secondaryItems={secondaryMenuItems}
          selectedKey={selectedKey}
          openKeys={openKeys}
          onItemClick={handleItemClick}
          onOpenChange={handleOpenChange}
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

        {/* Page Content — overflow: hidden so layout patterns control their own scroll */}
        <main
          style={{
            flex: 1,
            overflow: 'hidden',
            background: themeColorsLight.colorBgLayout,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
