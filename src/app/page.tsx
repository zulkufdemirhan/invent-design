'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTag,
  faCamera,
  faChartPie,
  faLayerGroup,
  faTruck,
  faArrowRightArrowLeft,
  faChartLine,
  faShirt,
  faMoneyBillWave,
  faDatabase,
  faArrowsRotate,
  faPlus,
  faChevronDown,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/Button';
import { themeColorsLight } from '@/tokens/colors';
import { fontFamily, fontSize, fontWeight, lineHeightPx } from '@/tokens/typography';
import { borderRadius, padding } from '@/tokens/spacing';
import { iconSize } from '@/tokens/icons';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CardItem {
  label: string;
  expandable?: boolean;
}

interface ModuleCardData {
  key: string;
  title: string;
  icon: IconDefinition;
  items: CardItem[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROW_1: ModuleCardData[] = [
  {
    key: 'markdown',
    title: 'Markdown',
    icon: faTag,
    items: [
      { label: 'Dashboard' },
      { label: 'Runs' },
      { label: 'Option-Level Constraints' },
      { label: 'Manage Target Groups' },
      { label: 'Scenario Results' },
      { label: 'Reports', expandable: true },
    ],
  },
  {
    key: 'pricing',
    title: 'Pricing',
    icon: faCamera,
    items: [
      { label: 'Pricing Results' },
      { label: 'Attribute Rules' },
      { label: 'Algorithm Settings' },
      { label: 'Pricing Runs' },
      { label: 'Reports', expandable: true },
    ],
  },
  {
    key: 'promotion',
    title: 'Promotion Analysis',
    icon: faChartPie,
    items: [
      { label: 'Promo Plan' },
      { label: 'Runs' },
      { label: 'Rule Groups' },
      { label: 'Marketing Calendar' },
    ],
  },
];

const ROW_2: ModuleCardData[] = [
  {
    key: 'inventory',
    title: 'Inventory Management',
    icon: faLayerGroup,
    items: [
      { label: 'Control Tower' },
      { label: 'Forecast Review & Edit' },
      { label: 'Store Replenishment Orders' },
      { label: 'DC Replenishment Orders' },
      { label: 'Custom Order Generation' },
      { label: 'Alert Review' },
      { label: 'Delivery Schedule' },
    ],
  },
  {
    key: 'replenishment',
    title: 'DC Replenishment Orders',
    icon: faTruck,
    items: [
      { label: 'Demand Planning' },
      { label: 'Order Planning' },
      { label: 'Reports', expandable: true },
    ],
  },
  {
    key: 'allocation',
    title: 'Allocation',
    icon: faArrowRightArrowLeft,
    items: [
      { label: 'Dashboard' },
      { label: 'Runs' },
      { label: 'Seasonal Planning' },
      { label: 'Seasonal Replenishment Review & Approval' },
      { label: 'PO Reallocation' },
      { label: 'Reports', expandable: true },
    ],
  },
  {
    key: 'transfer',
    title: 'Transfer',
    icon: faArrowRightArrowLeft,
    items: [
      { label: 'Runs' },
      { label: 'Store Scenario' },
      { label: 'Minimum Stock Thresholds' },
      { label: 'Blocked Products Pairs' },
    ],
  },
];

const ROW_3: ModuleCardData[] = [
  {
    key: 'forecast',
    title: 'Forecast',
    icon: faChartLine,
    items: [
      { label: 'Forecast Enrich' },
      { label: 'Forecast Review & Edit' },
    ],
  },
  {
    key: 'assortment',
    title: 'Assortment',
    icon: faShirt,
    items: [
      { label: 'Store Clustering' },
      { label: 'Assortment Insights' },
      { label: 'Assortment Strategy' },
      { label: 'Range Plan' },
      { label: 'Product Gallery' },
      { label: 'Store Layout' },
    ],
  },
  {
    key: 'financial',
    title: 'Merchandising Financial Plan',
    icon: faMoneyBillWave,
    items: [
      { label: 'Product Planning', expandable: true },
      { label: 'Store Planning', expandable: true },
      { label: 'Buying Planning' },
      { label: 'Planning Calendar' },
      { label: 'Scenario Management' },
      { label: 'Configuration' },
    ],
  },
  {
    key: 'data-maintenance',
    title: 'Data Maintenance',
    icon: faDatabase,
    items: [
      { label: 'Parameter Configuration' },
      { label: 'Product Store Groups' },
      { label: 'Data Upload' },
      { label: 'File Manager' },
      { label: 'Order Schedule' },
      { label: 'Order Groups' },
      { label: 'Image Attribute Generator' },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const MenuItem: React.FC<CardItem> = ({ label, expandable }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      role="menuitem"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: padding.paddingXS,
        height: 32,
        paddingLeft: padding.paddingSM,
        paddingRight: padding.paddingSM,
        borderRadius: borderRadius.borderRadiusLG,
        cursor: 'pointer',
        width: '100%',
        boxSizing: 'border-box',
        flexShrink: 0,
        background: hovered ? themeColorsLight.colorFillSecondary : 'transparent',
      }}
    >
      <span
        style={{
          flex: 1,
          fontFamily,
          fontSize: fontSize.fontSize,
          fontWeight: fontWeight.normal,
          lineHeight: `${lineHeightPx.lineHeight}px`,
          color: themeColorsLight.colorText,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          minWidth: 0,
        }}
      >
        {label}
      </span>
      {expandable && (
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{
            width: iconSize.iconSizeXS,
            height: iconSize.iconSizeXS,
            flexShrink: 0,
            color: themeColorsLight.colorTextTertiary,
          }}
        />
      )}
    </div>
  );
};

const ModuleCard: React.FC<{ card: ModuleCardData }> = ({ card }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: 340,
      background: themeColorsLight.colorBgContainer,
      borderRadius: borderRadius.borderRadiusLG,
      overflow: 'hidden',
      width: '100%',
    }}
  >
    {/* Header */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: padding.paddingSM,
        padding: padding.paddingSM,
        borderBottom: `1px solid ${themeColorsLight.colorBorderSecondary}`,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: themeColorsLight.colorPrimary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <FontAwesomeIcon
          icon={card.icon}
          style={{
            width: iconSize.iconSizeLG,
            height: iconSize.iconSizeLG,
            color: themeColorsLight.colorTextLightSolid,
          }}
        />
      </div>
      <span
        style={{
          flex: 1,
          fontFamily,
          fontSize: fontSize.fontSizeHeading4,
          fontWeight: fontWeight.strong,
          lineHeight: `${lineHeightPx.lineHeightHeading4}px`,
          color: themeColorsLight.colorText,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          minWidth: 0,
        }}
      >
        {card.title}
      </span>
    </div>

    {/* Items */}
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: padding.paddingXXS,
        padding: padding.paddingSM,
        overflow: 'hidden',
      }}
    >
      {card.items.map((item) => (
        <MenuItem key={item.label} label={item.label} expandable={item.expandable} />
      ))}
    </div>
  </div>
);

