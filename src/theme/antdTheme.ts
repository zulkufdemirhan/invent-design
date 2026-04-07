import type { ThemeConfig } from 'antd';
import { themeColorsLight, themeColorsDark } from '@/tokens/colors';
import { fontFamily, fontSize, lineHeightRatio } from '@/tokens/typography';

// ─── Shared typography tokens ─────────────────────────────────────────────────

const typographyTokens = {
  fontFamily,
  fontSize:              fontSize.fontSize,
  fontSizeSM:            fontSize.fontSizeSM,
  fontSizeLG:            fontSize.fontSizeLG,
  fontSizeXL:            fontSize.fontSizeXL,
  fontSizeHeading1:      fontSize.fontSizeHeading1,
  fontSizeHeading2:      fontSize.fontSizeHeading2,
  fontSizeHeading3:      fontSize.fontSizeHeading3,
  fontSizeHeading4:      fontSize.fontSizeHeading4,
  fontSizeHeading5:      fontSize.fontSizeHeading5,
  lineHeight:            lineHeightRatio.lineHeight,
  lineHeightSM:          lineHeightRatio.lineHeightSM,
  lineHeightLG:          lineHeightRatio.lineHeightLG,
  lineHeightHeading1:    lineHeightRatio.lineHeightHeading1,
  lineHeightHeading2:    lineHeightRatio.lineHeightHeading2,
  lineHeightHeading3:    lineHeightRatio.lineHeightHeading3,
  lineHeightHeading4:    lineHeightRatio.lineHeightHeading4,
  lineHeightHeading5:    lineHeightRatio.lineHeightHeading5,
};

// ─── Light Theme ──────────────────────────────────────────────────────────────

export const lightTheme: ThemeConfig = {
  token: {
    ...typographyTokens,
    // Primary
    colorPrimary:            themeColorsLight.colorPrimary,
    colorPrimaryBg:          themeColorsLight.colorPrimaryBg,
    colorPrimaryBgHover:     themeColorsLight.colorPrimaryBgHover,
    colorPrimaryBorder:      themeColorsLight.colorPrimaryBorder,
    colorPrimaryBorderHover: themeColorsLight.colorPrimaryBorderHover,
    colorPrimaryHover:       themeColorsLight.colorPrimaryHover,
    colorPrimaryActive:      themeColorsLight.colorPrimaryActive,
    colorPrimaryText:        themeColorsLight.colorPrimaryText,
    colorPrimaryTextHover:   themeColorsLight.colorPrimaryTextHover,
    colorPrimaryTextActive:  themeColorsLight.colorPrimaryTextActive,
    // Success
    colorSuccess:            themeColorsLight.colorSuccess,
    colorSuccessBg:          themeColorsLight.colorSuccessBg,
    colorSuccessBorder:      themeColorsLight.colorSuccessBorder,
    colorSuccessHover:       themeColorsLight.colorSuccessHover,
    colorSuccessActive:      themeColorsLight.colorSuccessActive,
    colorSuccessText:        themeColorsLight.colorSuccessText,
    colorSuccessTextHover:   themeColorsLight.colorSuccessTextHover,
    colorSuccessTextActive:  themeColorsLight.colorSuccessTextActive,
    // Warning
    colorWarning:            themeColorsLight.colorWarning,
    colorWarningBg:          themeColorsLight.colorWarningBg,
    colorWarningBorder:      themeColorsLight.colorWarningBorder,
    colorWarningHover:       themeColorsLight.colorWarningHover,
    colorWarningActive:      themeColorsLight.colorWarningActive,
    colorWarningText:        themeColorsLight.colorWarningText,
    colorWarningTextHover:   themeColorsLight.colorWarningTextHover,
    colorWarningTextActive:  themeColorsLight.colorWarningTextActive,
    // Error
    colorError:              themeColorsLight.colorError,
    colorErrorBg:            themeColorsLight.colorErrorBg,
    colorErrorBorder:        themeColorsLight.colorErrorBorder,
    colorErrorHover:         themeColorsLight.colorErrorHover,
    colorErrorActive:        themeColorsLight.colorErrorActive,
    colorErrorText:          themeColorsLight.colorErrorText,
    colorErrorTextHover:     themeColorsLight.colorErrorTextHover,
    colorErrorTextActive:    themeColorsLight.colorErrorTextActive,
    // Info
    colorInfo:               themeColorsLight.colorInfo,
    // Text
    colorText:               themeColorsLight.colorText,
    colorTextSecondary:      themeColorsLight.colorTextSecondary,
    colorTextTertiary:       themeColorsLight.colorTextTertiary,
    colorTextQuaternary:     themeColorsLight.colorTextQuaternary,
    // Border
    colorBorder:             themeColorsLight.colorBorder,
    colorBorderSecondary:    themeColorsLight.colorBorderSecondary,
    // Fill
    colorFill:               themeColorsLight.colorFill,
    colorFillSecondary:      themeColorsLight.colorFillSecondary,
    colorFillTertiary:       themeColorsLight.colorFillTertiary,
    colorFillQuaternary:     themeColorsLight.colorFillQuaternary,
    // Background
    colorBgBase:             themeColorsLight.colorBgBase,
    colorBgLayout:           themeColorsLight.colorBgLayout,
    colorBgContainer:        themeColorsLight.colorBgContainer,
    colorBgElevated:         themeColorsLight.colorBgElevated,
    colorBgMask:             themeColorsLight.colorBgMask,
    // Link
    colorLink:               themeColorsLight.colorLink,
    colorLinkHover:          themeColorsLight.colorLinkHover,
    colorLinkActive:         themeColorsLight.colorLinkActive,
  },
};

