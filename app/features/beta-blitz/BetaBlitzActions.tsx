import React from "react";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Button, useTheme } from "react-native-paper";

export default function BetaBlitzActions() {
  const { inProgress, resetCalculator, selectedRoute, addRoute, endSession } =
    useBetaBlitzContext();

  const { colors } = useTheme();
  return (
    <>
      <Button
        mode="outlined"
        onPress={endSession}
        style={{ marginRight: "auto" }}
        textColor={colors.error}
      >
        Close
      </Button>
      <Button
        mode={inProgress ? "outlined" : "contained"}
        onPress={resetCalculator}
      >
        Restart
      </Button>
      {inProgress && (
        <Button disabled={!selectedRoute} mode="contained" onPress={addRoute}>
          Add
        </Button>
      )}
    </>
  );
}
