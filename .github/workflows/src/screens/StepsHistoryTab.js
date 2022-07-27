import React, {useState, useEffect, useCallback} from 'react';
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
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import CollapsibleView from '@eliav2/react-native-collapsible-view';
import moment from 'moment';
import ConnectionCheck from '../components/ConnectionCheck';
import {saveUserInLocalStorageAsync} from '../services/LocalStorage';
import {getUserFromStorageAsync} from '../services/LocalStorage';
import {getworkordersasync, workorderDetailsasync} from '../services/Services';
import {reportLogBoxError} from 'react-native/Libraries/LogBox/Data/LogBoxData';
import ToggleSwitch from '../components/ToggleSwitch';
import HeaderOptionModal from '../components/HeaderOptionModal';
import Header from '../components/Header';

// import Toast from 'react-native-simple-toast';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StepsHistoryTab = ({navigation, route}) => {
  console.log('route==>', route);
  let network = ConnectionCheck();

  const [companynote2, setcompanynote2] = React.useState(false);
  const [companynote1, setcompanynote1] = React.useState(false);
  const [companynote3, setcompanynote3] = React.useState(false);
  // const [companynote1, setcompanynote1] = React.useState(false);
  const [jobstatusValue, setjobstatusValue] = React.useState('');
  const [incExpanded, setpincExpanded] = React.useState(true);
  // const [workorders, setworkorders] = useState([]);
  // const [cmpvExpanded, setcmpvExpanded] = React.useState(true);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [sitevisitExpanded, setsitevisitExpanded] = React.useState(true);
  const [communicationsExpanded, setcommunicationsExpanded] =
    React.useState(true);
  const [prevjobExpanded, setprevjobExpanded] = React.useState(true);
  const [cmpvExpanded, setcmpvExpanded] = React.useState(true);
  const [contactModalVisible, setcontactModalVisible] = React.useState(false);
  // const [EquipModalVisible, setEquipModalVisible] = React.useState(false);

  const [EquipModalVisible, setEquipModalVisible] = React.useState(false);
  const [EquipmentObject, setEquipmentObject] = React.useState({});
  const [workorders, setworkorders] = useState([]);
  const [equipmentItem, setEquipmentItem] = useState({});
  const [toggle, setToggle] = useState(false);
  const [networkModal, setNetworkModal] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [headerModal, setHeaderModal] = React.useState(false);

  const collapseFun = item => {
    switch (item) {
      case 'SiteVisits':
        setsitevisitExpanded(!sitevisitExpanded);
        break;
      case 'Communications':
        setcommunicationsExpanded(!communicationsExpanded);
        break;
      case 'PreviousJob':
        setprevjobExpanded(!prevjobExpanded);
        break;
      case 'company note2':
        setcompanynote2(!companynote2);
        break;
      case 'company note3':
        setcompanynote3(!companynote3);
        break;
      case 'company note':
        setcompanynote1(!companynote1);
        break;
      default:
        break;
    }
    // console.log(item);
  };

  const getStatusAsync = async () => {
    let user = await getUserFromStorageAsync('Jobstatus' + route.params.sono);
    console.log(user, 'user status');
    if (user === undefined) setjobstatusValue('In Progress');
    else {
      if (user.sono === route.params.sono) {
        setjobstatusValue(user.jobStatus);
      } else {
        // console.log(status, 'getStatusAsync');
        setjobstatusValue('In Progress');
      }
    }
    // console.log(status, 'getStatusAsync');
  };

  const selectStatusFun = status => {
    console.log(status, 'selectStatusFun');
    switch (status) {
      case 'In Progress':
        setjobstatusValue('Complete');
        saveUserInLocalStorageAsync(
          {jobStatus: 'Complete', sono: route.params.sono},
          'Jobstatus' + route.params.sono,
        );
        break;
      case 'Complete':
        setjobstatusValue('To Do');
        saveUserInLocalStorageAsync(
          {jobStatus: 'To Do', sono: route.params.sono},
          'Jobstatus' + route.params.sono,
        );
        break;
      case 'To Do':
        setjobstatusValue('In Progress');
        saveUserInLocalStorageAsync(
          {jobStatus: 'In Progress', sono: route.params.sono},
          'Jobstatus' + route.params.sono,
        );
        break;
      default:
        setjobstatusValue('In Progress');
        saveUserInLocalStorageAsync(
          {jobStatus: 'In Progress', sono: route.params.sono},
          'Jobstatus' + route.params.sono,
        );
        break;
    }
  };

  const shareFun = async () => {
    try {
      const res = await Share.share({message: 'Service order sharing option'});
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
      // setWDData(res.data[0]);
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
    getStatusAsync();
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        searchIcon={false}
        title={'History'}
        onPressStatusFun={() => selectStatusFun(jobstatusValue)}
        disabled={true}
        isItIcon={true}
        Iconname="arrow-back-outline"
        iconOnPress={() => navigation.goBack()}
        taglineText="Job #0000234. Michel chang"
        openModal={() => {
          setModalVisible(!modalVisible);
        }}
        showsideText={true}
        rightIconname="ellipsis-vertical"
        onPressFun={() => showEditFun()}
        onPressMenu={() => setHeaderModal(!headerModal)}
        jobstatusValue={jobstatusValue}
        sono={route.params.sono}
        customerName={route.params.customerName}
      />

      <ScrollView>
        <View style={{marginTop: 10}} />
        <View>
          <TouchableOpacity
            style={styles.incompletedIconText}
            onPress={() => collapseFun('SiteVisits')}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name={
                    sitevisitExpanded === true
                      ? 'chevron-down-outline'
                      : 'chevron-forward-outline'
                  }
                  size={25}
                  color={'#000'}
                  style={{marginTop: 1}}
                />
                <Text
                  style={{
                    marginTop: 1,
                    paddingLeft: 3,
                    color: '#050709',
                    fontSize: 18,
                    fontWeight: 'bold',
                    letterSpacing: 0.2,
                  }}>
                  Site Visits (3)
                </Text>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={{fontSize: 13}}>LAST VISIT : 12/12/2021</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{marginLeft: 34}}>
            <Text
              style={{
                marginTop: 3,
                fontSize: 12,
                letterSpacing: 0.5,
              }}>
              VISITATION BY TECH
            </Text>
          </View>
          {sitevisitExpanded === true && (
            <View>
              <View style={{flex: 0}}>
                <View style={{width: '95%', alignSelf: 'center'}}>
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
                      <View style={{flexDirection: 'row', marginTop: 4}}>
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
                            // fontSize: 15,
                            marginTop: 2,
                            //   fontFamily: 'Sofia_Pro_Regular',
                            //   fontStyle: 'normal',
                            //   lineHeight: 18,
                            //   letterSpacing: 0.2,
                            // color: '#050709',
                          }}>
                          Visited Oct 24,2020 at 8:15 Am
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {companynote1 === true && (
                    <View>
                      <View style={{paddingHorizontal: 18}}>
                        <Text
                          style={{
                            fontSize: 16,
                            //   fontFamily: 'Sofia_Pro_Regular',
                            //   fontStyle: 'normal',
                            //   lineHeight: 22,
                            letterSpacing: 0.5,
                            color: 'black',
                          }}>
                          Another solution is to add a height property to the
                          parent View container. This sometimes works well when
                          calculating the height against the screen height
                        </Text>
                      </View>
                    </View>
                  )}
                </View>

                <View style={{width: '95%', alignSelf: 'center'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      alignSelf: 'center',
                    }}
                    onPress={() => collapseFun('company note2')}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 4}}>
                        <Icon
                          name={
                            companynote2 === true
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
                          George
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            // fontSize: 15,
                            marginTop: 2,
                            //   fontFamily: 'Sofia_Pro_Regular',
                            //   fontStyle: 'normal',
                            //   lineHeight: 18,
                            //   letterSpacing: 0.2,
                            // color: '#050709',
                          }}>
                          Visited Oct 24,2020 at 8:15 Am
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {companynote2 === true && (
                    <View>
                      <View style={{paddingHorizontal: 18}}>
                        <Text
                          style={{
                            fontSize: 16,
                            //   fontFamily: 'Sofia_Pro_Regular',
                            //   fontStyle: 'normal',
                            //   lineHeight: 22,
                            letterSpacing: 0.5,
                            color: 'black',
                          }}>
                          Another solution is to add a height property to the
                          parent View container. This sometimes works well when
                          calculating the height against the screen height
                        </Text>
                      </View>
                    </View>
                  )}
                </View>

                <View style={{width: '95%', alignSelf: 'center'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      alignSelf: 'center',
                    }}
                    onPress={() => collapseFun('company note3')}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 4}}>
                        <Icon
                          name={
                            companynote3 === true
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
                          James
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            // fontSize: 15,
                            marginTop: 2,
                            //   fontFamily: 'Sofia_Pro_Regular',
                            //   fontStyle: 'normal',
                            //   lineHeight: 18,
                            //   letterSpacing: 0.2,
                            // color: '#050709',
                          }}>
                          Visited Oct 24,2020 at 8:15 Am
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {companynote3 === true && (
                    <View>
                      <View style={{paddingHorizontal: 18}}>
                        <Text
                          style={{
                            fontSize: 16,
                            //   fontFamily: 'Sofia_Pro_Regular',
                            //   fontStyle: 'normal',
                            //   lineHeight: 22,
                            letterSpacing: 0.5,
                            color: 'black',
                          }}>
                          Another solution is to add a height property to the
                          parent View container. This sometimes works well when
                          calculating the height against the screen height
                        </Text>
                      </View>
                    </View>
                  )}
                </View>

                <View style={{marginBottom: 10}}></View>
              </View>
            </View>
          )}
        </View>

        {/* ..................................CommunicationsView................................................... */}

        <View style={{marginTop: 10}} />
        <View>
          <TouchableOpacity
            style={styles.incompletedIconText}
            onPress={() => collapseFun('Communications')}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name={
                    communicationsExpanded === true
                      ? 'chevron-down-outline'
                      : 'chevron-forward-outline'
                  }
                  size={25}
                  color={'#000'}
                  style={{marginTop: 1}}
                />
                <Text
                  style={{
                    marginTop: 1,
                    paddingLeft: 3,
                    color: '#050709',
                    fontSize: 18,
                    fontWeight: 'bold',
                    letterSpacing: 0.5,
                  }}>
                  Communications
                </Text>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={{fontSize: 13}}>LAST CONTACT : 12/12/2021</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{marginLeft: 34}}>
            <Text
              style={{
                marginTop: 3,
                fontSize: 12,
                letterSpacing: 0.5,
              }}>
              LATEST COMMUNICATION WITH CLIENT
            </Text>
          </View>

          {communicationsExpanded === true && (
            <View>
              <View style={{flex: 0}}>
                <View style={{justifyContent: 'center'}}>
                  <View
                    style={{
                      padding: 15,
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{height: 120, width: 175, borderWidth: 1}}>
                      <View style={{padding: 10}}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'black',
                          }}>
                          Phone Call
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            // fontFamily: 'Sofia_Pro_Bold',
                            // fontStyle: 'normal',
                            // lineHeight: 16,
                            // marginTop: 2,
                            letterSpacing: 1.5,
                            // color: '#050709',
                          }}>
                          Last Call Recieved
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          // marginTop: 10,
                          paddingHorizontal: 10,
                          alignItems: 'center',
                        }}>
                        <View>
                          <Icon name="call" size={16} color={'#3A3D41'} />
                        </View>
                        <View style={{marginLeft: 5}}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: 'Sofia_Pro_Regular',
                              fontStyle: 'normal',
                              fontWeight: '400',
                              // lineHeight: 22,
                              letterSpacing: 0.25,
                              color: '#050709',
                            }}>
                            Thu. 5:19 PM
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Home', {
                            screen: 'Communications',
                            params: {
                              screen: 'CallScreen',
                              params: {title: 'Communications'},
                            },
                          });
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              // marginTop: 3,
                              paddingHorizontal: 10,
                              fontSize: 15,
                              fontWeight: 'bold',
                              // fontFamily: 'Sofia_Pro_Bold',
                              // fontStyle: 'normal',
                              // lineHeight: 22,
                              letterSpacing: 0.25,
                              color: '#050709',
                            }}>
                            See Calls
                          </Text>

                          <Icon
                            name="arrow-forward"
                            size={25}
                            color={'#3A3D41'}
                            style={{marginRight: 10}}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{height: 120, width: 175, borderWidth: 1}}>
                      <View style={{padding: 10}}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'black',
                          }}>
                          Messages
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            // fontFamily: 'Sofia_Pro_Bold',
                            // fontStyle: 'normal',
                            lineHeight: 16,
                            marginTop: 6,
                            letterSpacing: 1.5,
                            // color: '#050709',
                          }}>
                          Last Message
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          // marginTop: 10,
                          paddingHorizontal: 10,
                          alignItems: 'center',
                        }}>
                        {/* <View>
                  <Icon name="call" size={16} color={'#3A3D41'} />
                </View> */}
                        <View style={{}}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: 'Sofia_Pro_Regular',
                              fontStyle: 'normal',
                              fontWeight: '400',
                              lineHeight: 22,
                              letterSpacing: 0.25,
                              color: '#050709',
                            }}>
                            The issue is still here
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Home', {
                            screen: 'Communications',
                            params: {
                              screen: 'MessagesScreen',
                              params: {title: 'Communications'},
                            },
                          })
                        }>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              // marginTop: 3,
                              paddingHorizontal: 10,
                              fontSize: 15,
                              fontWeight: 'bold',
                              // fontFamily: 'Sofia_Pro_Bold',
                              // fontStyle: 'normal',
                              // lineHeight: 22,
                              letterSpacing: 0.25,
                              color: '#050709',
                            }}>
                            See Messages
                          </Text>
                          <Icon
                            name="arrow-forward"
                            size={25}
                            color={'#3A3D41'}
                            style={{marginRight: 10}}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* ...................................PreviousJobsView................................................. */}

        <View style={{marginTop: 10}} />

        <TouchableOpacity
          style={styles.incompletedIconText}
          onPress={() => collapseFun('PreviousJob')}>
          <Icon
            name={
              prevjobExpanded === true
                ? 'chevron-down-outline'
                : 'chevron-forward-outline'
            }
            size={25}
            color={'#000'}
          />
          <Text style={styles.incompletedTextUi}>Previous Jobs (2)</Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
        <View style={{marginLeft: 30, marginTop: 3}}>
          <Text>HISTORY OF PREVIOUS WORK ORDERS</Text>
        </View>
        {prevjobExpanded === true && (
          <View>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={getworkorders}
                />
              }>
              <View style={{marginTop: 5}} />
              <View>
                <View>
                  {workorders.map(item => (
                    <View style={{flex: 0}}>
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
                                  color: 'black',
                                }}>
                                Work Order# {item.sono}
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
                              <View style={{flexDirection: 'row'}}>
                                <Icon
                                  name="share-social"
                                  size={20}
                                  color={'#46494d'}
                                  style={{marginTop: 6, marginRight: 15}}
                                  onPress={() => shareFun()}
                                />
                                <TouchableOpacity
                                  onPress={() => detailsScreen(item)}>
                                  <Icon
                                    name="arrow-forward-outline"
                                    size={20}
                                    color={'#46494d'}
                                    style={{marginTop: 5}}
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
                              <View style={{flexDirection: 'row'}}>
                                <Icon
                                  name="location"
                                  size={25}
                                  color={'grey'}
                                  style={{marginTop: 3}}
                                  onPress={() => getLocationFun()}
                                />
                                <TouchableOpacity
                                  onPress={() => setcontactModalVisible(true)}>
                                  <Icon
                                    name="person"
                                    size={25}
                                    color={'grey'}
                                    style={{marginTop: 3, marginLeft: 5}}
                                  />
                                </TouchableOpacity>
                              </View>
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate(
                                    'WorkorderDetailsScreen',
                                    {
                                      screen: 'WorkOrders',
                                      params: {
                                        sono: item.sono,
                                        custNo: item.custNo,
                                        customerName: item.customerName,
                                      },
                                    },
                                  )
                                }
                                style={{
                                  backgroundColor: '#6A9DFF',
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
                                  navigation.navigate(
                                    'WorkorderDetailsScreen',
                                    {
                                      screen: 'Steps',
                                      params: {
                                        sono: item.sono,
                                        custNo: item.custNo,
                                        customerName: item.customerName,
                                      },
                                    },
                                  )
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

              <View style={{marginTop: 10}} />
              <View>
                <View>
                  {workorders.map(item => (
                    <View style={{flex: 0}}>
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
                              // borderRadius: 3,
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
                                  color: 'black',
                                  fontFamily: 'Sofia_Pro_Bold',
                                }}>
                                Work Order # {item.sono}
                              </Text>
                              <Text
                                style={{
                                  marginTop: 9,
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                }}>
                                {item.sechDate}
                              </Text>
                              <View style={{flexDirection: 'row'}}>
                                <Icon
                                  name="share-social"
                                  size={20}
                                  color={'#46494d'}
                                  style={{marginTop: 5, marginRight: 15}}
                                  onPress={() => shareFun()}
                                />
                                <TouchableOpacity
                                  onPress={() => detailsScreen(item)}>
                                  <Icon
                                    name="arrow-forward-outline"
                                    size={20}
                                    color={'#46494d'}
                                    style={{marginTop: 5}}
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
                              <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity>
                                  <Icon
                                    name="location"
                                    size={25}
                                    color={'grey'}
                                    style={{marginTop: 3}}
                                  />
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => setcontactModalVisible(true)}>
                                  <Icon
                                    name="person"
                                    size={25}
                                    color={'grey'}
                                    style={{marginTop: 3, marginLeft: 5}}
                                  />
                                </TouchableOpacity>
                              </View>
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate(
                                    'WorkorderDetailsScreen',
                                    {
                                      screen: 'WorkOrders',
                                      params: {
                                        sono: item.sono,
                                        custNo: item.custNo,
                                        customerName: item.customerName,
                                      },
                                    },
                                  )
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
                                  navigation.navigate(
                                    'WorkorderDetailsScreen',
                                    {
                                      screen: 'Steps',
                                      params: {
                                        sono: item.sono,
                                        custNo: item.custNo,
                                        customerName: item.customerName,
                                      },
                                    },
                                  )
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
            </ScrollView>
          </View>
        )}

        {/* .........................................Complete View....................... */}

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
                    <View>
                      <Text style={styles.contactNameTextUi}>
                        Micheal Chang
                      </Text>
                    </View>
                    <Icon
                      name="chevron-forward"
                      size={22}
                      // style={{marginTop: 2}}
                      color={'#000'}
                      onPress={() =>
                        navigation.navigate('CustomerProfileScreen')
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
                      // onPress={getLocationFun}
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

        {/* //////////////////////////////equipmodal start////////////////////////////////////////// */}

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
                        style={{width: 20, height: 20}}
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
                      style={{marginTop: 2}}
                      color={'#000'}
                      onPress={() => setEquipModalVisible(false)}
                    />
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#d3d3d3',
                      borderBottomWidth: 3,
                      marginTop: 5,
                      width: '95%',
                      alignSelf: 'center',
                    }}
                  />

                  <View style={{flex: 1}}>
                    <ScrollView nestedScrollEnabled={true}>
                      <TouchableOpacity>
                        <View
                          style={{
                            marginTop: 10,
                            paddingHorizontal: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <View>
                              <Text style={{fontFamily: 'Sofia_Pro_Bold'}}>
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
                                  style={{marginTop: 2}}
                                  color={'#000'}
                                />
                              </View>
                              <View>
                                <Text style={{marginLeft: 3}}>Jan 12 2022</Text>
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
                                  style={{marginTop: 2}}
                                  color={'#000'}
                                />
                              </View>
                              <View>
                                <Text style={{marginLeft: 3}}>Jan 12 2022</Text>
                              </View>
                            </View>
                          </View>

                          <View>
                            <View>
                              <Text style={{marginLeft: 8}}>
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
                                  style={{marginTop: 2}}
                                  color={'#000'}
                                />
                              </View>
                              <View>
                                <Text style={{marginLeft: 3}}>Jan 12 2022</Text>
                              </View>
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: 10}}>
                          <View style={{paddingHorizontal: 15}}>
                            <Text style={{fontFamily: 'Sofia_Pro_Bold'}}>
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

                        <View style={{marginTop: 10}}>
                          <View style={{paddingHorizontal: 15}}>
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

                        <View style={{marginTop: 10}}>
                          <View style={{paddingHorizontal: 15}}>
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
                            <View style={{marginTop: 10}}>
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
                            <View style={{marginTop: 10}}>
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
                          <View style={{flexDirection: 'row'}}>
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

                          <View style={{flexDirection: 'row'}}>
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
                                  style={{marginTop: 2, marginLeft: 2}}
                                  color={'#000'}
                                />
                              </View>
                              {/* <Text style={{ fontFamily: 'Sofia_Pro_Bold', letterSpacing: 0.5 }}>SAFETY ISSUE</Text> */}
                            </View>
                          </View>
                        </View>

                        <View style={{marginTop: 15}}>
                          <View style={{paddingHorizontal: 15}}>
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

                        <View style={{marginTop: 15}}>
                          <View style={{paddingHorizontal: 15}}>
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

                        <View style={{marginTop: 15}}>
                          <View style={{paddingHorizontal: 15}}>
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

                        <View style={{marginTop: 15}}>
                          <View style={{paddingHorizontal: 15}}>
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

                        <View style={{marginTop: 15}}>
                          <View style={{paddingHorizontal: 15}}>
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
                            <View style={{marginTop: 10}}>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  alignSelf: 'center',
                                }}>
                                QUANTITY
                              </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
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
                            <View style={{marginTop: 10, marginLeft: 25}}>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  alignSelf: 'center',
                                }}>
                                COST
                              </Text>
                            </View>

                            <View style={{flexDirection: 'row'}}>
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
                            <View style={{marginTop: 10, marginLeft: 35}}>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
                                  alignSelf: 'center',
                                }}>
                                PAID
                              </Text>
                            </View>

                            <View style={{flexDirection: 'row'}}>
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

                        <View style={{marginTop: 15}}>
                          <View style={{paddingHorizontal: 15}}>
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

                        <View style={{marginTop: 15}}>
                          <View style={{paddingHorizontal: 15}}>
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
                          <View style={{marginTop: 15}}>
                            <View style={{paddingHorizontal: 15}}>
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

                        <View style={{marginTop: 15}}>
                          <View style={{paddingHorizontal: 15}}>
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

                        <View style={{marginTop: 15}}>
                          <View style={{paddingHorizontal: 15}}>
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

                        <View style={{marginTop: 15}}>
                          <View style={{paddingHorizontal: 15}}>
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

                        <View style={{marginTop: 15}}>
                          <View style={{paddingHorizontal: 15}}>
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

                        <View style={{marginTop: 15}}>
                          <View style={{paddingHorizontal: 15}}>
                            <Text
                              style={{
                                fontFamily: 'Sofia_Pro_Bold',
                                letterSpacing: 0.5,
                                textAlign: 'center',
                              }}>
                              REFRIDGERANT TYPE
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
                                width: (windowWidth * 30) / 100,
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
                            <View style={{marginTop: 3}}>
                              <View
                                style={{
                                  marginTop: 3,

                                  height: 19,
                                  backgroundColor: '#d3d3d3',
                                  width: 30,
                                }}>
                                <Icon
                                  name="arrow-up"
                                  size={15}
                                  style={{marginLeft: 8}}
                                  color={'#000'}
                                  // onPress={() => setEquipModalVisible(false)}
                                />
                              </View>

                              <View
                                style={{
                                  marginTop: 1,
                                  height: 19,
                                  backgroundColor: '#d3d3d3',
                                  width: 30,
                                }}>
                                <Icon
                                  name="arrow-down"
                                  size={15}
                                  style={{marginLeft: 8}}
                                  color={'#000'}
                                  // onPress={() => setEquipModalVisible(false)}
                                />
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: '#e9ebec',
                                height: 40,
                                width: (windowWidth * 34) / 100,
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
                            <View style={{marginTop: 3}}>
                              <View
                                style={{
                                  marginTop: 3,
                                  height: 19,
                                  backgroundColor: '#d3d3d3',
                                  width: 30,
                                }}>
                                <Icon
                                  name="arrow-up"
                                  size={15}
                                  style={{marginLeft: 8}}
                                  color={'#000'}
                                  // onPress={() => setEquipModalVisible(false)}
                                />
                              </View>

                              <View
                                style={{
                                  marginTop: 1,
                                  height: 19,
                                  backgroundColor: '#d3d3d3',
                                  width: 30,
                                }}>
                                <Icon
                                  name="arrow-down"
                                  size={15}
                                  style={{marginLeft: 8}}
                                  color={'#000'}
                                  // onPress={() => setEquipModalVisible(false)}
                                />
                              </View>
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
                            <View style={{marginTop: 10}}>
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
                            <View style={{marginTop: 10}}>
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

                        <View style={{marginTop: 15}}>
                          <View style={{paddingHorizontal: 15}}>
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

                        <View style={{marginTop: 10}}>
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

                        <View style={{marginBottom: 50}}></View>
                      </TouchableOpacity>
                    </ScrollView>
                  </View>

                  <TouchableOpacity>
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={networkModal}
          onRequestClose={() => {
            setNetworkModal(false);
          }}>
          <TouchableOpacity
            // onPress={() => setNetworkModal(false)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <TouchableWithoutFeedback
              style={{
                width: windowWidth,
                height: (windowHeight * 40) / 100,
              }}>
              <View
                style={{
                  width: (windowWidth * 90) / 100,
                  height: (windowHeight * 40) / 100,
                  justifyContent: 'center',
                  // alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Connection Error</Text>
                  <View style={{marginVertical: 10}}>
                    <Text style={styles.NetmodalText}>
                      Please check your network connectivity and try again.
                    </Text>
                  </View>
                  <TouchableOpacity
                    // onPress={getworkorders}
                    style={{
                      backgroundColor: '#000',
                      height: 40,
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 10,
                      borderRadius: 4,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 14,
                      }}>
                      Try Again
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
        <View style={{marginBottom: 100}}></View>

        {/* <Margin bottom={12} /> */}
      </ScrollView>
      <HeaderOptionModal
        Visible={headerModal}
        navigation={navigation}
        closeModal={() => setHeaderModal(false)}
      />
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
    fontSize: 18,
    fontWeight: 'bold',
    // fontFamily: 'Sofia_Pro_Regular',
    paddingLeft: 8,
    lineHeight: 18,
    letterSpacing: 0.2,
    // marginTop:5
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

export default StepsHistoryTab;
