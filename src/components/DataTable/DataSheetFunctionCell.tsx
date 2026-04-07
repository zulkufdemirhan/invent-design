import React from 'react';
import { Checkbox, Radio, Switch, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { dataTableColorsLight } from '@/tokens/colors';
import { themeColorsLight } from '@/tokens/colors';
import { fontFamily, fontSize, lineHeightPx } from '@/tokens/typography';
import { iconSize } from '@/tokens/icons';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataSheetFunctionCellState =
  | 'Default'
  | 'Hover'
  | 'Selected'
  | 'Selected Hover'
  | 'Disabled'
  | 'Disabled Selected'
  | 'Alert'
  | 'Alert Selected';

export type DataSheetFunctionCellType =
  | 'Checkbox'
  | 'Checkbox Row Select'
  | 'Radio'
  | 'Radio Row Select'
  | 'Toggle'
  | 'Toggle Only';

export interface DataSheetFunctionCellProps {
  /** Label text shown next to the control (not shown for Row Select / Toggle Only types) */
  label?: string;
  /** Cell state */
  state?: DataSheetFunctionCellState;
  /** Control type */
  type?: DataSheetFunctionCellType;
  /** Show info/warning icon on the right */
  showInfoIcon?: boolean | string;
  /** Width override — defaults to 200px for full types, 43px for Row Select */
  width?: number;
  /** Change handler */
  onChange?: (checked: boolean) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isRowSelect = (type: DataSheetFunctionCellType) =>
  type === 'Checkbox Row Select' || type === 'Radio Row Select';

const isSelected = (state: DataSheetFunctionCellState) =>
  state === 'Selected' || state === 'Selected Hover' || state === 'Disabled Selected' || state === 'Alert Selected';

const isDisabled = (state: DataSheetFunctionCellState) =>
  state === 'Disabled' || state === 'Disabled Selected';

const isAlert = (state: DataSheetFunctionCellState) =>
  state === 'Alert' || state === 'Alert Selected';

function getBackground(state: DataSheetFunctionCellState, type: DataSheetFunctionCellType): string {
  if (isAlert(state)) return themeColorsLight.colorErrorBg;
  if (isSelected(state)) return dataTableColorsLight.accentLight;
  if (isDisabled(state)) {
    return isRowSelect(type) ? dataTableColorsLight.bgCellMedium : dataTableColorsLight.bgCellMedium;
  }
  return dataTableColorsLight.bgCell;
}

function getBorderColor(state: DataSheetFunctionCellState): string {
  if (state === 'Selected' || state === 'Selected Hover') return dataTableColorsLight.accentColor;
  return dataTableColorsLight.borderColor;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const DataSheetFunctionCell: React.FC<DataSheetFunctionCellProps> = ({
  label = 'Label',
  state = 'Default',
  type = 'Checkbox',
  showInfoIcon = false,
  width,
  onChange,
}) => {
  const rowSelect = isRowSelect(type);
  const checked = isSelected(state);
  const disabled = isDisabled(state);
  const alert = isAlert(state);
  const cellWidth = width ?? (rowSelect ? 43 : 200);
  const bg = getBackground(state, type);
  const borderColor = getBorderColor(state);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: rowSelect || type === 'Toggle Only' ? 0 : 12,
    justifyContent: rowSelect ? 'center' : undefined,
    width: cellWidth,
    height: 32,
    padding: '0 8px',
    background: bg,
    border: `1px solid ${borderColor}`,
    boxSizing: 'border-box',
    flexShrink: 0,
  };

  const labelStyle: React.CSSProperties = {
    flex: 1,
    fontFamily,
    fontSize: fontSize.fontSize,
    lineHeight: `${lineHeightPx.lineHeight}px`,
    color: disabled ? themeColorsLight.colorTextQuaternary : dataTableColorsLight.textDark,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    minWidth: 0,
  };

  // ── Info icon ──────────────────────────────────────────────────────────────
  const infoIconColor = alert
    ? themeColorsLight.colorErrorText
    : disabled
    ? dataTableColorsLight.textLight
    : dataTableColorsLight.textMedium;

  const infoIconNode = showInfoIcon && !rowSelect && type !== 'Toggle Only' ? (
    <Tooltip title={typeof showInfoIcon === 'string' ? showInfoIcon : undefined}>
      <FontAwesomeIcon
        icon={alert ? faTriangleExclamation : faCircleInfo}
        style={{ fontSize: iconSize.iconSizeSM, color: infoIconColor, flexShrink: 0, width: 13 }}
      />
    </Tooltip>
  ) : null;

  // ── Render controls ────────────────────────────────────────────────────────

  if (type === 'Checkbox' || type === 'Checkbox Row Select') {
    return (
      <div style={containerStyle}>
        <Checkbox
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          style={{ flexShrink: 0 }}
        />
        {!rowSelect && (
          <span style={labelStyle}>{label}</span>
        )}
        {infoIconNode}
      </div>
    );
  }

  if (type === 'Radio' || type === 'Radio Row Select') {
    return (
      <div style={containerStyle}>
        <Radio
          checked={checked}
          disabled={disabled}
          onChange={() => onChange?.(true)}
          style={{ flexShrink: 0, marginInlineEnd: 0 }}
        />
        {!rowSelect && (
          <span style={labelStyle}>{label}</span>
        )}
        {infoIconNode}
      </div>
    );
  }

  if (type === 'Toggle Only') {
    return (
      <div style={containerStyle}>
        <Switch
          size="small"
          checked={checked}
          disabled={disabled}
          onChange={(val) => onChange?.(val)}
        />
      </div>
    );
  }

  // Toggle (with label)
  return (
    <div style={containerStyle}>
      <Switch
        size="small"
        checked={checked}
        disabled={disabled}
        onChange={(val) => onChange?.(val)}
        style={{ flexShrink: 0 }}
      />
      <span style={labelStyle}>{label}</span>
      {infoIconNode}
    </div>
  );
};

export default DataSheetFunctionCell;
