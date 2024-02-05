import React from "react";
import { View, Button, Text } from "react-native";
import { ScreenProps } from "../utils/types";

const HomeScreen = ({ navigation }: ScreenProps<"HomeScreen">) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Button
        title="Go to Workout Calculator"
        onPress={() => navigation.navigate("WorkoutCalculator")}
      />
    </View>
  );
};

export default HomeScreen;
