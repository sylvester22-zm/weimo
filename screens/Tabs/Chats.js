
import React from 'react'
import {View,Text,Button,Image,StyleSheet,
  TouchableOpacity,FlatList} from 'react-native'
import {useState,useEffect} from 'react'

var damydata=[{'id':1,'message':'hay'},{'id':2,'message':'lata'}]
var pay=[{'id':2,'message':'newmessage'}]
var newarray={}


const Chats = ({data,payload,navigation}) => {
  var [data,setData]=React.useState([])
  let contact={};
  let number;

 useEffect(()=>{
  
  let updated;
  let prev;
  
    data.forEach((d,ic)=>{
    
      if(d.id===payload.id){
        console.log(d,"data inbox")
        newarray=data.splice(d,1)
        var sliced=[];
        // console.log(d,"b4 shift",newarray)
       // newarray.unshift(payload)
       newarray.unshift(payload)
       console.log("new array ins",newarray)
  
        //newarray=data.splice(d,d.id)
      
        console.log("sliced is ins",sliced)
        setData(sliced)
      }
  
    
   })  
   console.log("new array out",newarray)
  // const unique=[...new Map(data.map((item,key)=>[item[key],item])).values()]
   //setData(unique)
  
 },[payload])
 
 console.log("payload out",payload.id)
  var chatWith=(contact)=>{
    console.log("initial",contact)
    contact={'toUser':contact.toUser,'phone':[{'number':contact.toNumber,'id':contact.other}]};
    console.log("contact",contact)
    navigation.navigate('Inbox',contact)

  }
  var fromUser=(contact)=>{
    contact={'toUser':contact.toUser,'phone':[{'number':contact.fromNumber,'id':contact.other}]};
     console.log(contact,"inbox")
     navigation.navigate('Inbox',contact)
  }

  var request = new XMLHttpRequest();
  useEffect(()=>{

    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
     
      if (request.status === 200) {
     
        var cons=JSON.parse(request.response)   
        setData(cons)
        
      } else {
        console.warn('error chats');
      }
    };
    
    request.open('POST', 'http://10.0.2.2:8080/myconversations',true);
    request.send();
        
  },[])
  

   


 
   var renderItem=({item})=>(
    
           
    <View  style={styles.chatView} key={item.id}>
    {item.sender?(<View>     
    <TouchableOpacity  onPress={()=>{chatWith(item)
    }
  
  }>  
    <View style={styles.userList}  >    
      <Image style={styles.image}
         source={require('./pic.png')}></Image>
         {item.toUser?<Text style={styles.user}>{item.toUser}</Text>:
         <Text style={styles.user}>{item.toNumber}</Text>}
         <Text style={styles.message}>{item.message}...</Text>
         <Text style={styles.lastText}>{item.localDatetime}me</Text>
         {/* <Text style={styles.unseen}>{item.unseen}</Text> */}
        </View>   
        </TouchableOpacity>
  </View>):
  (         
            <View>     
            <TouchableOpacity  onPress={()=>{fromUser(item)}}>  
            <View style={styles.userList}  >    
              <Image style={styles.image}
                 source={require('./pic.png')}></Image>
                 {item.fromUser?<Text style={styles.user}>{item.fromUser}</Text>:
                 <Text style={styles.user}>{item.fromNumber}</Text>}
                 <Text style={styles.message}>{item.message}...</Text>
                 <Text style={styles.lastText}>{item.localDatetime}ww</Text>
                 <Text style={styles.unseen}>{item.unseen}</Text>
                </View>   
                </TouchableOpacity>
          </View>)}
  </View>
   
   )
 
   
   


  return (
   <View style={styles.container}>
    
     <View style={styles.secView}>
   
      <FlatList 
      data={[...data].reverse()} inverted={0} renderItem={renderItem} extraData={data}
     />
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
      marginLeft:'75%'
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
    unseen:{
      top:'60%',
      color:'black',
      position:'absolute',
      marginLeft:'75%'
    },
    user:{
      height:60,
      color:'white',
      paddingTop:15,
      paddingLeft:10
    }
})
export default Chats
