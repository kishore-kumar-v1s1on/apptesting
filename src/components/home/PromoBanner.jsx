import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING, RADIUS } from '../../constants/theme';

const PromoBanner = ({ onShopNow }) => (
  <View style={styles.container}>
    {/* Left Content */}
    <View style={styles.left}>
      <Text style={styles.subtitle}>Groceries at your doorstep</Text>
      <Text style={styles.title}>Save more with offers!</Text>
      <TouchableOpacity style={styles.button} onPress={onShopNow} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Shop Now  ›</Text>
      </TouchableOpacity>
    </View>

    {/* Right Illustration */}
    <View style={styles.right}>
      <Text style={styles.basketEmoji}>🛒</Text>
      <View style={styles.bestBadge}>
        <Text style={styles.bestBadgeText}>BEST{'\n'}PRICES</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.xl,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  left: {
    flex: 1,
  },
  subtitle: {
    fontSize: FONT_SIZE.base,
    color: '#666',
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: FONT_SIZE['2xl'] + 1,
    fontWeight: FONTS.extraBold,
    color: COLORS.primary,
    marginBottom: SPACING.md + 2,
    lineHeight: 22,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SPACING.md - 2,
    paddingVertical: SPACING.md - 2,
    paddingHorizontal: SPACING.xl,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: FONTS.bold,
    fontSize: FONT_SIZE.xl,
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    position: 'relative',
  },
  basketEmoji: {
    fontSize: 52,
  },
  bestBadge: {
    position: 'absolute',
    right: 0,
    bottom: -8,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.round,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bestBadgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONTS.extraBold,
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default PromoBanner;
