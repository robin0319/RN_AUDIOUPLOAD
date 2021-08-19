import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';

import Splash from './src/screens/Splash';
import Section from './src/screens/Section';
import Navigation from './src/Navigation';


//Redux
import { Provider } from 'react-redux';
import store from './src/store';


// const fetchFonts = () => {
//   return Font.loadAsync({
//     'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
//     'Lato-BoldItalic': require('./assets/fonts/Lato-BoldItalic.ttf'),
//     'Lato-Italic': require('./assets/fonts/Lato-Italic.ttf'),
//     'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
//     'Lato-LightItalic': require('./assets/fonts/Lato-LightItalic.ttf'),
//     'Lato-Medium': require('./assets/fonts/Lato-Medium.ttf'),
//     'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
//     'Lato-Semibold': require('./assets/fonts/Lato-Semibold.ttf'),
//     'Lato-Thin': require('./assets/fonts/Lato-Thin.ttf'),
//   });
// };


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
      // dataLoaded: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ timePassed: true });
    }, 3000);

    // if (!this.state.dataLoaded) {
    //   return (
    //     <AppLoading
    //       startAsync={fetchFonts}
    //       onFinish={() => this.setState({ dataLoaded: true })}
    //     />
    //   );
    // }
  }

  render() {
    if (!this.state.timePassed) {
      return <Splash />;
    } else {
      return (
        <Provider store={ store }>
          <Navigation />  
        </Provider>
      );
    }
  }
}
