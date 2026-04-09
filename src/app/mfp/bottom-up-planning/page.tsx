'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChartLine,
  faPercent,
  faBoxOpen,
  faDollarSign,
  faSave,
  faRotateLeft,
  faLayerGroup,
  faTableColumns,
  faSliders,
  faDownload,
  faUpload,
  faArrowRotateLeft,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import { KpiCard } from '@/components/KpiCard/KpiCard';
import { FilterBar } from '@/components/FilterBar/FilterBar';
import { DataSheetTitle } from '@/components/DataTable/DataSheetTitle';
import { DataSheetTextCell } from '@/components/DataTable/DataSheetTextCell';
import { dataTableColorsLight, themeColorsLight } from '@/tokens/colors';
import { fontFamily, fontSize, fontWeight, lineHeightPx } from '@/tokens/typography';
import { borderRadius } from '@/tokens/spacing';
import { iconSize } from '@/tokens/icons';

// ─── Data model ───────────────────────────────────────────────────────────────

interface SkuData {
  id: string;
  parentId: string;
  name: string;
  planQty: number;
  planPrice: number;
  planMarginPct: number;
  stockUnits: number;
  markdownPct: number;
  lySales: number;
}

const INITIAL_SKUS: SkuData[] = [
  { id: 'wm-dress-1', parentId: 'wm-dress', name: 'Floral Maxi Dress',   planQty: 450, planPrice: 89,  planMarginPct: 58, stockUnits: 180, markdownPct: 15, lySales: 43650 },
  { id: 'wm-dress-2', parentId: 'wm-dress', name: 'Wrap Midi Dress',     planQty: 380, planPrice: 75,  planMarginPct: 55, stockUnits: 160, markdownPct: 12, lySales: 22400 },
  { id: 'wm-tops-1',  parentId: 'wm-tops',  name: 'Classic White Tee',   planQty: 820, planPrice: 35,  planMarginPct: 65, stockUnits: 320, markdownPct:  8, lySales: 24750 },
  { id: 'wm-tops-2',  parentId: 'wm-tops',  name: 'Linen Blouse',        planQty: 360, planPrice: 65,  planMarginPct: 62, stockUnits: 140, markdownPct: 10, lySales: 19375 },
  { id: 'mn-shirt-1', parentId: 'mn-shirt', name: 'Oxford Button-Down',  planQty: 520, planPrice: 72,  planMarginPct: 56, stockUnits: 200, markdownPct: 12, lySales: 32640 },
  { id: 'mn-shirt-2', parentId: 'mn-shirt', name: 'Linen Casual Shirt',  planQty: 430, planPrice: 62,  planMarginPct: 54, stockUnits: 170, markdownPct: 10, lySales: 22620 },
  { id: 'mn-trs-1',   parentId: 'mn-trs',   name: 'Slim Chino',          planQty: 380, planPrice: 85,  planMarginPct: 52, stockUnits: 150, markdownPct: 15, lySales: 27200 },
  { id: 'mn-trs-2',   parentId: 'mn-trs',   name: 'Classic Jogger',      planQty: 490, planPrice: 68,  planMarginPct: 55, stockUnits: 200, markdownPct:  8, lySales: 26880 },
  { id: 'acc-bags-1', parentId: 'acc-bags', name: 'Canvas Tote Bag',     planQty: 650, planPrice: 45,  planMarginPct: 72, stockUnits: 260, markdownPct:  5, lySales: 25230 },
  { id: 'acc-bags-2', parentId: 'acc-bags', name: 'Leather Crossbody',   planQty: 280, planPrice: 125, planMarginPct: 68, stockUnits: 110, markdownPct: 20, lySales: 27360 },
  { id: 'acc-scar-1', parentId: 'acc-scar', name: 'Wool Scarf',          planQty: 420, planPrice: 42,  planMarginPct: 70, stockUnits: 180, markdownPct: 10, lySales: 15200 },
  { id: 'acc-scar-2', parentId: 'acc-scar', name: 'Baseball Cap',        planQty: 560, planPrice: 28,  planMarginPct: 75, stockUnits: 230, markdownPct:  5, lySales: 13260 },
];

