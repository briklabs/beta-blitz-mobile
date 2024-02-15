import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { BetaBlitzContext } from "./BetaBlitzContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addMilliseconds, format } from "date-fns";

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

export default function BetaBlitz({ children }: { children: ReactNode }) {
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
    setState((s) => ({
      ...s,
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
    setElapsedTime(0);
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

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  useEffect(() => {
    const { startTimestamp, endTimestamp } = state;
    if (!startTimestamp) return;

    if (endTimestamp) {
      setElapsedTime(() => endTimestamp - startTimestamp);
      return;
    }

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTimestamp;
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state.startTimestamp, state.endTimestamp]);

  const stopwatch = useMemo(
    () => format(addMilliseconds(0, elapsedTime), "mm:ss"),
    [elapsedTime]
  );
  const inProgress = useMemo(() => !!elapsedTime, [elapsedTime]);

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
    if (askReset && goal && total >= goal) {
      Alert.alert(
        "Goal achieved!",
        "Do you want to restart?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setAskReset(false),
          },
          { text: "OK", onPress: resetCalculator },
        ],
        { cancelable: true }
      );
    }
  }, [goal, total]);

  const [visibleGoalDialog, setVisibleGoalDialog] = useState(false);
  function toggleGoalDialog() {
    setVisibleGoalDialog((bool) => !bool);
  }
  const ctx = {
    goal,
    total,
    completedRoutes,
    value,
    addRoute,
    removeRouteByIndex,
    resetCalculator,
    toggleGoalDialog,
    stopwatch,
    startSession,
    inProgress,
    visibleGoalDialog,
    setGoal,
    setValue,
    items,
  };

  return (
    <BetaBlitzContext.Provider value={ctx}>
      {children}
    </BetaBlitzContext.Provider>
  );
}
