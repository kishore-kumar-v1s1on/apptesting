// ─── KKSly Design Tokens ─────────────────────────────────────────────────────
// Premium minimal palette inspired by Blinkit — deep saturated green primary,
// neutral grays, soft shadows replacing heavy borders, and a 4/8 px spacing grid.

export const COLORS = {
  // Brand
  primary: '#0C831F',           // deeper, more saturated brand green
  primaryDark: '#085C16',
  primaryMid: '#16A34A',
  primaryLight: '#E8F5E9',
  primarySoft: '#D1F4D7',

  // Accents
  accent: '#F59E0B',
  accentLight: '#FEF3C7',

  // Status
  danger: '#DC2626',
  dangerLight: '#FEE2E2',
  success: '#16A34A',
  warning: '#F59E0B',
  info: '#2563EB',

  // Neutrals
  dark: '#0F1721',              // near-black with slight blue tint
  text: '#1F2937',
  textSecondary: '#4B5563',
  gray: '#6B7280',              // body meta
  grayLight: '#F3F4F6',         // input / chip background
  border: '#E5E7EB',
  borderLight: '#F1F5F9',       // very subtle separator

  surface: '#FFFFFF',
  background: '#F8FAFB',        // off-white screen background
  white: '#FFFFFF',

  overlay: 'rgba(15,23,33,0.5)',
  badge: '#16A34A',
};

// Soft shadow scale — keep cards lifted without heavy borders.
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
};

export const FONTS = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

// 4/8 px grid
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  xxl: 20,
  xxxl: 24,
  round: 999,
};

export const FONT_SIZE = {
  xs: 10,
  sm: 11,
  md: 12,
  base: 13,
  lg: 14,
  xl: 16,
  '2xl': 18,
  '3xl': 20,
  '4xl': 24,
  '5xl': 28,
  '6xl': 32,
};

// Standard touch / press feedback values for consistency.
export const PRESS = {
  opacity: 0.7,
};
