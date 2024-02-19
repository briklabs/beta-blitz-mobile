import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BetaBlitzScreen from "./screens/BetaBlitzScreen";
import { RootStackParamList } from "./utils/types";
import { registerRootComponent } from "expo";
import {
  PaperProvider,
  MD3DarkTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator<RootStackParamList>();
const { DarkTheme } = adaptNavigationTheme({
  reactNavigationDark: DefaultTheme,
});

function App() {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <StatusBar animated backgroundColor="#61dafb" />
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator initialRouteName="BetaBlitzScreen">
          <Stack.Screen
            name="BetaBlitzScreen"
            component={BetaBlitzScreen}
            options={{ title: "Beta Blitz v1.0" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

registerRootComponent(App);
