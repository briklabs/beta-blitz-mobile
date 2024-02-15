import React from "react";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Button } from "react-native-paper";

export default function BetaBlitzActions() {
  const {
    goal,
    total,
    inProgress,
    startSession,
    resetCalculator,
    value,
    addRoute,
  } = useBetaBlitzContext();
  if (goal && total === 0 && !inProgress)
    return (
      <Button mode="contained" onPress={() => startSession()}>
        Start
      </Button>
    );
  if (goal && total >= goal)
    return (
      <Button mode="contained" onPress={() => resetCalculator()}>
        Restart
      </Button>
    );
  return (
    <Button disabled={!value} mode="contained" onPress={addRoute}>
      Add
    </Button>
  );
}
