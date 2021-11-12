import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./screens/signIn";
import Profile from "./screens/profile";
import AddFriends from "./screens/addFriend";
import Requests from "./screens/requestScreens";
import Friends from "./screens/friendList";
import {createDrawerNavigator} from 'react-navigation-drawer'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
export default function App() {
  return <AppContainer />;
}
var DrawerNav= createDrawerNavigator({
  profile: { screen: Profile },
  addFriends: { screen: AddFriends },
  friendList: { screen: Friends },
  requests:{screen:Requests},
})
var SwitchNav = createSwitchNavigator({
  signIn: { screen: SignIn },
  home:{screen:DrawerNav}
});

var AppContainer = createAppContainer(SwitchNav);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
