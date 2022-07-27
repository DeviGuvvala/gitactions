import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Workorder from './Workorder';
import {removeUserFromStorageAsync} from '../services/LocalStorage';
import Library from './Library';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserFromStorageAsync} from '../services/LocalStorage';
import {SettingsScreen} from '../../App';
import {Communicationstack} from './CommunicationsStack';
import {useRoute} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Tab = createMaterialTopTabNavigator();

const Homepage = ({navigation, route}) => {
  const [title, setTitle] = useState('Jobs');
  const [searchmodalVisible, setsearchmodalVisible] = useState(false);
  const [filtermodalVisible, setfiltermodalVisible] = useState(false);
  const [addFilterModalVisible, setaddFilterModalVisible] = useState(false);
  const [SettingsModalVisible, setSettingsModalVisible] = useState(false);
  const [updateModalVisible, setupdateModalVisible] = useState(false);
  const [ResetPassModalVisible, setResetPassModalVisible] =
    React.useState(false);

  const panelRef = useRef(null);

  const logoutFun = () => {
    removeUserFromStorageAsync('EmpID');
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };

  useEffect(() => {
    if (route.params) {
      setTitle(route.params.params.params.title);
    }
    // else {
    //   setTitle('Work Orders')
    // }
  }, [route.params]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: 50,
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <View
          style={{
            paddingHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {title === 'Settings' ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View>
                <Icon name="arrow-back" size={30} color={'#000'} />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSettingsModalVisible(true);
              }}>
              <View>
                <Icon
                  name="md-settings"
                  size={25}
                  color={'#000'}
                  style={{marginTop: 5}}
                />
              </View>
            </TouchableOpacity>
          )}
          <View>
            <Text
              style={{
                fontSize: 23,
                fontWeight: 'bold',
                color: 'black',
                fontFamily: 'Sofia_Pro_Bold',
              }}>
              {title}
            </Text>
          </View>

          {title != 'Settings' ? (
            <TouchableOpacity>
              <View style={{marginLeft: 20}}>
                <Icon
                  name="options"
                  size={25}
                  style={{marginTop: 5}}
                  color={'#000'}
                  onPress={() =>
                    setaddFilterModalVisible(!addFilterModalVisible)
                  }
                />
              </View>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        <View
          style={{
            borderBottomColor: 'blue',
            borderBottomWidth: 1,
            marginTop: 4,
          }}
        />
      </View>
      <Tab.Navigator
        lazy={true}
        screenOptions={{
          // swipeEnabled:false,
          tabBarLabelStyle: {
            //  fontSize: 14,
            fontWeight: 'bold',
            textTransform: 'none',
            // alignSelf: 'center',
            fontFamily: 'Sofia_Pro_Bold',
            letterSpacing: 0.5,
          },
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            width: 135,
            flexDirection: 'row',
            // justifyContent: 'space-around',
          },
          // tabBarOptions: {flexDirection: 'row'},
        }}>
        <Tab.Screen
          name="Jobs"
          component={Workorder}
          listeners={({navigation, route}) => ({
            swipeEnd: setTitle('Work Orders'),
            tabPress: e => {
              setTitle('Work Orders');
            },
          })}
          options={{
            // unmountOnBlur: true,
            // headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon name="clipboard" size={25} color={'#3a3d41'} />
              ) : (
                <Icon name="clipboard-outline" size={24} color={'grey'} />
              ),
            tabBarLabel: ({focused}) => (
              <View style={{justifyContent: 'center', height: 30}}>
                <Text
                  style={{
                    color: focused ? 'black' : 'grey',
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginLeft: 5,
                  }}>
                  Work Orders
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Communications"
          component={Communicationstack}
          initialParams={{screen: 'AllCommunication'}}
          listeners={({navigation, route}) => ({
            swipeEnd: setTitle('Communications'),
            tabPress: e => {
              setTitle('Communications');
            },
          })}
          options={{
            // unmountOnBlur: true,
            // headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon name="phone-portrait" size={25} color={'#3a3d41'} />
              ) : (
                <Icon name="phone-portrait-outline" size={23} color={'grey'} />
              ),
            tabBarLabel: ({focused}) => (
              <View style={{justifyContent: 'center', height: 30}}>
                <Text
                  style={{
                    color: focused ? 'black' : 'grey',
                    fontWeight: 'bold',
                    fontSize: 12,
                    // marginLeft:15
                  }}>
                  Communications
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Library"
          component={Library}
          listeners={({navigation, route}) => ({
            swipeEnd: setTitle('Library'),
            tabPress: e => {
              setTitle('Library');
            },
          })}
          options={{
            unmountOnBlur: true,
            // headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon
                  name="book"
                  size={25}
                  color={'#3a3d41'}
                  style={{marginTop: 1}}
                />
              ) : (
                <Icon
                  name="book-outline"
                  size={25}
                  color={'grey'}
                  style={{marginTop: 1}}
                />
              ),
            tabBarLabel: ({focused}) => (
              <View style={{justifyContent: 'center', height: 30}}>
                <Text
                  style={{
                    color: focused ? 'black' : 'grey',
                    fontWeight: 'bold',
                    fontSize: 12,
                    marginLeft: 7,
                  }}>
                  Library
                </Text>
              </View>
            ),
          }}
        />

        {/* <Tab.Screen name="Global Search" component={Globalsearch} /> */}
        {/* <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          listeners={({ navigation, route }) => ({
            swipeEnd: setTitle('Settings'),
            tabPress: e => {
              setTitle('Settings');
            },
          })}
        /> */}
      </Tab.Navigator>
      {/* </ScrollView> */}

      {/* .............................Filter MOdal............................... */}

      <Modal
        animationType="slide"
        transparent={true}
        // animationIn="slideInLeft"
        // animationOut="slideOutRight"
        visible={addFilterModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setaddFilterModalVisible(!addFilterModalVisible);
        }}>
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => setaddFilterModalVisible(false)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View style={styles.notescenteredView}>
              <TouchableWithoutFeedback style={styles.UpdatemodalView}>
                <View style={styles.UpdatemodalView}>
                  <View
                    style={{
                      marginTop: 10,
                      paddingHorizontal: 15,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: '700',
                        fontFamily: 'Sofia_Pro_Bold',
                        color: '#000',
                        fontSize: 18,
                        fontStyle: 'normal',
                        letterSpacing: 0.5,
                      }}>
                      Add Filter
                    </Text>
                    <View>
                      <Icon
                        name="close-circle-outline"
                        size={20}
                        color={'#000'}
                        onPress={() => setaddFilterModalVisible(false)}
                      />
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        // fontWeight: 'bold',
                        color: '#000',
                        fontSize: 15,
                        // fontFamily: 'Sofia_Pro_Bold',
                        fontStyle: 'normal',
                        letterSpacing: 0.5,
                      }}>
                      POTENTIAL FILTERS
                    </Text>
                  </View>
                  <View>
                    <View>
                      <View style={{paddingHorizontal: 15, marginTop: 5}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            fontFamily: 'Sofia_Pro',
                          }}>
                          Work Order Name
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 44,
                          width: (windowWidth * 83) / 100,
                          marginTop: 4,
                          borderRadius: 5,
                          alignSelf: 'center',
                          backgroundColor: '#0001',
                        }}>
                        <TextInput
                          style={{
                            // marginTop: 5,
                            color: 'grey',
                            fontSize: 16,
                            fontStyle: 'normal',
                            paddingHorizontal: 10,
                            fontWeight: 'bold',
                          }}></TextInput>
                      </View>
                    </View>
                    <View>
                      <View style={{paddingHorizontal: 15, marginTop: 4}}>
                        <Text style={{fontSize: 15, fontFamily: 'Sofia_Pro'}}>
                          Work Order Status
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          height: 40,
                          width: (windowWidth * 83) / 100,
                          marginTop: 4,
                          borderRadius: 5,
                          alignSelf: 'center',
                          backgroundColor: '#0001',
                        }}>
                        <Text
                          style={{
                            marginTop: 7,
                            color: 'grey',
                            fontSize: 16,
                            fontStyle: 'normal',
                            paddingHorizontal: 10,
                            fontWeight: 'bold',
                          }}>
                          Please Select Work Order Status
                        </Text>
                        <Icon
                          name="chevron-down"
                          style={{marginTop: 6, marginRight: 10}}
                          size={20}
                          color={'grey'}
                        />
                      </View>
                    </View>
                    <View>
                      <View style={{paddingHorizontal: 15, marginTop: 4}}>
                        <Text style={{fontSize: 15, fontFamily: 'Sofia_Pro'}}>
                          Work Order Type
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          height: 40,
                          width: (windowWidth * 83) / 100,
                          marginTop: 4,
                          borderRadius: 5,
                          alignSelf: 'center',
                          backgroundColor: '#0001',
                        }}>
                        <Text
                          style={{
                            marginTop: 5,
                            color: 'grey',
                            fontSize: 16,
                            fontStyle: 'normal',
                            paddingHorizontal: 10,
                            fontWeight: 'bold',
                          }}>
                          Please Select Work Order Type
                        </Text>
                        <Icon
                          name="chevron-down"
                          style={{marginTop: 6, marginRight: 10}}
                          size={20}
                          color={'grey'}
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setaddFilterModalVisible(false);
                      }}
                      style={{
                        height: 40,
                        width: (windowWidth * 83) / 100,
                        marginTop: 15,
                        borderRadius: 5,
                        alignItems: 'center',
                        alignSelf: 'center',
                        backgroundColor: 'black',
                        borderWidth: 1,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          textTransform: 'uppercase',
                          letterSpacing: 1.5,
                          marginTop: 7,
                          fontSize: 15,
                          fontWeight: '700',
                        }}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>

      {/* ...................................Settings Modal................................... */}
      <Modal
        animationType="fade"
        transparent={true}
        propagateSwipe={true}
        // swipeToScroll={true}
        visible={SettingsModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setSettingsModalVisible(!SettingsModalVisible);
        }}>
        <TouchableOpacity
          onPress={() => setSettingsModalVisible(false)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback style={styles.equipmodalView}>
              <View style={styles.equipmodalView}>
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      fontSize: 20,
                      letterSpacing: 0.5,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    Settings
                  </Text>
                </View>

                {/* <TouchableOpacity
                  onPress={() => setResetPassModalVisible(true)}>
                  <View
                    style={{
                      alignSelf: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: 45,
                      width: (windowWidth * 78) / 100,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: 'black',
                    }}>
                    <Text
                      style={{
                        letterSpacing: 0.5,
                        fontSize: 17,
                        fontWeight: 'bold',
                        marginTop: 8,
                        marginLeft: 5,
                        color: 'black',
                      }}>
                      Change Password
                    </Text>
                    <Icon
                      name="arrow-forward-outline"
                      size={20}
                      style={{marginTop: 8, marginRight: 5}}
                      color={'#000'}
                    />
                  </View>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => logoutFun()}>
                  <View
                    style={{
                      marginTop: 10,
                      alignSelf: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: 45,
                      width: (windowWidth * 78) / 100,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: 'black',
                    }}>
                    <Text
                      style={{
                        letterSpacing: 0.5,
                        fontSize: 17,
                        fontWeight: 'bold',
                        marginTop: 8,
                        marginLeft: 5,
                        color: 'black',
                      }}>
                      Log Out
                    </Text>
                    <Icon
                      name="arrow-forward-outline"
                      size={20}
                      style={{marginTop: 8, marginRight: 5}}
                      color={'#000'}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setupdateModalVisible(true)}>
                  <View
                    style={{
                      marginTop: 10,
                      alignSelf: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: 45,
                      width: (windowWidth * 78) / 100,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: 'black',
                    }}>
                    <Text
                      style={{
                        letterSpacing: 0.5,
                        fontSize: 17,
                        fontWeight: 'bold',
                        marginTop: 8,
                        marginLeft: 5,
                        color: 'black',
                      }}>
                      Update App
                    </Text>
                    <Icon
                      name="arrow-forward-outline"
                      size={20}
                      style={{marginTop: 8, marginRight: 5}}
                      color={'#000'}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View
                    style={{
                      marginTop: 10,
                      alignSelf: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: 45,
                      width: (windowWidth * 78) / 100,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: 'black',
                    }}>
                    <Text
                      style={{
                        letterSpacing: 0.5,
                        fontSize: 17,
                        fontWeight: 'bold',
                        marginTop: 8,
                        marginLeft: 5,
                        color: 'black',
                      }}>
                      Find Waldo
                    </Text>
                    <Icon
                      name="arrow-forward-outline"
                      size={20}
                      style={{marginTop: 8, marginRight: 5}}
                      color={'#000'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ...................................Update Modal................................. */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setupdateModalVisible(!updateModalVisible);
        }}>
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => setupdateModalVisible(false)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View style={styles.notescenteredView}>
              <TouchableWithoutFeedback style={styles.AppUpdatemodalView}>
                <View style={styles.AppUpdatemodalView}>
                  <View
                    style={{
                      height: (windowHeight * 20) / 100,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                      }}>
                      <View style={{paddingHorizontal: '30%'}}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '700',
                            color: '#000',
                            marginTop: 10,
                          }}>
                          Update App
                        </Text>
                      </View>

                      <View style={{marginTop: 13, marginRight: 10}}>
                        <Icon
                          name="close-circle-outline"
                          size={20}
                          color={'#000'}
                          onPress={() => setupdateModalVisible(false)}
                        />
                      </View>
                    </View>
                    <View style={{alignSelf: 'center', marginTop: 15}}>
                      <Icon
                        name="checkmark-done-outline"
                        size={60}
                        color={'#000'}
                        onPress={() => setupdateModalVisible(false)}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>

      {/* ......................................Change password modal............... */}

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={ResetPassModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setResetPassModalVisible(!ResetPassModalVisible);
        }}>
        <TouchableOpacity
          onPress={() => setResetPassModalVisible(false)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.contactmodalView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: 'black',
                      }}>
                      Password Reset
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 17}}>
                    An email has been sent to escott@9packsoftware.com,if this
                    is a valid email you should recieve instructions on how to
                    reset your password.Check the spam or junk folder if you do
                    not find it in your inbox.
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    logoutFun();
                  }}>
                  <View
                    style={{
                      borderRadius: 5,
                      marginTop: 13,
                      height: 35,
                      width: (windowWidth * 80) / 100,
                      backgroundColor: '#1a60a3',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        letterSpacing: 0.5,
                      }}>
                      RETURN TO HOME SCREEN
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal> */}
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  UpdatemodalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    // padding: 15,
    // marginTop: (windowHeight * 57) / 100,
    // alignItems: 'center',
    shadowColor: '#000',
    // borderRadius:20,
    height: (windowHeight * 45) / 100,
    width: (windowWidth * 90) / 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  equipmodalView: {
    margin: 20,
    backgroundColor: 'white',
    // borderRadius: 10,
    // padding: 15,
    // marginTop: 10,
    // alignItems: "center",
    shadowColor: '#000',
    height: (windowHeight * 38) / 100,
    width: (windowWidth * 85) / 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AppUpdatemodalView: {
    // justifyContent: 'flex-end',
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    // padding: 15,
    marginTop: (windowHeight * 70) / 100,
    // alignItems: 'center',
    shadowColor: '#000',
    // borderRadius:20,
    height: (windowHeight * 30) / 100,
    width: windowWidth,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 5,
  },
  contactmodalView: {
    margin: 20,

    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    height: (windowHeight * 35) / 100,
    width: (windowWidth * 90) / 100,
  },
});
