import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Linking,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import {getUserFromStorageAsync} from '../services/LocalStorage';
import {generateTokenAsync} from '../services/Services';
import {Client} from '@twilio/conversations';
import {FloatingAction} from 'react-native-floating-action';
import moment from 'moment';
import Hud from '../components/Hud';
import {useIsFocused} from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const actions = [
  {
    // text: 'Call',
    icon: (
      <Icon
        name="md-call"
        style={{
          fontSize: 20,
          height: 22,
          color: 'white',
        }}
      />
    ),
    name: 'md-call',
    position: 2,
  },
  {
    // text: 'Chat',
    icon: (
      <Icon
        name="chatbox"
        style={{
          fontSize: 20,
          height: 22,
          color: 'white',
        }}
      />
    ),
    name: 'chatbox',
    position: 1,
  },
  {
    // text: 'Mail',
    icon: (
      <Icon
        name="md-mail"
        style={{
          fontSize: 20,
          height: 22,
          color: 'white',
        }}
      />
    ),
    name: 'md-mail',
    position: 3,
  },
];

const AllCommunication = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [showHud, setShowHud] = useState(false);
  const [token, setToken] = useState('');
  const [viewHeight, setViewHeight] = useState(false);
  const [secondviewHeight, setsecondViewHeight] = useState(false);
  const [yesterdayviewHeight, setyesterdayViewHeight] = useState(false);
  const [secondyesterdayviewHeight, setsecondyesterdayViewHeight] =
    useState(false);
  const [conversations, setConversations] = useState([]);
  const [names, setNames] = useState('');

  const getToken = async () => {
    setShowHud(true);
    let user = await getUserFromStorageAsync('EmpID');
    const res = await generateTokenAsync(user);
    setToken(res.token);
    // await saveUserInLocalStorageAsync(res.token, 'TwilioToken');
    const client = TwilioClient(res.token);
    client.on('stateChanged', state => {
      if (state === 'initialized') {
        console.log('The connection has been: ', state);
      } else {
        console.log('failed status:', state);
      }
    });

    client.on('conversationJoined', conversation => {
      let names = '';
      conversation.getParticipants().then(result => {
        result.map(item => {
          if (item.identity != user) {
            names = `${item.identity},` + names;
            let namess = names.slice(0, -1);
            conversation.participantsNames = namess;
          }
        });
      });
      conversation
        .getMessages()
        .then(messagePaginator => {
          if (messagePaginator.items.length > 0) {
            if (
              messagePaginator.items[messagePaginator.items.length - 1].type ===
              'media'
            ) {
              conversation.author =
                messagePaginator.items[
                  messagePaginator.items.length - 1
                ].author;
              if (
                messagePaginator.items[messagePaginator.items.length - 1].media
                  .contentType === 'image/jpeg'
              ) {
                conversation.lastmessage = 'Image';
              } else {
                conversation.lastmessage = 'Media message';
              }
            } else {
              conversation.author =
                messagePaginator.items[
                  messagePaginator.items.length - 1
                ].author;
              conversation.lastmessage =
                messagePaginator.items[messagePaginator.items.length - 1].body;
            }
          } else {
            conversation.lastmessage = 'There are no messages yet';
          }
        })
        .finally(() => {
          setShowHud(false);
        });
      setConversations(conversationList => [...conversationList, conversation]);
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
    // return setConversations([]);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {console.log(conversations)}
      <FlatList
        data={conversations}
        keyExtractor={item => item.sid}
        renderItem={({item}) => {
          let username = 'AC6dc78071e69a91845aa71783687b506e';
          let password = '7052cf2bf17c8702dac4f97a05685664';
          if (item.lastmessage) {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChatScreenSDK', {
                    item: item,
                    token: token,
                  });
                }}
                // navigation.navigate('ChatScreenSDK', {item})}}
                style={{
                  marginTop: 20,
                  borderRadius: 5,
                  height: (windowHeight * 8) / 100,
                  alignSelf: 'center',
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  width: (windowWidth * 95) / 100,
                  borderWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      justifyContent: 'flex-start',
                      // backgroundColor: 'red',
                      width: '90%',
                    }}>
                    <View
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Text style={{marginTop: 3, paddingHorizontal: 10}}>
                    item.friendlyName
                  </Text> */}
                      <Image
                        source={require('../Images/save.png')}
                        style={{
                          width: 35,
                          height: 35,
                          borderRadius: 35 / 2,
                        }}
                        // resizeMode="contain"
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-around',
                        marginLeft: 8,
                        width: '94%',
                        // backgroundColor: 'green',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              // marginTop: 4,
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: 'black',
                            }}
                            numberOfLines={1}>
                            {item.participants.size > 2
                              ? `Group Chat with ${item.participantsNames}`
                              : item.friendlyName}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              marginTop: 5,
                              // marginL: 5,
                              fontSize: 12,
                              // fontWeight: 'bold',
                              color: 'grey',
                            }}>
                            {moment(item.dateCreated).utc().format('H:mma')}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                          name="chatbubbles"
                          size={15}
                          style={{marginTop: 2}}
                          color={'grey'}
                        />
                        <Text
                          style={{
                            marginTop: 3,
                            marginLeft: 5,
                            fontSize: 12,
                            fontWeight: '700',
                            color: '#000',
                          }}>
                          {item.author
                            ? `${item.author} : ${item.lastmessage}`
                            : `${item.lastmessage}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }
        }}
      />
      <FloatingAction
        actions={actions}
        showBackground={false}
        onPressItem={name => {
          switch (name) {
            case 'md-call':
              navigation.navigate('AddtoCallScreen');
              break;

            case 'chatbox':
              navigation.navigate('AddtoChatScreen', {
                token: token,
                screenname: 'AllTabspage',
              });
              break;

            case 'md-mail':
              Linking.openURL(
                'mailto:support@example.com?subject=SendMail&body=Description',
              );
              break;

            default:
              break;
          }
        }}
      />
      <Hud showHud={showHud} />
    </View>
  );
};

export default AllCommunication;
