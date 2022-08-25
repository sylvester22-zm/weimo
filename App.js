/**
 * 
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {View,Image,Button,GLOBAL} from 'react-native' 
import SockJS from 'sockjs-client'; // Note this line
import { Client, Message,Stomp, StompHeaders } from '@stomp/stompjs';
import * as encoding from 'text-encoding';
import NetInfo from "@react-native-community/netinfo"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator }    from '@react-navigation/native-stack';
import Number from './screens/Number';
import Otp from './screens/Otp'
import Home from './screens/Home'
import Inbox from './screens/Inbox';



const Screens=createNativeStackNavigator();
const Tabs=createBottomTabNavigator();

const App = () => {
  var websocket={};
  
  //var stompClient;
  var url='http://10.0.2.2:8080/websocket'
  var [state,setState]=React.useState(false)
  var [data,setData]=React.useState([])
  var [reconnect,setReconnect]=React.useState(false);
  var [stompClient,setSocket]=React.useState(null);
  var [stored,setStored]=React.useState({});
  var [payload,setPayload]=React.useState('');
  let username;

   var xhr=new XMLHttpRequest();
   /* the function to store the key */
    const storeData = async (state) => {
     
     
     // JSON.stringify(state);
    try {
      await AsyncStorage.setItem('state', state)
    } catch (e) {
      // saving error
    }
  } 
  /* reading stored object */
  const getData=async()=>{
     
    try {
   
      const value = await AsyncStorage.getItem('state')
      if(value !== null) {
       
          stompClient=Stomp.over(function(){
          
           console.log("killed app")
            stompClient.heartbeat.outgoing=20000
            stompClient.heartbeat.incoming=20000
            console.log(stompClient,"killed up")
            return new SockJS(url);
          }) 
          //it should be here
          setState(value);
           stompClient.activate();
         stompClient.connect({},(frame) => {
           username=frame.headers['user-name'];
          console.log("stomp===>",reconnect,'connected by client==>frame ',frame,'==>username' + frame.headers['user-name']);
          var headers={id:frame.headers['user-name'],'ack':'client','autoDelete':true}
          
           
          stompClient.subscribe('/user/queue/chat.message', message => {
           message.ack();
                  
           var payload=JSON.parse(message.body);
           console.log(payload,"message object")
                   payload.isSender=false;
        
              
                 setData(data=>[ ...data,payload])
        
          },headers) 
           stompClient.subscribe('/app/new.Messages', message => {
            var payload=JSON.parse(message.body);
           console.log(payload + "message from the server");
        })   
        
        stompClient.subscribe('/amq.topic', message => {
         console.log("from the server",JSON.parse(message.body) + "message from the server");
        })
        //storeData({'state':true,'username':username})
          setSocket(stompClient)
         
        
        },(e)=>{
         console.log("there was an erorr try reconnecting",e)
         console.warn("error from the scket::",e)
        
         stompClient.reconnect_delay=1000;
         
        });
       
      }else{
        console.log("first time user",value)
      }
    } catch(e) {
      // error reading value
    }
  }
  useEffect(()=>{
   //getData();
  },[])




  xhr.onreadystatechange=(e)=>{

    if (xhr.readyState !== 4) {
        return;
      }
      if(xhr.readyState==XMLHttpRequest.DONE){
       if(xhr.status===200){      
       
       /*  after successfull request the client is connected to the websocket  */
       data=xhr.responseText;
      
      
        websocket=new SockJS(url)
        
        console.log(" status is",xhr.status,"object==")
      
         if(stompClient===null){
          //console.log(stompClient,"before over")
  stompClient=Stomp.over(function(){
   
   console.log("state after websocket reco")
    stompClient.heartbeat.outgoing=20000
    stompClient.heartbeat.incoming=20000
    console.log(stompClient,"inside over")
    return new SockJS(url);
  })
  //it should be here
 
   stompClient.activate();
  stompClient.connect({},(frame) => {
   username=frame.headers['user-name'];
  console.log("stomp===>",reconnect,'connected by client==>frame ',frame,'==>username' + frame.headers['user-name']);
  var headers={id:frame.headers['user-name'],'ack':'client','autoDelete':true}
  
   
  stompClient.subscribe('/user/queue/chat.message', message => {
   message.ack();
          
   var payload=JSON.parse(message.body);
   var newchat=payload;
   console.log(payload,"message object")
           payload.isSender=false;
           setPayload(payload);

          // setData(data=>[ ...data,payload])
         setData(data)

  },headers) 
   stompClient.subscribe('/app/new.Messages', message => {
    var payload=JSON.parse(message.body);
   console.log(payload + "message from the server");
})   

stompClient.subscribe('/amq.topic', message => {
 console.log("from the server",JSON.parse(message.body) + "message from the server");
})
//storeData({'state':true,'username':username})
  setSocket(stompClient)
 

},(e)=>{
 console.log("there was an erorr try reconnecting",e)
 console.warn("error from the scket::",e)

 stompClient.reconnect_delay=1000;
 
});

}
        //if(!state){
          setState(true);
          storeData(true)
   // }
     
     // console.log("data in appjs",data)
      setData(JSON.parse(data))
      
      }
    }
     if(xhr.status===401){
     console.log(xhr.status,"oops try again")
     xhr.abort();
     
    }
     else{
      console.log('error check ur net connection')
    }
   
} 
 

//console.log("stored state",stored)
  
  return (
   
   
  <NavigationContainer>
  
  {/* <Button title='getData' onPress={getData}></Button> */}
    <Screens.Navigator >
      {!state?(
        <> 
       <Screens.Screen options={{headerShown:false}} component={Number} name='Number' >
       </Screens.Screen>
      <Screens.Screen options={{headerShown:false}}  name='Otp' >
        {prop=> <Otp {...prop} xhr={xhr} />} 
      </Screens.Screen> 
       </>
        ):(
       <> 
      
     <Screens.Screen options={{headerShown:false}}    name='Home' >
     {props=><Home {...props} data={data} payload={payload}/>}
     
     </ Screens.Screen>
     </>
       )}  
       <Screens.Screen options={{headerShown:false}}  name='Inbox' >
         {props=><Inbox {...props}  payload={payload}   stompClient={stompClient}  />}
       </Screens.Screen>
    </Screens.Navigator>
  </NavigationContainer>
  
  
  );
};



export default App;
