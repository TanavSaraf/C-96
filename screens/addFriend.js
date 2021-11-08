import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
//import { RFValue } from "react-native-responsive-fontsize";
//import * as Font from "expo-font";

export default class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      docId: "",
      allUsers: [],
      email: firebase.auth().currentUser.email,
      searchValue: "",
    };
  }
  fetchUser = async () => {
    db.collection("user").onSnapshot((snapshot) => {
      var userSnapshot = snapshot.docs.map((doc) => doc.data());

      var temporary = [];
      userSnapshot.map((user) => {
        if (user.email == this.state.email) {
        } else {
          temporary.push(user);
        }
      });
      this.setState({ allUsers: temporary });
    });
  };
  fetchMyId = () => {
    db.collection("user")
      .where("email", "==", this.state.email)
      .get()
      .then((snapShot) => {
        snapShot.forEach((docs) => {
          var user = docs.data();
          this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            docId: docs.id,
          });
        });
      });
  };
  //requestee is the person sent to
  //requestor is u
  friendRequest = (requestee) => {
    var requestor = this.state.docId;
    var requestorName = this.state.firstName + "  " + this.state.lastName;
    db.collection("friendRequests").add({
      requestorId: requestor,
      requestorName: requestorName,
      requesteeId: requestee,
    });
  };
  renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.flatlistButton}
          onPress={() => {
            this.friendRequest(item.docId);
          }}
        >
          <View style={styles.flatlistCont}>
            <Text style={styles.flatlistName}>{item.firstName}</Text>
            <Text style={styles.flatlistName}>{item.lastName}</Text>
          </View>
          <Text>{}</Text>
          <Text>User Id:{item.docId}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  componentDidMount() {
    //this.loadFontAsync();
    this.fetchUser();
    this.fetchMyId();
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="Search for people by the id"
            style={styles.textInput}
            onChangeText={(item) => {
              this.setState({ searchValue: item });
            }}
          />
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => {
              db.collection("user")
                .where("docId", "==", this.state.searchValue)
                .onSnapshot((snapshot) => {
                  var userSnapshot = snapshot.docs.map((doc) => doc.data());

                  var temporary = [];
                  userSnapshot.map((user) => {
                    if (user.email == this.state.email) {
                    } else {
                      temporary.push(user);
                    }
                  });
                  this.setState({ allUsers: temporary });
                });
            }}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.allUsers}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={this.renderItem}
        />
        <View style={{ flexDirection: "row", bottom: 20,justifyContent:'space-around',}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("friendList");
            }}
            style={styles.fab}
          >
            <Image
              source={require("../assets/friends.png")}
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
    color: "white",
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    textAlign: "center",
  },
  fab: {
    width: 30,
    height: 30,
    borderRadius: 15,

    backgroundColor: "grey",
    borderWidth: 1,
    alignItems: "center",
  },

  buttons: {
    width: 70,
    height: 30,
    backgroundColor: "red",
    marginTop: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  flatlistButton: {
    width: "100%",
    height: 90,
    margin: 10,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  flatlistName: {
    fontSize: 30,
    color: "black",
    margin: 10,
    textAlign: "center",
  },
  textInput: {
    width: "80%",
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 2,
    fontSize: 20,
    marginTop: 37,
    textAlign: "center",
    alignSelf: "center",
  },
  flatlistCont: { flexDirection: "row" },
});
