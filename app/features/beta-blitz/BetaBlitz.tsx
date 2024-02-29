import React, { useEffect, useMemo, useState } from "react";
import { BetaBlitzContext } from "./BetaBlitzContext";
import { Alert, DimensionValue, Platform, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BetaBlitzProgress from "./BetaBlitzProgress";
import BetaBlitzBreakdown from "./BetaBlitzBreakdown";
import BetaBlitzStopwatch from "./BetaBlitzStopwatch";
import BetaBlitzHardestRoute from "./BetaBlitzHardestRoute";
import BetaBlitzCompletedRoutes from "./BetaBlitzCompletedRoutes";
import BetaBlitzRouteOptions from "./BetaBlitzRouteOptions";
import BetaBlitzActions from "./BetaBlitzActions";
import BetaBlitzGoalDialog from "./BetaBlitzGoalDialog";
import { Button, Card } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

interface State {
  goal: number;
  completedRoutes: number[];
  startTimestamp: number | null;
  endTimestamp: number | null;
}

class AsyncBetaBlitz {
  private readonly STORAGE_KEY = "beat-blitz";
  private readonly DEFAULT_GOAL = 20;

  async getState(): Promise<State> {
    const value = await AsyncStorage.getItem(this.STORAGE_KEY);
    return value ? JSON.parse(value) : this.defaultState;
  }

  async setState(state: State) {
    try {
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving state:", error);
    }
  }

  defaultState = {
    goal: this.DEFAULT_GOAL,
    completedRoutes: [],
    startTimestamp: null,
    endTimestamp: null,
  };
}

export default function BetaBlitz() {
  const asyncBetaBlitz = new AsyncBetaBlitz();
  const [state, setState] = useState<State>(asyncBetaBlitz.defaultState);
  const total = useMemo(
    () => state?.completedRoutes.reduce((prev, curr) => curr + prev, 0),
    [state?.completedRoutes]
  );

  useEffect(() => {
    const init = async () => {
      const asyncState = await asyncBetaBlitz.getState();
      setState(() => asyncState);
      startSession();
    };
    init();
  }, []);

  const addRoute = () => {
    if (!value || isNaN(value)) return;
    const completedRoutes = [...state.completedRoutes, value];
    setState((s) => ({
      ...s,
      completedRoutes,
    }));
  };

  const startSession = () => {
    setAskReset(true);
    setState(() => ({
      ...asyncBetaBlitz.defaultState,
      startTimestamp: Date.now(),
    }));
  };

  const removeRouteByIndex = (index: number) => {
    const completedRoutes = [...state.completedRoutes];
    completedRoutes.splice(index, 1);
    setState((s) => ({
      ...s,
      completedRoutes,
    }));
  };

  const resetCalculator = () => {
    setState(() => asyncBetaBlitz.defaultState);
    setValue(0);
  };

  const goal = useMemo(() => state.goal, [state.goal]);
  async function setGoal(goal: number) {
    setState((s) => ({
      ...s,
      goal,
    }));
  }

  const completedRoutes = useMemo(
    () => state.completedRoutes,
    [state.completedRoutes]
  );

  useEffect(() => {
    const update = async () => await asyncBetaBlitz.setState(state);
    update();
  }, [state.goal, state.startTimestamp, state.endTimestamp, total]);

  /**
   * set end timestamp if it doesn't exist
   * and if total reached or surpassed goal
   */
  useEffect(() => {
    if (state.endTimestamp) return;
    if (total >= state.goal) {
      const endTimestamp = Date.now();
      setState((s) => ({
        ...s,
        endTimestamp,
      }));
    }
  }, [total, state.goal]);

  const inProgress = useMemo(
    () => state.startTimestamp !== null && state.endTimestamp === null,
    [state.startTimestamp, state.endTimestamp]
  );

  const [value, setValue] = useState(0);
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

  const [askReset, setAskReset] = useState(true);
  useEffect(() => {
    if (!askReset) return;
    if (goal > total) return;

    if (Platform.OS === "web") {
      const result = confirm("Do you want to restart?");
      result ? startSession() : setAskReset(false);
    } else {
      Alert.alert(
        "Goal achieved!",
        "Do you want to restart?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setAskReset(false),
          },
          { text: "OK", onPress: startSession },
        ],
        { cancelable: true }
      );
    }
  }, [goal, total, askReset]);

  const [visibleGoalDialog, setVisibleGoalDialog] = useState(false);
  function toggleGoalDialog() {
    setVisibleGoalDialog((bool) => !bool);
  }
  const ctx = {
    goal,
    total,
    startTimestamp: state.startTimestamp,
    endTimestamp: state.endTimestamp,
    completedRoutes,
    value,
    addRoute,
    removeRouteByIndex,
    resetCalculator,
    toggleGoalDialog,
    startSession,
    inProgress,
    visibleGoalDialog,
    setGoal,
    setValue,
    items,
  };

  return (
    <BetaBlitzContext.Provider value={ctx}>
      {state.startTimestamp ? (
        <View style={{ flex: 1, padding: 4, gap: 4 }}>
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
                  justifyContent: "center",
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
              <Card style={{ flex: 1 }}>
                <Card.Title title="Hardest Route" />
                <Card.Content>
                  <BetaBlitzHardestRoute />
                </Card.Content>
              </Card>
            </View>
            <Card style={{ flex: 1 }}>
              <View style={{ maxHeight: "45vh" as DimensionValue }}>
                <ScrollView>
                  <BetaBlitzCompletedRoutes />
                </ScrollView>
              </View>
            </Card>
          </View>
          <Card>
            <Card.Content>
              <BetaBlitzRouteOptions />
            </Card.Content>
            <Card.Actions style={{ gap: 4 }}>
              <BetaBlitzActions />
            </Card.Actions>
          </Card>
          <BetaBlitzGoalDialog />
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button mode="contained" onPress={startSession} icon="lightning-bolt">
            Start
          </Button>
        </View>
      )}
    </BetaBlitzContext.Provider>
  );
}
