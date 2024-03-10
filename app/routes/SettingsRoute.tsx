import React from "react";
import { SafeAreaView } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { dropTables } from "../db/beta-blitz.repo";

export default function SettingsRoute() {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ gap: 4 }}>
      <Card>
        <Card.Title title="Settings" />
        <Card.Content>
          <Text variant="bodyMedium">
            In case you need to clean your history, use the button below to drop
            all data.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained-tonal"
            onPress={dropTables}
            buttonColor={theme.colors.error}
            textColor={theme.colors.errorContainer}
          >
            Clear workout sessions
          </Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
}
