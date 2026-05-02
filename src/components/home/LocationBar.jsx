import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING } from '../../constants/theme';

const LocationBar = ({ location = 'Sathuvachari, Vellore', onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.pin}>📍</Text>
    <Text style={styles.locationText}>{location}</Text>
    <Text style={styles.chevron}>⌄</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    gap: SPACING.xs,
  },
  pin: {
    fontSize: FONT_SIZE['2xl'],
  },
  locationText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.semiBold,
    color: COLORS.dark,
    marginLeft: 2,
  },
  chevron: {
    fontSize: 20,
    color: COLORS.dark,
    marginTop: -3,
  },
});

export default LocationBar;