const SUBCATEGORIES = [
  { id: 'wm-dress', parentId: 'wm',  name: 'Dresses',        children: ['wm-dress-1', 'wm-dress-2'] },
  { id: 'wm-tops',  parentId: 'wm',  name: 'Tops',           children: ['wm-tops-1',  'wm-tops-2']  },
  { id: 'mn-shirt', parentId: 'mn',  name: 'Shirts',         children: ['mn-shirt-1', 'mn-shirt-2'] },
  { id: 'mn-trs',   parentId: 'mn',  name: 'Trousers',       children: ['mn-trs-1',   'mn-trs-2']   },
  { id: 'acc-bags', parentId: 'acc', name: 'Bags',           children: ['acc-bags-1', 'acc-bags-2'] },
  { id: 'acc-scar', parentId: 'acc', name: 'Scarves & Hats', children: ['acc-scar-1', 'acc-scar-2'] },
];

const CATEGORIES = [
  { id: 'wm',  name: "Women's Apparel", children: ['wm-dress', 'wm-tops']  },
  { id: 'mn',  name: "Men's Apparel",   children: ['mn-shirt', 'mn-trs']   },
  { id: 'acc', name: 'Accessories',     children: ['acc-bags', 'acc-scar'] },
];

// ─── Aggregation ──────────────────────────────────────────────────────────────

interface Agg {
  planQty: number; planSales: number; planMarginDollar: number;
  planMarginPct: number; stockUnits: number; coverWks: number;
  vsLYPct: number; avgPrice: number; lySales: number;
}

function aggFromSkus(ids: string[], map: Map<string, SkuData>): Agg {
  let pq = 0, ps = 0, pm = 0, su = 0, ly = 0;
  for (const id of ids) {
    const s = map.get(id);
    if (!s) continue;
    const sales = s.planQty * s.planPrice;
    pq += s.planQty; ps += sales; pm += sales * s.planMarginPct / 100;
    su += s.stockUnits; ly += s.lySales;
  }
  return {
    planQty: pq, planSales: ps, planMarginDollar: pm,
    planMarginPct: ps > 0 ? pm / ps * 100 : 0,
    stockUnits: su, coverWks: pq > 0 ? su / (pq / 13) : 0,
    vsLYPct: ly > 0 ? (ps - ly) / ly * 100 : 0,
    avgPrice: pq > 0 ? ps / pq : 0,
    lySales: ly,
  };
}

// ─── Formatters ───────────────────────────────────────────────────────────────

