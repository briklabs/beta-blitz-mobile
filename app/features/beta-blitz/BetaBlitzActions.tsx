import React from "react";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Button, useTheme } from "react-native-paper";

export default function BetaBlitzActions() {
  const {
    inProgress,
    selectedRoute,
    addRoute,
    deleteSession,
    closeSession,
    endSession,
  } = useBetaBlitzContext();

  const { colors } = useTheme();

  if (inProgress)
    return (
      <>
        <Button
          mode="outlined"
          onPress={endSession}
          style={{ marginRight: "auto" }}
        >
          End Session
        </Button>
        <Button
          disabled={!selectedRoute}
          mode="contained"
          onPress={addRoute}
          style={{ flex: 1 }}
        >
          Add Route
        </Button>
      </>
    );

  return (
    <>
      <Button
        mode="contained-tonal"
        onPress={deleteSession}
        style={{ marginRight: "auto" }}
        textColor={colors.error}
      >
        Delete Session
      </Button>
      <Button mode="outlined" onPress={closeSession} style={{ flex: 1 }}>
        Close Session
      </Button>
    </>
  );
}