const WorkflowsCard: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: padding.padding,
      height: 340,
      padding: padding.padding,
      borderRadius: borderRadius.borderRadius,
      border: `1.5px solid ${themeColorsLight.colorTextLightSolid}`,
      backgroundImage: `linear-gradient(225deg, ${themeColorsLight.colorBgContainer} 0%, ${themeColorsLight.colorPrimaryBg} 100%)`,
      boxSizing: 'border-box',
      width: '100%',
      overflow: 'hidden',
    }}
  >
    {/* Header */}
    <span
      style={{
        fontFamily,
        fontSize: fontSize.fontSizeHeading4,
        fontWeight: fontWeight.strong,
        lineHeight: `${lineHeightPx.lineHeightHeading4}px`,
        color: themeColorsLight.colorText,
        flexShrink: 0,
      }}
    >
      Your Workflows
    </span>

    {/* Empty state */}
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: padding.paddingMD,
        background: themeColorsLight.colorFillQuaternary,
        border: `1px solid ${themeColorsLight.colorTextLightSolid}`,
        borderRadius: borderRadius.borderRadius,
        padding: padding.paddingXL,
        boxSizing: 'border-box',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <FontAwesomeIcon
        icon={faArrowsRotate}
        style={{
          width: 34,
          height: 34,
          color: themeColorsLight.colorTextQuaternary,
          flexShrink: 0,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: padding.paddingXS, width: '100%' }}>
        <span
          style={{
            fontFamily,
            fontSize: fontSize.fontSizeHeading5,
            fontWeight: fontWeight.strong,
            lineHeight: `${lineHeightPx.lineHeightHeading5}px`,
            color: themeColorsLight.colorText,
          }}
        >
          No workflows yet!
        </span>
        <p
          style={{
            margin: 0,
            fontFamily,
            fontSize: fontSize.fontSizeSM,
            fontWeight: fontWeight.normal,
            lineHeight: `${lineHeightPx.lineHeightSM}px`,
            color: themeColorsLight.colorTextSecondary,
          }}
        >
          Create custom workflows to help you organize tasks, save time, and stay on track with your work.
        </p>
      </div>

      <Button
        type="primary"
        icon={<FontAwesomeIcon icon={faPlus} style={{ width: iconSize.iconSizeSM, height: iconSize.iconSizeSM }} />}
      >
        New Workflow
      </Button>
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const ALL_CARDS = [...ROW_1, ...ROW_2, ...ROW_3];

export default function HomePage() {
  return (
    <div className={styles.grid}>
      <WorkflowsCard />
      {ALL_CARDS.map((card) => (
        <ModuleCard key={card.key} card={card} />
      ))}
    </div>
  );
}
