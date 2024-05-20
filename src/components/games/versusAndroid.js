import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image ,Dimensions, TouchableHighlight, Animated, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import PlayerTwoModal from './gameModals/PlayerTwoModal';
import "./css/custom.css"

import PlayerOneModal from './gameModals/PlayerOneModal';

const windowWidth= Dimensions.get('window').width;
const options = ["Zlatan", "Chelsea", "M.Arteta", "M.Mount", "Ajax", "A.Robben", "N.Ake", "Boavista FC"]
const options2= ['Argentina', 'Liga MX', 'A.Vidal', 'Pep', 'World Cup', 'Africa'];


const { width, height } = Dimensions.get('window');
const cellSize = width / 7; // Adjust based on desired number of columns

const audioFiles = {
  enter:require("../../../assets/sounds/enter.mp3")
};


const VersusAndroid = ({}) => {

const [selectedCells, setSelectedCells] = useState([]);
const [currentPlayer, setCurrentPlayer] = useState('playerOne');
const [isPlayerOneActive, setIsPlayerOneActive] = useState(true);
const [isPlayerTwoActive, setIsPlayerTwoActive] = useState(false);
const opacity = useRef(new Animated.Value(1)).current;



  const [state, setState] = useState({
    isPlayerOneModalVisible:false,
    isPlayerTwoModalVisible:false,
    hasGameStarted:false,
    // isPlayerOneActive:false,
    // isPlayerTwoActive:false,
    playerTwoSelections:[],
    playerOneSelections:[],
    sound:null,

  });




  const opacityPlayerOne = useRef(new Animated.Value(1)).current;
  const opacityPlayerTwo = useRef(new Animated.Value(1)).current;
 
 // State to control the animation
 const [isAnimatingPlayerOne, setIsAnimatingPlayerOne] = useState(false);
 const [isAnimatingPlayerTwo, setIsAnimatingPlayerTwo] = useState(false);

 // Define the animations
 useEffect(() => {
    const animatePlayerOne = () => {
      setIsAnimatingPlayerOne(true);
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityPlayerOne, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityPlayerOne, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        {
          iterations: -1,
        }
      ).start();
    };

    const animatePlayerTwo = () => {
      setIsAnimatingPlayerTwo(true);
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityPlayerTwo, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityPlayerTwo, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        {
          iterations: -1,
        }
      ).start();
    };

   
      
   if (state.hasGameStarted) {
    


    if (isPlayerOneActive && !isAnimatingPlayerOne) {
      animatePlayerOne();
    } else if (!isPlayerOneActive && isAnimatingPlayerOne) {
      // Stop the animation by setting the opacity back to 1
      Animated.timing(opacityPlayerOne, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setIsAnimatingPlayerOne(false));
    }

    if (isPlayerTwoActive && !isAnimatingPlayerTwo) {
      animatePlayerTwo();
    } else if (!isPlayerTwoActive && isAnimatingPlayerTwo) {
      // Stop the animation by setting the opacity back to 1
      Animated.timing(opacityPlayerTwo, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setIsAnimatingPlayerTwo(false));
    }
  }
 
 }, [isPlayerOneActive, isPlayerTwoActive, isAnimatingPlayerOne, isAnimatingPlayerTwo,state.hasGameStarted]);


 useEffect(() => {
  const loadAudio = async (filename) => {
    try {
      const { sound } = await Audio.Sound.createAsync(filename);
      return sound;
    } catch (error) {
      console.log(`Error loading ${filename}:`, error);
      return null;
    }
  };

  const loadSounds = async () => {
    const [enter] = await Promise.all([
      loadAudio(audioFiles.enter),
      
    ]);

    
  };

  loadSounds();


}, []);



  const gameState =useSelector((state) => state.game);

  useEffect(() => {
 
      setState((prevState) => ({
        ...prevState,
        sound:gameState.sound

      }));

  }, [ gameState]);

//   useEffect(() => {
 
//     setState((prevState) => ({
//       ...prevState,
//       isPlayerOneActive:true
      
//     }));

// }, [ gameState]);

