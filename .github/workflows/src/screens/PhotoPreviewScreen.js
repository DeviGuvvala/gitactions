import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {saveUserInLocalStorageAsync} from '../services/LocalStorage';

const PhotoPreviewScreen = ({navigation, route}) => {
  console.log(route);
  const meadiaSaveFun = async () => {
    console.log(route.params.uri);
    // await saveUserInLocalStorageAsync(route.params.uri, 'mediaUrl');
    navigation.navigate('WorkorderDetailsScreen', {
      screen: 'Steps',
      params: {
        sono: route.params.sono,
        imageUrl: route.params.uri,
      },
    });
  };
  return (
    <View>
      <Image
        source={{uri: route.params.uri}}
        style={{width: '100%', height: '90%'}}
        resizeMode="contain"
      />

      <TouchableOpacity
        onPress={meadiaSaveFun}
        style={{
          borderRadius: 10,
          marginTop: 20,
          height: 40,
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          alignSelf: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhotoPreviewScreen;
