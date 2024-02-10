import React from "react";
import { View, Pressable, ScrollView, Text } from "react-native";
import { ScreenProps } from "../utils/types";
import { Avatar, Button, Icon } from "@rneui/themed";
import useBetaBlitz from "../features/useBetaBlitz";
import colors from "tailwindcss/colors";

function WorkoutProgress() {
  const { total, goal } = useBetaBlitz();
  const subtitle = total
    ? `${total - goal} route points left`
    : "Time attack route counter";
  return (
    <View className="flex-row justify-between items-center flex-1 p-4">
      <View className="gap-2">
        <Text className="text-white text-xl font-medium">Beta Blitz</Text>
        <Text className="text-neutral-400">{subtitle}</Text>
      </View>
      {total ? (
        <Avatar
          size={60}
          rounded
          title={String(total)}
          containerStyle={{ borderColor: colors.amber[400], borderWidth: 4 }}
        />
      ) : (
        <Icon name="zap" type="feather" color={colors.yellow[400]} />
      )}
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
            onPress={() => navigation.navigate("BetaBlitzScreen")}
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
