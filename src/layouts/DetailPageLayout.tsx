import type { ReactNode } from 'react';
import { themeColorsLight } from '@/tokens/colors';
import { padding } from '@/tokens/spacing';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DetailPageLayoutProps {
  /** Main content (form, detail cards, tabs). */
  children: ReactNode;
  /** Padding around the entire page. Defaults to the `padding` token (16px). */
  pagePadding?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Page layout for detail, form, and wizard screens.
 *
 * Padded and vertically scrollable. Use this for:
 * - Single-entity detail views (order detail, product detail)
 * - Create / edit forms
 * - Multi-step wizards
 *
 * Unlike ListPageLayout, the full content area scrolls as a single unit.
 */
export function DetailPageLayout({
  children,
  pagePadding = padding.padding,
}: DetailPageLayoutProps) {
  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: themeColorsLight.colorBgLayout,
        padding: pagePadding,
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
}