const fc  = (v: number) => v >= 1e6 ? `$${(v/1e6).toFixed(2)}M` : v >= 1e3 ? `$${(v/1e3).toFixed(1)}K` : `$${v.toFixed(0)}`;
const fq  = (v: number) => v.toLocaleString();
const fp  = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`;
const fpn = (v: number) => `${v.toFixed(1)}%`;
const fw  = (v: number) => v.toFixed(1);
const fpr = (v: number) => `$${v.toFixed(2)}`;

// ─── Column widths ────────────────────────────────────────────────────────────

const CW = { product: 240, qty: 100, price: 110, sales: 120, vsly: 90, mgp: 105, mgd: 115, stock: 100, cover: 85, md: 100 };
const TOTAL_W = Object.values(CW).reduce((a, b) => a + b, 0);

// ─── Design tokens ────────────────────────────────────────────────────────────

const BG_CAT   = dataTableColorsLight.bgHeader;     // #f5f6fa — category rows
const BG_SUB   = dataTableColorsLight.bgCellMedium; // #f7f8fc — subcategory rows
const BG_SKU   = dataTableColorsLight.bgCell;       // #ffffff — SKU rows
const BORDER   = dataTableColorsLight.borderColor;
const TEXT_D   = dataTableColorsLight.textDark;
const TEXT_M   = dataTableColorsLight.textMedium;
const TEXT_POS = themeColorsLight.colorSuccessText;
const TEXT_NEG = themeColorsLight.colorErrorText;

// ─── Aggregate row cells ──────────────────────────────────────────────────────

const AggrText: React.FC<{
  text: string; level: 1 | 2; expanded: boolean; width: number; onToggle: () => void;
}> = ({ text, level, expanded, width, onToggle }) => {
  const bg = level === 1 ? BG_CAT : BG_SUB;
  const indent = level === 2 ? 16 : 0;
  return (
    <div
      onClick={onToggle}
      style={{
        width, height: 32, display: 'flex', alignItems: 'center', gap: 6,
        paddingLeft: 8 + indent, paddingRight: 8,
        background: bg, border: `1px solid ${BORDER}`,
        boxSizing: 'border-box', flexShrink: 0, cursor: 'pointer', userSelect: 'none',
      }}
    >
      <FontAwesomeIcon
        icon={faChevronRight}
        style={{
          width: 9, height: 9, color: TEXT_M, flexShrink: 0,
          transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.15s ease',
        }}
      />
      <span style={{
        fontFamily, fontSize: fontSize.fontSize,
        fontWeight: level === 1 ? fontWeight.strong : fontWeight.medium,
        lineHeight: `${lineHeightPx.lineHeight}px`,
        color: TEXT_D, flex: 1,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0,
      }}>
        {text}
      </span>
    </div>
  );
};

const AggrNum: React.FC<{
  text: string; width: number; level: 1 | 2;
  sign?: 'auto' | 'none'; rawVal?: number;
}> = ({ text, width, level, sign = 'none', rawVal }) => {
  const bg = level === 1 ? BG_CAT : BG_SUB;
  const color = sign === 'auto' && rawVal !== undefined
    ? rawVal > 0 ? TEXT_POS : rawVal < 0 ? TEXT_NEG : TEXT_D
    : TEXT_D;
  return (
    <div style={{
      width, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      paddingLeft: 8, paddingRight: 8,
      background: bg, border: `1px solid ${BORDER}`,
      boxSizing: 'border-box', flexShrink: 0,
    }}>
      <span style={{
        fontFamily, fontSize: fontSize.fontSize,
        fontWeight: level === 1 ? fontWeight.medium : fontWeight.normal,
        lineHeight: `${lineHeightPx.lineHeight}px`,
        color, whiteSpace: 'nowrap',
      }}>
        {text}
      </span>
    </div>
  );
};

// ─── Editable numeric cell ────────────────────────────────────────────────────

interface EditableCellProps {
  rawValue: number; display: string; width: number;
  suffix?: string; min?: number; max?: number;
  onSave: (v: number) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({ rawValue, display, width, suffix = '', min = 0, max = Infinity, onSave }) => {
  const [editing, setEditing]     = useState(false);
  const [hovered, setHovered]     = useState(false);
  const [inputVal, setInputVal]   = useState('');
  const inputRef                  = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) inputRef.current?.select(); }, [editing]);

  const startEdit = () => { setInputVal(String(rawValue)); setEditing(true); };
  const commit    = () => {
    const n = parseFloat(inputVal);
    if (!isNaN(n)) onSave(Math.min(max, Math.max(min, n)));
    setEditing(false);
  };

  if (editing) {
    return (
      <div style={{
        width, height: 32, display: 'flex', alignItems: 'center', gap: 4,
        paddingLeft: 8, paddingRight: 8,
        background: dataTableColorsLight.accentLight,
        border: `2px solid ${dataTableColorsLight.accentColor}`,
        boxSizing: 'border-box', flexShrink: 0,
      }}>
        <input
          ref={inputRef} value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onBlur={commit}
          onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(false); }}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily, fontSize: fontSize.fontSize, fontWeight: fontWeight.medium,
            color: TEXT_D, textAlign: 'right', minWidth: 0,
          }}
        />
        {suffix && <span style={{ fontFamily, fontSize: fontSize.fontSizeXS, color: TEXT_M, flexShrink: 0 }}>{suffix}</span>}
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={startEdit}
      style={{
        width, height: 32, display: 'flex', alignItems: 'center', gap: 4,
        paddingLeft: 8, paddingRight: 8,
        background: hovered ? themeColorsLight.colorFillSecondary : BG_SKU,
        border: `1px solid ${hovered ? dataTableColorsLight.accentColor : BORDER}`,
        boxSizing: 'border-box', flexShrink: 0, cursor: 'text',
        transition: 'background 0.1s, border-color 0.1s',
      }}
    >
      {/* Edit icon — visible only on hover */}
      <div style={{ width: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {hovered && (
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke={TEXT_M} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
          </svg>
        )}
      </div>
      <span style={{
        flex: 1, fontFamily, fontSize: fontSize.fontSize, fontWeight: fontWeight.normal,
        lineHeight: `${lineHeightPx.lineHeight}px`,
        color: TEXT_D, textAlign: 'right', whiteSpace: 'nowrap', minWidth: 0,
      }}>
        {display}
      </span>
    </div>
  );
};

// ─── Read-only numeric cell ───────────────────────────────────────────────────

const ReadonlyCell: React.FC<{
  text: string; width: number; sign?: 'auto'; rawVal?: number; rowHovered?: boolean;
}> = ({ text, width, sign, rawVal, rowHovered }) => {
  const color = sign === 'auto' && rawVal !== undefined
    ? rawVal > 0 ? TEXT_POS : rawVal < 0 ? TEXT_NEG : TEXT_D
    : TEXT_D;
  return (
    <div style={{
      width, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      paddingLeft: 8, paddingRight: 8,
      background: rowHovered ? themeColorsLight.colorFillTertiary : BG_SKU,
      border: `1px solid ${BORDER}`,
      boxSizing: 'border-box', flexShrink: 0,
      transition: 'background 0.1s',
    }}>
      <span style={{ fontFamily, fontSize: fontSize.fontSize, fontWeight: fontWeight.normal, color, whiteSpace: 'nowrap' }}>
        {text}
      </span>
    </div>
  );
};

// ─── Grand total row cell ─────────────────────────────────────────────────────

const TotalTextCell: React.FC<{ text: string; width: number }> = ({ text, width }) => (
  <div style={{
    width, height: 36, display: 'flex', alignItems: 'center', gap: 8,
    paddingLeft: 8, paddingRight: 8,
    background: dataTableColorsLight.bgHeader,
    borderLeft: `3px solid ${dataTableColorsLight.accentColor}`,
    borderRight: `1px solid ${BORDER}`, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`,
    boxSizing: 'border-box', flexShrink: 0,
  }}>
    <span style={{
      fontFamily, fontSize: fontSize.fontSizeSM, fontWeight: fontWeight.strong,
      lineHeight: `${lineHeightPx.lineHeightSM}px`, color: TEXT_D, fontStyle: 'italic',
    }}>
      {text}
    </span>
  </div>
);

