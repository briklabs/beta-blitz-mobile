import React from "react";
import { registerRootComponent } from "expo";
import SettingsRoute from "./routes/SettingsRoute";
import BetaBlitzRoute from "./routes/BetaBlitzRoute";
import HomeRoute from "./routes/HomeRoute";
import { PaperProvider, MD3DarkTheme, Icon } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";

const Tab = createMaterialBottomTabNavigator();

function App() {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeRoute as any}
            options={{
              tabBarIcon: () => <Icon source="home-outline" size={24} />,
            }}
          />
          <Tab.Screen
            name="Sessions"
            component={BetaBlitzRoute as any}
            options={{
              tabBarIcon: () => <Icon source="lightning-bolt" size={24} />,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsRoute}
            options={{
              tabBarIcon: () => <Icon source="cog-outline" size={24} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

registerRootComponent(App);
