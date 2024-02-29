import React, { useState } from "react";
import { View } from "react-native";
import { ScreenProps } from "../utils/types";
import { Button } from "react-native-paper";

const HomeScreen = ({ navigation }: ScreenProps<"HomeScreen">) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
      }}
    >
      <Button
        mode="contained"
        onPress={() => navigation.push("BetaBlitzScreen")}
        icon="lightning-bolt"
      >
        Start
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.push("GettingStartedScreen")}
        icon="flag"
      >
        Getting Started
      </Button>
    </View>
  );
};

export default HomeScreen;
