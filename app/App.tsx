import "../global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import WorkoutCalculator from "./screens/WorkoutCalculator";
import { RootStackParamList } from "./utils/types";
import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Avatar, Header, Icon } from "@rneui/themed";
import { Pressable, Text, View } from "react-native";

const Stack = createStackNavigator<RootStackParamList>();

function AppHeader() {
  return <Header />;
}

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerStyle: {
                height: 120,
              },
              headerTitleAlign: "left",
              headerTitle: () => (
                <View className="flex flex-row gap-4 flex-nowrap">
                  <Pressable
                    onPress={() => console.log("hello")}
                    className="shrink"
                  >
                    <Avatar
                      size={32}
                      rounded
                      source={{
                        uri: "https://randomuser.me/api/portraits/men/36.jpg",
                      }}
                    />
                  </Pressable>
                  <View>
                    <Text className=" text-xs text-neutral-400">
                      Welcome back!
                    </Text>
                    <Text className=" text-sm font-semibold">
                      Let's get moving 💪🏽
                    </Text>
                  </View>
                </View>
              ),
              headerRight: () => (
                <Pressable onPress={() => console.log("hello")}>
                  <Icon name="bell" type="feather" />
                </Pressable>
              ),
              headerRightContainerStyle: {
                paddingRight: 20,
              },
            }}
          />
          <Stack.Screen
            name="WorkoutCalculator"
            component={WorkoutCalculator}
            options={{ title: "Workout" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
