// ─── Icon Tokens ──────────────────────────────────────────────────────────────
// Source: Figma → 4-Icon collection

/** Font family — Font Awesome 7 Pro (Pro kit required for full icon set) */
export const iconFontFamily = 'Font Awesome 7 Pro' as const;

/** Icon sizes in px */
export const iconSize = {
  /** 12px */
  iconSizeXS:  12,
  /** 13px */
  iconSizeSM:  13,
  /** 14px — default */
  iconSize:    14,
  /** 15px */
  iconSizeLG:  15,
  /** 16px */
  iconSizeXL:  16,
  /** 18px */
  iconSizeXXL: 18,
} as const;

/** Icon weight styles */
export const iconWeight = {
  Regular: 'Regular',
  Solid:   'Solid',
} as const;
