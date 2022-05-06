/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View} from 'react-native' 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import {createNativeStackNavigator }    from '@react-navigation/native-stack';
import Number from './screens/Number';
import Otp from './screens/Otp'
import Home from './screens/Home'

const Screens=createNativeStackNavigator();
const Tabs=createBottomTabNavigator();

const App = () => {
  var [state,setState]=React.useState(false)
  var [data,setData]=React.useState('')

   var xhr=new XMLHttpRequest();
  xhr.onreadystatechange=(e)=>{
    if (xhr.readyState !== 4) {
        return;
      }
      if(xhr.readyState==XMLHttpRequest.DONE){
       if(xhr.status===200){         
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

  console.log("state is::",state)

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
    </Screens.Navigator>
  </NavigationContainer>
  
  
  );
};



export default App;
