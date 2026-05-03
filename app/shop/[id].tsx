import { useLocalSearchParams } from "expo-router";
import React from "react";
import ShopDetailsScreen from "../../src/screens/ShopDetailsScreen";

export default function ShopRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ShopDetailsScreen shopId={id} />;
}
