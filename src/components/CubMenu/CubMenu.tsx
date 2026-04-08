import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faMagnifyingGlass,
  faHouse,
  faTag,
  faCamera,
  faChartPie,
  faLayerGroup,
  faCubes,
  faTruck,
  faArrowRightArrowLeft,
  faChartLine,
  faShirt,
  faMoneyBillWave,
  faDatabase,
  faLightbulb,
  faFileMedical,
  faCircleQuestion,
  faUserGear,
  faCode,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { themeColorsLight } from '@/tokens/colors';
import { fontFamily, fontSize, fontWeight, lineHeightPx } from '@/tokens/typography';
import { borderRadius, padding } from '@/tokens/spacing';
import { iconSize } from '@/tokens/icons';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CubMenuItem {
  key: string;
  label: string;
  icon?: IconDefinition;
  /** If true shows the expand chevron. Auto-set when children is provided. */
  expandable?: boolean;
  /** Nested sub-items. Renders an inline submenu when the parent is opened. */
  children?: CubMenuSubItem[];
  onClick?: () => void;
}

export interface CubMenuSubItem {
  key: string;
  label: string;
  /** Nested level-3 items */
  children?: CubMenuSubItem[];
}

export interface CubMenuProps {
  /** Whether the sidebar is collapsed to icon-only mode */
  collapsed?: boolean;
  /** Primary menu items (above the separator) */
  items?: CubMenuItem[];
  /** Secondary menu items (below the separator) */
  secondaryItems?: CubMenuItem[];
  /** Brand/app name shown in the header when expanded */
  brandName?: string;
  /** Logo icon element shown in the header */
  logoIcon?: React.ReactNode;
  /** Show the Remi AI assistant section at the bottom */
  showRemi?: boolean;
  /** Footer wordmark element (shown when expanded) */
  footerWordmark?: React.ReactNode;
  /** Footer logo icon (shown when collapsed) */
  footerLogoIcon?: React.ReactNode;
  /** Currently selected menu item key (leaf node key) */
  selectedKey?: string;
  /** Controlled open submenu keys. Uncontrolled if omitted. */
  openKeys?: string[];
  /** Called when a leaf item is clicked */
  onItemClick?: (key: string) => void;
  /** Called when open submenu keys change (controlled mode) */
  onOpenChange?: (openKeys: string[]) => void;
}

// ─── Default items ────────────────────────────────────────────────────────────

