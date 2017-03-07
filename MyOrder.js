import React, { Component, PropTypes } from 'react';
import {Alert,TouchableOpacity,RefreshControl,AppRegistry,Button,TouchableNativeFeedback,BackAndroid,ToolbarAndroid,StyleSheet,Text,SwitchAndroid,View,Image,TextInput,ScrollView,Navigator,ListView } from 'react-native';
var quantity=[];
var total=0;
REQUEST_URL2 = 'http://192.168.1.8:8080/test/text.php';
class MyOrder extends Component {
constructor(props) {
    super(props); 
    this.state = {
     dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      empty:false,
      
    };
   
  }
 
 myorders(){
   quantity=this.props.quantity;
   unfoods=this.props.food;
   food=[];
   i=0;
   unfoods.forEach(function(e) {

          if(quantity[e.index]!=0)
          {
            food[i]=e;
            i++;
            total+=e.price*quantity[e.index];
          }
        }, this);

    this.setState({
          
          dataSource: this.state.dataSource.cloneWithRows(food),
          
        });
  if(food[0]==null)
  {
    this.setState({
          
          empty:true,
          
        });
  }       
 }

    //<Quan food={fruit}/>
 componentDidMount() {
    total=0;
    this.myorders();
  }
  renderfood(fruit) {
   
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
        <View style={styles.rightContainer}>
          <Text style={styles.year}>{quantity[fruit.index]}</Text>
     </View>  
        <View style={styles.rightContainer}>
          <Text style={styles.year}>Rs.{fruit.price*quantity[fruit.index]}</Text>
          
          
     </View>
      
     
      </View>
    );
  }

  render() {
    

/*

*/   
if (this.state.empty) {
      return this.renderemptyView();
    }

    return (
      <View style={styles.main}>
   
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderfood}
        style={styles.listView}
         />
         <Text style={styles.total}>Total: {total}</Text>
         
                  <TouchableOpacity activeOpacity={.5} onPress={() =>submit()} >
              <View style={styles.button} >
                <Text style={styles.buttonText}>   Submit your Order  </Text>
              </View>
            </TouchableOpacity>
     
      </View>
    )
  }

renderemptyView(){
   
    return (
      <View style={styles.add}>
         <Text style={styles.empty}>No orders!! Pls add items and then proceed to checkout</Text>
   
         
         
                  <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigator.pop()} >
              <View style={styles.button} >
                <Text style={styles.buttonText}>         Go back         </Text>
              </View>
            </TouchableOpacity>
     
      </View>
    )
  }


}

const submit = () => {
  console.log("okay");
  fetch(REQUEST_URL2, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    orders: quantity
  })
  }).then((response) => response.text()).then((responseData)=>{
            
            Alert.alert(
            'Your Order',
            responseData,
            [
              {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )
      }).done(console.log("complete"));
}

var styles = StyleSheet.create({
  add:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
 
  },empty:{
    
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
 
  },
  total:{
    paddingVertical:20,
    textAlign: 'center',
     justifyContent: "center",
    color: "#FFF",
    fontSize: 18,
    backgroundColor:"#795548",
  },
  quantity:{
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  },main:{
    flex: 1,
    backgroundColor: '#388E3C', 
 
 },
  Button:{color:"#795548"},
 container:{
    flex: 1,
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    
  },button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    
  },buttonText: {
    color: "#FFF",
    fontSize: 18,
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

module.exports= MyOrder;