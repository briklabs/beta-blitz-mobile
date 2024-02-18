import React, { useMemo } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useBetaBlitzContext } from "./BetaBlitzContext";

export default function BetaBlitzHardestRoute() {
  const { completedRoutes, items } = useBetaBlitzContext();
  const route = useMemo(
    () => items.find((i) => i.value === Math.max(...completedRoutes))?.label,
    [completedRoutes]
  );
  return (
    <View style={{ flex: 1, padding: 4 }}>
      <Text variant="titleSmall">Hardest Route</Text>
      <Text variant="bodyLarge">{completedRoutes.length && route}</Text>
    </View>
  );
}
