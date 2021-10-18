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
  TextInput
} from "react-native";
import db from "../config";
import firebase from 'firebase';
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
      lastName:'',
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
            firstName: user.firstName ,
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
  renderItem = ({ item, index }) => {
    return <StoryCard story={item} navigation={this.props.navigation} />;
  };
  render() {
    console.log(this.state.name)
    
    if (this.state.name !== "") {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          
          <TextInput
          style={styles.textInput}
          placeholder="First Name"
          value={this.state.firstName}
          multiline={true}
          onChangeText={(item) => {
            this.setState({ firstName: item });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          value={this.state.lastName}
          multiline={true}
          onChangeText={(item) => {
            this.setState({ lastName: item });
          }}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Age"
          value={this.state.age}
          onChangeText={(item) => {
            this.setState({ age: item });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="email"
          multiline={true}
          value={this.state.email}
          onChangeText={(item) => {
            this.setState({ email: item });
          }}
        />
        </View>
      );
    } else {
      return <View><Text>Loading the information :)</Text></View>;
  }
    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    borderWidth: 2,
    
    borderRadius: 20,
    margin: 10,
  },
  containerLT: {
    flex: 1,
    margin: 2,
    borderWidth: 2,
    backgroundColor: "grey",
    borderRadius: 20,
    margin: 10,
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    fontFamily: "bubblegum-sans",
    fontSize: 20,
    color: "white",
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    textAlign: "center",
  },
});
