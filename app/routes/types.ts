import { MaterialBottomTabScreenProps } from "react-native-paper";

export type TabNavParamList = {
  Home: undefined;
  Sessions: { workoutId: number } | undefined;
  Settings: undefined;
};

export type HomeScreenProps = MaterialBottomTabScreenProps<
  TabNavParamList,
  "Home"
>;
export type SessionsScreenProps = MaterialBottomTabScreenProps<
  TabNavParamList,
  "Sessions"
>;
export type SettingsScreenProps = MaterialBottomTabScreenProps<
  TabNavParamList,
  "Settings"
>;
