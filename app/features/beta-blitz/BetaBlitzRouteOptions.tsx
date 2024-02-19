import React from "react";
import { ScrollView, View } from "react-native";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Button } from "react-native-paper";

export default function BetaBlitzRouteOptions() {
  const { items, setValue, value } = useBetaBlitzContext();
  return (
    <ScrollView horizontal contentContainerStyle={{ gap: 4 }}>
      {items.map((route, i) => (
        <Button
          mode={route.value === value ? "contained" : "contained-tonal"}
          key={i}
          onPress={() => setValue(route.value)}
        >
          {route.label}
        </Button>
      ))}
    </ScrollView>
  );
}
