/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View,Image,Button} from 'react-native' 
import SockJS from 'sockjs-client'; // Note this line
import { Client, Message,Stomp, StompHeaders } from '@stomp/stompjs';
import * as encoding from 'text-encoding';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import {createNativeStackNavigator }    from '@react-navigation/native-stack';
import Number from './screens/Number';
import Otp from './screens/Otp'
import Home from './screens/Home'
import Inbox from './screens/Inbox';

const Screens=createNativeStackNavigator();
const Tabs=createBottomTabNavigator();

const App = () => {
  var websocket={};
  var stompClient;
  var url='http://10.0.2.2:8080/websocket'
  var [state,setState]=React.useState(false)
  var [data,setData]=React.useState('')

   var xhr=new XMLHttpRequest();
  xhr.onreadystatechange=(e)=>{
    if (xhr.readyState !== 4) {
        return;
      }
      if(xhr.readyState==XMLHttpRequest.DONE){
       if(xhr.status===200){      
        /*  after successfull request the client is connected to the websocket  */
        websocket=new SockJS(url)
  stompClient=Stomp.over(function(){
    console.log("inside over")
    return new SockJS(url);
  })

  /* stompClient.onConnect(() => {
      console.log('onConnect');
      stompClient.subscribe('/post.update.profile.', message => {
         // console.log(message);
      })
  }); */

   stompClient.activate();
  stompClient.connect({},(frame) => {
    console.log('connected by client ' + frame);
    stompClient.subscribe('/queue', message => {
      var mess=JSON.stringify(message.body)
        console.log( mess+ " message from the server");
    })
    stompClient.subscribe('/top/', message => {
      console.log("from the server",JSON.parse(message.body) + "message from the server");
  })
});  
      setState(true);
      data=xhr.responseText;
      setData(data)
      console.log(data,"data from the sever")
      }
    }
     if(xhr.status===401){
     console.log(xhr.status,"oops try again")
    }
   
} 

  

      console.log("object", stompClient)    
               
       //stompClient.send('/post.update.profile.',{},JSON.stringify(message))
     
      
  return (
  <NavigationContainer>
   
    <Screens.Navigator >
      {/* {!state?(
        <> */}
       <Screens.Screen options={{headerShown:false}} component={Number} name='Number' >
       </Screens.Screen>
      <Screens.Screen options={{headerShown:false}}  name='Otp' >
        {prop=> <Otp {...prop} xhr={xhr}/>} 
      </Screens.Screen> 
      {/* </>
        ):(
       <> */}
     <Screens.Screen options={{headerShown:false}} component={Home} name='Home' >
     {/*   {props=><Home {...props} data={data} xhr={xhr}/>} */}
       </Screens.Screen>
     {/* </>
       )}  */}
       <Screens.Screen options={{headerShown:false}}  name='Inbox' >
         {props=><Inbox {...props} stompClient={stompClient} />}
       </Screens.Screen>
    </Screens.Navigator>
  </NavigationContainer>
  
  
  );
};



export default App;
