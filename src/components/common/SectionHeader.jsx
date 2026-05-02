import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE } from '../../constants/theme';

const SectionHeader = ({ title, onViewAll }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
      <Text style={styles.viewAll}>View All</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: FONT_SIZE['3xl'],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
  },
  viewAll: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.primary,
    fontWeight: FONTS.semiBold,
  },
});

export default SectionHeader;
