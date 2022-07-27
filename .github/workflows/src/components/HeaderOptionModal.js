import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  Alert,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingViewComponent,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Freshchat,
  FreshchatConfig,
} from 'react-native-freshchat-sdk';
import { FreshchatUser } from 'react-native-freshchat-sdk';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HeaderOptionModal = props => {
  console.log(props);
  const [contactModalVisible, setcontactModalVisible] = React.useState(false);
  const getLocationFun = () => {
    setcontactModalVisible(false);
    props.closeModal();
    let value = 'Statue of Liberty';
    let url =
      Platform.OS === 'ios'
        ? `http://maps.apple.com/maps?daddr=${value}`
        : `http://maps.google.com/maps?daddr=${value}`;
    try {
      Linking.openURL(url);
    } catch (e) {
      console.log(e);
    }
  };

  const initFreshChat = () => {
    const APP_ID = '9efd1203-d5de-48fe-91d0-77edda2a4505';
    const APP_KEY = 'be47f188-cb6f-40a3-a478-7efe1f7df48f';
    getUserInfo()
    Freshchat.showConversations()
    const freshchatConfig = new FreshchatConfig(APP_ID, APP_KEY);
    freshchatConfig.cameraCaptureEnabled = false;
    Freshchat.init(freshchatConfig);

}
const getUserInfo = () => {
    var freshchatUser = new FreshchatUser();
    freshchatUser.firstName = "Bhanuchandar Test";
    freshchatUser.phonenumber = '9573976477';
    freshchatUser.email = 'bhanuychandar@gmailcom';
    freshchatUser.countryinfo = '+91';
    freshchatUser.device = Platform.OS == "android" ? "ANDROID" : "IOS"

    Freshchat.getUser((user) => {
        var restoreId = user.restoreId;
        console.log("restoreId:zzzzzzzzzzzzzzzzzzzzzzzzzzzzz " + restoreId);
    })
}
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.Visible}
        onRequestClose={props.closeModal}>
        <TouchableOpacity
          style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}
          onPress={props.closeModal}>
          <View
            style={{
              // backgroundColor: 'red',
              width: '95%',
              height: 190,
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
                    // justifyContent: 'space-evenly',
                    // alignItems: 'center',
                    height: 110,
                    borderRadius: 6,
                    elevation: 10,
                    marginTop:1
                  }}>
                  {/* <TouchableOpacity
                    onPress={() => {
                      props.closeModal();
                      props.navigation.navigate('ChatScreen');
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="people" size={20} color="#000" />
                      <Text
                        style={{color: 'black', fontSize: 15, marginLeft: 10}}>
                        Supportf
                      </Text>
                    </View>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => setcontactModalVisible(true)}>
                    <View
                      style={{
                        marginTop:10,
                        flexDirection: 'row',
                        paddingHorizontal:10,  justifyContent: 'space-around',
                      }}>
                      <Icon name="person" size={20} color="grey" style={{marginTop:2}} />
                      <Text
                        style={{color: 'grey', fontSize: 17,marginLeft:8,marginTop:3}}>
                        Contact
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      props.closeModal();
                     props.navigation.navigate('Home', {
                        screen: 'Communications',
                        params: {
                          screen: 'MessagesScreen',
                          params: { title: 'Communications' },
                        },
                      })
                    }}>
                    {/* // onPress={() => setcontactModalVisible(true)}> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal:10,
                        marginTop:8,
                        marginLeft:2
                        
                         
                      }}>
                      <Icon
                        name="ios-chatbubbles"
                        size={20}
                        color="grey"
                        //  style={{marginRight: 10}}
                      />
                      <Text
                        style={{color: 'grey',  fontSize: 17,marginLeft:10}}>
                          Chats 
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      props.closeModal();
                      props.navigation.navigate('SearchScreen');
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-evenly',
                        marginTop:5,paddingHorizontal:10,
                        marginLeft:4
                      }}>
                      <Icon name="search" size={20} color="grey" style={{marginTop:3}} />
                      <Text
                        style={{color: 'grey', fontSize: 17,marginLeft:9}}>
                        Search
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>
      {/* ...................................ContactmODAL.................. */}
      <Modal
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
                    onPress={() =>
                      props.navigation.navigate('CustomerProfileScreen')
                    }
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
                      setcontactModalVisible(false);
                      props.closeModal();
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

                  {/* <TouchableOpacity onPress={onSendSMSMessage} */}
                  <TouchableOpacity
                    onPress={() => {
                      setcontactModalVisible(false);
                      // props.navigation.navigate('ChatScreen');
                      initFreshChat()
                    }}
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
                    onPress={getLocationFun}
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
      </Modal>
    </View>
  );
};

export default HeaderOptionModal;

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
