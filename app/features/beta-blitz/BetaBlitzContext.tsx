import { createContext, useContext } from "react";

interface BetaBlitzCotextInterface {
  goal: number;
  total: number;
  completedRoutes: number[];
  value: number;
  addRoute: () => void;
  removeRouteByIndex: (i: number) => void;
  resetCalculator: () => void;
  toggleGoalDialog: () => void;
  stopwatch: string;
  startSession: () => void;
  inProgress: boolean;
  visibleGoalDialog: boolean;
  setGoal: (num: number) => void;
  setValue: (num: number) => void;
  items: { label: string; value: number }[];
}

export const BetaBlitzContext = createContext<BetaBlitzCotextInterface>(
  {} as BetaBlitzCotextInterface
);

export const useBetaBlitzContext = () => useContext(BetaBlitzContext);
