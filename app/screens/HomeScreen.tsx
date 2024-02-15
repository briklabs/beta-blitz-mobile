import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { ScreenProps } from "../utils/types";
import colors from "tailwindcss/colors";
import BetaBlitz from "../features/beta-blitz/BetaBlitz";
import { useBetaBlitzContext } from "../features/beta-blitz/BetaBlitzContext";
import { Avatar, Icon, Text } from "react-native-paper";

function WorkoutProgress() {
  const { total, goal } = useBetaBlitzContext();
  const subtitle = total
    ? `${goal - total} route points to go, let's go!`
    : "Time attack route counter";
  return (
    <View className="flex-row justify-between items-center flex-1 p-4 border rounded-xl">
      <View className="gap-2">
        <Text variant="headlineSmall">Beta Blitz</Text>
        <Text>{subtitle}</Text>
      </View>
      {total ? (
        <Avatar.Text size={60} label={String(total)} />
      ) : (
        <Icon source="lightning-bolt" size={48} color={colors.yellow[400]} />
      )}
    </View>
  );
}

const HomeScreen = ({ navigation }: ScreenProps<"HomeScreen">) => {
  return (
    <View className="flex-1">
      <ScrollView>
        <View className="p-4">
          <BetaBlitz>
            <Pressable onPress={() => navigation.navigate("BetaBlitzScreen")}>
              <WorkoutProgress />
            </Pressable>
          </BetaBlitz>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
