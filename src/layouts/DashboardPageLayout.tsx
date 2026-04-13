import type { ReactNode } from 'react';
import { themeColorsLight } from '@/tokens/colors';
import { padding } from '@/tokens/spacing';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DashboardPageLayoutProps {
  /** Optional row of KpiCard components docked at the top. */
  kpiRow?: ReactNode;
  /** Main content (charts, summary tables, widgets). */
  children: ReactNode;
  /** Padding around the entire page. Defaults to the `padding` token (16px). */
  pagePadding?: number;
  /** Gap between the kpiRow and the main content. Defaults to `paddingLG` (24px). */
  sectionGap?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Page layout for dashboard / overview screens.
 *
 * Structure (top → bottom):
 *   [kpiRow]    optional — KPI cards, full width
 *   [children]  charts, widgets, and summary content
 *
 * The full area is padded and scrollable — content is allowed to grow beyond
 * the viewport height because dashboards are read, not interacted with.
 */
export function DashboardPageLayout({
  kpiRow,
  children,
  pagePadding = padding.padding,
  sectionGap = padding.paddingLG,
}: DashboardPageLayoutProps) {
  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: themeColorsLight.colorBgLayout,
        padding: pagePadding,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: sectionGap,
      }}
    >
      {kpiRow && (
        <div style={{ flexShrink: 0 }}>
          {kpiRow}
        </div>
      )}

      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
}
