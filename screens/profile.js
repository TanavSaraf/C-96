import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  Switch,
  Image,
  TextInput,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
//import { RFValue } from "react-native-responsive-fontsize";
//import * as Font from "expo-font";

export default class FeedRead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      lightTheme: false,
      profileImage: "",
      firstName: "",
      lastName: "",
      age: "",
      email: firebase.auth().currentUser.email,
      docId: "",
    };
  }
  fetchUser = async () => {
    db.collection("user")
      .where("email", "==", this.state.email)
      .get()
      .then((snapShot) => {
        snapShot.forEach((docs) => {
          var user = docs.data();
          this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            docId: docs.id,
          });
        });
      });
  };

  componentDidMount() {
    //this.loadFontAsync();
    this.fetchUser();
  }
  render() {
    console.log(this.state.docId);

    if (this.state.name !== "") {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <View  >
            <Text style={styles.text}>First Name:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="First Name"
              value={this.state.firstName}
              multiline={true}
              onChangeText={(item) => {
                this.setState({ firstName: item });
              }}
            />
          </View>
          <View  >
            <Text style={styles.text}>Last Name:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Last Name"
              value={this.state.lastName}
              multiline={true}
              onChangeText={(item) => {
                this.setState({ lastName: item });
              }}
            />
          </View>

          <View  >
            <Text style={styles.text}>Age:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Age"
              value={this.state.age}
              multiline={true}
              onChangeText={(item) => {
                this.setState({ age: item });
              }}
            />
          </View>
          <View  >
            <Text style={styles.text}>email:{this.state.email}</Text>
          </View>
          <TouchableOpacity
          style={styles.buttons}
            onPress={() => {
              db.collection("user").doc(this.state.docId).update({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                age: this.state.age,
                docId: this.state.docId,
              });
            }}
          >
            <Text>Save Changes</Text>
          </TouchableOpacity>
          
        </View>
      );
    } else {
      return (
        <View>
          <Text>Loading the information :)</Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    position:'relative',
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
    borderRadius:2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
