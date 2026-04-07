import React from 'react';
import { Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { dataTableColorsLight } from '@/tokens/colors';
import { themeColorsLight, baseColorPalettes } from '@/tokens/colors';
import { fontFamily, fontSize, lineHeightPx } from '@/tokens/typography';
import { borderRadius } from '@/tokens/spacing';
import { iconSize } from '@/tokens/icons';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataSheetStatusCellState =
  | 'Default'
  | 'Default Selected'
  | 'Multiple Selected'
  | 'Disabled'
  | 'Disabled Selected'
  | 'Alert'
  | 'Alert Selected';

export type DataSheetStatusCellType =
  | 'Green (Waiting for Release)'
  | 'Light Green (Order Reviewed)'
  | 'Blue (Order Released)'
  | 'Orange (Waiting for Review)'
  | 'Red (Failed/Canceled)'
  | 'Grey (Out of Frequency)'
  | 'Black (Non-Editable)'
  | 'Purple'
  | 'Magenta';

export interface DataSheetStatusCellProps {
  /** Cell state */
  state?: DataSheetStatusCellState;
  /** Status type — determines badge color and default label */
  type?: DataSheetStatusCellType;
  /** Override the displayed status label */
  cellText?: string;
  /** Show info/warning icon */
  showInfoIcon?: boolean | string;
  /** Column width */
  width?: number;
  /** Click handler */
  onClick?: () => void;
}

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<DataSheetStatusCellType, { dot: string; label: string }> = {
  'Green (Waiting for Release)': { dot: baseColorPalettes['green-6'],  label: 'Waiting for Release' },
  'Light Green (Order Reviewed)':{ dot: baseColorPalettes['green-4'],  label: 'Order Reviewed'      },
  'Blue (Order Released)':        { dot: baseColorPalettes['blue-6'],   label: 'Order Released'      },
  'Orange (Waiting for Review)':  { dot: baseColorPalettes['orange-6'], label: 'Waiting for Review'  },
  'Red (Failed/Canceled)':        { dot: baseColorPalettes['red-7'],    label: 'Order Canceled'      },
  'Grey (Out of Frequency)':      { dot: baseColorPalettes['gray-7'],   label: 'Out of Frequency'    },
  'Black (Non-Editable)':         { dot: baseColorPalettes['gray-10'],  label: 'Non-Editable'        },
  'Purple':                       { dot: baseColorPalettes['purple-6'], label: 'Purple'              },
  'Magenta':                      { dot: baseColorPalettes['magenta-6'],label: 'Magenta'             },
};

// ─── Background helpers ───────────────────────────────────────────────────────

function getBackground(state: DataSheetStatusCellState): string {
  switch (state) {
    case 'Default Selected':
    case 'Multiple Selected':
    case 'Disabled Selected':
    case 'Alert Selected':
      return dataTableColorsLight.accentLight;
    case 'Disabled':
      return dataTableColorsLight.bgCellMedium;
    case 'Alert':
      return themeColorsLight.colorErrorBg;
    default:
      return dataTableColorsLight.bgCell;
  }
}

function getBorderColor(state: DataSheetStatusCellState): string {
  if (state === 'Default Selected' || state === 'Alert Selected') return dataTableColorsLight.accentColor;
  return dataTableColorsLight.borderColor;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const DataSheetStatusCell: React.FC<DataSheetStatusCellProps> = ({
  state = 'Default',
  type = 'Green (Waiting for Release)',
  cellText,
  showInfoIcon = false,
  width = 200,
  onClick,
}) => {
  const config = STATUS_CONFIG[type];
  const label = cellText ?? config.label;
  const disabled = state === 'Disabled' || state === 'Disabled Selected';
  const alert = state === 'Alert' || state === 'Alert Selected';

  const infoIconNode = showInfoIcon ? (
    <Tooltip title={typeof showInfoIcon === 'string' ? showInfoIcon : undefined}>
      <FontAwesomeIcon
        icon={alert ? faTriangleExclamation : faCircleInfo}
        style={{
          fontSize: iconSize.iconSizeSM,
          color: alert ? themeColorsLight.colorErrorText : dataTableColorsLight.textMedium,
          flexShrink: 0,
          width: 13,
        }}
      />
    </Tooltip>
  ) : null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width,
        height: 32,
        padding: '0 8px',
        background: getBackground(state),
        border: `1px solid ${getBorderColor(state)}`,
        boxSizing: 'border-box',
        opacity: disabled ? 0.5 : 1,
        cursor: onClick ? 'pointer' : 'default',
        flexShrink: 0,
      }}
      onClick={!disabled ? onClick : undefined}
    >
      {/* Content: dot + label */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        {/* Status badge dot */}
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: borderRadius.borderRadiusLG,
            background: config.dot,
            flexShrink: 0,
          }}
        />
        {/* Label */}
        <span
          style={{
            flex: 1,
            fontFamily,
            fontSize: fontSize.fontSize,
            lineHeight: `${lineHeightPx.lineHeight}px`,
            color: dataTableColorsLight.textDark,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            minWidth: 0,
          }}
        >
          {label}
        </span>
      </div>

      {infoIconNode}
    </div>
  );
};

export default DataSheetStatusCell;
