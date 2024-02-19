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
  return (
    <>
      <Button
        mode="outlined"
        onPress={resetCalculator}
        style={{ marginRight: "auto" }}
      >
        Close
      </Button>
      <Button
        mode={inProgress ? "outlined" : "contained"}
        onPress={startSession}
      >
        Restart
      </Button>
      {inProgress && (
        <Button disabled={!value} mode="contained" onPress={addRoute}>
          Add
        </Button>
      )}
    </>
  );
}
