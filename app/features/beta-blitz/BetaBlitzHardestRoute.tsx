import React, { useMemo } from "react";
import { Card, Text } from "react-native-paper";
import { useBetaBlitzContext } from "./BetaBlitzContext";

export default function BetaBlitzHardestRoute() {
  const { completedRoutes, items } = useBetaBlitzContext();
  const route = useMemo(
    () => items.find((i) => i.value === Math.max(...completedRoutes))?.label,
    [completedRoutes]
  );
  if (completedRoutes.length) return <Text variant="bodyLarge">{route}</Text>;
  return <Text variant="labelSmall">N/A</Text>;
}
