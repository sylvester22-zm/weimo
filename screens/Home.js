
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator }    from '@react-navigation/native-stack';
import {View,StyleSheet,Text,Button } from 'react-native'
import Chats from './Tabs/Chats'
import Feeds from './Tabs/Feeds'
import Status from './Tabs/Status';

  var Home=({navigation})=> {
    const Tabs=createBottomTabNavigator();
    var backHome=()=>{
      console.log("pressed back")
      navigation.navigate('Otp')
    }
    var xhr=new XMLHttpRequest();
 var fakeApi=()=>{
   console.log("btton invoked")
 }
    
  
  return (
   <View style={styles.container}>
    
     
    <Tabs.Navigator 
    screenOptions={{
      tabBarStyle:{
        backgroundColor:'yellow',
        borderRadius:10
        
      },
     
    }}>
      
    <Tabs.Screen options={{
      tabBarLabel:'FEEDS',
     tabBarLabelStyle:{
      fontSize:15,
      color:'black'
      
     },
     headerShown:false
     
    }} name="Feeds"  component={Feeds}
  />
    <Tabs.Screen 
     options={{
      tabBarLabel:'CHATS',
     tabBarLabelStyle:{
      fontSize:15,
        },
        headerShown:false
      }}
    name="Chats" component={Chats} />
    <Tabs.Screen 
     options={{
      tabBarLabel:'STATUS',
     tabBarLabelStyle:{
      fontSize:15, 
     },
     headerShown:false
    }}
    name="Status" component={Status}/>

  </Tabs.Navigator>
  </View>
  )
}
const styles=StyleSheet.create({
  
  container:{
   margin:5,
   flex:1,
  },
 
})
export default Home;
