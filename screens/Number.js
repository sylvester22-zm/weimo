import React  , { useState, useRef,useEffect } from 'react'


import {View,Text,StyleSheet,TextInput, Button,StatusBar,
    TouchableOpacity} from 'react-native'

const Number = ({navigation}) => {
    let [username,setUsername]=useState('');
   var   xhr=new XMLHttpRequest();

     var nextButton=()=>{
        console.log("username",username)
       
        xhr.onreadystatechange=(e)=>{
            console.log(xhr)
            if (xhr.readyState !== 4) {
               
                return;
              }
              if(xhr.readyState==XMLHttpRequest.DONE){
               if(xhr.status===200){  
                 navigation.navigate('Otp')       
              console.log("OTP has been Sent")
              }
            }
            else{
             console.log("something happened")
            }
           
          }
 xhr.open('POST','http://10.0.2.2:8080/OtpApi',true)
 // xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
xhr.setRequestHeader('Content-type','application/json')
  xhr.setRequestHeader("X-Requested-With","XMLHttpRequest") 
 xhr.send(JSON.stringify(username)) 
  
        

    } 
 
     /* var nextButton=()=>{
        console.log("next button pressed")
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState !== 4) {
              return;
            }
          
            if (xhr.status === 200) {
              console.log('success', xhr.responseText);
            } else {
              console.warn('error');
            }
          };
          
          xhr.open('POST', 'http://10.0.2.2:8080/OtpApi');
          xhr.send();
    }  */
   
    
    var nextPage=()=>{
        navigation.navigate('Otp',{itedid:86,other:"hayyy"})
    }
   
  return (
   <View style={styles.main}>
        
       <Text style={styles.text} >Enter Your Phone Number To Proceed </Text>
       <View style={styles.container}>
           <Text>{username}</Text>
           
           <TextInput value={username} onTouchStart={()=>{
             alert("just press")
           }} onChangeText={username=>setUsername(username)}
            style={styles.mobileNum} keyboardType='email-address' 
            placeholder='mobile number' />
           
          
           <Button color='black' onPress={nextButton} style={styles.nextButton} title='Next'></Button>
       </View>
        <Button title="NextPage" onPress={nextPage} ></Button> 
   
   </View>
  )
}

const styles=StyleSheet.create({

    main:{
    flex:1,
    backgroundColor:'green'
    },
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffc2c2',
        marginTop:100,
        margin:10
    },
    text:{
        color:'black',
        margin:10
    },
    mobileNum:{
        color:'black',
        borderRadius:10,
        width:250,
        fontSize:30,
        backgroundColor:'white',
        margin:10
    },
    
    nextButton:{
        margin:20,
        width:30,
        borderRadius:5

        
    }
})

export default Number

