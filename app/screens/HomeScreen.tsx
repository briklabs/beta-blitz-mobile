import React from "react";
import { View, Pressable, ScrollView, Text } from "react-native";
import { ScreenProps } from "../utils/types";
import { Avatar, Button, Icon } from "@rneui/themed";

function WorkoutProgress() {
  return (
    <View className="flex-row justify-between items-center flex-1 p-4">
      <View className="gap-2">
        <Text className="text-white text-xl font-medium">Workout Progress</Text>
        <Text className="text-neutral-400">12 Exercises left</Text>
      </View>
      <Avatar
        size={60}
        rounded
        title="14"
        containerStyle={{ borderColor: "#f44344", borderWidth: 4 }}
      />
    </View>
  );
}

const HomeScreen = ({ navigation }: ScreenProps<"HomeScreen">) => {
  return (
    <View className="flex-1">
      <ScrollView>
        <View className="p-4">
          <Button
            title={<WorkoutProgress />}
            buttonStyle={{
              borderRadius: 20,
              backgroundColor: "#111",
            }}
            onPress={() => navigation.navigate("WorkoutCalculator")}
          />
        </View>
      </ScrollView>
      <View className="flex-row py-6 justify-evenly gap-8 bg-white">
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
