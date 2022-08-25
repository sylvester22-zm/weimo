
import React,{useEffect,useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createNativeStackNavigator }    from '@react-navigation/native-stack';
import {View,StyleSheet,Text,Button,Image } from 'react-native'
import Chats from './Tabs/Chats'
import Feeds from './Tabs/Feeds'
import ContactList from './Tabs/ContactList';
import Settings from './Tabs/Settings';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';

  var Home=({data,payload,navigation})=> { 
    
/* 
    console.log("Home invoked",)
    useEffect(()=>{
           console.log()
    xhr.open('POST','http://10.0.2.2:8080/conversations',true)
    // xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
   xhr.setRequestHeader('Content-type','application/json')
     xhr.setRequestHeader("X-Requested-With","XMLHttpRequest") 
    xhr.send()
    },[data])
    console.log("Home inside data",data); */
  
//console.log("Home data",data)
//console.log("Home payload",payload)
  
PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  {
    'title': 'Contacts',
    'message': 'This app would like to view your contacts.',
    'buttonPositive': 'Please accept bare mortal'
  }
)

  
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
   
    {/* <Image style={{width: 100, height: 100}}
           source={require('./pic.png')}></Image> */}
    <Tabs.Navigator 
    screenOptions={{
      tabBarStyle:{
        backgroundColor:'grey',
        borderRadius:10
        
      },
     
    }}>
      
    {/* <Tabs.Screen options={{
      tabBarLabel:'Feeds',
     tabBarLabelStyle:{
      fontSize:10,
      color:'black',
      paddingBottom:2
      
     },
     tabBarIcon:()=>{
       return(
     <Icon name='home' size={30}/>)
    },
     headerShown:false
     
    }} name="Feeds"  component={Feeds}
  /> */}
    <Tabs.Screen 
     options={{
      tabBarLabel:'Chats',
     tabBarLabelStyle:{
      fontSize:10,
      color:'black',
      paddingBottom:2
        },
        tabBarIcon:()=>{
          return(
            <Icon name='comment' size={30}/>
          )
        },
        headerShown:false
      }}
    name="Chats">
      {props=><Chats {...props} data={data} payload={payload}/>}
     
     </Tabs.Screen>
    <Tabs.Screen 
     options={{
      tabBarLabel:'Contacts',
     tabBarLabelStyle:{
      fontSize:10, 
      color:'black',
      paddingBottom:2
     },
     tabBarIcon:()=>{
       return(
         <Icon name='user' size={25}/>
       )
     },
     headerShown:false
    }}
    name="ContactList" component={ContactList}/>
    <Tabs.Screen 
     options={{
      tabBarLabel:'Settings',
     tabBarLabelStyle:{
      fontSize:10, 
      color:'black',
      paddingBottom:2
     },
     tabBarIcon:()=>{
       return(
        <Icon name='ellipsis-h'  size={25}/>
       )
     },
     headerShown:false
    }}
    name="Settings" component={Settings}/>

  </Tabs.Navigator>
  </View>
  )
}
const styles=StyleSheet.create({
  
  container:{
   margin:1,
   flex:1,
   
  },
 
})
export default Home;
