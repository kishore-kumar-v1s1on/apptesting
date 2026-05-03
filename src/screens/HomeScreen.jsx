import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

import BottomNav from "../components/home/BottomNav";
import CategoryList from "../components/home/CategoryList";
import FeatureStrip from "../components/home/FeatureStrip";
import Header from "../components/home/Header";
import HeroBanner from "../components/home/HeroBanner";
import LocationBar from "../components/home/LocationBar";
import NearbyShops from "../components/home/NearbyShops";
import PromoBanner from "../components/home/PromoBanner";
import RecommendedList from "../components/home/RecommendedList";
import SearchBar from "../components/home/SearchBar";

import { COLORS } from "../constants/theme";
import { CATEGORY_LIST } from "../data/mockData";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Tap same chip to clear; tap a new chip to switch.
  const handleSelectCategory = (cat) => {
    setSelectedCategory((prev) => (prev?.id === cat.id ? null : cat));
  };

  // Map the home strip's category to the global CATEGORY_LIST id
  // so /category/[id] resolves correctly.
  const handleViewAllShops = () => {
    if (selectedCategory) {
      const match = CATEGORY_LIST.find(
        (c) => c.name === selectedCategory.name
      );
      if (match) {
        router.push({
          pathname: "/category/[id]",
          params: { id: match.id },
        });
        return;
      }
    }
    router.push("/shops");
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Sticky Top Section */}
      <Header
        notificationCount={3}
        onBellPress={() => console.log("Bell pressed")}
        onAvatarPress={() => console.log("Avatar pressed")}
      />
      <LocationBar
        location="Sathuvachari, Vellore"
        onPress={() => console.log("Location pressed")}
      />
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onMicPress={() => console.log("Mic pressed")}
      />

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HeroBanner onCtaPress={() => console.log("CTA pressed")} />

        <FeatureStrip />

        <CategoryList
          selectedId={selectedCategory?.id}
          onSelectCategory={handleSelectCategory}
          onMore={() => router.push("/categories")}
          onViewAll={() => router.push("/categories")}
        />

        <RecommendedList
          onViewAll={() => console.log("View All Products")}
          onViewShops={(product) => console.log("View shops for", product.name)}
        />

        <NearbyShops
          categoryName={selectedCategory?.name}
          onViewAll={handleViewAllShops}
          onShopPress={(shop) =>
            router.push({ pathname: "/shop/[id]", params: { id: shop.id } })
          }
        />

        <PromoBanner onShopNow={() => console.log("Shop Now pressed")} />
      </ScrollView>

      {/* Fixed Bottom Nav */}
      <BottomNav
        initialTab="Home"
        onTabChange={(tab) => {
          if (tab === "Cart") router.push("/cart");
          else if (tab === "Categories") router.push("/categories");
          else if (tab === "Shops") router.push("/shops");
          else if (tab === "Orders") router.push("/orders");
          else console.log("Tab changed to", tab);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingBottom: 80,
  },
});

export default HomeScreen;