const TotalNumCell: React.FC<{ text: string; width: number; sign?: 'auto'; rawVal?: number }> = ({ text, width, sign, rawVal }) => {
  const color = sign === 'auto' && rawVal !== undefined
    ? rawVal > 0 ? TEXT_POS : rawVal < 0 ? TEXT_NEG : TEXT_D
    : TEXT_D;
  return (
    <div style={{
      width, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      paddingLeft: 8, paddingRight: 8,
      background: dataTableColorsLight.bgHeader,
      border: `1px solid ${BORDER}`,
      boxSizing: 'border-box', flexShrink: 0,
    }}>
      <span style={{
        fontFamily, fontSize: fontSize.fontSizeSM, fontWeight: fontWeight.strong,
        lineHeight: `${lineHeightPx.lineHeightSM}px`, color, fontStyle: 'italic', whiteSpace: 'nowrap',
      }}>
        {text}
      </span>
    </div>
  );
};

// ─── Toolbar button ───────────────────────────────────────────────────────────

const TBtn: React.FC<{ icon: React.ReactNode; label?: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, height: 28,
      padding: label ? '0 10px' : '0 8px',
      background: themeColorsLight.colorBgContainer,
      border: `1px solid ${themeColorsLight.colorBorder}`,
      borderRadius: borderRadius.borderRadius,
      cursor: 'pointer', fontFamily, fontSize: fontSize.fontSizeSM,
      color: themeColorsLight.colorText, whiteSpace: 'nowrap', flexShrink: 0, outline: 'none',
    }}
  >
    {icon}
    {label && <span>{label}</span>}
  </button>
);

const ico = (icon: Parameters<typeof FontAwesomeIcon>[0]['icon']) => (
  <FontAwesomeIcon icon={icon} style={{ fontSize: iconSize.iconSizeSM, width: iconSize.iconSizeSM }} />
);

// ─── Scenario tab ─────────────────────────────────────────────────────────────

