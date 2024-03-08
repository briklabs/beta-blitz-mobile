import { createContext, useContext } from "react";
import { BetaBlitzType } from "../../db/beta-blitz-validation";

interface BetaBlitzCotextInterface {
  goal: BetaBlitzType["goal"];
  startTimestamp: BetaBlitzType["startTimestamp"];
  endTimestamp: BetaBlitzType["endTimestamp"];
  total: number;
  completedRoutes: BetaBlitzType["completedRoutes"];
  selectedRoute: number;
  addRoute: () => void;
  removeRouteByIndex: (i: number) => void;
  resetCalculator: () => void;
  endSession: () => void;
  inProgress: boolean;
  setGoal: (num: number) => void;
  setSelectedRoute: (num: number) => void;
  items: { label: string; value: number }[];
  toggleGoalDialog: () => void;
  visibleGoalDialog: boolean;
}

export const BetaBlitzContext = createContext<BetaBlitzCotextInterface>(
  {} as BetaBlitzCotextInterface
);

export const useBetaBlitzContext = () => useContext(BetaBlitzContext);
