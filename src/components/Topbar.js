import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ImageBackground } from 'react-native';

export default class Topbar extends Component {

    render() {
        return (
            <ImageBackground style={styles.container} source={require('../../assets/topBarBg.png')}>
                <Text style={styles.logoText}>AudioLesson</Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 88,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoText: {
        color: '#FFFFFF',
        fontSize: 20
    }
});