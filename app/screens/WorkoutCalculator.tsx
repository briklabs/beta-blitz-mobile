import React, { useEffect, useMemo, useState } from "react";
import { View, Button, Text, Modal, Alert } from "react-native";
import { ScreenProps } from "../utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";

const WorkoutCalculator = ({
  navigation,
}: ScreenProps<"WorkoutCalculator">) => {
  const [goal, setGoal] = useState<number>(0);
  const [completedRoutes, setCompletedRoutes] = useState<number[]>([]);
  const total = useMemo(
    () => completedRoutes.reduce((prev, curr) => curr + prev, 0),
    [completedRoutes]
  );

  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "V0/V1", value: 1 },
    { label: "V2", value: 2 },
    { label: "V3", value: 3 },
    { label: "V4", value: 4 },
    { label: "V5", value: 5 },
  ]);

  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const storedGoal = await AsyncStorage.getItem("goal");
        const storedCompletedRoutes = await AsyncStorage.getItem(
          "completedRoutes"
        );

        if (storedGoal !== null) {
          setGoal(Number(storedGoal));
        }

        if (storedCompletedRoutes !== null) {
          setCompletedRoutes(JSON.parse(storedCompletedRoutes));
        }
      } catch (error) {
        console.error("Error loading persisted data:", error);
      }
    };

    loadPersistedData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("goal", goal.toString());
        await AsyncStorage.setItem(
          "completedRoutes",
          JSON.stringify(completedRoutes)
        );
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };

    saveData();
  }, [goal, completedRoutes]);

  const [askReset, setAskReset] = useState(true);
  useEffect(() => {
    if (askReset && goal && total >= goal) {
      Alert.alert(
        "Goal achieved!",
        "Do you want to restart?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setAskReset(false),
          },
          { text: "OK", onPress: resetCalculator },
        ],
        { cancelable: true }
      );
    }
  }, [goal, total]);

  const addRoute = () => {
    if (!value || isNaN(value)) return;
    setCompletedRoutes((completed) => [...completed, value]);
    setIsPickerVisible(false);
  };

  const removeLastRoute = () => {
    setCompletedRoutes((completed) => completed.slice(0, -1));
  };

  const resetCalculator = () => {
    setCompletedRoutes([]);
    setAskReset(true);
  };

  const goToHomeScreen = () => {
    navigation.navigate("HomeScreen");
  };

  const setNewGoal = () => {
    Alert.prompt(
      "Enter Goal",
      "Set a new goal for your workout:",
      (text) => {
        const newGoal = parseInt(text, 10);
        if (!isNaN(newGoal) && newGoal > 0) {
          setGoal(newGoal);
          resetCalculator();
        } else {
          Alert.alert(
            "Invalid Goal",
            "Please enter a valid positive number as the goal."
          );
        }
      },
      "plain-text",
      "",
      "numeric"
    );
  };

  const disableBtn = useMemo(() => goal <= 0, []);
  const disableAddBtn = useMemo(() => disableBtn || !value, []);

  return (
    <View className="flex-1 flex-col p-8 gap-4">
      <View className="flex-1 items-center flex-col justify-center gap-4">
        <Text
          className={`text-[12rem] font-black ${
            goal && total >= goal ? "text-lime-500" : ""
          }`}
        >
          {total}
        </Text>
        <Text>{`Total Score: ${total} out of ${goal}`}</Text>
        <Button title="Set New Goal" onPress={setNewGoal} />
      </View>
      <View className="w-64 mx-auto">
        <DropDownPicker
          open={isPickerVisible}
          value={value}
          items={items}
          placeholder="Select route"
          setOpen={setIsPickerVisible}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <View className="flex-row justify-center gap-2">
        <Button title="Add" disabled={disableAddBtn} onPress={addRoute} />
        <Button
          title="Remove"
          disabled={disableBtn}
          onPress={removeLastRoute}
        />
        <Button title="Reset" disabled={disableBtn} onPress={resetCalculator} />
      </View>
    </View>
  );
};

export default WorkoutCalculator;
