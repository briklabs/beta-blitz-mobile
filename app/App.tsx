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

const Stack = createStackNavigator<RootStackParamList>();
const { DarkTheme } = adaptNavigationTheme({
  reactNavigationDark: DefaultTheme,
});

function App() {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator initialRouteName="BetaBlitzScreen">
          <Stack.Screen
            name="BetaBlitzScreen"
            component={BetaBlitzScreen}
            options={{ title: "Beta Blitz" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

registerRootComponent(App);
