import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image ,Dimensions, TouchableHighlight, Animated, Button, ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';




import PlayerSelectionsModal from './gameModals/PlayerSelectionsModal';
import PlayerTwoModal from './gameModals/PlayerTwoModal';
import "./css/custom.css"
import PlayerOneModal from './gameModals/PlayerOneModal';
import ball from "../../../assets/images/ball.png";
import mushroom from "../../../assets/images/mushroom.png"
import ghost  from "../../../assets/images/ghost.png"
import kit1 from "../../../assets/images/kit1.png"
import kit2 from "../../../assets/images/kit2.png"
import CacheImage from "./../utilities/CacheImage"


// const fetchedData = [
//   { itemName: "Pops", image: { downloadUrl: "https://firebasestorage.googleapis.com/v0/b/football-connect-4.appspot.com/o/assets%2Fitems%2F35RGES?alt=media&token=c73bd462-d61b-4901-b4ce-c77d323b87c0" }, type: "playerOne" },
//   { itemName: "Digs", image: { downloadUrl: "https://firebasestorage.googleapis.com/v0/b/football-connect-4.appspot.com/o/assets%2Fitems%2F35RGES?alt=media&token=c73bd462-d61b-4901-b4ce-c77d323b87c0" }, type: "playerOne" },
//   { itemName: "Ops", image: { downloadUrl: "https://firebasestorage.googleapis.com/v0/b/football-connect-4.appspot.com/o/assets%2Fitems%2F35RGES?alt=media&token=c73bd462-d61b-4901-b4ce-c77d323b87c0" }, type: "playerOne" },
//   { itemName: "Tups", image: { downloadUrl: "https://firebasestorage.googleapis.com/v0/b/football-connect-4.appspot.com/o/assets%2Fitems%2F35RGES?alt=media&token=c73bd462-d61b-4901-b4ce-c77d323b87c0" }, type: "playerTwo" }
// ];







// const options = ["Zlatan", "Chelsea", "M.Arteta", "M.Mount", "Ajax", "A.Robben", "N.Ake", "Fc Porto", "EPL", "Mourinho", "Tevez", "30+ G/A", "Mexico", "Iniesta","KDB","FA Cup", "El Clasico", "Suarez", "Pato", "Neymar", "MSN", "2010 W.Cup", "La Liga", "Euro 08"]
const options2= ['Argentina', 'Liga MX', 'A.Vidal', 'Pep', 'World Cup', 'Africa','£200K/W', 'Michu', 'Hat-trick', 'Balon dor ', 'Africa', "EFL", "MUFC", "R9", "Kaka", "Klopp", "Nunez", "Turkey", "PAOK", "Rangers", "AFCON", "Everton", "Mbappe", "CR7", "Nani" ];


const { width, height } = Dimensions.get('window');
const tableHeight = height/2;
const cellHeight = tableHeight/7
const audioFiles = {
  enter:require("../../../assets/sounds/enter.mp3"),
  start:require("../../../assets/sounds/start.mp3"),
  restart:require("../../../assets/sounds/restart.mp3"),
  select:require("../../../assets/sounds/select.mp3"),
};



