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
      <View style={{ flex: 1, padding: 8, gap: 8 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <View
            style={{ flexDirection: "row", padding: 8, gap: 8, height: 160 }}
          >
            <BetaBlitzProgress />
            <BetaBlitzBreakdown />
          </View>
          <View style={{ gap: 4, flexDirection: "row" }}>
            <BetaBlitzStopwatch />
            <BetaBlitzHardestRoute />
          </View>
          <BetaBlitzCompletedRoutes />
        </View>
        <View style={{ padding: 4, gap: 8 }}>
          <BetaBlitzRouteOptions />
          <BetaBlitzActions />
        </View>
        <BetaBlitzGoalDialog />
      </View>
    </BetaBlitz>
  );
};

export default BetaBlitzScreen;
