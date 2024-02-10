import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  HomeScreen: undefined;
  BetaBlitzScreen: undefined;
  //   Feed: { sort: "latest" | "top" } | undefined;
};

export type ScreenProps<S extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  S
>;
