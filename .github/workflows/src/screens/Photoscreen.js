'use strict';
import React, {useState, PureComponent, useRef} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import CollapsibleView from '@eliav2/react-native-collapsible-view';
import ToggleSwitch from '../components/ToggleSwitch';
import {RNCamera} from 'react-native-camera';
import {NavigationContainer} from '@react-navigation/native';
import {
  PESDK,
  PhotoEditorModal,
  Configuration,
} from 'react-native-photoeditorsdk';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Photoscreen = ({navigation, route}) => {
  console.log(route.params);
  const [cameraSwitch, setcameraSwitch] = React.useState(false);
  // let camera = useRef(null);
  const switchCameraFun = () => {
    setcameraSwitch(!cameraSwitch);
  };
  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
    PESDK.openEditor(data.uri).then(
      result => {
        console.log(result.image);
        navigation.navigate('PhotoPreviewScreen', {
          uri: result.image,
          sono: route.params.sono,
        });
      },
      error => {
        console.log(error);
      },
    );

    // // alert("Photo Captured Succesfully")
    // navigation.navigate('PhotoPreviewScreen', {
    //   uri: data.uri,
    //   sono: route.params.sono,
    // });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          backgroundColor: '#fff',
          paddingVertical: 5,
          flexDirection: 'row',
          alignItems: 'center',
          width: '95%',
          alignSelf: 'center',
        }}>
        <Icon name="arrow-back-outline" size={24} color={'#000'} />
        <Text
          style={{
            color: '#000',
            marginLeft: 20,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Photoscreen
        </Text>
      </TouchableOpacity>
      <RNCamera
        style={styles.preview}
        type={
          cameraSwitch === true
            ? RNCamera.Constants.Type.back
            : RNCamera.Constants.Type.front
        }
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') return;
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                width: '100%',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  width: '9%',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  justifyContent: 'flex-start',
                  position: 'absolute',
                  top: '8%',
                  right: '2%',
                  borderRadius: 50,
                }}>
                <Icon
                  name="sync"
                  size={30}
                  onPress={switchCameraFun}
                  color={'#fff'}
                />
              </View>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Photoscreen;