export default function TwoPlayers() {

const [selectedCells, setSelectedCells] = useState([]);
const [currentPlayer, setCurrentPlayer] = useState('playerOne');
const [isPlayerOneActive, setIsPlayerOneActive] = useState(true);
const [isPlayerTwoActive, setIsPlayerTwoActive] = useState(false);
// Assuming you have a state variable for the sound
const [sound, setSound] = useState(null);



const [state, setState] = useState({
  isPlayerOneModalVisible:false,
  isPlayerTwoModalVisible:false,
  hasGameStarted:false,
  playerTwoSelections:[],
  playerOneSelections:[],
  items:[]

});






const gameState = useSelector((state) => state.game);

useEffect(() => {
  setState((prevState) => ({
    ...prevState,
    items: gameState.items
  }));
}, [gameState]);

console.log('Component State:', state.items);
console.log('GameState:', gameState);


const option = state.items.filter(item => item.type === "playerOne");
const option2 = state.items.filter(item => item.type === "playerTwo");

console.log('option', state.items)



// this basically controls animations of red and yellow cirlces for player 1 and 2

const opacityPlayerOne = useRef(new Animated.Value(1)).current;
const opacityPlayerTwo = useRef(new Animated.Value(1)).current;
 
 // State to control the animation
 const [isAnimatingPlayerOne, setIsAnimatingPlayerOne] = useState(false);
 const [isAnimatingPlayerTwo, setIsAnimatingPlayerTwo] = useState(false);


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


  const togglePlayerOneModal = () => {
    setState({
      ...state,
      isPlayerOneModalVisible: !state.isPlayerOneModalVisible,
    });
  };

  const togglePlayerTwoModal = () => {
    setState({
      ...state,
      isPlayerTwoModalVisible: !state.isPlayerTwoModalVisible,
    });
  };


  const handlePlayerOneSelections = (item) => {
    setState({ ...state, playerOneSelections: item });
  };

  console.log('PL1', state.playerOneSelections)
  const handlePlayerTwoSelections = (item) => {
    setState({ ...state, playerTwoSelections: item });
  };


  const renderStartOverButton = () => {
    console.log('Length of selected', selectedCells);
    if (Object.keys(selectedCells).length > 0 ) {
      return (
        <View style={styles.startOverButtonStyles} >
        <TouchableOpacity style={styles.startButton} onPress={onStartOverGame}>
          <Text style={styles.barText}>Start Over</Text>
        </TouchableOpacity>
        </View>
      );
    } else {
      return null
    }
  };

//   const renderHeader = () => (
//     <View style={styles.tableRow}>
//       <Text style={styles.headerCell}>No</Text>
//       {state.playerOneSelections.map((player, index) => (
//         <Text key={index} style={styles.headerCell}>{player}</Text>
//       ))}
//     </View>
//  );

// const PL1 = [{"image": {"downloadUrl": "https://firebasestorage.googleapis.com/v0/b/football-connect-4.appspot.com/o/assets%2Fitems%2F35RGES?alt=media&token=c73bd462-d61b-4901-b4ce-c77d323b87c0"}, "itemName": "Pops", "type": "playerOne"}, {"image": {"downloadUrl": "https://firebasestorage.googleapis.com/v0/b/football-connect-4.appspot.com/o/assets%2Fitems%2F35RGES?alt=media&token=c73bd462-d61b-4901-b4ce-c77d323b87c0"},
//  "itemName": "Digs", "type": "playerOne"}, {"image": {"downloadUrl": "https://firebasestorage.googleapis.com/v0/b/football-connect-4.appspot.com/o/assets%2Fitems%2F35RGES?alt=media&token=c73bd462-d61b-4901-b4ce-c77d323b87c0"}, "itemName": "Ops", "type": "playerOne"},
//  {"image": {"downloadUrl": "https://firebasestorage.googleapis.com/v0/b/football-connect-4.appspot.com/o/assets%2Fitems%2F35RGES?alt=media&token=c73bd462-d61b-4901-b4ce-c77d323b87c0"}, "itemName": "Ops", "type": "playerOne"},
//  {"image": {"downloadUrl": "https://firebasestorage.googleapis.com/v0/b/football-connect-4.appspot.com/o/assets%2Fitems%2F35RGES?alt=media&token=c73bd462-d61b-4901-b4ce-c77d323b87c0"}, "itemName": "Ops", "type": "playerOne"},
//  {"image": {"downloadUrl": "https://firebasestorage.googleapis.com/v0/b/football-connect-4.appspot.com/o/assets%2Fitems%2F35RGES?alt=media&token=c73bd462-d61b-4901-b4ce-c77d323b87c0"}, "itemName": "Ops", "type": "playerOne"},
//  {"image": {"downloadUrl": "https://firebasestorage.googleapis.com/v0/b/football-connect-4.appspot.com/o/assets%2Fitems%2F35RGES?alt=media&token=c73bd462-d61b-4901-b4ce-c77d323b87c0"}, "itemName": "Ops", "type": "playerOne"},


// ]


const renderHeader = () => (
  <View style={styles.tableRow}>
    <Text style={styles.headerCell}>No</Text>
    {state.playerOneSelections.map((player, index) => (
      <View style={styles.headerCell} key={player.image.imageID}>
      {/* <Image
        key={index}
        source={{ uri: player.image.downloadURL }}
        style={styles.imageCell}
      /> */}
       <CacheImage source={{ uri: player.image.downloadURL }} cacheKey={player.image.downloadURL.slice(-8)} style={styles.imageCell} />
      </View>
    ))}
  </View>
);



const handleItemSelection =  async(rowIndex, colIndex) => {

 

  // Toggle the selection of cells
  if (selectedCells[`${rowIndex}-${colIndex}`]) {
    // If the cell was already selected, deselect it
    const { [`${rowIndex}-${colIndex}`]: _, ...updatedSelectedCells } = selectedCells;
    setSelectedCells(updatedSelectedCells);
    const newSound = await Audio.Sound.createAsync(audioFiles.select, { shouldPlay: true });
    await newSound.playAsync(); 
   
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
    const newSound = await Audio.Sound.createAsync(audioFiles.select, { shouldPlay: true });
    await newSound.playAsync(); 
    
     
  }
};

console.log('seletd CLS' , selectedCells)

// const renderRow = (playerTwo, rowIndex) => (
//   <View key={rowIndex} style={styles.tableRow}>
//     <Text style={styles.cell}>{playerTwo}</Text>
//     {state.playerOneSelections.map((playerOne, colIndex) => (
//       <TouchableHighlight
//         key={colIndex}
//         style={[
//           styles.cell,
//           selectedCells[`${rowIndex}-${colIndex}`] === 'playerOne' && { backgroundColor: 'red' }, // Set red background for playerOne's selection
//           selectedCells[`${rowIndex}-${colIndex}`] === 'playerTwo' && { backgroundColor: 'yellow' }, // Set yellow background for playerTwo's selection
//         ]}
//         onPress={() => handleItemSelection(rowIndex, colIndex)}
//         underlayColor="#DDDDDD"
//         activeOpacity={0.6}>
       

//       </TouchableHighlight>
//     ))}
//   </View>
// );

const renderRow = (playerTwo, rowIndex, imageSource) => (
  <View key={rowIndex} style={styles.tableRow}>
    {/* <Text style={styles.columnOne}>{playerTwo}</Text> */}
    <View style={styles.columnOne} key={playerTwo.image.imageID}>
      {/* <Image
        key={rowIndex}
        source={{ uri: playerTwo.image.downloadURL }}
        style={styles.imageCell}
      /> */}
      
     <CacheImage source={{ uri: playerTwo.image.downloadURL }} cacheKey={playerTwo.image.downloadURL.slice(-8)} style={styles.imageCell} />
               
    </View>
    {state.playerOneSelections.map((playerOne, colIndex) => (
      <TouchableHighlight
        key={colIndex}
        style={[
          styles.cell,
          selectedCells[`${rowIndex}-${colIndex}`] === 'playerOne'? { backgroundColor: 'red' } : {},
          selectedCells[`${rowIndex}-${colIndex}`] === 'playerTwo'? { backgroundColor: 'yellow' } : {},
        ]}
        onPress={() => handleItemSelection(rowIndex, colIndex)}
        underlayColor="#DDDDDD"
        activeOpacity={0.6}>
        <View style={styles.roundCells}>
          {/* Conditionally render the image based on selection */}
          {selectedCells[`${rowIndex}-${colIndex}`] === 'playerOne'
          //  && (
          //   <Image source={kit1} style={{ width: 20, height: 20 }} />
          // )
          }
           {selectedCells[`${rowIndex}-${colIndex}`] === 'playerTwo'
          //   && (
          //   <Image source={kit2} style={{ width: 20, height: 20 }} />
          // )
          }
        </View>
      </TouchableHighlight>
    ))}
  </View>
);




const renderGameBoard = () => {
 
    return (
      <View>
      <View style={styles.table}>
        {renderHeader()}
        {state.playerTwoSelections.map(renderRow)}
      </View>
      {renderStartOverButton()}
      </View>
     
    );
 
};

const onStartGame= async() => {

  setState({...state, hasGameStarted:true})
  const newSound = await Audio.Sound.createAsync(audioFiles.start, { shouldPlay: true });
  await newSound.playAsync(); 
}

const onStartOverGame = async() => {
   

  setState({...state, hasGameStarted:true})
  setSelectedCells([])
  const newSound = await Audio.Sound.createAsync(audioFiles.restart, { shouldPlay: true });
  
  await newSound.playAsync();
  
}


const renderStartButton = () => {
  if (state.playerTwoSelections.length > 0) {
    return (
      <View style={styles.startButtonContainer}>
      <TouchableOpacity style={styles.startButton} onPress={onStartGame}>
        <Text style={styles.barText}>Start</Text>
      </TouchableOpacity>
      </View>
    );
  } 
  
  else {
    return (

      <View style={styles.startMessageContainer}>

       <Text style={styles.messageText}>Tap on the Avatar</Text>
      
      </View>
      
    )
  }
};

  return (
    <ImageBackground source={require('../../../assets/images/pitch2.jpg')} style={styles.backgroundImage} > 
    <LinearGradient colors={['#4b4bc8', 'transparent']} style={styles.gradientOverlay}  />
        <View style={styles.container}>
          <View style={styles.playersBarContainer}>
            <View style={styles.circleContainer}>
              <TouchableOpacity onPress={togglePlayerOneModal}>
                <Animated.View style={[styles.redCircle, { opacity: opacityPlayerOne }]}>
                  <Image
                    source={ghost}
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
                    source={mushroom}
                    style={styles.image}
                  />
                </Animated.View>
              </TouchableOpacity>
              <Text style={styles.barText}>Opponent</Text>
            </View>
            
          </View>
          
          <PlayerOneModal
            isVisible={state.isPlayerOneModalVisible}
            modalOptions={option}
            onOptionSelect={handlePlayerOneSelections}
            onClose={togglePlayerOneModal}
          />

          <PlayerTwoModal
            isVisible={state.isPlayerTwoModalVisible}
            modalOptions={option2}
            onOptionSelect={handlePlayerTwoSelections}
            onClose={togglePlayerTwoModal}
          />

          <View style = {styles.generalGameBoard}>
            {!state.hasGameStarted && (renderStartButton())}
            {state.hasGameStarted && (renderGameBoard())}
          </View>
          

        </View> 
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  
  container: {
    flex: 1,
    // backgroundColor: '#4b4bc8',
    // alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'contain' depending on your needs
  },

  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0, // Ensure the gradient covers the full height
    height:height
    // No need to specify height here
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

  imageCell: {
    width: 35,
    height: 35,
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
    alignItems:'center',
    marginTop:height/3

  },

  startOverButtonStyles:{
    marginHorizontal:30,
    justifyContent:'center',
    alignItems:'center'

  },

  startMessageContainer:{

    marginTop:height/3,
    marginHorizontal:20,
    alignItems:'center'

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
    fontFamily:'valorax',
    color:'black'
  },
  messageText: {
    marginTop: 5,
    fontFamily:'valorax',
    color:'white'
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
    marginTop:height/8,
    height:height/2
 },
 tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,

    backgroundColor: 'lightgray',
    height:cellHeight
    
 },
 headerCell: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical:25,
    fontFamily:'myriadBold',
    fontSize:8,
    borderWidth: 1,
    
    backgroundColor: '#4b4bc8', 
    color: '#ffffff', 
    justifyContent: 'center',
  alignItems: 'center',
 },

 headerCell2: {
  flex: 1,
  paddingHorizontal: 10,
  paddingVertical:25,
  fontFamily:'myriadBold',
  fontSize:8,
  borderWidth: 1,
  marginRight:10,
  
  backgroundColor: '#4b4bc8', 
  color: '#ffffff', 
  textAlign:"center",
  justifyContent:"center"
},
 columnOne:{

  flex: 1,
  paddingHorizontal: 10,
  paddingVertical:25,
  borderWidth: 1,
  fontFamily:'myriadBold',
  fontSize:7,
  justifyContent: 'center',
  alignItems: 'center',

 },
//  cell: {

//     flex: 1,
//     paddingHorizontal: 8,
//     paddingVertical:25,
//     marginHorizontal:3,
//     marginVertical:2,
//     // borderLeftWidth: 1,
//     height:20,
//     width:20,
//     borderBottomRightRadius:1000,
//     borderBottomLeftRadius:1000,
//     // borderEndEndRadius:200,

//     // borderRadius: "1000%",
//     backgroundColor:"white",
   
//     fontFamily:'myriadBold',
//     fontSize:8,
//     textAlign:"center",
//     justifyContent:"center"

//  },

cell: {
  flex: 1,
  paddingHorizontal: 8,
  paddingVertical: 20,
  marginHorizontal: 3,
  marginVertical: 2,
  height: 20,
  width: 20,
  borderRadius: 0, // Adjust this value to make the cell more or less circular
  backgroundColor: "white",
  fontFamily: 'myriadBold',
  fontSize: 8,
  textAlign: "center",
  justifyContent: "center",
  shadowColor: '#000',
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.4,
  shadowRadius: 2,
},

roundCells:{
  height: 20,
  width: 20,
  borderRadius: 20,
  

}

});


