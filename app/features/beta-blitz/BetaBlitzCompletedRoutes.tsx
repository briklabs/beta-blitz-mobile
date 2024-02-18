import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Button, IconButton, Text } from "react-native-paper";

export default function BetaBlitzCompletedRoutes() {
  const { completedRoutes, removeRouteByIndex, items } = useBetaBlitzContext();
  const completed = useMemo(
    () =>
      completedRoutes.map((r) => {
        const item = items.find((i) => i.value === r);
        return item?.label ?? `${r} points`;
      }),
    [completedRoutes]
  );

  return (
    <View style={{ padding: 4, gap: 2 }}>
      <Text variant="titleSmall">Completed Routes</Text>
      <ScrollView contentContainerStyle={{ gap: 2 }}>
        {completed.map((cr, i) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              paddingLeft: 4,
            }}
            key={i}
          >
            <Text variant="bodyLarge">{cr}</Text>
            <Button
              icon="delete-outline"
              mode="contained-tonal"
              onPress={() => removeRouteByIndex(i)}
            >
              delete
            </Button>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
