import { db } from "./beta-blitz.repo";
import {
  BetaBlitzType,
  betaBlitzSchema,
  createBetaBlitzValidationSchema,
} from "./beta-blitz-validation";

const createWorkout = (goal: number, callback: (workoutId: number) => void) => {
  const workout = {
    goal,
    startTimestamp: new Date(),
  };

  createBetaBlitzValidationSchema.parse(workout);

  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO workouts (goal, startTimestamp) VALUES (?, ?);",
      [goal, workout.startTimestamp.toISOString()],
      (_, { insertId }) => {
        if (insertId) callback(insertId);
      }
    );
  });
};

const getAllWorkouts = (callback: (workouts: BetaBlitzType[]) => void) => {
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM workouts;", [], (_, { rows }) => {
      try {
        const workouts = rows._array.map((w) => betaBlitzSchema.parse(w));
        callback(workouts);
      } catch (error) {
        console.error(error);
      }
    });
  });
};

const getWorkoutById = (id: number, callback: (workout: any) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM workouts WHERE id = ?;",
      [id],
      (_, { rows }) => {
        if (rows.length > 0) {
          const workout = rows.item(0);
          workout.completedRoutes = JSON.parse(workout.completedRoutes);
          callback(workout);
        } else {
          callback(null); // Workout not found
        }
      },
      (_, err) => {
        console.error("SQLite Error:", err);
        return false;
      }
    );
  });
};

const deleteWorkout = (id: number, callback: (bool: boolean) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM workouts WHERE id = ?;",
      [id],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          callback(true); // Workout deleted successfully
        } else {
          callback(false); // No workout found with the given id
        }
      },
      (_, err) => {
        console.error("SQLite Error:", err);
        return false;
      }
    );
  });
};

export { createWorkout, getAllWorkouts, getWorkoutById, deleteWorkout };
