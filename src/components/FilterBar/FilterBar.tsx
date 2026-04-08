import React, { useState } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faStarOfLife,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { themeColorsLight } from '@/tokens/colors';
import { borderRadius as radiusTokens } from '@/tokens/spacing';
import { iconSize } from '@/tokens/icons';
import { fontFamily, fontSize, lineHeightPx, fontWeight } from '@/tokens/typography';

// ─── Types ────────────────────────────────────────────────────────────────────

export type FilterBarType = 'Quick Filters' | 'Regular Filters';

export interface FilterBarQuickFilter {
  label: string;
}

export interface FilterBarFilterItem {
  label: string;
  required?: boolean;
}

export interface FilterBarProps {
  /** Display mode */
  type?: FilterBarType;

  // ── Quick Filters ──────────────────────────────────────────────────────────
  /** Pill options for Quick Filters mode */
  quickFilters?: FilterBarQuickFilter[];
  /** Currently selected quick filter label (controlled) */
  selectedQuickFilter?: string;
  /** Called when a quick filter pill is clicked */
  onQuickFilterChange?: (label: string) => void;

  // ── Regular Filters ────────────────────────────────────────────────────────
  /** Filter attribute items */
  filterItems?: FilterBarFilterItem[];
  /** Show the overflow "+N" more pill */
  filterCount?: boolean;
  /** Count shown in the more pill */
  moreCount?: number;
  /** Show the warning indicator pill */
  showWarning?: boolean;
  /** Count shown inside the warning pill */
  warningCount?: number;
  /** Show Apply / More Filters / Clear All CTA buttons */
  showCta?: boolean;
  /** Called when Apply is clicked */
  onApply?: () => void;
  /** Called when More Filters is clicked */
  onMoreFilters?: () => void;
  /** Called when Clear All is clicked */
  onClearAll?: () => void;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_QUICK_FILTERS: FilterBarQuickFilter[] = [
  { label: 'All' },
  { label: 'Quick Filter 1' },
  { label: 'Quick Filter 2' },
  { label: 'Quick Filter 3' },
  { label: 'Quick Filter 4' },
  { label: 'Quick Filter 5' },
];

const DEFAULT_FILTER_ITEMS: FilterBarFilterItem[] = [
  { label: 'Filter Attribute', required: true },
  { label: 'Filter Attribute', required: true },
  { label: 'Filter Attribute', required: true },
  { label: 'Filter Attribute', required: true },
];

// ─── Shared pill base ─────────────────────────────────────────────────────────

const PILL_BASE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  height: 24,
  padding: '4px 8px',
  borderRadius: 100,
  gap: 4,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  fontFamily,
  fontSize: fontSize.fontSizeSM,
  lineHeight: `${lineHeightPx.lineHeightSM}px`,
  fontWeight: fontWeight.normal,
  cursor: 'pointer',
  boxSizing: 'border-box',
  userSelect: 'none',
};

// ─── Quick Filter Tag ─────────────────────────────────────────────────────────

interface QuickFilterTagProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const QuickFilterTag: React.FC<QuickFilterTagProps> = ({ label, selected, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...PILL_BASE,
      background: selected ? themeColorsLight.colorPrimary : themeColorsLight.colorBgContainer,
      border: selected ? 'none' : `1px solid ${themeColorsLight.colorBorder}`,
      color: selected ? themeColorsLight.colorTextLightSolid : themeColorsLight.colorText,
    }}
  >
    {label}
  </div>
);

// ─── Filter Item Pill ─────────────────────────────────────────────────────────

interface FilterItemPillProps {
  label: string;
  required?: boolean;
  onClick?: () => void;
}

const FilterItemPill: React.FC<FilterItemPillProps> = ({ label, required, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...PILL_BASE,
      background: themeColorsLight.colorFillTertiary,
      border: `1px solid ${themeColorsLight.colorBorder}`,
      maxWidth: 200,
      overflow: 'hidden',
    }}
  >
    {required && (
      <FontAwesomeIcon
        icon={faStarOfLife}
        style={{
          fontSize: 6,
          color: themeColorsLight.colorErrorText,
          flexShrink: 0,
          width: 6,
        }}
      />
    )}
    <span
      style={{
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 0,
        color: themeColorsLight.colorText,
      }}
    >
      {label}
    </span>
    <FontAwesomeIcon
      icon={faChevronDown}
      style={{
        fontSize: iconSize.iconSizeXS,
        color: themeColorsLight.colorTextTertiary,
        flexShrink: 0,
        width: iconSize.iconSizeXS,
      }}
    />
  </div>
);

