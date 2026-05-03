import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, PRESS } from '../../constants/theme';

const SectionHeader = ({ title, onViewAll, subtitle }) => (
  <View style={styles.container}>
    <View style={styles.titleBlock}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
    {onViewAll ? (
      <TouchableOpacity onPress={onViewAll} activeOpacity={PRESS.opacity} hitSlop={6}>
        <Text style={styles.viewAll}>View All  ›</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
    letterSpacing: -0.4,
    lineHeight: 24,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
    marginTop: 2,
  },
  viewAll: {
    fontSize: FONT_SIZE.base,
    color: COLORS.primary,
    fontWeight: FONTS.bold,
  },
});

export default SectionHeader;
