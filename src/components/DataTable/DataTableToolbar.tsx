import React from 'react';
import { Badge, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup,
  faTableColumns,
  faSliders,
  faDownload,
  faUpload,
  faArrowsLeftRight,
  faArrowRotateLeft,
  faRotateLeft,
  faRotateRight,
  faScissors,
  faLock,
  faCheck,
  faXmark,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { themeColorsLight } from '@/tokens/colors';
import { borderRadius as radiusTokens } from '@/tokens/spacing';
import { iconSize } from '@/tokens/icons';
import { fontFamily, fontSize, lineHeightPx } from '@/tokens/typography';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataTableToolbarType = 'Editable Data' | 'None Editable Data';
export type DataTableToolbarBreakpoint =
  | '1600px and more'
  | '1280px to 1600px'
  | '1024px to 1280 px';

export interface DataTableToolbarProps {
  /** Whether the data table allows editing */
  type?: DataTableToolbarType;
  /** Controls icon-only vs text+icon display for header buttons */
  breakpoints?: DataTableToolbarBreakpoint;
  /** Show cell edit actions group — only applies to Editable Data */
  cellEditActions?: boolean;
  /** Show custom action buttons on the right side */
  customActions?: boolean;
  /** Show the Reset Column Filters button */
  resetColumnFilters?: boolean;
  /** Badge count on the Aggregation button (0 hides badge) */
  aggregationCount?: number;
  /** Whether Wrap Text is currently active — shows green dot when true */
  wrapTextActive?: boolean;
}

// ─── Icon shorthand ───────────────────────────────────────────────────────────

const ico = (icon: Parameters<typeof FontAwesomeIcon>[0]['icon']) => (
  <FontAwesomeIcon
    icon={icon}
    style={{ fontSize: iconSize.iconSizeSM, width: iconSize.iconSizeSM, flexShrink: 0 }}
  />
);

// ─── ToolbarBtn: standalone bordered button ───────────────────────────────────

interface ToolbarBtnProps {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  title?: string;
}

const ToolbarBtn = React.forwardRef<HTMLButtonElement, ToolbarBtnProps>(
  ({ icon, label, onClick, title }, ref) => (
    <button
      ref={ref}
      type="button"
      title={title}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        height: 32,
        padding: label ? '0 12px' : '0 9px',
        background: themeColorsLight.colorBgContainer,
        border: `1px solid ${themeColorsLight.colorBorder}`,
        borderRadius: radiusTokens.borderRadius,
        cursor: 'pointer',
        color: themeColorsLight.colorText,
        fontFamily,
        fontSize: fontSize.fontSize,
        lineHeight: `${lineHeightPx.lineHeight}px`,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        outline: 'none',
      }}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  ),
);
ToolbarBtn.displayName = 'ToolbarBtn';

// ─── GroupBtn: icon button inside a BtnGroup (no individual border) ───────────

const GroupBtn: React.FC<{
  icon: React.ReactNode;
  onClick?: () => void;
  title?: string;
}> = ({ icon, onClick, title }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      padding: 0,
      background: themeColorsLight.colorBgContainer,
      border: 'none',
      borderRadius: 0,
      cursor: 'pointer',
      color: themeColorsLight.colorText,
      flexShrink: 0,
      outline: 'none',
    }}
  >
    {icon}
  </button>
);

// ─── BtnGroup: bordered container whose 1px gaps become dividers ──────────────

const BtnGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 1,
      border: `1px solid ${themeColorsLight.colorBorder}`,
      borderRadius: radiusTokens.borderRadius,
      overflow: 'hidden',
      background: themeColorsLight.colorBorder, // 1px gap shows as divider
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

// ─── FormulaInput: inline formula editor (Value | = | Set) ───────────────────

const FormulaInput: React.FC = () => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'stretch',
      width: 160,
      height: 32,
      border: `1px solid ${themeColorsLight.colorBorder}`,
      borderRadius: radiusTokens.borderRadius,
      overflow: 'hidden',
      background: themeColorsLight.colorBgContainer,
      flexShrink: 0,
    }}
  >
    {/* Placeholder text */}
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        overflow: 'hidden',
        minWidth: 0,
      }}
    >
      <span
        style={{
          fontFamily,
          fontSize: fontSize.fontSize,
          color: themeColorsLight.colorTextQuaternary,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        Value
      </span>
    </div>

    {/* "=" prefix tab */}
    <div
      style={{
        width: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: themeColorsLight.colorFillQuaternary,
        borderLeft: `1px solid ${themeColorsLight.colorBorder}`,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily,
          fontSize: fontSize.fontSize,
          color: themeColorsLight.colorText,
        }}
      >
        =
      </span>
    </div>

    {/* "Set" action */}
    <button
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        background: 'transparent',
        border: 'none',
        borderLeft: `1px solid ${themeColorsLight.colorBorder}`,
        cursor: 'pointer',
        fontFamily,
        fontSize: fontSize.fontSize,
        color: themeColorsLight.colorText,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        outline: 'none',
      }}
    >
      Set
    </button>
  </div>
);

