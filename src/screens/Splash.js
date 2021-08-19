import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, ImageBackground} from 'react-native';

export default class Splash extends Component {

    render() {
        return (
        <View style={styles.container} >
            <ImageBackground style={styles.myImage} source={require('../../assets/background.png')}>
                <Text style={styles.logoText}>AudioLesson</Text>
            </ImageBackground>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  myImage: {
      width: '100%',
      height: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },

  logoText: {
      color: '#FFFFFF',
      fontSize: 30
  }
});