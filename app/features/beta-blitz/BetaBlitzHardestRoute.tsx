import React, { useMemo } from "react";
import { Text } from "react-native-paper";
import { useBetaBlitzContext } from "./BetaBlitzContext";

export default function BetaBlitzHardestRoute() {
  const { completedRoutes, items } = useBetaBlitzContext();
  const route = useMemo(
    () =>
      completedRoutes
        ? items.find(
            (i) => i.value === Math.max(...completedRoutes.map((r) => r.value))
          )?.label
        : 0,
    [completedRoutes]
  );
  if (completedRoutes?.length) return <Text variant="bodyLarge">{route}</Text>;
  return <Text variant="labelSmall">N/A</Text>;
}
