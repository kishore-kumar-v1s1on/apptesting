import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING, RADIUS } from '../../constants/theme';

const SearchBar = ({ value, onChangeText, onMicPress }) => (
  <View style={styles.container}>
    <Text style={styles.searchIcon}>🔍</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder='Search "Onion, Milk, Rice..."'
      placeholderTextColor="#aaa"
    />
    <TouchableOpacity onPress={onMicPress} activeOpacity={0.7}>
      <Text style={styles.micIcon}>🎤</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.grayLight,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.lg - 2,
    paddingVertical: SPACING.md - 1,
    gap: SPACING.sm,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  searchIcon: {
    fontSize: FONT_SIZE['2xl'],
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    paddingVertical: 0,
  },
  micIcon: {
    fontSize: FONT_SIZE['2xl'],
  },
});

export default SearchBar;
