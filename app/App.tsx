import "../global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import WorkoutCalculator from "./screens/WorkoutCalculator";
import { RootStackParamList } from "./utils/types";
import { StatusBar } from "expo-status-bar";
import { registerRootComponent } from "expo";

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="WorkoutCalculator"
          component={WorkoutCalculator}
          options={{ title: "Workout" }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

registerRootComponent(App);
