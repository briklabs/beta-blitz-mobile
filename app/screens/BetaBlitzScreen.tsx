import React from "react";
import { ScreenProps } from "../utils/types";
import BetaBlitz from "../features/beta-blitz/BetaBlitz";

const BetaBlitzScreen = ({ navigation }: ScreenProps<"BetaBlitzScreen">) => {
  return <BetaBlitz />;
};

export default BetaBlitzScreen;
