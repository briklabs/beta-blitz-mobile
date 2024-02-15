import React from "react";
import { View } from "react-native";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Text } from "react-native-paper";

export default function BetaBlitzStopwatch() {
  const { stopwatch } = useBetaBlitzContext();
  return (
    <View className="flex-1 bg-white rounded p-4">
      <Text variant="titleSmall">Timer</Text>
      <Text variant="displaySmall">{stopwatch}</Text>
    </View>
  );
}