// ─── Dark Theme ───────────────────────────────────────────────────────────────

export const darkTheme: ThemeConfig = {
  token: {
    ...typographyTokens,
    // Primary
    colorPrimary:            themeColorsDark.colorPrimary,
    colorPrimaryBg:          themeColorsDark.colorPrimaryBg,
    colorPrimaryBgHover:     themeColorsDark.colorPrimaryBgHover,
    colorPrimaryBorder:      themeColorsDark.colorPrimaryBorder,
    colorPrimaryBorderHover: themeColorsDark.colorPrimaryBorderHover,
    colorPrimaryHover:       themeColorsDark.colorPrimaryHover,
    colorPrimaryActive:      themeColorsDark.colorPrimaryActive,
    colorPrimaryText:        themeColorsDark.colorPrimaryText,
    colorPrimaryTextHover:   themeColorsDark.colorPrimaryTextHover,
    colorPrimaryTextActive:  themeColorsDark.colorPrimaryTextActive,
    // Success
    colorSuccess:            themeColorsDark.colorSuccess,
    colorSuccessBg:          themeColorsDark.colorSuccessBg,
    colorSuccessBorder:      themeColorsDark.colorSuccessBorder,
    colorSuccessHover:       themeColorsDark.colorSuccessHover,
    colorSuccessActive:      themeColorsDark.colorSuccessActive,
    colorSuccessText:        themeColorsDark.colorSuccessText,
    colorSuccessTextHover:   themeColorsDark.colorSuccessTextHover,
    colorSuccessTextActive:  themeColorsDark.colorSuccessTextActive,
    // Warning
    colorWarning:            themeColorsDark.colorWarning,
    colorWarningBg:          themeColorsDark.colorWarningBg,
    colorWarningBorder:      themeColorsDark.colorWarningBorder,
    colorWarningHover:       themeColorsDark.colorWarningHover,
    colorWarningActive:      themeColorsDark.colorWarningActive,
    colorWarningText:        themeColorsDark.colorWarningText,
    colorWarningTextHover:   themeColorsDark.colorWarningTextHover,
    colorWarningTextActive:  themeColorsDark.colorWarningTextActive,
    // Error
    colorError:              themeColorsDark.colorError,
    colorErrorBg:            themeColorsDark.colorErrorBg,
    colorErrorBorder:        themeColorsDark.colorErrorBorder,
    colorErrorHover:         themeColorsDark.colorErrorHover,
    colorErrorActive:        themeColorsDark.colorErrorActive,
    colorErrorText:          themeColorsDark.colorErrorText,
    colorErrorTextHover:     themeColorsDark.colorErrorTextHover,
    colorErrorTextActive:    themeColorsDark.colorErrorTextActive,
    // Info
    colorInfo:               themeColorsDark.colorInfo,
    // Text
    colorText:               themeColorsDark.colorText,
    colorTextSecondary:      themeColorsDark.colorTextSecondary,
    colorTextTertiary:       themeColorsDark.colorTextTertiary,
    colorTextQuaternary:     themeColorsDark.colorTextQuaternary,
    // Border
    colorBorder:             themeColorsDark.colorBorder,
    colorBorderSecondary:    themeColorsDark.colorBorderSecondary,
    // Fill
    colorFill:               themeColorsDark.colorFill,
    colorFillSecondary:      themeColorsDark.colorFillSecondary,
    colorFillTertiary:       themeColorsDark.colorFillTertiary,
    colorFillQuaternary:     themeColorsDark.colorFillQuaternary,
    // Background
    colorBgBase:             themeColorsDark.colorBgBase,
    colorBgLayout:           themeColorsDark.colorBgLayout,
    colorBgContainer:        themeColorsDark.colorBgContainer,
    colorBgElevated:         themeColorsDark.colorBgElevated,
    colorBgMask:             themeColorsDark.colorBgMask,
    // Link
    colorLink:               themeColorsDark.colorLink,
    colorLinkHover:          themeColorsDark.colorLinkHover,
    colorLinkActive:         themeColorsDark.colorLinkActive,
  },
};
