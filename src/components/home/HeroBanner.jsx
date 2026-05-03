import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  PRESS,
  RADIUS,
  SHADOWS,
  SPACING,
} from "../../constants/theme";

const HeroBanner = ({ onCtaPress }) => (
  <View style={styles.container}>
    {/* Text Content */}
    <View style={styles.content}>
      <Text style={styles.titleNormal}>Want to become a</Text>
      <Text style={styles.titleGreen}>delivery partner?</Text>
      <Text style={styles.subtitle}>
        Earn with flexible hours{"\n"}and great incentives.
      </Text>
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={onCtaPress}
        activeOpacity={PRESS.opacity}
      >
        <Text style={styles.ctaText}>Click here  ›</Text>
      </TouchableOpacity>
    </View>

    {/* Illustration */}
    <View style={styles.imageArea}>
      <View style={styles.phoneFrame}>
        <Text style={styles.phonePin}>📍</Text>
      </View>
      <View style={styles.riderWrap}>
        <Text style={styles.riderEmoji}>🛵</Text>
        <View style={styles.riderBadge}>
          <Text style={styles.riderBadgeText}>KKSly</Text>
        </View>
      </View>
    </View>

    {/* Dot Indicators */}
    <View style={styles.dotRow}>
      <View style={[styles.dot, styles.dotActive]} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.xxl,
    padding: SPACING.xl,
    paddingBottom: 36,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
  titleNormal: {
    fontSize: FONT_SIZE["4xl"],
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    lineHeight: 26,
  },
  titleGreen: {
    fontSize: FONT_SIZE["4xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.primary,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: FONT_SIZE.lg,
    color: "#555",
    marginTop: 6,
    lineHeight: 19,
  },
  ctaButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 10,
    paddingHorizontal: SPACING.lg,
    alignSelf: "flex-start",
    ...SHADOWS.sm,
  },
  ctaText: {
    color: COLORS.white,
    fontWeight: FONTS.extraBold,
    fontSize: FONT_SIZE.base,
    letterSpacing: 0.3,
  },
  imageArea: {
    alignItems: "center",
    justifyContent: "center",
    width: 130,
  },
  phoneFrame: {
    position: "absolute",
    right: 0,
    top: -10,
    width: 60,
    height: 90,
    borderRadius: SPACING.md - 2,
    backgroundColor: COLORS.white,
    borderWidth: 3,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  phonePin: {
    fontSize: 24,
  },
  riderWrap: {
    position: "relative",
    alignItems: "center",
  },
  riderEmoji: {
    fontSize: 70,
    textAlign: "center",
  },
  riderBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    marginTop: -10,
  },
  riderBadgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONTS.bold,
  },
  dotRow: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#c8e6c9",
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 20,
  },
});

export default HeroBanner;