console.log('active', isPlayerOneActive) 
const redCircleStyle = state.isPlayerOneActive ? styles.redCircleBlink : styles.redCircle;


  const togglePlayerOneModal = ()=>{

    setState({ ...state, isPlayerOneModalVisible: !state.isPlayerOneModalVisible });
   
  }

  const togglePlayerTwoModal = ()=>{

    setState({ ...state, isPlayerTwoModalVisible: !state.isPlayerTwoModalVisible });
   

  }

  console.log('pressed cell', state.pressedCell)

  const handlePlayerOneSelections = (item)=>{

   
    setState({...state, playerOneSelections:item})

  }

  const handlePlayerTwoSelections = (item)=>{

   
    setState({...state, playerTwoSelections:item})

  }

  const renderHeader = () => (
    <View style={styles.tableRow}>
      <Text style={styles.headerCell}>No</Text>
      {state.playerOneSelections.map((player, index) => (
        <Text key={index} style={styles.headerCell}>{player}</Text>
      ))}
    </View>
 );

// const handleItemSelection = (rowIndex, colIndex) => {
//   // Toggle the selection of cells
//   if (selectedCells[`${rowIndex}-${colIndex}`]) {
//     // If the cell was already selected, deselect it
//     const { [`${rowIndex}-${colIndex}`]: _, ...updatedSelectedCells } = selectedCells;
//     setSelectedCells(updatedSelectedCells);
//   } else {
//     // If the cell was not selected, select it with the current player
//     setSelectedCells({ ...selectedCells, [`${rowIndex}-${colIndex}`]: currentPlayer });

//     // Switch to the next player
//     setCurrentPlayer(currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne');
//   }
// };

const handleItemSelection = (rowIndex, colIndex) => {
console.log('sound', state.sound)
  if (state.sound) {
    state.sound.playAsync();
  }
  // Toggle the selection of cells
  if (selectedCells[`${rowIndex}-${colIndex}`]) {
    // If the cell was already selected, deselect it
    const { [`${rowIndex}-${colIndex}`]: _, ...updatedSelectedCells } = selectedCells;
    setSelectedCells(updatedSelectedCells);
  } else {
    // If the cell was not selected, select it with the current player
    setSelectedCells({ ...selectedCells, [`${rowIndex}-${colIndex}`]: currentPlayer });

    // Switch to the next player and update isPlayerOneActive and isPlayerTwoActive
    if (currentPlayer === 'playerOne') {
      setCurrentPlayer('playerTwo');
      setIsPlayerOneActive(false);
      setIsPlayerTwoActive(true);
    } else {
      setCurrentPlayer('playerOne');
      setIsPlayerOneActive(true);
      setIsPlayerTwoActive(false);
    }
  }
};



 const handleSettingPressedCell = ({ row: rowIndex, col: colIndex }) => {

  setState({...state, pressedCell:{ row: rowIndex, col: colIndex }})

 }

//  const renderRow = (playerTwo, rowIndex) => (
//     <View key={rowIndex} style={styles.tableRow}>
//       <Text style={styles.cell}>{playerTwo}</Text>
//       {state.playerOneSelections.map((playerOne, colIndex) => (
//         <TouchableHighlight
//           key={colIndex}
//           style={[styles.cell, pressedCell && pressedCell.row === rowIndex && pressedCell.col === colIndex && styles.pressedCell]}
//           onPressIn={() => setPressedCell({ row: rowIndex, col: colIndex })}
//           // onPressOut={() => setPressedCell(null)}
//           onPress={() => handleItemSelection(rowIndex, colIndex)}
//           underlayColor="#DDDDDD"
//           activeOpacity={0.6}>
//           <Text></Text>
//         </TouchableHighlight>
//       ))}
//     </View>
//  );


const renderRow = (playerTwo, rowIndex) => (
  <View key={rowIndex} style={styles.tableRow}>
    <Text style={styles.cell}>{playerTwo}</Text>
    {state.playerOneSelections.map((playerOne, colIndex) => (
      <TouchableHighlight
        key={colIndex}
        style={[
          styles.cell,
          selectedCells[`${rowIndex}-${colIndex}`] === 'playerOne' && { backgroundColor: 'red' }, // Set red background for playerOne's selection
          selectedCells[`${rowIndex}-${colIndex}`] === 'playerTwo' && { backgroundColor: 'yellow' }, // Set yellow background for playerTwo's selection
        ]}
        onPress={() => handleItemSelection(rowIndex, colIndex)}
        underlayColor="#DDDDDD"
        activeOpacity={0.6}>
        <Text></Text>
      </TouchableHighlight>
    ))}
  </View>
);

const renderGameBoard = () => {
  // setCurrentPlayer('playerOne');
 
    return (
      <View style={styles.table}>
        {renderHeader()}
        {state.playerTwoSelections.map(renderRow)}
      </View>
    );
 
};

