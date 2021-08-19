import React, { Component, propTypes } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Audio } from 'expo-av'

var audioBookPlaylist = [];

class Play extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            playbackInstance: null,
            currentIndex: 0,
            volume: 1.0,
            isBuffering: false,
        }
    }

    async componentDidMount() {
        audioBookPlaylist = [];
        for (let i = 0; i < this.props.audioList.length; i++) {
            if (this.props.audioList[i].checked) {
                audioBookPlaylist.push(this.props.audioList[i]);
            }
        }

        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true
            })

            this.loadAudio()
        } catch (e) {
            console.log(e)
        }
    }

    componentWillUnmount() {
        if (this.state.playbackInstance) {
            this.state.playbackInstance.unloadAsync();
        }
        this.setState({
            isPlaying: false,
            playbackInstance: null,
            currentIndex: 0,
            volume: 1.0,
            isBuffering: false,
        })
    }


    async loadAudio() {
        const { currentIndex, isPlaying, volume } = this.state

        try {
            const playbackInstance = new Audio.Sound()
            const source = {
                uri: audioBookPlaylist[currentIndex].uri
            }

            const status = {
                shouldPlay: isPlaying,
                volume
            }

            playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
            await playbackInstance.loadAsync(source, status, false)
            playbackInstance.setOnPlaybackStatusUpdate(async (status) => {
                if (status.didJustFinish === true) {
                    // audio has finished!
                    this.handleNextTrack();
                    await playbackInstance.unloadAsync()
                }
            })
            this.setState({ playbackInstance })
        } catch (e) {
            console.log(e)
        }
    }

    onPlaybackStatusUpdate = status => {
        this.setState({
            isBuffering: status.isBuffering
        })
    }

    handlePlayPause = async () => {
        const { isPlaying, playbackInstance } = this.state;
        isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

        this.setState({
            isPlaying: !isPlaying
        })
    }

    handlePreviousTrack = async () => {
        let { playbackInstance, currentIndex } = this.state
        if (playbackInstance) {
            await playbackInstance.unloadAsync()
            currentIndex > 0 ? (currentIndex -= 1) : (currentIndex = audioBookPlaylist.length - 1)
            this.setState({
                currentIndex
            })
            this.loadAudio()
        }
    }

    handleNextTrack = async () => {
        let { playbackInstance, currentIndex } = this.state
        if (playbackInstance) {
            await playbackInstance.unloadAsync()
            currentIndex < audioBookPlaylist.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
            this.setState({
                currentIndex
            })
            this.loadAudio()
        }
    }

    renderFileInfo() {
        const { playbackInstance, currentIndex } = this.state
        return playbackInstance ? (
            <View style={styles.trackInfo}>
                <Text style={[styles.trackInfoText, styles.largeText]}>
                    {audioBookPlaylist[currentIndex].name}
                </Text>
                <Text style={[styles.trackInfoText, styles.smallText]}>
                    {audioBookPlaylist[currentIndex].type}
                </Text>
            </View>
        ) : null
    }

    renderDrawer = () => {
        return (
            <View>
                <Text>I am in the drawer!</Text>
            </View>
        );
    };

    render() {
        // console.log(audioBookPlaylist);
        // console.log(this.state.currentIndex);
        return (
            <View style={styles.container} >
                <ImageBackground style={styles.myImage} resizeMode="cover" source={require('../../assets/background.png')}>
                    <Image style={styles.logoImage} source={require('../../assets/playermark.png')} />
                    {this.renderFileInfo()}
                </ImageBackground>

                <View style={styles.controls}>
                    <TouchableOpacity style={styles.control} onPress={() => this.handlePreviousTrack()}>
                        <Image style={styles.controlImg} source={require('../../assets/backward.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.control} onPress={() => this.handlePlayPause()}>
                        {this.state.isPlaying ? (
                            <Image style={styles.controlImg} source={require('../../assets/pause.png')} />
                        ) : (
                                <Image style={styles.controlImg} source={require('../../assets/play.png')} />
                            )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.control} onPress={() => this.handleNextTrack()}>
                        <Image style={styles.controlImg} source={require('../../assets/forward.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    myImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoImage: {
        width: 220,
        height: 220,
        borderRadius: 110,
    },

    controlImg: {
        width: 60,
        height: 60,
    },

    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e2e2e2',
    },
    control: {
        margin: 20
    },

    trackInfo: {
        padding: 40,
        backgroundColor: 'transparent'
    },

    largeText: {
        fontSize: 22
    },

    smallText: {
        fontSize: 16
    },

    trackInfoText: {
        textAlign: 'center',
        flexWrap: 'wrap',
        color: '#550088'
    },
});

Play.propTypes = {
    audioList: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    audioList: state.audioState.audioList,
});

export default connect(mapStateToProps)(Play);