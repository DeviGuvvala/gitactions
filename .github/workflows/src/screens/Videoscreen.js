'use strict';
import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  VESDK,
  VideoEditorModal,
  Configuration,
} from 'react-native-videoeditorsdk';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Videoscreen = ({navigation, route}) => {
  const camera = useRef(null);
  const [cameraSwitch, setcameraSwitch] = React.useState(false);
  const [RecVideo, setRecVideo] = React.useState(false);

  const Submit = async () => {
    if (camera) {
      setRecVideo(!RecVideo);
      const {uri, codec = 'mp4'} = await camera.current.recordAsync();
      console.log(uri);
      VESDK.openEditor(uri).then(
        result => {
          console.log(result);

          navigation.navigate('WorkorderDetailsScreen', {
            screen: 'Steps',
            params: {
              sono: route.params.sono,
              videoUrl: result.video,
            },
          });
        },
        error => {
          console.log(error);
        },
      );
      // setVideoUrl(uri);
      // console.log(RecVideo);
    }
  };
  const Stop = () => {
    setRecVideo(!RecVideo);
    camera.current.stopRecording();

    // console.log(VideoUrl, 'VideoURl');
  };

  const switchCameraFun = () => {
    setcameraSwitch(!cameraSwitch);
  };

  const RenderCam = () => {
    return (
      <RNCamera
        ref={camera}
        style={styles.preview}
        defaultVideoQuality={RNCamera.Constants.VideoQuality['480p']}
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
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View>
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
            Videoscreen
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', height: 100}}>
        <View style={{width: '100%'}}>{RenderCam()}</View>
      </View>
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
        <Icon name="sync" size={30} onPress={switchCameraFun} color={'#fff'} />
      </View>
      <View
        style={{
          // flexDirection: 'row',
          // marginTop: (windowHeight * 70) / 100,
          alignSelf: 'center',
          justifyContent: 'flex-end',
          width: '95%',
          alignItems: 'center',
          // backgroundColor: 'green',
          flex: 0.95,
        }}>
        <Pressable
          onPress={RecVideo === true ? Stop : Submit}
          style={{
            height: 50,
            backgroundColor: RecVideo === true ? 'red' : '#fff',
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50 / 2,
            elevation: 10,
          }}>
          {/* {RecVideo === true && ( */}
          <Text
            style={{
              color: RecVideo === true ? '#fff' : '#000',
              fontWeight: 'bold',
              fontSize: 20,
              // backgroundColor: '#000',
            }}>
            REC
          </Text>
        </Pressable>
        {/* )} */}
        {/* <Pressable
          onPress={Stop}
          style={{
            height: 50,
            backgroundColor: 'black',
            width: '45%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            Stop
          </Text>
        </Pressable> */}
      </View>
    </View>
  );
};

export default Videoscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  preview: {
    width: '100%',
    height: windowHeight,
  },
});
