import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {View,Text,
  Button,TextInput,FlatList,
  TouchableOpacity,StyleSheet} from 'react-native'
  

var  Inbox=({stompClient,route,navigation})=> {
 let user=route.params;
 //sending message button
 
  console.log(stompCl,"stompclient in inbox")
  return (
   <View style={styles.container}>
     <View style={styles.header}>
       <Icon onPress={()=>{
        navigation.navigate('Chats')
       }} style={styles.arroLeft} name='arrow-left' size={30} color='black'/>
       <Text style={styles.contact}>{user.withUser}</Text>
       <Icon style={styles.call} size={30} name='phone' color='black'/>
       <Icon style={styles.video} size={30}name='video-camera' color='black'/>
       <Icon style={styles.menu} size={30} name='ellipsis-v' color='black'/>

     </View>
     <View style={styles.chatView}>
     
     <View style={styles.messageFrom} >
                    <Text>me:::is simply dummy text of the printing and typesetting industry. 
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five </Text>
        <View style={styles.leftArrow}></View>
        <View style={styles.leftArrowOverlap}></View>
        </View>
        
   { /*Starting my messages*/}
   <View style={styles.messageMe} >
                    <Text>me:::is simply dummy text of the printing and typesetting industry. 
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five </Text>
        <View style={styles.rightArrow}></View>
        <View style={styles.rightArrowOverlap}></View>
        </View>
        <View style={styles.messageMe} >
                    <Text>me:::is simply dummy text of the printing and typesetting industry. 
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five </Text>
        <View style={styles.rightArrow}></View>
        <View style={styles.rightArrowOverlap}></View>
        </View>
        <View style={styles.messageMe} >
                    <Text>me:::is simply dummy text of the printing and typesetting industry. 
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five </Text>
        <View style={styles.rightArrow}></View>
        <View style={styles.rightArrowOverlap}></View>
        </View>
        <View style={styles.messageMe} >
                    <Text>me:::is simply dummy text of the printing and typesetting industry. 
       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five </Text>
        <View style={styles.rightArrow}></View>
        <View style={styles.rightArrowOverlap}></View>
        </View>
       <View style={styles.bottomHeader}>
       <TextInput multiline    style={styles.messageInput} placeholder='message'/>
       <TouchableOpacity style={styles.file}>
       <Icon name="file" size={25} color='black'/>
       </TouchableOpacity>
       
        <TouchableOpacity style={styles.send}>
        <Icon style={styles.arrowUp} 
        onPress={()=>{
          console.log("sendPressed")
        }}
        name="arrow-circle-up" size={35} color='grey'/>
        </TouchableOpacity>
        
       </View>
</View>

   
   </View>
  
  )
}

 const styles=StyleSheet.create({
   
  container:{
    flex:1,
    backgroundColor:'white'
  },
  header:{
    height:50,
    borderRadius:5,
    width:'100%',
    backgroundColor:'grey',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  arroLeft:{
    
  },
  contact:{
    fontSize:17,
    fontWeight:'bold'
  },
  call:{
  },
  video:{
  },
  menu:{
  },
    chatView:{
    backgroundColor:'white',
    flex:1,
    margin:8
  },
  leftArrow: {
    position: "absolute",
    backgroundColor: "grey",
    width: 30,
    height: 20,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -15
},

leftArrowOverlap: {
    position: "absolute",
    backgroundColor: "white",
    width: 20,
    height: 35,
    bottom: 0,
    borderBottomRightRadius:18,
    left: -20

},
rightArrow: {
  position: "absolute",
  backgroundColor: "grey",
  width: 30,
  height: 20,
  bottom: 0,
  borderBottomLeftRadius: 25,
  right: -15
},

rightArrowOverlap: {
  position: "absolute",
  backgroundColor: "white",
  width: 20,
  height: 35,
  bottom: 0,
  borderBottomLeftRadius:18,
  right: -20

},
  messageFrom:{
    backgroundColor: "grey",
    padding:10,
    borderRadius: 5,
    paddingBottom:5,
    marginTop: 5,
    marginLeft: "5%",
    maxWidth: '70%',
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
  messageMe:{
    backgroundColor: "grey",
    padding:10,
    borderRadius: 5,
    paddingBottom:5,
    marginTop: 5,
    marginRight: "5%",
    maxWidth: '70%',
    alignSelf: 'flex-end',
    borderRadius: 20,
  },
  bottomHeader:{
     height:120,
    position:'absolute',
    
     flexDirection:'row',
     width:'100%',
     bottom:0,
     borderRadius:5,
     padding3:3,
    alignItems:'center'  
    
  },
  messageInput:{
    backgroundColor:'white',
    width:250,
    paddingRight:3,
    
    borderColor:'black',
    fontSize:25,
    borderWidth:1,
    borderRadius:20,
    marginBottom:0,
    paddingBottom:0
  },
  file:{
    marginLeft:10
  },
  send:{
    borderRadius:25,
    marginLeft:20,
    width:45,
    height:45,
    backgroundColor:'black',
    alignItems:'center'
    
  },
  arrowUp:{

  }

 })
export default Inbox;