// ─── DataTableToolbar ─────────────────────────────────────────────────────────

export const DataTableToolbar: React.FC<DataTableToolbarProps> = ({
  type = 'Editable Data',
  breakpoints = '1600px and more',
  cellEditActions = true,
  customActions = true,
  resetColumnFilters = true,
  aggregationCount = 3,
  wrapTextActive = true,
}) => {
  const isEditable = type === 'Editable Data';
  const isFullWidth = breakpoints === '1600px and more';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 0',
        width: '100%',
      }}
    >
      {/* ── Toolbar Actions (left, flex-grow) ────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          gap: 4,
          minWidth: 0,
          flexWrap: 'nowrap',
        }}
      >
        {/* Aggregation — red count badge */}
        <Badge
          count={aggregationCount > 0 ? aggregationCount : 0}
          size="small"
          color={themeColorsLight.colorError}
        >
          <ToolbarBtn
            icon={ico(faLayerGroup)}
            label={isFullWidth ? 'Aggregation' : undefined}
            title="Aggregation"
          />
        </Badge>

        {/* Columns */}
        <ToolbarBtn
          icon={ico(faTableColumns)}
          label={isFullWidth ? 'Columns' : undefined}
          title="Columns"
        />

        {/* Display Options */}
        <ToolbarBtn
          icon={ico(faSliders)}
          label={isFullWidth ? 'Display Options' : undefined}
          title="Display Options"
        />

        {/* Export / Import — grouped with 1px divider */}
        <BtnGroup>
          <GroupBtn icon={ico(faDownload)} title="Export" />
          {isEditable && <GroupBtn icon={ico(faUpload)} title="Import" />}
        </BtnGroup>

        {/* Wrap Text — green dot when active */}
        {wrapTextActive ? (
          <Badge dot color={themeColorsLight.colorSuccess}>
            <ToolbarBtn icon={ico(faArrowsLeftRight)} title="Wrap Text" />
          </Badge>
        ) : (
          <ToolbarBtn icon={ico(faArrowsLeftRight)} title="Wrap Text" />
        )}

        {/* Reset / Undo / Redo — Editable only */}
        {isEditable && (
          <BtnGroup>
            <GroupBtn icon={ico(faArrowRotateLeft)} title="Reset" />
            <GroupBtn icon={ico(faRotateLeft)} title="Undo" />
            <GroupBtn icon={ico(faRotateRight)} title="Redo" />
          </BtnGroup>
        )}

        {/* Cell Edit Actions — Editable + cellEditActions */}
        {isEditable && cellEditActions && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              flexShrink: 0,
            }}
          >
            <BtnGroup>
              <GroupBtn icon={ico(faScissors)} title="Cut" />
              <GroupBtn icon={ico(faXmark)} title="Discard" />
              <GroupBtn icon={ico(faCheck)} title="Approve" />
              <GroupBtn icon={ico(faLock)} title="Lock" />
            </BtnGroup>
            <FormulaInput />
          </div>
        )}

        {/* Reset Column Filters */}
        {resetColumnFilters && (
          <ToolbarBtn
            icon={ico(faFilter)}
            label={isFullWidth ? 'Reset column filters' : undefined}
            title="Reset column filters"
          />
        )}
      </div>

      {/* ── Custom Actions (right, fixed) ───────────────────────────────── */}
      {customActions && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            flexShrink: 0,
          }}
        >
          {isEditable ? (
            <>
              <Button
                style={{
                  height: 32,
                  fontFamily,
                  fontSize: fontSize.fontSize,
                  lineHeight: `${lineHeightPx.lineHeight}px`,
                }}
              >
                Secondary
              </Button>
              <Button
                type="primary"
                danger
                style={{ height: 32 }}
                icon={ico(faXmark)}
              />
              <Button
                type="primary"
                style={{
                  height: 32,
                  background: themeColorsLight.colorSuccess,
                  borderColor: themeColorsLight.colorSuccess,
                }}
                icon={ico(faCheck)}
              />
              <Button
                type="primary"
                style={{
                  height: 32,
                  fontFamily,
                  fontSize: fontSize.fontSize,
                  lineHeight: `${lineHeightPx.lineHeight}px`,
                }}
              >
                Primary
              </Button>
            </>
          ) : (
            <>
              <Button
                style={{
                  height: 32,
                  fontFamily,
                  fontSize: fontSize.fontSize,
                  lineHeight: `${lineHeightPx.lineHeight}px`,
                }}
              >
                Secondary
              </Button>
              <Button
                style={{
                  height: 32,
                  fontFamily,
                  fontSize: fontSize.fontSize,
                  lineHeight: `${lineHeightPx.lineHeight}px`,
                }}
              >
                Secondary
              </Button>
              <Button
                type="primary"
                style={{
                  height: 32,
                  fontFamily,
                  fontSize: fontSize.fontSize,
                  lineHeight: `${lineHeightPx.lineHeight}px`,
                }}
              >
                Primary
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DataTableToolbar;