const ScenarioTab: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', height: 40,
      paddingLeft: 16, paddingRight: 16, margin: 0,
      background: 'transparent', border: 'none',
      borderBottom: active ? `2px solid ${themeColorsLight.colorPrimary}` : '2px solid transparent',
      cursor: 'pointer', flexShrink: 0, outline: 'none',
    }}
  >
    <span style={{
      fontFamily, fontSize: fontSize.fontSize,
      fontWeight: active ? fontWeight.medium : fontWeight.normal,
      color: active ? themeColorsLight.colorPrimaryText : themeColorsLight.colorTextSecondary,
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  </button>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BottomUpPlanningPage() {
  const [skus, setSkus] = useState(() => {
    const m = new Map<string, SkuData>();
    INITIAL_SKUS.forEach(s => m.set(s.id, s));
    return m;
  });
  const [expandedCats,  setExpandedCats]  = useState(() => new Set(CATEGORIES.map(c => c.id)));
  const [expandedSubs,  setExpandedSubs]  = useState(() => new Set(SUBCATEGORIES.map(s => s.id)));
  const [activeScenario, setActiveScenario] = useState('base');
  const [hoveredRow,    setHoveredRow]    = useState<string | null>(null);

  const updateSku = (id: string, changes: Partial<SkuData>) =>
    setSkus(prev => { const m = new Map(prev); const s = m.get(id); if (s) m.set(id, { ...s, ...changes }); return m; });

  const toggleCat = (id: string) => setExpandedCats(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleSub = (id: string) => setExpandedSubs(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const allSkuIds = INITIAL_SKUS.map(s => s.id);
  const grand = aggFromSkus(allSkuIds, skus);

  // ── Build visible rows
  type Row =
    | { kind: 'category';    cat: typeof CATEGORIES[number]; agg: Agg }
    | { kind: 'subcategory'; sub: typeof SUBCATEGORIES[number]; agg: Agg }
    | { kind: 'sku'; sku: SkuData };

  const rows: Row[] = [];
  for (const cat of CATEGORIES) {
    const catSkuIds = SUBCATEGORIES.filter(s => s.parentId === cat.id).flatMap(s => s.children);
    rows.push({ kind: 'category', cat, agg: aggFromSkus(catSkuIds, skus) });
    if (!expandedCats.has(cat.id)) continue;
    for (const subId of cat.children) {
      const sub = SUBCATEGORIES.find(s => s.id === subId)!;
      rows.push({ kind: 'subcategory', sub, agg: aggFromSkus(sub.children, skus) });
      if (!expandedSubs.has(sub.id)) continue;
      for (const skuId of sub.children) rows.push({ kind: 'sku', sku: skus.get(skuId)! });
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: themeColorsLight.colorBgLayout }}>

      {/* ── Page header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
        background: themeColorsLight.colorBgContainer,
        borderBottom: `1px solid ${themeColorsLight.colorBorderSecondary}`,
        flexShrink: 0, minHeight: 52,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily, fontSize: fontSize.fontSizeHeading4, fontWeight: fontWeight.strong,
            lineHeight: `${lineHeightPx.lineHeightHeading4}px`, color: themeColorsLight.colorText,
          }}>
            Bottom-up Planning
          </span>
          <span style={{
            fontFamily, fontSize: fontSize.fontSizeSM, fontWeight: fontWeight.medium,
            color: themeColorsLight.colorPrimaryText,
            background: themeColorsLight.colorPrimaryBg,
            padding: '2px 8px', borderRadius: 100,
          }}>
            SS 2025
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px',
              background: themeColorsLight.colorBgContainer,
              border: `1px solid ${themeColorsLight.colorBorder}`,
              borderRadius: borderRadius.borderRadius,
              cursor: 'pointer', fontFamily, fontSize: fontSize.fontSize, color: themeColorsLight.colorText,
            }}
          >
            <FontAwesomeIcon icon={faRotateLeft} style={{ width: 13, height: 13 }} />
            Discard Changes
          </button>
          <button
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 14px',
              background: themeColorsLight.colorPrimary, border: 'none',
              borderRadius: borderRadius.borderRadius,
              cursor: 'pointer', fontFamily, fontSize: fontSize.fontSize, fontWeight: fontWeight.medium,
              color: themeColorsLight.colorTextLightSolid,
            }}
          >
            <FontAwesomeIcon icon={faSave} style={{ width: 13, height: 13 }} />
            Save Plan
          </button>
        </div>
      </div>

      {/* ── Scenario tabs ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        paddingLeft: 20, paddingRight: 20,
        background: themeColorsLight.colorBgContainer,
        borderBottom: `1px solid ${themeColorsLight.colorBorderSecondary}`,
        flexShrink: 0,
      }}>
        {[
          { key: 'base',         label: 'Base Plan'     },
          { key: 'optimistic',   label: 'Optimistic'    },
          { key: 'conservative', label: 'Conservative'  },
        ].map(s => (
          <ScenarioTab key={s.key} label={s.label} active={activeScenario === s.key} onClick={() => setActiveScenario(s.key)} />
        ))}
      </div>

      {/* ── Filters + KPIs ── */}
      <div style={{ padding: '12px 20px', flexShrink: 0 }}>
        <FilterBar
          type="Regular Filters"
          filterItems={[
            { label: 'SS 2025 / Spring', required: true },
            { label: 'All Channels' },
            { label: 'All Departments' },
          ]}
          filterCount={false} showWarning={false} showCta
        />

        {/* KPI row — flex stretch */}
        {(() => {
          type KpiState = 'default' | 'positive' | 'negative';
          const kpis: { title: string; value: string; diff?: string; state: KpiState; desc: string; icon: React.ReactNode; noDiff?: boolean }[] = [
            {
              title: 'Total Plan Sales', value: fc(grand.planSales),
              diff: fpn(Math.abs(grand.vsLYPct)),
              state: grand.vsLYPct >= 0 ? 'positive' : 'negative',
              desc: 'vs Last Year', icon: <FontAwesomeIcon icon={faDollarSign} />,
            },
            {
              title: 'Plan vs LY%', value: `${grand.vsLYPct >= 0 ? '+' : ''}${fpn(grand.vsLYPct)}`,
              state: grand.vsLYPct >= 0 ? 'positive' : 'negative',
              desc: 'Sales growth vs last year', icon: <FontAwesomeIcon icon={faChartLine} />, noDiff: true,
            },
            {
              title: 'Plan Margin%', value: fpn(grand.planMarginPct),
              state: (grand.planMarginPct >= 55 ? 'positive' : grand.planMarginPct >= 45 ? 'default' : 'negative') as KpiState,
              desc: 'Blended gross margin', icon: <FontAwesomeIcon icon={faPercent} />, noDiff: true,
            },
            {
              title: 'Total Stock Units', value: fq(grand.stockUnits),
              state: 'default' as KpiState,
              desc: 'Opening stock position', icon: <FontAwesomeIcon icon={faBoxOpen} />, noDiff: true,
            },
          ];
          return (
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              {kpis.map((kpi, i) => (
                <div key={i} style={{ flex: 1, minWidth: 0 }}>
                  <KpiCard
                    title={kpi.title} value={kpi.value}
                    diff={!kpi.noDiff ? kpi.diff : undefined}
                    state={kpi.state} description={kpi.desc} icon={kpi.icon}
                    container="simple" size="large"
                    showDiff={!kpi.noDiff} showTitleIcon={false}
                  />
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* ── Toolbar + Table ── */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '0 20px 20px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {/* Compact toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingBottom: 8, flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <TBtn icon={ico(faLayerGroup)} label="Aggregation" />
            <TBtn icon={ico(faTableColumns)} label="Columns" />
            <TBtn icon={ico(faSliders)} label="Display" />
            <div style={{
              display: 'inline-flex', gap: 1, height: 28,
              border: `1px solid ${themeColorsLight.colorBorder}`,
              borderRadius: borderRadius.borderRadius, overflow: 'hidden',
              background: themeColorsLight.colorBorder, flexShrink: 0,
            }}>
              {[
                { icon: ico(faDownload), title: 'Export' },
                { icon: ico(faUpload),  title: 'Import' },
              ].map(({ icon, title }) => (
                <button key={title} type="button" title={title} style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28, padding: 0,
                  background: themeColorsLight.colorBgContainer, border: 'none', cursor: 'pointer',
                  color: themeColorsLight.colorText, outline: 'none',
                }}>
                  {icon}
                </button>
              ))}
            </div>
            <div style={{
              display: 'inline-flex', gap: 1, height: 28,
              border: `1px solid ${themeColorsLight.colorBorder}`,
              borderRadius: borderRadius.borderRadius, overflow: 'hidden',
              background: themeColorsLight.colorBorder, flexShrink: 0,
            }}>
              {[
                { icon: ico(faArrowRotateLeft), title: 'Reset'  },
                { icon: ico(faArrowRotateLeft), title: 'Undo'   },
                { icon: ico(faRotateRight),     title: 'Redo'   },
              ].map(({ icon, title }) => (
                <button key={title} type="button" title={title} style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28, padding: 0,
                  background: themeColorsLight.colorBgContainer, border: 'none', cursor: 'pointer',
                  color: themeColorsLight.colorText, outline: 'none',
                }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 4 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', height: 28,
              paddingLeft: 10, paddingRight: 10,
              fontFamily, fontSize: fontSize.fontSizeSM,
              color: themeColorsLight.colorTextSecondary,
            }}>
              {fq(allSkuIds.length)} SKUs · {fq(CATEGORIES.length)} categories
            </span>
          </div>
        </div>

        {/* Table */}
        <div style={{
          flex: 1, overflow: 'auto',
          border: `1px solid ${BORDER}`,
          borderRadius: borderRadius.borderRadius,
          minWidth: 0, minHeight: 0,
        }}>
          <div style={{ minWidth: TOTAL_W, width: 'max-content' }}>

            {/* Header */}
            <div style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 3 }}>
              <div style={{ position: 'sticky', left: 0, zIndex: 4 }}>
                <DataSheetTitle cellText="Product"        type="Default" showFilter={false} width={CW.product} />
              </div>
              <DataSheetTitle cellText="Plan Qty"         type="Default" showFilter={false} width={CW.qty} />
              <DataSheetTitle cellText="Plan Price ($)"   type="Default" showFilter={false} width={CW.price} />
              <DataSheetTitle cellText="Plan Sales ($)"   type="Default" showFilter={false} width={CW.sales} />
              <DataSheetTitle cellText="vs LY%"           type="Default" showFilter={false} width={CW.vsly} />
              <DataSheetTitle cellText="Plan Margin%"     type="Default" showFilter={false} width={CW.mgp} />
              <DataSheetTitle cellText="Plan Margin ($)"  type="Default" showFilter={false} width={CW.mgd} />
              <DataSheetTitle cellText="Stock Units"      type="Default" showFilter={false} width={CW.stock} />
              <DataSheetTitle cellText="Cover (wks)"      type="Default" showFilter={false} width={CW.cover} />
              <DataSheetTitle cellText="Markdown%"        type="Default" showFilter={false} width={CW.md} />
            </div>

            {/* Grand Total */}
            <div style={{ display: 'flex', position: 'sticky', top: 36, zIndex: 2 }}>
              <div style={{ position: 'sticky', left: 0, zIndex: 3 }}>
                <TotalTextCell text="Grand Total" width={CW.product} />
              </div>
              <TotalNumCell text={fq(grand.planQty)}                                          width={CW.qty} />
              <TotalNumCell text={fpr(grand.avgPrice)}                                        width={CW.price} />
              <TotalNumCell text={fc(grand.planSales)}                                        width={CW.sales} />
              <TotalNumCell text={fp(grand.vsLYPct)} sign="auto" rawVal={grand.vsLYPct}       width={CW.vsly} />
              <TotalNumCell text={fpn(grand.planMarginPct)}                                   width={CW.mgp} />
              <TotalNumCell text={fc(grand.planMarginDollar)}                                 width={CW.mgd} />
              <TotalNumCell text={fq(grand.stockUnits)}                                       width={CW.stock} />
              <TotalNumCell text={fw(grand.coverWks)}                                         width={CW.cover} />
              <TotalNumCell text="—"                                                           width={CW.md} />
            </div>

            {/* Data rows */}
            {rows.map(row => {
              if (row.kind === 'category') {
                const { cat, agg } = row;
                return (
                  <div key={cat.id} style={{ display: 'flex' }}>
                    <div style={{ position: 'sticky', left: 0, zIndex: 1 }}>
                      <AggrText text={cat.name} level={1} expanded={expandedCats.has(cat.id)} width={CW.product} onToggle={() => toggleCat(cat.id)} />
                    </div>
                    <AggrNum text={fq(agg.planQty)}                                        width={CW.qty}   level={1} />
                    <AggrNum text={fpr(agg.avgPrice)}                                      width={CW.price} level={1} />
                    <AggrNum text={fc(agg.planSales)}                                      width={CW.sales} level={1} />
                    <AggrNum text={fp(agg.vsLYPct)} sign="auto" rawVal={agg.vsLYPct}       width={CW.vsly}  level={1} />
                    <AggrNum text={fpn(agg.planMarginPct)}                                 width={CW.mgp}   level={1} />
                    <AggrNum text={fc(agg.planMarginDollar)}                               width={CW.mgd}   level={1} />
                    <AggrNum text={fq(agg.stockUnits)}                                     width={CW.stock} level={1} />
                    <AggrNum text={fw(agg.coverWks)}                                       width={CW.cover} level={1} />
                    <AggrNum text="—"                                                       width={CW.md}    level={1} />
                  </div>
                );
              }

              if (row.kind === 'subcategory') {
                const { sub, agg } = row;
                return (
                  <div key={sub.id} style={{ display: 'flex' }}>
                    <div style={{ position: 'sticky', left: 0, zIndex: 1 }}>
                      <AggrText text={sub.name} level={2} expanded={expandedSubs.has(sub.id)} width={CW.product} onToggle={() => toggleSub(sub.id)} />
                    </div>
                    <AggrNum text={fq(agg.planQty)}                                        width={CW.qty}   level={2} />
                    <AggrNum text={fpr(agg.avgPrice)}                                      width={CW.price} level={2} />
                    <AggrNum text={fc(agg.planSales)}                                      width={CW.sales} level={2} />
                    <AggrNum text={fp(agg.vsLYPct)} sign="auto" rawVal={agg.vsLYPct}       width={CW.vsly}  level={2} />
                    <AggrNum text={fpn(agg.planMarginPct)}                                 width={CW.mgp}   level={2} />
                    <AggrNum text={fc(agg.planMarginDollar)}                               width={CW.mgd}   level={2} />
                    <AggrNum text={fq(agg.stockUnits)}                                     width={CW.stock} level={2} />
                    <AggrNum text={fw(agg.coverWks)}                                       width={CW.cover} level={2} />
                    <AggrNum text="—"                                                       width={CW.md}    level={2} />
                  </div>
                );
              }

              // SKU row
              const { sku } = row;
              const sales = sku.planQty * sku.planPrice;
              const margin$ = sales * sku.planMarginPct / 100;
              const vsly = sku.lySales > 0 ? (sales - sku.lySales) / sku.lySales * 100 : 0;
              const cover = sku.planQty > 0 ? sku.stockUnits / (sku.planQty / 13) : 0;
              const isHovered = hoveredRow === sku.id;

              return (
                <div
                  key={sku.id}
                  style={{ display: 'flex' }}
                  onMouseEnter={() => setHoveredRow(sku.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div style={{ position: 'sticky', left: 0, zIndex: 1 }}>
                    <DataSheetTextCell
                      cellText={sku.name}
                      type="None Editable"
                      level="Level 3"
                      width={CW.product}
                    />
                  </div>
                  <EditableCell rawValue={sku.planQty}    display={fq(sku.planQty)}       width={CW.qty}   min={0}   onSave={v => updateSku(sku.id, { planQty: Math.round(v) })} />
                  <EditableCell rawValue={sku.planPrice}  display={fpr(sku.planPrice)}     width={CW.price} min={0}   onSave={v => updateSku(sku.id, { planPrice: v })} />
                  <ReadonlyCell text={fc(sales)}                                           width={CW.sales}            rowHovered={isHovered} />
                  <ReadonlyCell text={fp(vsly)}           sign="auto" rawVal={vsly}        width={CW.vsly}             rowHovered={isHovered} />
                  <EditableCell rawValue={sku.planMarginPct} display={fpn(sku.planMarginPct)} width={CW.mgp} min={0} max={100} suffix="%" onSave={v => updateSku(sku.id, { planMarginPct: v })} />
                  <ReadonlyCell text={fc(margin$)}                                         width={CW.mgd}              rowHovered={isHovered} />
                  <EditableCell rawValue={sku.stockUnits} display={fq(sku.stockUnits)}     width={CW.stock} min={0}   onSave={v => updateSku(sku.id, { stockUnits: Math.round(v) })} />
                  <ReadonlyCell text={fw(cover)}                                           width={CW.cover}            rowHovered={isHovered} />
                  <EditableCell rawValue={sku.markdownPct} display={fpn(sku.markdownPct)} width={CW.md}    min={0} max={100} suffix="%" onSave={v => updateSku(sku.id, { markdownPct: v })} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
