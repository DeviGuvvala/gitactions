import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ConnectionCheck from '../components/ConnectionCheck';
import Hud from '../components/Hud';
import image from '../theme/Images';
import string from '../theme/AppStrings';
import {Client} from '@twilio/conversations';
import {Styles} from '../theme/Styles';

import {
  getUserFromStorageAsync,
  saveUserInLocalStorageAsync,
} from '../services/LocalStorage';
import ViewCurrentCellTab from '../components/Project/Cell/ViewCurrentCellTab';
import ChatScreenSDK from './ChatScreenSDK';
import {
  addParticipant,
  addParticipantWithNo,
  createConversationAsync,
  getContactPhoneNoAsync,
  getContactsAsync,
} from '../services/Services';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddtoChatScreen = props => {
  let network = ConnectionCheck();
  const [showHud, setShowHud] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addContactArr, setAddContactArr] = useState([]);
  const [user, setUser] = useState('');
  const [tabFrstname, setTabFrstName] = useState('Add Members');
  const [tabScndname, setTabScndName] = useState('View Current Call');
  const [clickFrstTab, setClickFrsttab] = useState(true);
  const [clickScndTab, setClickScndtab] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!props.route.params.participants) {
      getConversations();
    }

    if (props.route.params.screenname === 'Workorderpage') {
      customerConversation();
    } else {
      getContacts();
    }
  }, []);

  const customerConversation = async () => {
    let participants = props.route.params.participants;
    let phone = '';
    let checkingName = false;
    let conversation = {};
    if (props.route.params.phone.length != 12) {
      phone = '+1' + props.route.params.phone;
    } else {
      phone = props.route.params.phone;
    }
    participants.find(item => {
      if (item.identity === phone) {
        checkingName = true;
        conversation = item.conversation;
      }
    });

    if (checkingName === true) {
      props.navigation.navigate('ChatScreenSDK', {item: conversation});
    } else {
      createConversation(
        props.route.params.contactNum,
        props.route.params.phone,
        props.route.params.name,
      );
    }
  };

  const getContacts = async () => {
    let user = await getUserFromStorageAsync('EmpID');
    setUser(user);
    setShowHud(true);
    if (network === true) {
      try {
        const responseJson = await getContactsAsync();
        setShowHud(false);
        if (responseJson != null) {
          setAddContactArr(responseJson);
          await saveUserInLocalStorageAsync(responseJson, 'ChatIDList');
        }
      } catch (error) {}
    } else {
      let ChatidList = await getUserFromStorageAsync('ChatIDList');
      setAddContactArr(ChatidList);
      setShowHud(false);
    }
  };
  const createConversation = async (contactnumber, phone, name) => {
    let user = await getUserFromStorageAsync('EmpID');
    // let token = await getUserFromStorageAsync('TwilioToken');
    setLoading(true);
    const client = TwilioClient(props.route.params.token);
    client.on('stateChanged', state => {
      if (state === 'initialized') {
      }
    });
    const res = await createConversationAsync(name);
    if (res.sucess) {
      await addParticipant(res.token, user);
      if (!props.route.params.phone) {
        addMemberChatByName(name, res.token);
      } else {
        addMemberChat(contactnumber, phone, name, res.token);
      }
    } else {
      console.log('Error coming');
    }
  };
  const addMemberChatByName = async (name, token) => {
    const res = await addParticipant(token, name);
    if (res.sucess) {
      // let tokken = await getUserFromStorageAsync('TwilioToken');
      const client = TwilioClient(props.route.params.token);
      client.on('stateChanged', state => {
        if (state === 'initialized') {
        }
      });
      client.on('conversationJoined', conversation => {
        if (conversation.sid === token)
          props.navigation.navigate('ChatScreenSDK', {item: conversation});
        setLoading(false);
      });
    }
  };
  const TwilioClient = token => {
    return new Client(token);
  };
  const addMemberChat = async (contactnumber, phone, name, token) => {
    if (phone.length != 12) {
      phone = '+1' + phone;
    }
    const res = await addParticipantWithNo(token, phone);
    if (res.sucess != false) {
      // let tokken = await getUserFromStorageAsync('TwilioToken');
      const client = TwilioClient(props.route.params.token);
      client.on('stateChanged', state => {
        if (state === 'initialized') {
        }
      });
      client.on('conversationJoined', conversation => {
        if (conversation.sid === token)
          props.navigation.navigate('ChatScreenSDK', {
            item: conversation,
            token: props.route.params.token,
          });
        setLoading(false);
      });
    } else {
      alert(res.reason);
      setLoading(false);
      props.navigation.goBack();
    }
  };

  const getConversations = async () => {
    let user = await getUserFromStorageAsync('EmpID');
    const client = TwilioClient(props.route.params.token);
    client.on('stateChanged', state => {
      if (state === 'initialized') {
      }
    });
    client.on('conversationJoined', conversation => {
      setConversations(conversationList => [...conversationList, conversation]);

      conversation.getParticipants().then(result => {
        result.map(item => {
          if (item.identity != user) {
            setParticipants(participantList => [
              ...participantList,
              {conversation: conversation, identity: item.identity},
            ]);
          }
        });
      });
    });
  };

  const getContactPhoneNumber = async (contactNumber, name) => {
    let checkingName = false;
    let conversation = {};
    let user = await getUserFromStorageAsync('EmpID');
    setShowHud(true);
    const responseJson = await getContactPhoneNoAsync(user, contactNumber);
    if (responseJson != null) {
      if (responseJson.success != false) {
        participants.find(item => {
          if (item.conversation.participants.size === 2) {
            if (item.identity === name) {
              checkingName = true;
              conversation = item.conversation;
            }
          }
        });
        if (checkingName === true) {
          props.navigation.navigate('ChatScreenSDK', {item: conversation});
        } else {
          createConversation(contactNumber, responseJson[0].phone, name);
        }
      } else {
        alert(responseJson.reason);
        setShowHud(false);
      }
    }
  };
  const Item = ({title, numbr}) => {
    return (
      <View>
        <View style={[Styles.addMain, Styles.directionRow]}>
          <Image style={Styles.user} source={image.person} />
          <View style={Styles.mrgnhrzntl}>
            <Text style={Styles.fullName}>{title}</Text>
          </View>
          <View style={Styles.plusImg}>
            <TouchableOpacity
              onPress={() => {
                if (props.route.params.screenname === 'Chatscreenpage') {
                  addMemberChatByName(title, props.route.params.sid);
                } else {
                  getContactPhoneNumber(numbr, title);
                }
              }}>
              <Icon name="add" size={34} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.vwLn}></View>
      </View>
    );
  };
  const renderItem = ({item}) => (
    <Item title={item.employeeName} numbr={item.employeeNbr} />
  );
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {loading === false ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: 20,
                borderColor: '#000',
                borderWidth: 1,
                marginTop: 20,
                width: '50%',
                marginLeft: 15,
                backgroundColor: clickFrstTab == true ? '#c4c4c4' : '#fff',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setClickFrsttab(true);
                  setClickScndtab(false);
                }}>
                <Text
                  style={clickFrstTab == true ? Styles.bold : Styles.normal}>
                  {tabFrstname}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{ height: 18, borderColor: '#000', borderWidth: 1, alignSelf: 'center' }}></View> */}
            <View
              style={{
                height: 20,
                borderColor: '#000',
                borderWidth: 1,
                marginTop: 20,
                width: '50%',
                backgroundColor: clickFrstTab == false ? '#c4c4c4' : '#fff',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setClickFrsttab(false);
                  setClickScndtab(true);
                }}>
                <Text
                  style={clickFrstTab == false ? Styles.bold : Styles.normal}>
                  {tabScndname}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {clickFrstTab == true ? (
            <View>
              <Text style={Styles.memberOrg}>
                {string.screens.addContact.otherMembers}
              </Text>
              <View style={[Styles.inputTxt, Styles.directionRow]}>
                <Icon
                  style={{marginHorizontal: 5}}
                  name="search-outline"
                  size={20}
                />
                <TextInput
                  placeholder="Please enter search here"
                  style={Styles.search}
                />
              </View>
              <View style={{marginHorizontal: 15}}>
                <FlatList
                  style={{
                    height: windowHeight / 1.45,
                  }}
                  data={addContactArr}
                  renderItem={renderItem}
                  keyExtractor={item => item.deptNbr}
                />
              </View>
              <Hud showHud={showHud} />
            </View>
          ) : (
            <ViewCurrentCellTab
              token={props.route.params.token}
              navigation={props.navigation}
            />
          )}
        </View>
      ) : (
        <ActivityIndicator size={'small'} />
      )}
      {clickFrstTab == true ? (
        <View style={{flex: 1, position: 'absolute', bottom: 0}}>
          <View style={Styles.vwLnbtm} />
          <View style={{marginBottom: 10}}></View>
          <View>
            <View style={[Styles.btmCancel, Styles.directionRow]}>
              <TouchableOpacity
                style={Styles.cancel}
                onPress={() => props.navigation.goBack()}>
                <Text style={Styles.cancelTxt}>
                  {string.screens.addContact.cancel}
                </Text>
              </TouchableOpacity>
              <View style={Styles.bgnBg}>
                <Text style={Styles.bgnTxt}>
                  {string.screens.addContact.begin}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, position: 'absolute', bottom: 0}}>
          <View style={Styles.vwLnbtm} />
          <View>
            <View style={Styles.btmCancel}>
              <TouchableOpacity
                style={Styles.cancelBg}
                onPress={() => props.navigation.goBack()}>
                <Text style={Styles.cancelTxt}>
                  {string.screens.addContact.cancel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AddtoChatScreen;
