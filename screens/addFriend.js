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
      allUsers: [],
      email: firebase.auth().currentUser.email,
      searchValue: "",
    };
  }
  fetchUser = async () => {
    db.collection("user").onSnapshot((snapshot) => {
      var userSnapshot = snapshot.docs.map((doc) => doc.data());
      console.log(userSnapshot);
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
  renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={styles.flatlistButton} onPress={() => {}}>
          <View style={styles.flatlistCont}>
            <Text style={styles.flatlistName}>{item.firstName}</Text>
            <Text style={styles.flatlistName}>{item.lastName}</Text>
          </View>
          <Text>User Id:{item.docId}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  componentDidMount() {
    //this.loadFontAsync();
    this.fetchUser();
  }

  render() {
    console.log(this.state.allUsers);
    return (
      <View>
        <View style={{flexDirection:'row'}}>
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
              db.collection(user)
                .where("docId", "==", this.state.searchValue)
                .get()
                .then(({data})=>{var person=data
                console.log(person)});
            }}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('friendList')}} style={styles.fab}>
          <Image source={require('../assets/addFriends.PNG')} style={{height:20,width:20}}/>
          </TouchableOpacity>
           <TouchableOpacity onPress={()=>{this.props.navigation.navigate('profile')}} style={styles.fab}>
            <Image source={require('../assets/profile.PNG')} style={{height:20,width:20}}/>
          </TouchableOpacity>
          
        <FlatList
          data={this.state.allUsers}
          keyExtractor={(index) => {
            return index.toString();
          }}
          renderItem={this.renderItem}
        />
       
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
    /*position:"absolute",
    top:20,
    right:50,
    */
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
