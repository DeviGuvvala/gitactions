import {StyleSheet, Text, View, ImageBackground, StatusBar} from 'react-native';
import React from 'react';

const FindWaldo = () => {
  return (
    <ImageBackground
      source={require('../Images/Waldo.png')}
      style={{flex: 1}}
      //   resizeMode="cover"
    >
      <StatusBar hidden />
    </ImageBackground>
  );
};

export default FindWaldo;

const styles = StyleSheet.create({});
