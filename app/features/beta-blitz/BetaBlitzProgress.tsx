import React from "react";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Button, Text } from "react-native-paper";

function BetaBlitzProgress() {
  const { total, goal } = useBetaBlitzContext();
  return (
    <>
      <Text variant="displayLarge" style={{ textAlign: "center" }}>
        {total}
      </Text>
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
