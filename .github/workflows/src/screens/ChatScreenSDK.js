import React, {useState, useEffect, useCallback, Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import image from '../theme/Images';
import string from '../theme/AppStrings';
// import PdfThumbnail from "react-native-pdf-thumbnail";
import {
  getUserFromStorageAsync,
  saveUserInLocalStorageAsync,
} from '../services/LocalStorage';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import Mediaimage from '../components/Mediaimage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class ChatScreenSDK extends Component {
  constructor(props) {
    super(props);
    this.FlatListRef = React.createRef(null);
    this.conversation = props.route.params.item;
    this.state = {
      messages: [],
      userId: '',
      boundConversations: new Set(),
      message: '',
      loadingState: 'initializing',
      mediaUrl: '',
      modalVisible: false,
      closechatModal: false,
      filterModal: false,
      thumbnail: '',
      pdf: '',
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  setclosechatModal = closechatvisible => {
    this.setState({closechatModal: closechatvisible});
  };
  setfilterModal = filterModalvisible => {
    this.setState({filterModal: filterModalvisible});
  };

  loadMessagesFor = thisConversation => {
    // his.setState({userId: userId});
    if (this.conversation === thisConversation) {
      thisConversation
        .getMessages()
        .then(messagePaginator => {
          this.setState({
            messages: messagePaginator.items,
            loadingState: 'ready',
          });
        })
        .catch(err => {
          this.setState({loadingState: 'failed'});
        });
    }
  };
  getUserId = async () => {
    let user = await getUserFromStorageAsync('EmpID');
    this.setState({userId: user});
  };
  componentDidMount = () => {
    this.getUserId();
    if (this.conversation) {
      this.loadMessagesFor(this.conversation);

      if (!this.state.boundConversations.has(this.conversation)) {
        let newConversation = this.conversation;
        newConversation.on('messageAdded', m =>
          this.messageAdded(m, newConversation),
        );
        this.setState({
          boundConversations: new Set([
            ...this.state.boundConversations,
            newConversation,
          ]),
        });
      }
    }
  };

  messageAdded = (message, targetConversation) => {
    if (targetConversation === this.conversation)
      this.setState((prevState, props) => ({
        messages: [...prevState.messages, message],
      }));
  };
  onSend = async () => {
    if (!this.state.message) {
      return;
    } else {
      this.conversation.sendMessage(this.state.message);
      this.setState({message: ''});
      await saveUserInLocalStorageAsync(this.state.message, 'message');
    }
  };

  attachment = async mediatype => {
    const formData = new FormData();
    try {
      let Options = {
        mediaType: mediatype,
        quality: 1,
        includeBase64: true,
      };

      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      if (pickerResult.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (pickerResult.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (pickerResult.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (pickerResult.errorCode == 'others') {
        alert(pickerResult.errorMessage);
        return;
      }
      if (
        pickerResult.type === 'image/jpeg' ||
        pickerResult.type === 'image/png' ||
        pickerResult.type === 'image/jpg'
      ) {
        this.setState({mediaUrl: pickerResult.uri});
        formData.append('file', pickerResult);
        this.conversation.sendMessage(formData);
      }
      if (
        pickerResult.type === 'application/pdf' ||
        pickerResult.type === 'video/mp4'
      ) {
        this.setState({mediaUrl: pickerResult.uri});
        formData.append('file', pickerResult);
        this.conversation.sendMessage(formData);
        const image = new Image();

        image.src = pickerResult.uri;
        // const result = await PdfThumbnail.generate(pickerResult.uri, 0);
        // this.setState({ thumbnail: result });
      }
    } catch (e) {
      console.log(e);
    }
  };

  renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.mainRow}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Home', {
                screen: 'Communications',
                params: {
                  screen: 'AllCommunication',
                  params: {title: 'Communications'},
                },
              });
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
            <Text style={styles.secondaryTxt}>{this.state.userId}</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('tel:1234567890');
              }}>
              <View style={styles.call}>
                <Icon name="call" size={20} color={'#000'} />
              </View>
            </TouchableOpacity>
            {/* <Image style={styles.call} source={image.call} /> */}
            {/* <Image style={styles.video} source={image.video} /> */}
            <View style={styles.video}>
              <Icon name="videocam" size={20} color={'#000'} />
            </View>

            <TouchableOpacity
              style={styles.menuMain}
              onPress={() => this.setModalVisible(true)}>
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
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginTop: 7,
          }}></View>
        <View style={styles.viewchattimeln}></View>
        <View style={styles.chatBg}>
          <Image
            style={styles.arrow}
            source={require('../Images/rightarrow.png')}
          />
          <Text style={styles.chatbegunstyl}>Chat has begun</Text>
        </View>
        <View style={{flex: 1, marginTop: 5}}>
          <FlatList
            ref={ref => (this.FlatListRef = ref)}
            data={this.state.messages}
            onContentSizeChange={() => this.FlatListRef.scrollToEnd()}
            onLayout={() => this.FlatListRef.scrollToEnd()}
            keyExtractor={item => item.sid}
            renderItem={({item}) => {
              if (item.author === this.state.userId) {
                return (
                  <Mediaimage
                    message={item}
                    align="sender"
                    pdf={this.state.pdf}
                    pdfImg={this.state.thumbnail}
                  />
                );
              } else {
                return (
                  <Mediaimage
                    message={item}
                    align="receiver"
                    pdf={this.state.pdf}
                    pdfImg={this.state.thumbnail}
                  />
                );
              }
            }}
          />
        </View>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            width: '95%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
          }}>
          <TextInput
            placeholder="Type here.."
            value={this.state.message}
            style={{
              color: '#000',
              width: '70%',
              backgroundColor: '#c2c2c2',
              height: 40,
              borderRadius: 8,
              paddingLeft: 10,
            }}
            onChangeText={text => this.setState({message: text})}
          />
          <TouchableOpacity
            onPress={() => this.attachment('photo')}
            style={{
              elevation: 10,
              backgroundColor: '#fff',
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Icon name="attach-outline" size={25} color={'#000'} />
            {/* </View> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onSend}
            style={{
              elevation: 10,
              backgroundColor: '#fff',
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Icon name="send" size={25} color="grey" />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          // onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          //   this.setModalVisible(!modalVisible);
          // }}
        >
          <TouchableOpacity
            onPress={() => this.setModalVisible(!this.state.modalVisible)}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              // justifyContent: "center",
              // alignItems: "center",
              // marginTop: 40,
            }}>
            <View
              style={{
                marginTop: 40,

                backgroundColor: 'white',
                borderRadius: 10,
                height: 160,
                width: 187,
                marginLeft: (windowWidth * 50) / 100,

                //  padding: 35,
                //  alignItems: "flex-end",
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <View style={{padding: 10, marginTop: 8}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('AddtoChatScreen', {
                      sid: this.props.route.params.item.sid,
                      screenname: 'Chatscreenpage',
                      token: this.props.route.params.token,
                    })
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Icon name="md-people" size={23} color={'#000'} />
                    <Text
                      style={{fontSize: 18, fontWeight: 'bold', marginLeft: 3}}>
                      Adjust Members
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setfilterModal(!this.state.filterModal)}>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Icon name="md-options" size={25} color={'#000'} />
                    <Text
                      style={{
                        fontSize: 18,
                        marginLeft: 10,
                        fontWeight: 'bold',
                      }}>
                      Filter Chat
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ChatGalleryScreen')
                  }>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Icon
                      name="md-image"
                      size={25}
                      color={'#000'}
                      style={{marginTop: 1}}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        marginLeft: 10,
                        fontWeight: 'bold',
                      }}>
                      Chat Gallery
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setclosechatModal(true)}>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Icon name="md-close" size={25} color={'#000'} />
                    <Text
                      style={{
                        fontSize: 18,
                        marginLeft: 10,
                        fontWeight: 'bold',
                      }}>
                      Close Chat
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.closechatModal}
          // onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          //   this.setModalVisible(!modalVisible);
          // }}
        >
          <TouchableOpacity
            onPress={() => this.setclosechatModal(!this.state.closechatModal)}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: 40,
            }}>
            <View
              style={{
                // marginTop: 40,

                backgroundColor: 'white',
                borderRadius: 10,
                height: 160,
                width: (windowWidth * 95) / 100,
                // alignItems:'center',
                // justifyContent:'center',
                // marginLeft: (windowWidth * 50 / 100),

                //  padding: 35,
                //  alignItems: "flex-end",
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <View style={{padding: 10, marginTop: 2}}>
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <View style={{marginRight: 80}}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginLeft: 3,
                        color: 'black',
                      }}>
                      End Chat Warning
                    </Text>
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        this.setclosechatModal(!this.state.closechatModal)
                      }>
                      <Icon
                        name="md-close"
                        size={25}
                        color={'#000'}
                        style={{marginTop: 1, marginLeft: 4}}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 3 }}>Adjust Members</Text> */}
                </View>

                <View style={{marginTop: 10}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginLeft: 3,
                      color: 'black',
                    }}>
                    Are you sure you would like to end
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginLeft: 3,
                      color: 'black',
                    }}>
                    the chat?
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('MessagesScreen')
                    }>
                    <View
                      style={{
                        alignItems: 'center',
                        borderRadius: 5,
                        height: 40,
                        width: (windowWidth * 30) / 100,
                        backgroundColor: '#c2c2c2',
                      }}>
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 13,
                          fontWeight: 'bold',
                          color: 'black',
                          letterSpacing: 0.5,
                        }}>
                        CONFIRM
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.setclosechatModal(!this.state.closechatModal)
                    }>
                    <View
                      style={{
                        alignItems: 'center',
                        borderRadius: 5,
                        height: 40,
                        width: (windowWidth * 30) / 100,
                        backgroundColor: 'black',
                      }}>
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 13,
                          fontWeight: 'bold',
                          color: 'white',
                          letterSpacing: 0.5,
                        }}>
                        CANCEL
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.filterModal}
          // onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          //   this.setModalVisible(!modalVisible);
          // }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              // justifyContent: "center",
              // alignItems: "center",
              //  marginTop: (windowWidth*80/100),
            }}>
            <View
              style={{
                marginTop: (windowHeight * 60) / 100,

                backgroundColor: 'white',
                borderRadius: 10,
                height: (windowHeight * 40) / 100,
                width: windowWidth,
                // alignItems:'center',
                // justifyContent:'center',
                //  marginLeft: (windowWidth * 50 / 100),

                //  padding: 35,
                //  alignItems: "flex-end",
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <View style={{padding: 10, marginTop: 2}}>
                {/* <View style={styles.notescenteredView}>
              <TouchableWithoutFeedback style={styles.UpdatemodalView}> */}

                <View
                  style={{
                    // marginTop: 10,
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
                      onPress={() =>
                        this.setfilterModal(!this.state.filterModal)
                      }
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

                <View
                  style={{
                    height: 35,
                    width: (windowWidth * 80) / 100,
                    marginTop: 4,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'black',
                    alignSelf: 'center',
                    backgroundColor: '#0001',
                  }}>
                  <Text
                    style={{
                      // marginTop: 5,
                      color: 'grey',
                      letterSpacing: 0.3,
                      fontSize: 16,
                      fontStyle: 'normal',
                      paddingHorizontal: 10,
                      fontWeight: '500',
                      textAlign: 'center',
                      marginTop: 5,
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    Filter by User
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 15,
                    height: 35,
                    width: (windowWidth * 80) / 100,
                    marginTop: 4,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'black',
                    alignSelf: 'center',
                    backgroundColor: '#0001',
                  }}>
                  <Text
                    style={{
                      // marginTop: 5,
                      color: 'grey',
                      letterSpacing: 0.3,
                      fontSize: 16,
                      fontStyle: 'normal',
                      paddingHorizontal: 10,
                      fontWeight: '500',
                      textAlign: 'center',
                      marginTop: 5,
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    Filter by Date
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 15,
                    height: 35,
                    width: (windowWidth * 80) / 100,
                    marginTop: 4,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'black',
                    alignSelf: 'center',
                    backgroundColor: '#0001',
                  }}>
                  <Text
                    style={{
                      // marginTop: 5,
                      color: 'grey',
                      letterSpacing: 0.3,
                      fontSize: 16,
                      fontStyle: 'normal',
                      paddingHorizontal: 10,
                      fontWeight: '500',
                      textAlign: 'center',
                      marginTop: 5,
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    Filter by
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 15,
                    height: 35,
                    width: (windowWidth * 80) / 100,
                    marginTop: 4,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'black',
                    alignSelf: 'center',
                    backgroundColor: '#0001',
                  }}>
                  <Text
                    style={{
                      // marginTop: 5,
                      color: 'grey',
                      letterSpacing: 0.3,
                      fontSize: 16,
                      fontStyle: 'normal',
                      paddingHorizontal: 10,
                      fontWeight: '500',
                      textAlign: 'center',
                      marginTop: 5,
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    Filter by Group Names
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => this.setfilterModal(!this.state.filterModal)}
                  // onPress={() => {
                  //   setaddFilterModalVisible(false);
                  // }}
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

                {/* </TouchableWithoutFeedback>
            </View> */}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    backgroundColor: '#d5d7d9',
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
  SenderchatMsg: {
    marginHorizontal: 30,
    marginVertical: 5,
    flexDirection: 'row',
    width: '60%',
    alignSelf: 'flex-end',
  },
  ReceiverchatMsg: {
    marginHorizontal: 10,
    marginVertical: 5,
    width: '60%',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  sendmsgBg: {
    backgroundColor: '#a6a6a6',
    height: 76,
    width: '95%',
    marginRight: 10,
    borderRadius: 10,
  },
  RecmsgBg: {
    backgroundColor: '#9999ff',
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
});

export default ChatScreenSDK;
