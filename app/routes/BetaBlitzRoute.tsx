import React, { useEffect, useState } from "react";
import BetaBlitz from "../features/beta-blitz/BetaBlitz";
import { SessionsScreenProps } from "./types";
import { useFocusEffect } from "@react-navigation/native";
import {
  createWorkout,
  deleteWorkout,
  getWorkoutById,
  updateWorkout,
} from "../db/beta-blitz.repo";
import { BetaBlitzType } from "../db/beta-blitz-validation";
import { Alert, Platform, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import { createTables } from "../db/beta-blitz.repo";

const BetaBlitzRoute = ({ route, navigation }: SessionsScreenProps) => {
  useEffect(() => createTables(), []);
  const [workout, setWorkout] = useState<BetaBlitzType | null>(null);

  const { workoutId } = route.params ?? {};
  useEffect(() => {
    if (workoutId) {
      getWorkoutById(workoutId, (w) => setWorkout(w));
      return;
    }
  }, [workoutId]);

  const startSession = () => {
    createWorkout(20, (w) => {
      console.log("start session", w);
      setWorkout(w);
    });
  };

  function handleWorkoutUpdate(payload: BetaBlitzType) {
    if (!workout) return;
    updateWorkout(
      payload.id,
      {
        completedRoutes: payload.completedRoutes,
        endTimestamp: payload.endTimestamp,
        goal: payload.goal,
      },
      () => {
        console.log("update confirmed");
        setWorkout({
          ...workout,
          ...payload,
        });
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
    setWorkout(null);
    navigation.jumpTo("Home");
  }

  function handleDelete() {
    if (!workout) return;
    deleteWorkout(workout.id, handleClose);
  }

  function handleEnd() {
    if (!workout) return handleClose();

    if (!workout?.endTimestamp) {
      const endTimestamp = new Date();
      updateWorkout(
        workout.id,
        {
          completedRoutes: workout.completedRoutes,
          endTimestamp,
          goal: workout.goal,
        },
        () => {
          console.log("closed");
          setWorkout({
            ...workout,
            endTimestamp,
          });
        }
      );
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      {workout ? (
        <BetaBlitz
          workout={workout}
          onUpdateWorkout={handleWorkoutUpdate}
          onReset={handleReset}
          onClose={handleClose}
          onEnd={handleEnd}
          onDelete={handleDelete}
        />
      ) : (
        <Button
          mode="contained"
          onPress={startSession}
          icon="lightning-bolt"
          style={{ alignSelf: "center" }}
        >
          Start
        </Button>
      )}
    </SafeAreaView>
  );
};

export default BetaBlitzRoute;
