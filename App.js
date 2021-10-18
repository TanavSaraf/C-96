import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./screens/signIn";
import Profile from "./screens/profile";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
export default function App() {
  return <AppContainer />;
}
var switchNav = createSwitchNavigator({
  signIn: { screen: SignIn },
  profile: { screen: Profile },
});
var AppContainer = createAppContainer(switchNav);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
