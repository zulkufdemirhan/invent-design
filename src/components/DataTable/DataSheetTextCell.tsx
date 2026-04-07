import React from 'react';
import { Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faTriangleExclamation,
  faGear,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { faPenLine } from '@/tokens/faCustomIcons';
import { dataTableColorsLight } from '@/tokens/colors';
import { themeColorsLight } from '@/tokens/colors';
import { fontFamily, fontSize, fontWeight, lineHeightPx } from '@/tokens/typography';
import { iconSize } from '@/tokens/icons';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataSheetTextCellState =
  | 'Default'
  | 'Default Selected'
  | 'Multiple Selected'
  | 'Disabled'
  | 'Disabled Selected'
  | 'Searchable'
  | 'Alert'
  | 'Alert Selected';

export type DataSheetTextCellType = 'None Editable' | 'Editable' | 'Expandable';
export type DataSheetTextCellLevel = 'Level 1' | 'Level 2' | 'Level 3';

export interface DataSheetTextCellProps {
  /** Cell text content */
  cellText?: string;
  /** Visual / interaction state */
  state?: DataSheetTextCellState;
  /** Cell editing capability */
  type?: DataSheetTextCellType;
  /** Expandable row hierarchy level — drives inner-content left indent */
  level?: DataSheetTextCellLevel;
  /** Show left gear icon (inside content area) */
  showLeftIcon?: boolean;
  /**
   * Show right info/warning icon.
   * Pass a string to show as tooltip text.
   * In Alert state renders as a warning triangle in error color.
   */
  showInfoIcon?: boolean | string;
  /** Value was modified — renders text bold */
  valueChanged?: boolean;
  /** Two-line height mode (44px instead of 32px) */
  twoLines?: boolean;
  /** Column width */
  width?: number;
  /** Click handler */
  onClick?: () => void;
  /** Expand/collapse toggle handler (Expandable type) */
  onExpandToggle?: () => void;
}

// ─── Level indent map ─────────────────────────────────────────────────────────

const LEVEL_INDENT: Record<DataSheetTextCellLevel, number> = {
  'Level 1': 0,
  'Level 2': 16,
  'Level 3': 32,
};

// ─── State → visual token map ─────────────────────────────────────────────────

type StateTokens = { background: string; borderColor: string };

function getStateTokens(state: DataSheetTextCellState): StateTokens {
  switch (state) {
    case 'Default Selected':
      return {
        background: dataTableColorsLight.accentLight,
        borderColor: dataTableColorsLight.accentColor,
      };
    case 'Multiple Selected':
      return {
        background: dataTableColorsLight.accentLight,
        borderColor: dataTableColorsLight.borderColor,
      };
    case 'Disabled':
    case 'Disabled Selected':
      return {
        background: state === 'Disabled Selected'
          ? dataTableColorsLight.accentLight
          : dataTableColorsLight.bgCell,
        borderColor: dataTableColorsLight.borderColor,
      };
    case 'Searchable':
      return {
        background: dataTableColorsLight.bgSearchResult,
        borderColor: dataTableColorsLight.borderColor,
      };
    case 'Alert':
      return {
        background: themeColorsLight.colorErrorBg,
        borderColor: dataTableColorsLight.borderColor,
      };
    case 'Alert Selected':
      return {
        background: dataTableColorsLight.accentLight,
        borderColor: dataTableColorsLight.accentColor,
      };
    default:
      return {
        background: dataTableColorsLight.bgCell,
        borderColor: dataTableColorsLight.borderColor,
      };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const DataSheetTextCell: React.FC<DataSheetTextCellProps> = ({
  cellText = 'Order Quantity',
  state = 'Default',
  type = 'None Editable',
  level = 'Level 1',
  showLeftIcon = false,
  showInfoIcon = false,
  valueChanged = false,
  twoLines = false,
  width = 200,
  onClick,
  onExpandToggle,
}) => {
  const { background, borderColor } = getStateTokens(state);
  const height = twoLines ? 44 : 32;
  const isDisabled = state === 'Disabled' || state === 'Disabled Selected';
  const isAlert = state === 'Alert' || state === 'Alert Selected';
  const innerIndent = type === 'Expandable' ? LEVEL_INDENT[level] : 0;

  // ── Info/warning icon slot ─────────────────────────────────────────────────
  const infoIconNode = showInfoIcon ? (
    isAlert ? (
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        style={{
          fontSize: iconSize.iconSizeSM,
          color: themeColorsLight.colorErrorText,
          flexShrink: 0,
          width: 13,
        }}
      />
    ) : (
      <Tooltip title={typeof showInfoIcon === 'string' ? showInfoIcon : undefined}>
        <FontAwesomeIcon
          icon={faCircleInfo}
          style={{
            fontSize: iconSize.iconSizeSM,
            color: dataTableColorsLight.textMedium,
            flexShrink: 0,
            width: 13,
            cursor: typeof showInfoIcon === 'string' ? 'help' : 'default',
          }}
        />
      </Tooltip>
    )
  ) : null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width,
        height,
        paddingLeft: 8,
        paddingRight: 8,
        background,
        border: `1px solid ${borderColor}`,
        boxSizing: 'border-box',
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
        flexShrink: 0,
        overflow: 'hidden',
      }}
      onClick={!isDisabled ? onClick : undefined}
    >
      {/* ── Inner content div — carries the level indent ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          minWidth: 0,
          paddingLeft: innerIndent,
          boxSizing: 'border-box',
        }}
      >
        {/* Expandable chevron — always visible for Expandable type */}
        {type === 'Expandable' && (
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              fontSize: iconSize.iconSizeXS,
              color: dataTableColorsLight.textMedium,
              flexShrink: 0,
              width: 13,
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onExpandToggle?.();
            }}
          />
        )}

        {/* Left gear icon (showLeftIcon) */}
        {showLeftIcon && (
          <FontAwesomeIcon
            icon={faGear}
            style={{
              fontSize: iconSize.iconSizeSM,
              color: dataTableColorsLight.textMedium,
              flexShrink: 0,
              width: 13,
            }}
          />
        )}

        {/* Cell text */}
        <span
          style={{
            flex: 1,
            fontFamily,
            fontSize: fontSize.fontSize,
            lineHeight: `${lineHeightPx.lineHeight}px`,
            fontWeight: valueChanged ? fontWeight.strong : fontWeight.normal,
            color: dataTableColorsLight.textDark,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: twoLines ? 'normal' : 'nowrap',
            wordBreak: twoLines ? 'break-word' : undefined,
            minWidth: 0,
          }}
        >
          {cellText}
        </span>
      </div>

      {/* ── Right icon area: info icon + (Editable) edit icon ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: type === 'Editable' ? 8 : 0,
          height: '100%',
          flexShrink: 0,
        }}
      >
        {infoIconNode}

        {/* Edit icon — always shown for Editable type */}
        {type === 'Editable' && (
          <FontAwesomeIcon
            icon={faPenLine}
            style={{
              fontSize: iconSize.iconSizeSM,
              color: dataTableColorsLight.textMedium,
              flexShrink: 0,
              width: 16,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DataSheetTextCell;
