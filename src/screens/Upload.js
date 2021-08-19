import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions, ScrollView, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import * as DocumentPicker from 'expo-document-picker';
import PropTypes from 'prop-types';
import Topbar from '../components/Topbar';
import SectionList from '../components/SectionList';
import { connect } from 'react-redux'
import { uploadAudioAction } from '../actions/UploadAction'

const Upload = ({navigation, audioList, uploadAudioAction}) => {

    const [doc, setDoc] = useState({});
    const [url, setUrl] = useState("");
    const [audioType, setAudioType] = useState("");

    pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
            if (response.type == 'success') {
                let { name, size, uri } = response;
                let nameParts = name.split('.');
                let fileType = nameParts[nameParts.length - 1];

                var fileToUpload = {
                    name: name,
                    size: size,
                    uri: uri,
                    type: "application/" + fileType
                };

                setDoc(fileToUpload);
            }
        });
    }

    onTouchUpload = () => {

        if (Object.keys(doc).length === 0) {
            alert("You should select an audio file.");
        }
        else if (url.length == 0) {
            alert("You should input the instruction url.");
        }
        else if (audioType.length == 0) {
            alert("You should select an audio type");
        }
        else {
            let audioData = {
                type: audioType,
                name: doc.name,
                url,
                uri: doc.uri,
                checked: false,
            }
    
            uploadAudioAction(audioData);
            navigation.navigate('Section');
        }
    }

    let supportType = [
        {
            label: 'Base Audio',
            value: 'Base Audio'
        },
        {
            label: 'Special Audio',
            value: 'Special Audio'
        },
        {
            label: 'Additionals',
            value: 'Additionals'
        }
    ];

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Topbar />
            </View>
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.touchBrowse} onPress={pickDocument}>
                        <TextInput editable={false} value={doc.name} style={styles.inputs} placeholder={'Select Audio File'} ></TextInput>
                    </TouchableOpacity>
                    <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/android/24/000000/mac-client.png' }} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        value={url}
                        placeholder="Input Instruction URL"
                        underlineColorAndroid='transparent'
                        onChangeText={(value) => setUrl(value)} />
                    <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/android/24/000000/link.png' }} />
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.dropContainer}>
                        <Dropdown
                            style={styles.dropDown}
                            placeholder="Select Audio Type"
                            data={supportType}
                            onChangeText={(value) => setAudioType(value)}
                        />
                    </View>
                </View>

                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={onTouchUpload}>
                    <Text style={styles.loginText}>Upload</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// export default Upload;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ebebeb',
    },

    header: {
        width: '100%',
    },

    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        width: '100%',
    },

    touchBrowse: {
        width: '85%',
        height: '100%',
        justifyContent: 'center',
    },

    dropContainer: {
        flex: 1,
        marginRight: 10,
        borderWidth: 0,
        justifyContent: 'center',
    },

    dropDown: {
        flex: 1,
        marginLeft: 20,
        // borderWidth: 1,
        // borderColor: '#000',
    },

    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        width: '80%',
    },

    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        justifyContent: 'center'
    },

    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },

    loginButton: {
        backgroundColor: "#3b35ad",

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },

    loginText: {
        color: 'white',
    },
});

Upload.propTypes = {
    uploadAudioAction: PropTypes.func.isRequired,
    audioList: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    audioList: state.audioState.audioList,
});

Upload.navigationOptions = () => ({
    title: "Upload"
})

export default connect(mapStateToProps, { uploadAudioAction })(Upload);