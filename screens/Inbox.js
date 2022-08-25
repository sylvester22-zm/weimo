import React,{ useState ,memo,useEffect,useRef} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {View,Text,Image,
  Button,TextInput,FlatList,SafeAreaView,
  TouchableOpacity,StyleSheet} from 'react-native'
  import {List,ListItem} from 'react-native-elements'
var  Inbox=(({xhr,data,stompClient,payload,route,navigation})=> {
  var [data,setData]=React.useState([]);
  var [message,setMessage]=React.useState('')
  var [newmessage,setnewMessage]=React.useState('')
  var [conversation,setConversation]=React.useState();
  var text=React.createRef()
 
 let contact=route.params;
 var username=contact.toUser;
 var number='';

  console.log("new in inbox in inbox",payload)
 
  contact.phone.forEach(c=>{
  number=c.number
  number = number.replace(/[^+\d]+/g, "");
  
})  


  useEffect(()=>{
 var request = new XMLHttpRequest();
 request.onreadystatechange = (e) => {
   if (request.readyState !== 4) {
     return;
   }
 
   if (request.status === 200) {
    if(request.response){
    var data=JSON.parse(request.response)
    setData(data)
    }
     //console.log('success inbox', request.responseText);
   } else {
     console.warn('error in inbox',xhr.status);
   }
 };
 request.open('POST', 'http://10.0.2.2:8080/conversation/'+number,true);
request.send();
    
 },[]) 
 
    
var  messageInput=(message)=>{
  setMessage(message)
}
var sendMessage=()=>{
  var headers;
  var id;//Math.floor(Math.random()*1000)+30;
  let payload={
    'id':id,
    'username':number,
   'message':message,
   'isSender':true,
   'seen':false
  } 
    data.push(payload)
 
     stompClient.send('/app/chat.private.'+number,headers={'persistent':true},JSON.stringify(payload)); 
     console.log("after sending==>",payload)
    text.current.clear();
    setMessage('')
   
    return;
}

console.log("delivered",payload)
   var renderItem=({item})=>(
    
    <View style={styles.chatView} key={item.id}>
     {!item.isSender?(
    <View style={styles.messageFrom}>
    <Text style={styles.message}>{item.message}</Text>
       <View style={styles.leftArrow}></View>
       <View style={styles.leftArrowOverlap}></View>
       </View> ):(
<View style={styles.messageMe} >
            <Text style={styles.message}>{item.message}</Text>                    
    <View style={styles.rightArrow}></View>
    <View style={styles.rightArrowOverlap}></View>  
    </View>)}  
</View>   

)

  //console.log(conversation,"to username in inbox")
  return (
   <SafeAreaView style={styles.Maincontainer}>
    
     <View style={styles.header}>
       <Icon onPress={()=>{
        navigation.navigate('Chats')
       }} style={styles.arroLeft} name='arrow-left' size={30} color='black'/>
       <Text style={styles.contact}>{number}</Text>
      
       <Icon style={styles.call} size={30} name='phone' color='black'/>
       <Icon style={styles.video} size={30}name='video-camera' color='black'/>
       <Icon style={styles.menu} size={30} name='ellipsis-v' color='black'/>
       
  
     </View> 
    
     
 
     <View style={styles.chatContent}>
      <FlatList   data={[...data].reverse()} inverted={1}
     extraData={data} renderItem={renderItem}/> 
         
     <View style={styles.bottomHeader}>
   
<TextInput multiline={true}  ref={text} 
  onChangeText={messageInput} value={message} style={styles.messageInput} placeholder='type message...'/>

  <TouchableOpacity style={styles.file}>
  <Icon name="paperclip" size={35} color='black'/>
  </TouchableOpacity>
  
   <TouchableOpacity style={styles.send}>
   <Icon style={styles.arrowUp} 
   onPress={sendMessage}
   name="arrow-circle-up" size={35} color='grey'/>
   </TouchableOpacity>
 
</View> 
  </View>
   </SafeAreaView>
    
  
  )
})

 const styles=StyleSheet.create({
   
  Maincontainer:{
    flex:1,
    backgroundColor:'white',
    

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
  chatContent:{
   
   //backgroundColor:'red',
   //bottom:'15%',
   paddingBottom:'8%',
   height:'83%'
 
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
      //flex:1,
    backgroundColor:'white',
   // top:'1%'
   bottom:'10%',
    padding:2,
    
  },
  leftArrow: {
    position: "absolute",
    backgroundColor: "green",
    width: 30,
    height: 20,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -15
},
inputs:{
  height:40,
  marginLeft:16,
  borderBottomColor: '#FFFFFF',
  flex:1,
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
    backgroundColor: "green",
    padding:15,
    borderRadius: 10,
    paddingBottom:10,
    marginTop: 5,
    marginLeft: "5%",
    maxWidth: '70%',
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
  message:{
    fontSize:20,
    color:'white'
  },
  messageMe:{
    backgroundColor: "grey",
    padding:15,
    borderRadius: 5,
    paddingBottom:10,
    marginTop: 5,
    marginRight: "5%",
    maxWidth: '70%',
    alignSelf: 'flex-end',
    borderRadius: 20,
  },
  chatArea:{
    backgroundColor:'yellow'
  },
  bottomHeader:{
    maxHeight:120, 
    position:'absolute',
    bottom:'-7.3%',
     flexDirection:'row',
     width:'100%',
     backgroundColor:'white',
     borderRadius:5,
    alignItems:'center'  
    
  },
  messageInput:{
    backgroundColor:'white',
    width:270,
    paddingRight:3,
    maxHeight:100,
    borderColor:'black',
    fontSize:25,
    padding:10,
    left:5,
    borderWidth:1,
    borderRadius:20,
    marginBottom:0,
    paddingBottom:0
  },
  file:{
    marginLeft:25
  },
  send:{
    borderRadius:25,
    marginLeft:17,
    width:45,
    height:45,
    backgroundColor:'black',
    alignItems:'center'
    
  },
  arrowUp:{

  },
  username:{
    backgroundColor:'yellow',
    color:'green',
   
  }

 });
export default memo(Inbox);
