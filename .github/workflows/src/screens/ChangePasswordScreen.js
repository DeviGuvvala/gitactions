import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';

// import CollapsibleView from '@eliav2/react-native-collapsible-view';
import ToggleSwitch from '../components/ToggleSwitch';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChangePasswordScreen = ({navigation, route}) => {
  const [toggle, setToggle] = useState(false);
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      console.log('Screen was focused');

      return () => {
        console.log('Screen was unfocused');
        navigation.goBack();
        // Useful for cleanup functions
      };
    }, []),
  );

  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: 13, marginTop: 10}}>
        <View>
          <Text style={{fontSize: 17,   fontFamily: 'Sofia_Pro_Bold', color: 'black'}}>
            Change Username - Current: Micheal Chang
          </Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="Please Enter New Username"
        // keyboardType="ndfgd
      />

      <View style={{paddingHorizontal: 13}}>
        <View>
          <Text style={{fontSize: 17, fontWeight: '700', color: 'black'}}>
            Old Password
          </Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="Please Enter Old Password"
        // keyboardType="ndfgd
      />

      <View style={{paddingHorizontal: 13, marginTop: 10}}>
        <View>
          <Text style={{fontSize: 17, fontWeight: '700', color: 'black'}}>
            New Password
          </Text>
         
        </View>
      </View>

      <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="Please Enter  Password"
        // keyboardType="ndfgd
      />

      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: (windowHeight*38)/100}}>
        <View
          style={{
            height: 40,
            width: (windowWidth * 95) / 100,
            backgroundColor: 'black',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              marginTop: 7,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Save
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 8,
    borderWidth: 1,
    width:(windowWidth*92)/100,
    fontSize: 20,
    alignSelf:'center',
    borderRadius:3,
    padding: 5,
  },
});

export default ChangePasswordScreen;
