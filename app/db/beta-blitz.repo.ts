import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("workoutdb.db");

const createTables = () => {
  db.transaction((tx) => {
    // tx.executeSql("DROP TABLE IF EXISTS workouts;");
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

export { db, createTables };
