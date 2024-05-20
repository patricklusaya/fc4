import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import your screens here

import ChooseGame from './src/components/games/ChooseGame';
import VersusAndroid from './src/components/games/versusAndroid'
import BackIcon from './src/icons/Icons';
import TwoPlayers from './src/components/games/TwoPlayers';
import RequestFeature from './src/components/games/RequestFeature';

const Stack = createStackNavigator();

const RouterComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={ChooseGame} options={{ headerShown: false }} />
        <Stack.Screen name="versusAndroid" component={VersusAndroid} options={{ headerShown: false }}   />
        <Stack.Screen name="twoPlayers" component={TwoPlayers} options={{ headerShown: false }}   />
        <Stack.Screen name="requestFeature" component={RequestFeature} options={{ headerShown: false }}   />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouterComponent;
