import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING, RADIUS } from '../../constants/theme';
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
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.md,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: 2,
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontSize: FONT_SIZE.xs + 0.5,
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    textAlign: 'center',
  },
  sub: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xs,
  },
});

export default FeatureStrip;
