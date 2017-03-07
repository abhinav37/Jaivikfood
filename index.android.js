import React, { Component } from 'react';
import {StatusBar,AppRegistry,AsyncStorage,BackAndroid,RefreshControl,ToolbarAndroid,StyleSheet,Text,SwitchAndroid,View,Image,TextInput,ScrollView,Navigator,ListView } from 'react-native';
import TimerMixin from 'react-timer-mixin';
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

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FadeAndroid;
//
/*
var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // Make it snap back really quickly after canceling pop
  snapVelocity: 8,
  // Make it so we can drag anywhere on the screen
  edgeHitWidth: SCREEN_WIDTH,
});
//*/
var CustomSceneConfig = Object.assign({}, BaseConfig, {
 /* // A very tighly wound spring will make this transition fast
  springTension: 100,
  springFriction: 1,
  // Use our custom gesture defined above
  gestures: {
    pop: CustomLeftToRightGesture,
  }*/
});


/*-----------------------------------------------------------------------

                  AwesomeProject starts here

------------------------------------------------------------------------*/

class AwesomeProject extends Component {
  initroute={name:"Login"};
 constructor(props) {
   
    super(props); 
    this.state = {
      loaded:false,
    };
    
    this.login_s();
    
  }

renderScene(route, navigator) {
  _navigator = navigator;
  
   if(route.name == 'Load') {
      return (
      <View style={styles.container} >
        <Text>
          Loading ...
        </Text> 
      </View>
      )
   }
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
    console.log("Orders exe");
    return (
       <View navigator={navigator} style={{flex: 1}}>
      
        <ToolbarAndroid
          actions={[]}
          navIcon={nativeImageSource({
            android: 'android_back_white',
            width: 96,
            height: 96,
          })}
          onIconClicked={navigator.pop}
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
async login_s() {
    console.log("login activated");
   // console.log( this.state.password + this.state.username );
    try 
    { //
      await AsyncStorage.clear();
       
        const value = await AsyncStorage.getItem('@login:username');
        if (value !== null)
        {
          this.initroute={ name: 'List' };
          console.log(value);
            
        }
       TimerMixin.setTimeout(()=>{ this.setState({loaded:true});},1000);
        
    }catch(error) {
      // Error retrieving data
    }
}

_configureScene(route) {
    return CustomSceneConfig;
  }
renderLoadingView() {
    return (
      <View style={styles.container} >
        <Text>
          Loading ...
        </Text> 
      </View>
    );
  }

  render() {
    
     if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    
    return (

            <View style={{flex: 1}}>
       <StatusBar
     backgroundColor="#388E3C"
     barStyle="light-content"
    /> 
              <Navigator
              style={{ flex:1 }}
              initialRoute={this.initroute}
              renderScene={ this.renderScene } 
               configureScene={this._configureScene}
              />            
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
    backgroundColor: '#FFFFFF',
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
  empt:{
    height:0,
    width:0,
  },
});
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
