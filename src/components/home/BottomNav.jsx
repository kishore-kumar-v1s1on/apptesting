import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING, RADIUS } from '../../constants/theme';
import { NAV_TABS } from '../../data/mockData';
import { useCart } from '../../contexts/CartContext';

const NavItem = ({ tab, isActive, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.iconWrap}>
      <Text style={[styles.emoji, isActive && styles.emojiActive]}>
        {tab.emoji}
      </Text>
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
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingBottom: 20,
    paddingTop: SPACING.md - 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  iconWrap: {
    position: 'relative',
  },
  emoji: {
    fontSize: 22,
  },
  emojiActive: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: COLORS.danger,
    borderRadius: RADIUS.round,
    minWidth: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONTS.bold,
  },
  label: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: FONTS.bold,
  },
});

export default BottomNav;
