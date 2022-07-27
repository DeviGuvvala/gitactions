import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Share,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Linking,
  Platform,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import ConnectionCheck from '../components/ConnectionCheck';
import {saveUserInLocalStorageAsync} from '../services/LocalStorage';
import {getUserFromStorageAsync} from '../services/LocalStorage';
import {
  generateTokenAsync,
  getworkordersasync,
  workorderDetailsasync,
} from '../services/Services';
import {Client} from '@twilio/conversations';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Workorder = ({navigation, route}) => {
  let network = ConnectionCheck();
  const [incExpanded, setpincExpanded] = React.useState(true);
  const [cmpvExpanded, setcmpvExpanded] = React.useState(true);
  const [contactModalVisible, setcontactModalVisible] = React.useState(false);
  const [workorders, setworkorders] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [custName, setCustName] = React.useState('');
  const [custPhone, setCustPhone] = React.useState('');
  const [custNo, setcustNo] = React.useState();
  const [token, setToken] = useState('');
  const [participants, setParticipants] = useState([]);

  const detailsScreen = item => {
    navigation.navigate('WorkorderDetailsScreen', {
      sono: item.sono,
      custNo: item.custNo,
      customerName: item.customerName,
    });
  };

  const getworkorders = useMemo(async () => {
    console.log('getworkorders');
    setLoading(true);
    if (network === true) {
      try {
        let user = await getUserFromStorageAsync('EmpID');
        const presentDate = '01-26-2022'; //moment(currentDate).format('MM-DD-YYYY');
        const res = await getworkordersasync(
          user,

          presentDate,
        );
        res.data.map(async item => {
          item.sechDate = moment(item.sechDate).format('MM/DD/YYYY');
        });
        setworkorders(res.data);

        await saveUserInLocalStorageAsync(res.data, 'Workorders');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      let workorders = await getUserFromStorageAsync('Workorders');

      setworkorders(workorders);

      setLoading(false);
    }
  }, [network]);

  const shareFun = async () => {
    try {
      const res = await Share.share({message: 'Service order sharing option'});
      if (res.action === Share.sharedAction) {
        if (res.activityType) {
          console.log('Activity type');
        } else {
          console.log('Shared');
        }
      } else if (res.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getToken = useMemo(async () => {
    console.log('getToken');
    let user = await getUserFromStorageAsync('EmpID');
    const res = await generateTokenAsync(user);
    setToken(res.token);
    const client = TwilioClient(res.token);
    client.on('stateChanged', state => {
      if (state === 'initialized') {
        console.log('The connection has been: ', state);
      } else {
        console.log('failed status:', state);
      }
    });

    client.on('conversationJoined', conversation => {
      conversation.getParticipants().then(result => {
        result.map(item => {
          if (item.identity != user) {
            setParticipants(participantList => [
              ...participantList,
              {
                conversation: conversation,
                identity:
                  item.bindings.sms != undefined
                    ? item.bindings.sms.address
                    : undefined,
              },
            ]);
          }
        });
      });
    });
  }, []);
  const TwilioClient = token => {
    return new Client(token);
  };
  // useEffect(() => {
  //   // getworkorders();
  //   getToken();
  // }, []);

  // useEffect(() => {
  //   getworkorders();
  //   // getToken;
  // }, [network]);

  const collapseFun = item => {
    switch (item) {
      case 'Incompleted':
        setpincExpanded(!incExpanded);
        break;
      case 'Completed':
        setcmpvExpanded(!cmpvExpanded);
        break;
      default:
        break;
    }
  };
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

  const renderIncompleteItem = ({item}) => (
    <View style={{flex: 0}}>
      {item.statusCodeDesc === 'Open' && (
        <View style={styles.firstView}>
          <View style={styles.secondView}>
            <View style={styles.thirdView}>
              <Text style={styles.wotextstyle}>Work Order #{item.sono}</Text>
              <Text style={styles.woDatestyle}>{item.sechDate}</Text>
              {/* <Text style={{marginTop: 5, fontSize: 18}}>05</Text> */}
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="share-social"
                  size={20}
                  color={'#3a3d41'}
                  style={{marginTop: 6, marginRight: 15}}
                  onPress={() => shareFun()}
                />
                <TouchableOpacity onPress={() => detailsScreen(item)}>
                  <Icon
                    name="arrow-forward-outline"
                    size={20}
                    color={'#3a3d41'}
                    style={{marginTop: 5}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 4}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 1,
                  height: 25,
                  width: 100,
                  backgroundColor: '#1a60a3',
                  borderRadius: 12,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  In Progress
                </Text>
              </View>
              <View style={{marginLeft: 7, marginTop: 3}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  {item.customerName}
                </Text>
              </View>
            </View>

            <ScrollView
              contentContainerStyle={{
                flexDirection: 'row',
                marginTop: 10,
              }}
              horizontal
              showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="location"
                  size={35}
                  color={'#3a3d41'}
                  style={{marginTop: 3}}
                  onPress={() => getLocationFun()}
                />
                <TouchableOpacity
                  onPress={() => {
                    setcontactModalVisible(true);
                    setCustName(item.customerName);
                    setCustPhone(item.telephone);
                    setcustNo(item.custNo);
                  }}>
                  <Icon
                    name="person"
                    size={35}
                    color={'#3a3d41'}
                    style={{marginTop: 3, marginLeft: 5}}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('WorkorderDetailsScreen', {
                    screen: 'WorkOrders',
                    params: {
                      sono: item.sono,
                      custNo: item.custNo,
                      customerName: item.customerName,
                    },
                  })
                }
                style={{
                  backgroundColor: '#6a9dff',
                  height: 40,
                  paddingHorizontal: 10,
                  // borderRadius: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    fontFamily: 'Sofia_Pro_Bold',
                    fontWeight: 'bold',
                    color: '#3A3D41',
                  }}>
                  {item.problemCodeDesc}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('BranchFileRoomScreen')}
                style={{
                  backgroundColor: '#f6a609',
                  height: 40,
                  paddingHorizontal: 10,
                  // borderRadius: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    fontFamily: 'Sofia_Pro_Bold',
                    fontWeight: 'bold',
                    color: '#3A3D41',
                  }}>
                  Service Branch
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('WorkorderDetailsScreen', {
                    screen: 'Steps',
                    params: {
                      sono: item.sono,
                      custNo: item.custNo,
                      customerName: item.customerName,
                    },
                  })
                }
                style={{
                  backgroundColor: '#FF5757',
                  height: 40,
                  paddingHorizontal: 10,
                  // borderRadius: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#3A3D41',
                    fontFamily: 'Sofia_Pro_Bold',
                  }}>
                  12 Steps
                </Text>
              </TouchableOpacity>

              {item.woEquipments.map((it, index) => (
                <TouchableOpacity
                  onPress={() => {
                    it.cname = item.customerName;
                    it.sono = item.sono;
                    navigation.navigate('ViewEqptInfoScreen', {EqObj: it});
                  }}>
                  {/* 
              //   onPress={() => {
              //  setEquipModalVisible(true);
              //  setEquipmentObject(it);
              // }}> } */}

                  <View
                    style={{
                      backgroundColor: '#52E0FF',
                      height: 40,
                      paddingHorizontal: 10,
                      // borderRadius: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 8,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#3A3D41',
                        fontFamily: 'Sofia_Pro_Bold',
                      }}>
                      {it.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );

  const renderCompleteItem = ({item}) => (
    <View style={{flex: 0}}>
      {item.statusCodeDesc === 'Completed' && (
        <View style={styles.firstView}>
          <View style={styles.secondView}>
            <View style={styles.thirdView}>
              <Text style={styles.wotextstyle}>Work Order #{item.sono}</Text>
              <Text style={styles.woDatestyle}>{item.sechDate}</Text>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="share-social"
                  size={20}
                  color={'#3a3d41'}
                  style={{marginTop: 5, marginRight: 15}}
                  onPress={() => shareFun()}
                />
                <TouchableOpacity onPress={() => detailsScreen(item)}>
                  <Icon
                    name="arrow-forward-outline"
                    size={20}
                    color={'#3a3d41'}
                    style={{marginTop: 5}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 1,
                  height: 25,
                  width: 100,
                  backgroundColor: '#1a60a3',
                  borderRadius: 12,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  In Progress
                </Text>
              </View>

              <View style={{marginLeft: 7, marginTop: 3}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  {item.customerName}
                </Text>
              </View>
            </View>

            <ScrollView
              contentContainerStyle={{
                flexDirection: 'row',
                marginTop: 8,
              }}
              horizontal
              showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                  <Icon
                    name="location"
                    size={35}
                    color={'#3a3d41'}
                    style={{marginTop: 3}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setcontactModalVisible(true);
                    setCustName(item.customerName);
                    setCustPhone(item.telephone);
                    setcustNo(item.custNo);
                  }}>
                  <Icon
                    name="person"
                    size={35}
                    color={'#3a3d41'}
                    style={{marginLeft: 5, marginTop: 3}}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('WorkorderDetailsScreen', {
                    screen: 'WorkOrders',
                    params: {
                      sono: item.sono,
                      custNo: item.custNo,
                      customerName: item.customerName,
                    },
                  })
                }
                style={{
                  backgroundColor: '#6A9DFF',
                  height: 40,
                  paddingHorizontal: 10,
                  // borderRadius: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#3A3D41',
                    fontFamily: 'Sofia_Pro_Bold',
                  }}>
                  {item.problemCodeDesc}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('BranchFileRoomScreen')}
                style={{
                  backgroundColor: '#f6a609',
                  height: 40,
                  paddingHorizontal: 10,
                  // borderRadius: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    fontFamily: 'Sofia_Pro_Bold',
                    fontWeight: 'bold',
                    color: '#3A3D41',
                  }}>
                  Service Branch
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('WorkorderDetailsScreen', {
                    screen: 'Steps',
                    params: {
                      sono: item.sono,
                      custNo: item.custNo,
                      customerName: item.customerName,
                    },
                  })
                }
                style={{
                  backgroundColor: '#26A688',
                  height: 40,
                  paddingHorizontal: 10,
                  // borderRadius: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#3A3D41',
                    fontFamily: 'Sofia_Pro_Bold',
                  }}>
                  12 Steps
                </Text>
              </TouchableOpacity>
              {item.woEquipments.map((it, index) => (
                <TouchableOpacity
                  onPress={() => {
                    it.cname = item.customerName;
                    it.sono = item.sono;
                    navigation.navigate('ViewEqptInfoScreen', {EqObj: it});
                  }}>
                  <View
                    style={{
                      backgroundColor: '#52E0FF',
                      height: 40,
                      paddingHorizontal: 10,
                      // borderRadius: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 8,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 14,
                        fontWeight: 'bold',
                        fontFamily: 'Sofia_Pro_Bold',
                        color: '#3A3D41',
                      }}>
                      {it.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading === false ? (
        <>
          {workorders.length > 0 ? (
            <View style={{marginBottom: 40}}>
              <View style={{maxHeight: (windowHeight * 40) / 100}}>
                <TouchableOpacity
                  style={styles.incompletedIconText}
                  onPress={() => collapseFun('Incompleted')}>
                  <Icon
                    name={
                      incExpanded === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={15}
                    color={'#000'}
                  />
                  <Text style={styles.incompletedTextUi}>Incomplete</Text>
                </TouchableOpacity>
                {incExpanded === true && (
                  <FlatList
                    data={workorders}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderIncompleteItem}
                  />
                )}
              </View>
              <View style={{maxHeight: (windowHeight * 40) / 100}}>
                <TouchableOpacity
                  style={styles.incompletedIconText}
                  onPress={() => collapseFun('Completed')}>
                  <Icon
                    name={
                      cmpvExpanded === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={15}
                    color={'#000'}
                  />
                  <Text style={styles.incompletedTextUi}>Complete</Text>
                </TouchableOpacity>
                {cmpvExpanded === true && (
                  <FlatList
                    data={workorders}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderCompleteItem}
                  />
                )}
              </View>
            </View>
          ) : (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  letterSpacing: 1.0,
                  color: '#000',
                }}>
                There are no workorders to display
              </Text>
            </View>
          )}
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            //  animating = {animating}
            color="#59A9F4" // color of your choice
            size="large"
            style={styles.activityIndicator}
          />
          <Text style={styles.loadingText}>
            Just a moment, we are loading your content
          </Text>
        </View>
      )}
      {/* ...............................Contact Modal................................................. */}

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
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginTop: 3}}>
                      <Image
                        source={require('../Images/person.png')}
                        style={{width: 30, height: 30}}
                        resizeMode="contain"
                      />
                    </View>
                    <View>
                      <Text style={styles.contactNameTextUi}>{custName}</Text>
                    </View>
                  </View>
                  <Icon
                    name="chevron-forward"
                    size={22}
                    // style={{marginTop: 2}}
                    color={'#000'}
                    onPress={() => navigation.navigate('CustomerProfileScreen')}
                    //  onPress={()=>props.navigation.navigate('CustomerProfileScreen')}
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

                  {/* <TouchableOpacity onPress={onSendSMSMessage} */}
                  <TouchableOpacity
                    onPress={() => {
                      setcontactModalVisible(false);
                      navigation.navigate('AddtoChatScreen', {
                        contactNum: custNo,
                        phone: custPhone,
                        name: custName,
                        token: token,
                        participants: participants,
                        screenname: 'Workorderpage',
                      });
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

const styles = StyleSheet.create({
  incompletedIconText: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  firstView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondView: {
    paddingHorizontal: 15,
    marginTop: 9,
    height: (windowHeight * 16.5) / 100,
    width: (windowWidth * 95) / 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 1,
  },
  thirdView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  wotextstyle: {
    fontFamily: 'Sofia_Pro_Bold',
    // fontStyle: 'regular',
    marginTop: 5,
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#3a3d41',
  },
  woDatestyle: {
    marginTop: 9,
    fontSize: 15,
    fontWeight: 'bold',
    // fontFamily: 'Sofia_Pro_Bold'
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
    marginTop: 5,
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

export default Workorder;
