import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Linking,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StepsTab from './StepsTab';
import DocumentsTab from './DocumentsTab';
import StepsHistoryTab from './StepsHistoryTab';
import Header from '../components/Header';
import Library from './Library';
import TechDocsTab from './TechDocsTab';
import FileRoomTab from './FileRoomTab';
import LatestWorkDetails from './LatestWorkDetails';
import {FileRoamStack} from '../../App';
import {TechDocsStack} from '../../App';
// import { workstackscreen } from '../../App';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createBottomTabNavigator();

const WorkorderDetailScreen = ({navigation, route}) => {
  // console.log(route.params);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('Work Orders');
  const [showEdit, setShowEdit] = useState(false);
  const [contactModalVisible, setcontactModalVisible] = React.useState(false);
  const [showStepatab, setShowStepatab] = useState(true);
  const [showDoctab, setShowDoctab] = useState(false);
  const [showHistorytab, setShowHistorytab] = useState(false);
  const [headerModal, setHeaderModal] = useState(false);
  const [jobstatusValue, setJobstatusValue] = useState('In Progress');

  const [filtermodalVisible, setfiltermodalVisible] = useState(false);
  const showEditFun = () => {
    setShowEdit(!showEdit);
  };

  const orderStausFun = status => {
    switch (status) {
      case 'In Progress':
        setJobstatusValue('In Progress');
        setModalVisible(false);
        break;
      case 'Complete':
        setJobstatusValue('Complete');
        setModalVisible(false);
        break;
      case 'To Do':
        setJobstatusValue('To Do');
        setModalVisible(false);
        break;

      default:
        setJobstatusValue('In Progress');
        setModalVisible(false);
        break;
    }
  };

  const searchmenu = () => {
    navigation.navigate('SearchScreen');
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <Header
        searchIcon={false}
        title={title}
        subtitle={showEdit === true ? 'Cancel' : 'Edit'}
        isItIcon={true}
        Iconname="arrow-back-outline"
        iconOnPress={() => navigation.goBack()}
        taglineText="Job #0000234. Michel chang"
        openModal={() => {
          setModalVisible(!modalVisible);
        }}
        showsideText={true}
        rightIconname="ellipsis-vertical"
        onPressFun={() => showEditFun()}
        onPressMenu={() => setHeaderModal(!headerModal)}
        jobstatusValue={jobstatusValue}
      /> */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {height: 70},
        }}>
        <Tab.Screen
          name="WorkOrders"
          // children={()=>{navigation.navigate('FormScreen')}}
          component={LatestWorkDetails}
          initialParams={
            route.params.screen ? route.params.params : route.params
          }
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon name="document" size={30} color={'#3a3d41'} />
              ) : (
                <Icon name="document-outline" size={30} color={'grey'} />
              ),
            tabBarLabel: ({focused}) => (
              <View style={{justifyContent: 'center', height: 30}}>
                <Text
                  style={{
                    color: focused ? 'black' : 'grey',
                    fontWeight: 'bold',
                  }}>
                  Work Order
                </Text>
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              setTitle('Work Orders');
            },
          })}
        />
        <Tab.Screen
          name="Steps"
          component={StepsTab}
          initialParams={
            route.params.screen ? route.params.params : route.params
          }
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon name="podium" size={30} color={'#3a3d41'} />
              ) : (
                <Icon name="podium-outline" size={30} color={'grey'} />
              ),
            tabBarLabel: ({focused}) => (
              <View style={{justifyContent: 'center', height: 30}}>
                <Text
                  style={{
                    color: focused ? 'black' : 'grey',
                    fontWeight: 'bold',
                  }}>
                  Steps
                </Text>
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              setTitle('Steps');
            },
          })}
        />
        <Tab.Screen
          name="Tech Docs"
          component={TechDocsStack}
          initialParams={
            route.params.screen ? route.params.params : route.params
          }
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon name="book" size={30} color={'#3a3d41'} />
              ) : (
                <Icon name="book-outline" size={30} color={'grey'} />
              ),
            tabBarLabel: ({focused}) => (
              <View style={{justifyContent: 'center', height: 30}}>
                <Text
                  style={{
                    color: focused ? 'black' : 'grey',
                    fontWeight: 'bold',
                  }}>
                  Tech Docs
                </Text>
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              setTitle('Tech Documents');
            },
          })}
        />
        <Tab.Screen
          name="File Room"
          component={FileRoamStack}
          initialParams={
            route.params.screen ? route.params.params : route.params
          }
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon name="file-tray-stacked" size={30} color={'#3a3d41'} />
              ) : (
                <Icon
                  name="file-tray-stacked-outline"
                  size={30}
                  color={'grey'}
                />
              ),
            tabBarLabel: ({focused}) => (
              <View style={{justifyContent: 'center', height: 30}}>
                <Text
                  style={{
                    color: focused ? 'black' : 'grey',
                    fontWeight: 'bold',
                  }}>
                  File Room
                </Text>
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              setTitle('File Room');
            },
          })}
        />
        <Tab.Screen
          name="History"
          component={StepsHistoryTab}
          initialParams={
            route.params.screen ? route.params.params : route.params
          }
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon name="albums" size={30} color={'#3a3d41'} />
              ) : (
                <Icon name="albums-outline" size={30} color={'grey'} />
              ),
            tabBarLabel: ({focused}) => (
              <View style={{justifyContent: 'center', height: 30}}>
                <Text
                  style={{
                    color: focused ? 'black' : 'grey',
                    fontWeight: 'bold',
                  }}>
                  History
                </Text>
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              setTitle('History');
            },
          })}
        />
      </Tab.Navigator>

      {/* header modal */}
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={headerModal}
        onRequestClose={() => setHeaderModal(false)}>
        <TouchableOpacity
          style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}
          onPress={() => setHeaderModal(false)}>
          <View
            style={{
              // backgroundColor: 'red',
              width: '95%',
              height: 200,
              justifyContent: 'center',
            }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  height: 130,
                  width: 110,
                  alignSelf: 'flex-end',

                  // justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',

                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    height: 120,
                    borderRadius: 6,
                    elevation: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ChatScreen');
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="people" size={20} color="#000" />
                      <Text
                        style={{color: 'black', fontSize: 15, marginLeft: 10}}>
                        Support
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setcontactModalVisible(true)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}>
                      <Icon name="person" size={15} color="#000" />
                      <Text
                        style={{color: 'black', marginLeft: 10, fontSize: 15}}>
                        Contact
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Communicationstack', {
                        screen: 'MessagesScreen',
                      })
                    }>
                    {/* // onPress={() => setcontactModalVisible(true)}> 
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-around',
                      }}>
                      <Icon
                        name="ios-chatbubbles"
                        size={15}
                        color="#000"
                        style={{marginRight: 16}}
                      />
                      <Text
                        style={{color: 'black', marginRight: 16, fontSize: 15}}>
                        Chat
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={searchmenu}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}>
                      <Icon name="search" size={15} color="#000" />
                      <Text
                        style={{color: 'black', fontSize: 15, marginLeft: 10}}>
                        Search
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {/* <View
                  style={{
                     backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    height: 32,
                     elevation: 10,
                     
                  }}>
                  <Icon name="people" size={15} color="#000" />
                  <Text style={{color: 'black'}}>Support</Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    height: 32,
                    elevation: 10,
                  }}>
                  <Icon name="person" size={15} color="#000" />
                  <Text style={{color: 'black'}}>Contact</Text>
                </View>
                <TouchableOpacity onPress={searchmenu}>
                <View
                  style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    height: 32,
                    elevation: 10,
                  }}>
                  <Icon name="search" size={15} color="#000" />
                  <Text style={{color: 'black'}}>Search</Text>
                </View>
                </TouchableOpacity> 
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal> */}
      {/* filter modal.................. */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filtermodalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setfiltermodalVisible(!filtermodalVisible);
        }}>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: (windowHeight * 40) / 100,
            flex: 1,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            elevation: 30,
            // marginHorizontal: 10,
            borderColor: '#E9EBEC',
            borderWidth: 1,
            width: '100%',
            height: '60%',
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              height: '10%',
            }}>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                Filter Documents
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#E9EBEC',
                alignSelf: 'center',
                borderRadius: 50,
              }}>
              <Icon
                name="close-outline"
                size={30}
                onPress={() => setfiltermodalVisible(!filtermodalVisible)}
                color={'#000'}
              />
            </View>
          </View>

          <View style={{paddingHorizontal: 19}}>
            <Text style={{fontSize: 15}}>Filter by the name of the step</Text>
            <Text style={{fontSize: 18, color: 'black', marginTop: 10}}>
              Initial problem
            </Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginTop: 10,
              }}
            />

            <View
              style={{
                height: 40,
                width: (windowWidth * 90) / 100,
                backgroundColor: '#e9ebec',
                borderRadius: 5,
                marginTop: 15,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    marginTop: 8,
                    paddingHorizontal: 19,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Filter by Completion
                </Text>
                <Text style={{marginTop: 10, paddingHorizontal: 19}}>hi</Text>
              </View>
            </View>
            <View
              style={{
                height: 40,
                width: (windowWidth * 90) / 100,
                backgroundColor: '#e9ebec',
                borderRadius: 5,
                marginTop: 15,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    marginTop: 8,
                    paddingHorizontal: 19,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Filter by Items added
                </Text>
                <Text style={{marginTop: 10, paddingHorizontal: 19}}>hi</Text>
              </View>
            </View>
            <View
              style={{
                height: 40,
                width: (windowWidth * 90) / 100,
                backgroundColor: '#e9ebec',
                borderRadius: 5,
                marginTop: 15,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    marginTop: 8,
                    paddingHorizontal: 19,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Filter by Technician
                </Text>
                <Text style={{marginTop: 10, paddingHorizontal: 19}}>hi</Text>
              </View>
            </View>

            <View
              style={{
                height: 40,
                width: (windowWidth * 90) / 100,
                backgroundColor: '#e9ebec',
                borderRadius: 5,
                marginTop: 15,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    marginTop: 8,
                    paddingHorizontal: 19,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Filter by Date
                </Text>
                <Text style={{marginTop: 10, paddingHorizontal: 19}}>hi</Text>
              </View>
            </View>

            <View
              style={{
                height: 40,
                width: (windowWidth * 90) / 100,
                backgroundColor: 'black',
                borderRadius: 5,
                marginTop: 45,
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    marginTop: 8,
                    paddingHorizontal: 19,
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Save
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* ..................................filtermodal ends */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <TouchableWithoutFeedback
            style={{
              backgroundColor: 'white',
              // marginTop: 100,
              // flex: 1,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              elevation: 30,
              // marginHorizontal: 10,
              borderColor: '#E9EBEC',
              borderWidth: 1,
              width: '100%',
              height: '50%',
              alignSelf: 'center',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                // marginTop: 100,
                // flex: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                elevation: 30,
                // marginHorizontal: 10,
                borderColor: '#E9EBEC',
                borderWidth: 1,
                width: '100%',
                height: '40%',
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  height: '20%',
                }}>
                <View>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                    Job Status
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#E9EBEC',
                    alignSelf: 'center',
                    borderRadius: 50,
                  }}>
                  <Icon
                    name="close-outline"
                    size={30}
                    onPress={() => setModalVisible(!modalVisible)}
                    color={'#000'}
                  />
                </View>
              </View>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  // alignItems: 'center',
                  justifyContent: 'space-around',
                  // flexDirection: 'row',
                  height: '80%',
                }}>
                <TouchableOpacity
                  onPress={() => orderStausFun('In Progress')}
                  style={{
                    height: 50,
                    width: (windowWidth * 90) / 100,
                    backgroundColor: 'red',
                    borderRadius: 4,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      color: '#fff',
                      letterSpacing: 0.5,
                    }}>
                    In Progress
                  </Text>
                  <Icon name="chevron-forward" size={25} color={'#fff'} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => orderStausFun('Complete')}
                  style={{
                    height: 50,
                    width: (windowWidth * 90) / 100,
                    backgroundColor: 'green',
                    borderRadius: 4,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    marginVertical: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      color: '#fff',
                      letterSpacing: 0.5,
                    }}>
                    Complete
                  </Text>
                  <Icon name="chevron-forward" size={25} color={'#fff'} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => orderStausFun('To Do')}
                  style={{
                    height: 50,
                    width: (windowWidth * 90) / 100,
                    backgroundColor: 'blue',
                    borderRadius: 4,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      color: '#fff',
                      letterSpacing: 0.5,
                    }}>
                    To Do
                  </Text>
                  <Icon name="chevron-forward" size={25} color={'#fff'} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      {/* ...................................ContactmODAL.................. */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={contactModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setcontactModalVisible(!contactModalVisible);
        }}>
        <TouchableOpacity
          onPress={() => setcontactModalVisible(false)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback style={styles.contactmodalView}>
              <View style={styles.contactmodalView}>
                <View style={styles.contactModaltexticonView}>
                  <View>
                    <Text style={styles.contactNameTextUi}>Micheal Chang</Text>
                  </View>
                  <Icon
                    name="chevron-forward"
                    size={22}
                    // style={{marginTop: 2}}
                    color={'#000'}
                    onPress={() => setcontactModalVisible(false)}
                  />
                </View>

                <View style={styles.contactDescViewUi}>
                  <Text style={styles.contactDescTextUi}>
                    survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 35,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // backgroundColor: 'blue',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL('tel:1234567890');
                    }}
                    style={{
                      flexDirection: 'row',
                      borderColor: '#A1A2A4',
                      borderTopWidth: 1,
                      borderRightWidth: 1,
                      width: '33.33%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="call-outline" size={13} color={'#000'} />
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#000',
                        fontWeight: '500',
                        marginLeft: 5,
                        lineHeight: 18,
                        letterSpacing: 0.2,
                      }}>
                      Call
                    </Text>
                  </TouchableOpacity>

                  {/* <TouchableOpacity onPress={onSendSMSMessage} 
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      borderColor: '#A1A2A4',
                      borderTopWidth: 1,
                      // borderLeftWidth: 1,
                      width: '33.33%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="chatbubble-outline" size={13} color={'#000'} />
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#000',
                        fontWeight: '500',
                        marginLeft: 5,
                        lineHeight: 18,
                        letterSpacing: 0.2,
                      }}>
                      Message
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={getLocationFun}
                    style={{
                      flexDirection: 'row',
                      borderColor: '#A1A2A4',
                      borderTopWidth: 1,
                      borderLeftWidth: 1,
                      width: '33.33%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="location-outline" size={13} color={'#000'} />
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#000',
                        fontWeight: '500',
                        marginLeft: 5,
                        lineHeight: 18,
                        letterSpacing: 0.2,
                      }}>
                      Direction
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  incompletedIconText: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 200,
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  NetmodalText: {
    fontSize: 16,
    color: '#000',
    // marginTop: 10,
    textAlign: 'center',
  },
  incompletedTextUi: {
    color: '#050709',
    fontSize: 14,
    // fontWeight: '500',
    fontFamily: 'Sofia_Pro_Regular',
    paddingLeft: 8,
    lineHeight: 18,
    letterSpacing: 0.2,
  },

  contactModaltexticonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '90%',
    alignSelf: 'center',
    height: 35,
  },
  contactNameTextUi: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
    lineHeight: 24,
    letterSpacing: 0.5,
    // marginLeft: 8,
  },
  contactDescViewUi: {
    width: '90%',
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    // backgroundColor: 'green',
  },
  contactDescTextUi: {
    color: '#000',
    fontWeight: '500',
    letterSpacing: 0.2,
    lineHeight: 18,
    fontSize: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  equipmodalView: {
    margin: 20,
    backgroundColor: 'white',
    // borderRadius: 10,
    // padding: 15,
    marginTop: 10,
    // alignItems: "center",
    shadowColor: '#000',
    height: (windowHeight * 62) / 100,
    width: (windowWidth * 85) / 100,
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
    // borderRadius: 10,
    // padding: 15,
    marginTop: 10,
    // alignItems: "center",
    shadowColor: '#000',
    height: (windowHeight * 17) / 100,
    width: (windowWidth * 90) / 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    justifyContent: 'space-between',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 4,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default WorkorderDetailScreen;
