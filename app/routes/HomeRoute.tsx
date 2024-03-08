import React, { useMemo, useState } from "react";
import { ScrollView, DimensionValue, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Chip,
  IconButton,
  Text,
  useTheme,
} from "react-native-paper";
import { getAllWorkouts } from "../db/beta-blitz.service";
import { BetaBlitzType } from "../db/beta-blitz-validation";
import { format } from "date-fns";
import { HomeScreenProps } from "./types";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  const theme = useTheme();
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
                justifyContent: "center",
              }}
              contentStyle={{
                height: 56,
                alignItems: "stretch",
                justifyContent: "space-between",
              }}
              onPress={() =>
                navigation.navigate("Sessions", { workoutId: w.id })
              }
            >
              <View>
                <Avatar.Icon
                  size={36}
                  icon="lightning-bolt"
                  color={theme.colors.elevation.level5}
                />
              </View>
              <View style={{ paddingHorizontal: 12 }}>
                <Chip compact>Goal: {w.goal}</Chip>
              </View>
              <View>
                <Text variant="labelSmall">
                  {format(w.startTimestamp, "E P")}
                </Text>
                <Text>{format(w.startTimestamp, "p")}</Text>
              </View>
            </Button>
          ))}
        </Card.Content>
        <Card.Actions>
          {!showAll && workouts.length > 4 && (
            <Button onPress={() => setShowAll(true)}>Show all</Button>
          )}
          <Button
            mode="contained-tonal"
            onPress={() => navigation.jumpTo("Sessions")}
          >
            Start new session
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default HomeRoute;
