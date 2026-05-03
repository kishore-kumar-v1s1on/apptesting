import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING, RADIUS, SHADOWS, PRESS } from '../../constants/theme';
import { NAV_TABS } from '../../data/mockData';
import { useCart } from '../../contexts/CartContext';

const NavItem = ({ tab, isActive, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={PRESS.opacity}>
    <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
      <Text style={styles.emoji}>{tab.emoji}</Text>
      {tab.badge != null && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{tab.badge}</Text>
        </View>
      )}
    </View>
    <Text style={[styles.label, isActive && styles.labelActive]}>
      {tab.name}
    </Text>
  </TouchableOpacity>
);

const BottomNav = ({ initialTab = 'Home', onTabChange }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { count } = useCart();

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    onTabChange?.(tabName);
  };

  // Inject live cart count into the Cart tab badge.
  const tabs = NAV_TABS.map((t) =>
    t.name === 'Cart' ? { ...t, badge: count > 0 ? count : null } : t
  );

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <NavItem
          key={tab.name}
          tab={tab}
          isActive={activeTab === tab.name}
          onPress={() => handleTabPress(tab.name)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingBottom: 20,
    paddingTop: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    ...SHADOWS.lg,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  iconWrap: {
    width: 44,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.round,
    position: 'relative',
  },
  iconWrapActive: {
    backgroundColor: COLORS.primaryLight,
  },
  emoji: {
    fontSize: 20,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: 2,
    backgroundColor: COLORS.danger,
    borderRadius: RADIUS.round,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: FONTS.extraBold,
    lineHeight: 11,
    includeFontPadding: false,
  },
  label: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray,
    fontWeight: FONTS.semiBold,
    letterSpacing: 0.1,
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: FONTS.extraBold,
  },
});

export default BottomNav;
