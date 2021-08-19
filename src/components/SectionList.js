import React, { Component, propTypes } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions, Linking } from 'react-native';
import { connect } from 'react-redux';

import { uploadAudioAction, checkedAudio } from '../actions/UploadAction'

class SectionList extends Component {

    constructor(props) {
        super(props);
        // console.log(this.props.audioList);

        this.onChecked = this.onChecked.bind(this);
        this._renderChecked = this._renderChecked.bind(this);
    }

    onChecked(index) {
        this.props.checkedAudio(index);
    }

    _renderChecked(index) {
        if (!this.props.audioList[index].checked) {
            return <Image style={styles.image} source={require("../../assets/unchecked.png")} />
        } else {
            return <Image style={styles.image} source={require("../../assets/checked.png")} />
        }
    }

    render() {
        {
            // section = this.state.data;
            var onItemChecked = this.onChecked;
            var _renderChecked = this._renderChecked;
            var title = this.props.title;
            // console.log(this.props.audioList);
        }

        return (
            <View style={styles.container} >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>

                {this.props.audioList.map(function (item, index) {
                    if (item.type == title) {
                        return (
                            <View key={index} style={styles.itemContainer}>
                                <TouchableOpacity style={styles.touchStyle} onPress={() => { onItemChecked(index) }}>
                                    {_renderChecked(index)}
                                </TouchableOpacity>
                                <View style={styles.content}>
                                    <View style={styles.contentHeader}>
                                        <Text style={styles.name}>{item.name}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.touchStyle} onPress={() => { Linking.openURL(item.url) }}>
                                    <Image style={styles.image} source={require("../../assets/question.png")} />
                                </TouchableOpacity>
                            </View>
                        )
                    } else {
                        return null
                    }
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width,
        flex: 1,
    },

    touchStyle: {
        flex: 2,
    },

    itemContainer: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#ffffff'
    },

    titleContainer: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: "#395de4",
        padding: 10,
        marginTop: 0,
    },

    title: {
        fontSize: 25,
        color: "#FFFFFF",
    },

    content: {
        marginLeft: 16,
        flex: 4,
    },

    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },

    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#000000',
    },

    image: {
        width: 45,
        height: 45,
        marginLeft: 20,
        marginRight: 20,
    },
});

SectionList.propTypes = {
    audioList: PropTypes.array.isRequired,
    uploadAudioAction: PropTypes.func.isRequired,
    checkedAudio: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    audioList: state.audioState.audioList,
});

export default connect(mapStateToProps, { uploadAudioAction, checkedAudio })(SectionList);