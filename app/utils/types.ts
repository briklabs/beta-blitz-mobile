import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  HomeScreen: undefined;
  WorkoutCalculator: undefined;
  //   Feed: { sort: "latest" | "top" } | undefined;
};

export type ScreenProps<S extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  S
>;
