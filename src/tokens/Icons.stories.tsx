import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // UI / actions
  faCircleInfo, faTriangleExclamation, faGear, faEdit, faChevronDown,
  faLock, faBolt, faFilter, faArrowUp, faArrowDown, faArrowRight,
  faArrowTrendUp, faCheck, faXmark, faEllipsis, faSearch, faPlus,
  faMinus, faTrash, faCopy, faSave, faDownload, faUpload,
  // KPI / business
  faTruck, faCartShopping, faDollarSign, faChartLine, faChartBar,
  faUsers, faBuilding, faCalendar, faClock, faStar,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCircleCheck, faEdit as faEditRegular,
} from '@fortawesome/free-regular-svg-icons';
import { iconSize, iconWeight } from './icons';
import { fontFamily } from './typography';
import { themeColorsLight } from './colors';

const meta: Meta = {
  title: 'Design Tokens/Icons',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Icon tokens from the Figma **4-Icon** collection. Font family: **Font Awesome 7 Pro**.',
          '',
          '**Free tier** (solid + regular) is used in this project. Pro kit unlocks Light, Thin, and Duotone weights.',
          '',
          '> To upgrade to Pro: configure your `@fortawesome` npm registry token in `.npmrc`, then install',
          '> `@fortawesome/pro-solid-svg-icons`, `@fortawesome/pro-regular-svg-icons`, etc.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sectionTitle = (text: string) => (
  <h3 style={{ fontFamily, fontSize: 11, fontWeight: 600, color: '#8d8f99', textTransform: 'uppercase' as const, letterSpacing: '0.06em', margin: '24px 0 12px' }}>
    {text}
  </h3>
);

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Icon Sizes',
  render: () => (
    <div>
      {sectionTitle('Icon Sizes')}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-end' }}>
        {(Object.entries(iconSize) as [string, number][]).map(([name, size]) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <FontAwesomeIcon
              icon={faCircleInfo}
              style={{ fontSize: size, color: themeColorsLight.colorPrimary, width: size }}
            />
            <div style={{ fontFamily, fontSize: 11, textAlign: 'center' }}>
              <div style={{ fontWeight: 600, color: '#3d3f4a' }}>{name}</div>
              <div style={{ color: '#a6a8b2' }}>{size}px</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Weights ──────────────────────────────────────────────────────────────────

export const Weights: Story = {
  name: 'Icon Weights',
  render: () => (
    <div>
      {sectionTitle('Icon Weights (Free Tier)')}
      <div style={{ display: 'flex', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <FontAwesomeIcon icon={faEditRegular} style={{ fontSize: iconSize.iconSizeXXL, color: themeColorsLight.colorPrimary, width: iconSize.iconSizeXXL }} />
          <div style={{ fontFamily, fontSize: 11, textAlign: 'center' }}>
            <div style={{ fontWeight: 600, color: '#3d3f4a' }}>Regular</div>
            <div style={{ color: '#a6a8b2' }}>{iconWeight.Regular}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <FontAwesomeIcon icon={faEdit} style={{ fontSize: iconSize.iconSizeXXL, color: themeColorsLight.colorPrimary, width: iconSize.iconSizeXXL }} />
          <div style={{ fontFamily, fontSize: 11, textAlign: 'center' }}>
            <div style={{ fontWeight: 600, color: '#3d3f4a' }}>Solid</div>
            <div style={{ color: '#a6a8b2' }}>{iconWeight.Solid}</div>
          </div>
        </div>
      </div>
      <p style={{ fontFamily, fontSize: 12, color: '#8d8f99', marginTop: 16 }}>
        Pro kit adds: Light (300), Thin (100), Duotone — available with @fortawesome Pro subscription.
      </p>
    </div>
  ),
};

// ─── Icon Gallery ─────────────────────────────────────────────────────────────

type IconEntry = { name: string; icon: Parameters<typeof FontAwesomeIcon>[0]['icon'] };

const UI_ICONS: IconEntry[] = [
  { name: 'circle-info',         icon: faCircleInfo },
  { name: 'triangle-exclamation',icon: faTriangleExclamation },
  { name: 'gear',                icon: faGear },
  { name: 'edit (solid)',        icon: faEdit },
  { name: 'edit (regular)',      icon: faEditRegular },
  { name: 'chevron-down',        icon: faChevronDown },
  { name: 'lock',                icon: faLock },
  { name: 'bolt',                icon: faBolt },
  { name: 'filter',              icon: faFilter },
  { name: 'arrow-up',            icon: faArrowUp },
  { name: 'arrow-down',          icon: faArrowDown },
  { name: 'arrow-right',         icon: faArrowRight },
  { name: 'arrow-trend-up',      icon: faArrowTrendUp },
  { name: 'check',               icon: faCheck },
  { name: 'circle-check',        icon: faCircleCheck },
  { name: 'xmark',               icon: faXmark },
  { name: 'ellipsis',            icon: faEllipsis },
  { name: 'search',              icon: faSearch },
  { name: 'plus',                icon: faPlus },
  { name: 'minus',               icon: faMinus },
  { name: 'trash',               icon: faTrash },
  { name: 'copy',                icon: faCopy },
  { name: 'save',                icon: faSave },
  { name: 'download',            icon: faDownload },
  { name: 'upload',              icon: faUpload },
];

const BUSINESS_ICONS: IconEntry[] = [
  { name: 'truck',         icon: faTruck },
  { name: 'cart-shopping', icon: faCartShopping },
  { name: 'dollar-sign',   icon: faDollarSign },
  { name: 'chart-line',    icon: faChartLine },
  { name: 'chart-bar',     icon: faChartBar },
  { name: 'users',         icon: faUsers },
  { name: 'building',      icon: faBuilding },
  { name: 'calendar',      icon: faCalendar },
  { name: 'clock',         icon: faClock },
  { name: 'star',          icon: faStar },
];

const IconGrid = ({ icons }: { icons: IconEntry[] }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
    {icons.map(({ name, icon }) => (
      <div
        key={name}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          padding: '12px 8px',
          width: 100,
          border: `1px solid ${themeColorsLight.colorBorderSecondary}`,
          borderRadius: 6,
          background: '#fff',
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          style={{ fontSize: iconSize.iconSizeXL, color: themeColorsLight.colorText, width: iconSize.iconSizeXL }}
        />
        <span style={{ fontFamily, fontSize: 10, color: '#8d8f99', textAlign: 'center', lineHeight: '14px', wordBreak: 'break-word' as const }}>
          {name}
        </span>
      </div>
    ))}
  </div>
);

export const UIIcons: Story = {
  name: 'UI Icons',
  render: () => (
    <div>
      {sectionTitle('UI & Action Icons')}
      <IconGrid icons={UI_ICONS} />
    </div>
  ),
};

export const BusinessIcons: Story = {
  name: 'Business Icons',
  render: () => (
    <div>
      {sectionTitle('Business Icons')}
      <IconGrid icons={BUSINESS_ICONS} />
    </div>
  ),
};

// ─── Color contexts ───────────────────────────────────────────────────────────

export const ColorContexts: Story = {
  name: 'Color Contexts',
  render: () => (
    <div>
      {sectionTitle('Icons in color contexts')}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {[
          { label: 'Primary',   color: themeColorsLight.colorPrimary },
          { label: 'Success',   color: themeColorsLight.colorSuccessText },
          { label: 'Warning',   color: themeColorsLight.colorWarningText },
          { label: 'Error',     color: themeColorsLight.colorErrorText },
          { label: 'Text',      color: themeColorsLight.colorText },
          { label: 'Secondary', color: themeColorsLight.colorTextSecondary },
          { label: 'Tertiary',  color: themeColorsLight.colorTextTertiary },
        ].map(({ label, color }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <FontAwesomeIcon icon={faCircleInfo} style={{ fontSize: iconSize.iconSizeXL, color, width: iconSize.iconSizeXL }} />
            <span style={{ fontFamily, fontSize: 11, color: '#8d8f99' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Token reference table ────────────────────────────────────────────────────

export const TokenTable: Story = {
  name: 'Token Reference',
  render: () => (
    <div>
      {sectionTitle('Icon Size Tokens')}
      <table style={{ fontFamily, fontSize: 13, borderCollapse: 'collapse', width: '100%', maxWidth: 480 }}>
        <thead>
          <tr style={{ background: '#f5f5f7' }}>
            {['Token', 'Value', 'Preview'].map((h) => (
              <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: '#3d3f4a', borderBottom: `1px solid ${themeColorsLight.colorBorder}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(Object.entries(iconSize) as [string, number][]).map(([name, size], i) => (
            <tr key={name} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ padding: '8px 12px', color: themeColorsLight.colorPrimary, fontWeight: 500 }}>{name}</td>
              <td style={{ padding: '8px 12px', color: '#3d3f4a' }}>{size}px</td>
              <td style={{ padding: '8px 12px' }}>
                <FontAwesomeIcon icon={faBolt} style={{ fontSize: size, color: themeColorsLight.colorPrimary, width: size }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sectionTitle('Icon Weight Tokens')}
      <table style={{ fontFamily, fontSize: 13, borderCollapse: 'collapse', width: '100%', maxWidth: 480 }}>
        <thead>
          <tr style={{ background: '#f5f5f7' }}>
            {['Token', 'Value', 'FA Weight'].map((h) => (
              <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: '#3d3f4a', borderBottom: `1px solid ${themeColorsLight.colorBorder}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(Object.entries(iconWeight) as [string, string][]).map(([name, value], i) => (
            <tr key={name} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ padding: '8px 12px', color: themeColorsLight.colorPrimary, fontWeight: 500 }}>{name}</td>
              <td style={{ padding: '8px 12px', color: '#3d3f4a' }}>{value}</td>
              <td style={{ padding: '8px 12px', color: '#8d8f99', fontSize: 12 }}>
                {name === 'Regular' ? 'free-regular-svg-icons' : 'free-solid-svg-icons'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
