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
    <View className="bg-white rounded p-4 h-96 gap-2">
      <Text variant="titleSmall">Completed Routes</Text>
      <ScrollView contentContainerClassName="gap-2">
        {completed.map((cr, i) => (
          <View
            className="flex-row justify-between items-center p-1 pl-4 bg-neutral-100 rounded"
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
