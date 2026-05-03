import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING, PRESS } from '../../constants/theme';

const LocationBar = ({ location = 'Sathuvachari, Vellore', onPress }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    activeOpacity={PRESS.opacity}
  >
    <Text style={styles.pin}>📍</Text>
    <View style={styles.textBlock}>
      <Text style={styles.label}>Deliver to</Text>
      <View style={styles.row}>
        <Text style={styles.locationText} numberOfLines={1}>
          {location}
        </Text>
        <Text style={styles.chevron}>⌄</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    gap: SPACING.sm,
  },
  pin: {
    fontSize: 18,
  },
  textBlock: {
    flex: 1,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    marginBottom: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
    letterSpacing: -0.2,
  },
  chevron: {
    fontSize: 18,
    color: COLORS.dark,
    marginTop: -3,
    fontWeight: FONTS.bold,
  },
});

export default LocationBar;
