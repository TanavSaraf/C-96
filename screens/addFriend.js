import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  TextInput,
  FlatList
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
//import { RFValue } from "react-native-responsive-fontsize";
//import * as Font from "expo-font";

export default class FeedRead extends React.Component {
  constructor(props) {
    super(props);
        this.state={
            allUsers:[],
      email: firebase.auth().currentUser.email,
    };
  }
  fetchUser = async () => {
    db.collection("user")
      .onSnapshot((snapshot)=>{
          var userSnapshot=snapshot.docs.map((doc)=>(doc.data()))
          console.log(userSnapshot)
          var temporary=[]
          userSnapshot.map((user)=>{
              if(user.email==this.state.email){
                  
              }else{
                  temporary.push(user)
              }
          })
                    this.setState({allUsers:temporary})
      })
  };
renderItem=({item,index})=>{return(
    <View>
        <Text>{item.firstName}</Text>
    </View>
)}
  componentDidMount() {
    //this.loadFontAsync();
    this.fetchUser();
  }
  
 render(){
     console.log(this.state.allUsers)
    return(<View>
        <FlatList
         data={this.state.allUsers}
         keyExtractor={(index)=>{return(index.toString())}}
         renderItem={this.renderItem}
         />
    </View>)
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
  text: { color: "black", fontSize: 30,},
  title: {
    fontFamily: "bubblegum-sans",
    fontSize: 20,
    color: "white",
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
  
});