const onStartGame= () => {

  setState({...state, hasGameStarted:true})
}


console.log('has game started', state.hasGameStarted)

const renderStartButton = () => {
  console.log('Length', state.playerOneSelections.length, state.playerTwoSelections.length);
  if (state.playerOneSelections.length > 0 && state.playerTwoSelections.length > 0) {
    return (
      <View style={styles.startButtonContainer}>
      <TouchableOpacity style={styles.startButton} onPress={onStartGame}>
        <Text style={styles.barText}>Start</Text>
      </TouchableOpacity>
      </View>
    );
  } else {
    return (

      <View style={styles.startMessageContainer}>

       <Text style={styles.barText}>Tap on the Avatar For Selection</Text>
      
      </View>
      
    )
  }
};




  return (
    <View style={styles.container}>
      <View style={styles.playersBarContainer}>
        <View style={styles.circleContainer}>
          <TouchableOpacity onPress={togglePlayerOneModal}>
            <Animated.View style={[styles.redCircle, { opacity: opacityPlayerOne }]}>
              <Image
                source={require('../../../assets/images/ghost.png')}
                style={styles.image}
              />
            </Animated.View>
            <Text style={styles.barText}>You</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bar}></View>
        <View style={styles.circleContainer}>
          <TouchableOpacity onPress={togglePlayerTwoModal}>
            <Animated.View style={[styles.yellowCircle, { opacity: opacityPlayerTwo }]}>
              <Image
                source={require('../../../assets/images/ghost.png')}
                style={styles.image}
              />
            </Animated.View>
          </TouchableOpacity>
          <Text style={styles.barText}>Android</Text>
        </View>
        
      </View>
      
      <PlayerOneModal
        isVisible={state.isPlayerOneModalVisible}
        modalOptions={options}
        onOptionSelect={handlePlayerOneSelections}
        onClose={togglePlayerOneModal}
      />

      <PlayerTwoModal
        isVisible={state.isPlayerTwoModalVisible}
        modalOptions={options2}
        onOptionSelect={handlePlayerTwoSelections}
        onClose={togglePlayerTwoModal}
      />

      <View style = {styles.generalGameBoard}>
        {!state.hasGameStarted && (renderStartButton())}
        {state.hasGameStarted && (renderGameBoard())}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  
  container: {
    flex: 1,
    backgroundColor: '#4b4bc8',
    // alignItems: 'center',
  },

  playersBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 70,
    backgroundColor: 'lightgray',
    borderRadius:20
  },
  circleContainer: {
    alignItems: 'center',
  },
  redCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
  },
  redCircleBlink: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  yellowCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'yellow'
  },
  // gameBoard:{
  //   height:300,
  //   width:300,
  //   backgroundColor: 'lightgray',
  //   marginVertical:20,
  //   marginHorizontal:50
  // },

  startButtonContainer:{

    justifyContent:"center",
    alignItems:'center'

  },

  startMessageContainer:{

    marginTop:height/3,
    marginHorizontal:20

  },

  startButton:{

    marginVertical:30,
    backgroundColor:"lightgray",
    paddingVertical:20,
    paddingHorizontal:50,
    borderRadius:15,

  },

  generalGameBoard:{
    justifyContent:'center'
  },


  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  barText: {
    marginTop: 5,
    fontFamily:'valorax'
  },
  bar: {
    flex: 1,
    height: 2,
    marginHorizontal: 10,
   
  },

  table: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'lightgray',
    margin: 20,
    borderRadius: 10, // Rounded corners for the table
 },
 tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    backgroundColor: 'lightgray',
 },
 headerCell: {
    flex: 1,
    padding: 10,
    // textAlign: 'center',
    fontFamily:'myriadBold',
    fontSize:8,
    borderRightWidth: 1,
    borderColor: 'black',
    backgroundColor: '#2277ee', // Different background color for headers
    color: '#ffffff', // White text for headers
 },
 cell: {
    flex: 1,
    padding: 10,
    // textAlign: 'center',
    borderRightWidth: 1,
    // borderLeftWidth:1,
    // borderTopWidth:1,
    // borderBottomWidth:1,
    borderColor: 'black',
    fontFamily:'myriadBold',
    fontSize:8,
    // borderRadius:40,
    // marginHorizontal:5,
    // marginVertical:5
 },
 pressedCell: {
    transform: [{ scale: 1.1 }], // Scales up the cell
    backgroundColor: 'red', // Change background color on press
 },

});

export default VersusAndroid;
