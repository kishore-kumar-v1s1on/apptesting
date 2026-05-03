import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING, RADIUS, SHADOWS, PRESS } from '../../constants/theme';

const SearchBar = ({ value, onChangeText, onMicPress }) => (
  <View style={styles.wrap}>
    <View style={styles.container}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder='Search "Onion, Milk, Rice..."'
        placeholderTextColor="#9CA3AF"
      />
      <View style={styles.divider} />
      <TouchableOpacity onPress={onMicPress} activeOpacity={PRESS.opacity} hitSlop={6}>
        <Text style={styles.micIcon}>🎤</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.grayLight,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    gap: SPACING.sm,
  },
  searchIcon: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    paddingVertical: 0,
    fontWeight: FONTS.medium,
  },
  divider: {
    width: 1,
    height: 18,
    backgroundColor: COLORS.border,
  },
  micIcon: {
    fontSize: 16,
  },
});

export default SearchBar;
