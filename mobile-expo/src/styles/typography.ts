export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    thin: '200' as const,
    regular: '400' as const,
    bold: '700' as const,
  },
} as const;

export type TTypography = typeof typography;
export type TFontSize = keyof typeof typography.fontSize;
export type TFontWeight = keyof typeof typography.fontWeight;
