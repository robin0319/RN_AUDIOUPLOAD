import React, { Component, propTypes } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import Topbar from '../components/Topbar';
import SectionList from '../components/SectionList';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeOrder } from '../actions/UploadAction'

class Section extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: -1,
        }

        this.onTouchPlay = this.onTouchPlay.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }

    onTouchUpload() {
        this.props.navigation.navigate('Upload');
    }

    onTouchPlay() {
        var flag = false;
        for (let i = 0; i < this.props.audioList.length; i++) {
            if (this.props.audioList[i].checked == true) {
                flag = true;
                break;
            }
        }

        if (!flag) {
            alert("Please select audio files to play.");
        } else {
            this.props.navigation.navigate('Play');
        }
    }

    selectChange = (index) => {
        if (this.state.selectedIndex == -1) {
            this.setState({
                selectedIndex: index,
            });
        } else {
            this.props.changeOrder(this.state.selectedIndex, index);
            this.setState({
                selectedIndex : -1,
            });
        }
    }

    renderDrawer = () => {
        var selectedIndex = this.state.selectedIndex;
        if (selectedIndex != -1 && this.props.audioList[selectedIndex].checked == false) {
            this.setState({
                selectedIndex: -1
            });
            selectedIndex = -1;
        }
        var selChange = this.selectChange;
        return (
            <View style={styles.drawerContainer}>
                <Text style={styles.drawHeaderText}>Change Order</Text>
                <ScrollView style={styles.drawScroll}>
                    {this.props.audioList.map(function (item, index) {
                        if (item.checked == true) {
                            if (index == selectedIndex) {
                                return (
                                    <View key={index} style={styles.itemSelectedContainer}>
                                        <TouchableOpacity style={styles.drawTouchStyle} onPress={() => { selChange(index) }}>
                                            <Text style={styles.drawText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            } else {
                                return (
                                    <View key={index} style={styles.itemContainer}>
                                        <TouchableOpacity style={styles.drawTouchStyle} onPress={() => { selChange(index) }}>
                                            <Text style={styles.drawText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        } else {
                            return null;
                        }
                    })}
                </ScrollView>
            </View>
        );
    };

    render() {
        return (
            <DrawerLayout
                drawerWidth={200}
                drawerPosition={DrawerLayout.positions.Left}
                drawerType="front"
                drawerBackgroundColor="#ddd"
                renderNavigationView={this.renderDrawer}
                style={{ flex: 1, width: '100%', height: '100%' }}>

                <View style={styles.container} >
                    <View style={styles.header}>
                        <Topbar />
                    </View>
                    <View style={styles.content}>
                        <ScrollView style={styles.scrollStyle}>
                            <SectionList title='Base Audio' />
                            <SectionList title='Special Audio' />
                            <SectionList title='Additionals' />
                        </ScrollView>
                        <View style={styles.bottom}>
                            <TouchableOpacity style={styles.touchStyle1} onPress={() => this.onTouchUpload()}>
                                <Text style={styles.textStyle}> Upload </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.touchStyle2} onPress={() => this.onTouchPlay()}>
                                <Text style={styles.textStyle}> Play </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </DrawerLayout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    drawerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10,
    },

    drawTouchStyle: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    itemContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },

    itemSelectedContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c2c2c2',
        padding: 5,
    },

    drawScroll: {
        marginTop: 20,
        marginLeft: 5
    },

    drawText: {
        fontSize: 15,
    },

    drawHeaderText: {
        fontSize: 20,
        marginTop: 30,
    },

    header: {
        width: '100%',
    },

    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 0
    },

    scrollStyle: {
        flex: 3,
        marginTop: 0,
    },

    bottom: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        width: '100%',
    },

    touchStyle1: {
        backgroundColor: '#ff9600',
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
        margin: 10,
    },

    touchStyle2: {
        backgroundColor: '#00978a',
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
        margin: 10,
    },

    textStyle: {
        color: '#FFFFFF',
        fontSize: 20,
        padding: 10,
    },
});


Section.propTypes = {
    audioList: PropTypes.array.isRequired,
    changeOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    audioList: state.audioState.audioList,
});

export default connect(mapStateToProps, {changeOrder})(Section);