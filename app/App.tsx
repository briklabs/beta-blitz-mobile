import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import BetaBlitzScreen from "./screens/BetaBlitzScreen";
import { RootStackParamList } from "./utils/types";
import { registerRootComponent } from "expo";
import { Pressable, View } from "react-native";
import {
  Avatar,
  IconButton,
  PaperProvider,
  Text,
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
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerTitleAlign: "left",
              headerTitle: () => (
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Pressable onPress={() => console.log("hello")}>
                    <Avatar.Image
                      size={36}
                      source={{
                        uri: "https://randomuser.me/api/portraits/men/36.jpg",
                      }}
                    />
                  </Pressable>
                  <View>
                    <Text variant="labelSmall">Welcome back!</Text>
                    <Text variant="labelMedium">Let's get moving 💪🏽</Text>
                  </View>
                </View>
              ),
              headerRight: () => (
                <IconButton
                  style={{ marginVertical: "auto", marginLeft: "auto" }}
                  icon="bell-outline"
                  onPress={() => console.log("hello")}
                />
              ),
              headerRightContainerStyle: {
                paddingRight: 0,
              },
            }}
          />
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
