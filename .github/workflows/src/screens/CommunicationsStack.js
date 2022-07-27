import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import AllCommunication from './AllCommunication';
import CallScreen from './CallScreen';
import CommunicationDetailsScreen from './CommunicationDetailsScreen';
import MessagesScreen from './MessagesScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CommStack = createBottomTabNavigator();

export function Communicationstack(props) {
  const prop = props.route.params;
  const [addFilterModalVisible, setaddFilterModalVisible] = useState(false);
  return (
    <>
      <CommStack.Navigator
        lazy={true}
        screenOptions={{
          tabBarStyle: {
            height: 70,
            alignSelf: 'center',
            alignItems: 'center',
          },
        }}>
        <CommStack.Screen
          name="All"
          component={AllCommunication}
          options={{
            // unmountOnBlur: true,
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
                  All
                </Text>
              </View>
            ),
          }}
          initialParams={prop.params}
        />
        <CommStack.Screen
          name="MessagesScreen"
          component={MessagesScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon name="chatbox" size={30} color={'#3a3d41'} />
              ) : (
                <Icon name="chatbox-outline" size={30} color={'grey'} />
              ),
            tabBarLabel: ({focused}) => (
              <View style={{justifyContent: 'center', height: 30}}>
                <Text
                  style={{
                    color: focused ? 'black' : 'grey',
                    fontWeight: 'bold',
                  }}>
                  Chats
                </Text>
              </View>
            ),
          }}
        />
        <CommStack.Screen
          name="CallScreen"
          component={CallScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon name="call" size={30} color={'#3a3d41'} />
              ) : (
                <Icon name="call-outline" size={30} color={'grey'} />
              ),
            tabBarLabel: ({focused}) => (
              <View style={{justifyContent: 'center', height: 30}}>
                <Text
                  style={{
                    color: focused ? 'black' : 'grey',
                    fontWeight: 'bold',
                  }}>
                  Calls
                </Text>
              </View>
            ),
          }}
          initialParams={prop.params}
        />
        <CommStack.Screen
          name="EmailScreen"
          component={CommunicationDetailsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Icon name="mail" size={30} color={'#3a3d41'} />
              ) : (
                <Icon name="mail-outline" size={30} color={'grey'} />
              ),
            tabBarLabel: ({focused}) => (
              <View style={{justifyContent: 'center', height: 30}}>
                <Text
                  style={{
                    color: focused ? 'black' : 'grey',
                    fontWeight: 'bold',
                  }}>
                  Email/Other
                </Text>
              </View>
            ),
          }}
          initialParams={prop.params}
        />
      </CommStack.Navigator>
      <Modal
        animationType="slide"
        transparent={true}
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
                        color: '#000',
                        fontSize: 18,
                        fontStyle: 'normal',
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
                        fontWeight: 'bold',
                        color: '#000',
                        fontSize: 11,
                        fontStyle: 'normal',
                      }}>
                      POTENTIAL FILTERS
                    </Text>
                  </View>
                  <View>
                    <View
                      style={{
                        height: 40,
                        width: (windowWidth * 88) / 100,
                        marginTop: 4,
                        borderRadius: 5,
                        alignSelf: 'center',
                        backgroundColor: '#0001',
                        borderWidth: 1,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 5,
                          fontWeight: 'bold',
                          color: '#000',
                          fontSize: 16,
                          fontStyle: 'normal',
                        }}>
                        Filter by Date
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 40,
                        width: (windowWidth * 88) / 100,
                        marginTop: 4,
                        borderRadius: 5,
                        alignSelf: 'center',
                        backgroundColor: '#0001',
                        borderWidth: 1,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 5,
                          fontWeight: 'bold',
                          color: '#000',
                          fontSize: 16,
                          fontStyle: 'normal',
                        }}>
                        Filter by Job
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 40,
                        width: (windowWidth * 88) / 100,
                        marginTop: 4,
                        borderRadius: 5,
                        alignSelf: 'center',
                        backgroundColor: '#0001',
                        borderWidth: 1,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 5,
                          fontWeight: 'bold',
                          color: '#000',
                          fontSize: 16,
                          fontStyle: 'normal',
                        }}>
                        Filter by Subject Name
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 40,
                        width: (windowWidth * 88) / 100,
                        marginTop: 4,
                        borderRadius: 5,
                        alignSelf: 'center',
                        backgroundColor: '#0001',
                        borderWidth: 1,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 5,
                          fontWeight: 'bold',
                          color: '#000',
                          fontSize: 16,
                          fontStyle: 'normal',
                        }}>
                        Filter by Number of People
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setaddFilterModalVisible(false);
                      }}
                      style={{
                        height: 40,
                        width: (windowWidth * 93) / 100,
                        marginTop: 8,
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
                          marginTop: 5,
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
    </>
  );
}

const styles = StyleSheet.create({
  UpdatemodalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: (windowHeight * 60) / 100,
    shadowColor: '#000',
    height: (windowHeight * 40) / 100,
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
});
