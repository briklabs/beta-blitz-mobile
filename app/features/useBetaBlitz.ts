import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";

export default function useBetaBlitz() {
  const [goal, setGoal] = useState<number>(0);
  const [completedRoutes, setCompletedRoutes] = useState<number[]>([]);
  const total = useMemo(
    () => completedRoutes.reduce((prev, curr) => curr + prev, 0),
    [completedRoutes]
  );

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("goal", goal.toString());
        await AsyncStorage.setItem(
          "completedRoutes",
          JSON.stringify(completedRoutes)
        );
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };

    saveData();
  }, [goal, completedRoutes]);

  const addRoute = (value: number) => {
    if (!value || isNaN(value)) return;
    setCompletedRoutes((completed) => [...completed, value]);
  };

  const removeLastRoute = () => {
    setCompletedRoutes((completed) => completed.slice(0, -1));
  };

  const resetCalculator = () => {
    setCompletedRoutes([]);
  };

  return {
    goal,
    setGoal,
    completedRoutes,
    total,
    addRoute,
    removeLastRoute,
    resetCalculator,
  };
}
