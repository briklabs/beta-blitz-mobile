import * as SQLite from "expo-sqlite";
import {
  BetaBlitzType,
  betaBlitzSchema,
  createBetaBlitzValidationSchema,
  updateBetaBlitzValidationSchema,
} from "./beta-blitz-validation";

const db = SQLite.openDatabase("workoutdb.db");

const dropTables = () => {
  db.transaction((tx) => {
    console.log("create db");
    tx.executeSql("DROP TABLE IF EXISTS workouts;");
  });
  createTables();
};

const createTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS workouts (" +
        "id INTEGER PRIMARY KEY, " +
        "goal INTEGER, " +
        "completedRoutes TEXT, " +
        "startTimestamp TEXT, " +
        "endTimestamp TEXT);"
    );
  });
};

const createWorkout = (
  goal: number,
  callback: (workout: BetaBlitzType) => void
) => {
  const workout = createBetaBlitzValidationSchema.parse({
    goal,
    startTimestamp: new Date(),
  });

  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO workouts (goal, startTimestamp) VALUES (?, ?);",
      [workout.goal, workout.startTimestamp],
      (_, { insertId }) => {
        if (insertId)
          callback(
            betaBlitzSchema.parse({
              ...workout,
              id: insertId,
              completedRoutes: null,
              endTimestamp: null,
            })
          );
      },
      (err) => {
        console.error("dang", JSON.stringify(err, null, 2));
        return false;
      }
    );
  });
};

const getAllWorkouts = (callback: (workouts: BetaBlitzType[]) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM workouts ORDER BY startTimestamp DESC LIMIT 3;",
      [],
      (_, { rows }) => {
        try {
          const workouts = rows._array.map((w) => betaBlitzSchema.parse(w));
          callback(workouts);
        } catch (error) {
          console.error(error);
        }
      }
    );
  });
};

const getWorkoutById = (
  id: number,
  callback: (workout: BetaBlitzType | null) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM workouts WHERE id = ?;",
      [id],
      (_, { rows }) => {
        if (rows.length > 0) {
          const workout = rows.item(0);
          callback(betaBlitzSchema.parse(workout));
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
const updateWorkout = (
  workoutId: number,
  payload: Partial<BetaBlitzType>,
  callback: () => void
) => {
  const { goal, completedRoutes, endTimestamp } =
    updateBetaBlitzValidationSchema.parse(payload);

  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE workouts SET goal = ?, completedRoutes = ?, endTimestamp = ? WHERE id = ?;",
      [goal, completedRoutes, endTimestamp, workoutId],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return callback();
        throw new Error(`unable to update id ${payload.id}`);
      },
      (err) => {
        console.error(err);
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

export {
  db,
  dropTables,
  createTables,
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};
