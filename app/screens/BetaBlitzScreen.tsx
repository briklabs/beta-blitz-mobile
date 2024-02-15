import React from "react";
import { ScreenProps } from "../utils/types";
import BetaBlitz from "../features/beta-blitz/BetaBlitz";
import BetaBlitzRouteOptions from "../features/beta-blitz/BetaBlitzRouteOptions";
import { View } from "react-native";
import BetaBlitzProgress from "../features/beta-blitz/BetaBlitzProgress";
import BetaBlitzBreakdown from "../features/beta-blitz/BetaBlitzBreakdown";
import BetaBlitzStopwatch from "../features/beta-blitz/BetaBlitzStopwatch";
import BetaBlitzHardestRoute from "../features/beta-blitz/BetaBlitzHardestRoute";
import BetaBlitzCompletedRoutes from "../features/beta-blitz/BetaBlitzCompletedRoutes";
import BetaBlitzActions from "../features/beta-blitz/BetaBlitzActions";
import BetaBlitzGoalDialog from "../features/beta-blitz/BetaBlitzGoalDialog";

const BetaBlitzScreen = ({ navigation }: ScreenProps<"BetaBlitzScreen">) => {
  return (
    <BetaBlitz>
      <View className="flex-1 flex-col p-4 gap-4">
        <View className="flex-1 gap-4">
          <View className="flex-row bg-white rounded p-4 gap-4 h-48">
            <BetaBlitzProgress />
            <BetaBlitzBreakdown />
          </View>
          <View className="gap-4 flex-row">
            <BetaBlitzStopwatch />
            <BetaBlitzHardestRoute />
          </View>
          <BetaBlitzCompletedRoutes />
        </View>
        <View className="bg-white p-4 rounded gap-2">
          <BetaBlitzRouteOptions />
          <BetaBlitzActions />
        </View>
        <BetaBlitzGoalDialog />
      </View>
    </BetaBlitz>
  );
};

export default BetaBlitzScreen;
