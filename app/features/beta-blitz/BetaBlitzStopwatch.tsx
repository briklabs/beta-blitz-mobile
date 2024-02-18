import React from "react";
import { View } from "react-native";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Text } from "react-native-paper";

export default function BetaBlitzStopwatch() {
  const { stopwatch } = useBetaBlitzContext();
  return (
    <View style={{ flex: 1, padding: 4 }}>
      <Text variant="titleSmall">Timer</Text>
      <Text variant="displaySmall">{stopwatch}</Text>
    </View>
  );
}
