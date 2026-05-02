import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING, RADIUS } from '../../constants/theme';

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
      <TouchableOpacity style={styles.bellWrap} onPress={onBellPress} activeOpacity={0.7}>
        <Text style={styles.bellIcon}>🔔</Text>
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.avatar} onPress={onAvatarPress} activeOpacity={0.8}>
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
    paddingTop: 48,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.white,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm - 1,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 18,
    color: COLORS.white,
  },
  logoText: {
    fontSize: FONT_SIZE['6xl'],
    fontWeight: FONTS.extraBold,
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  bellWrap: {
    position: 'relative',
  },
  bellIcon: {
    fontSize: 22,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.danger,
    borderRadius: RADIUS.round,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONTS.bold,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
});

export default Header;
