import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  RefreshControl,
  Image,
  Share,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { getUserFromStorageAsync } from '../services/LocalStorage';
import { getworkordersasync, workorderDetailsasync } from '../services/Services';
import Icon from 'react-native-vector-icons/Ionicons';
import { SettingsScreen } from '../../App';
import moment from 'moment';
import ToggleSwitch from '../components/ToggleSwitch';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AccountInfoScreen = ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(true);

  const [WDData, setWDData] = useState({});
  const [toggle, setToggle] = useState(true);
  const [custnote1, setcustnote1] = React.useState(true);
  const [companynote1, setcompanynote1] = React.useState(true);
  const [contactModalVisible, setcontactModalVisible] = React.useState(false);
  const [workorders, setworkorders] = useState([]);
  const [incExpanded, setpincExpanded] = React.useState(true);
  const [cmpvExpanded, setcmpvExpanded] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [EquipModalVisible, setEquipModalVisible] = React.useState(false);
  const [EquipmentObject, setEquipmentObject] = React.useState({});

  // const [EquipmentObject, setEquipmentObject] = React.useState({});

  const collapseFun = item => {
    switch (item) {
      case 'customer note':
        setcustnote1(!custnote1);
        break;
      case 'company note':
        setcompanynote1(!companynote1);
        break;
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

  const shareFun = async () => {
    try {
      const res = await Share.share({ message: 'Service order sharing option' });
      console.log('Activity type', res.activityType);
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

  const detailsScreen = item => {
    navigation.navigate('WorkorderDetailsScreen', {
      sono: item.sono,
      custNo: item.custNo,
      customerName: item.customerName,
    });
  };

  const getworkorders = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      let user = await getUserFromStorageAsync('EmpID');
      const presentDate = '01-26-2022'; //moment(currentDate).format('MM-DD-YYYY');
      const res = await getworkordersasync(
        user,
        // password,
        // companycode,
        presentDate,
      );
      console.log(res, 'ordersscreen');
      res.data.map(async item => {
        item.sechDate = moment(item.sechDate).format('MM/DD/YYYY');
      });
      console.log(res.data);
      setworkorders(res.data);
      setRefreshing(false);
      setWDData(res.data[0]);
      // networkModal && setNetworkModal(false);
      setLoading(false);
    } catch (error) {
      setRefreshing(false);
      // setNetworkModal(true);
      setLoading(false);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // console.log(network, 'network state');
    // if (network === true) {
    getworkorders();
    // setNetworkModal(false);
    // } else {
    //   console.log('network error page');
    // Toast.showWithGravity(
    //   'you are currently offline',
    //   Toast.LONG,
    //   Toast.TOP,
    //   ['UIAlertController'],
    // );
    // setNetworkModal(true);
    // networkModal && setworkorders([]);
    // }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                color: '#3a3d41',
                fontFamily: 'Sofia_Pro_Bold',
              }}>
              Primaries
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginTop: 3,
            width: (windowWidth * 95) / 100,
            alignSelf: 'center',
          }}
        />

        <View style={{ paddingHorizontal: 10, marginTop: 3 }}>
          <Text
            style={{
              color: 'black',
              letterSpacing: 0.4,
              fontSize: 16,
              fontFamily: 'Sofia_Pro',
              letterSpacing: 0.4,
            }}>
            Primary contact, Location and any other additional info that may be
            important.
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: 5 }}>
          <View
            style={{
              height: 130,
              width: (windowWidth * 95) / 100,
              borderWidth: 1,
              marginTop: 3,
              borderRadius: 5,
              borderColor: 'black',
            }}>
            <View
              style={{
                marginTop: 4,
                paddingHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Image
                    source={require('../Images/person1.png')}
                    style={{ width: 50, height: 50, marginTop: 4 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={{ marginTop: 5, marginLeft: 4 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Sofia_Pro_Bold',
                      color: '#3a3d41',
                    }}>
                    Micheal Chang
                  </Text>
                  <Text style={{ fontSize: 15, fontFamily: 'Sofia_Pro' }}>
                    Primary Contact
                  </Text>
                </View>
              </View>

              <View
                style={{ flexDirection: 'row', marginTop: 10, marginRight: 15 }}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('tel:1234567890');
                  }}>
                  <View style={{ marginTop: 4 }}>
                    <Icon name="call" size={25} color={'#3a3d41'} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={{ marginLeft: 10, marginTop: 1 }}>
                    <Icon name="videocam" size={30} color={'#3a3d41'} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={{ marginLeft: 10, marginTop: 1 }}>
                    <Icon name="mail" size={28} color={'#3a3d41'} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ paddingHorizontal: 15 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    fontFamily: 'Sofia_Pro',
                  }}>
                  Phone Number :
                </Text>
                <Text style={{ fontSize: 15, marginLeft: 10 }}>
                  1-555-555-555-555
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    fontFamily: 'Sofia_Pro',
                  }}>
                  Email Address :
                </Text>
                <Text style={{ fontSize: 15, marginLeft: 10 }}>
                  ninePack@9pack.com
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    fontFamily: 'Sofia_Pro',
                  }}>
                  Service Branch :{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 5,
                    fontFamily: 'Sofia_Pro',
                  }}>
                  SpringField Banglore
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <View
            style={{
              height: 85,
              width: (windowWidth * 95) / 100,
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
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
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontFamily: 'Sofia_Pro_Bold',
                    }}>
                    SpringField IL/MI Branch
                  </Text>
                  {/* <Text style={{ fontSize: 15 }}>Primary Contact</Text> */}
                </View>

                <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'Sofia_Pro',
                    }}>
                    Store Number :
                  </Text>
                  <Text style={{ fontSize: 15 }}>141ABX</Text>
                </View>

                <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'Sofia_Pro',
                    }}>
                    Contact :
                  </Text>
                  <Text style={{ fontSize: 15, fontFamily: 'Sofia_Pro' }}>
                    Tom Hanks
                  </Text>
                </View>
              </View>

              <View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <TouchableOpacity onPress={() => getLocationFun()}>
                    <View style={{ marginTop: 4 }}>
                      <Icon name="location" size={25} color={'#3a3d41'} />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setcontactModalVisible(true)}>
                    <View style={{ marginLeft: 5, marginTop: 1 }}>
                      <Icon name="person" size={30} color={'#3a3d41'} />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('BranchFileRoomScreen')}>
                    <View style={{ marginLeft: 5, marginTop: 3 }}>
                      <Icon name="document" size={28} color={'#3a3d41'} />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('BranchFileRoomScreen')}>
                    <View style={{ marginTop: 3 }}>
                      <Icon
                        name="chevron-forward"
                        size={28}
                        color={'#3a3d41'}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Sofia_Pro_Bold',
              color: '#3a3d41',
            }}>
            Work Orders (2)
          </Text>
          <Icon
            name="chevron-forward"
            size={28}
            color={'#000'}
            onPress={() => {
              navigation.navigate('CustWorkOrdersScreen');
            }}
          />
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            alignSelf: 'center',
            width: (windowWidth * 95) / 100,
          }}
        />

        <View style={{ paddingHorizontal: 10, marginTop: 3 }}>
          <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro', color: 'black' }}>
            All of the Customers Work Orders.Only two most recent are shown below.
          </Text>
        </View>
        <View>
          <View
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getworkorders}
              />
            }>
            <View>
              {/* <TouchableOpacity
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
                </TouchableOpacity> */}

              <View style={{ flex: 1 }}>
                {workorders.map(item => (
                  <View style={{ flex: 1 }}>
                    {item.statusCodeDesc === 'Open' && (
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            paddingHorizontal: 15,
                            marginTop: 9,
                            height: (windowHeight * 13) / 100,
                            width: (windowWidth * 95) / 100,
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 1,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 8,
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                // fontStyle: 'regular',
                                marginTop: 5,
                                fontSize: 18,
                                // fontWeight: 'bold',
                                color: '#3A3D41',
                              }}>
                              Work Order #{item.sono}
                            </Text>
                            <Text
                              style={{
                                marginTop: 9,
                                fontSize: 15,
                                fontWeight: 'bold',
                                // fontFamily: 'Sofia_Pro_Bold'
                              }}>
                              {item.sechDate}
                            </Text>
                            {/* <Text style={{marginTop: 5, fontSize: 18}}>05</Text> */}
                            <View style={{ flexDirection: 'row' }}>
                              <Icon
                                name="share-social"
                                size={20}
                                color={'#46494d'}
                                style={{ marginTop: 6, marginRight: 15 }}
                                onPress={() => shareFun()}
                              />
                              <TouchableOpacity
                                onPress={() => detailsScreen(item)}>
                                <Icon
                                  name="arrow-forward-outline"
                                  size={20}
                                  color={'#46494d'}
                                  style={{ marginTop: 5 }}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <ScrollView
                            contentContainerStyle={{
                              flexDirection: 'row',
                              marginTop: 10,
                            }}
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row' }}>
                              <Icon
                                name="location"
                                size={25}
                                color={'#3A3D41'}
                                style={{ marginTop: 3 }}
                                onPress={() => getLocationFun()}
                              />
                              <TouchableOpacity
                                onPress={() => setcontactModalVisible(true)}>
                                <Icon
                                  name="person"
                                  size={25}
                                  color={'#3A3D41'}
                                  style={{ marginTop: 3, marginLeft: 5 }}
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
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 5,
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
                              style={{
                                backgroundColor: '#f6a609',
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 5,
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
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 7,
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
                                  setEquipModalVisible(true);
                                  setEquipmentObject(it);
                                }}>
                                <View
                                  style={{
                                    backgroundColor: '#52E0FF',
                                    height: 30,
                                    paddingHorizontal: 10,
                                    borderRadius: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 7,
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
                ))}
              </View>
            </View>

            {/* .........................................Complete View....................... */}

            <View style={{ marginTop: 5 }} />
            <View>
              {/* <TouchableOpacity
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
                </TouchableOpacity> */}

              <View>
                {workorders.map(item => (


                  <View style={{ flex: 0 }}>
                    {item.statusCodeDesc === 'Completed' && (
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            paddingHorizontal: 15,
                            marginTop: 9,
                            height: 100,
                            width: (windowWidth * 95) / 100,
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 1,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 8,
                            }}>
                            <Text
                              style={{
                                marginTop: 5,
                                fontSize: 18,
                                // fontWeight: 'bold',
                                color: '#3A3D41',
                                fontFamily: 'Sofia_Pro_Bold',
                              }}>
                              Work Order #{item.sono}
                            </Text>
                            <Text
                              style={{
                                marginTop: 9,
                                fontSize: 15,
                                fontWeight: 'bold',
                              }}>
                              {item.sechDate}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                              <Icon
                                name="share-social"
                                size={20}
                                color={'#46494d'}
                                style={{ marginTop: 5, marginRight: 15 }}
                                onPress={() => shareFun()}
                              />
                              <TouchableOpacity
                                onPress={() => detailsScreen(item)}>
                                <Icon
                                  name="arrow-forward-outline"
                                  size={20}
                                  color={'#46494d'}
                                  style={{ marginTop: 5 }}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <ScrollView
                            contentContainerStyle={{
                              flexDirection: 'row',
                              marginTop: 10,
                            }}
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row' }}>
                              <TouchableOpacity>
                                <Icon
                                  name="location"
                                  size={25}
                                  color={'#3A3D41'}
                                  style={{ marginTop: 3 }}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => setcontactModalVisible(true)}>
                                <Icon
                                  name="person"
                                  size={25}
                                  color={'#3A3D41'}
                                  style={{ marginTop: 3, marginLeft: 5 }}
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
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 5,
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
                              style={{
                                backgroundColor: '#f6a609',
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 5,
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
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 7,
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
                                  setEquipModalVisible(true);
                                  setEquipmentObject(it);
                                }}>
                                <View
                                  style={{
                                    backgroundColor: '#52E0FF',
                                    height: 30,
                                    paddingHorizontal: 10,
                                    borderRadius: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 7,
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
                ))}
              </View>
            </View>

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
                        {/* <Icon
                          name="chevron-forward"
                          size={22}
                          // style={{marginTop: 2}}
                          color={'#000'}
                          onPress={() =>
                            props.navigation.navigate('CustomerProfileScreen')
                          }
                        //  onPress={()=>props.navigation.navigate('CustomerProfileScreen')}
                        /> */}
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

            {/* //////////////////////////////equipmodal start////////////////////////////////////////// */}

            {/* ........................................NetworkModal............................... */}

            {/* <View style={{ marginBottom: 100 }}></View> */}
          </View>
        </View>











        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: 12,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Sofia_Pro_Bold',
              color: '#3a3d41',
            }}>
            Equipments
          </Text>
          <Icon
            name="chevron-forward"
            size={28}
            color={'#000'}
            onPress={() => {
              navigation.navigate('CustomerEquipScreen');
            }}
          />
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            alignSelf: 'center',
            width: (windowWidth * 95) / 100,
          }}
        />

        <View style={{ paddingHorizontal: 10, marginTop: 3 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Sofia_Pro_Regular',
              letterSpacing: 0.5,
              color: 'black',
            }}>
            All of the Customer Equipment.Click to view all.
          </Text>
        </View>


        <View style={{ height: 100 }}>
          {workorders.map(item => (

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {item.statusCodeDesc === 'Open' && (
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    marginRight: 10,
                  }}>
                  {item.woEquipments.map((item, index) => (
                    <View
                      style={{
                        height: 74,
                        width: 230,
                        borderWidth: 1,
                        borderColor: 'black',
                        justifyContent: 'center',
                        paddingHorizontal: 10,
                        backgroundColor: '#FFFFFF',
                        marginLeft: 10,
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Sofia_Pro_Bold',
                          fontStyle: 'normal',
                          lineHeight: 24,
                          letterSpacing: 0.5,
                          color: '#050709',
                          textAlign: 'center',
                          // numberOfLines:'2'
                        }}>
                        {item.description}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            // flexDirection: 'row',
                            marginTop: 4,
                            // alignItems: 'center',
                            // marginLeft: 'auto',
                            // marginHorizontal: 5,
                          }}>
                          <ToggleSwitch
                            isOn={true} // There should be a state like this.state.isOn(Set default value)
                            onColor="#26A688"
                            offColor="#E9EBEC"
                            size="medium"
                            onToggle={() => navigation.navigate('ViewEqptInfoScreen', { EqObj: item })} //To update state
                            icon={
                              toggle === true ? (
                                <Icon name="checkmark-circle-outline" size={33} />
                              ) : (
                                <Icon name="time-outline" size={33} />
                              )
                            }
                            // label="active"
                            // labelStyle={{color: '#000', position: 'absolute'}}
                            text={
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 16,
                                  fontWeight: 'bold',
                                  // position: 'absolute',
                                }}>
                                active
                              </Text>
                            }
                          />
                          {/* <Image
                            source={require('../Images/image1.jpg')}
                            style={{ width: 60, height: 70, borderRadius: 5 }}
                          // resizeMode="contain"
                          />
                          <Image
                            source={require('../Images/image1.jpg')}
                            style={{
                              marginLeft: 10,
                              width: 60,
                              height: 70,
                              borderRadius: 5,
                            }}
                          // resizeMode="contain"
                          /> */}
                        </View>

                        <TouchableOpacity

                          onPress={() => {

                            navigation.navigate('ViewEqptInfoScreen', { EqObj: item })
                          }}>
                          <View style={{ marginTop: 10 }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: 'blue',
                                textDecorationLine: 'underline',
                              }}>
                              View Eqpt Info
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>

              )}
            </ScrollView>
          ))}
        </View>


        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: '#3a3d41',
              fontFamily: 'Sofia_Pro_Bold',
            }}>
            Communications
          </Text>
          <Icon
            name="chevron-forward"
            size={28}
            color={'#000'}
            onPress={() => {
              navigation.navigate('CustCommScreen');
            }}
          />
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            alignSelf: 'center',
            width: (windowWidth * 95) / 100,
          }}
        />

        <View style={{ paddingHorizontal: 10, marginTop: 3 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Sofia_Pro',
              letterSpacing: 0.5,
              color: 'black',
            }}>
            Latest Communication with Client.
          </Text>
        </View>

        <View style={{ justifyContent: 'center' }}>
          <View
            style={{
              padding: 15,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: (windowHeight * 20) / 100,
                width: (windowWidth * 45) / 100,
                borderWidth: 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  // fontWeight: 'bold',
                  marginTop: 10,
                  paddingHorizontal: 15,
                  fontFamily: 'Sofia_Pro_Bold',
                  // fontStyle: 'normal',
                  // lineHeight: 24,
                  // letterSpacing: 0.5,
                  color: 'black',
                }}>
                Phone Call
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  marginTop: 5,
                  paddingHorizontal: 15,
                  fontFamily: 'Sofia_Pro_Bold',
                  // fontStyle: 'normal',
                  // lineHeight: 16,
                  // letterSpacing: 1.5,
                  color: 'black',
                }}>
                LAST CALL RECIEVED
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                }}>
                <View>
                  <Icon name="call" size={16} color={'#3A3D41'} />
                </View>
                <View style={{ marginLeft: 5 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Sofia_Pro_Regular',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      // lineHeight: 22,
                      // letterSpacing: 0.25,
                      color: '#050709',
                    }}>
                    Thu. 5:19 PM
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CustCommScreen');
                }}>
                {/* onPress={() =>
                    navigation.navigate('Communicationstack', {
                      screen: 'CallScreen',
                    })
                  }> */}
                <Text
                  style={{
                    marginTop: 10,
                    paddingHorizontal: 15,
                    fontSize: 14,
                    fontWeight: 'bold',
                    fontFamily: 'Sofia_Pro_Bold',
                    //   fontStyle: 'normal',
                    //   lineHeight: 22,
                    //   letterSpacing: 0.25,
                    color: 'black',
                  }}>
                  See Calls
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: (windowHeight * 20) / 100,
                width: (windowWidth * 45) / 100,
                borderWidth: 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginTop: 10,
                  paddingHorizontal: 15,
                  fontFamily: 'Sofia_Pro_Bold',
                  // fontStyle: 'normal',
                  // lineHeight: 24,
                  // letterSpacing: 0.5,
                  color: 'black',
                }}>
                Messages
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 5,
                  fontWeight: 'bold',
                  paddingHorizontal: 15,
                  fontFamily: 'Sofia_Pro_Bold',
                  // fontStyle: 'normal',
                  // lineHeight: 16,
                  // letterSpacing: 1.5,
                  color: 'black',
                }}>
                LAST MESSAGE
              </Text>
              <Text
                style={{
                  marginTop: 7,
                  paddingHorizontal: 15,
                  fontSize: 12,
                  fontFamily: 'Sofia_Pro_Regular',
                  fontStyle: 'normal',
                  lineHeight: 18,
                  letterSpacing: 0.2,
                  color: '#050709',
                  alignItems: 'center',
                }}>
                The issue is still here {'\n'}
                Please send Help...
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CustomerMsgScreen');
                }}>
                {/* onPress={() =>
                    navigation.navigate('Communicationstack', {
                      screen: 'MessagesScreen',
                    })
                  }> */}
                <Text
                  style={{
                    marginTop: 7,
                    paddingHorizontal: 15,
                    fontSize: 15,
                    fontWeight: 'bold',
                    fontFamily: 'Sofia_Pro_Bold',
                    //   fontStyle: 'normal',
                    //   lineHeight: 22,
                    //   letterSpacing: 0.25,
                    color: 'black',
                  }}>
                  See Messages
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#3a3d41',
              fontFamily: 'Sofia_Pro_Bold',
            }}>
            Service Locations(2)
          </Text>
          <Icon
            name="chevron-forward"
            size={28}
            color={'#000'}
            onPress={() => {
              navigation.navigate('CustServiceLocScreen');
            }}
          />
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            alignSelf: 'center',
            width: (windowWidth * 95) / 100,
          }}
        />

        <View style={{ paddingHorizontal: 10, marginTop: 3 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Sofia_Pro',
              letterSpacing: 0.5,
              color: 'black',
            }}>
            Different Customer Branches. The two most frequent are only shown
            below
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <View
            style={{
              height: 85,
              width: (windowWidth * 95) / 100,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'black',
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
                    style={{
                      fontSize: 18,
                      fontFamily: 'Sofia_Pro_Bold',
                      color: 'black',
                    }}>
                    SpringField IL/MI Branch
                  </Text>
                  {/* <Text style={{ fontSize: 15 }}>Primary Contact</Text> */}
                </View>

                <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'Sofia_Pro',
                    }}>
                    Store Number :
                  </Text>
                  <Text style={{ fontSize: 15 }}>141ABX</Text>
                </View>

                <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, color: 'black' }}>Contact :</Text>
                  <Text style={{ fontSize: 15 }}>Tom Hanks</Text>
                </View>
              </View>

              <View>
                <View
                  style={{ flexDirection: 'row', marginTop: 20, marginLeft: 2 }}>
                  <View style={{ marginTop: 4 }}>
                    <Icon
                      name="location"
                      size={25}
                      color={'#000'}
                      onPress={() => getLocationFun()}
                    />
                  </View>
                  <View style={{ marginLeft: 10, marginTop: 1 }}>
                    <Icon
                      name="person"
                      size={30}
                      color={'#000'}
                      onPress={() => setcontactModalVisible(true)}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('WoEQuipLibraryScreen')}>
                    <View style={{ marginLeft: 10, marginTop: 1 }}>
                      <Icon name="document" size={28} color={'#000'} />
                    </View>
                  </TouchableOpacity>
                  <View style={{ marginTop: 1 }}>
                    <Icon
                      name="chevron-forward"
                      size={28}
                      color={'#000'}
                      onPress={() => {
                        navigation.navigate('CustServiceLocScreen');
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <View
            style={{
              height: 85,
              width: (windowWidth * 95) / 100,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'black',
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
                    style={{
                      fontSize: 18,
                      fontFamily: 'Sofia_Pro_Bold',
                      color: 'black',
                    }}>
                    SpringField IL/MI Branch
                  </Text>
                  {/* <Text style={{ fontSize: 15 }}>Primary Contact</Text> */}
                </View>

                <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'Sofia_Pro',
                    }}>
                    Store Number :
                  </Text>
                  <Text style={{ fontSize: 15 }}>141ABX</Text>
                </View>

                <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'Sofia_Pro',
                    }}>
                    Contact :
                  </Text>
                  <Text style={{ fontSize: 15, fontFamily: 'Sofia_Pro' }}>
                    Tom Hanks
                  </Text>
                </View>
              </View>

              <View>
                <View
                  style={{ flexDirection: 'row', marginTop: 20, marginLeft: 2 }}>
                  <View style={{ marginTop: 4 }}>
                    <Icon
                      name="location"
                      size={25}
                      color={'#000'}
                      onPress={() => getLocationFun()}
                    />
                  </View>
                  <View style={{ marginLeft: 10, marginTop: 1 }}>
                    <Icon
                      name="person"
                      size={30}
                      color={'#000'}
                      onPress={() => setcontactModalVisible(true)}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('WoEQuipLibraryScreen')}>
                    <View style={{ marginLeft: 10, marginTop: 1 }}>
                      <Icon name="document" size={28} color={'#000'} />
                    </View>
                  </TouchableOpacity>

                  <View style={{ marginTop: 1 }}>
                    <Icon
                      name="chevron-forward"
                      size={28}
                      color={'#000'}
                      onPress={() => {
                        navigation.navigate('CustServiceLocScreen');
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Sofia_Pro_Bold',
              color: '#3a3d41',
            }}>
            Customer Notes (2)
          </Text>
          <Icon
            name="chevron-forward"
            size={28}
            color={'#000'}
            onPress={() => navigation.navigate('WorkOrderNotesScreen')}
          />
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            alignSelf: 'center',
            width: (windowWidth * 95) / 100,
          }}
        />

        <View style={{ paddingHorizontal: 10, marginTop: 3 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Sofia_Pro',
              letterSpacing: 0.5,
              color: 'black',
            }}>
            External Notes about the Customer.The most recent two are shown
            below.
          </Text>
        </View>

        <View style={{ width: '95%', alignSelf: 'center', marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              alignSelf: 'center',
            }}
            onPress={() => collapseFun('customer note')}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', marginTop: 3 }}>
                <Icon
                  name={
                    custnote1 === true
                      ? 'chevron-down-outline'
                      : 'chevron-forward-outline'
                  }
                  size={24}
                  color={'#000'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Sofia_Pro_Bold',
                    //   fontStyle: 'normal',
                    //   lineHeight: 22,
                    //   letterSpacing: 0.25,
                    color: '#050709',
                    fontWeight: 'bold',
                    marginTop: 2,
                  }}
                  numberOfLines={1}>
                  George Victor
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 2,
                    //   fontFamily: 'Sofia_Pro_Regular',
                    //   fontStyle: 'normal',
                    //   lineHeight: 18,
                    //   letterSpacing: 0.2,
                    color: '#050709',
                  }}>
                  10/10/2021
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {custnote1 === true && (
            <View>
              <View style={{ paddingHorizontal: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Sofia_Pro',
                    //   fontStyle: 'normal',
                    //   lineHeight: 22,
                    letterSpacing: 0.5,
                    color: 'black',
                  }}>
                  Another solution is to add a height property to the parent
                  View container. This sometimes works well when calculating the
                  height against the screen height
                </Text>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity>
          <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
            <View
              style={{
                height: 35,
                width: (windowWidth * 95) / 100,
                backgroundColor: '#e8e9f3',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Icon name="add-outline" size={20} color="#050709" />
              <View>
                <Text
                  style={{
                    marginLeft: 12,
                    fontSize: 15,
                    fontWeight: 'bold',
                    //   fontFamily: 'Sofia_Pro_Bold',
                    //   fontStyle: 'normal',
                    //   lineHeight: 22,
                    //   letterSpacing: 0.25,
                    color: '#050709',
                  }}>
                  Add
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Sofia_Pro_Bold',
              color: '#3a3d41',
            }}>
            Company Notes (2)
          </Text>
          <Icon
            name="chevron-forward"
            size={28}
            color={'#000'}
            onPress={() => navigation.navigate('WorkOrderNotesScreen')}
          />
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            alignSelf: 'center',
            width: (windowWidth * 95) / 100,
          }}
        />

        <View style={{ paddingHorizontal: 10, marginTop: 3 }}>
          <Text style={{ fontSize: 16, letterSpacing: 0.5, color: 'black' }}>
            Internal Notes about the Customer.
          </Text>
        </View>

        <View style={{ width: '95%', alignSelf: 'center', marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              alignSelf: 'center',
            }}
            onPress={() => collapseFun('company note')}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <Icon
                  name={
                    companynote1 === true
                      ? 'chevron-down-outline'
                      : 'chevron-forward-outline'
                  }
                  size={24}
                  color={'#000'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    //   fontFamily: 'Sofia_Pro_Bold',
                    //   fontStyle: 'normal',
                    //   lineHeight: 22,
                    //   letterSpacing: 0.25,
                    color: '#050709',
                    marginTop: 2,
                  }}
                  numberOfLines={1}>
                  Victor
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 2,
                    //   fontFamily: 'Sofia_Pro_Regular',
                    //   fontStyle: 'normal',
                    //   lineHeight: 18,
                    //   letterSpacing: 0.2,
                    color: '#050709',
                  }}>
                  10/10/2021
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {companynote1 === true && (
            <View>
              <View style={{ paddingHorizontal: 18 }}>
                <Text
                  style={{
                    fontSize: 16,
                    //   fontFamily: 'Sofia_Pro_Regular',
                    //   fontStyle: 'normal',
                    //   lineHeight: 22,
                    letterSpacing: 0.5,
                    color: 'black',
                  }}>
                  Another solution is to add a height property to the parent
                  View container. This sometimes works well when calculating the
                  height against the screen height
                </Text>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity>
          <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
            <View
              style={{
                height: 35,
                width: (windowWidth * 95) / 100,
                backgroundColor: '#e8e9f3',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Icon name="add-outline" size={20} color="#050709" />
              <View>
                <Text
                  style={{
                    marginLeft: 12,
                    fontSize: 15,
                    fontWeight: 'bold',
                    //   fontFamily: 'Sofia_Pro_Bold',
                    //   fontStyle: 'normal',
                    //   lineHeight: 22,
                    //   letterSpacing: 0.25,
                    color: '#050709',
                  }}>
                  Add
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ marginBottom: 100 }}></View>
      </ScrollView>

      {/* ...........................equipment modal.................. */}

      <Modal
        animationType="slide"
        transparent={true}
        propagateSwipe={true}
        // swipeToScroll={true}
        visible={EquipModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setEquipModalVisible(!EquipModalVisible);
        }}>
        <TouchableOpacity
          onPress={() => setEquipModalVisible(false)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback style={styles.equipmodalView}>
              <View style={styles.equipmodalView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: '95%',
                    alignSelf: 'center',
                    height: 40,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../Images/Ac.png')}
                      style={{ width: 20, height: 20 }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                        marginLeft: 8,
                      }}>
                      {EquipmentObject.description}
                    </Text>
                  </View>

                  <Icon
                    name="close-circle-outline"
                    size={25}
                    style={{ marginTop: 2 }}
                    color={'#000'}
                    onPress={() => setEquipModalVisible(false)}
                  />
                </View>
                {/* <View
                  style={{
                    borderBottomColor: '#d3d3d3',
                    borderBottomWidth: 3,
                    marginTop: 5,
                    width: '95%',
                    alignSelf: 'center',
                  }}
                /> */}

                <View style={{ flex: 1 }}>
                  <ScrollView nestedScrollEnabled={true}>
                    <TouchableWithoutFeedback>
                      <View>
                        <View
                          style={{
                            marginTop: 10,
                            paddingHorizontal: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <View>
                              <Text style={{ fontFamily: 'Sofia_Pro_Bold' }}>
                                End of Warrenty :
                              </Text>
                            </View>
                            <View
                              style={{
                                borderRadius: 2,
                                borderColor: 'black',
                                flexDirection: 'row',
                                marginTop: 8,
                                height: 30,
                                width: 110,
                                borderWidth: 1,
                                borderColor: 'black',
                                backgroundColor: '#e9ebec',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <View>
                                <Icon
                                  name="calendar"
                                  size={15}
                                  style={{ marginTop: 2 }}
                                  color={'#000'}
                                />
                              </View>
                              <View>
                                <Text style={{ marginLeft: 3 }}>Jan 12 2022</Text>
                              </View>
                            </View>
                          </View>

                          <View>
                            <View>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  textAlign: 'center',
                                }}>
                                Installed :
                              </Text>
                            </View>
                            <View
                              style={{
                                borderWidth: 1,
                                borderColor: 'black',
                                borderRadius: 2,
                                // borderColor: 'black',
                                flexDirection: 'row',
                                marginTop: 8,
                                height: 30,
                                width: 110,
                                backgroundColor: '#e9ebec',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <View>
                                <Icon
                                  name="calendar"
                                  size={15}
                                  style={{ marginTop: 2 }}
                                  color={'#000'}
                                />
                              </View>
                              <View>
                                <Text style={{ marginLeft: 3 }}>Jan 12 2022</Text>
                              </View>
                            </View>
                          </View>

                          <View>
                            <View>
                              <Text
                                style={{
                                  marginLeft: 8,
                                  fontFamily: 'Sofia_Pro_Bold',
                                }}>
                                Last Serviced :
                              </Text>
                            </View>
                            <View
                              style={{
                                borderWidth: 1,
                                marginLeft: 3,
                                borderRadius: 2,
                                borderColor: 'black',
                                flexDirection: 'row',
                                marginTop: 8,
                                height: 30,
                                width: 110,
                                backgroundColor: '#e9ebec',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <View>
                                <Icon
                                  name="calendar"
                                  size={15}
                                  style={{ marginTop: 2 }}
                                  color={'#000'}
                                />
                              </View>
                              <View>
                                <Text style={{ marginLeft: 3 }}>Jan 12 2022</Text>
                              </View>
                            </View>
                          </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text style={{ fontFamily: 'Sofia_Pro_Bold' }}>
                              PART NUMBER
                            </Text>
                          </View>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: 'black',
                              marginTop: 2,
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                textAlign: 'center',
                                marginTop: 3.5,
                              }}>
                              XHGUANGA121312
                            </Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              EQUIPMENT TYPE
                            </Text>
                          </View>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: 'black',
                              marginTop: 2,
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                textAlign: 'center',
                                marginTop: 3.5,
                              }}>
                              Cold Side Part
                            </Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              MANUFACTURER
                            </Text>
                          </View>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: 'black',
                              marginTop: 2,
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                textAlign: 'center',
                                marginTop: 3.5,
                              }}>
                              Avvon
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            marginTop: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 15,
                          }}>
                          <View>
                            <View style={{ marginTop: 10 }}>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                }}>
                                YEAR OF CREATION
                              </Text>
                            </View>
                            <View
                              style={{
                                borderWidth: 1,
                                borderColor: 'black',
                                backgroundColor: '#e9ebec',
                                height: 30,
                                width: (windowWidth * 40) / 100,
                                marginTop: 5,
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  textAlign: 'center',
                                  marginTop: 4,
                                }}>
                                2022
                              </Text>
                            </View>
                          </View>

                          <View>
                            <View style={{ marginTop: 10 }}>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                }}>
                                EQUIPMENT CONDITION
                              </Text>
                            </View>
                            <View
                              style={{
                                marginLeft: 10,
                                borderWidth: 1,
                                borderColor: 'black',
                                backgroundColor: '#e9ebec',
                                height: 30,
                                width: (windowWidth * 40) / 100,
                                marginTop: 5,
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  textAlign: 'center',
                                  marginTop: 4,
                                }}>
                                FAIR
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            paddingHorizontal: 15,
                            marginTop: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <View>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                }}>
                                SAFETY ISSUE
                              </Text>
                            </View>
                            <View
                              style={{
                                marginLeft: 7,
                                height: 20,
                                width: 20,
                                borderWidth: 1,
                                borderColor: 'black',
                                backgroundColor: '#e9ebec',
                              }}>
                              {/* <Text style={{ fontFamily: 'Sofia_Pro_Bold', letterSpacing: 0.5 }}>SAFETY ISSUE</Text> */}
                            </View>
                          </View>

                          <View style={{ flexDirection: 'row' }}>
                            <View>
                              <Text
                                style={{
                                  marginRight: 10,
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                }}>
                                MAINTENANCE ISSUE
                              </Text>
                            </View>
                            <View>
                              <View
                                style={{
                                  height: 20,
                                  width: 20,
                                  borderWidth: 1,
                                  borderColor: 'black',
                                  backgroundColor: '#e9ebec',
                                }}>
                                <Icon
                                  name="checkmark"
                                  size={15}
                                  style={{ marginTop: 2, marginLeft: 2 }}
                                  color={'#000'}
                                />
                              </View>
                              {/* <Text style={{ fontFamily: 'Sofia_Pro_Bold', letterSpacing: 0.5 }}>SAFETY ISSUE</Text> */}
                            </View>
                          </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              EQUIPMENT MODAL
                            </Text>
                          </View>
                          <View
                            style={{
                              marginTop: 2,
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                              borderWidth: 1,
                              borderColor: 'black',
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                marginTop: 3.5,
                              }}>
                              YUHS45586
                            </Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              SERIAL NUMBER
                            </Text>
                          </View>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: 'black',
                              marginTop: 2,
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                marginTop: 3.5,
                              }}>
                              1234545586
                            </Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              ALTERNATE EQUIPMENT
                            </Text>
                          </View>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: 'black',
                              marginTop: 2,
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                marginTop: 3.5,
                              }}>
                              No Alternate Equipment Written
                            </Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              EQUIPMENT LOCATION
                            </Text>
                          </View>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: 'black',
                              marginTop: 2,
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                marginTop: 3.5,
                              }}>
                              NEW YORK CITY
                            </Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              PRIMARY SERVICE REPRESENTATIVE
                            </Text>
                          </View>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: 'black',
                              marginTop: 2,
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                textAlign: 'center',
                                marginTop: 3.5,
                              }}>
                              No Representative Selected
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            marginTop: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                          }}>
                          <View>
                            <View style={{ marginTop: 10 }}>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  alignSelf: 'center',
                                }}>
                                QUANTITY
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              <View
                                style={{
                                  backgroundColor: '#e9ebec',
                                  height: 40,
                                  width: (windowWidth * 25) / 100,
                                  marginTop: 5,
                                  borderWidth: 1,
                                  borderColor: 'black',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: 'Sofia_Pro_Bold',
                                    letterSpacing: 0.5,
                                    textAlign: 'center',
                                    marginTop: 4,
                                  }}>
                                  1
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View>
                            <View style={{ marginTop: 10, marginLeft: 25 }}>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  alignSelf: 'center',
                                }}>
                                COST
                              </Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                              <View
                                style={{
                                  marginLeft: 10,
                                  backgroundColor: '#e9ebec',
                                  height: 40,
                                  width: (windowWidth * 25) / 100,
                                  marginTop: 5,
                                  borderWidth: 1,
                                  borderColor: 'black',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: 'Sofia_Pro_Bold',
                                    letterSpacing: 0.5,
                                    textAlign: 'center',
                                    marginTop: 4,
                                  }}>
                                  1
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View>
                            <View style={{ marginTop: 10, marginLeft: 35 }}>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  alignSelf: 'center',
                                }}>
                                PAID
                              </Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                              <View
                                style={{
                                  marginLeft: 10,
                                  backgroundColor: '#e9ebec',
                                  height: 40,
                                  width: (windowWidth * 25) / 100,
                                  marginTop: 5,
                                  borderWidth: 1,
                                  borderColor: 'black',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: 'Sofia_Pro_Bold',
                                    letterSpacing: 0.5,
                                    textAlign: 'center',
                                    marginTop: 4,
                                  }}>
                                  1
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              INSTRUCTIONS
                            </Text>
                          </View>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: 'black',
                              marginTop: 2,
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                marginTop: 3.5,
                              }}>
                              No Additional Instructions
                            </Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              BUILDING NAME
                            </Text>
                          </View>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: 'black',
                              marginTop: 2,
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                marginTop: 3.5,
                              }}>
                              Prestige Building
                            </Text>
                          </View>
                        </View>

                        <TouchableOpacity>
                          <View style={{ marginTop: 15 }}>
                            <View style={{ paddingHorizontal: 15 }}>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                }}>
                                AREA SERVICED
                              </Text>
                            </View>
                            <View
                              style={{
                                borderWidth: 1,
                                borderColor: 'black',
                                marginTop: 2,
                                paddingHorizontal: 15,
                                height: 30,
                                width: (windowWidth * 90) / 100,
                                backgroundColor: '#e9ebec',
                                alignSelf: 'center',
                                borderRadius: 3,
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontFamily: 'Sofia_Pro_Bold',
                                  marginTop: 3.5,
                                }}>
                                Scaler
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>

                        <View style={{ marginTop: 15 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              RATING/CAP/KWS
                            </Text>
                          </View>
                          <View
                            style={{
                              marginTop: 2,
                              borderWidth: 1,
                              borderColor: 'black',
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                marginTop: 3.5,
                              }}>
                              4/51
                            </Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              BARCODE
                            </Text>
                          </View>
                          <View
                            style={{
                              marginTop: 2,
                              borderWidth: 1,
                              borderColor: 'black',
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                marginTop: 3.5,
                              }}>
                              543001
                            </Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              EQUIPMENT ID
                            </Text>
                          </View>
                          <View
                            style={{
                              marginTop: 2,
                              borderWidth: 1,
                              borderColor: 'black',
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                marginTop: 3.5,
                              }}>
                              EA23534
                            </Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              REFRIDGERANT TYPE
                            </Text>
                          </View>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: 'black',
                              marginTop: 2,
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                marginTop: 3.5,
                              }}>
                              GA394
                            </Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                                textAlign: 'center',
                              }}>
                              REFRIDGERANT QUANTITY
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              paddingHorizontal: 15,
                              justifyContent: 'space-between',
                            }}>
                            <View
                              style={{
                                backgroundColor: '#e9ebec',
                                height: 40,
                                width: (windowWidth * 40) / 100,
                                marginTop: 5,
                                borderWidth: 1,
                                borderColor: 'black',
                              }}>
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  textAlign: 'center',
                                  marginTop: 4,
                                }}>
                                0.00
                              </Text>
                            </View>

                            <View
                              style={{
                                backgroundColor: '#e9ebec',
                                height: 40,
                                width: (windowWidth * 40) / 100,
                                marginTop: 5,
                                borderWidth: 1,
                                borderColor: 'black',
                              }}>
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  textAlign: 'center',
                                  marginTop: 4,
                                }}>
                                1
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            marginTop: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 15,
                          }}>
                          <View>
                            <View style={{ marginTop: 10 }}>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  textAlign: 'center',
                                }}>
                                USER 1
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#e9ebec',
                                height: 30,
                                width: (windowWidth * 40) / 100,
                                marginTop: 5,
                                borderWidth: 1,
                                borderColor: 'black',
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  marginTop: 3,
                                  marginLeft: 4,
                                }}>
                                John
                              </Text>
                            </View>
                          </View>

                          <View>
                            <View style={{ marginTop: 10 }}>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  textAlign: 'center',
                                }}>
                                USER 2
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#e9ebec',
                                height: 30,
                                width: (windowWidth * 40) / 100,
                                marginTop: 5,
                                borderWidth: 1,
                                borderColor: 'black',
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  marginTop: 3,
                                  marginLeft: 4,
                                }}>
                                Kyle
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                              }}>
                              CUSTOMER EQUIPMENT NUMBER
                            </Text>
                          </View>
                          <View
                            style={{
                              marginTop: 2,
                              paddingHorizontal: 15,
                              height: 30,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: '#e9ebec',
                              alignSelf: 'center',
                              borderRadius: 3,
                              borderWidth: 1,
                              borderColor: 'black',
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Sofia_Pro_Bold',
                                marginTop: 3.5,
                              }}>
                              R309
                            </Text>
                          </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                          <Text
                            style={{
                              textDecorationLine: 'underline',
                              textAlign: 'center',
                              fontSize: 17,
                              color: 'blue',
                            }}>
                            Click Here to Equipment Attachments
                          </Text>
                        </View>

                        <View style={{ marginBottom: 50 }}></View>
                      </View>
                    </TouchableWithoutFeedback>
                  </ScrollView>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate('WoEQuipLibraryScreen')}>
                  <View
                    style={{
                      height: 40,
                      backgroundColor: 'black',
                      marginBottom: 15,
                      alignSelf: 'center',
                      width: (windowWidth * 65) / 100,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Sofia_Pro_Bold',
                        fontSize: 16,
                        textAlign: 'center',
                        letterSpacing: 0.5,
                        marginTop: 7,
                      }}>
                      CLICK HERE FOR FILE ROOM
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ..............Contact modal........................................ */}
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

export default AccountInfoScreen;
