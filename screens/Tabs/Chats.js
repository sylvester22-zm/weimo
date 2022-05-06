
import React from 'react'
import {View,Text,Button,StyleSheet} from 'react-native'
import {useState,useEffect} from 'react'

const Chats = () => {
  var [users,setUsers]=useState('')
  useEffect(()=>{
    var xhr=new XMLHttpRequest();
  
    xhr.onreadystatechange=()=>{
    
      if (xhr.readyState !== 4) {
        return;
      }
      if(xhr.readyState==XMLHttpRequest.DONE){
       if(xhr.status===200){     
         var users=JSON.parse(xhr.responseText);
          users.forEach(user=>{
            users=user;
            console.log(users.username,"jj")
            setUsers(users)
          })
          
        
        
      // console.log("Returned Data",user.firstname)
      }
    }
    else{
     console.log("something happened")
    }
    }
   xhr.open('POST','http://10.0.2.2:8080/currentUsers')
  xhr.setRequestHeader('Content-type','application/json')
    xhr.setRequestHeader("X-Requested-With","XMLHttpRequest") 
  xhr.send() 
  
  },[])
  console.log(users,"these")
 

  return (
   <View style={styles.container}>
     <View style={styles.secView}>
    <View>
     <Text>{users.username}</Text>
    </View>
     </View>
       <Text>main Chats</Text>
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
    }
})
export default Chats
