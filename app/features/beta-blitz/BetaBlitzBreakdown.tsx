import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Text } from "react-native-paper";

export default function BetaBlitzBreakdown() {
  const { completedRoutes, items } = useBetaBlitzContext();

  const data = useMemo(() => {
    return completedRoutes
      ?.sort()
      .reverse()
      .reduce((result, curr, index) => {
        const item = items.find((i) => i.value === curr.value);
        const key = item?.label ?? `${index}. ${curr.value}`;
        result[key] = result[key] ? result[key] + 1 : 1;
        return result;
      }, {} as Record<string, number>);
  }, [completedRoutes]);

  if (completedRoutes?.length && data)
    return (
      <View
        style={{
          rowGap: 8,
          columnGap: 24,
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {Object.entries(data)
          .slice(0, 4)
          .map(([label, value], i) => (
            <View key={i} style={{ width: 60 }}>
              <Text variant="labelSmall" numberOfLines={1}>
                {label}
              </Text>
              <Text variant="bodyLarge">
                {Math.ceil((value / completedRoutes.length) * 100)}%
              </Text>
            </View>
          ))}
      </View>
    );

  return <Text variant="labelSmall">N/A</Text>;
}

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    padding: 8,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
