import { useLocalSearchParams } from "expo-router";
import React from "react";
import TrackOrderScreen from "../../src/screens/TrackOrderScreen";

export default function TrackOrderRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TrackOrderScreen orderId={id} />;
}
