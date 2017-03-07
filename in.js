import React, { Component } from 'react';
import {AppRegistry,BackAndroid,RefreshControl,ToolbarAndroid,StyleSheet,Text,SwitchAndroid,View,Image,TextInput,ScrollView,Navigator,ListView } from 'react-native';

var SideMenu = require('react-native-side-menu');
var nativeImageSource = require('nativeImageSource');


//*/

var Food = require('./Food');
var LoginScreen = require('./login/Login');
var MyOrder = require('./MyOrder');
var Signup = require('./signup/Signup');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});



/*-----------------------------------------------------------------------

                  AwesomeProject starts here

------------------------------------------------------------------------*/

class AwesomeProject extends Component {
 constructor(props) {
    super(props); 
    this.state = {
    };
  }
renderScene(route, navigator) {
  _navigator = navigator;
   if(route.name == 'Login') {
     return <LoginScreen navigator={navigator}/>
   }
   if(route.name == 'signup') {
     return <Signup navigator={navigator}/>
   }
   if(route.name == 'List') {
     console.log("list activated");
     return (
       <View navigator={navigator} style={{flex: 1}}>
      
        <ToolbarAndroid
          actions={[]}
          navIcon={nativeImageSource({
            android: 'android_back_white',
            width: 96,
            height: 96,
          })}
         // onIconClicked={navigator.pop}
          style={styles.toolbar}
          titleColor="white"
          title="JaivikFood"/>
        <Food
          style={{flex: 1}}
          navigator={navigator}
         />
      </View>);
   }
   if(route.name == 'Order') {
    console.log("Orders");
    return (
       <View navigator={navigator} style={{flex: 1}}>
      
        <ToolbarAndroid
          actions={[]}
          navIcon={nativeImageSource({
            android: 'android_back_white',
            width: 96,
            height: 96,
          })}
         // onIconClicked={navigator.pop}
          style={styles.toolbar}
          titleColor="white"
          title="My Order"/>
        <MyOrder
          style={{flex: 1}}
          navigator={navigator}
        food={route.food}
        quantity={route.quantity}
         />
      </View>);

  }

}  
  render() {
    
    var initialRoute = {name: 'list'};
    return (
            <View style={{flex: 1}}>
              <Navigator
              style={{ flex:1 }}
              initialRoute={{ name: 'Login' }}
              renderScene={ this.renderScene } />            
            </View>/*//
   <Navigator
                style={styles.container}
                initialRoute={initialRoute}
                configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                renderScene={RouteMapper}
                />           /*
      <View style={{flex: 1}}>
      
        <ToolbarAndroid
          actions={[]}
          navIcon={nativeImageSource({
            android: 'android_back_white',
            width: 96,
            height: 96
          })}
         // onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="white"
          title="JaivikFood"/>
        <Food
          style={{flex: 1}}
        //  navigator={navigationOperations}
         />
      </View>//*/
    );
  }


}

var styles = StyleSheet.create({
 toolbar: {
    backgroundColor: '#00822b',
    height: 56,
  },container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B2DFDB',
  },
   thumbnail: {
  marginLeft:40,
    width: 100,
    height:100,
  },rightContainer: {
    flex: 1,
  },title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
