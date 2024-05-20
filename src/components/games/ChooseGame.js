import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Share } from 'react-native';
import { Audio } from 'expo-av';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


import GameColumn from './gamesItems/GameCoiumn';
import versusImage from '../../../assets/images/vs.png'
import playOnlineImage from "../../../assets/images/online.png"
import controllerImage from "../../../assets/images/controller.png"
import cornerImage from " ../../../assets/images/corner.jpg"
import ShareColumn from './gamesItems/ShareColumn';


const Row = ({ children }) => {
  return <View style={styles.row}>{children}</View>;
};





const ChooseGame = () => {

    
  const gameState = useSelector((state) => state.game)



  return (
    <View style={styles.container}>

      <View style={styles.backgroundTomato}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Play</Text>
        </View>

        <View style={styles.contentContainer}>

          <Row>
            <GameColumn imageSource={versusImage} name="Two players" route="twoPlayers" />
            <View style={styles.spaceBetweenColumns} />
            <GameColumn imageSource={playOnlineImage} name="Play Online" route="versusAndroid" />
          </Row>

          <Row>
            <GameColumn imageSource={controllerImage} name="Report Bug" route="requestFeature" />
            <View style={styles.spaceBetweenColumns} />
            <ShareColumn imageSource={cornerImage} name="Share"  />
          </Row>

        </View>

      </View>
    </View>
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

export default ChooseGame;
