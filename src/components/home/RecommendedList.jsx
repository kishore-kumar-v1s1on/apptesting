import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING, RADIUS } from '../../constants/theme';
import SectionHeader from '../common/SectionHeader';
import { RECOMMENDED_PRODUCTS } from '../../data/mockData';

// ─── Single Product Card ──────────────────────────────────────────────────────

const ProductCard = ({ item, onViewShops }) => (
  <View style={styles.card}>
    {item.badge && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.badge}</Text>
      </View>
    )}
    <View style={styles.imageBox}>
      <Text style={styles.emoji}>{item.emoji}</Text>
    </View>
    <Text style={styles.name}>{item.name}</Text>
    <View style={styles.shopsRow}>
      <Text style={styles.storeIcon}>🏪</Text>
      <Text style={styles.shopsText}>Available in {item.shops} shops</Text>
    </View>
    <TouchableOpacity style={styles.viewBtn} onPress={() => onViewShops?.(item)} activeOpacity={0.75}>
      <Text style={styles.viewBtnText}>View Shops</Text>
    </TouchableOpacity>
  </View>
);

// ─── Recommended Section ──────────────────────────────────────────────────────

const RecommendedList = ({ onViewAll, onViewShops }) => (
  <View style={styles.container}>
    <SectionHeader title="Recommended for You" onViewAll={onViewAll} />
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {RECOMMENDED_PRODUCTS.map(product => (
        <ProductCard key={product.id} item={product} onViewShops={onViewShops} />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  scrollContent: {
    paddingBottom: SPACING.xs,
  },

  // Card
  card: {
    width: 148,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginRight: SPACING.md,
    backgroundColor: COLORS.white,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: COLORS.badge,
    borderRadius: RADIUS.sm - 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONTS.bold,
  },
  imageBox: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.grayLight,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
  },
  emoji: {
    fontSize: 46,
  },
  name: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  shopsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  storeIcon: {
    fontSize: FONT_SIZE.md,
  },
  shopsText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primary,
    fontWeight: FONTS.semiBold,
  },
  viewBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 6,
    alignItems: 'center',
  },
  viewBtnText: {
    color: COLORS.primary,
    fontWeight: FONTS.bold,
    fontSize: FONT_SIZE.base,
  },
});

export { ProductCard };
export default RecommendedList;
