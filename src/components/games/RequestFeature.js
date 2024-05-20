import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image ,Dimensions, TouchableHighlight,TouchableWithoutFeedback, Animated, Button, TextInput, ImageBackground, Keyboard} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import "./css/custom.css"
import { sendRequest } from '../../actions/GameActions';



const { width, height } = Dimensions.get('window');
const cellSize = width / 7; // Adjust based on desired number of columns



const RequestFeature = ({}) => {

  const dispatch = useDispatch();



  const [state, setState] = useState({
    isPlayerOneModalVisible:false,
    message: "",
    email:"",
    successMessage:'',
    items:[]
  

  });



const gameState = useSelector((state) => state.game)

useEffect(() => {
  try {
    setState((prevState) => ({
      ...prevState,
    
     items:gameState.items

    }));
  } catch (e) {
    console.log(e);
  }
}, [gameState]);

console.log('Component State:', state.items);
console.log('GameState:', gameState);



  const onSendRequest= () =>{

    if (state.message) {
      dispatch(sendRequest(state.message,state.email))
      setState({ ...state, message:'',email:'', successMessage:'Message Sent', })
      
      setTimeout(() => {
        setState((prevState) => ({ ...prevState, successMessage: '' }));
      }, 2000);
      
    }
    else {
      return alert("Fill the message");
    }


  }


  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };


  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.container} >
        <TextInput
          style={styles.multiLineInput}
          value={state.message}
          onChangeText={(value) => setState({ ...state, message: value })}
          multiline={true}
          placeholder="Request Feature/Report Bug"
          placeholderTextColor="#999"
          returnKeyType="done"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setState({ ...state, email: value })}
          placeholder="Email(Optional)"
          placeholderTextColor="#999"
          returnKeyType="done"
          value={state.email}
        />
         <TouchableOpacity style={styles.startButton} onPress={()=>onSendRequest()} >
     
     <Text >Submit</Text>

   </TouchableOpacity>
   <Text> {state.successMessage}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({

  
  container: {
    flex: 1,
    backgroundColor: '#4b4bc8',
    justifyContent:'center',
    alignItems:'center'
    
  },
  multiLineInput: {
  
    width: Dimensions.get("window").width/1.2,
    height: 100, // adjust as needed
    borderColor: "gray",
    backgroundColor:'whitesmoke',
    color:"black",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginHorizontal:20,
    marginBottom: 16,
    fontSize: 16,
    marginTop: 17,
    borderRadius:20,
    paddingVertical:40,
    textAlign:'center',
    justifyContent:'center'
    
  },

  input:{

    width: Dimensions.get("window").width/1.2,
    
    borderColor: "gray",
    backgroundColor:'whitesmoke',
    color:"black",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginHorizontal:20,
    marginBottom: 16,
    fontSize: 16,
    marginTop: 6,
    borderRadius:15,
    paddingVertical:15,
    textAlign:'center',
    justifyContent:'center'

  },

  startButton:{

    marginVertical:30,
    backgroundColor:"lightgray",
    paddingVertical:20,
    paddingHorizontal:50,
    borderRadius:15,

  },

  barText: {
    marginTop: 5,
    fontFamily:'valorax',
    color:'black'
  },


});

export default RequestFeature;
