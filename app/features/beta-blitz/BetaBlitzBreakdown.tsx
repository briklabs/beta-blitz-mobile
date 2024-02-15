import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Text } from "react-native-paper";

export default function BetaBlitzBreakdown() {
  const { completedRoutes, items } = useBetaBlitzContext();

  const data = useMemo(() => {
    return completedRoutes
      .sort()
      .reverse()
      .reduce((result, curr) => {
        const item = items.find((i) => i.value === curr);
        const key = item?.label ?? curr;
        result[key] = result[key] ? result[key] + 1 : 1;
        return result;
      }, {} as Record<string, number>);
  }, [completedRoutes]);
  return (
    <View className="flex-1 gap-2">
      <Text variant="titleSmall">Breakdown</Text>
      <ScrollView contentContainerClassName="gap-2">
        {Object.entries(data).map(([label, value], i) => (
          <View key={i}>
            <Text variant="labelSmall">{label} routes</Text>
            <Text variant="headlineSmall">
              {Math.ceil((value / completedRoutes.length) * 100)}%
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
