import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  android: {
    regular: 'Roboto',
    medium: 'Roboto-Medium',
    semibold: 'Roboto-Medium',
    bold: 'Roboto-Bold',
  },
  default: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
});

export const Typography = {
  overline: {
    fontFamily: fontFamily?.regular,
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontFamily: fontFamily?.regular,
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  bodySmall: {
    fontFamily: fontFamily?.regular,
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  bodyMedium: {
    fontFamily: fontFamily?.regular,
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  bodyLarge: {
    fontFamily: fontFamily?.regular,
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  labelMedium: {
    fontFamily: fontFamily?.medium,
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
  },
  labelLarge: {
    fontFamily: fontFamily?.medium,
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  headingSmall: {
    fontFamily: fontFamily?.semibold,
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  headingMedium: {
    fontFamily: fontFamily?.semibold,
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  headingLarge: {
    fontFamily: fontFamily?.bold,
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 26,
  },
  displaySmall: {
    fontFamily: fontFamily?.bold,
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
  },
};
