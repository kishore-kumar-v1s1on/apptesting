import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING, RADIUS, SHADOWS, PRESS } from '../../constants/theme';

const Header = ({ notificationCount = 3, onBellPress, onAvatarPress }) => (
  <View style={styles.container}>
    {/* Logo */}
    <View style={styles.logoRow}>
      <View style={styles.logoIcon}>
        <Text style={styles.logoEmoji}>🛒</Text>
      </View>
      <Text style={styles.logoText}>KKSly</Text>
    </View>

    {/* Right Actions */}
    <View style={styles.rightRow}>
      <TouchableOpacity
        style={styles.iconBtn}
        onPress={onBellPress}
        activeOpacity={PRESS.opacity}
      >
        <Text style={styles.bellIcon}>🔔</Text>
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.avatar}
        onPress={onAvatarPress}
        activeOpacity={PRESS.opacity}
      >
        <Text style={styles.avatarEmoji}>👤</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: 52,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  logoEmoji: {
    fontSize: 20,
    color: COLORS.white,
  },
  logoText: {
    fontSize: FONT_SIZE['4xl'],
    fontWeight: FONTS.extraBold,
    color: COLORS.primary,
    letterSpacing: -0.5,
    lineHeight: 28,
    includeFontPadding: false,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellIcon: {
    fontSize: 18,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.danger,
    borderRadius: RADIUS.round,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 2,
    borderColor: COLORS.grayLight,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: FONTS.bold,
    lineHeight: 11,
    includeFontPadding: false,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
});

export default Header;
