
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Share } from 'react-native';
import { Audio } from 'expo-av';
import { useDispatch } from 'react-redux';



const audioFiles = {
  enter:require("../../../../assets/sounds/enter.mp3"),
  dramatic:require("../../../../assets/sounds/dramatic.mp3")
};

const GameColumn = ({  imageSource,name, route }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch()
  
   
  // const handleNavigation = async() => {

  //   if (route === "versusAndroid") {
  //       return alert("Currently On Maintenance ")
        
  //   }
  
  //   navigation.navigate(route); 
  //   const newSound = await Audio.Sound.createAsync(audioFiles.dramatic, { shouldPlay: true });
  
  //   await newSound.playAsync();

  // };


// Assuming other imports and setup are done above

const handleNavigation = async () => {
  // Check if the app has the necessary permissions to play audio
  try {
   
  } catch (error) {
    console.error('Failed to set audio permissions', error);
    return;
  }

  if (route === "versusAndroid") {
    return alert("Currently On Maintenance ");
  }

  navigation.navigate(route);

  // Create and play the sound
  try {
     const sound = new Audio.Sound();
    try {
      const newSound = await Audio.Sound.createAsync(audioFiles.enter, { shouldPlay: true });
  
    await newSound.playAsync();
    } catch (error) {
      console.error(error)
    }
  } catch (error) {
    console.error('Failed to play sound', error);
  }
};


  return (
    <TouchableOpacity style={styles.gameColumn} onPress={handleNavigation}  >
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
  
  export default GameColumn;
  