import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  FlatList
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
// import CheckBox from '@react-native-community/checkbox';
import BottomSheet from 'react-native-simple-bottom-sheet';
import ToggleSwitch from '../components/ToggleSwitch';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  addEquipasync,
  addNotesasync,
  equipmentTypeAsync,
  getPartNumberAsync,
  manufacturDataAsync,
  workorderDetailsasync,
} from '../services/Services';
import {
  getUserFromStorageAsync,
  saveUserInLocalStorageAsync,
} from '../services/LocalStorage';
import moment from 'moment';
import ConnectionCheck from '../components/ConnectionCheck';
import { useLinkProps } from '@react-navigation/native';
import Header from '../components/Header';
import HeaderOptionModal from '../components/HeaderOptionModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LatestWorkDetails = ({ navigation, route }) => {
  let network = ConnectionCheck();
  const [IndexNo, setIndexNo] = React.useState('');
  const [Discription, setDiscription] = React.useState('');
  const [Title, setTitle] = React.useState('');
  const [Partdropdown, setPartdropdown] = React.useState(false);
  const [EquipTypedropdown, setEquipTypedropdown] = React.useState(false);
  const [ManfactureDropdown, setManfactureDropdown] = React.useState(false);
  const [incExpanded, setpincExpanded] = React.useState(false);
  const [jobstatusValue, setjobstatusValue] = useState('');
  const [inc2Expanded, setpinc2Expanded] = React.useState(false);
  const [notesModalVisible, setnotesModalVisible] = useState(false);
  const [notesViewExpanded, setnotesViewExpanded] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [woEquipModal, setwoEquipModal] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [eqType, setEqType] = useState(false);
  const [Mnfg, setMnfg] = useState(false);
  const [EquipmentObject, setEquipmentObject] = React.useState({});
  // const [EqObj, setEqObj] = React.useState({});
  const [isSelected, setSelection] = useState(false);
  const [value, setValue] = useState("Select Type");
  const [manvalue, setManValue] = useState("Select Manufacturer");
  const [partNumvalue, setPartNumValue] = useState("Select Part Number");



  const [portBol, setportBol] = useState(false);
  const [eqTypeArr, setEqTypeArr] = useState([]);
  const [PartsArr, setPartsArr] = useState([]);
  const [eqmntObj, setEqmntObj] = useState({});
  const [mnfgObj, setMnfgObj] = useState({});
  const [portObj, setPortObj] = useState({});
  const [manfgArr, setManfgArr] = useState([]);
  const [WDData, setWDData] = useState({});
  const panelRef = useRef(null);
  const [toggle, setToggle] = useState(true);
  const [headerModal, setHeaderModal] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleLS, setDatePickerVisibilityLS] = useState(false);
  const [isDatePickerVisibleEW, setDatePickerVisibilityEW] = useState(false);
  const [searchequipHeight, setsearchequipHeight] = React.useState(false);
  const [instDate, setInstDate] = React.useState('');
  const [LSDate, setLSDate] = React.useState('');
  const [EWDate, setEWDate] = React.useState('');
  const [Eqcomments, setEqcomments] = React.useState('');
  const [Eqlocation, setEqlocation] = React.useState('');
  const [ModalNo, setModalNo] = React.useState('');
  const [PortNo, setPortNo] = React.useState('');
  const [SerialNo, setSerialNo] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [masterDataSource, setMasterDataSource] = useState();
  const [search, setSearch] = useState('');
  const [lastMsgs, setLastMsg] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePickerLS = () => {
    setDatePickerVisibilityLS(true);
  };

  const hideDatePickerLS = () => {
    setDatePickerVisibilityLS(false);
  };

  const showDatePickerEW = () => {
    setDatePickerVisibilityEW(true);
  };

  const hideDatePickerEW = () => {
    setDatePickerVisibilityEW(false);
  };

  const handleConfirm = date => {
    let FDate = moment(date).format('MM/DD/YYYY');
    setInstDate(FDate);
    hideDatePicker();
  };
  const handleConfirmLastServd = date => {
    let FDate = moment(date).format('MM/DD/YYYY');
    setLSDate(FDate);
    hideDatePickerLS();
  };
  const handleConfirmEndofWarnty = date => {
    let FDate = moment(date).format('MM/DD/YYYY');
    setEWDate(FDate);
    hideDatePickerEW();
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

  
    const checkLastMessage = async () => {
      let lastMsg = await getUserFromStorageAsync('message');
      if (lastMsg != undefined) {
        setLastMsg(lastMsg);
      } else setLastMsg(undefined);
    };
   useEffect(() => {
      checkLastMessage();
    }, []);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.description}</Text>
      </View>
    );
  };
  const renderItemMan = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
      </View>
    );
  };
  const renderItemPartNum = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.partNbr}</Text>
      </View>
    );
  };



  const selectStatusFun = status => {
    switch (status) {
      case 'In Progress':
        setjobstatusValue('Complete');
        saveUserInLocalStorageAsync(
          { jobStatus: 'Complete', sono: route.params.sono },
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
    item.cname=route.params.customerName;
    item.sono=route.params.sono;
    // const passingObj={EqObj: item ,Cname:route.params.customerName,sono:route.params.sono}
    return (

      <View
        style={{
          marginTop: 15,
          flexDirection: 'row',
          alignSelf: 'center',
          marginLeft: 10
        }}>
        <TouchableOpacity  onPress={() => {
                navigation.navigate("ViewEqptInfoScreen", {EqObj:item})
              }}
          style={{
            height: 74,
            width: 230,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: 'black',
            justifyContent: 'center',
            paddingHorizontal: 10,
            backgroundColor: '#FFFFFF',
          }}>
          <TouchableOpacity  onPress={() => {
                navigation.navigate("ViewEqptInfoScreen", { EqObj: item })
              }}>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                fontFamily: 'Sofia_Pro_Bold',
                fontStyle: 'normal',
                lineHeight: 24,
                letterSpacing: 0.5,
                color: '#050709',
                // numberOfLines:'2'
              }}>
              {item.description}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 4,

              }}>
              <ToggleSwitch
                isOn={toggle}
                onColor="#26A688"
                offColor="#E9EBEC"
                size="medium"
                onToggle={() => navigation.navigate("ViewEqptInfoScreen", { EqObj: item })}
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
                      fontSize: 12,
                      fontWeight: 'bold',
                      // position: 'absolute',
                    }}>
                      ACTIVE
                  </Text>
                }
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ViewEqptInfoScreen", { EqObj: item })
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
        </TouchableOpacity>
      </View>
    );
  };
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.description.toUpperCase()
            ? item.description.toUpperCase().toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const equipmentTypeFun = async () => {

    try {
      let user = await getUserFromStorageAsync('EmpID');
      const res = await equipmentTypeAsync(user);
      setEqTypeArr(res.payLoad.entities[0].items);
    } catch (err) {
    }
  };

  const getPartsNoFun = async () => {
    try {
      let user = await getUserFromStorageAsync('EmpID');
      const res = await getPartNumberAsync(user);
      setPartsArr(res.payLoad.entities[0].items[0].partsList);
    } catch (err) {
    }
  };

  const getManufacturDataFun = async () => {
    try {
      let user = await getUserFromStorageAsync('EmpID');
      const res = await manufacturDataAsync(user);
      setManfgArr(res.payLoad.entities[0].items);
    } catch (err) {
    }
  };
  useLayoutEffect(() => {
    getStatusAsync();
    workorderDetailsFun();
    equipmentTypeFun();
    getManufacturDataFun();
    getPartsNoFun();
  }, []);

  const collapseFun = (Fitem, Findex) => {
    WDData.notes.map((item, index) => {
      if (index === Findex) {
        switch (Fitem) {
          case 'Incompleted':
            setIndexNo(Findex);
            setpincExpanded(!incExpanded);
            break;
          case 'NotesView':
            setIndexNo(Findex);
            setnotesViewExpanded(!notesViewExpanded);
            break;
          case 'Completed':
            setcmpvExpanded(!cmpvExpanded);
            break;
          default:
            break;
        }
      }
    });
  };

  const addEquipFun = async () => {
    const aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 20);
    let extndYear = moment(aYearFromNow).format('MM/DD/YYYY');
    let user = await getUserFromStorageAsync('EmpID');
    let PresDate = new Date();
    PresDate = moment(PresDate).format('MM/DD/YYYY');
    let CreatDate = moment(PresDate).format('YYYY-MM-DD hh:mm:ss.SSS');
    let scheduledDate = moment(WDData.woDetails.woDetailsInfo.dateEnter).format(
      'MM/DD/YYYY hh:mm:ss A',
    );

    let Error = '';

    if (!Eqcomments) {
      Error = 'Equipment Comments ';
    } else if (!Eqlocation) {
      Error = 'Equipment location ';
    } else if (!ModalNo) {
      Error = 'ModalNo ';
    } else if (!SerialNo) {
      Error = 'ModalNo ';
    }

    if (Error === '') {
      let Input = {
        logDetails: {
          items: [
            {
              transactionId: WDData.notes.length + 1, //Static
              transactionType: 'S2000_Equip', //Static
              transactionMode: 'Add', //'Add'
              wono: WDData.woDetails.woDetailsInfo.wrkOrdNbr, //Dynamic value passing
              woType: 'wo', //Static
              scheduledLine: 0, //Static
              scheduledDate: scheduledDate, //Dynamic value passing
              userID: user, //Dynamic value passing
              transData: `0|${route.params.custNo}|0|10355|${SerialNo}|${eqmntObj.eqpTypeId}|${ModalNo}|${mnfgObj.mfgNbr}|0|${instDate}|${Eqlocation}|||${LSDate}|${EWDate}|${user}|false|false|0|0|${Eqcomments}|0|0|${extndYear}|${extndYear}|0|1|0|I|${WDData.woDetails.woDetailsInfo.wrkOrdNbr}|${mnfgObj.name}|${PortNo}|${eqmntObj.description}|testing|||0|||0|0|0`,
              isUpdate: false, //Static
              logRemarks: '', //Static
              createdDate: CreatDate, //geDate
              clientRowId: 0, //Static
              serverRowId: 0, //Static
              serverRowType: '', //Static
              deviceId: '1B56F699-CF37-319A-19F1-4C7EBCB97C39',
              clientType: 'String', //Static
              clientDBType: 'String', //Static
              hashCode: 'String', //Static
              jobNo: 'String', //Static
              triState: 0, //Static
              combineFormNames: 'String', //Static
              custumCombineFormName: 'String', //Static
              syncTryCount: 0, //Static
              dateTimeTicks: 0, //Static
              requestOption: 0, //Static
            },
          ],
        },
      };
      try {
        const res = await addEquipasync(user, Input);
        if (res.responseStatus.errorCode === '201') {
          workorderDetailsFun();
          setEqcomments('');
          setEqlocation('');
          setModalNo('');
          setPortNo('');
          setSerialNo('');
          setIndexNo('');
          setLSDate('');
          setEWDate('');
          setEqmntObj({});
          setMnfgObj({});
          setModalVisible(false);
        }
      } catch (err) {
      }
    } else {
      setModalVisible(true);
      alert(Error + 'must not be empty!');
      return;
    }
  };

  const addNoteFun = async () => {
    let user = await getUserFromStorageAsync('EmpID');
    let Error = '';
    if (!Title) {
      Error = 'Title Should not be empty';
    }

    if (!Discription) {
      Error = 'Discription Should not be empty';
    }
    if (!Title && !Discription) {
      Error = 'Title and Discription Should not be empty';
    }
    if (Error === '') {
      let PresDate = new Date();
      PresDate = moment(PresDate).format('MM/DD/YYYY');
      let CreatDate = moment(PresDate).format('YYYY-MM-DD hh:mm:ss.SSS');
      // let user = await getUserFromStorageAsync('EmpID');
      let scheduledDate = moment(
        WDData.woDetails.woDetailsInfo.dateEnter,
      ).format('MM/DD/YYYY hh:mm:ss A');

      let Input = {
        logDetails: {
          items: [
            {
              transactionId: WDData.notes.length + 1, //Static
              transactionType: 'S2000_Notes', //Static
              transactionMode: 'Add', //'Add'
              wono: WDData.woDetails.woDetailsInfo.wrkOrdNbr, //Dynamic value passing
              woType: 'wo', //Static
              scheduledLine: 0, //Static
              scheduledDate: scheduledDate, //Dynamic value passing
              userID: user, //Dynamic value passing
              transData: `${WDData.notes.length + 1}|3|${WDData.woDetails.woDetailsInfo.wrkOrdNbr
                }|0|0|${user}|${PresDate}|0|false|true|${Title}|${Discription}|I`,
              //     $"{NotesModel.NoteNbr}|{NotesModel.Type}|{NotesModel.TransNbr}|{NotesModel.TransNbr2}|{NotesModel.TransNbr3}|{NotesModel.EmployeeNbr}|{NotesModel.Date.ToString()}|{NotesModel.Format}|{NotesModel.QSysgen}|{NotesModel.QCustview}|{NotesModel.SubjectLine}|{NotesModel.Text}"
              // Note increment number|3|woNo|0|0|userId|getDate|0|false|true|subject|body|I
              isUpdate: false, //Static
              logRemarks: '', //Static
              createdDate: CreatDate, //geDate
              clientRowId: 0, //Static
              serverRowId: 0, //Static
              serverRowType: '', //Static
              deviceId: '1B56F699-CF37-319A-19F1-4C7EBCB97C39',
              clientType: 'String', //Static
              clientDBType: 'String', //Static
              hashCode: 'String', //Static
              jobNo: 'String', //Static
              triState: 0, //Static
              combineFormNames: 'String', //Static
              custumCombineFormName: 'String', //Static
              syncTryCount: 0, //Static
              dateTimeTicks: 0, //Static
              requestOption: 0, //Static
            },
          ],
        },
      };
      try {
        const res = await addNotesasync(user, Input);
        if (res.responseStatus.errorCode === '201') {
          workorderDetailsFun();
          setDiscription('');
          setTitle('');
          setnotesModalVisible(false);
        }
      } catch (err) {
      }
    } else {
      alert(Error);
      return;
    }
  };

  const communicationDetails = () => {
    navigation.navigate('Home', {
      screen: 'Communication',
      params: { screen: 'All', params: { title: 'Communications' } },
    });
  };

  
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header
        searchIcon={false}
        title={'Work Order'}
        // subtitle={showEdit === true ? 'Cancel' : 'Edit'}
        onPressStatusFun={() => selectStatusFun(jobstatusValue)}
        disabled={true}
        isItIcon={true}
        Iconname="arrow-back-outline"
        iconOnPress={() => navigation.goBack()}
        // taglineText={route.params.sono}
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
      {loading === false ? (
        <ScrollView>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#050709',
                  fontFamily: 'Sofia_Pro_Bold',
                }}>
                Details
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 11,
                    marginTop: 5,
                    color: 'grey',
                    fontFamily: 'Sofia_Pro',
                    textTransform: 'uppercase',
                  }}>
                  WORK ORDER TYPE :
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 4,
                    color: '#050709',
                    fontFamily: 'Sofia_Pro_Bold',
                    textTransform: 'uppercase',
                  }}>
                  {WDData.woDetails.woDetailsInfo.problemCodeDesc}
                </Text>
              </View>
            </View>

            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                paddingEnd: 10,
              }}>
              <Text
                style={{
                  fontSize: 11,
                  marginTop: 1,
                  fontFamily: 'Sofia_Pro',
                  color: '#585A5B',
                }}>
                REQUEST DATE :
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  // marginTop: 1,
                  fontFamily: 'Sofia_Pro_Bold',
                  // color: '#585A5B',
                  color: '#050709',
                  marginLeft: 2,
                }}>
                {moment(WDData.woDetails.woDetailsInfo.dateEnter).format(
                  'MM/DD/YYYY',
                )}
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                width: '90%',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}></View>
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  // fontWeight: '700',
                  color: '#050709',
                  fontFamily: 'Sofia_Pro_Bold',
                  fontStyle: 'normal',
                  lineHeight: 16,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                }}>
                Description
              </Text>
            </View>
            <View style={{ paddingHorizontal: 15, marginTop: 3 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Sofia_Pro_Regular',
                  fontWeight: '400',
                  color: '#585A5B',
                  lineHeight: 22,
                  letterSpacing: 0.25,
                }}>
                {WDData.woDetails.woDetailsInfo.comments}
                =
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              marginTop: 10,
              marginBottom: 1,
            }}>
            <View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Sofia_Pro_Bold',
                    fontStyle: 'normal',
                    lineHeight: 24,
                    letterSpacing: 0.2,
                    color: '#050709',
                  }}>
                  Equipment ({WDData.woEquipments.length})
                </Text>
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => setsearchequipHeight(!searchequipHeight)}>
                <Icon
                  name={searchequipHeight === true ? 'close' : 'search'}
                  size={20}
                  color={'#000'}
                  style={{ marginTop: 3 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                // width:windowWidth
              }}
            />
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {searchequipHeight === true && (
              <View>
                <View
                  style={{
                    marginTop: 15,
                    width: (windowWidth * 92) / 100,
                    borderWidth: 1,
                    borderRadius: 4,
                    // height: 44,
                    borderColor: 'grey',
                  }}>
                  <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                      name="search"
                      size={18}
                      color={'black'} />
                    <TextInput
                      style={{ marginLeft: 5, fontSize: 18, width: '100%', alignItems: 'center' }}
                      placeholder="Please Enter Equipments Here"
                      onChangeText={(text) => searchFilterFunction(text)}
                      value={search}
                      underlineColorAndroid="transparent"
                    ></TextInput>
                  </View>
                </View>
              </View>
            )}
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
              <View
                style={{
                  height: 35,
                  width: (windowWidth * 92) / 100,
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
                      fontSize: 14,
                      fontFamily: 'Sofia_Pro_Bold',
                      fontStyle: 'normal',
                      lineHeight: 22,
                      letterSpacing: 0.25,
                      color: '#050709',
                    }}>
                    Add
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View>
            <View
              style={{
                paddingHorizontal: 15,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Sofia_Pro_Bold',
                  fontStyle: 'normal',
                  lineHeight: 24,
                  letterSpacing: 0.2,
                  color: '#050709',
                }}>
                Communications
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Home', {
                    screen: 'Communications',
                    params: {
                      screen: 'AllCommunication',
                      params: { title: 'Communications' },
                    },
                  });
                }}>
                <View style={{}}>
                  <Icon
                    name="chevron-forward-outline"
                    size={23}
                    color={'#000'}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                marginTop: 3,
              }}
            />
            <View style={{ paddingHorizontal: 15 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Sofia_Pro_Regular',
                  fontStyle: 'normal',
                  lineHeight: 18,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  color: '#050709',
                }}>
          Latest Communication with the Client.
              </Text>
            </View>
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
                    marginTop: 10,
                    paddingHorizontal: 15,
                    fontFamily: 'Sofia_Pro_Bold',
                    fontStyle: 'normal',
                    lineHeight: 24,
                    letterSpacing: 0.5,
                    color: '#050709',
                  }}>
                  Phone Call
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    marginTop: 5,
                    paddingHorizontal: 15,
                    fontFamily: 'Sofia_Pro_Bold',
                    fontStyle: 'normal',
                    lineHeight: 16,
                    letterSpacing: 1.5,
                    color: '#050709',
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
                        lineHeight: 22,
                        letterSpacing: 0.25,
                        color: '#050709',
                      }}>
                      Thu. 5:19 PM
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={
                    () => {
                      navigation.navigate('Home', {
                        screen: 'Communications',
                        params: {
                          screen: 'CallScreen',
                          params: { title: 'Communications' },
                        },
                      });
                    }
                    // navigation.navigate('Communicationstack', {
                    //   screen: 'CallScreen',
                    // })
                  }>
                  <Text
                    style={{
                      marginTop: 10,
                      paddingHorizontal: 15,
                      fontSize: 14,
                      fontFamily: 'Sofia_Pro_Bold',
                      fontStyle: 'normal',
                      lineHeight: 22,
                      letterSpacing: 0.25,
                      color: '#050709',
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
                    marginTop: 10,
                    paddingHorizontal: 15,
                    fontFamily: 'Sofia_Pro_Bold',
                    fontStyle: 'normal',
                    lineHeight: 24,
                    letterSpacing: 0.5,
                    color: '#050709',
                  }}>
                  Messages
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    marginTop: 5,
                    paddingHorizontal: 15,
                    fontFamily: 'Sofia_Pro_Bold',
                    fontStyle: 'normal',
                    lineHeight: 16,
                    letterSpacing: 1.5,
                    color: '#050709',
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
                 {lastMsgs == undefined ? 'There is no last message':  lastMsgs}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Home', {
                      screen: 'Communications',
                      params: {
                        screen: 'MessagesScreen',
                        params: { title: 'Communications' },
                      },
                    })
                  }>
                  <Text
                    style={{
                      marginTop: 7,
                      paddingHorizontal: 15,
                      fontSize: 14,
                      fontFamily: 'Sofia_Pro_Bold',
                      fontStyle: 'normal',
                      lineHeight: 22,
                      letterSpacing: 0.25,
                      color: '#050709',
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
              justifyContent: 'space-between',
              // marginTop: 3,
              paddingHorizontal: 15,
              // marginVertical: 10,
              marginBottom: 1,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Sofia_Pro_Bold',
                fontStyle: 'normal',
                //  lineHeight: 20,
                letterSpacing: 0.2,
                color: '#050709',
              }}>
              Notes ({WDData.notes.length})
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('WorkOrderNotesScreen')}>
              <View>
                <Icon name="chevron-forward-outline" size={24} color={'#000'} />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 5,
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
            }}
          />
          <View style={{ paddingHorizontal: 15 }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Sofia_Pro_Regular',
                fontStyle: 'normal',
                lineHeight: 18,
                fontWeight: '400',
                letterSpacing: 0.2,
                color: '#050709',
              }}>
              Technician Notes About the Job
            </Text>
          </View>
          <TouchableOpacity onPress={() => setnotesModalVisible(true)}>
            <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
              <View
                style={{
                  height: 35,
                  width: (windowWidth * 92) / 100,
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
                      fontSize: 14,
                      fontFamily: 'Sofia_Pro_Bold',
                      fontStyle: 'normal',
                      lineHeight: 22,
                      letterSpacing: 0.25,
                      color: '#050709',
                    }}>
                    Add
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <ScrollView style={{ marginTop: 10 }}>
            {WDData.notes.map((item, index) => (
              <View
                style={{ width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignSelf: 'center',
                  }}
                  onPress={() => collapseFun('NotesView', index)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{ flexDirection: 'row', width: '70%' }}>
                      <Icon
                        name={
                          IndexNo === index && notesViewExpanded === true
                            ? 'chevron-down-outline'
                            : 'chevron-forward-outline'
                        }
                        size={24}
                        color={'#000'}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: 'Sofia_Pro_Bold',
                          fontStyle: 'normal',
                          lineHeight: 22,
                          letterSpacing: 0.25,
                          color: '#050709',
                        }}
                        numberOfLines={1}>
                        {item.subjectLine}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'Sofia_Pro_Regular',
                          fontStyle: 'normal',
                          lineHeight: 18,
                          letterSpacing: 0.2,
                          color: '#050709',
                        }}>
                        {moment(item.dateEnter).format('MM/DD/YYYY')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {IndexNo === index && notesViewExpanded === true && (
                  <View>
                    <View style={{ paddingHorizontal: 18 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: 'Sofia_Pro_Regular',
                          fontStyle: 'normal',
                          lineHeight: 22,
                          letterSpacing: 0.25,
                          color: '#585A5B',
                        }}>
                        {item.text}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>

         

          {/* ....................notes add modal.................... */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={notesModalVisible}
            onRequestClose={() => {
              setnotesModalVisible(!notesModalVisible);
            }}
            onShow={() => {
              panelRef.current.blur();
              panelRef.current.focus();
            }}>
            <View
              // behavior="padding"
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setnotesModalVisible(false)}
                style={{
                  flex: 1,
                  // height: 200,
                  // width: '100%',
                  // alignSelf: 'flex-end',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                <View style={styles.notescenteredView}>
                  <TouchableWithoutFeedback style={styles.NotesAddmodalView}>
                    <View style={styles.NotesAddmodalView}>
                      <View
                        style={{
                          justifyContent: 'space-around',
                          height: 240,
                          width: '95%',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: 40,
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                          }}>
                          <Icon
                            name="close-circle-outline"
                            size={25}
                            // style={{alignSelf: 'flex-end'}}
                            color={'#000'}
                            onPress={() => setnotesModalVisible(false)}
                          />
                        </View>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            justifyContent: 'space-around',
                            height: 200,
                            // backgroundColor: 'red',
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '700',
                              fontFamily: 'Sofia_Pro_Regular',
                              color: '#000',
                              letterSpacing: 0.5,
                              lineHeight: 22,
                              // marginTop: 15,
                              // marginBottom: 10,
                            }}>
                            New Note
                          </Text>
                          <TextInput
                            ref={panelRef}
                            placeholder=" Title"
                            autoFocus={true}
                            // onFocus={() => {
                            //   setTimeout(() => {
                            //     panelRef.current?.blur();
                            //     panelRef.current?.focus();
                            //   }, 100);
                            // }}
                            value={Title}
                            onChangeText={text => setTitle(text)}
                            style={{
                              fontSize: 18,
                              fontWeight: '800',
                              borderWidth: 0.6,
                              borderColor: 'grey',
                              height: 40,
                              // marginTop: 8,
                              width: (windowWidth * 90) / 100,
                              color: 'black',
                            }}
                          />
                          <TextInput
                            placeholder=" Discription"
                            value={Discription}
                            onChangeText={text => setDiscription(text)}
                            style={{
                              fontSize: 18,
                              fontWeight: '800',
                              borderWidth: 0.6,
                              borderColor: 'grey',
                              height: 40,
                              // marginTop: 5,
                              width: (windowWidth * 90) / 100,
                              color: 'black',
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => addNoteFun()}
                            style={{
                              alignItems: 'center',
                              height: 40,
                              width: (windowWidth * 90) / 100,
                              backgroundColor: 'black',
                              justifyContent: 'center',
                              borderRadius: 30 / 4,
                              // marginTop: 10,
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                textTransform: 'uppercase',
                                letterSpacing: 1.5,
                                fontWeight: '700',
                              }}>
                              Save
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>

          {/*.... ....................................Add Modal for eqipment............................ */}

          <Modal
            animationType="slide"
            avoidKeyboard
            transparent={true}
            propagateSwipe={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <ScrollView nestedScrollEnabled={true}>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
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
                          width: '90%',
                          marginTop:15,
                          // marginHorizontal:10,
                          alignSelf: 'center',
                          height: 30,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginLeft:10
                          }}>
                          <Image
                            source={require('../Images/Ac.png')}
                            style={{ width: 20, height: 20 }}
                            resizeMode="contain"
                          />
                          <TextInput
                            style={{
                              marginHorizontal:20,
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: 'black',
                              marginLeft:15,
                              backgroundColor: '#e9ebec',
                              width: '75%',
                              paddingVertical:0,
                              borderRadius: 5,
                            }}
                            placeholder="Equipment Name"
                          />
                           <Icon
                          name="close-circle-outline"
                          size={25}
                          style={{ marginTop: 2 }}
                          color={'#000'}
                          onPress={() => setModalVisible(false)}
                        />
                        </View>

                       
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
                                  <TouchableOpacity
                                    onPress={showDatePicker}
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
                                      justifyContent: 'space-evenly',
                                      alignItems: 'center',
                                    }}>
                                    <Icon
                                      name="calendar"
                                      size={15}
                                      style={{ marginTop: 2 }}
                                      color={'#000'}
                                    />
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        color: '#000',
                                        fontWeight: 'bold',
                                      }}>
                                      {instDate != '' ? instDate : 'Select Date'}
                                    </Text>
                                  </TouchableOpacity>
                                  <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                  />
                                  {/* <TouchableOpacity
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
                                    <Text style={{marginLeft: 3}}>
                                      Jan 12 2022
                                    </Text>
                                  </View>
                                </TouchableOpacity> */}
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
                                  <TouchableOpacity
                                    onPress={showDatePickerLS}
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
                                      justifyContent: 'space-evenly',
                                      alignItems: 'center',
                                    }}>
                                    <Icon
                                      name="calendar"
                                      size={15}
                                      style={{ marginTop: 2 }}
                                      color={'#000'}
                                    />
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        color: '#000',
                                        fontWeight: 'bold',
                                      }}>
                                      {LSDate != '' ? LSDate : 'Select Date'}
                                    </Text>
                                  </TouchableOpacity>
                                  <DateTimePickerModal
                                    isVisible={isDatePickerVisibleLS}
                                    mode="date"
                                    onConfirm={handleConfirmLastServd}
                                    onCancel={hideDatePickerLS}
                                  />
                                  {/* <TouchableOpacity
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
                                    <Text style={{marginLeft: 3}}>
                                      Jan 12 2022
                                    </Text>
                                  </View>
                                </TouchableOpacity> */}
                                </View>

                                <View>
                                  <View>
                                    <Text style={{ marginLeft: 8 }}>
                                      Last Serviced :
                                    </Text>
                                  </View>
                                  <TouchableOpacity
                                    onPress={showDatePickerEW}
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
                                      justifyContent: 'space-evenly',
                                      alignItems: 'center',
                                    }}>
                                    <Icon
                                      name="calendar"
                                      size={15}
                                      style={{ marginTop: 2 }}
                                      color={'#000'}
                                    />
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        color: '#000',
                                        fontWeight: 'bold',
                                      }}>
                                      {EWDate != '' ? EWDate : 'Select Date'}
                                    </Text>
                                  </TouchableOpacity>
                                  <DateTimePickerModal
                                    isVisible={isDatePickerVisibleEW}
                                    mode="date"
                                    onConfirm={handleConfirmEndofWarnty}
                                    onCancel={hideDatePickerEW}
                                  />
                                  {/* <TouchableOpacity
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
                                    <Text style={{marginLeft: 3}}>
                                      Jan 12 2022
                                    </Text>
                                  </View>
                                </TouchableOpacity> */}
                                </View>
                              </View>

                              <View style={{ marginTop: 10 }}>
                                <View style={{ paddingHorizontal: 15 }}>
                                  <Text style={{ fontFamily: 'Sofia_Pro_Bold' }}>
                                    PART NUMBER
                                  </Text>
                                </View>

                                <Dropdown
                                  style={styles.dropdown}
                                  placeholderStyle={styles.placeholderStyle}
                                  selectedTextStyle={styles.selectedTextStyle}
                                  inputSearchStyle={styles.inputSearchStyle}
                                  iconStyle={styles.iconStyle}
                                  data={PartsArr}
                                  maxHeight={180}
                                  labelField="label"
                                  valueField="value"
                                  placeholder={partNumvalue}
                                  value={partNumvalue}
                                  onChange={item => {
                                    setPartNumValue(item.partNbr);
                                  }}
                                  renderItem={renderItemPartNum}
                                />
                                {/* <TouchableOpacity
                                  onPress={() => {
                                    setPartdropdown(!Partdropdown);
                                  }}
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
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <TextInput
                                    style={{
                                      fontSize: 16,
                                      fontFamily: 'Sofia_Pro_Bold',
                                      textAlign: 'center',
                                      paddingHorizontal: 0,
                                      paddingVertical: 0,
                                      width: '50%',
                                      color: '#000',
                                    }}
                                    placeholder="Select Part Number"
                                    placeholderTextColor={'#000'}
                                    editable={false}
                                    value={portObj.partNbr}
                                  />
                                  <Icon
                                    name="chevron-down"
                                    size={25}
                                    color={'#000'}
                                  />
                                </TouchableOpacity> */}
                                {/* {Partdropdown === true && (
                                  <ScrollView>
                                    {PartsArr.map((item, index) => (
                                      <TouchableOpacity
                                        onPress={() => {
                                          setPartdropdown(!Partdropdown);
                                          setPortObj(item);
                                        }}
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
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            fontFamily: 'Sofia_Pro_Bold',
                                            textAlign: 'center',
                                            paddingHorizontal: 0,
                                            paddingVertical: 0,
                                            width: '50%',
                                          }}>
                                          {item.partNbr}
                                        </Text>
                                      </TouchableOpacity>
                                    ))}
                                  </ScrollView>
                                )} */}
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
                                {/* <TouchableOpacity
                                  onPress={() => {
                                    setEquipTypedropdown(!EquipTypedropdown);
                                  }}
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
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <TextInput
                                    style={{
                                      fontSize: 16,
                                      fontFamily: 'Sofia_Pro_Bold',
                                      textAlign: 'center',
                                      paddingHorizontal: 0,
                                      paddingVertical: 0,
                                      width: '50%',
                                      color: '#000',
                                    }}
                                    placeholder="Select Type"
                                    placeholderTextColor={'#000'}
                                    editable={false}
                                    value={eqmntObj.description}
                                  />
                                  <Icon
                                    name="chevron-down"
                                    size={25}
                                    color={'#000'}
                                  />
                                </TouchableOpacity> */}
                                <Dropdown
                                  style={styles.dropdown}
                                  placeholderStyle={styles.placeholderStyle}
                                  selectedTextStyle={styles.selectedTextStyle}
                                  inputSearchStyle={styles.inputSearchStyle}
                                  iconStyle={styles.iconStyle}
                                  data={eqTypeArr}
                                  maxHeight={180}
                                  labelField="label"
                                  valueField="value"
                                  placeholder={value}
                                  value={value}
                                  onChange={item => {
                                    setValue(item.description);
                                  }}
                                  renderItem={renderItem}
                                />

                                {/* <View
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
                              </View> */}
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
                                <Dropdown
                                  style={styles.dropdown}
                                  placeholderStyle={styles.placeholderStyle}
                                  selectedTextStyle={styles.selectedTextStyle}
                                  inputSearchStyle={styles.inputSearchStyle}
                                  iconStyle={styles.iconStyle}
                                  data={manfgArr}
                                  maxHeight={180}
                                  labelField="label"
                                  valueField="value"
                                  placeholder={manvalue}
                                  value={manvalue}
                                  onChange={item => {
                                    setManValue(item.name);
                                  }}
                                  renderItem={renderItemMan}
                                />

                                {/* <TouchableOpacity
                                  onPress={() => {
                                    setManfactureDropdown(!ManfactureDropdown);
                                  }}
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
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <TextInput
                                    style={{
                                      fontSize: 16,
                                      fontFamily: 'Sofia_Pro_Bold',
                                      textAlign: 'center',
                                      paddingHorizontal: 0,
                                      paddingVertical: 0,
                                      width: '50%',
                                      color: '#000',
                                    }}
                                    placeholder="Select Manufacturer"
                                    placeholderTextColor={'#000'}
                                    editable={false}
                                    value={mnfgObj.name}
                                  />
                                  <Icon
                                    name="chevron-down"
                                    size={25}
                                    color={'#000'}
                                  />
                                </TouchableOpacity> */}
                                {/* {ManfactureDropdown === true && (
                                  <ScrollView>
                                    {manfgArr.map((item, index) => (
                                      <TouchableOpacity
                                        onPress={() => {
                                          setManfactureDropdown(
                                            !ManfactureDropdown,
                                          );
                                          setMnfgObj(item);
                                        }}
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
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            fontFamily: 'Sofia_Pro_Bold',
                                            textAlign: 'center',
                                            paddingHorizontal: 0,
                                            paddingVertical: 0,
                                            width: '50%',
                                          }}>
                                          {item.name}
                                        </Text>
                                      </TouchableOpacity>
                                    ))}
                                  </ScrollView>
                                )} */}
                                {/* <View
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
                              </View> */}
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
                                  </View>
                                  {/* <CheckBox
                                    disabled={false}
                                    value={isSelected}
                                    onValueChange={(newValue) => setSelection(newValue)}
                                  /> */}
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
                                    // marginTop: 2,
                                    paddingHorizontal: 5,
                                    height: 30,
                                    width: (windowWidth * 90) / 100,
                                    backgroundColor: '#e9ebec',
                                    alignSelf: 'center',
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    justifyContent: 'center',
                                  }}>
                                  <TextInput
                                    style={{
                                      fontSize: 16,
                                      fontFamily: 'Sofia_Pro_Bold',
                                      height: 20,
                                      // borderWidth: 1,
                                      paddingVertical: 0,
                                    }}
                                    placeholder="Write in the Modal of the Unit?.."
                                    value={ModalNo}
                                    onChangeText={text => setModalNo(text)}
                                  />
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
                                    paddingHorizontal: 5,
                                    height: 30,
                                    width: (windowWidth * 90) / 100,
                                    backgroundColor: '#e9ebec',
                                    alignSelf: 'center',
                                    borderRadius: 3,
                                    justifyContent: 'center',
                                  }}>
                                  <TextInput
                                    style={{
                                      fontSize: 16,
                                      fontFamily: 'Sofia_Pro_Bold',
                                      height: 20,
                                      // borderWidth: 1,
                                      paddingVertical: 0,
                                    }}
                                    placeholder="Write in the serial number of the Unit?.."
                                    value={SerialNo}
                                    onChangeText={text => setSerialNo(text)}
                                  />
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
                                    marginTop: 2,
                                    paddingHorizontal: 5,
                                    height: 30,
                                    width: (windowWidth * 90) / 100,
                                    backgroundColor: '#e9ebec',
                                    alignSelf: 'center',
                                    borderRadius: 3,
                                    justifyContent: 'center',
                                  }}>
                                  <TextInput
                                    style={{
                                      fontSize: 16,
                                      fontFamily: 'Sofia_Pro_Bold',
                                      height: 20,
                                      // borderWidth: 1,
                                      paddingVertical: 0,
                                    }}
                                    placeholder="Write in the Equipment location?.."
                                    value={Eqlocation}
                                    onChangeText={text => setEqlocation(text)}
                                  />
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
                                    paddingHorizontal: 5,
                                    height: 30,
                                    width: (windowWidth * 90) / 100,
                                    backgroundColor: '#e9ebec',
                                    alignSelf: 'center',
                                    borderRadius: 3,
                                    justifyContent: 'center',
                                  }}>
                                  <TextInput
                                    style={{
                                      fontSize: 16,
                                      fontFamily: 'Sofia_Pro_Bold',
                                      height: 20,
                                      // borderWidth: 1,
                                      paddingVertical: 0,
                                    }}
                                    placeholder="Please Fill Equipment Details Here.."
                                    value={Eqcomments}
                                    onChangeText={text => setEqcomments(text)}
                                  />
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

                              {/* <View style={{marginTop:10}}>
                                <Text style={{textDecorationLine:'underline',textAlign:'center',fontSize:17,color:'blue'}}>Click Here to Equipment Attachments</Text>
                              </View> */}

                              <View style={{ marginBottom: 30 }}></View>
                            </View>
                          </TouchableWithoutFeedback>
                        </ScrollView>
                      </View>

                      <TouchableOpacity onPress={addEquipFun}>
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
                            Submit
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </Modal>

          {/* 
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback style={styles.equipAddmodalView}>
                  <View
                    style={[
                      styles.equipAddmodalView,
                      {
                        height: eqType || Mnfg || portBol ? 590 : 518,
                      },
                    ]}>
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
                        onPress={() => setModalVisible(false)}
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
                    <View
                      style={{
                        width: '80%',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{ fontSize: 12, fontWeight: '200' }}>
                          Installed :
                        </Text>
                        <TouchableOpacity onPress={showDatePicker}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#000',
                              fontWeight: 'bold',
                            }}>
                            {instDate != '' ? instDate : 'Select Date'}
                          </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={handleConfirm}
                          onCancel={hideDatePicker}
                        />
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
                        <TouchableOpacity onPress={showDatePickerLS}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#000',
                              fontWeight: 'bold',
                            }}>
                            {LSDate != '' ? LSDate : 'Select Date'}
                          </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                          isVisible={isDatePickerVisibleLS}
                          mode="date"
                          onConfirm={handleConfirmLastServd}
                          onCancel={hideDatePickerLS}
                        />
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
                        <TouchableOpacity onPress={showDatePickerEW}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#000',
                              fontWeight: 'bold',
                            }}>
                            {EWDate != '' ? EWDate : 'Select Date'}
                          </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                          isVisible={isDatePickerVisibleEW}
                          mode="date"
                          onConfirm={handleConfirmEndofWarnty}
                          onCancel={hideDatePickerEW}
                        />
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
                        <TextInput
                          style={{
                            fontSize: 14,
                            height: 20,
                            // borderWidth: 1,
                            paddingVertical: 0,
                          }}
                          placeholder="Please Fill Equipment Details Here.."
                          value={Eqcomments}
                          onChangeText={text => setEqcomments(text)}
                        />
                        {/* Please Fill Equipment Details Here
                        </TextInput> 
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
                        <TextInput
                          style={{
                            fontSize: 14,
                            height: 20,
                            // borderWidth: 1,
                            paddingVertical: 0,
                          }}
                          placeholder="Who Installed the Unit ?"
                        // value={Eqcomments}
                        // onChangeText={text => setEqcomments(text)}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          height: eqType ? 125 : 50,
                        }}>
                        <View style={{}}>
                          <Text
                            style={{
                              marginTop: 10,
                              fontWeight: '700',
                              fontSize: 10,
                              color: '#000',
                            }}>
                            EQUIPMENT TYPE
                          </Text>
                          <View
                            style={{
                              height: 108,
                              justifyContent: 'space-between',
                            }}>
                            <TouchableOpacity
                              onPress={() => setEqType(!eqType)}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                backgroundColor: '#1A60A3',
                                borderRadius: 10,
                                // width: 100,
                                height: 25,
                                paddingHorizontal: 10,
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 12,
                                }}>
                                {Object.keys(eqmntObj).length === 0
                                  ? 'Select Type'
                                  : eqmntObj.description}
                              </Text>
                              <Icon
                                name={
                                  eqType === true
                                    ? 'chevron-up'
                                    : 'chevron-down'
                                }
                                size={15}
                                color={'#fff'}
                              />
                            </TouchableOpacity>
                            {eqType === true && (
                              <ScrollView>
                                {eqTypeArr.map(item => (
                                  <TouchableOpacity
                                    onPress={() => {
                                      setEqmntObj(item);
                                      setEqType(false);
                                    }}
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-evenly',
                                      backgroundColor: '#1A60A3',
                                      borderRadius: 10,
                                      width: 100,
                                      height: 25,
                                      marginVertical: 2,
                                    }}>
                                    <Text
                                      style={{
                                        color: '#fff',
                                        fontSize: 12,
                                      }}>
                                      {item.description}
                                    </Text>
                                  </TouchableOpacity>
                                ))}
                              </ScrollView>
                            )}
                          </View>
                        </View>

                        <View
                          style={
                            {
                              // backgroundColor: 'red',
                              // justifyContent: 'center',
                              // alignItems: 'center',
                            }
                          }>
                          <Text
                            style={{
                              marginTop: 10,
                              fontWeight: '700',
                              fontSize: 10,
                              color: '#000',
                            }}>
                            EQUIPMENT LOCATION
                          </Text>
                          <TextInput
                            style={{
                              fontSize: 14,
                              height: 20,
                              // borderWidth: 1,
                              paddingVertical: 0,
                            }}
                            placeholder="Where is the Unit?.."
                            value={Eqlocation}
                            onChangeText={text => setEqlocation(text)}
                          />
                        </View>
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

                      <View
                        style={{
                          height: Mnfg ? 100 : 28,
                          justifyContent: 'space-between',
                          width: '38%',
                          // paddingHorizontal: 10,
                          // marginHorizontal: '10%',
                          // alignSelf: 'flex-start',
                        }}>
                        <TouchableOpacity
                          onPress={() => setMnfg(!Mnfg)}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            backgroundColor: '#1A60A3',
                            borderRadius: 10,
                            // width: 100,
                            height: 25,
                            paddingHorizontal: 10,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 12,
                            }}
                            numberOfLines={1}>
                            {Object.keys(mnfgObj).length === 0
                              ? 'Select Type'
                              : mnfgObj.name}
                          </Text>
                          <Icon
                            name={Mnfg === true ? 'chevron-up' : 'chevron-down'}
                            size={15}
                            color={'#fff'}
                          />
                        </TouchableOpacity>
                        {Mnfg === true && (
                          <ScrollView>
                            {manfgArr.map(item => (
                              <TouchableOpacity
                                onPress={() => {
                                  setMnfgObj(item);
                                  setMnfg(false);
                                }}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-evenly',
                                  backgroundColor: '#1A60A3',
                                  borderRadius: 10,
                                  // width: 100,
                                  height: 25,
                                  marginVertical: 2,
                                  paddingHorizontal: 10,
                                }}>
                                <Text
                                  style={{
                                    color: '#fff',
                                    fontSize: 12,
                                  }}
                                  numberOfLines={1}>
                                  {item.name}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        )}
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
                        <TextInput
                          style={{
                            fontSize: 14,
                            height: 20,
                            // borderWidth: 1,
                            paddingVertical: 0,
                          }}
                          placeholder="What is the Modal of the Unit?.."
                          value={ModalNo}
                          onChangeText={text => setModalNo(text)}
                        />
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
                          <View
                            style={{
                              height: portBol ? 100 : 28,
                              justifyContent: 'space-between',
                              width: '100%',
                              // paddingHorizontal: 10,
                              // marginHorizontal: '10%',
                              // alignSelf: 'flex-start',
                            }}>
                            <TouchableOpacity
                              onPress={() => setportBol(!portBol)}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                backgroundColor: '#1A60A3',
                                borderRadius: 10,
                                // width: 100,
                                height: 25,
                                paddingHorizontal: 10,
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 12,
                                }}
                                numberOfLines={1}>
                                {Object.keys(portObj).length === 0
                                  ? 'Select Type'
                                  : portObj.partNbr}
                              </Text>
                              <Icon
                                name={
                                  portBol === true
                                    ? 'chevron-up'
                                    : 'chevron-down'
                                }
                                size={15}
                                color={'#fff'}
                              />
                            </TouchableOpacity>
                            {portBol === true && (
                              <ScrollView>
                                {PartsArr.map(item => (
                                  <TouchableOpacity
                                    onPress={() => {
                                      console.log(item, 'PortArr');
                                      setPortObj(item);
                                      setportBol(false);
                                    }}
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-evenly',
                                      backgroundColor: '#1A60A3',
                                      borderRadius: 10,
                                      // width: 100,
                                      height: 25,
                                      marginVertical: 2,
                                      paddingHorizontal: 10,
                                    }}>
                                    <Text
                                      style={{
                                        color: '#fff',
                                        fontSize: 12,
                                      }}
                                      numberOfLines={1}>
                                      {item.partNbr}
                                    </Text>
                                  </TouchableOpacity>
                                ))}
                              </ScrollView>
                            )}
                          </View>
                          {/* <TextInput
                            style={{
                              fontSize: 14,
                              height: 20,
                              // borderWidth: 1,
                              paddingVertical: 0,
                            }}
                            placeholder="Enter SKU"
                            value={PortNo}
                            onChangeText={text => setPortNo(text)}
                          /> 
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
                          <TextInput
                            style={{
                              fontSize: 14,
                              height: 20,
                              // borderWidth: 1,
                              paddingVertical: 0,
                            }}
                            placeholder="Enter Serial No"
                            value={SerialNo}
                            onChangeText={text => setSerialNo(text)}
                          />
                        </View>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <Text
                          style={{
                            fontWeight: '700',
                            textAlign: 'center',
                            fontSize: 16,
                            color: '#000',
                            letterSpacing: 1.5,
                          }}>
                          Add Step ???
                        </Text>
                      </View>
                      <TouchableOpacity onPress={addEquipFun}>
                        <View style={{ marginTop: 20 }}>
                          <View
                            style={{
                              borderRadius: 4,
                              alignItems: 'center',
                              height: 40,
                              width: (windowWidth * 70) / 100,
                              backgroundColor: 'black',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 20,
                              }}>
                              Submit
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableOpacity>
          </Modal> 
          */}

          <View style={{ marginBottom: 100 }}></View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={woEquipModal}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setwoEquipModal(!woEquipModal);
        }}>
        <TouchableOpacity
          onPress={() => setwoEquipModal(false)}
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
                    onPress={() => setwoEquipModal(false)}
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
                                backgroundColor: '#e9ebec',
                              }}>
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
                                }}>
                                QUANTITY
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              <View
                                style={{
                                  backgroundColor: '#e9ebec',
                                  height: 40,
                                  width: (windowWidth * 20) / 100,
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
                                  1
                                </Text>
                              </View>
                              <View style={{ marginTop: 3 }}>
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
                                    style={{ marginLeft: 8 }}
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
                                    style={{ marginLeft: 8 }}
                                    color={'#000'}
                                  // onPress={() => setEquipModalVisible(false)}
                                  />
                                </View>
                              </View>
                            </View>
                          </View>

                          <View>
                            <View style={{ marginTop: 10, marginLeft: 25 }}>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
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
                                  width: (windowWidth * 20) / 100,
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
                                  1
                                </Text>
                              </View>
                              <View style={{ marginTop: 3 }}>
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
                                    style={{ marginLeft: 8 }}
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
                                    style={{ marginLeft: 8 }}
                                    color={'#000'}
                                  // onPress={() => setEquipModalVisible(false)}
                                  />
                                </View>
                              </View>
                            </View>
                          </View>

                          <View>
                            <View style={{ marginTop: 10, marginLeft: 35 }}>
                              <Text
                                style={{
                                  fontFamily: 'Sofia_Pro_Bold',
                                  letterSpacing: 0.5,
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
                                  width: (windowWidth * 20) / 100,
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
                                  1
                                </Text>
                              </View>
                              <View style={{ marginTop: 3 }}>
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
                                    style={{ marginLeft: 8 }}
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
                                    style={{ marginLeft: 8 }}
                                    color={'#000'}
                                  // onPress={() => setEquipModalVisible(false)}
                                  />
                                </View>
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
                            <View style={{ marginTop: 3 }}>
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
                                  style={{ marginLeft: 8 }}
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
                                  style={{ marginLeft: 8 }}
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
                            <View style={{ marginTop: 3 }}>
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
                                  style={{ marginLeft: 8 }}
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
                                  style={{ marginLeft: 8 }}
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

                        <View style={{ marginBottom: 100 }}></View>
                      </View>
                    </TouchableWithoutFeedback>
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
      <HeaderOptionModal
        Visible={headerModal}
        navigation={navigation}
        closeModal={() => setHeaderModal(false)}
      />
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={notesModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setnotesModalVisible(!notesModalVisible);
        }}>
        <TouchableOpacity
          onPress={() => setnotesModalVisible(false)}
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
                      Air Condition Unit
                    </Text>
                  </View>
                  <Icon
                    name="close-circle-outline"
                    size={25}
                    style={{marginTop: 2}}
                    color={'#000'}
                    onPress={() => setnotesModalVisible(false)}
                  />
                </View>
               
               
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginTop: '50%',
    height: (windowHeight * 60) / 100,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    // backgroundColor: 'rgba(100,100,100, 0.5)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    //   backgroundColor: colors.background,
    paddingTop: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    //   backgroundColor: colors.background,
    height: '100%',
  },
  label: {
    fontFamily: 'sofia-pro-bold',
    fontSize: 18,
    //   color: colors.black_9,
  },
  lightLabel: {
    fontFamily: 'sofia-pro-bold',
    fontSize: 17,
    //   color: colors.black_9,
    letterSpacing: 0.04,
    // textTransform: 'lowercase',
  },
  primaryButton: {
    flex: 2,
    alignSelf: 'baseline',
    justifyContent: 'center',
    flexDirection: 'row',
    //   backgroundColor: colors.blue7,
    borderWidth: 1,
    borderColor: '#1A60A3',
    borderStyle: 'solid',
    borderRadius: 24,
    paddingVertical: 9,
    marginRight: 12,
  },
  descriptionText: {
    fontFamily: 'sofia-pro-medium',
    fontSize: 16,
    //   color: colors.gray_7,
    lineHeight: 22,
  },
  skeleton: {
    borderRadius: 2,
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
  },
  // container: {
  //   backgroundColor: colors.white,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   shadowOffset: {
  //     width: 0,
  //     height: 0,
  //   },
  //   shadowRadius: 4,
  //   shadowColor: 'rgba(0, 42, 81, 0.08)',
  //   shadowOpacity: 1,
  //   paddingTop: 12,
  //   paddingHorizontal: 16,
  //   paddingBottom: 45,
  // },

  secondayButton: {
    flex: 1,
    alignSelf: 'baseline',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 24,
    //   backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#3A3D41',
    borderStyle: 'solid',
    paddingVertical: 9,
  },
  primaryText: {
    fontFamily: 'sofia-pro-medium',
    fontSize: 14,
    //   color: colors.white,
    marginLeft: 13,
  },
  secondaryText: {
    fontFamily: 'sofia-pro-medium',
    fontSize: 14,
    //   color: colors.black_9,
    marginLeft: 13,
  },
  center: {
    justifyContent: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  notescenteredView: {
    height: 240,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  equipmodalView: {
    margin: 20,
    backgroundColor: 'white',
    marginTop: 10,
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
  equipAddmodalView: {
    margin: 20,
    backgroundColor: 'white',
    // borderRadius: 10,
    // padding: 15,
    marginTop: 10,
    // alignItems: "center",
    shadowColor: '#000',
    height: (windowHeight * 70) / 100,
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
  NotesAddmodalView: {
    justifyContent: 'flex-end',
    // margin: 20,
    backgroundColor: 'white',
    // borderRadius: 10,
    // padding: 15,
    // marginTop: (windowHeight * 70) / 100,
    alignItems: 'center',
    shadowColor: '#000',
    // height: (windowHeight * 25) / 100,
    width: windowWidth,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 5,
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
  checkbox: {
    alignSelf: "center",
  },
  dropdown: {
    height: 33,
    marginHorizontal: 10.,
    backgroundColor: '#e9ebec',
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 0.5,
    alignItems: 'center',
    marginTop: 5
  },
  item: {
    borderColor: '#000',
    height: 25,
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginVertical: 10,
    color: '#000'
  },
  textItem: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    alignItems: 'center'
  },
  placeholderStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#000',
    fontWeight: 'bold',
    marginHorizontal: 15
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 25,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default LatestWorkDetails;
