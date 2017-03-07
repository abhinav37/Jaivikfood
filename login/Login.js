import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  AsyncStorage 
} from 'react-native';


var Userinfo=null;
const { width, height } = Dimensions.get("window");

const background = require("./login1_bg.png");
const mark = require("./login1_mark.png");
const lockIcon = require("./login1_lock.png");
const personIcon = require("./login1_person.png");
var saveusrinfo= async function(responseData){
  try
  {/*
    await AsyncStorage.setItem('@login:username', this.state.username );
    await AsyncStorage.setItem('@login:password',this.state.password );
    console.log(" saving data");
    const value = await AsyncStorage.getItem('@login:username');
    
    if (value !== null)
    {
      console.log(value);
    }*/

  }
  catch (error)
  {
  console.log("Error saving data");
  }


}
class LoginScreen extends Component {
  constructor(props) {
    
    super(props); 
    this.state={
      username:null,
      password:null,
      cred_check:false,
      
      };
     
  }

 cred_checker(username,password){
  
  if(username!=null && password!=null)
  { 
  return true;
  }
  else
  {  Alert.alert('Login Error',"Please fill out the fields",[{text: 'OK'}]); 
  return false;}
}

 log(username,password) {
  
  fetch('http://jaivikfood.com/test2/' ,{
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    'username': username,
    'password': password,
    })
  }).then((response)  => response.json()).then((responseData)=>{
    
    if(responseData.login==true)
    {
      Alert.alert('Logged In',"Welcome "+responseData.data.first_name+" "+responseData.data.last_name,[{text: 'OK', onPress: () => console.log('OK Pressed')}]);
      //saveusrinfo(responseData);
      console.log("state set");
    this.setState({
          cred_check:true,
        });    
    }
    else
    {
      Alert.alert('Login Failed',"Incorrect Username or Password",[{text: 'OK', onPress: () => console.log('OK Pressed')}]);
    }
  }).catch((error) => {
    console.error(error);
  });
  
}
  
   
async login() {


if(this.cred_checker(this.state.username,this.state.password))
  this.log(this.state.username,this.state.password);
    if(this.state.cred_check){
            try
            {
                await AsyncStorage.setItem('@login:username', this.state.username );
                await AsyncStorage.setItem('@login:password',this.state.password );
                  console.log(" saving data");
         const value = await AsyncStorage.getItem('@login:username');
        if (value !== null)
        {
         
          console.log(value);
        }
        
         }
            catch (error)
            {
               console.log("Error saving data");
            }
            this.props.navigator.pop();
            this.props.navigator.push({name: "List"})
}}

signup(){
            this.props.navigator.push({name: "signup"});
}

  render() {
    
    return (
      <View style={styles.container}>
            <Image source={background} style={styles.background} resizeMode="stretch" >  
          <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          <Text style={styles.Logotext}>JaivikFood</Text>
          <Text style={styles.Logosubtext}>Hop on to Organic. Bit by Bit, Bite by Bite</Text>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholder="Username" 
                placeholderTextColor="#FFF"
                style={styles.input} 
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholderTextColor="#FFF"
                placeholder="Password" 
                style={styles.input} 
                secureTextEntry 

                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
            </View>
           <TouchableOpacity activeOpacity={.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} onPress={() =>this.login()} >
              <View style={styles.button} >
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity activeOpacity={.5} onPress={()=>this.signup()}>
                <View>
                  <Text style={styles.signupLinkText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'rgba(0,0,0,0)',
    flex: 1,
    height:null,
    width:null,
  },Logotext:{
    fontSize: 50,
    marginBottom: 8,
    textAlign: 'center',
    color:"#00CF6B",
  },
  Logosubtext:{
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    color:"#FFF",
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    flex: 1,
width: null,
height: null,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: null,
    color:"#FFF",
    fontSize:20,
  },
  button: {
    backgroundColor: "#388E3C",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
    fontSize: 18,
    
  }
});
module.exports=LoginScreen;