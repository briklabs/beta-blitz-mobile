import React from "react";
import { View } from "react-native";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Button, Text } from "react-native-paper";

export default function BetaBlitzProgress() {
  const { total, goal, toggleGoalDialog } = useBetaBlitzContext();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="displayLarge">{total}</Text>
      <Text
        variant="labelSmall"
        style={{ marginBottom: 2 }}
      >{`Total: ${total} out of ${goal}`}</Text>
      <Button mode="outlined" onPress={toggleGoalDialog}>
        Update Goal
      </Button>
    </View>
  );
}
