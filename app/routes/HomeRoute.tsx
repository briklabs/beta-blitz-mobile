import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";
import { NavProps } from "./types";
import { getAllWorkouts } from "../db/beta-blitz.service";
import { BetaBlitzType } from "../db/beta-blitz-validation";
import { format } from "date-fns";

const HomeRoute = ({ jumpTo }: NavProps) => {
  const [workouts, setWorkouts] = useState<BetaBlitzType[]>([]);

  useEffect(() => {
    const fetchWorkouts = () => {
      getAllWorkouts((allWorkouts) => {
        setWorkouts([...allWorkouts]);
      });
    };

    fetchWorkouts();
  }, []);

  return (
    <View>
      <Card>
        <Card.Title title="Past Sessions" />
        <Card.Content>
          {workouts.map((w, i) => (
            <Button
              key={i}
              mode="contained-tonal"
              style={{
                marginBottom: 2,
              }}
            >
              <Text>Beta Blitz — </Text>
              <Text variant="labelSmall">{format(w.startTimestamp, "P")}</Text>
            </Button>
          ))}
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => jumpTo("beta-blitz")}>
            Start new session
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default HomeRoute;
