import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image,} from 'react-native';
import { useSelector } from 'react-redux';
import { useEffect, useCallback, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";
import { Audio } from 'expo-av';

import reducers from './src/reducers'
import { applyMiddleware, createStore } from 'redux';
const thunkMiddleware = require("redux-thunk").thunk;
import StartApp from './StartApp';



const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);




  useEffect(() => {

   

    async function prepare() {
      try {
        await Font.loadAsync({
          cyberFont: require('./assets/fonts/cyber.ttf'),
          spaceMonkey: require('./assets/fonts/spaceMonkey.otf'),
          paused: require('./assets/fonts/paused.otf'),
          valorax: require('./assets/fonts/valorax.otf'),
          robus: require('./assets/fonts/robus.otf'),
          myriadThin: require('./assets/fonts/myriadThin.ttf'),
          myriadBold: require('./assets/fonts/myriadBold.ttf'),
          myriadText: require('./assets/fonts/myriadText.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
    // playAudio();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      
    }
  }, [appIsReady]);

    // // Check if the device is an iPad or a tablet
    // const isUnsupportedDevice = Platform.OS === 'ios' && Platform.constants.isPad || DeviceInfo.isTablet();

    // if (isUnsupportedDevice) {
    //   Alert.alert(
    //     "Unsupported Device",
    //     "Your device is not supported for optimal use of this app. Please use a mobile phone.",
    //     [
    //       {
    //         text: "OK",
    //         onPress: () => {
    //           // Optionally, navigate the user to a specific screen or exit the app
    //         },
    //       },
    //     ]
    //   );
    //   return null; // Prevent rendering the rest of the app
    // }


  if (!appIsReady) {

    return (
      <View style={styles.gifContainer} >

        <Image source={require('./assets/loader.gif')} style={styles.gifStyle} />

      </View>
    )
  }



  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}
    >

      <Provider store={store}>
        <StartApp />
      </Provider>

    </SafeAreaProvider>
  );
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
