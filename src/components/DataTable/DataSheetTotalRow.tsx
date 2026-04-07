import React from 'react';
import { Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faTriangleExclamation, faGear } from '@fortawesome/free-solid-svg-icons';
import { dataTableColorsLight } from '@/tokens/colors';
import { themeColorsLight } from '@/tokens/colors';
import { fontFamily, fontSize, lineHeightPx } from '@/tokens/typography';
import { iconSize } from '@/tokens/icons';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataSheetTotalRowState =
  | 'Default'
  | 'Hover'
  | 'Focus'
  | 'Selected'
  | 'Alert';

export type DataSheetTotalRowType = 'Text' | 'Numeric';

export interface DataSheetTotalRowProps {
  /** Text content (Text type) */
  cellText?: string;
  /** Numeric content (Numeric type) */
  cellNumber?: string;
  /** Show as empty — displays "-" placeholder */
  empty?: boolean;
  /** Show custom (gear) icon */
  showCustomIcon?: boolean;
  /** Show info/warning icon */
  showInfoIcon?: boolean | string;
  /** Cell state */
  state?: DataSheetTotalRowState;
  /** Cell type */
  type?: DataSheetTotalRowType;
  /** Column width */
  width?: number;
  /** Click handler */
  onClick?: () => void;
}

// ─── Background helpers ───────────────────────────────────────────────────────

function getBackground(state: DataSheetTotalRowState): string {
  switch (state) {
    case 'Selected': return dataTableColorsLight.accentLight;
    case 'Focus':    return dataTableColorsLight.bgHeaderHasFocus;
    case 'Hover':    return dataTableColorsLight.bgHeaderHovered;
    case 'Alert':    return themeColorsLight.colorErrorBg;
    default:         return dataTableColorsLight.bgTotalRow;
  }
}

function getBorderColor(state: DataSheetTotalRowState): string {
  if (state === 'Selected') return dataTableColorsLight.accentColor;
  return dataTableColorsLight.borderColor;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const DataSheetTotalRow: React.FC<DataSheetTotalRowProps> = ({
  cellText = 'Total',
  cellNumber = '200',
  empty = false,
  showCustomIcon = false,
  showInfoIcon = false,
  state = 'Default',
  type = 'Text',
  width = 200,
  onClick,
}) => {
  const isAlert = state === 'Alert';

  // ── Text styles ────────────────────────────────────────────────────────────
  // Not-empty: Semi Bold + Italic, 12px
  // Empty: Bold, not italic, 12px  (shows dash)
  const textStyle: React.CSSProperties = {
    flex: 1,
    fontFamily,
    fontSize: fontSize.fontSizeSM,           // 12px
    lineHeight: `${lineHeightPx.lineHeightSM}px`, // 16px
    fontWeight: 600,
    fontStyle: empty ? 'normal' : 'italic',
    color: dataTableColorsLight.textHeader,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    minWidth: 0,
    textAlign: type === 'Numeric' ? 'right' : 'left',
  };

  // ── Info icon ──────────────────────────────────────────────────────────────
  const infoIconNode = showInfoIcon ? (
    <Tooltip title={typeof showInfoIcon === 'string' ? showInfoIcon : undefined}>
      <FontAwesomeIcon
        icon={isAlert ? faTriangleExclamation : faCircleInfo}
        style={{
          fontSize: iconSize.iconSizeSM,
          color: isAlert ? themeColorsLight.colorError : dataTableColorsLight.textMedium,
          flexShrink: 0,
          width: 13,
        }}
      />
    </Tooltip>
  ) : null;

  // ── Custom (gear) icon ─────────────────────────────────────────────────────
  const customIconNode = showCustomIcon ? (
    <FontAwesomeIcon
      icon={faGear}
      style={{
        fontSize: iconSize.iconSizeSM,
        color: dataTableColorsLight.textMedium,
        flexShrink: 0,
        width: 13,
      }}
    />
  ) : null;

  const displayValue = empty ? '-' : type === 'Numeric' ? cellNumber : cellText;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        width,
        height: 32,
        padding: '0 8px',
        background: getBackground(state),
        border: `1px solid ${getBorderColor(state)}`,
        boxSizing: 'border-box',
        cursor: onClick ? 'pointer' : 'default',
        flexShrink: 0,
      }}
      onClick={onClick}
    >
      {/* Custom icon left — Text type only */}
      {type === 'Text' && customIconNode}

      {/* Text content */}
      <span style={textStyle}>{displayValue}</span>

      {/* Right side: info icon + custom icon (Numeric type) */}
      {infoIconNode}
      {type === 'Numeric' && customIconNode}
    </div>
  );
};

export default DataSheetTotalRow;
