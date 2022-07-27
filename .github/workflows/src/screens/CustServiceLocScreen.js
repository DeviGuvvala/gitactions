import React from 'react'
import { View,
    Text,
    Dimensions,
    ScrollView,
    RefreshControl,
    Image,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    Linking } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const CustServiceLocScreen = ({navigation,route}) => {

    const [contactModalVisible, setcontactModalVisible] = React.useState(false);

    const getLocationFun = () => {
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


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
           <View style={{ height: 45, backgroundColor: 'white' }}>
        <View style={{ paddingHorizontal: 5, flexDirection: 'row',marginTop:10 }}>
          <Icon
            name="md-arrow-back"
            size={25}
            // style={{ marginTop: 5 }}
            color={'#000'}
            onPress={() => navigation.goBack()}
          />

          <View>
            <Text style={{ marginLeft:70,fontSize: 20, fontWeight: 'bold', color: 'black', letterSpacing: 0.6 }}>Customer Branches</Text>
          </View>

          {/* <View>
            <TouchableOpacity>
              <Icon
                name="options"
                size={20}
                style={{marginRight:10,marginTop:2}}

                color={'#000'}
              // onPress={() => navigation.goBack()}
              />
            </TouchableOpacity>
          </View> */}





        </View>
        {/* <View
          style={{
            // borderBottomColor: 'blue',
            borderBottomWidth: 1,
            marginTop: 4
          }}
        /> */}
      </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{
                    marginTop: 15, width: (windowWidth * 92) / 100, borderWidth: 1, borderRadius: 4, height: 44, borderColor: 'grey'
                }}>
                    <View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
                        <Icon
                            name="search"
                            size={20}
                            color={'black'}
                            style={{ marginTop: 8 }}
                        />

                        <TextInput style={{ marginLeft: 5, fontSize: 18, width: '100%' }} placeholder="Please Enter Branch Here"></TextInput>

                    </View>
                </View>
            </View>

            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <View
                    style={{
                        height: 85,
                        width: (windowWidth * 92) / 100,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: 'black'
                    }}>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <View
                                style={{
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>
                                <Text
                                    style={{ fontSize: 18, fontFamily: 'Sofia_Pro_Bold', color: 'black' }}>
                                    SpringField IL/MI Branch
                                </Text>
                                {/* <Text style={{ fontSize: 15 }}>Primary Contact</Text> */}
                            </View>

                            <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Sofia_Pro' }}>
                                    Store Number :
                                </Text>
                                <Text style={{ fontSize: 15 }}>141ABX</Text>
                            </View>

                            <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Sofia_Pro' }}>Contact :</Text>
                                <Text style={{ fontSize: 15, fontFamily: 'Sofia_Pro' }}>Tom Hanks</Text>
                            </View>
                        </View>

                        <View>
                            <View
                                style={{ flexDirection: 'row', marginTop: 20, }}>
                                <View style={{ marginTop: 4 }}>
                                    <Icon name="location" size={25} color={'#000'}
                                       onPress={() => getLocationFun()} />
                                </View>
                                <View style={{ marginTop: 1 }}>
                                    <Icon name="person" size={25} color={'#000'}
                                     onPress={() =>
                                        setcontactModalVisible(true)
                                      } />
                                </View>
                                <View style={{ marginTop: 1 }}>
                                    <Icon name="document" size={25} color={'#000'}
                                    onPress={() => navigation.navigate("BranchFileRoomScreen")} />
                                </View>
                                <View style={{  }}>
                                    <Icon name="chevron-forward" size={25} color={'#000'}  onPress={() => navigation.navigate("BranchFileRoomScreen")}/>
                                </View>
                            </View>
                        </View>
                    </View>   
                </View>
            </View>


            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <View
                    style={{
                        height: 85,
                        width: (windowWidth * 92) / 100,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: 'black'
                    }}>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <View
                                style={{
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>
                                <Text
                                    style={{ fontSize: 18, fontFamily: 'Sofia_Pro_Bold', color: 'black' }}>
                                    SpringField IL/MI Branch
                                </Text>
                                {/* <Text style={{ fontSize: 15 }}>Primary Contact</Text> */}
                            </View>

                            <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Sofia_Pro' }}>
                                    Store Number :
                                </Text>
                                <Text style={{ fontSize: 15 }}>141ABX</Text>
                            </View>

                            <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Sofia_Pro' }}>Contact :</Text>
                                <Text style={{ fontSize: 15, fontFamily: 'Sofia_Pro' }}>Tom Hanks</Text>
                            </View>
                        </View>

                        <View>
                            <View
                                style={{ flexDirection: 'row', marginTop: 20, }}>
                                <View style={{ marginTop: 4 }}>
                                    <Icon name="location" size={25} color={'#000'}
                                       onPress={() => getLocationFun()} />
                                </View>
                                <View style={{ marginTop: 1 }}>
                                    <Icon name="person" size={25} color={'#000'}
                                     onPress={() =>
                                        setcontactModalVisible(true)
                                      } />
                                </View>
                                <View style={{ marginTop: 1 }}>
                                    <Icon name="document" size={25} color={'#000'}
                                    onPress={() => navigation.navigate("BranchFileRoomScreen")} />
                                </View>
                                <View style={{  }}>
                                    <Icon name="chevron-forward" size={25} color={'#000'}  onPress={() => navigation.navigate("BranchFileRoomScreen")} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>


            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <View
                    style={{
                        height: 85,
                        width: (windowWidth * 92) / 100,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: 'black'
                    }}>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <View
                                style={{
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>
                                <Text
                                    style={{ fontSize: 18, fontFamily: 'Sofia_Pro_Bold', color: 'black' }}>
                                    SpringField IL/MI Branch
                                </Text>
                                {/* <Text style={{ fontSize: 15 }}>Primary Contact</Text> */}
                            </View>

                            <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Sofia_Pro' }}>
                                    Store Number :
                                </Text>
                                <Text style={{ fontSize: 15 }}>141ABX</Text>
                            </View>

                            <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Sofia_Pro' }}>Contact :</Text>
                                <Text style={{ fontSize: 15, fontFamily: 'Sofia_Pro' }}>Tom Hanks</Text>
                            </View>
                        </View>

                        <View>
                            <View
                                style={{ flexDirection: 'row', marginTop: 20, }}>
                                <View style={{ marginTop: 4 }}>
                                    <Icon name="location" size={25} color={'#000'}
                                       onPress={() => getLocationFun()} />
                                </View>
                                <View style={{ marginTop: 1 }}>
                                    <Icon name="person" size={25} color={'#000'}
                                     onPress={() =>
                                        setcontactModalVisible(true)
                                      } />
                                </View>
                                <View style={{ marginTop: 1 }}>
                                    <Icon name="document" size={25} color={'#000'}
                                    onPress={() => navigation.navigate("BranchFileRoomScreen")} />
                                </View>
                                <View style={{  }}>
                                    <Icon name="chevron-forward" size={25} color={'#000'}   onPress={() => navigation.navigate("BranchFileRoomScreen")} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>


            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <View
                    style={{
                        height: 85,
                        width: (windowWidth * 92) / 100,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: 'black'
                    }}>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <View
                                style={{
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>
                                <Text
                                    style={{ fontSize: 18, fontFamily: 'Sofia_Pro_Bold', color: 'black' }}>
                                    SpringField IL/MI Branch
                                </Text>
                                {/* <Text style={{ fontSize: 15 }}>Primary Contact</Text> */}
                            </View>

                            <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Sofia_Pro' }}>
                                    Store Number :
                                </Text>
                                <Text style={{ fontSize: 15 }}>141ABX</Text>
                            </View>

                            <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Sofia_Pro' }}>Contact :</Text>
                                <Text style={{ fontSize: 15, fontFamily: 'Sofia_Pro' }}>Tom Hanks</Text>
                            </View>
                        </View>
                        <View>
                            <View
                                style={{ flexDirection: 'row', marginTop: 20, }}>
                                <View style={{ marginTop: 4 }}>
                                    <Icon name="location" size={25} color={'#000'}
                                       onPress={() => getLocationFun()} />
                                </View>
                                <View style={{ marginTop: 1 }}>
                                    <Icon name="person" size={25} color={'#000'}
                                     onPress={() =>
                                        setcontactModalVisible(true)
                                      } />
                                </View>
                                <View style={{ marginTop: 1 }}>
                                    <Icon name="document" size={25} color={'#000'}
                                    onPress={() => navigation.navigate("BranchFileRoomScreen")} />
                                </View>
                                <View style={{  }}>
                                    <Icon name="chevron-forward" size={25} color={'#000'}   onPress={() => navigation.navigate("BranchFileRoomScreen")} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

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
                      <View style={{ flexDirection: 'row' }}>
                          <View style={{ marginTop: 3 }}>
                            <Image
                              source={require('../Images/person.png')}
                              style={{ width: 30, height: 30 }}
                              resizeMode="contain"
                            />
                          </View>
                          <View>
                            <Text style={styles.contactNameTextUi}>
                              Micheal chang
                            </Text>
                          </View>

                       </View>
                      </View>

                      <View style={styles.contactDescViewUi}>
                        <Text style={styles.contactDescTextUi}>
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged.
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
                          <Icon
                            name="call-outline"
                            size={13}
                            color={'#000'}
                          />
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
                            navigation.navigate('ChatScreen');
                            // initFreshChat()

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
                          <Icon
                            name="chatbubble-outline"
                            size={13}
                            color={'#000'}
                          />
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
                          <Icon
                            name="location-outline"
                            size={13}
                            color={'#000'}
                          />
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
        
    )
}

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
      fontSize: 17,
      // fontWeight: '500',
      fontFamily: 'Sofia_Pro_Regular',
      fontWeight: '500',
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
       marginLeft: 10,
       marginTop:5
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
      height: (windowHeight * 72) / 100,
      width: (windowWidth * 93) / 100,
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
  
export default CustServiceLocScreen