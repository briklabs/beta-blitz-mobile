import React from "react";
import { ScrollView, View } from "react-native";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Button } from "react-native-paper";

export default function BetaBlitzRouteOptions() {
  const { items, setSelectedRoute, selectedRoute } = useBetaBlitzContext();
  return (
    <ScrollView horizontal contentContainerStyle={{ gap: 4 }}>
      {items.map((route, i) => (
        <Button
          key={i}
          mode={route.value === selectedRoute ? "contained" : "contained-tonal"}
          onPress={() => setSelectedRoute(route.value)}
        >
          {route.label}
        </Button>
      ))}
    </ScrollView>
  );
}
