import React, { Component } from 'react';
import {Alert,RefreshControl,TouchableOpacity,AppRegistry,Button,TouchableNativeFeedback,BackAndroid,ToolbarAndroid,StyleSheet,Text,SwitchAndroid,View,Image,TextInput,ScrollView,Navigator,ListView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import TimerMixin from 'react-timer-mixin';

REQUEST_URL = 'http://jaivikfood.com/test/';
REQUEST_URL2 = 'http://192.168.1.8:8080/test/text.php';
var TouchableElement = TouchableNativeFeedback;
const defpic = require("./default-image.png");
const background = require("./login/login1_bg.png");

var quantity= [];

class Add extends React.Component {
constructor(props) {
    super(props);
    this.x=this.props.food.index; 
    this.state = {  q:0,
    };
  }

additem = () => {
  console.log(this.x);
  quantity[this.x]++;
   this.setState({q:quantity[this.x]});
  console.log("you pressed",quantity[this.x]);
}
reduceitem = () => {
  console.log(this.x);
  if(quantity[this.x]>0)
  quantity[this.x]--;
   this.setState({q:quantity[this.x]});
  console.log("you pressed",quantity[this.x]);
}
render() {
   return(<View style={styles.add}>
          <Button 
          int={this.props.food.index}
          onPress={this.additem}
          title="  +  "
          color="#795548"
          />
           <Text style={styles.quantity}>{this.state.q}</Text>
          <Button
          onPress={this.reduceitem}
          title="   -  "
          color="#795548"
          />
     </View>
   );
}}

var _done=0;

class Food extends React.Component {
 constructor(props) {
    super(props); 
    this.state = {
     dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) =>  response.json())
      .then((responseData) => {
        //console.log(responseData);
        _done=1; 
        responseData.food.forEach(function(e) {
          quantity[e.index]=0;
        }, this);
        
        this.setState({
          foods:responseData.food,
          dataSource: this.state.dataSource.cloneWithRows(responseData.food),
          loaded: true,
        });
      }).done();
 TimerMixin.setInterval(()=>{if(_done==0){console.log(_done);console.log("--login---");this.fetchData();}},5000)
      {

      }
  }
  
  orderpage(){
    
      this.props.navigator.push({name: "Order", food:this.state.foods, quantity:quantity})
  }
   render() {
     
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.main}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderfood}
        style={styles.listView}
         />
             <TouchableOpacity activeOpacity={.5} onPress={() =>this.orderpage()} >
              <View style={styles.button} >
                <Text style={styles.buttonText}>  Checkout  </Text>
              </View>
            </TouchableOpacity>
         
      </View>
    );
  }
  renderLoadingView() {
    return (
      <View style={styles.container} >
        <Text>
          Loading fruits and veggies...
        </Text> 
      </View>
    );
  }
  

  renderfood(fruit) {
   if(!fruit.picture){
fruit.picture="./default-image.png";
   }
    return (
      <View style={styles.container}>
        <Image
          source={{uri: fruit.picture}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{fruit.name}</Text>
          <Text style={styles.year}>Rs.{fruit.price}</Text>
          <Text style={styles.year}>{fruit.weight} Kg</Text>
          
     </View>
          <Add food={fruit}/>
     
      </View>
    );
  }

}

var styles = StyleSheet.create({
  add:{
    flex: 1,
    flexDirection: 'row',
    
  },quantity:{
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  },main:{
    flex: 1,
    backgroundColor: '#388E3C', 
  },
   button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    
  },buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  
 container:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    
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
    backgroundColor: '#F5FCFF',
  },
});

module.exports=Food;