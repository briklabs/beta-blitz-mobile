import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { ScreenProps } from "../utils/types";
import BetaBlitz from "../features/beta-blitz/BetaBlitz";
import { useBetaBlitzContext } from "../features/beta-blitz/BetaBlitzContext";
import { Avatar, Icon, Text, useTheme } from "react-native-paper";

function WorkoutProgress() {
  const { total, goal } = useBetaBlitzContext();
  const subtitle = total
    ? `${goal - total} route points to go, let's go!`
    : "Time attack route counter";

  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderWidth: 1,
        borderRadius: theme.roundness,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ gap: 2 }}>
        <Text variant="headlineSmall">Beta Blitz</Text>
        <Text>{subtitle}</Text>
      </View>
      {total ? (
        <Avatar.Text size={60} label={String(total)} />
      ) : (
        <Icon source="lightning-bolt" size={48} color={theme.colors.tertiary} />
      )}
    </View>
  );
}

const HomeScreen = ({ navigation }: ScreenProps<"HomeScreen">) => {
  return (
    <View>
      <ScrollView>
        <View style={{ padding: 4 }}>
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
