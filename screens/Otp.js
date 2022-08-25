


import React, {useRef,useEffect, useState} from 'react';
import NetInfo from "@react-native-community/netinfo"
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

const Otp = ({xhr,route,navigation}) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState();
  var [isOtp,setRequest]=React.useState(false);
  var [connected,setConnected]=React.useState(false);
  useEffect(()=>{
    console.log(isOtp,"otp state")
  },[])
  // const {itemid,other}=route.params;
 
/* useEffect(()=>{
  const unsubscribe = NetInfo.addEventListener(state => {
    setConnected(state.isConnected);
    console.log("otp Connection type", state.type);
    console.log("otp Is connected?", state.isConnected);
  });
},[connected]) */

  NetInfo.fetch().then(state => {
    console.log("Connection type fetch", state.type);
    console.log("Is connected?", state.isConnected);
    setConnected(state.isConnected)
  });




  var Next=()=>{
     console.log("Otp next button clicked",xhr.status,connected)
     var password=otp.a+otp.b+otp.c+otp.d
     var email="";
     var json={
       password:password,
       email:email
     }
    if(connected){
  xhr.open('POST','http://10.0.2.2:8080/OtpValidator',true)
  // xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
xhr.setRequestHeader('Content-type','application/json')
   xhr.setRequestHeader("X-Requested-With","XMLHttpRequest") 
  xhr.send(JSON.stringify(json))
    }else{
      console.error("check your connection",connected)
      xhr.abort();
      
    }
        }
  
 var nexHome=()=>{
   navigation.navigate('Home')
 }
  var resendOtp=()=>{
    console.log("pressed")
  }
 var back=()=>{
   navigation.goBack();
 }
  return (
    <View style={styles.container}>
     

      <View style={styles.headerContainer}>
        {/* <Ionicons
      name="chevron-back-outline"
      size={30}
      onPress={() => navigation.goBack()}
    /> */}
        
      </View>
      <Text style={styles.title}>OTP Verifications</Text>
      <Text style={styles.content}>
        Enter the OTP number just sent you at{' '}
        <Text style={styles.phoneNumberText}>PhoneNumber</Text>
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={text => {
              setOtp({ ...otp,a:  text });
              text && secondInput.current.focus();
            } } />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setOtp({ ...otp, b: text });
              text ? thirdInput.current.focus() : firstInput.current.focus();
            } } />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setOtp({ ...otp, c: text });
              text ? fourthInput.current.focus() : secondInput.current.focus();
            } } />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setOtp({ ...otp,d:  text });
              !text && thirdInput.current.focus();
            } } />
        </View>
      </View>
      <View style={styles.btnHolder}>
      <TouchableOpacity style={styles.nextBtn}>
        {/* Text style={styles.signinButtonText}>Verify</Text>  */}
        <Button  title='Next' color='black' onPress={Next}/>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.resendOtp}>
      <Button title='Resend Otp' color='green' onPress={resendOtp}/>
      
      </TouchableOpacity>
      <Button title='Back Otp' color='green' onPress={back}/>
      <Button title="next Home" onPress={nexHome}></Button>
      </View>
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#D3D3D3',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'roman-numeral',
    lineHeight: 20 * 1.4,
    width: 80,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily:'roman-numeral',
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    fontFamily: 'roman-numeral',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  phoneNumberText: {
    fontSize: 18,
    fontFamily:'roman-numeral',
    lineHeight: 18 * 1.4,
    color:'white',
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderColor:'yellow',
    borderWidth: 0.5,
    color:'white'
  },
  otpText: {
    fontSize: 25,
    color: 'black',
    backgroundColor:'white',
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  signinButton: {
    backgroundColor:'yellow',
    borderRadius: 8,
    marginHorizontal: 20,
    height: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color:'yellow',
    fontFamily: 'roman-numeral',
  },
  btnHolder:{
  
    backgroundColor:'yellow'
  },
  nextBtn:{
  width:100,
  paddingLeft:0,
  
  marginLeft:0,
  right:5,
   left:150,
  borderRadius:5
  },
  resendOtp:{
    width:100,
    marginTop:10,
    left:10,
    justifyContent:'flex-end',
   borderRadius:5
  }
  
});

export default Otp;
