import type { ReactNode } from 'react';
import { themeColorsLight } from '@/tokens/colors';
import { borderRadius } from '@/tokens/spacing';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DataTableContainerProps {
  /** DataSheet cells, toolbar, title row, and total row */
  children: ReactNode;
  /**
   * Container height.
   * Defaults to '100%' to fill the ListPageLayout content slot.
   * Pass a fixed value (e.g. 400) when used outside a layout slot.
   */
  height?: string | number;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Visual container for DataSheet components.
 *
 * Provides the 1px border, 6px radius, and white background that wraps
 * DataSheetTitle, DataSheetTextCell, DataSheetNumericCell, DataSheetStatusCell,
 * DataSheetFunctionCell, DataSheetActionButtonsCell, and DataSheetTotalRow.
 *
 * Always used as the children of ListPageLayout.
 */
export function DataTableContainer({ children, height = '100%' }: DataTableContainerProps) {
  return (
    <div
      style={{
        width: '100%',
        height,
        border: `1px solid ${themeColorsLight.colorBorderSecondary}`,
        borderRadius: borderRadius.borderRadius,
        overflow: 'hidden',
        background: themeColorsLight.colorBgContainer,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}
