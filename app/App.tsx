import React, { useEffect } from "react";
import { registerRootComponent } from "expo";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import { BottomNavigation } from "react-native-paper";
import SettingsRoute from "./routes/SettingsRoute";
import BetaBlitzRoute from "./routes/BetaBlitzRoute";
import HomeRoute from "./routes/HomeRoute";
import { createTables } from "./db/beta-blitz.repo";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "beta-blitz",
      title: "Session",
      focusedIcon: "lightning-bolt",
    },
    {
      key: "settings",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    "beta-blitz": BetaBlitzRoute,
    settings: SettingsRoute,
  });

  // Initialize tables when the app starts
  useEffect(() => createTables(), []);

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
      <StatusBar style="light" />
    </PaperProvider>
  );
}

registerRootComponent(App);
