
import React, {useEffect, useState} from 'react'
import Contacts, { getContactsByPhoneNumber } from 'react-native-contacts';
import {FlatList,View,Text,StyleSheet,Image,TextInput
  ,TouchableOpacity} from 'react-native'

const ContactList = ({navigation}) => {
  var [contacts,setContacts]=React.useState([])
  var contact={};
  
  useEffect(() => {
    Contacts.getAll().then(contacts => {
     
      setContacts(contacts);
    });
  }, []);
  
  //console.log(phoneNumbers,"numbers")
 // console.log(contacts,"hello there")
  //second function for numbers
   /// console.log( "object contact",contacts)
 
  var renderItem=({item})=>{ 
    console.log("item obs",item.phoneNumbers,"name",item.displayName)
    return(
      <View>
    <TouchableOpacity onPress={()=>{
      //console.log("contactonclick",item.givenName,"++",item.phoneNumbers)
      contact={'toUser':item.displayName,'phone':item.phoneNumbers};
      
     navigation.navigate('Inbox',contact)
     }}>
     
<View style={styles.row}>
<Image  style={styles.pic} source={require('./pic.png')}/>
<View>
<View style={styles.nameContainer}>
  <View key={contact.id}>
        {item.displayName?<Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.displayName}</Text>:
      <Text>{item.phoneNumbers}</Text>}
    </View>
</View>
<View style={styles.msgContainer}>
<Text style={styles.msgTxt}>phone short-Bio</Text>
</View>
</View>
</View>     
  </TouchableOpacity>
  </View>   
 
  )
{/* <FlatList data={item.phoneNumbers}  renderItem={secItem} extraData={item.phoneNumbers}/> */} 
 
}
  
  
  return (
      <View style={styles.container}>
           <View style={styles.searchbar}>
             <TextInput style={styles.searchIn} placeholder='search'/>

           </View>
         <View style={styles.secView}>
          <FlatList  data={contacts} renderItem={renderItem} extraData={contacts}/>
  </View>
 
     </View> 
     
  )
}

const styles=StyleSheet.create({
    container:{
       flex:1,
   backgroundColor:'#C0C0C0'
    },
    searchbar:{
      height:40,
      width:'100%',
      
    },
    searchIn:{
      backgroundColor:'white'
    },
    secView:{
      margin:3,
  backgroundColor:'#C0C0C0'
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#DCDCDC',
      backgroundColor: '#C0C0C0',
      borderBottomWidth: 1,
      padding:5
    },
    pic: {
      borderRadius: 30,
      width: 60,
      height: 60,
    },
    nameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 280,
    },
    nameTxt: {
      marginLeft: 15,
      fontWeight: '600',
      color: '#222',
      fontSize: 18,
      width:170,
    },
    mblTxt: {
      fontWeight: '200',
      color: '#777',
      fontSize: 13,
    },
    msgContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    msgTxt: {
      fontWeight: '400',
      color: '#008B8B',
      fontSize: 12,
      marginLeft: 15,
    }
})
export default ContactList
