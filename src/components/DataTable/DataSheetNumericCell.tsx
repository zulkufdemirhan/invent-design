import React from 'react';
import { Tooltip } from 'antd';
import {
  InfoCircleOutlined,
  WarningOutlined,
  EditOutlined,
  DownOutlined,
  LockOutlined,
  ThunderboltOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { dataTableColorsLight } from '@/tokens/colors';
import { themeColorsLight, baseColorPalettes } from '@/tokens/colors';
import { fontFamily, fontSize, fontWeight, lineHeightPx } from '@/tokens/typography';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataSheetNumericCellState =
  | 'Default'
  | 'Default Selected'
  | 'Multiple Selected'
  | 'Disabled'
  | 'Disabled Selected'
  | 'Searchable'
  | 'Alert'
  | 'Alert Selected';

export type DataSheetNumericCellType =
  | 'None Editable'
  | 'Editable'
  | 'Expandable'
  | 'Locked'
  | 'Marked';

export type DataSheetNumericCellLevel = 'Level 1' | 'Level 2' | 'Level 3';

export interface DataSheetNumericCellProps {
  /** Cell numeric text content */
  cellText?: string;
  /** Visual / interaction state */
  state?: DataSheetNumericCellState;
  /** Cell editing capability / special type */
  type?: DataSheetNumericCellType;
  /** Expandable row hierarchy level — drives inner-content left indent */
  level?: DataSheetNumericCellLevel;
  /**
   * Show right info/warning icon (left side of content area).
   * Pass a string to use as tooltip text.
   * In Alert state renders as a warning triangle in error color.
   */
  showInfoIcon?: boolean | string;
  /** Show custom (gear) icon to the right of the number text */
  showCustomIcon?: boolean;
  /** Value was modified — renders text bold */
  valueChanged?: boolean;
  /** Two-line height mode (44px instead of 32px) */
  twoLines?: boolean;
  /** Show corner flag triangle (top-right) */
  flag?: boolean;
  /** Column width */
  width?: number;
  /** Click handler */
  onClick?: () => void;
  /** Expand/collapse toggle handler (Expandable type) */
  onExpandToggle?: () => void;
}

// ─── Level indent map ─────────────────────────────────────────────────────────

const LEVEL_INDENT: Record<DataSheetNumericCellLevel, number> = {
  'Level 1': 0,
  'Level 2': 16,
  'Level 3': 32,
};

// ─── State → visual token map ─────────────────────────────────────────────────

type StateTokens = { background: string; borderColor: string };

function getStateTokens(
  state: DataSheetNumericCellState,
  type: DataSheetNumericCellType
): StateTokens {
  // Locked and Marked have their own base backgrounds but still respond to selection states
  const baseLockedBg = baseColorPalettes['orange-1'];
  const baseMarkedBg = baseColorPalettes['gold-1'];

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
        background:
          state === 'Disabled Selected'
            ? dataTableColorsLight.accentLight
            : type === 'Locked'
            ? baseLockedBg
            : type === 'Marked'
            ? baseMarkedBg
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
      // Default state — use type-specific background
      if (type === 'Locked') return { background: baseLockedBg, borderColor: dataTableColorsLight.borderColor };
      if (type === 'Marked') return { background: baseMarkedBg, borderColor: dataTableColorsLight.borderColor };
      return {
        background: dataTableColorsLight.bgCell,
        borderColor: dataTableColorsLight.borderColor,
      };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const DataSheetNumericCell: React.FC<DataSheetNumericCellProps> = ({
  cellText = '0',
  state = 'Default',
  type = 'None Editable',
  level = 'Level 1',
  showInfoIcon = false,
  showCustomIcon = false,
  valueChanged = false,
  twoLines = false,
  flag = false,
  width = 200,
  onClick,
  onExpandToggle,
}) => {
  const { background, borderColor } = getStateTokens(state, type);
  const height = twoLines ? 44 : 32;
  const isDisabled = state === 'Disabled' || state === 'Disabled Selected';
  const isAlert = state === 'Alert' || state === 'Alert Selected';
  const innerIndent = type === 'Expandable' ? LEVEL_INDENT[level] : 0;

  // ── Left type icon ─────────────────────────────────────────────────────────
  let typeIconNode: React.ReactNode = null;
  if (type === 'Editable') {
    typeIconNode = (
      <EditOutlined
        style={{
          fontSize: fontSize.fontSize,
          color: dataTableColorsLight.textMedium,
          flexShrink: 0,
          width: 13,
        }}
      />
    );
  } else if (type === 'Locked') {
    typeIconNode = (
      <LockOutlined
        style={{
          fontSize: 14,
          color: baseColorPalettes['orange-6'],
          flexShrink: 0,
          width: 14,
        }}
      />
    );
  } else if (type === 'Marked') {
    typeIconNode = (
      <ThunderboltOutlined
        style={{
          fontSize: 14,
          color: baseColorPalettes['gold-6'],
          flexShrink: 0,
          width: 14,
        }}
      />
    );
  }

  // ── Info/warning icon ──────────────────────────────────────────────────────
  const infoIconNode = showInfoIcon ? (
    isAlert ? (
      <WarningOutlined
        style={{
          fontSize: fontSize.fontSize,
          color: themeColorsLight.colorErrorText,
          flexShrink: 0,
          width: 13,
        }}
      />
    ) : (
      <Tooltip title={typeof showInfoIcon === 'string' ? showInfoIcon : undefined}>
        <InfoCircleOutlined
          style={{
            fontSize: fontSize.fontSize,
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
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
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
      {/* ── Corner flag ── */}
      {flag && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 14px 14px 0',
            borderColor: `transparent ${dataTableColorsLight.accentColor} transparent transparent`,
          }}
        />
      )}

      {/* ── Left icon area (type icon + info icon) ── */}
      {(typeIconNode || infoIconNode) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexShrink: 0,
          }}
        >
          {typeIconNode}
          {infoIconNode}
        </div>
      )}

      {/* ── Inner content div — carries level indent for Expandable ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          minWidth: 0,
          paddingLeft: innerIndent,
          boxSizing: 'border-box',
        }}
      >
        {/* Expandable chevron */}
        {type === 'Expandable' && (
          <DownOutlined
            style={{
              fontSize: 12,
              color: dataTableColorsLight.textMedium,
              flexShrink: 0,
              width: 13,
              textAlign: 'center',
              cursor: 'pointer',
              marginRight: 4,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onExpandToggle?.();
            }}
          />
        )}

        {/* Numeric text — right aligned */}
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
            textAlign: 'right',
            minWidth: 0,
          }}
        >
          {cellText}
        </span>

        {/* Custom (gear) icon — right of number */}
        {showCustomIcon && (
          <SettingOutlined
            style={{
              fontSize: fontSize.fontSize,
              color: dataTableColorsLight.textMedium,
              flexShrink: 0,
              width: 13,
              marginLeft: 4,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DataSheetNumericCell;
