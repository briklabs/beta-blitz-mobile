import React, { useEffect, useState } from "react";
import BetaBlitz from "../features/beta-blitz/BetaBlitz";
import { SessionsScreenProps } from "./types";
import { useFocusEffect } from "@react-navigation/native";
import {
  createWorkout,
  getWorkoutById,
  updateWorkout,
} from "../db/beta-blitz.service";
import { BetaBlitzType } from "../db/beta-blitz-validation";
import { Alert, Platform, SafeAreaView, View } from "react-native";
import { Button } from "react-native-paper";
import { createTables } from "../db/beta-blitz.repo";

const BetaBlitzRoute = ({ route, navigation }: SessionsScreenProps) => {
  useEffect(() => createTables(), []);
  const [workout, setWorkout] = useState<BetaBlitzType | null>(null);

  useFocusEffect(() => {
    if (route.params?.workoutId) {
      getWorkoutById(route.params?.workoutId, (w) => setWorkout(w));
    }
  });

  const startSession = () => {
    createWorkout(20, (w) => setWorkout(w));
  };

  function handleWorkoutUpdate(payload: BetaBlitzType) {
    updateWorkout(
      payload.id,
      {
        completedRoutes: payload.completedRoutes,
        endTimestamp: payload.endTimestamp,
        goal: payload.goal,
      },
      (response) => {
        console.log("update confirmed", response);
        setWorkout(workout);
      }
    );
  }

  const [askReset, setAskReset] = useState(true);
  function handleReset() {
    if (Platform.OS === "web") {
      const result = confirm("Do you want to restart?");
      result ? startSession() : setAskReset(false);
    } else {
      Alert.alert(
        "Goal achieved!",
        "Do you want to restart?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setAskReset(false),
          },
          { text: "OK", onPress: startSession },
        ],
        { cancelable: true }
      );
    }
  }

  function handleClose() {
    console.log("hi");
    // if (!workout) {
    //   navigation.jumpTo("Home");
    //   return;
    // }

    // if (!workout?.endTimestamp) {
    //   updateWorkout(
    //     workout.id,
    //     {
    //       completedRoutes: workout.completedRoutes,
    //       endTimestamp: new Date(),
    //       goal: workout.goal,
    //     },
    //     (response) => {
    //       console.log("closed", response);
    //       navigation.jumpTo("Home");
    //     }
    //   );
    // }
    navigation.jumpTo("Home");
  }

  if (workout)
    return (
      <SafeAreaView>
        <BetaBlitz
          workout={workout}
          onUpdateWorkout={handleWorkoutUpdate}
          onReset={handleReset}
          onClose={handleClose}
        />
      </SafeAreaView>
    );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button mode="contained" onPress={startSession} icon="lightning-bolt">
        Start
      </Button>
    </View>
  );
};

export default BetaBlitzRoute;
