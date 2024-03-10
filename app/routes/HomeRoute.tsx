import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { Avatar, Button, Card, Chip, Text, useTheme } from "react-native-paper";
import { getAllWorkouts } from "../db/beta-blitz.repo";
import { BetaBlitzType } from "../db/beta-blitz-validation";
import { format } from "date-fns";
import { HomeScreenProps } from "./types";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function BetaBlitzItem({ workout }: { workout: BetaBlitzType }) {
  const theme = useTheme();
  const completed = useMemo<number>(
    () => workout.completedRoutes?.reduce((prev, curr) => curr.value + prev, 0),
    [workout.completedRoutes]
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
      }}
    >
      <View>
        <Avatar.Icon
          size={36}
          icon="lightning-bolt"
          color={theme.colors.elevation.level5}
          style={{
            backgroundColor: workout.endTimestamp
              ? theme.colors.primary
              : theme.colors.tertiary,
          }}
        />
      </View>
      <View>
        <Chip compact selected={completed >= workout.goal} mode="outlined">
          {completed} / {workout.goal}
        </Chip>
      </View>
      <View>
        <Text variant="labelSmall">
          {format(workout.startTimestamp, "E P")}
        </Text>
        <Text>{format(workout.startTimestamp, "p")}</Text>
      </View>
    </View>
  );
}

const HomeRoute = ({ navigation }: HomeScreenProps) => {
  const [workouts, setWorkouts] = useState<BetaBlitzType[]>([]);

  useFocusEffect(() => {
    getAllWorkouts(setWorkouts);
  });

  const [showAll, setShowAll] = useState(false);
  const items = useMemo(
    () => (showAll ? workouts : workouts.slice(0, 3)),
    [showAll, workouts]
  );

  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }}>
      <Card>
        <Card.Title title="Latest Sessions" />
        <Card.Content>
          {items.map((w, i) => (
            <Button
              key={i}
              mode="outlined"
              style={{
                marginBottom: i === items.length - 1 ? 0 : 4,
              }}
              contentStyle={{
                height: 56,
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() =>
                navigation.navigate("Sessions", { workoutId: w.id })
              }
            >
              <BetaBlitzItem workout={w} />
            </Button>
          ))}
        </Card.Content>
        <Card.Actions>
          {!showAll && workouts.length > 4 && (
            <Button onPress={() => setShowAll(true)}>Show all</Button>
          )}
          <Button
            mode="contained-tonal"
            onPress={() =>
              navigation.navigate("Sessions", { workoutId: undefined })
            }
          >
            Start new session
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default HomeRoute;
