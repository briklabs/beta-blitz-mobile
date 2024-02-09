import React from "react";
import { View, Button, Text, Pressable, ScrollView } from "react-native";
import { ScreenProps } from "../utils/types";
import { Icon } from "@rneui/themed";

const HomeScreen = ({ navigation }: ScreenProps<"HomeScreen">) => {
  return (
    <View className="flex-1">
      <ScrollView>
        <Button
          title="Go to Workout Calculator"
          onPress={() => navigation.navigate("WorkoutCalculator")}
        />
      </ScrollView>
      <View className="flex-row py-8 justify-evenly gap-8 bg-white">
        <Pressable>
          <Icon name="home" type="feather" />
        </Pressable>
        <Pressable>
          <Icon name="weight-lifter" type="material-community" />
        </Pressable>
        <Pressable>
          <Icon name="settings" type="feather" />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
