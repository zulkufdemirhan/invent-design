import React from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFile,
  faWandSparkles,
  faEllipsisVertical,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faPenLine } from '@/tokens/faCustomIcons';
import { dataTableColorsLight } from '@/tokens/colors';
import { themeColorsLight } from '@/tokens/colors';
import { iconSize } from '@/tokens/icons';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataSheetActionButtonsCellState =
  | 'Default'
  | 'Default Selected'
  | 'Multiple Selected'
  | 'Disabled'
  | 'Disabled Selected';

export type DataSheetActionButtonsCellType =
  | 'All Actions'
  | '3 Actions'
  | '2 Actions'
  | '1 Actions'
  | 'Cancel/Approve';

export interface DataSheetActionButtonsCellProps {
  /** Cell state */
  state?: DataSheetActionButtonsCellState;
  /** Which set of actions to show */
  type?: DataSheetActionButtonsCellType;
  /** Action handlers */
  onFileAction?: () => void;
  onEditAction?: () => void;
  onMagicAction?: () => void;
  onMoreAction?: () => void;
  onApprove?: () => void;
  onCancel?: () => void;
}

// ─── Background helpers ───────────────────────────────────────────────────────

function getBackground(state: DataSheetActionButtonsCellState): string {
  switch (state) {
    case 'Default Selected':
    case 'Disabled Selected':
      return dataTableColorsLight.accentLight;
    case 'Multiple Selected':
      return dataTableColorsLight.accentLight;
    case 'Disabled':
      return dataTableColorsLight.bgCellMedium;
    default:
      return dataTableColorsLight.bgCell;
  }
}

function getBorderColor(state: DataSheetActionButtonsCellState): string {
  if (state === 'Default Selected' || state === 'Disabled Selected') return dataTableColorsLight.accentColor;
  return dataTableColorsLight.borderColor;
}

// ─── Icon button helper ───────────────────────────────────────────────────────

interface IconBtnProps {
  icon: React.ReactNode;
  primary?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  color?: string;
}

const IconBtn: React.FC<IconBtnProps> = ({ icon, primary, disabled, onClick, color }) => (
  <Button
    type={primary ? 'primary' : 'default'}
    size="small"
    disabled={disabled}
    onClick={onClick}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      minWidth: 24,
      padding: 0,
      color: primary ? undefined : color,
      borderColor: color && !primary ? color : undefined,
    }}
    icon={icon}
  />
);

// ─── Component ────────────────────────────────────────────────────────────────

export const DataSheetActionButtonsCell: React.FC<DataSheetActionButtonsCellProps> = ({
  state = 'Default',
  type = 'All Actions',
  onFileAction,
  onEditAction,
  onMagicAction,
  onMoreAction,
  onApprove,
  onCancel,
}) => {
  const disabled = state === 'Disabled' || state === 'Disabled Selected';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iconStyle = (size: number): any => ({ fontSize: size, width: size });

  const fileBtn = (
    <IconBtn
      key="file"
      icon={<FontAwesomeIcon icon={faFile} style={iconStyle(iconSize.iconSizeSM)} />}
      primary
      disabled={disabled}
      onClick={onFileAction}
    />
  );

  const editBtn = (
    <IconBtn
      key="edit"
      icon={<FontAwesomeIcon icon={faPenLine} style={iconStyle(iconSize.iconSizeSM)} />}
      disabled={disabled}
      onClick={onEditAction}
    />
  );

  const magicBtn = (
    <IconBtn
      key="magic"
      icon={<FontAwesomeIcon icon={faWandSparkles} style={iconStyle(iconSize.iconSizeSM)} />}
      disabled={disabled}
      onClick={onMagicAction}
    />
  );

  const moreBtn = (
    <IconBtn
      key="more"
      icon={<FontAwesomeIcon icon={faEllipsisVertical} style={iconStyle(iconSize.iconSizeSM)} />}
      disabled={disabled}
      onClick={onMoreAction}
    />
  );

  const BUTTON_SETS: Record<DataSheetActionButtonsCellType, React.ReactNode[]> = {
    'All Actions':    [fileBtn, editBtn, magicBtn, moreBtn],
    '3 Actions':      [fileBtn, editBtn, magicBtn],
    '2 Actions':      [fileBtn, editBtn],
    '1 Actions':      [fileBtn],
    'Cancel/Approve': [
      <Button
        key="approve"
        size="small"
        disabled={disabled}
        onClick={onApprove}
        style={{
          color: disabled ? undefined : themeColorsLight.colorSuccessText,
          borderColor: disabled ? undefined : themeColorsLight.colorSuccessBorder,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          minWidth: 24,
          padding: 0,
        }}
        icon={<FontAwesomeIcon icon={faCheck} style={iconStyle(iconSize.iconSizeSM)} />}
      />,
      <Button
        key="cancel"
        size="small"
        disabled={disabled}
        onClick={onCancel}
        style={{
          color: disabled ? undefined : themeColorsLight.colorErrorText,
          borderColor: disabled ? undefined : themeColorsLight.colorErrorBorder,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          minWidth: 24,
          padding: 0,
        }}
        icon={<FontAwesomeIcon icon={faXmark} style={iconStyle(iconSize.iconSizeSM)} />}
      />,
    ],
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        height: 32,
        padding: '4px 12px',
        background: getBackground(state),
        border: `1px solid ${getBorderColor(state)}`,
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    >
      {BUTTON_SETS[type]}
    </div>
  );
};

export default DataSheetActionButtonsCell;
