import React from "react";
import { StyleSheet, View } from "react-native";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Button, Card, Surface, Text } from "react-native-paper";

function BetaBlitzProgress() {
  const { total, goal } = useBetaBlitzContext();
  return (
    <>
      <Text variant="displayLarge">{total}</Text>
      <Text
        variant="labelSmall"
        style={{ marginBottom: 2 }}
      >{`Total: ${total} out of ${goal}`}</Text>
    </>
  );
}

BetaBlitzProgress.Action = function () {
  const { toggleGoalDialog } = useBetaBlitzContext();
  return <Button onPress={toggleGoalDialog}>Update Goal</Button>;
};

export default BetaBlitzProgress;
