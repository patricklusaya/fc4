import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Share } from 'react-native';


const ShareColumn = ({ icon, name, imageSource,  }) => {
 
    const handleSharing= () => {
  
    const message = "Play football connect 4 by downloading our app "
    
  
        Share.share( {  message, url: "https://apkfrees/download",title: "FC4", },
        {
            subject: "FC4",
        });      
           
    };     
         
    return (
      <TouchableOpacity style={styles.gameColumn} onPress={() => handleSharing()} >
        <View style={styles.gameIcon}>
          <Image source={imageSource} style={styles.gameImage} />
        </View>
        <Text style={styles.gameName}>{name}</Text>
      </TouchableOpacity>
    );
  };
  
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      backgroundColor: '#4b4bc8',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText:{
      fontSize:30,
      color:'white',
      fontFamily:'valorax'
  
    },
    header:{
      marginBottom:20
  
    },
    backgroundTomato: {
      backgroundColor: '#4b4bc8',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      backgroundColor: 'lightgray',
      padding: 20,
      marginTop:0,
      marginLeft:0,
      marginRight:0,
      borderRadius: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    gameColumn: {
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 8,
      width: 140,
      height: 140,
    },
    gameIcon: {
      marginBottom: 10,
      backgroundColor:'lightgray',
      borderRadius:12,
      padding: 5,
    },
  
    gameImage: {
      width: 40,
      height: 40,
    },
    gameName: {
      fontSize: 16,
      textAlign: 'center',
      fontFamily:'valorax'
    },
    spaceBetweenColumns: {
      width: 10, // You can adjust the space between columns here
    },
  });
  
  export default ShareColumn;
  