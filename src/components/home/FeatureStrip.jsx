import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { FEATURES } from '../../data/mockData';

const FeatureItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.icon}>{item.icon}</Text>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.sub}>{item.sub}</Text>
  </View>
);

const FeatureStrip = () => (
  <View style={styles.container}>
    {FEATURES.map((feature, index) => (
      <React.Fragment key={feature.id}>
        <FeatureItem item={feature} />
        {index < FEATURES.length - 1 && <View style={styles.divider} />}
      </React.Fragment>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING.md,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
    ...SHADOWS.sm,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 2,
  },
  icon: {
    fontSize: 22,
  },
  title: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
    textAlign: 'center',
    letterSpacing: -0.1,
  },
  sub: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray,
    textAlign: 'center',
    fontWeight: FONTS.medium,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
});

export default FeatureStrip;
