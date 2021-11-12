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
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      docId: "",
      allUsers: [],
      allUsers2: [],
      email: firebase.auth().currentUser.email,
      searchValue: "",
    };
  }
  fetchUser = async () => {
    db.collection("friendList")
      .where("requesteeId", "==", this.state.email)
      .onSnapshot((snapshot) => {
        var userSnapshot = snapshot.docs.map((doc) => doc.data());

        var temporary = [];
        userSnapshot.map((user) => {
          if (user.email == this.state.email) {
          } else {
            temporary.push(user);
          }
        });
        this.setState({allUsers:[...this.state.allUsers, ...temporary]});
      });

      db.collection("friendList")
      .where("requestorId", "==", this.state.email)
      .onSnapshot((snapshot) => {
        var userSnapshot = snapshot.docs.map((doc) => doc.data());

        var temporary = [];
        userSnapshot.map((user) => {
          if (user.email == this.state.email) {
          } else {
            temporary.push(user);
          }
        });
        this.setState({ allUsers:[...this.state.allUsers, ...temporary] });
      });
  };
  
  renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.flatlistButton}
          onPress={() => {
            this.friendRequest(item.email);
          }}
        >
          <View style={styles.flatlistCont}>
            <Text style={styles.flatlistName}>{item.firstName}</Text>
            <Text style={styles.flatlistName}>{item.lastName}</Text>
          </View>
          <Text>{}</Text>
          <Text>User Id:{item.email}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  componentDidMount(){
    this.fetchUser()
  }
  render() {
    return <View style={{ flex: 1 }}>
      <FlatList
          data={this.state.allUsers}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={this.renderItem}
        />
    </View>;
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
