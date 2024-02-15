import "../global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import BetaBlitzScreen from "./screens/BetaBlitzScreen";
import { RootStackParamList } from "./utils/types";
import { registerRootComponent } from "expo";
import { View } from "react-native";
import {
  Avatar,
  Button,
  IconButton,
  PaperProvider,
  Text,
} from "react-native-paper";

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <PaperProvider theme={{ dark: true }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerTitleAlign: "left",
              headerTitle: () => (
                <View className="flex flex-row flex-nowrap items-center">
                  <Button onPress={() => console.log("hello")}>
                    <Avatar.Image
                      size={36}
                      source={{
                        uri: "https://randomuser.me/api/portraits/men/36.jpg",
                      }}
                    />
                  </Button>
                  <View>
                    <Text variant="labelSmall">Welcome back!</Text>
                    <Text variant="labelMedium">Let's get moving 💪🏽</Text>
                  </View>
                </View>
              ),
              headerRight: () => (
                <IconButton
                  className="my-auto ml-auto"
                  icon="bell-outline"
                  onPress={() => console.log("hello")}
                />
              ),
              headerRightContainerStyle: {
                paddingRight: 20,
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
