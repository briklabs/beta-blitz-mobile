import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Avatar, Button, Chip, Surface, Text } from "react-native-paper";

export default function BetaBlitzCompletedRoutes() {
  const { completedRoutes, removeRouteByIndex, items } = useBetaBlitzContext();
  const completed = useMemo<{ label: string; value: string }[]>(
    () =>
      completedRoutes.map((r) => {
        const item = items.find((i) => i.value === r);
        return {
          label: item?.label ?? `${r} points`,
          value: String(r),
        };
      }),
    [completedRoutes]
  );

  const [editRouteIndex, setEditRouteIndex] = useState<number>();
  function handlePress(index: number) {
    setEditRouteIndex(editRouteIndex === index ? -1 : index);
  }

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      {completed.map((cr, i) => (
        <Chip
          key={i}
          mode="outlined"
          avatar={<Avatar.Text label={cr.value} size={24} />}
          onPress={() => handlePress(i)}
          onClose={
            editRouteIndex === i ? () => removeRouteByIndex(i) : undefined
          }
        >
          {cr.label}
        </Chip>
      ))}
    </View>
  );
}
