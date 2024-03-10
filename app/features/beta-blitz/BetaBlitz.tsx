import React, { useEffect, useMemo, useState } from "react";
import { BetaBlitzContext } from "./BetaBlitzContext";
import { DimensionValue, View, ScrollView } from "react-native";
import BetaBlitzProgress from "./BetaBlitzProgress";
import BetaBlitzBreakdown from "./BetaBlitzBreakdown";
import BetaBlitzStopwatch from "./BetaBlitzStopwatch";
import BetaBlitzHardestRoute from "./BetaBlitzHardestRoute";
import BetaBlitzCompletedRoutes from "./BetaBlitzCompletedRoutes";
import BetaBlitzRouteOptions from "./BetaBlitzRouteOptions";
import BetaBlitzActions from "./BetaBlitzActions";
import { Card } from "react-native-paper";
import { BetaBlitzType } from "../../db/beta-blitz-validation";
import BetaBlitzGoalDialog from "./BetaBlitzGoalDialog";

interface BetaBlitzProps {
  workout: BetaBlitzType;
  onReset: () => void;
  onClose: () => void;
  onEnd: () => void;
  onDelete: () => void;
  onUpdateWorkout: (w: BetaBlitzType) => void;
}
export default function BetaBlitz({
  workout,
  onUpdateWorkout,
  onReset,
  onClose,
  onEnd,
  onDelete,
}: BetaBlitzProps) {
  const total = useMemo(
    () =>
      workout?.completedRoutes?.reduce((prev, curr) => curr.value + prev, 0) ??
      0,
    [workout?.completedRoutes]
  );

  const [selectedRoute, setSelectedRoute] = useState(0);
  const items = [
    { label: "V0/V1", value: 1 },
    { label: "V2", value: 2 },
    { label: "V3", value: 3 },
    { label: "V4", value: 4 },
    { label: "V5", value: 5 },
    { label: "V6", value: 6 },
    { label: "V7", value: 7 },
    { label: "V8", value: 8 },
    { label: "V9", value: 9 },
  ];
  const addRoute = () => {
    if (!selectedRoute || isNaN(selectedRoute) || !workout) return;
    const completedRoutes: BetaBlitzType["completedRoutes"] = [
      ...(workout.completedRoutes ?? []),
      {
        completedTimestamp: new Date(),
        value: selectedRoute,
      },
    ];
    onUpdateWorkout({
      ...workout,
      completedRoutes,
    });
  };

  const removeRouteByIndex = (index: number) => {
    const completedRoutes = [...(workout.completedRoutes ?? [])];
    completedRoutes.splice(index, 1);
    onUpdateWorkout({
      ...workout,
      completedRoutes,
    });
  };

  const goal = useMemo(() => workout.goal, [workout.goal]);
  async function setGoal(goal: number) {
    onUpdateWorkout({
      ...workout,
      goal,
    });
  }

  const completedRoutes = useMemo(
    () => workout.completedRoutes ?? [],
    [workout.completedRoutes]
  );

  /**
   * set end timestamp if it doesn't exist
   * and if total reached or surpassed goal
   */
  useEffect(() => {
    if (workout.endTimestamp) return;
    if (total >= workout.goal) {
      onUpdateWorkout({
        ...workout,
        endTimestamp: new Date(),
      });
    }
  }, [total, goal]);

  const inProgress = useMemo(
    () => workout.startTimestamp !== null && workout.endTimestamp === null,
    [workout.startTimestamp, workout.endTimestamp]
  );

  const [visibleGoalDialog, setVisibleGoalDialog] = useState(false);
  function toggleGoalDialog() {
    setVisibleGoalDialog((bool) => !bool);
  }

  const ctx = {
    goal,
    total,
    startTimestamp: workout.startTimestamp,
    endTimestamp: workout.endTimestamp,
    completedRoutes,
    selectedRoute,
    addRoute,
    removeRouteByIndex,
    endSession: onEnd,
    closeSession: onClose,
    resetCalculator: onReset,
    deleteSession: onDelete,
    inProgress,
    setGoal,
    setSelectedRoute,
    items,
    visibleGoalDialog,
    toggleGoalDialog,
  };

  return (
    <BetaBlitzContext.Provider value={ctx}>
      <BetaBlitzGoalDialog />
      <View style={{ height: "100%", padding: 4, gap: 4 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 4,
              height: 160,
            }}
          >
            <Card
              elevation={4}
              style={{
                flex: 1,
                alignItems: "center",
                // justifyContent: "center",
                height: "100%",
              }}
            >
              <Card.Content>
                <BetaBlitzProgress />
              </Card.Content>
              <Card.Actions>
                <BetaBlitzProgress.Action />
              </Card.Actions>
            </Card>
            <Card style={{ flex: 1, overflow: "scroll" }}>
              <Card.Title title="Breakdown" />
              <Card.Content>
                <BetaBlitzBreakdown />
              </Card.Content>
            </Card>
          </View>
          <View style={{ gap: 4, flexDirection: "row" }}>
            <Card style={{ flex: 1 }}>
              <Card.Title title="Stopwatch" />
              <Card.Content>
                <BetaBlitzStopwatch />
              </Card.Content>
            </Card>
            <Card style={{ flex: 1, height: "100%" }}>
              <Card.Title title="Hardest Route" />
              <Card.Content>
                <BetaBlitzHardestRoute />
              </Card.Content>
            </Card>
          </View>
          <Card style={{ flex: 1 }}>
            <View style={{}}>
              <ScrollView>
                <BetaBlitzCompletedRoutes />
              </ScrollView>
            </View>
          </Card>
        </View>
        <Card>
          {inProgress && (
            <Card.Content>
              <BetaBlitzRouteOptions />
            </Card.Content>
          )}
          <Card.Actions style={{ gap: 4 }}>
            <BetaBlitzActions />
          </Card.Actions>
        </Card>
      </View>
    </BetaBlitzContext.Provider>
  );
}
