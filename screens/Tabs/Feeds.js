
import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const Feeds = () => {
  return (
    <View style={styles.container}>
        <View style={styles.secView}>
        <Text>Hay there Feeds here</Text>
        </View>
        <Text>Feeds</Text>
    </View>
  )
}
const styles=StyleSheet.create({
 container:{
      flex:0.6,
      backgroundColor:'grey',
      marginTop:10
      
 },
 secView:{
   margin:5,
     backgroundColor:'#f4f4f4'
 }
})

export default Feeds
