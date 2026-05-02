import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING, RADIUS } from '../../constants/theme';
import SectionHeader from '../common/SectionHeader';
import { CATEGORIES } from '../../data/mockData';

const CategoryItem = ({ item, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.item, isSelected && styles.itemSelected]}
    onPress={onPress}
    activeOpacity={0.75}
  >
    {item.isDots ? (
      <View style={styles.dotsGrid}>
        {[0, 1, 2, 3].map(i => (
          <View key={i} style={styles.dotCircle} />
        ))}
      </View>
    ) : (
      <Text style={styles.emoji}>{item.emoji}</Text>
    )}
    <Text style={[styles.name, isSelected && styles.nameSelected]}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

const CategoryList = ({ onViewAll }) => {
  const [selectedId, setSelectedId] = useState('1');

  return (
    <View style={styles.container}>
      <SectionHeader title="Shop by Category" onViewAll={onViewAll} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map(cat => (
          <CategoryItem
            key={cat.id}
            item={cat}
            isSelected={selectedId === cat.id}
            onPress={() => setSelectedId(cat.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  scrollContent: {
    paddingBottom: SPACING.xs,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 88,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginRight: SPACING.md - 2,
    backgroundColor: COLORS.white,
    gap: 6,
  },
  itemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  emoji: {
    fontSize: 32,
  },
  name: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONTS.semiBold,
    color: COLORS.dark,
    textAlign: 'center',
  },
  nameSelected: {
    color: COLORS.primary,
  },
  dotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 32,
    height: 32,
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCircle: {
    width: 11,
    height: 11,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primary,
  },
});

export default CategoryList;
