import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FlatList from '../components/FlatList';
import Hud from '../components/Hud';
import moment from 'moment';
import string from '../theme/AppStrings';
import image from '../theme/Images';
import AddFilter from '../components/Project/Cell/AddFilter';
import AdjustMember from '../components/Project/Cell/AdjustMember';
import axios from 'axios';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

const ChatScreen = ({navigation, route}) => {
  const [headerModal, setHeaderModal] = useState(false);
  const [message, setMessage] = React.useState('');
  const [messageListArr, setMessageListArr] = React.useState([]);
  const [showHud, setShowHud] = useState(false);
  const [token, setToken] = useState('');
  const [createtoken, setCreateToken] = useState('');
  const [joinedChat, setJoinedChat] = useState(false);
  const [randomNumber, setRandomNumber] = useState();
  const baseUrl = 'http://twl.9packsoftware.com:443/';
  // const [phone, setPhone] = useState(route.params.phone)
  // const [contactNum, setContactNum] = useState(route.params.contactNum)
  const [fullName, setFullName] = useState(route.params.fullName);
  const [result, setResult] = React.useState(false);

  console.log('getDetails====>', fullName);

  useEffect(() => {
    createConversation();
    // fetchUser()
    // getMessages()
  }, []);

  const createConversation = () => {
    setShowHud(true);
    fetch('http://twl.9packsoftware.com:443/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: fullName,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        setShowHud(false);

        if (responseJson != null) {
          console.log(
            'response======>zzzzzzzzzzzzzzzzzzzzzzzzzzz',
            responseJson.token,
          );
          setCreateToken(responseJson.token);
          getMessages();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  // const getMessages= () => {
  //   id = createtoken
  //   setShowHud(true)
  //   fetch('http://twl.9packsoftware.com:443/list-message/:'+id, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },

  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       setShowHud(false)
  //         console.log("response======>zzzzzzzzzzzzzzzzzzzzzzzzzzz", responseJson)

  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });

  // }

  // const fetchUser = async () => {
  //   let id = 'CH44227a066313449e8e978594af69d9d0'
  //   const configurationObject = {
  //     method: 'get',
  //     url: `${baseUrl}list-message/${id}`,
  //   };
  //   const response = await axios(configurationObject);
  //   console.log("response=========>xxxxxxxxxxxxxxx",response);
  // };

  const getMessages = () => {
    setShowHud(true);
    let id = 'CH4dd468e7e4b14921bafd0897614faa09';
    fetch(`${baseUrl}list-message/${id}`, {
      method: 'GET',
      // params: id,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('response======>eeeeeeeeeeeeeee', responseJson);
        setShowHud(false);
        setMessage('');
        setMessageListArr(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const sendMessages = async () => {
    if (!message.trim()) {
      alert('Please Enter Message');
      return;
    } else {
      try {
        fetch('http://twl.9packsoftware.com:443/message-conversation', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Body: 'Hello Team',
            Author: '124',
            chatId: 'CH4dd468e7e4b14921bafd0897614faa09',
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            setMessage('');
            console.log(message, fullName, createtoken);
            alert(responseJson.sucess);
            setToken(responseJson.token);
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const attachment = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setResult([pickerResult]);
      console.log(pickerResult);
      if (pickerResult.type === 'application/pdf') {
        // saveDocument(pickerResult.fileCopyUri);
      }
    } catch (e) {
      handleError();
    }
  };
  const handleError = () => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.mainRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          {/* <Image style={styles.backImg} source={image.back} /> */}
          <View style={styles.backImg}>
            <Icon name="arrow-back-outline" size={20} color={'#000'} />
          </View>
        </TouchableOpacity>
        <View style={styles.column}>
          <Text style={styles.headerTxt}>
            {string.screens.chatScreen.supportChart}
          </Text>
          <Text style={styles.secondaryTxt}>{fullName}</Text>
        </View>
        <View style={styles.right}>
          <View style={styles.call}>
            <Icon name="call" size={20} color={'#000'} />
          </View>
          {/* <Image style={styles.call} source={image.call} /> */}
          {/* <Image style={styles.video} source={image.video} /> */}
          <View style={styles.video}>
            <Icon name="videocam" size={20} color={'#000'} />
          </View>

          <TouchableOpacity
            style={styles.menuMain}
            onPress={() => setHeaderModal(!headerModal)}>
            <Image source={image.menu} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.search}>
        <View style={styles.searchRow}>
          <Image style={styles.searchIcon} source={image.search} />
          <TextInput
            style={styles.textInput}
            placeholder={string.screens.chatScreen.searchChat}
          />
        </View>
      </View>
      <View style={styles.viewLine}></View>
      <View style={styles.viewchattimeln}></View>
      <View style={styles.chatBg}>
        <Image style={styles.arrow} source={image.rightarrow} />
        <Text style={styles.chatbegunstyl}>
          {string.screens.chatScreen.chatBigun}
        </Text>
      </View>
      <FlatList
        enableRefresh
        refreshing={showHud}
        onRefresh={() => {
          getMessages();
        }}
        data={messageListArr}
        keyExtractor={(item, index) => index.toString()}
        renderItem={messageListArr => {
          return (
            <View style={styles.chatMsg}>
              <Image style={styles.user} source={image.usericon} />
              <View style={styles.msgBg}>
                <Text style={styles.msgTxtMain}>
                  {messageListArr.item.author}
                  <Text style={styles.msgTxttime}>
                    {' '}
                    {moment(messageListArr.item.dateCreated)
                      .utc()
                      .format('H:mma')}
                  </Text>
                </Text>
                <Text style={styles.msgTxtMain}>
                  {messageListArr.item.body}
                </Text>
              </View>
            </View>
          );
        }}
      />
      {/* {
        messageListArr.length >= 0 ?
          <View>
            <View style={styles.viewchattimeln}></View>
            <TouchableOpacity onPress={() => {
              addMemberChat()

            }}>
              <View style={styles.chatBgAddPrsn}>
                <Image style={styles.arrow} source={image.menuuser} />
                <Text style={styles.chatbegunstyl}>{string.screens.chatScreen.addPersonchat}</Text>
              </View>
            </TouchableOpacity>
          </View> :
          null
      } */}
      {/* {
        joinedChat ?
          <View>
            <View style={styles.viewchattimelnprsn}></View>
            <View style={styles.chatBgjoinPrsn}>
              <Image style={styles.arrow} source={image.menuuser} />
              <Text style={styles.chatbegunstyl}>{string.screens.chatScreen.joinedChat}</Text>
            </View>
          </View> :
          null
      } */}

      <View style={styles.bottomvw}>
        <View style={styles.enterMsgBg}>
          <TextInput
            style={styles.textInputEnterMsg}
            onChangeText={setMessage}
            value={message}
            placeholder={string.screens.chatScreen.typeaMessage}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            attachment();
          }}>
          <View style={styles.attachment}>
            <Icon name="attach-outline" size={18} color={'#000'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            sendMessages();
          }}>
          <View style={styles.sendMsg}>
            <Image source={image.rightarrow} />
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={headerModal}
        onRequestClose={() => setHeaderModal(false)}>
        <TouchableOpacity
          style={styles.mdlBg}
          onPress={() => setHeaderModal(false)}>
          <View style={styles.mainmdl}>
            <TouchableOpacity
              onPress={() => this.adjustMember.AdjustMembers(adjustMember)}>
              <View style={styles.row}>
                <Image style={styles.menuicons} source={image.menuuser} />
                <Text style={styles.menuTxt}>
                  {string.screens.chatScreen.menuadjust}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.addFilter.addFilterChat(addFilter)}>
              <View style={styles.row}>
                <Image style={styles.menuicons} source={image.filter} />
                <Text style={styles.menuTxt}>
                  {string.screens.chatScreen.menufilter}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChatGalleryScreen')}>
              <View style={styles.row}>
                <Image style={styles.menuicons} source={image.gallery} />
                <Text style={styles.menuTxt}>
                  {string.screens.chatScreen.menuchatglry}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <View style={styles.row}>
                <Image style={styles.crossImg} source={image.cross} />
                <Text style={styles.menuTxt}>
                  {string.screens.chatScreen.close}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <Hud showHud={showHud} />
      <AddFilter
        ref={ref => {
          this.addFilter = ref;
        }}
      />
      <AdjustMember
        ref={ref => {
          this.adjustMember = ref;
        }}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 15,
  },
  column: {
    flexDirection: 'column',
  },
  headerTxt: {
    color: '#3A3D41',
    fontSize: 14,
    marginHorizontal: 10,
    fontFamily: 'Sofia_pro_Bold',
    fontWeight: 'bold',
  },
  secondaryTxt: {
    color: '#60666C',
    fontSize: 10,
    marginHorizontal: 10,
  },
  right: {
    marginLeft: 'auto',
    flexDirection: 'row',
    marginRight: 15,
  },
  video: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  search: {
    backgroundColor: '#EFF0F1',
    height: 35,
    borderRadius: 5,
    marginTop: 8,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  textInput: {
    color: 'black',
    height: 35,
    marginTop: 5,
  },
  textInputEnterMsg: {
    color: 'black',
    height: 35,
    marginTop: 2,
    fontSize: 12,
    marginHorizontal: 10,
  },
  viewLine: {
    borderWidth: 2,
    borderColor: '#D1D1D6',
    marginTop: 8,
  },
  viewchattimeln: {
    borderWidth: 1,
    height: 0.5,
    borderColor: '#D3D7D9',
    marginTop: 25,
    marginHorizontal: 15,
  },
  viewchattimelnprsn: {
    borderWidth: 1,
    height: 0.5,
    borderColor: '#D3D7D9',
    marginTop: 15,
    marginHorizontal: 15,
  },

  chatBg: {
    width: 130,
    height: 30,
    marginTop: -18,
    backgroundColor: '#D3D7D9',
    borderRadius: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatBgAddPrsn: {
    width: 250,
    height: 30,
    marginTop: -18,
    backgroundColor: '#D3D7D9',
    borderRadius: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  chatBgjoinPrsn: {
    width: 210,
    height: 30,
    marginTop: -18,
    backgroundColor: '#D3D7D9',
    borderRadius: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrow: {
    marginHorizontal: 10,
  },
  chatbegunstyl: {
    color: '#3A3D41',
    fontSize: 10,
    fontFamily: 'Sofia_pro_Bold',
    fontWeight: 'bold',
  },
  chatMsg: {
    marginHorizontal: 26.5,
    marginVertical: 5,
    flexDirection: 'row',
  },
  msgBg: {
    backgroundColor: '#EFF0F1',
    height: 76,
    width: '95%',
    marginLeft: 10,
    borderRadius: 10,
  },
  msgTxtMain: {
    color: '#3A3D41',
    fontSize: 12,
    fontFamily: 'Sofia_pro_Bold',
    fontWeight: 'bold',
    marginTop: 12,
    marginLeft: 12,
  },
  msgTxttime: {
    color: '#3A3D41',
    fontSize: 12,
    fontFamily: 'Sofia_pro_Bold',
    fontWeight: 'normal',
    marginTop: 12,
    marginLeft: 5,
  },
  bottomvw: {
    marginTop: 'auto',
    marginBottom: 15,
    flexDirection: 'row',
  },
  enterMsgBg: {
    backgroundColor: '#EFF0F1',
    height: 35,
    width: '65%',
    borderRadius: 5,
    marginHorizontal: 15,
  },
  attachment: {
    backgroundColor: '#EFF0F1',
    height: 35,
    width: 30,
    borderRadius: 5,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendMsg: {
    backgroundColor: '#EFF0F1',
    height: 35,
    width: 30,
    borderRadius: 5,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuMain: {
    width: 14,
    height: 14,
    marginTop: 3,
  },
  call: {
    marginTop: 5,
  },
  mdlBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mainmdl: {
    width: 150,
    height: 120,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 6,
    marginTop: 45,
    // elevation: 5,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  menuTxt: {
    color: 'black',
    fontSize: 12,
    marginLeft: 5,
  },
  menuicons: {
    marginLeft: 8,
  },
  crossImg: {
    width: 15,
    height: 15,
    marginLeft: 8,
  },
  crossImg: {
    width: 15,
    height: 15,
    marginLeft: 8,
  },
});
