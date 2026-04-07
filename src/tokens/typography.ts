// Auto-generated from Figma typography tokens
// Source: typography-export.json — 3-Typography collection

// ─── Font Family ─────────────────────────────────────────────────────────────

export const fontFamily = 'Inter, sans-serif' as const;

// ─── Font Weight ─────────────────────────────────────────────────────────────

export const fontWeight = {
  normal: 400,       // Regular
  medium: 500,       // Medium
  semiStrong: 600,   // Semi Bold
  strong: 700,       // Bold
} as const;

// ─── Font Size (px) ──────────────────────────────────────────────────────────

export const fontSize = {
  fontSizeXS: 11,
  fontSizeSM: 12,
  fontSize: 13,
  fontSizeLG: 14,
  fontSizeXL: 15,
  fontSizeHeading1: 24,
  fontSizeHeading2: 20,
  fontSizeHeading3: 18,
  fontSizeHeading4: 16,
  fontSizeHeading5: 14,
} as const;

// ─── Line Height (px) ────────────────────────────────────────────────────────

export const lineHeightPx = {
  lineHeightXS: 14,
  lineHeightSM: 16,
  lineHeight: 18,
  lineHeightLG: 20,
  lineHeightXL: 22,
  lineHeightHeading1: 32,
  lineHeightHeading2: 28,
  lineHeightHeading3: 24,
  lineHeightHeading4: 22,
  lineHeightHeading5: 20,
} as const;

// ─── Line Height Ratios (for Ant Design ThemeConfig) ─────────────────────────
// Ant Design expects unitless ratios: lineHeight = lineHeightPx / fontSize

export const lineHeightRatio = {
  lineHeight:         lineHeightPx.lineHeight         / fontSize.fontSize,          // 18/13 ≈ 1.385
  lineHeightSM:       lineHeightPx.lineHeightSM       / fontSize.fontSizeSM,        // 16/12 ≈ 1.333
  lineHeightLG:       lineHeightPx.lineHeightLG       / fontSize.fontSizeLG,        // 20/14 ≈ 1.429
  lineHeightHeading1: lineHeightPx.lineHeightHeading1 / fontSize.fontSizeHeading1,  // 32/24 ≈ 1.333
  lineHeightHeading2: lineHeightPx.lineHeightHeading2 / fontSize.fontSizeHeading2,  // 28/20 = 1.4
  lineHeightHeading3: lineHeightPx.lineHeightHeading3 / fontSize.fontSizeHeading3,  // 24/18 ≈ 1.333
  lineHeightHeading4: lineHeightPx.lineHeightHeading4 / fontSize.fontSizeHeading4,  // 22/16 = 1.375
  lineHeightHeading5: lineHeightPx.lineHeightHeading5 / fontSize.fontSizeHeading5,  // 20/14 ≈ 1.429
} as const;

// ─── Composite text styles ────────────────────────────────────────────────────
// Ready-to-use React CSSProperties objects for common text roles

export const textStyles = {
  xs: {
    fontFamily,
    fontSize: fontSize.fontSizeXS,
    lineHeight: `${lineHeightPx.lineHeightXS}px`,
    fontWeight: fontWeight.normal,
  },
  sm: {
    fontFamily,
    fontSize: fontSize.fontSizeSM,
    lineHeight: `${lineHeightPx.lineHeightSM}px`,
    fontWeight: fontWeight.normal,
  },
  base: {
    fontFamily,
    fontSize: fontSize.fontSize,
    lineHeight: `${lineHeightPx.lineHeight}px`,
    fontWeight: fontWeight.normal,
  },
  baseMedium: {
    fontFamily,
    fontSize: fontSize.fontSize,
    lineHeight: `${lineHeightPx.lineHeight}px`,
    fontWeight: fontWeight.medium,
  },
  lg: {
    fontFamily,
    fontSize: fontSize.fontSizeLG,
    lineHeight: `${lineHeightPx.lineHeightLG}px`,
    fontWeight: fontWeight.normal,
  },
  xl: {
    fontFamily,
    fontSize: fontSize.fontSizeXL,
    lineHeight: `${lineHeightPx.lineHeightXL}px`,
    fontWeight: fontWeight.normal,
  },
  heading1: {
    fontFamily,
    fontSize: fontSize.fontSizeHeading1,
    lineHeight: `${lineHeightPx.lineHeightHeading1}px`,
    fontWeight: fontWeight.strong,
  },
  heading2: {
    fontFamily,
    fontSize: fontSize.fontSizeHeading2,
    lineHeight: `${lineHeightPx.lineHeightHeading2}px`,
    fontWeight: fontWeight.strong,
  },
  heading3: {
    fontFamily,
    fontSize: fontSize.fontSizeHeading3,
    lineHeight: `${lineHeightPx.lineHeightHeading3}px`,
    fontWeight: fontWeight.strong,
  },
  heading4: {
    fontFamily,
    fontSize: fontSize.fontSizeHeading4,
    lineHeight: `${lineHeightPx.lineHeightHeading4}px`,
    fontWeight: fontWeight.strong,
  },
  heading5: {
    fontFamily,
    fontSize: fontSize.fontSizeHeading5,
    lineHeight: `${lineHeightPx.lineHeightHeading5}px`,
    fontWeight: fontWeight.semiStrong,
  },
} as const;
