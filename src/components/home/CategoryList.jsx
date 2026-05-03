import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZE, SPACING, RADIUS, SHADOWS, PRESS } from '../../constants/theme';
import SectionHeader from '../common/SectionHeader';
import { CATEGORIES } from '../../data/mockData';

const isControlled = (val) => val !== undefined;

const CategoryItem = ({ item, isSelected, onPress }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={onPress}
    activeOpacity={PRESS.opacity}
  >
    <View style={[styles.iconBox, isSelected && styles.iconBoxSelected]}>
      {item.isDots ? (
        <View style={styles.dotsGrid}>
          {[0, 1, 2, 3].map(i => (
            <View key={i} style={styles.dotCircle} />
          ))}
        </View>
      ) : (
        <Text style={styles.emoji}>{item.emoji}</Text>
      )}
    </View>
    <Text style={[styles.name, isSelected && styles.nameSelected]} numberOfLines={1}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

const CategoryList = ({
  selectedId: selectedIdProp,
  onSelectCategory,
  onMore,
  onViewAll,
}) => {
  const [internalId, setInternalId] = useState(null);
  const selectedId = isControlled(selectedIdProp) ? selectedIdProp : internalId;

  const handlePress = (cat) => {
    if (cat.isDots) {
      onMore?.();
      return;
    }
    if (isControlled(selectedIdProp)) {
      onSelectCategory?.(cat);
    } else {
      setInternalId((prev) => (prev === cat.id ? null : cat.id));
      onSelectCategory?.(cat);
    }
  };

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
            onPress={() => handlePress(cat)}
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
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: SPACING.lg,
  },
  item: {
    alignItems: 'center',
    width: 76,
    marginRight: SPACING.md,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    ...SHADOWS.sm,
  },
  iconBoxSelected: {
    backgroundColor: COLORS.primary,
  },
  emoji: {
    fontSize: 30,
  },
  name: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONTS.semiBold,
    color: COLORS.dark,
    textAlign: 'center',
    width: '100%',
  },
  nameSelected: {
    color: COLORS.primary,
    fontWeight: FONTS.bold,
  },
  dotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 28,
    height: 28,
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCircle: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primary,
  },
});

export default CategoryList;
