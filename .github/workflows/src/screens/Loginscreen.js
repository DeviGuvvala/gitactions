import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,  
  Image
} from 'react-native';
import Margin from '../components/Margin';
import colors from '../theme/colors';
import Input from '../components/Input';
import moment from 'moment';
import {loginAsync} from '../services/Services';
import {saveUserInLocalStorageAsync} from '../services/LocalStorage';
import {useKeyboard} from '../components/useKeyboard';
import {useLinkProps} from '@react-navigation/native';
import { ENVIRONMENT, VERSION } from '@env';

const getInitialState = () => {
  return {
    status: 'loading-screen',
    showPassword: false,
    companycode: '',
    username: '',
    password: '',
    errors: {
      companycode: '',
      username: '',
      password: '',
    },
  };
};
 /* */
const Loginscreen = ({navigation}) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState(getInitialState());
  const [authErr, setAuthErr] = React.useState(false);

  const cleanErrors = () => {
    setState(curr => ({
      ...curr,
      errors: {companycode: '', username: '', password: ''},
    }));
  };


  const handleSubmit = async () => {
    const presentDate = moment(currentDate).format('MM/DD/YYYY');
    const {companycode, username, password} = state;
    const errors = {
      username: '',
      password: '',
    };

    if (!username) {
      errors.username = 'Username or Email is Invalid!';
    }

    if (!password) {
      errors.password = 'Password is Invalid!';
    }

    if (errors.username || errors.password) {
      setState(curr => ({...curr, errors}));
      return;
    }

    setState(curr => ({...curr, status: 'signing-in'}));

    try {
      setLoading(true);
      const res = await loginAsync(
        username,
        password,
        presentDate,
      );
      if (res.success === true) {
        const jsonValue = JSON.stringify(res.data.technicianCode);
        await saveUserInLocalStorageAsync(jsonValue, 'EmpID');
        navigation.replace('Home');
        setLoading(false);
      } else {
        setLoading(false);
        setState(curr => ({
          ...curr,
          status: 'idle',
          errors: {
            ...curr.errors,
            username: res.reason,
          },
        }));
        setAuthErr(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setState(curr => ({
        ...curr,
        status: 'idle',
      }));
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      {loading === true ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            //  animating = {animating}
            color="#59A9F4" // color of your choice
            size="large"
            style={styles.activityIndicator}
          />
          <Text style={styles.loadingText}>
            Just a moment, we are loading your content
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <StatusBar
            translucent={true}
            backgroundColor={colors.blue7}
            barStyle="dark-content"
          />
          <View style={styles.logoContainer}>
            <Image source={require('../Images/logo_9pack_text.png')}/>            
          </View>
          <Margin bottom={32} />
          <View style={styles.bodyContainer}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Welcome</Text>
            <Text style={{fontSize: 18, color: colors.gray9}}>
              Sign in to continue!
            </Text>
            <Margin bottom={32} />
            <View style={styles.inputContainer}>
              <View
                style={[
                  styles.input,
                  {
                    borderBottomWidth: 0,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                    borderColor: authErr ? '#EB5757' : '#BEC2C5',
                  },
                ]}>
                <Input
                  error={state.errors.username}
                  placeholder="Username/Email"
                  value={state.username}
                  keyboardType="email-address"
                  leftIcon="person"
                  onBlur={cleanErrors}
                  onChange={value =>
                    setState(curr => ({...curr, username: value}))
                  }
                />
              </View>
              <View
                style={[
                  styles.lineBreak,
                  {borderColor: authErr ? '#EB5757' : '#BEC2C5'},
                ]}
              />
              <View
                style={[
                  styles.input,
                  {
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                    borderTopWidth: 0,
                  },
                ]}>
                <Input
                  error={state.errors.password}
                  placeholder="Password"
                  value={state.password}
                  secureTextEntry={!state.showPassword}
                  leftIcon="lock-closed"
                  showPassword={state.showPassword}
                  onBlur={cleanErrors}
                  onChange={value =>
                    setState(curr => ({...curr, password: value}))
                  }
                  onRightButtonPress={() =>
                    setState(curr => ({
                      ...curr,
                      showPassword: !curr.showPassword,
                    }))
                  }
                />
              </View>

            </View>
            <Margin bottom={32} />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>

              <Text size={12} color={colors.white} style={styles.buttonText}>
                Sign in
              </Text>

            </TouchableOpacity>
            <Margin bottom={15} />
            <Margin bottom={110} />
            <View style={{alignItems: 'center'}}> 
              <Text style={styles.copyright}>
                © 2022 9PackSoftware - All Rights Reserved.
              </Text>
              <Text style={styles.copyright}>
                {VERSION}-{ENVIRONMENT}
              </Text>
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  copyright: {
    color: '#404040', fontWeight: '600'
  },
  lineBreak: {
    borderBottomWidth: 1,
    // borderBottomColor: '#BEC2C5',
    borderStyle: 'solid',
  },
  container: {
    // paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  inputContainer: {
    // marginVertical: 10,
    height: 150,
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#BEC2C5',
    borderStyle: 'solid',
    backgroundColor: colors.background,
  },
  forgotPasswordText: {
    textAlign: 'right',
  },
  buttonText: {
    fontSize: 12,
    color: colors.white,
    letterSpacing: 0.04,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  button: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowColor: 'rgba(0, 42, 81, 0.08)',
    shadowOpacity: 1,
    backgroundColor: colors.blue7,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 4,
  },
  logoContainer: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    backgroundColor: colors.white,
    flex: 2,
    width: '90%',
    alignSelf: 'center',
  },
  logoStyles: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  forgotStyle: {
    alignItems: 'center',
  },
  activityIndicator: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: 80,
    // borderWidth:2,
    // borderRadius:50,
    alignSelf: 'center',
  },
  loadingText: {
    color: '#60666C',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    marginTop: 5,
  },
});
