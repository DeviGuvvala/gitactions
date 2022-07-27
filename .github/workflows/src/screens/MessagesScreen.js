import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import ActionButton from 'react-native-action-button';
import {FAB} from 'react-native-paper';
import {Client} from '@twilio/conversations';
import {generateTokenAsync} from '../services/Services';
import {
  getUserFromStorageAsync,
  saveUserInLocalStorageAsync,
} from '../services/LocalStorage';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MessagesScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [viewHeight, setViewHeight] = useState(false);
  const [token, setToken] = useState('');
  const [lastmessage, setLastmessage] = useState('');
  const [item, setItem] = useState({});
  const [secondviewHeight, setsecondViewHeight] = useState(false);
  const [yesterdayviewHeight, setyesterdayViewHeight] = useState(false);
  const [secondyesterdayviewHeight, setsecondyesterdayViewHeight] =
    useState(false);
  const [conversations, setConversations] = useState([]);

  const getToken = async () => {
    let user = await getUserFromStorageAsync('EmpID');
    const res = await generateTokenAsync(user);
    const token = res.token;
    setToken(token);
    // await saveUserInLocalStorageAsync(res.token, 'TwilioToken');
    const client = TwilioClient(token);
    client.on('stateChanged', state => {
      if (state === 'initialized') {
        console.log('The connection has been: ', state);
      } else {
        console.log('failed status:', state);
      }
    });

    client.on('conversationJoined', conversation => {
      conversation.getMessages().then(messagePaginator => {
        if (messagePaginator.items.length > 0) {
          if (
            messagePaginator.items[messagePaginator.items.length - 1].type ===
            'media'
          ) {
            conversation.author =
              messagePaginator.items[messagePaginator.items.length - 1].author;
            conversation.lastmessage = 'Media message';
          } else {
            conversation.author =
              messagePaginator.items[messagePaginator.items.length - 1].author;
            conversation.lastmessage =
              messagePaginator.items[messagePaginator.items.length - 1].body;
          }
        }
        setConversations(conversationList => [
          ...conversationList,
          conversation,
        ]);
      });
    });
  };
  const TwilioClient = token => {
    return new Client(token);
  };

  useEffect(() => {
    // getToken();
    getToken();
    // const willFocusSubscription = navigation.addListener('focus', () => {
    //   getToken();
    // });

    return setConversations([]);
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            marginTop: 10,
            height: 45,
            width: (windowWidth * 95) / 100,
            alignSelf: 'center',
            backgroundColor: '#e9ebec',
            borderRadius: 3,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              paddingHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{marginTop: 2, marginLeft: 5, width: '90%'}}>
              <TextInput
                placeholder="Search Chats"
                style={{
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 'bold',
                  height: '100%',
                }}></TextInput>
              {/* <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Search Jobs</Text> */}
            </View>
            <TouchableOpacity>
              <Icon
                name="search"
                size={20}
                color={'#000'}
                style={{marginTop: 5}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={conversations}
          keyExtractor={item => item.sid}
          renderItem={({item}) => {
            // if (item.lastmessage) {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ChatScreenSDK', {
                    item: item,
                    token: token,
                  })
                }
                style={{
                  marginTop: 15,
                  borderRadius: 5,
                  height: (windowHeight * 10) / 100,
                  alignSelf: 'center',
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  width: (windowWidth * 95) / 100,
                  borderWidth: 1,
                }}>
                <View
                  style={{
                    // flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      // flexDirection:'row',
                      // marginTop: 10,
                      borderRadius: 5,
                      // height: (windowHeight * 8) / 100,
                      // alignSelf: 'center',
                      paddingHorizontal: 10,
                      // justifyContent: 'center',
                      // width: (windowWidth * 95) / 100,
                      // borderWidth: 1,
                    }}>
                    {console.log(item, 'item==>')}

                    <View
                      style={{
                        flexDirection: 'row',
                        // alignSelf: 'center',
                        // justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../Images/save.png')}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 35 / 2,
                        }}
                        // resizeMode="contain"
                      />

                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}>
                        + {item.participants.size} Participants
                      </Text>

                      <Text
                        style={{
                          marginLeft: (windowWidth * 35) / 100,
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}>
                        {' '}
                        {moment(item.dateUpdated).utc().format('H:mma')}
                      </Text>
                    </View>

                    <View
                      style={
                        {
                          // justifyContent: 'space-around',
                          // marginLeft: 8,
                          // width: '94%',
                          // backgroundColor: 'green',
                        }
                      }>
                      <View
                        style={{
                          flexDirection: 'row',
                          // alignSelf: 'center',
                          justifyContent: 'space-between',
                          // backgroundColor: 'red',
                          // width: '90%',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            // alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              // marginTop: 4,
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            {item.friendlyName}
                          </Text>
                          {/* <Text
                          style={{
                            // marginTop: 4,
                            marginLeft: 5,
                            fontSize: 14,
                            // fontWeight: 'bold',
                            color: 'grey',
                          }}>
                          Rosco Davis
                        </Text> */}
                        </View>
                        {/* <View>
                          <Text
                            style={{
                              // marginLeft:'30%',
                              marginTop: 5,
                              // marginL: 5,
                              fontSize: 12,
                              // fontWeight: 'bold',
                              color: 'grey',
                            }}>
                            5:59 PM
                          </Text>
                        </View> */}
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      marginTop: 3,
                      marginLeft: 5,
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    {item.author}
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      marginLeft: 5,
                      fontSize: 14,
                      fontWeight: '600',
                      // color:'red'
                    }}>
                    : {item.lastmessage}
                  </Text>
                </View>
              </TouchableOpacity>
            );
            // }
          }}
        />
        <View style={{marginBottom: 80}} />
      </ScrollView>
      <FAB
        style={styles.fab}
        large
        icon="message"
        color="white"
        onPress={() =>
          navigation.navigate('AddtoChatScreen', {
            token: token,
            screenname: 'AllTabspage',
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#3498db',
  },
});

export default MessagesScreen;
