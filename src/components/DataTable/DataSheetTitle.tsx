import React from 'react';
import { Checkbox, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faCircleInfo,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { dataTableColorsLight } from '@/tokens/colors';
import { fontFamily, fontSize, fontWeight, lineHeightPx } from '@/tokens/typography';
import { iconSize } from '@/tokens/icons';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataSheetTitleType = 'Default' | 'Expandable' | 'Empty' | 'Select All';
export type DataSheetTitleState = 'Default' | 'Hover' | 'Focus' | 'Selected';

export interface DataSheetTitleProps {
  /** Column header text */
  cellText?: string;
  /** Column type */
  type?: DataSheetTitleType;
  /** Interactive state */
  state?: DataSheetTitleState;
  /** Two-line header (56px tall instead of 36px) */
  twoLines?: boolean;
  /** A filter is currently applied on this column */
  filterApplied?: boolean;
  /** Show filter icon */
  showFilter?: boolean;
  /** Show info icon */
  showInfo?: string;
  /** Checkbox checked state for Select All type */
  checked?: boolean;
  /** Indeterminate state for Select All checkbox */
  indeterminate?: boolean;
  /** Width of the cell */
  width?: number;
  /** Click handler */
  onClick?: () => void;
  /** Filter icon click handler */
  onFilterClick?: (e: React.MouseEvent) => void;
  /** Expand arrow click handler */
  onExpandClick?: (e: React.MouseEvent) => void;
  /** Select All checkbox change handler */
  onSelectAllChange?: (checked: boolean) => void;
}

// ─── Color helpers ────────────────────────────────────────────────────────────

function getBgColor(state: DataSheetTitleState, filterApplied: boolean): string {
  if (state === 'Selected' && !filterApplied) return dataTableColorsLight.accentColor;
  if (state === 'Focus')                       return dataTableColorsLight.bgHeaderHasFocus;
  if (state === 'Hover')                       return dataTableColorsLight.bgHeaderHovered;
  return dataTableColorsLight.bgHeader;
}

function getTextColor(state: DataSheetTitleState, filterApplied: boolean): string {
  if (state === 'Selected' && !filterApplied) return dataTableColorsLight.accentFg;
  return dataTableColorsLight.textHeader;
}

function getIconColor(state: DataSheetTitleState, filterApplied: boolean): string {
  if (state === 'Selected' && !filterApplied) return dataTableColorsLight.accentFg;
  return dataTableColorsLight.textMedium;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const DataSheetTitle: React.FC<DataSheetTitleProps> = ({
  cellText = 'Order Quantity',
  type = 'Default',
  state = 'Default',
  twoLines = false,
  filterApplied = false,
  showFilter = true,
  showInfo,
  checked = false,
  indeterminate = false,
  width = 200,
  onClick,
  onFilterClick,
  onExpandClick,
  onSelectAllChange,
}) => {
  const isSelected = state === 'Selected' && !filterApplied;
  const height = twoLines ? 56 : 36;
  const bgColor = getBgColor(state, filterApplied);
  const textColor = getTextColor(state, filterApplied);
  const iconColor = getIconColor(state, filterApplied);

  const showIcons = state !== 'Selected' || filterApplied;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width,
    height,
    padding: '0 8px',
    background: bgColor,
    border: `1px solid ${dataTableColorsLight.borderColor}`,
    boxSizing: 'border-box',
    cursor: onClick ? 'pointer' : 'default',
    userSelect: 'none',
    flexShrink: 0,
  };

  // ── Empty type ──────────────────────────────────────────────────────────────
  if (type === 'Empty') {
    return <div style={containerStyle} onClick={onClick} />;
  }

  // ── Select All type ─────────────────────────────────────────────────────────
  if (type === 'Select All') {
    return (
      <div style={{ ...containerStyle, justifyContent: 'center' }} onClick={onClick}>
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          onChange={(e) => onSelectAllChange?.(e.target.checked)}
          onClick={(e) => e.stopPropagation()}
          style={{ display: 'flex' }}
        />
      </div>
    );
  }

  // ── Default / Expandable ────────────────────────────────────────────────────
  return (
    <div style={containerStyle} onClick={onClick}>
      {/* Expand arrow (Expandable only) */}
      {type === 'Expandable' && (
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{
            fontSize: iconSize.iconSizeXS,
            color: isSelected ? dataTableColorsLight.accentFg : dataTableColorsLight.bgIconHeader,
            flexShrink: 0,
            cursor: 'pointer',
            width: iconSize.iconSizeXS,
          }}
          onClick={(e) => { e.stopPropagation(); onExpandClick?.(e); }}
        />
      )}

      {/* Column text */}
      <span
        style={{
          flex: 1,
          fontFamily,
          fontSize: fontSize.fontSizeSM,
          lineHeight: `${lineHeightPx.lineHeightSM}px`,
          fontWeight: fontWeight.strong,
          color: textColor,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: twoLines ? 'normal' : 'nowrap',
          wordBreak: twoLines ? 'break-word' : undefined,
          minWidth: 0,
        }}
      >
        {cellText}
      </span>

      {/* Info icon */}
      {showInfo && showIcons && (
        <Tooltip title={showInfo}>
          <FontAwesomeIcon
            icon={faCircleInfo}
            style={{
              fontSize: iconSize.iconSizeXS,
              color: iconColor,
              flexShrink: 0,
              cursor: 'pointer',
              width: iconSize.iconSizeXS,
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </Tooltip>
      )}

      {/* Selected state icons */}
      {isSelected && showInfo && (
        <FontAwesomeIcon
          icon={faCircleInfo}
          style={{ fontSize: iconSize.iconSizeXS, color: dataTableColorsLight.accentFg, flexShrink: 0, width: iconSize.iconSizeXS }}
        />
      )}
      {isSelected && showFilter && (
        <FontAwesomeIcon
          icon={faFilter}
          style={{ fontSize: iconSize.iconSizeXS, color: dataTableColorsLight.accentFg, flexShrink: 0, width: iconSize.iconSizeXS }}
        />
      )}

      {/* Filter icon (not selected) */}
      {!isSelected && showFilter && (
        <FontAwesomeIcon
          icon={faFilter}
          style={{
            fontSize: iconSize.iconSizeXS,
            color: filterApplied ? dataTableColorsLight.accentColor : iconColor,
            flexShrink: 0,
            cursor: 'pointer',
            width: iconSize.iconSizeXS,
          }}
          onClick={(e) => { e.stopPropagation(); onFilterClick?.(e); }}
        />
      )}
    </div>
  );
};

export default DataSheetTitle;
