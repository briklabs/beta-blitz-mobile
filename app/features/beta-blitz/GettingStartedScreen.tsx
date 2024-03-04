import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

const GettingStartedScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ gap: 24, padding: 24 }}>
      <Text variant="headlineLarge">🏁 Getting Started</Text>
      <Text variant="titleLarge">1. 🕒 Tap "Start"</Text>
      <View style={{ gap: 8, paddingLeft: 8 }}>
        <Text>
          - When you're ready to climb, simply tap the "Start" button.
        </Text>
        <Text>- The stopwatch will begin, tracking your climbing session.</Text>
      </View>
      <Text variant="titleLarge">2. 🌟 Select a Route:</Text>
      <View style={{ gap: 8, paddingLeft: 8 }}>
        <Text>- After completing a climbing route, tap on it to select.</Text>
        <Text>- Choose the difficulty level or set your own.</Text>
      </View>
      <Text variant="titleLarge">3. 🧗 Tap "Add":</Text>
      <View style={{ gap: 8, paddingLeft: 8 }}>
        <Text>- Tap the "Add" button to record your completed route.</Text>
        <Text>- Keep adding routes until you achieve your session goal.</Text>
      </View>
      <Text variant="titleLarge">4. 🏁 Finish Session:</Text>
      <View style={{ gap: 8, paddingLeft: 8 }}>
        <Text>- When your climbing session is complete, tap "Finish."</Text>
        <Text>- Your session details are saved for future reference.</Text>
      </View>
      <Text variant="bodyLarge">
        That's it! Start climbing, add routes, and conquer your climbing goals
        with Beta Blitz! 🚀🚀🚀
      </Text>
    </ScrollView>
  );
};

export default GettingStartedScreen;
