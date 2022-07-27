import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  // Switch,
  Modal,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import HeaderOptionModal from '../components/HeaderOptionModal';
import ToggleSwitch from '../components/ToggleSwitch';
import {
  getUserFromStorageAsync,
  saveUserInLocalStorageAsync,
} from '../services/LocalStorage';
import image from '../theme/Images';
import string from '../theme/AppStrings';
import {
  addEquipasync,
  addNotesasync,
  equipmentTypeAsync,
  getPartNumberAsync,
  manufacturDataAsync,
  workorderDetailsasync,
} from '../services/Services';
import ConnectionCheck from '../components/ConnectionCheck';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TechDocsTab = ({ navigation, route }) => {
  console.log(navigation, route, 'FIleRoam');
 
  let network = ConnectionCheck();

  const [loading, setLoading] = React.useState(true);
  const [WDData, setWDData] = useState({});
  const [incExpanded, setpincExpanded] = React.useState(true);
  const [searchExpanded, setSearchExpanded] = React.useState(false);
  const [jobstatusValue, setjobstatusValue] = useState('');
  const [cmpvExpanded, setcmpvExpanded] = React.useState(true);
  const [EquipModalVisible, setEquipModalVisible] = React.useState(false);
  const [toggle, setToggle] = useState(true);
  const [networkModal, setNetworkModal] = useState(false);
  const [headerModal, setHeaderModal] = React.useState(false);
  const [serNo, setSerNo] = React.useState('187438575AF');
  const [value, setValue] = React.useState(false);
  const [activeSwitch, setActiveSwitch] = React.useState(2);
  const [isEnabled, setIsEnabled] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [masterDataSource, setMasterDataSource] = useState();

  const collapseFun = item => {
    switch (item) {
      case 'Incompleted':
        setpincExpanded(!incExpanded);
        break;
      case 'Completed':
        setcmpvExpanded(!cmpvExpanded);
        break;
      case 'Search':
        setSearchExpanded(!searchExpanded);
        break;
      default:
        break;
    }
  };

  const getStatusAsync = async () => {
    let user = await getUserFromStorageAsync('Jobstatus' + route.params.sono);
    if (user === undefined) setjobstatusValue('In Progress');
    else {
      if (user.sono === route.params.sono) {
        setjobstatusValue(user.jobStatus);
      } else {
        setjobstatusValue('In Progress');
      }
    }
  };

  const selectStatusFun = status => {
    switch (status) {
      case 'In Progress':
        setjobstatusValue('Complete');
        saveUserInLocalStorageAsync(
          {
            jobStatus: 'Complete',
            sono: route.params.sono,
          },
          'Jobstatus' + route.params.sono,
        );
        break;
      case 'Complete':
        setjobstatusValue('To Do');
        saveUserInLocalStorageAsync(
          { jobStatus: 'To Do', sono: route.params.sono },
          'Jobstatus' + route.params.sono,
        );
        break;
      case 'To Do':
        setjobstatusValue('In Progress');
        saveUserInLocalStorageAsync(
          { jobStatus: 'In Progress', sono: route.params.sono },
          'Jobstatus' + route.params.sono,
        );
        break;
      default:
        setjobstatusValue('In Progress');
        saveUserInLocalStorageAsync(
          { jobStatus: 'In Progress', sono: route.params.sono },
          'Jobstatus' + route.params.sono,
        );
        break;
    }
  };


  const workorderDetailsFun = async () => {
    if (network === true) {
      try {
        let user = await getUserFromStorageAsync('EmpID');
        const { sono, custNo } = route.params;
        const res = await workorderDetailsasync(user, sono, custNo);
        await saveUserInLocalStorageAsync(res.data[0], 'WODetails');
        setWDData(res.data[0]);
        setLoading(false);
        setFilteredDataSource(res.data[0].woEquipments);
        setMasterDataSource(res.data[0].woEquipments);
      } catch (err) {
        setLoading(false);
      }
    } else {
      let WOdetails = await getUserFromStorageAsync('WODetails');
      setWDData(WOdetails);
      setLoading(false);
    }
  };
  useEffect(() => {
    workorderDetailsFun();
    getStatusAsync();
  }, []);

  const TechDocsMedia = ({item}) => {
    console.log('TechDocsMedia',item);
    console.log(WDData)
    item.cname=route.params.customerName;
    item.sono=route.params.sono;
    console.log(item,'item in TechDocsMedia')
    // navigation.navigate('DocsLibrary');
    navigation.navigate("ViewEqptInfoScreen", { EqObj: item })
  };



  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          // height: 0.5,
          // width: '100%',
          // backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  const ItemView = ({ item }) => {
    console.log(WDData)
    item.cname = route.params.customerName;
    item.sono = route.params.sono;
    // const passingObj={EqObj: item ,Cname:route.params.customerName,sono:route.params.sono}
    return (
      <View>

        <View style={styles.eqmpmnt}>
          <View style={styles.eqmpntCntr}>
            <TouchableOpacity onPress={() => TechDocsMedia({item})}>
              <View style={styles.eqmptScndry}>
                <View>
                  <Text style={styles.acUnit}>
                    {item.description}
                  </Text>
                  <View style={styles.row}>
                    <Text style={styles.acUnit}>
                      {string.screens.TechDocsTab.srNo}
                    </Text>
                    <Text style={styles.fontsrNo}> {item.serialNo}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.acUnit}>
                      {string.screens.TechDocsTab.modal}
                    </Text>
                    <Text style={styles.fontsrNo}> {item.modelNo}</Text>
                  </View>
                </View>
                <View style={styles.toogleVw}>
                  <ToggleSwitch
                    isOn={toggle}
                    onColor="#26A688"
                    offColor="#E9EBEC"
                    size="large"
                    onToggle={() => setToggle}
                    backgroundActive="#000"
                    icon={
                      toggle === true ? (
                        <Icon name="checkmark-circle-outline" size={33} />
                      ) : (
                        <Icon name="time-outline" size={33} />
                      )
                    }
                    text={
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 11,
                          fontWeight: 'bold',
                          letterSpacing: 0.5,
                          marginBottom: 3,
                          marginLeft: 6
                          // position: 'absolute',
                        }}>
                        ACTIVE
                      </Text>
                    }
                  />
                </View>
                <View style={styles.rightArw}>
                  <Image source={image.rightarrowsngl} />
                </View>
              </View>
              {/* <View style={styles.vwLn}></View> */}
              <View style={styles.row}>
                <TouchableOpacity onPress={() => TechDocsMedia({item})}>
                  <Image source={image.one} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => TechDocsMedia({item})}>
                  <Image source={image.two} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => TechDocsMedia({item})}>
                  <Image style={styles.img} source={image.three} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => TechDocsMedia({item})}>
                  <Image source={image.four} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => TechDocsMedia({item})}>
                  <Image style={styles.img} source={image.five} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => TechDocsMedia({item})}>
                  <Image source={image.six} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => TechDocsMedia({item})}>
                  <Image style={styles.img} source={image.seven} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => TechDocsMedia({item})}>
                  <Image source={image.eight} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => TechDocsMedia({item})}>
                  <Image style={styles.img} source={image.nine} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => TechDocsMedia({item})}>
                  <Image source={image.ten} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>

      
    );


  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header
        searchIcon={false}
        title={'Technician Documents'}
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
        <View style={{ marginTop: 10 }} />

        <View>
          <TouchableOpacity
            onPress={() => {
              collapseFun('Search');
            }}>
            <View style={styles.main}>
              <Image style={styles.searchImg} source={image.search} />
              {searchExpanded === true ? (
                <Text style={{ fontSize: 17, fontWeight: '700', letterSpacing: 0.5 }}>{string.screens.TechDocsTab.closesearch}</Text>
              ) : (
                <Text style={{ fontSize: 17, fontWeight: '700', letterSpacing: 0.5 }}>{string.screens.TechDocsTab.opensearch}</Text>
              )}
              {searchExpanded === true ? (
                <Icon
                  name='chevron-up'
                  style={styles.arrow}
                />
              ) : (
                <Image style={styles.arrow} source={image.downarrow} />
              )}
            </View>
          </TouchableOpacity>
          {searchExpanded === true ? (
            <View>
              <View style={styles.expndMain}>
                <Image style={styles.searchImg} source={image.search} />
                <TextInput
                  placeholder={string.screens.TechDocsTab.inputmanfcture}
                  style={styles.inputStyl}
                />
              </View>
              <View style={[styles.expndMain, styles.topHt]}>
                <Image style={styles.searchImg} source={image.search} />
                <TextInput
                  placeholder={string.screens.TechDocsTab.searchmdl}
                  style={styles.inputStyl}
                />
              </View>
            </View>
          ) : null}
        </View>




        <View>
          <TouchableOpacity
            style={styles.incompletedIconText}
            onPress={() => collapseFun('Incompleted')}>
            {incExpanded === true ? (
              <Image source={image.downarrow} />
            ) : (
              <Image source={image.rightarrowsngl} />
            )}
            <Text style={styles.incompletedTextUi}>
              {string.screens.TechDocsTab.currentJobs}
            </Text>
          </TouchableOpacity>
          {incExpanded === true && (
            <View>

              <FlatList
                // horizontal
                // showsHorizontalScrollIndicator={false}
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
              />



            </View>
          )}
        </View>

        <View>
          <TouchableOpacity
            style={styles.incompletedIconTextcstr}
            onPress={() => collapseFun('Completed')}>
            {cmpvExpanded === true ? (
              <Image source={image.downarrow} />
            ) : (
              <Image source={image.rightarrowsngl} />
            )}
            <Text style={styles.incompletedTextUi}>
              {string.screens.TechDocsTab.cstrEqpt}
            </Text>
          </TouchableOpacity>
          {cmpvExpanded === true && (
            <View>
              <View style={styles.eqmpmnt}>
                <View style={styles.eqmpntCntr}>
                  <TouchableOpacity>
                    <View style={styles.eqmptScndry}>
                      <View>
                        <Text style={styles.acUnit}>
                          {string.screens.TechDocsTab.acunit}
                        </Text>
                        <View style={styles.row}>
                          <Text style={styles.acUnit}>
                            {string.screens.TechDocsTab.srNo}
                          </Text>
                          <Text style={styles.fontsrNo}> {serNo}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.acUnit}>
                            {string.screens.TechDocsTab.modal}
                          </Text>
                          <Text style={styles.fontsrNo}> {serNo}</Text>
                        </View>
                      </View>
                      <View style={styles.toogleVw}>
                        <ToggleSwitch
                          isOn={toggle}
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          size="large"
                          onToggle={() => setToggle}
                          icon={
                            toggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                          text={
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 13,
                                fontWeight: 'bold',
                                letterSpacing: 0.5,
                                marginBottom: 3,
                                marginLeft: 6
                                // position: 'absolute',
                              }}>
                              ACTIVE
                            </Text>
                          }
                        />
                      </View>
                      <View style={styles.rightArw}>
                        <Image source={image.rightarrowsngl} />
                      </View>
                    </View>
                    {/* <View style={styles.vwLn}></View> */}
                    <View style={styles.row}>
                      <TouchableOpacity>
                        <Image source={image.one} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.two} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.img} source={image.three} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.four} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.img} source={image.five} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.six} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.img} source={image.seven} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.eight} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.img} source={image.nine} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.ten} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.eqmpmnt}>
                <View style={styles.eqmpntCntr}>
                  <TouchableOpacity>
                    <View style={styles.eqmptScndry}>
                      <View>
                        <Text style={styles.acUnit}>
                          {string.screens.TechDocsTab.acunit}
                        </Text>
                        <View style={styles.row}>
                          <Text style={styles.acUnit}>
                            {string.screens.TechDocsTab.srNo}
                          </Text>
                          <Text style={styles.fontsrNo}> {serNo}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.acUnit}>
                            {string.screens.TechDocsTab.modal}
                          </Text>
                          <Text style={styles.fontsrNo}> {serNo}</Text>
                        </View>
                      </View>
                      <View style={styles.toogleVw}>
                        <ToggleSwitch
                          isOn={toggle}
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          size="large"
                          onToggle={() => setToggle}
                          icon={
                            toggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                          text={
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 13,
                                fontWeight: 'bold',
                                letterSpacing: 0.5,
                                marginBottom: 3,
                                marginLeft: 6
                                // position: 'absolute',
                              }}>
                              ACTIVE
                            </Text>
                          }
                        />
                      </View>
                      <View style={styles.rightArw}>
                        <Image source={image.rightarrowsngl} />
                      </View>
                    </View>
                    {/* <View style={styles.vwLn}></View> */}
                    <View style={styles.row}>
                      <TouchableOpacity>
                        <Image source={image.one} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.two} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.img} source={image.three} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.four} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.img} source={image.five} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.six} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.img} source={image.seven} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.eight} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.img} source={image.nine} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.ten} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.eqmpmnt}>
                <View style={styles.eqmpntCntr}>
                  <TouchableOpacity>
                    <View style={styles.eqmptScndry}>
                      <View>
                        <Text style={styles.acUnit}>
                          {string.screens.TechDocsTab.acunit}
                        </Text>
                        <View style={styles.row}>
                          <Text style={styles.acUnit}>
                            {string.screens.TechDocsTab.srNo}
                          </Text>
                          <Text style={styles.fontsrNo}> {serNo}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.acUnit}>
                            {string.screens.TechDocsTab.modal}
                          </Text>
                          <Text style={styles.fontsrNo}> {serNo}</Text>
                        </View>
                      </View>
                      <View style={styles.toogleVw}>
                        <ToggleSwitch
                          isOn={toggle}
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          size="large"
                          onToggle={() => setToggle}
                          icon={
                            toggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                          text={
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 13,
                                fontWeight: 'bold',
                                letterSpacing: 0.5,
                                marginBottom: 3,
                                marginLeft: 6
                                // position: 'absolute',
                              }}>
                              ACTIVE
                            </Text>
                          }
                        />
                      </View>
                      <View style={styles.rightArw}>
                        <Image source={image.rightarrowsngl} />
                      </View>
                    </View>
                    {/* <View style={styles.vwLn}></View> */}
                    <View style={styles.row}>
                      <TouchableOpacity>
                        <Image source={image.one} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.two} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.img} source={image.three} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.four} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.img} source={image.five} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.six} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.img} source={image.seven} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.eight} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image style={styles.img} source={image.nine} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image source={image.ten} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>



        <View style={{ marginTop: 10 }} />
        <HeaderOptionModal
          Visible={headerModal}
          navigation={navigation}
          closeModal={() => setHeaderModal(false)}
        />

        {/* //////////////////////////////equipmodal start////////////////////////////////////////// */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={EquipModalVisible}
          onRequestClose={() => {
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
                        Air Condition Unit
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
                  <View
                    style={{
                      borderBottomColor: 'grey',
                      borderBottomWidth: 1,
                      marginTop: 5,
                      width: '100%',
                    }}
                  />
                  <View style={{ width: '80%', alignSelf: 'center' }}>
                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{ fontSize: 12, fontWeight: '400' }}>
                        Installed :
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#000',
                          fontWeight: '400',
                        }}>
                        Jan 28,2022 at 12:15 am
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{ fontSize: 12, fontWeight: '400' }}>
                        Last Serviced :
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: '#000',
                        }}>
                        Jan 28,2022 at 12:15 am
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{ fontSize: 12, fontWeight: '400' }}>
                        End of Warrenty :
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: '#000',
                        }}>
                        Jan 28,2022 at 12:15 am
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={{
                          marginTop: 10,
                          fontWeight: '700',
                          fontSize: 10,
                          color: '#000',
                        }}>
                        EQUIPMENT NOTES
                      </Text>
                    </View>

                    <View>
                      <Text style={{ fontSize: 14 }}>
                        Ac unit for the southend of the building.
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={{
                          marginTop: 10,
                          fontWeight: '700',
                          fontSize: 10,
                          color: '#000',
                        }}>
                        INSTALLATION
                      </Text>
                    </View>

                    <View>
                      <Text style={{ fontSize: 14 }}>
                        Authorised insurance team
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={{
                          marginTop: 10,
                          fontWeight: '700',
                          fontSize: 10,
                          color: '#000',
                        }}>
                        EQUIPMENT TYPE & EQUIPMENT LOCATION
                      </Text>
                    </View>

                    <View>
                      <Text style={{ fontSize: 14 }}>
                        Air Conditioner Station 64
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={{
                          marginTop: 10,
                          fontWeight: '700',
                          fontSize: 10,
                          color: '#000',
                        }}>
                        MANUFACTURER
                      </Text>
                    </View>

                    <View>
                      <Text style={{ fontSize: 14 }}>
                        American Standard Air Conditioner
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={{
                          marginTop: 10,
                          fontWeight: '700',
                          fontSize: 10,
                          color: '#000',
                        }}>
                        MODEL
                      </Text>
                    </View>

                    <View>
                      <Text style={{ fontSize: 14 }}>
                        American Standard Air Conditioner
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                      }}>
                      <View>
                        <Text
                          style={{
                            // marginLeft: 40,
                            fontSize: 10,
                            fontWeight: '700',
                            color: '#000',
                          }}>
                          Sku
                        </Text>
                        <Text style={{ fontSize: 14 }}>984758347583475</Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: '700',
                            color: '#000',
                          }}>
                          Serial No
                        </Text>
                        <Text style={{ fontSize: 14 }}>9847583475875</Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          fontWeight: '700',
                          textAlign: 'center',
                          fontSize: 12,
                          color: '#000',
                          letterSpacing: 1.5,
                        }}>
                        Steps to Complete Unit
                      </Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Icon name="camera" size={35} color="#000" />
                          <View style={{ marginLeft: 8 }}>
                            <Text
                              style={{
                                color: '#000',
                                fontSize: 16,
                                fontWeight: '700',
                              }}>
                              Take Photos
                            </Text>
                            <Text
                              style={{
                                color: '#585A5B',
                                fontSize: 12,
                                fontWeight: '400',
                              }}>
                              Requires action
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
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
              style={{ width: windowWidth, height: (windowHeight * 40) / 100 }}>
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
                  <View style={{ marginVertical: 10 }}>
                    <Text style={styles.NetmodalText}>
                      Please check your network connectivity and try again.
                    </Text>
                  </View>
                  <TouchableOpacity
                    //   onPress={getworkorders}
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
        <View style={{ marginBottom: 100 }}></View>
      </ScrollView>
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
  incompletedIconTextcstr: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
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
    fontWeight: 'bold',
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
    marginTop: 10,
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
  main: {
    height: 45,
    marginHorizontal: 15,
    backgroundColor: '#EFF0F1',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
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
  arrow: {
    marginLeft: 'auto',
    marginRight: 15,
  },
  expndMain: {
    height: 45,
    marginHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF0F1',
  },
  inputStyl: {
    fontSize: 17,
    height: 45,
    fontWeight: 'bold',
    width: '100%',


  },
  searchImg: {
    marginHorizontal: 15,
  },
  topHt: {
    marginVertical: 10,
  },
  eqmpmnt: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eqmpntCntr: {
    paddingHorizontal: 15,
    height: 123,
    marginTop: 10,
    width: '95%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
  },
  eqmptScndry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  acUnit: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  fontsrNo: {
    marginTop: 3,
    fontSize: 15,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    marginTop: 3
  },
  toogleVw: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginHorizontal: 5,
  },
  rightArw: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  vwLn: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 1,
  },
  img: {
    marginHorizontal: 3,
  },
});
export default TechDocsTab;
