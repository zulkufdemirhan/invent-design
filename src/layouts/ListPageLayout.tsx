import type { ReactNode } from 'react';
import { themeColorsLight } from '@/tokens/colors';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ListPageLayoutProps {
  /** FilterBar component — docked below the top nav, full width, no padding. */
  filterBar?: ReactNode;
  /** DataTableToolbar — docked below the filter bar, full width, no padding. */
  toolbar?: ReactNode;
  /** Main content (DataTable or equivalent). Fills remaining height. */
  children: ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Page layout for list / data-table screens.
 *
 * Structure (top → bottom):
 *   [filterBar]   optional — fixed height, zero padding
 *   [toolbar]     optional — fixed height, zero padding
 *   [children]    fills remaining height, overflow hidden (table manages its own scroll)
 *
 * AppShell's <main> is overflow: hidden, so this layout owns vertical space.
 * The table inside children must be height: 100% to use it.
 */
export function ListPageLayout({ filterBar, toolbar, children }: ListPageLayoutProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: themeColorsLight.colorBgLayout,
      }}
    >
      {filterBar && (
        <div style={{ flexShrink: 0 }}>
          {filterBar}
        </div>
      )}

      {toolbar && (
        <div style={{ flexShrink: 0 }}>
          {toolbar}
        </div>
      )}

      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
