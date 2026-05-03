import { useLocalSearchParams } from "expo-router";
import React from "react";
import ShopListScreen from "../../src/screens/ShopListScreen";

export default function CategoryRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ShopListScreen categoryId={id} />;
}
