import { useEffect, useMemo, useState } from "react";
import { useBetaBlitzContext } from "./BetaBlitzContext";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

export default function BetaBlitzGoalDialog() {
  const { goal, setGoal, toggleGoalDialog, visibleGoalDialog } =
    useBetaBlitzContext();
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
    setGoal(parseInt(value));
    toggleGoalDialog();
  }

  return (
    <Portal>
      <Dialog visible={visibleGoalDialog} onDismiss={toggleGoalDialog}>
        <Dialog.Title>Update Goal</Dialog.Title>
        <Dialog.Content>
          <Text style={{ marginBottom: 4 }}>
            Enter the number of points you want to achieve today. By default,
            the value is 20.
          </Text>
          <TextInput
            value={value}
            label="Set Goal"
            inputMode="numeric"
            onChangeText={handleChangeText}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={toggleGoalDialog}>CANCEL</Button>
          <Button onPress={handleConfirm}>CONFIRM</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
