import React, { useEffect, useState } from 'react';
import { View, Image ,StyleSheet,} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RouterComponent from "./Router"

import reducers from './src/reducers'
import { fetchGameItems, fetchItems, getCities } from './src/actions/GameActions';
import { applyMiddleware, createStore } from 'redux';
import { Audio } from 'expo-av';
const thunkMiddleware = require("redux-thunk").thunk;
import { db } from './firebaseConfig';

const audioFiles = {

  intro:require("./assets/sounds/intro.mp3"),

};



const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default function StartApp() {
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();


  const [state, setState] = useState({
    isFetching:false,
    items:[]
  });



  useEffect(() => {
    dispatch(fetchItems());

  }, []);

  
  const gameState = useSelector((state) => state.game)
  console.log('GS', state.items)

  useEffect(() => {
    try {
      setState((prevState) => ({
        ...prevState,
       isFetching:gameState.isFetching,
       items:gameState.items

      }));
    } catch (e) {
      console.log(e);
    }
  }, [gameState]);


const playSound = async() =>{

  const newSound = await Audio.Sound.createAsync(audioFiles.intro, { shouldPlay: true });
  
  await newSound.playAsync(); 


}




  if (state.items.length === 0) {

    playSound();

    return (
      <View style={styles.gifContainer}>
        <Image source={require('./assets/loader.gif')} style={styles.gifStyle} />
      </View>
    );
  }
  else{

    return (
        <SafeAreaProvider style={styles.container}>
         
            <RouterComponent />
         
        </SafeAreaProvider>
      );

    
  }



 
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
    backgroundColor: '#4b4bc8',
    
    },
    gifContainer: {
      flex: 1,
      backgroundColor: '#4b4bc8',
      justifyContent: 'center',
      alignItems: 'center'
    
    },
    gifStyle: {
      height: 100,
      width: 100
    
    }
    });
    
