
import React from 'react'
import {View,Text,Button,Image,StyleSheet,
  TouchableOpacity,FlatList} from 'react-native'
import {useState,useEffect} from 'react'

const Chats = ({navigation}) => {
    
  var chatWith=(withUser)=>{
    console.log("pressed",withUser)
    navigation.navigate('Inbox',{withUser:withUser})

  }

   var users=[
    {  "id": 1,  "username": "Bret",  "phone": "1-770-736-8031 x56442", },
    { "id": 2,"username": "Antonette",     "phone": "010-692-6593 x09125",  },
    {   "id": 4,   "username": "Karianne",   "phone": "493-170-9623 x156",},
    {   "id": 5,   "username": "Kamren",   "phone": "(254)954-1289", },
    {  "id": 6,  "username": "Leopoldo_Corkery",  "phone": "1-477-935-8478 x6430" },
    {  "id": 7,  "username": "Elwyn.Skiles",   "phone": "210.067.6132", },
    {  "id": 8,  "username": "Maxime_Nienow",  "phone": "586.493.6943 x140", },
    {  "id": 9,  "username": "Delphine",  "phone": "(775)976-6794 x41206",  },
    {  "id": 10,  "username": "Moriah.Stanton",
      "phone": "024-648-3804",
    }
  ]
  var these='';
 
   console.log(users,"data")


  return (
   <View style={styles.container}>
    
     <View style={styles.secView}>
   
      <FlatList 
      data={users} renderItem={({item})=>(
        <TouchableOpacity  onPress={()=>{chatWith(item.username)}}>
        <View style={styles.userList}>
          <Image  style={styles.image}
           source={require('./pic.png')}></Image> 
          <Text style={styles.user}> {item.username}</Text>
          <Text style={styles.message}>The message sen...</Text>
          <Text style={styles.lastText}>Last texted</Text>
            </View>
            </TouchableOpacity>
      )}/>
     </View>
   </View>
  )
}
const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'grey'
    },
    secView:{
      margin:5,
    backgroundColor:'green'
    },
    userList:{
      color:'white',
      flexDirection:'row'
    },
    lastText:{
      paddingTop:13,
      color:'white',
      position:'absolute',
      marginLeft:255
    },
    image:{
      height:60,
      width:60,
      margin:7,
      borderRadius:30
    },
    message:{
      color:'black',
      paddingTop:43,
      position:'absolute',
      paddingLeft:88
    },
    user:{
      height:60,
      color:'white',
      paddingTop:15,
      paddingLeft:10
    }
})
export default Chats
