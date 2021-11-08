import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Friends extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginTop:70,
            flexDirection: "row",
            bottom: 20,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("addFriends");
            }}
            style={styles.fab}
          >
            <Image
              source={require("../assets/addFriends.png")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("profile");
            }}
            style={styles.fab}
          >
            <Image
              source={require("../assets/profile.png")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    margin: 2,
    borderWidth: 2,
    borderRadius: 20,
  },

  /*containerLT: {
      flex: 1,
      margin: 2,
      borderWidth: 2,
      backgroundColor: "grey",
      borderRadius: 20,
      margin: 10,
    },*/
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: { color: "black", fontSize: 30 },
  title: {
    fontFamily: "bubblegum-sans",
    fontSize: 20,
    color: "black",
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    textAlign: "center",
  },
  textInput: {
    width: "80%",
    paddingVertical: 2,
    borderRadius: 10,
    borderColor: "blue",
    borderBottomWidth: 2,
    fontSize: 30,
    marginTop: 10,
    textAlign: "center",
    alignSelf: "flex-end",
  },
  fab: {
    width: 30,
    height: 30,
    borderRadius: 15,
    /*position:"absolute",
      top:20,
      right:50,
      */
    backgroundColor: "grey",
    borderWidth: 1,
    alignItems: "center",
  },
  buttons: {
    width: 90,
    height: 30,
    backgroundColor: "red",
    margin: 10,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
