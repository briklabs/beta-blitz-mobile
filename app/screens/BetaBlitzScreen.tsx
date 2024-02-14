import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { ScreenProps } from "../utils/types";
import useRouteCounter from "../features/useBetaBlitz";
import { Button, Icon, Input, Dialog } from "@rneui/themed";

function GoalDialog({
  goal,
  visible,
  toggle,
  handleSetGoal,
}: {
  goal: number;
  handleSetGoal: (value: string) => void;
  visible: boolean;
  toggle: () => void;
}) {
  const [value, setValue] = useState(String(goal));
  useEffect(() => {
    setValue(String(goal));
  }, [goal]);

  const errorMessage = useMemo(() => {
    if (!value) return "Goal must be more than 0";
    if (isNaN(Number(value))) return "Goal must be an integer";
    return "";
  }, [value]);

  function handleChangeText(str: string) {
    if (!str || isNaN(parseInt(str, 0))) {
      setValue("");
      return;
    }
    const num = parseInt(str, 0);
    if (num < 0) {
      setValue(() => String(num * -1));
      return;
    }
    setValue(() => String(num));
  }

  function handleConfirm() {
    handleSetGoal(value);
    toggle();
  }

  return (
    <Dialog isVisible={visible} onBackdropPress={toggle}>
      <Dialog.Title title="Start new session" />
      <Text className="mb-4">
        Enter the number of points you want to achieve today. By default, the
        value is 20.
      </Text>
      <Input
        value={value}
        label="Set Goal"
        keyboardType="number-pad"
        onChangeText={handleChangeText}
        errorMessage={errorMessage}
      />
      <Dialog.Actions>
        <Dialog.Button title="CONFIRM" onPress={handleConfirm} />
        <Dialog.Button title="CANCEL" onPress={toggle} />
      </Dialog.Actions>
    </Dialog>
  );
}

const BetaBlitzScreen = ({ navigation }: ScreenProps<"BetaBlitzScreen">) => {
  const [value, setValue] = useState(0);
  const items = [
    { label: "V0/V1", value: 1 },
    { label: "V2", value: 2 },
    { label: "V3", value: 3 },
    { label: "V4", value: 4 },
    { label: "V5", value: 5 },
    { label: "V6", value: 6 },
    { label: "V7", value: 7 },
    { label: "V8", value: 8 },
    { label: "V9", value: 9 },
  ];

  const {
    goal,
    total,
    resetCalculator,
    setGoal,
    removeRouteByIndex,
    addRoute,
    completedRoutes,
    stopwatch,
  } = useRouteCounter();
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

  const [visibleGoalDialog, setVisibleGoalDialog] = useState(false);
  function toggleGoalDialog() {
    setVisibleGoalDialog((bool) => !bool);
  }

  return (
    <View className="flex-1 flex-col p-4 gap-4">
      <View className="flex-1 gap-4">
        <View className=" bg-white rounded p-4 grid grid-cols-2 gap-4 h-48">
          <View className=" items-center justify-center">
            <Text className=" text-6xl py-8">{total}</Text>
            <Text>{`Total Score: ${total} out of ${goal}`}</Text>
            <Button
              title="Update Goal"
              onPress={toggleGoalDialog}
              type="clear"
              size="sm"
            />
          </View>
          <View>
            <Text>Breakdown</Text>
            <ScrollView className=" divide-y">
              {completedRoutes.map((cr, i) => (
                <View
                  className="flex-row justify-between items-center py-1"
                  key={i}
                >
                  <Text>{cr} points</Text>
                  <Button
                    type="clear"
                    icon={
                      <Icon
                        name="trash"
                        type="feather"
                        size={12}
                        onPress={() => removeRouteByIndex(i)}
                      />
                    }
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        <View className=" grid grid-cols-2 gap-4">
          <View className=" bg-white rounded p-4">
            <Text>Timer</Text>
            <Text>{stopwatch}</Text>
          </View>
          <View className=" bg-white rounded p-4">
            <Text>Hardest Route</Text>
            <Text>
              {completedRoutes.length && Math.max(...completedRoutes)}
            </Text>
          </View>
        </View>
        <View className="bg-white rounded p-4 h-96">
          <Text>Completed Routes</Text>
          <ScrollView>
            {completedRoutes.map((cr, i) => (
              <View
                className="flex-row justify-between items-center py-1"
                key={i}
              >
                <Text>{cr} points</Text>
                <Button
                  type="clear"
                  icon={
                    <Icon
                      name="trash"
                      type="feather"
                      size={12}
                      onPress={() => removeRouteByIndex(i)}
                    />
                  }
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <View className="bg-white p-4 rounded gap-2">
        <View className=" flex-row gap-2 overflow-auto">
          {items.map((route, i) => (
            <Button
              key={i}
              title={route.label}
              size="lg"
              type={value === route.value ? "solid" : "outline"}
              onPress={() => setValue(route.value)}
            />
          ))}
        </View>
        {goal && total >= goal ? (
          <Button
            size="lg"
            radius={60}
            title={"Restart"}
            color="secondary"
            onPress={() => resetCalculator()}
          />
        ) : (
          <Button
            size="lg"
            radius={60}
            title={"Add"}
            disabled={!value}
            onPress={() => addRoute(value)}
          />
        )}
      </View>
      <GoalDialog
        visible={visibleGoalDialog}
        goal={goal}
        handleSetGoal={(value) => setGoal(parseInt(value))}
        toggle={toggleGoalDialog}
      />
    </View>
  );
};

export default BetaBlitzScreen;