export const DEFAULT_MENU_ITEMS: CubMenuItem[] = [
  { key: 'home', label: 'Home', icon: faHouse },
  {
    key: 'markdown', label: 'Markdown', icon: faTag,
    children: [
      { key: 'markdown-item-1', label: 'Menu Item 1' },
      { key: 'markdown-item-2', label: 'Menu Item 2' },
      { key: 'markdown-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'pricing', label: 'Pricing', icon: faCamera,
    children: [
      { key: 'pricing-item-1', label: 'Menu Item 1' },
      { key: 'pricing-item-2', label: 'Menu Item 2' },
      { key: 'pricing-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'promotion', label: 'Promotion Analysis', icon: faChartPie,
    children: [
      { key: 'promotion-item-1', label: 'Menu Item 1' },
      { key: 'promotion-item-2', label: 'Menu Item 2' },
      { key: 'promotion-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'inventory', label: 'Inventory Management', icon: faLayerGroup,
    children: [
      { key: 'inventory-item-1', label: 'Menu Item 1' },
      { key: 'inventory-item-2', label: 'Menu Item 2' },
      { key: 'inventory-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'prepack', label: 'Size Prepack Optimization', icon: faCubes,
    children: [
      { key: 'prepack-item-1', label: 'Menu Item 1' },
      { key: 'prepack-item-2', label: 'Menu Item 2' },
      { key: 'prepack-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'replenishment', label: 'DC Replenishment Orders', icon: faTruck,
    children: [
      { key: 'replenishment-item-1', label: 'Menu Item 1' },
      { key: 'replenishment-item-2', label: 'Menu Item 2' },
      { key: 'replenishment-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'allocation', label: 'Allocation', icon: faArrowRightArrowLeft,
    children: [
      { key: 'allocation-item-1', label: 'Menu Item 1' },
      { key: 'allocation-item-2', label: 'Menu Item 2' },
      { key: 'allocation-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'transfer',
    label: 'Transfer',
    icon: faArrowRightArrowLeft,
    children: [
      { key: 'transfer-store-scenario', label: 'Store Scenario' },
      { key: 'transfer-runs',           label: 'Transfer Runs' },
      {
        key: 'transfer-reports',
        label: 'Reports',
        children: [
          { key: 'transfer-reports-monthly',   label: 'Monthly Transfer Performance Dashboard' },
          { key: 'transfer-reports-inventory', label: 'Store Inventory Positions' },
        ],
      },
    ],
  },
  {
    key: 'forecast', label: 'Forecast', icon: faChartLine,
    children: [
      { key: 'forecast-item-1', label: 'Menu Item 1' },
      { key: 'forecast-item-2', label: 'Menu Item 2' },
      { key: 'forecast-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'assortment', label: 'Assortment', icon: faShirt,
    children: [
      { key: 'assortment-item-1', label: 'Menu Item 1' },
      { key: 'assortment-item-2', label: 'Menu Item 2' },
      { key: 'assortment-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'financial', label: 'Merchandising Financial Plan', icon: faMoneyBillWave,
    children: [
      { key: 'financial-item-1', label: 'Menu Item 1' },
      { key: 'financial-item-2', label: 'Menu Item 2' },
      { key: 'financial-item-3', label: 'Menu Item 3' },
    ],
  },
];

export const DEFAULT_SECONDARY_ITEMS: CubMenuItem[] = [
  {
    key: 'data-maintenance', label: 'Data Maintenance', icon: faDatabase,
    children: [
      { key: 'data-maintenance-item-1', label: 'Menu Item 1' },
      { key: 'data-maintenance-item-2', label: 'Menu Item 2' },
      { key: 'data-maintenance-item-3', label: 'Menu Item 3' },
    ],
  },
  { key: 'insight-hub', label: 'Insight Hub', icon: faLightbulb },
  {
    key: 'reports', label: 'Reports', icon: faFileMedical,
    children: [
      { key: 'reports-item-1', label: 'Menu Item 1' },
      { key: 'reports-item-2', label: 'Menu Item 2' },
      { key: 'reports-item-3', label: 'Menu Item 3' },
    ],
  },
  { key: 'documentation', label: 'Documentation', icon: faCircleQuestion },
  {
    key: 'admin', label: 'Admin', icon: faUserGear,
    children: [
      { key: 'admin-item-1', label: 'Menu Item 1' },
      { key: 'admin-item-2', label: 'Menu Item 2' },
      { key: 'admin-item-3', label: 'Menu Item 3' },
    ],
  },
  {
    key: 'in-development', label: 'In Development', icon: faCode,
    children: [
      { key: 'in-development-item-1', label: 'Menu Item 1' },
      { key: 'in-development-item-2', label: 'Menu Item 2' },
      { key: 'in-development-item-3', label: 'Menu Item 3' },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns true if the item or any descendant matches selectedKey */
function itemContainsSelected(item: CubMenuItem | CubMenuSubItem, selectedKey?: string): boolean {
  if (!selectedKey) return false;
  if (item.key === selectedKey) return true;
  if ('children' in item && item.children) {
    return item.children.some((c) => itemContainsSelected(c, selectedKey));
  }
  return false;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Level-2 or level-3 leaf row inside an open submenu */
const SubmenuRow: React.FC<{
  item: CubMenuSubItem;
  indent: number;
  selected: boolean;
  open?: boolean;
  hasChildren?: boolean;
  onToggle?: () => void;
  onSelect: () => void;
}> = ({ item, indent, selected, open, hasChildren, onToggle, onSelect }) => {
  const isActiveLeaf = selected && !hasChildren;

  const handleClick = () => {
    if (hasChildren) {
      onToggle?.();
    } else {
      onSelect();
    }
  };

  return (
    <div
      role="menuitem"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: padding.paddingXS,
        height: 32,
        paddingLeft: indent,
        paddingRight: padding.paddingSM,
        borderRadius: borderRadius.borderRadiusLG,
        cursor: 'pointer',
        width: '100%',
        boxSizing: 'border-box',
        background: isActiveLeaf ? themeColorsLight.colorPrimary : 'transparent',
        flexShrink: 0,
        color: isActiveLeaf
          ? themeColorsLight.colorTextLightSolid
          : themeColorsLight.colorText,
      }}
    >
      <span
        style={{
          flex: 1,
          fontFamily,
          fontSize: fontSize.fontSize,
          lineHeight: `${lineHeightPx.lineHeight}px`,
          fontWeight: fontWeight.normal,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          minWidth: 0,
        }}
      >
        {item.label}
      </span>
      {hasChildren && (
        <FontAwesomeIcon
          icon={open ? faChevronUp : faChevronDown}
          style={{ fontSize: iconSize.iconSizeXS, width: iconSize.iconSizeXS, flexShrink: 0 }}
        />
      )}
    </div>
  );
};

/** Recursive submenu rendered beneath an open top-level item */
const SubmenuItems: React.FC<{
  items: CubMenuSubItem[];
  selectedKey?: string;
  onSelect: (key: string) => void;
  level?: number;
}> = ({ items, selectedKey, onSelect, level = 2 }) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  // Level 2 → 36px indent, Level 3 → 48px indent
  const indent = level === 2 ? 36 : 48;

  const toggle = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Level 3 container: vertical padding only + overflow hidden (Figma: "Submenu Level 3")
  // Level 2 container: uniform 4px padding on all sides (Figma: "Submenu Items")
  const containerStyle: React.CSSProperties =
    level === 2
      ? {
          display: 'flex',
          flexDirection: 'column',
          gap: padding.paddingXXS,
          background: themeColorsLight.colorFillQuaternary,
          borderRadius: borderRadius.borderRadiusLG,
          padding: padding.paddingXXS,
          width: '100%',
          boxSizing: 'border-box',
          flexShrink: 0,
        }
      : {
          display: 'flex',
          flexDirection: 'column',
          gap: padding.paddingXXS,
          background: themeColorsLight.colorFillQuaternary,
          borderRadius: borderRadius.borderRadiusLG,
          paddingTop: padding.paddingXXS,
          paddingBottom: padding.paddingXXS,
          paddingLeft: 0,
          paddingRight: 0,
          width: '100%',
          boxSizing: 'border-box',
          flexShrink: 0,
          overflow: 'hidden',
        };

  return (
    <div style={containerStyle}>
      {items.map((child) => {
        const hasChildren = !!(child.children && child.children.length > 0);
        const isOpen = openKeys.includes(child.key);

        return (
          <React.Fragment key={child.key}>
            <SubmenuRow
              item={child}
              indent={indent}
              selected={itemContainsSelected(child, selectedKey)}
              open={isOpen}
              hasChildren={hasChildren}
              onToggle={() => toggle(child.key)}
              onSelect={() => onSelect(child.key)}
            />
            {hasChildren && isOpen && child.children && (
              <SubmenuItems
                items={child.children}
                selectedKey={selectedKey}
                onSelect={onSelect}
                level={level + 1}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/** Top-level menu item row (expanded sidebar) */
const MenuItemInline: React.FC<{
  item: CubMenuItem;
  selected: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: () => void;
}> = ({ item, selected, isOpen, onToggle, onSelect }) => {
  const hasChildren = !!(item.children && item.children.length > 0);
  const isExpandable = hasChildren || item.expandable;
  // Parent is "active-open" = has children, is open, and a descendant is selected
  const isActiveOpen = hasChildren && isOpen && selected;

  const textColor =
    isActiveOpen
      ? themeColorsLight.colorPrimaryText
      : themeColorsLight.colorText;

  const handleClick = () => {
    if (hasChildren) {
      onToggle();
    } else {
      onSelect();
    }
  };

  return (
    <div
      role="menuitem"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: padding.paddingXS,
        height: 32,
        padding: `0 ${padding.paddingSM}px`,
        borderRadius: borderRadius.borderRadiusLG,
        cursor: 'pointer',
        width: '100%',
        boxSizing: 'border-box',
        background:
          !hasChildren && selected
            ? themeColorsLight.colorPrimaryBg
            : 'transparent',
        flexShrink: 0,
        color: textColor,
      }}
    >
      {/* Icon + Label */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: padding.paddingXS,
          minWidth: 0,
          color: textColor,
        }}
      >
        {item.icon && (
          <div
            style={{
              width: 20,
              display: 'flex',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: iconSize.iconSize,
            }}
          >
            <FontAwesomeIcon
              icon={item.icon}
              style={{ width: iconSize.iconSize, height: iconSize.iconSize }}
            />
          </div>
        )}
        <span
          style={{
            flex: 1,
            fontFamily,
            fontSize: fontSize.fontSize,
            lineHeight: `${lineHeightPx.lineHeight}px`,
            fontWeight: fontWeight.normal,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            minWidth: 0,
          }}
        >
          {item.label}
        </span>
      </div>

      {isExpandable && (
        <FontAwesomeIcon
          icon={hasChildren && isOpen ? faChevronUp : faChevronDown}
          style={{
            fontSize: iconSize.iconSizeXS,
            color: textColor,
            flexShrink: 0,
            width: iconSize.iconSizeXS,
          }}
        />
      )}
    </div>
  );
};

/** Icon-only item (collapsed sidebar) */
const MenuItemCollapsed: React.FC<{
  item: CubMenuItem;
  selected: boolean;
  onClick: () => void;
}> = ({ item, selected, onClick }) => (
  <div
    role="menuitem"
    tabIndex={0}
    title={item.label}
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: padding.paddingXXS,
      borderRadius: borderRadius.borderRadiusLG,
      cursor: 'pointer',
      width: 32,
      height: 32,
      flexShrink: 0,
      background: selected ? themeColorsLight.colorPrimaryBg : 'transparent',
      color: selected ? themeColorsLight.colorPrimaryText : themeColorsLight.colorText,
    }}
  >
    {item.icon && (
      <FontAwesomeIcon
        icon={item.icon}
        style={{ fontSize: iconSize.iconSizeXL, width: iconSize.iconSizeXL, height: iconSize.iconSizeXL }}
      />
    )}
  </div>
);

// ─── Separator ────────────────────────────────────────────────────────────────

const Separator: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => (
  <div
    style={{
      height: 1,
      width: collapsed ? 32 : '100%',
      background: themeColorsLight.colorBorderSecondary,
      margin: `${padding.paddingXXS}px 0`,
      alignSelf: collapsed ? 'center' : undefined,
      flexShrink: 0,
    }}
  />
);

// ─── Remi Section ─────────────────────────────────────────────────────────────

const RemiExpanded: React.FC = () => (
  <div
    style={{
      padding: padding.paddingSM,
      borderRadius: borderRadius.borderRadiusLG,
      background: `linear-gradient(154deg, ${themeColorsLight.colorRemiBg} 30%, ${themeColorsLight.colorRemiBorder} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      gap: padding.paddingXXS,
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      boxSizing: 'border-box',
      flexShrink: 0,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: padding.paddingXS }}>
      <span style={{ fontSize: 14, lineHeight: 1 }}>✦</span>
      <span
        style={{
          fontFamily,
          fontSize: fontSize.fontSizeXL,
          fontWeight: fontWeight.semiStrong,
          color: themeColorsLight.colorRemiText,
          lineHeight: `${lineHeightPx.lineHeightXL}px`,
          whiteSpace: 'nowrap',
        }}
      >
        Ask Remi
      </span>
    </div>
    <p
      style={{
        margin: 0,
        fontFamily,
        fontSize: fontSize.fontSizeSM,
        fontWeight: fontWeight.normal,
        color: themeColorsLight.colorText,
        lineHeight: `${lineHeightPx.lineHeightSM}px`,
      }}
    >
      Access all Remi Agents in one place and explore their skills.
    </p>
  </div>
);

const RemiCollapsed: React.FC = () => (
  <div
    title="Ask Remi"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: padding.paddingXXS,
      borderRadius: borderRadius.borderRadiusLG,
      cursor: 'pointer',
      width: 32,
      height: 32,
      flexShrink: 0,
      background: `linear-gradient(135deg, ${themeColorsLight.colorRemiBg} 30%, ${themeColorsLight.colorRemiBorder} 100%)`,
    }}
  >
    <span style={{ fontSize: 14, lineHeight: 1, color: themeColorsLight.colorRemiText }}>✦</span>
  </div>
);

// ─── Item list renderer (shared between primary + secondary) ──────────────────

const ItemList: React.FC<{
  items: CubMenuItem[];
  collapsed: boolean;
  selectedKey?: string;
  openKeys: string[];
  onToggle: (key: string) => void;
  onSelect: (key: string) => void;
}> = ({ items, collapsed, selectedKey, openKeys, onToggle, onSelect }) => (
  <>
    {items.map((item) => {
      const hasChildren = !!(item.children && item.children.length > 0);
      const isOpen = openKeys.includes(item.key);
      const isSelected = hasChildren
        ? itemContainsSelected(item, selectedKey)
        : item.key === selectedKey;

      if (collapsed) {
        return (
          <MenuItemCollapsed
            key={item.key}
            item={item}
            selected={isSelected}
            onClick={() => onSelect(item.key)}
          />
        );
      }

      // Items with children are wrapped in a container so the gap between the
      // parent row and the submenu panel is 2px (Figma spec), independent of
      // the 4px gap used between sibling top-level items.
      if (hasChildren) {
        return (
          <div
            key={item.key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              background: themeColorsLight.colorBgContainer,
              width: '100%',
              flexShrink: 0,
            }}
          >
            <MenuItemInline
              item={item}
              selected={isSelected}
              isOpen={isOpen}
              onToggle={() => onToggle(item.key)}
              onSelect={() => onSelect(item.key)}
            />
            {isOpen && item.children && (
              <SubmenuItems
                items={item.children}
                selectedKey={selectedKey}
                onSelect={onSelect}
              />
            )}
          </div>
        );
      }

      return (
        <MenuItemInline
          key={item.key}
          item={item}
          selected={isSelected}
          isOpen={isOpen}
          onToggle={() => onToggle(item.key)}
          onSelect={() => onSelect(item.key)}
        />
      );
    })}
  </>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const CubMenu: React.FC<CubMenuProps> = ({
  collapsed = false,
  items = DEFAULT_MENU_ITEMS,
  secondaryItems = DEFAULT_SECONDARY_ITEMS,
  brandName = 'invent.ai',
  logoIcon,
  showRemi = true,
  footerWordmark,
  footerLogoIcon,
  selectedKey,
  openKeys: controlledOpenKeys,
  onItemClick,
  onOpenChange,
}) => {
  const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>([]);
  const isControlled = controlledOpenKeys !== undefined;
  const openKeys = isControlled ? controlledOpenKeys : internalOpenKeys;

  const handleToggle = (key: string) => {
    const next = openKeys.includes(key)
      ? openKeys.filter((k) => k !== key)
      : [...openKeys, key];
    if (!isControlled) setInternalOpenKeys(next);
    onOpenChange?.(next);
  };

  const handleSelect = (key: string) => {
    onItemClick?.(key);
  };

  const width = collapsed ? 56 : 250;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        width,
        height: '100%',
        minHeight: 0,
        background: themeColorsLight.colorBgContainer,
        borderRight: `1px solid ${themeColorsLight.colorBorderSecondary}`,
        boxSizing: 'border-box',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 52,
          padding: padding.paddingXS,
          gap: collapsed ? 0 : padding.paddingXS,
          borderBottom: `1px solid ${themeColorsLight.colorBorderSecondary}`,
          justifyContent: collapsed ? 'center' : 'flex-start',
          flexShrink: 0,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: themeColorsLight.colorBgContainer,
            border: `1px solid ${themeColorsLight.colorBorderSecondary}`,
            borderRadius: borderRadius.borderRadiusLG,
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {logoIcon ?? (
            <span
              style={{
                fontFamily,
                fontSize: fontSize.fontSizeSM,
                fontWeight: fontWeight.strong,
                color: themeColorsLight.colorText,
                lineHeight: 1,
              }}
            >
              AI
            </span>
          )}
        </div>

        {!collapsed && (
          <span
            style={{
              flex: 1,
              fontFamily,
              fontSize: fontSize.fontSizeLG,
              fontWeight: fontWeight.strong,
              color: themeColorsLight.colorText,
              lineHeight: `${lineHeightPx.lineHeightLG}px`,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              minWidth: 0,
            }}
          >
            {brandName}
          </span>
        )}
      </div>

      {/* ── Menu Items ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          padding: padding.paddingXS,
          overflowY: 'auto',
          overflowX: 'hidden',
          alignItems: collapsed ? 'center' : 'flex-start',
          boxSizing: 'border-box',
        }}
      >
        {/* Search (expanded only) */}
        {!collapsed && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 32,
              width: '100%',
              background: themeColorsLight.colorBgContainer,
              border: `1px solid ${themeColorsLight.colorBorder}`,
              borderRadius: borderRadius.borderRadius,
              boxSizing: 'border-box',
              overflow: 'hidden',
              flexShrink: 0,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                flex: 1,
                fontFamily,
                fontSize: fontSize.fontSize,
                color: themeColorsLight.colorTextQuaternary,
                paddingLeft: padding.paddingSM,
                lineHeight: `${lineHeightPx.lineHeight}px`,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Search
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderLeft: `1px solid ${themeColorsLight.colorBorder}`,
                flexShrink: 0,
                color: themeColorsLight.colorTextTertiary,
                fontSize: iconSize.iconSize,
              }}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ width: iconSize.iconSize, height: iconSize.iconSize }}
              />
            </div>
          </div>
        )}

        {/* Primary items */}
        <ItemList
          items={items}
          collapsed={collapsed}
          selectedKey={selectedKey}
          openKeys={openKeys}
          onToggle={handleToggle}
          onSelect={handleSelect}
        />

        <Separator collapsed={collapsed} />

        {/* Secondary items */}
        <ItemList
          items={secondaryItems}
          collapsed={collapsed}
          selectedKey={selectedKey}
          openKeys={openKeys}
          onToggle={handleToggle}
          onSelect={handleSelect}
        />
      </div>

      {/* ── Remi Section ── */}
      {showRemi && (
        <div
          style={{
            padding: `${padding.paddingXXS}px ${padding.paddingXS}px`,
            display: 'flex',
            justifyContent: collapsed ? 'center' : 'stretch',
            flexShrink: 0,
          }}
        >
          {collapsed ? <RemiCollapsed /> : <RemiExpanded />}
        </div>
      )}

      {/* ── Footer ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 52,
          padding: padding.paddingXS,
          borderTop: `1px solid ${themeColorsLight.colorBorderSecondary}`,
          flexShrink: 0,
          boxSizing: 'border-box',
        }}
      >
        {collapsed
          ? (footerLogoIcon ?? (
              <span
                style={{
                  fontFamily,
                  fontSize: fontSize.fontSizeSM,
                  fontWeight: fontWeight.strong,
                  color: themeColorsLight.colorText,
                }}
              >
                AI
              </span>
            ))
          : (footerWordmark ?? (
              <span
                style={{
                  fontFamily,
                  fontSize: fontSize.fontSizeSM,
                  fontWeight: fontWeight.strong,
                  color: themeColorsLight.colorRemiText,
                  letterSpacing: '-0.02em',
                }}
              >
                invent.ai
              </span>
            ))}
      </div>
    </div>
  );
};

export default CubMenu;