// ─── More Pill ("+12") ────────────────────────────────────────────────────────

const MorePill: React.FC<{ count: number }> = ({ count }) => (
  <div
    style={{
      ...PILL_BASE,
      background: themeColorsLight.colorFillTertiary,
      border: `1px solid ${themeColorsLight.colorBorder}`,
      width: 37,
      maxWidth: 160,
      justifyContent: 'center',
      gap: 0,
      cursor: 'default',
    }}
  >
    <span style={{ color: themeColorsLight.colorText }}>{`+${count}`}</span>
  </div>
);

// ─── Warning Tag ──────────────────────────────────────────────────────────────

const WarningTag: React.FC<{ count: number }> = ({ count }) => (
  <div
    style={{
      ...PILL_BASE,
      background: themeColorsLight.colorWarningBg,
      border: `1px solid ${themeColorsLight.colorWarningBorder}`,
      cursor: 'default',
    }}
  >
    <FontAwesomeIcon
      icon={faCircleExclamation}
      style={{
        fontSize: iconSize.iconSizeSM,
        color: themeColorsLight.colorWarningText,
        flexShrink: 0,
        width: iconSize.iconSizeSM,
      }}
    />
    <span style={{ color: themeColorsLight.colorWarningText }}>{count}</span>
  </div>
);

// ─── Label ────────────────────────────────────────────────────────────────────

const BarLabel: React.FC<{ text: string }> = ({ text }) => (
  <span
    style={{
      fontFamily,
      fontSize: fontSize.fontSizeSM,
      lineHeight: `${lineHeightPx.lineHeightSM}px`,
      fontWeight: fontWeight.medium,
      color: themeColorsLight.colorText,
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}
  >
    {text}
  </span>
);

// ─── FilterBar ────────────────────────────────────────────────────────────────

export const FilterBar: React.FC<FilterBarProps> = ({
  type = 'Quick Filters',
  quickFilters = DEFAULT_QUICK_FILTERS,
  selectedQuickFilter,
  onQuickFilterChange,
  filterItems = DEFAULT_FILTER_ITEMS,
  filterCount = true,
  moreCount = 12,
  showWarning = true,
  warningCount = 2,
  showCta = true,
  onApply,
  onMoreFilters,
  onClearAll,
}) => {
  const [internalSelected, setInternalSelected] = useState(
    quickFilters[0]?.label ?? 'All',
  );

  const activeFilter =
    selectedQuickFilter !== undefined ? selectedQuickFilter : internalSelected;

  const handleQuickFilterClick = (label: string) => {
    setInternalSelected(label);
    onQuickFilterChange?.(label);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {/* ── Label ─────────────────────────────────────────────────────────── */}
      <BarLabel text={type === 'Regular Filters' ? 'Filters:' : 'Quick Filters:'} />

      {/* ── Quick Filter pills ──────────────────────────────────────────── */}
      {type === 'Quick Filters' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          {quickFilters.map((f) => (
            <QuickFilterTag
              key={f.label}
              label={f.label}
              selected={f.label === activeFilter}
              onClick={() => handleQuickFilterClick(f.label)}
            />
          ))}
        </div>
      )}

      {/* ── Regular Filter items ────────────────────────────────────────── */}
      {type === 'Regular Filters' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            {filterItems.map((item, i) => (
              <FilterItemPill
                key={i}
                label={item.label}
                required={item.required}
              />
            ))}
            {filterCount && <MorePill count={moreCount} />}
            {showWarning && <WarningTag count={warningCount} />}
          </div>

          {/* ── CTA buttons ──────────────────────────────────────────────── */}
          {showCta && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              <Button
                type="primary"
                size="small"
                style={{ height: 24, fontFamily, fontSize: fontSize.fontSizeSM }}
                onClick={onApply}
              >
                Apply
              </Button>
              <Button
                type="default"
                size="small"
                style={{
                  height: 24,
                  fontFamily,
                  fontSize: fontSize.fontSizeSM,
                  color: themeColorsLight.colorPrimary,
                  borderColor: themeColorsLight.colorPrimary,
                }}
                onClick={onMoreFilters}
              >
                More Filters
              </Button>
              <Button
                type="text"
                size="small"
                style={{ height: 24, fontFamily, fontSize: fontSize.fontSizeSM }}
                onClick={onClearAll}
              >
                Clear All
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FilterBar;
