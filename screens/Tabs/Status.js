
import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const Status = () => {
  return (
      <View style={styles.container}>
         <View style={styles.secView}>
  <Text>Child View</Text>        
  </View>
        <Text>Status</Text>
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
  backgroundColor:'#f4f4f4'
    }
})
export default Status
