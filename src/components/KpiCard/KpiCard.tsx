import React from 'react';
import { Button, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faArrowUp,
  faArrowDown,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { themeColorsLight } from '@/tokens/colors';
import { fontFamily, fontSize, fontWeight, lineHeightPx } from '@/tokens/typography';
import { iconSize } from '@/tokens/icons';

// ─── Types ────────────────────────────────────────────────────────────────────

export type KpiState = 'default' | 'positive' | 'negative' | 'warning' | 'custom';
export type KpiSize = 'large' | 'small';
export type KpiContainer = 'none' | 'simple' | 'gray' | 'gray-borderless';

export interface KpiCardAction {
  label: string;
  onClick?: () => void;
}

export interface KpiCardProps {
  /** KPI label */
  title: string;
  /** Main value to display */
  value: string | number;
  /** Trend/diff text e.g. "11.5%" */
  diff?: string;
  /** Secondary description text */
  description?: string;
  /** Tooltip content for the info icon next to the title */
  titleTooltip?: string;
  /** Icon rendered in the top-right corner */
  icon?: React.ReactNode;
  /** Color state — drives value/diff text color */
  state?: KpiState;
  /** Card size */
  size?: KpiSize;
  /** Container style */
  container?: KpiContainer;
  /** Show the diff trend indicator */
  showDiff?: boolean;
  /** Show the description row */
  showDescription?: boolean;
  /** Show the info icon next to the title */
  showTitleIcon?: boolean;
  /** Show the icon slot (top-right) */
  showIcon?: boolean;
  /** Up to two CTA buttons rendered at the bottom */
  actions?: [KpiCardAction?, KpiCardAction?];
  /** Custom color for 'custom' state */
  customColor?: string;
}

// ─── State color map ──────────────────────────────────────────────────────────

const STATE_COLORS: Record<KpiState, string> = {
  default:  themeColorsLight.colorText,
  positive: themeColorsLight.colorSuccessText,
  negative: themeColorsLight.colorErrorText,
  warning:  themeColorsLight.colorWarningText,
  custom:   themeColorsLight.colorText,
};

const DIFF_ICONS: Record<KpiState, React.ReactNode> = {
  default:  <FontAwesomeIcon icon={faArrowRight} />,
  positive: <FontAwesomeIcon icon={faArrowUp} />,
  negative: <FontAwesomeIcon icon={faArrowDown} />,
  warning:  <FontAwesomeIcon icon={faArrowUp} />,
  custom:   <FontAwesomeIcon icon={faArrowRight} />,
};

// ─── Size tokens — sourced from 3-Typography Figma collection ─────────────────

const SIZE_TOKENS = {
  large: {
    width: 240,
    padding: 16,
    valueFontSize:   fontSize.fontSizeHeading2,
    valueLineHeight: `${lineHeightPx.lineHeightHeading2}px`,
    valueFontWeight: fontWeight.strong,
    titleFontSize:   fontSize.fontSize,
    titleLineHeight: `${lineHeightPx.lineHeight}px`,
    descFontSize:    fontSize.fontSizeSM,
    descLineHeight:  `${lineHeightPx.lineHeightSM}px`,
    diffFontSize:    fontSize.fontSize,
    diffLineHeight:  `${lineHeightPx.lineHeight}px`,
    iconSize:        iconSize.iconSizeXXL,
    titleIconSize:   iconSize.iconSizeLG,
    diffIconSize:    iconSize.iconSizeLG,
    gap: 8,
    innerGap: 4,
  },
  small: {
    width: 200,
    padding: 12,
    valueFontSize:   fontSize.fontSizeHeading4,
    valueLineHeight: `${lineHeightPx.lineHeightHeading4}px`,
    valueFontWeight: fontWeight.strong,
    titleFontSize:   fontSize.fontSizeSM,
    titleLineHeight: `${lineHeightPx.lineHeightSM}px`,
    descFontSize:    fontSize.fontSizeXS,
    descLineHeight:  `${lineHeightPx.lineHeightXS}px`,
    diffFontSize:    fontSize.fontSizeSM,
    diffLineHeight:  `${lineHeightPx.lineHeightSM}px`,
    iconSize:        iconSize.iconSizeXL,
    titleIconSize:   iconSize.iconSizeSM,
    diffIconSize:    iconSize.iconSizeSM,
    gap: 8,
    innerGap: 4,
  },
} as const;

// ─── Container styles ─────────────────────────────────────────────────────────

function getContainerStyle(container: KpiContainer, size: KpiSize): React.CSSProperties {
  const t = SIZE_TOKENS[size];
  const base: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: t.gap,
    width: t.width,
    padding: t.padding,
    borderRadius: 6,
    boxSizing: 'border-box',
    fontFamily,
  };

  switch (container) {
    case 'simple':
      return { ...base, background: themeColorsLight.colorBgContainer, border: `1px solid ${themeColorsLight.colorBorderSecondary}` };
    case 'gray':
      return { ...base, background: themeColorsLight.colorBgLayout, border: `1px solid ${themeColorsLight.colorBorderSecondary}` };
    case 'gray-borderless':
      return { ...base, background: themeColorsLight.colorBgLayout, border: 'none' };
    case 'none':
    default:
      return { ...base, background: 'transparent', border: 'none', padding: 0 };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  diff,
  description,
  titleTooltip,
  icon,
  state = 'default',
  size = 'large',
  container = 'simple',
  showDiff = true,
  showDescription = true,
  showTitleIcon = true,
  showIcon = true,
  actions,
  customColor,
}) => {
  const t = SIZE_TOKENS[size];
  const stateColor = state === 'custom' && customColor ? customColor : STATE_COLORS[state];
  const diffIcon = DIFF_ICONS[state];
  const hasActions = actions && actions.some(Boolean);

  return (
    <div style={getContainerStyle(container, size)}>
      {/* Content + Icon row */}
      <div style={{ display: 'flex', gap: t.gap, alignItems: 'flex-start', width: '100%' }}>
        {/* Content column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: t.innerGap, minWidth: 0 }}>
          {/* Title */}
          <div style={{ display: 'flex', gap: t.innerGap, alignItems: 'center', width: '100%' }}>
            <span
              style={{
                flex: 1,
                fontFamily,
                fontSize: t.titleFontSize,
                lineHeight: t.titleLineHeight,
                fontWeight: fontWeight.normal,
                color: themeColorsLight.colorText,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </span>
            {showTitleIcon && (
              <Tooltip title={titleTooltip}>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{
                    fontSize: t.titleIconSize,
                    color: themeColorsLight.colorTextTertiary,
                    flexShrink: 0,
                    cursor: titleTooltip ? 'pointer' : 'default',
                    width: t.titleIconSize,
                  }}
                />
              </Tooltip>
            )}
          </div>

          {/* Value + Diff row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 8px' }}>
            <span
              style={{
                fontFamily,
                fontSize: t.valueFontSize,
                lineHeight: t.valueLineHeight,
                fontWeight: t.valueFontWeight,
                color: stateColor,
                whiteSpace: 'nowrap',
              }}
            >
              {value}
            </span>
            {showDiff && diff && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontFamily,
                  fontSize: t.diffFontSize,
                  lineHeight: t.diffLineHeight,
                  fontWeight: fontWeight.medium,
                  color: stateColor,
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: t.diffIconSize, display: 'inline-flex' }}>{diffIcon}</span>
                {diff}
              </span>
            )}
          </div>

          {/* Description */}
          {showDescription && description && (
            <span
              style={{
                fontFamily,
                fontSize: t.descFontSize,
                lineHeight: t.descLineHeight,
                fontWeight: fontWeight.normal,
                color: themeColorsLight.colorTextSecondary,
              }}
            >
              {description}
            </span>
          )}
        </div>

        {/* Top-right icon */}
        {showIcon && icon && (
          <div style={{ fontSize: t.iconSize, color: stateColor, flexShrink: 0, lineHeight: 1, display: 'flex', alignItems: 'center' }}>
            {icon}
          </div>
        )}
      </div>

      {/* CTA Buttons */}
      {hasActions && (
        <div style={{ display: 'flex', gap: t.gap, width: '100%' }}>
          {actions!.map((action, i) =>
            action ? (
              <Button key={i} size="small" style={{ flex: 1, fontFamily }} onClick={action.onClick}>
                {action.label}
              </Button>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
};

export default KpiCard;
