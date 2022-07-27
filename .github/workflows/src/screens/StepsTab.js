import React, {useState, useEffect, useRef} from 'react';
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
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import CollapsibleView from '@eliav2/react-native-collapsible-view';
import moment from 'moment';

import {saveUserInLocalStorageAsync} from '../services/LocalStorage';
import {getUserFromStorageAsync} from '../services/LocalStorage';
import {
  addNotesasync,
  getworkordersasync,
  workorderDetailsasync,
  equipmentTypeAsync,
  getPartNumberAsync,
  manufacturDataAsync,
  addEquipasync,
} from '../services/Services';
import ToggleSwitch from '../components/ToggleSwitch';
import FillouttheForm from './FillouttheForm';
import {
  PESDK,
  PhotoEditorModal,
  Configuration,
} from 'react-native-photoeditorsdk';
import BottomSheet from 'react-native-simple-bottom-sheet';
import Header from '../components/Header';
import HeaderOptionModal from '../components/HeaderOptionModal';
import {
  localStoragePhotos,
  localStorageVideos,
} from '../components/localStoragePhotos';
import {VESDK} from 'react-native-videoeditorsdk';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let toggleData = {};

const StepsTab = ({navigation, route}) => {
  let Video = route.params.videoUrl;
  let Photo = route.params.imageUrl;
  let PHArray = localStoragePhotos(route.params.sono);
  let VIArray = localStorageVideos(route.params.sono);
  const signatureView = React.useRef(null);
  const [enableStatus, setenableStatus] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [genStepsExpanded, setgenStepsExpanded] = React.useState(true);
  const [EquipStepsExpanded, setEquipStepsExpanded] = React.useState(true);
  const [EquipInnerStepsExpanded, setEquipInnerStepsExpanded] =
    React.useState(true);
  const [ClosingStepsExpanded, setClosingStepsExpanded] = React.useState(true);
  const [PossibleStepsExpanded, setPossibleStepsExpanded] =
    React.useState(true);
  const [contactModalVisible, setcontactModalVisible] = React.useState(false);
  const [EquipModalVisible, setEquipModalVisible] = React.useState(false);
  const [viewHeight, setViewHeight] = useState(true);
  const [acviewHeight, setacViewHeight] = useState(true);
  const [signModalVisible, setsignModalVisible] = useState(false);
  const [attachModalVisible, setattachModalVisible] = useState(false);
  // const [EquipModalVisible, setEquipModalVisible] = React.useState(false);
  const [notesModalVisible, setnotesModalVisible] = useState(false);
  const [secondviewHeight, setsecondViewHeight] = useState(false);
  const [workorders, setworkorders] = useState([]);
  const [WOStatus, setWOStatus] = useState({
    jobStatus: jobstatusValue,
    sono: route.params.sono,
  });
  const [toggle, setToggle] = useState(false);
  const [tableHToggle, setTableHToggle] = useState(false);
  const [tables1Toggle, setTables1Toggle] = useState(false);
  const [tables2Toggle, setTables2Toggle] = useState(false);
  const [tables3Toggle, setTables3Toggle] = useState(false);
  const [tables4Toggle, setTables4Toggle] = useState(false);
  const [docToggle, setDocToggle] = useState(false);
  const [photoToggle, setPhotoToggle] = useState(false);
  const [videoToggle, setVideoToggle] = useState(false);

  const [equipAddToggle, setEquipAddToggle] = useState(false);

  const [DFEmailToggle, setDFEmailToggle] = useState(false);
  const [DFTakepicToggle, setDFTakepicToggle] = useState(false);
  const [DFNotesToggle, setDFNotesToggle] = useState(false);
  const [DFCFormToggle, setDFCFormToggle] = useState(false);

  const [ClosingStepsNotesToggle, setClosingStepsNotesToggle] = useState(false);
  const [ClosingStepsSignToggle, setClosingStepsSignToggle] = useState(false);

  const [PRStepsNotesToggle, setPRStepsNotesToggle] = useState(false);
  const [PRStepsSignToggle, setPRStepsSignToggle] = useState(false);

  const [tableFinalizeToggle, setTableFinalizeToggle] = useState(false);

  const [tableF1Toggle, setTableF1Toggle] = useState(false);
  const [tableF2Toggle, setTableF2Toggle] = useState(false);
  const [tableF3Toggle, setTableF3Toggle] = useState(false);
  const [tableF4Toggle, setTableF4Toggle] = useState(false);

  const [ACunittableToggle, setACunitTableToggle] = useState(false);

  const [tableAC1Toggle, setTableAC1Toggle] = useState(false);
  const [tableAC2Toggle, setTableAC2Toggle] = useState(false);
  const [tableAC3Toggle, setTableAC3Toggle] = useState(false);
  const [tableAC4Toggle, setTableAC4Toggle] = useState(false);

  const [result, setResult] = React.useState(false);

  const [eqType, setEqType] = useState(false);
  const [headerModal, setHeaderModal] = React.useState(false);
  const [PhotoArray, setPhotoArray] = React.useState([]);
  const [VideoArray, setVideoArray] = React.useState([]);
  const [DocsArr, setDocArr] = React.useState([]);
  const [jobstatusValue, setjobstatusValue] = useState('');
  const [signdata, setsigndata] = React.useState(null);
  const [Discription, setDiscription] = React.useState('');
  const [Title, setTitle] = React.useState('');
  const [WDData, setWDData] = useState({});
  const [toggleState, setToggleState] = useState({});
  const [instDate, setInstDate] = React.useState('');
  const [LSDate, setLSDate] = React.useState('');
  const [EWDate, setEWDate] = React.useState('');
  const [Eqcomments, setEqcomments] = React.useState('');
  const [Eqlocation, setEqlocation] = React.useState('');
  const [ModalNo, setModalNo] = React.useState('');
  const [PortNo, setPortNo] = React.useState('');
  const [SerialNo, setSerialNo] = React.useState('');
  const [Mnfg, setMnfg] = useState(false);
  const [EquipmentObject, setEquipmentObject] = React.useState({});
  const [portBol, setportBol] = useState(false);
  const [eqTypeArr, setEqTypeArr] = useState([]);
  const [PartsArr, setPartsArr] = useState([]);
  const [eqmntObj, setEqmntObj] = useState({});
  const [mnfgObj, setMnfgObj] = useState({});
  const [portObj, setPortObj] = useState({});
  const [manfgArr, setManfgArr] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleLS, setDatePickerVisibilityLS] = useState(false);
  const [isDatePickerVisibleEW, setDatePickerVisibilityEW] = useState(false);
  const [IndexNo, setIndexNo] = React.useState('');

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

  const savePickedFile = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setResult([pickerResult]);
      if (pickerResult.type === 'application/pdf') {
        saveDocument(pickerResult.fileCopyUri);
      } else if (pickerResult.type === 'image/jpeg') {
        Photo = pickerResult.fileCopyUri;
        getPhoto();
      } else if (pickerResult.type === 'video/mp4') {
        Video = pickerResult.fileCopyUri;
        getVideo();
      }
    } catch (e) {
      handleError();
    }
  };

  const saveDocument = async Document => {
    let DocumentArr = [{docUrl: Document}, ...DocsArr];
    await saveUserInLocalStorageAsync(
      DocumentArr,
      'DocUrl' + route.params.sono,
    );
    setDocToggle(true);
    toggleData = {docToggle: true, ...toggleData};
    // setToggleState(toggleData);
    await saveUserInLocalStorageAsync(
      toggleData,
      'ToggleState' + route.params.sono,
    );
    setDocArr(DocumentArr);
  };

  function saveSign() {
    signatureView.current.saveImage();
  }

  const workorderDetailsFun = async () => {
    try {
      let user = await getUserFromStorageAsync('EmpID');
      const {sono, custNo} = route.params;
      const res = await workorderDetailsasync(user, sono, custNo);
      setWDData(res.data[0]);
      // setLoading(false);
    } catch (err) {
      // setLoading(false);
      console.log(err);
    }
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
      console.log(Input, 'addEquip params');
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
        console.log(err);
      }
    } else {
      setModalVisible(false);
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
              wono: route.params.sono, //Dynamic value passing
              woType: 'wo', //Static
              scheduledLine: 0, //Static
              scheduledDate: scheduledDate, //Dynamic value passing
              userID: user, //Dynamic value passing
              transData: `${WDData.notes.length + 1}|3|${
                route.params.sono
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
          // notesId = notesId + 1;
          setnotesModalVisible(false);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert(Error);
      return;
    }
    // notesId = notesId + 1;
  };

  const getDocs = async () => {
    let toggleRes = await getUserFromStorageAsync(
      'ToggleState' + route.params.sono,
    );
    let res = await getUserFromStorageAsync('DocUrl' + route.params.sono);
    if (Object.keys(toggleRes).length == 0) {
      setDocToggle(docToggle);
    } else {
      setDocToggle(toggleRes.docToggle);
    }
    if (res === undefined) {
      setDocArr([]);
    } else {
      setDocArr(res);
    }
  };

  const equipmentTypeFun = async () => {
    try {
      let user = await getUserFromStorageAsync('EmpID');
      const res = await equipmentTypeAsync(user);
      setEqTypeArr(res.payLoad.entities[0].items);
    } catch (err) {
      console.log(err);
    }
  };

  const getPartsNoFun = async () => {
    try {
      let user = await getUserFromStorageAsync('EmpID');
      const res = await getPartNumberAsync(user);
      setPartsArr(res.payLoad.entities[0].items[0].partsList);
    } catch (err) {
      console.log(err);
    }
  };

  const getManufacturDataFun = async () => {
    try {
      let user = await getUserFromStorageAsync('EmpID');
      const res = await manufacturDataAsync(user);
      setManfgArr(res.payLoad.entities[0].items);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    enableStatusFun();
  }, [
    docToggle,
    photoToggle,
    videoToggle,
    equipAddToggle,
    DFEmailToggle,
    DFTakepicToggle,
    DFNotesToggle,
    DFCFormToggle,
    ACunittableToggle,
    ClosingStepsNotesToggle,
    ClosingStepsSignToggle,
    tableFinalizeToggle,
    PRStepsNotesToggle,
    PRStepsSignToggle,
    tableHToggle,
  ]);

  const enableStatusFun = () => {
    if (
      docToggle === true &&
      photoToggle === true &&
      videoToggle === true &&
      equipAddToggle === true &&
      DFEmailToggle === true &&
      DFTakepicToggle === true &&
      DFNotesToggle === true &&
      DFCFormToggle === true &&
      ACunittableToggle === true &&
      ClosingStepsNotesToggle === true &&
      ClosingStepsSignToggle === true &&
      tableFinalizeToggle === true &&
      PRStepsNotesToggle === true &&
      PRStepsSignToggle === true &&
      tableHToggle === true
    ) {
      setenableStatus(true);
    } else {
      setenableStatus(false);
    }
  };
  const selectStatusFun = status => {
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
  const getTogglesdata = async () => {
    let docToggle = await getUserFromStorageAsync(
      'docToggle' + route.params.sono,
    );
    setDocToggle(docToggle);
    let photoToggle = await getUserFromStorageAsync(
      'photoToggle' + route.params.sono,
    );
    setPhotoToggle(photoToggle);
    let videoToggle = await getUserFromStorageAsync(
      'videoToggle' + route.params.sono,
    );
    setVideoToggle(videoToggle);
    let equipAddToggle = await getUserFromStorageAsync(
      'equipAddToggle' + route.params.sono,
    );
    setEquipAddToggle(equipAddToggle);
    let DFEmailToggle = await getUserFromStorageAsync(
      'DFEmailToggle' + route.params.sono,
    );
    setDFEmailToggle(DFEmailToggle);
    let DFCFormToggle = await getUserFromStorageAsync(
      'DFCFormToggle' + route.params.sono,
    );
    setDFCFormToggle(DFCFormToggle);
    let DFNotesToggle = await getUserFromStorageAsync(
      'DFNotesToggle' + route.params.sono,
    );
    setDFNotesToggle(DFNotesToggle);
    let DFTakepicToggle = await getUserFromStorageAsync(
      'DFTakepicToggle' + route.params.sono,
    );
    setDFTakepicToggle(DFTakepicToggle);
    let CloseStepsNotesToggle = await getUserFromStorageAsync(
      'CloseStepsNotesToggle' + route.params.sono,
    );
    setClosingStepsNotesToggle(CloseStepsNotesToggle);
    let CloseStepsSignToggle = await getUserFromStorageAsync(
      'CloseStepsSignToggle' + route.params.sono,
    );
    setClosingStepsSignToggle(CloseStepsSignToggle);
    let PRStepsNotesToggle = await getUserFromStorageAsync(
      'PRStepsNotesToggle' + route.params.sono,
    );
    setPRStepsNotesToggle(PRStepsNotesToggle);
    let PRStepsSignToggle = await getUserFromStorageAsync(
      'PRStepsSignToggle' + route.params.sono,
    );
    setPRStepsSignToggle(PRStepsSignToggle);
    let tableHToggle = await getUserFromStorageAsync(
      'tableHToggle' + route.params.sono,
    );
    setTableHToggle(tableHToggle);
    let tableFinalizeToggle = await getUserFromStorageAsync(
      'tableFinalizeToggle' + route.params.sono,
    );
    setTableFinalizeToggle(tableFinalizeToggle);
    let ACunittableToggle = await getUserFromStorageAsync(
      'ACunittableToggle' + route.params.sono,
    );
    setACunitTableToggle(ACunittableToggle);
    let tableAC1Toggle = await getUserFromStorageAsync(
      'tableAC1Toggle' + route.params.sono,
    );
    setTableAC1Toggle(tableAC1Toggle);
    let tableAC2Toggle = await getUserFromStorageAsync(
      'tableAC2Toggle' + route.params.sono,
    );
    setTableAC2Toggle(tableAC2Toggle);
    let tableAC3Toggle = await getUserFromStorageAsync(
      'tableAC3Toggle' + route.params.sono,
    );
    setTableAC3Toggle(tableAC3Toggle);
    let tableAC4Toggle = await getUserFromStorageAsync(
      'tableAC4Toggle' + route.params.sono,
    );
    setTableAC4Toggle(tableAC4Toggle);
    let tableF1Toggle = await getUserFromStorageAsync(
      'tableF1Toggle' + route.params.sono,
    );
    setTableF1Toggle(tableF1Toggle);
    let tableF2Toggle = await getUserFromStorageAsync(
      'tableF2Toggle' + route.params.sono,
    );
    setTableF2Toggle(tableF2Toggle);
    let tableF3Toggle = await getUserFromStorageAsync(
      'tableF3Toggle' + route.params.sono,
    );
    setTableF3Toggle(tableF3Toggle);
    let tableF4Toggle = await getUserFromStorageAsync(
      'tableF4Toggle' + route.params.sono,
    );
    setTableF4Toggle(tableF4Toggle);
    let tables1Toggle = await getUserFromStorageAsync(
      'tables1Toggle' + route.params.sono,
    );
    setTables1Toggle(tables1Toggle);
    let tables2Toggle = await getUserFromStorageAsync(
      'tables2Toggle' + route.params.sono,
    );
    setTables2Toggle(tables2Toggle);
    let tables3Toggle = await getUserFromStorageAsync(
      'tables3Toggle' + route.params.sono,
    );
    setTables3Toggle(tables3Toggle);
    let tables4Toggle = await getUserFromStorageAsync(
      'tables4Toggle' + route.params.sono,
    );
    setTables4Toggle(tables4Toggle);
  };
  React.useEffect(() => {
    getTogglesdata();
    getStatusAsync();
    getDocs();
    workorderDetailsFun();
    equipmentTypeFun();
    getManufacturDataFun();
    getPartsNoFun();
    saveSignLocal();
    // console.log(WOStatus, 'Work Order Status');
    // getToggleData();
  }, []);

  // useEffect(() => {
  //   console.log('loading');
  //   getWOstatus();
  // }, [WOStatus]);

  useEffect(() => {
    getPhoto();
    // getToggleData();
  }, [PHArray, Photo]);

  useEffect(() => {
    getVideo();
    // getToggleData();
  }, [VIArray, Video]);

  useEffect(() => {
    getToggleData();
  }, [DocsArr]);

  const getToggleData = async () => {
    // if (VIArray.length != 0) {
    // }
    if (DocsArr.length > 0) {
      setDocToggle(true);
      await saveUserInLocalStorageAsync(true, 'docToggle' + route.params.sono);
    }
    if (PHArray.length > 0) {
      setPhotoToggle(true);
      await saveUserInLocalStorageAsync(
        true,
        'photoToggle' + route.params.sono,
      );
    }
    if (VIArray.length > 0) {
      setVideoToggle(true);
      await saveUserInLocalStorageAsync(
        true,
        'videoToggle' + route.params.sono,
      );
    }
    // let toggleRes = await getUserFromStorageAsync(
    //   'ToggleState' + route.params.sono,
    // );
    // console.log(toggleRes, 'toggleState values');
    // setToggleState(toggleRes);
  };

  const getVideo = async () => {
    if (Video != undefined) {
      let VIArray = [{videoUrl: Video}, ...VideoArray];
      await saveUserInLocalStorageAsync(
        VIArray,
        'videoUrl' + route.params.sono,
      );
      await saveUserInLocalStorageAsync({videoUrl: Video},'Library')
      setVideoToggle(true);
      toggleData = {videoToggle: true, ...toggleData};

      await saveUserInLocalStorageAsync(
        toggleData,
        'ToggleState' + route.params.sono,
      );
      setVideoArray(VIArray);
    } else {
      let toggleRes = await getUserFromStorageAsync(
        'ToggleState' + route.params.sono,
      );

      if (toggleRes === undefined || Object.keys(toggleRes).length == 0) {
        setVideoToggle(videoToggle);
      } else {
        setVideoToggle(toggleRes.videoToggle);
      }
      await saveUserInLocalStorageAsync(
        VIArray,
        'videoUrl' + route.params.sono,
      );
      if (VIArray.length > 0) {
        setVideoArray(VIArray);
      } else {
        setVideoArray(VideoArray);
      }
    }
  };

  const getPhoto = async () => {
    if (Photo != undefined) {
      // PhotoArray.unshift({imgUrl: Photo});
      let PhotoArr = [{imgUrl: Photo}, ...PhotoArray];
      // setToggleState({photoToggle: true, ...toggleState});
      await saveUserInLocalStorageAsync(
        PhotoArr,
        'mediaUrl' + route.params.sono,
      );
      await saveUserInLocalStorageAsync({imgUrl: Photo},'Library')
      setPhotoToggle(true);
      toggleData = {photoToggle: true, ...toggleData};
      await saveUserInLocalStorageAsync(
        toggleData,
        'ToggleState' + route.params.sono,
      );
      setPhotoArray(PhotoArr);
    } else {
      let toggleRes = await getUserFromStorageAsync(
        'ToggleState' + route.params.sono,
      );
      if (toggleRes === undefined || Object.keys(toggleRes).length == 0) {
        setPhotoToggle(photoToggle);
      } else {
        setPhotoToggle(toggleRes.photoToggle);
      }
      await saveUserInLocalStorageAsync(
        PHArray,
        'mediaUrl' + route.params.sono,
      );
      if (PHArray.length > 0) {
        setPhotoArray(PHArray);
      } else {
        setPhotoArray(PhotoArray);
      }
    }
  };

  const VideoEditFun = item => {
    VESDK.openEditor(item.videoUrl).then(
      result => {
        Video = result.video;
        getVideo();
      },
      error => {
        console.log(error);
      },
    );
  };
  const PhotoEditFun = item => {
    PESDK.openEditor(item.imgUrl)
      .then(
        result => {
          navigation.navigate('PhotoPreviewScreen', {
            uri: result.image,
            sono: route.params.sono,
          });
        },
        error => {
          console.log(error);
        },
      )
      .catch(err => {
        console.log(err);
      });
  };

  const collapseFun = item => {
    switch (item) {
      case 'GenSteps':
        setgenStepsExpanded(!genStepsExpanded);
        break;
      case 'EquipSteps':
        setEquipStepsExpanded(!EquipStepsExpanded);
        break;
      case 'EquipInnerSteps':
        setEquipInnerStepsExpanded(!EquipInnerStepsExpanded);
        break;
      case 'ClosingSteps':
        setClosingStepsExpanded(!ClosingStepsExpanded);
        break;
      case 'PossibleSteps':
        setPossibleStepsExpanded(!PossibleStepsExpanded);
        break;
      default:
        break;
    }
  };

  const saveSignLocal = async () => {
    let res = await getUserFromStorageAsync('SaveSign' + route.params.sono);
    setsigndata(res);
  };

  const _onSaveEvent = async result => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    alert('Signature Captured Successfully');
    setsigndata(`data:image/png;base64,${result.encoded}`);
    await saveUserInLocalStorageAsync(
      `data:image/png;base64,${result.encoded}`,
      'SaveSign' + route.params.sono,
    );
    setsignModalVisible(false);
  };

  const _onDragEvent = () => {
    // This callback will be called when the user enters signature
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

  const setToggleFun = async item => {
    switch (item) {
      // case 'Docs':
      //   setDocToggle(!docToggle);
      //   await saveUserInLocalStorageAsync(
      //     !docToggle,
      //     'docToggle' + route.params.sono,
      //   );
      //   break;
      // case 'Photos':
      //   setPhotoToggle(!photoToggle);
      //   await saveUserInLocalStorageAsync(
      //     !photoToggle,
      //     'photoToggle' + route.params.sono,
      //   );
      //   break;
      // case 'Videos':
      //   setVideoToggle(!videoToggle);
      //   await saveUserInLocalStorageAsync(
      //     !videoToggle,
      //     'videoToggle' + route.params.sono,
      //   );
      //   break;

      case 'EquipmentAddToggle':
        setEquipAddToggle(!equipAddToggle);
        await saveUserInLocalStorageAsync(
          !equipAddToggle,
          'equipAddToggle' + route.params.sono,
        );
        break;

      case 'DeepFryerEmailCustToggle':
        setDFEmailToggle(!DFEmailToggle);
        await saveUserInLocalStorageAsync(
          !DFEmailToggle,
          'DFEmailToggle' + route.params.sono,
        );
        break;
      case 'DeepFryerTakePhotoToggle':
        setDFTakepicToggle(!DFTakepicToggle);
        await saveUserInLocalStorageAsync(
          !DFTakepicToggle,
          'DFTakepicToggle' + route.params.sono,
        );
        break;
      case 'DeepFryerNotesToggle':
        setDFNotesToggle(!DFNotesToggle);
        await saveUserInLocalStorageAsync(
          !DFNotesToggle,
          'DFNotesToggle' + route.params.sono,
        );
        break;
      case 'DeepFryerCompleteFormToggle':
        setDFCFormToggle(!DFCFormToggle);
        await saveUserInLocalStorageAsync(
          !DFCFormToggle,
          'DFCFormToggle' + route.params.sono,
        );
        break;

      case 'CloseStepsNotesToggle':
        setClosingStepsNotesToggle(!ClosingStepsNotesToggle);
        await saveUserInLocalStorageAsync(
          !ClosingStepsNotesToggle,
          'ClosingStepsNotesToggle' + route.params.sono,
        );
        break;
      case 'CloseStepsSignToggle':
        setClosingStepsSignToggle(!ClosingStepsSignToggle);
        await saveUserInLocalStorageAsync(
          !ClosingStepsSignToggle,
          'ClosingStepsSignToggle' + route.params.sono,
        );
        break;

      case 'PossibleRevenueStepsNotesToggle':
        setPRStepsNotesToggle(!PRStepsNotesToggle);
        await saveUserInLocalStorageAsync(
          !PRStepsNotesToggle,
          'PRStepsNotesToggle' + route.params.sono,
        );
        break;
      case 'PossibleRevenueStepsSignToggle':
        setPRStepsSignToggle(!PRStepsSignToggle);
        await saveUserInLocalStorageAsync(
          !PRStepsSignToggle,
          'PRStepsSignToggle' + route.params.sono,
        );
        break;

      case 'MainToggle':
        setTableHToggle(!tableHToggle);
        await saveUserInLocalStorageAsync(
          !tableHToggle,
          'tableHToggle' + route.params.sono,
        );
        if (!tableHToggle === true) {
          setTables1Toggle(true);
          setTables2Toggle(true);
          setTables3Toggle(true);
          setTables4Toggle(true);
          await saveUserInLocalStorageAsync(
            true,
            'tables1Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            true,
            'tables2Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            true,
            'tables3Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            true,
            'tables4Toggle' + route.params.sono,
          );
        } else if (!tableHToggle === false) {
          setTables1Toggle(false);
          setTables2Toggle(false);
          setTables3Toggle(false);
          setTables4Toggle(false);
          await saveUserInLocalStorageAsync(
            false,
            'tables1Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            false,
            'tables2Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            false,
            'tables3Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            false,
            'tables4Toggle' + route.params.sono,
          );
        }
        break;
      case 's1Toggle':
        setTables1Toggle(!tables1Toggle);
        if (!tables1Toggle === true) {
          if (tables2Toggle === true) {
            if (tables3Toggle === true) {
              if (tables4Toggle === true) {
                setTableHToggle(true);
                await saveUserInLocalStorageAsync(
                  true,
                  'tableHToggle' + route.params.sono,
                );
              }
            }
          }
        } else if (!tables1Toggle === false) {
          if (tables2Toggle === true) {
            if (tables3Toggle === true) {
              if (tables4Toggle === true) {
                setTableHToggle(false);
                await saveUserInLocalStorageAsync(
                  false,
                  'tableHToggle' + route.params.sono,
                );
              }
            }
          }
        }
        await saveUserInLocalStorageAsync(
          !tables1Toggle,
          'tables1Toggle' + route.params.sono,
        );
        break;
      case 's2Toggle':
        setTables2Toggle(!tables2Toggle);
        if (!tables2Toggle === true) {
          if (tables1Toggle === true) {
            if (tables3Toggle === true) {
              if (tables4Toggle === true) {
                setTableHToggle(true);
                await saveUserInLocalStorageAsync(
                  true,
                  'tableHToggle' + route.params.sono,
                );
              }
            }
          }
        } else if (!tables2Toggle === false) {
          if (tables1Toggle === true) {
            if (tables3Toggle === true) {
              if (tables4Toggle === true) {
                setTableHToggle(false);
                await saveUserInLocalStorageAsync(
                  false,
                  'tableHToggle' + route.params.sono,
                );
              }
            }
          }
        }
        await saveUserInLocalStorageAsync(
          !tables2Toggle,
          'tables2Toggle' + route.params.sono,
        );
        break;
      case 's3Toggle':
        setTables3Toggle(!tables3Toggle);
        if (!tables3Toggle === true) {
          if (tables1Toggle === true) {
            if (tables2Toggle === true) {
              if (tables4Toggle === true) {
                setTableHToggle(true);
                await saveUserInLocalStorageAsync(
                  true,
                  'tableHToggle' + route.params.sono,
                );
              }
            }
          }
        } else if (!tables3Toggle === false) {
          if (tables1Toggle === true) {
            if (tables2Toggle === true) {
              if (tables4Toggle === true) {
                setTableHToggle(false);
                await saveUserInLocalStorageAsync(
                  false,
                  'tableHToggle' + route.params.sono,
                );
              }
            }
          }
        }
        await saveUserInLocalStorageAsync(
          !tables3Toggle,
          'tables3Toggle' + route.params.sono,
        );
        break;
      case 's4Toggle':
        setTables4Toggle(!tables4Toggle);
        if (!tables4Toggle === true) {
          if (tables1Toggle === true) {
            if (tables2Toggle === true) {
              if (tables3Toggle === true) {
                setTableHToggle(true);
                await saveUserInLocalStorageAsync(
                  true,
                  'tableHToggle' + route.params.sono,
                );
              }
            }
          }
        } else if (!tables4Toggle === false) {
          if (tables1Toggle === true) {
            if (tables2Toggle === true) {
              if (tables3Toggle === true) {
                setTableHToggle(false);
                await saveUserInLocalStorageAsync(
                  false,
                  'tableHToggle' + route.params.sono,
                );
              }
            }
          }
        }
        await saveUserInLocalStorageAsync(
          !tables4Toggle,
          'tables4Toggle' + route.params.sono,
        );
        break;

      case 'FinalizeMainToggle':
        setTableFinalizeToggle(!tableFinalizeToggle);
        await saveUserInLocalStorageAsync(
          !tableFinalizeToggle,
          'tableFinalizeToggle' + route.params.sono,
        );
        if (!tableFinalizeToggle === true) {
          setTableF1Toggle(true);
          setTableF2Toggle(true);
          setTableF3Toggle(true);
          setTableF4Toggle(true);
          await saveUserInLocalStorageAsync(
            true,
            'tableF1Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            true,
            'tableF2Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            true,
            'tableF3Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            true,
            'tableF4Toggle' + route.params.sono,
          );
        } else if (!tableFinalizeToggle === false) {
          setTableF1Toggle(false);
          setTableF2Toggle(false);
          setTableF3Toggle(false);
          setTableF4Toggle(false);
          await saveUserInLocalStorageAsync(
            false,
            'tableF1Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            false,
            'tableF2Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            false,
            'tableF3Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            false,
            'tableF4Toggle' + route.params.sono,
          );
        }
        break;
      case 'F1Toggle':
        setTableF1Toggle(!tableF1Toggle);
        if (!tableF1Toggle === true) {
          if (tableF2Toggle === true) {
            if (tableF3Toggle === true) {
              if (tableF4Toggle === true) {
                setTableFinalizeToggle(true);
                await saveUserInLocalStorageAsync(
                  true,
                  'tableFinalizeToggle' + route.params.sono,
                );
              }
            }
          }
        } else if (!tableF1Toggle === false) {
          if (tableF2Toggle === true) {
            if (tableF3Toggle === true) {
              if (tableF4Toggle === true) {
                setTableFinalizeToggle(false);
                await saveUserInLocalStorageAsync(
                  false,
                  'tableFinalizeToggle' + route.params.sono,
                );
              }
            }
          }
        }
        await saveUserInLocalStorageAsync(
          !tableF1Toggle,
          'tableF1Toggle' + route.params.sono,
        );
        break;
      case 'F2Toggle':
        setTableF2Toggle(!tableF2Toggle);
        if (!tableF2Toggle === true) {
          if (tableF1Toggle === true) {
            if (tableF3Toggle === true) {
              if (tableF4Toggle === true) {
                setTableFinalizeToggle(true);
                await saveUserInLocalStorageAsync(
                  true,
                  'tableFinalizeToggle' + route.params.sono,
                );
              }
            }
          }
        } else if (!tableF2Toggle === false) {
          if (tableF1Toggle === true) {
            if (tableF3Toggle === true) {
              if (tableF4Toggle === true) {
                setTableFinalizeToggle(false);
                await saveUserInLocalStorageAsync(
                  false,
                  'tableFinalizeToggle' + route.params.sono,
                );
              }
            }
          }
        }
        await saveUserInLocalStorageAsync(
          !tableF2Toggle,
          'tableF2Toggle' + route.params.sono,
        );
        break;
      case 'F3Toggle':
        setTableF3Toggle(!tableF3Toggle);
        if (!tableF3Toggle === true) {
          if (tableF1Toggle === true) {
            if (tableF2Toggle === true) {
              if (tableF4Toggle === true) {
                setTableFinalizeToggle(true);
                await saveUserInLocalStorageAsync(
                  true,
                  'tableFinalizeToggle' + route.params.sono,
                );
              }
            }
          }
        } else if (!tableF3Toggle === false) {
          if (tableF1Toggle === true) {
            if (tableF2Toggle === true) {
              if (tableF4Toggle === true) {
                setTableFinalizeToggle(false);
                await saveUserInLocalStorageAsync(
                  false,
                  'tableFinalizeToggle' + route.params.sono,
                );
              }
            }
          }
        }
        await saveUserInLocalStorageAsync(
          !tableF3Toggle,
          'tableF3Toggle' + route.params.sono,
        );
        break;
      case 'F4Toggle':
        setTableF4Toggle(!tableF4Toggle);
        if (!tableF4Toggle === true) {
          if (tableF1Toggle === true) {
            if (tableF2Toggle === true) {
              if (tableF3Toggle === true) {
                setTableFinalizeToggle(true);
                await saveUserInLocalStorageAsync(
                  true,
                  'tableFinalizeToggle' + route.params.sono,
                );
              }
            }
          }
        } else if (!tableF4Toggle === false) {
          if (tableF1Toggle === true) {
            if (tableF2Toggle === true) {
              if (tableF3Toggle === true) {
                setTableFinalizeToggle(false);
                await saveUserInLocalStorageAsync(
                  false,
                  'tableFinalizeToggle' + route.params.sono,
                );
              }
            }
          }
        }
        await saveUserInLocalStorageAsync(
          !tableF4Toggle,
          'tableF4Toggle' + route.params.sono,
        );
        break;

      case 'ACunitMainToggle':
        setACunitTableToggle(!ACunittableToggle);
        await saveUserInLocalStorageAsync(
          !ACunittableToggle,
          'ACunittableToggle' + route.params.sono,
        );
        if (!ACunittableToggle === true) {
          setTableAC1Toggle(true);
          setTableAC2Toggle(true);
          setTableAC3Toggle(true);
          setTableAC4Toggle(true);
          await saveUserInLocalStorageAsync(
            true,
            'tableAC1Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            true,
            'tableAC2Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            true,
            'tableAC3Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            true,
            'tableAC4Toggle' + route.params.sono,
          );
        } else if (!ACunittableToggle === false) {
          setTableAC1Toggle(false);
          setTableAC2Toggle(false);
          setTableAC3Toggle(false);
          setTableAC4Toggle(false);
          await saveUserInLocalStorageAsync(
            false,
            'tableAC1Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            false,
            'tableAC2Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            false,
            'tableAC3Toggle' + route.params.sono,
          );
          await saveUserInLocalStorageAsync(
            false,
            'tableAC4Toggle' + route.params.sono,
          );
        }

        break;
      case 'AC1Toggle':
        setTableAC1Toggle(!tableAC1Toggle);
        if (!tableAC1Toggle === true) {
          if (tableAC2Toggle === true) {
            if (tableAC3Toggle === true) {
              if (tableAC4Toggle === true) {
                setACunitTableToggle(true);
                await saveUserInLocalStorageAsync(
                  true,
                  'ACunittableToggle' + route.params.sono,
                );
              }
            }
          }
        } else if (!tableAC1Toggle === false) {
          if (tableAC2Toggle === true) {
            if (tableAC3Toggle === true) {
              if (tableAC4Toggle === true) {
                setACunitTableToggle(false);
                await saveUserInLocalStorageAsync(
                  false,
                  'ACunittableToggle' + route.params.sono,
                );
              }
            }
          }
        }
        await saveUserInLocalStorageAsync(
          !tableAC1Toggle,
          'tableAC1Toggle' + route.params.sono,
        );
        break;
      case 'AC2Toggle':
        setTableAC2Toggle(!tableAC2Toggle);
        if (!tableAC2Toggle === true) {
          if (tableAC1Toggle === true) {
            if (tableAC3Toggle === true) {
              if (tableAC4Toggle === true) {
                setACunitTableToggle(true);
                await saveUserInLocalStorageAsync(
                  true,
                  'ACunittableToggle' + route.params.sono,
                );
              }
            }
          }
        } else if (!tableAC2Toggle === false) {
          if (tableAC1Toggle === true) {
            if (tableAC3Toggle === true) {
              if (tableAC4Toggle === true) {
                setACunitTableToggle(false);
                await saveUserInLocalStorageAsync(
                  false,
                  'ACunittableToggle' + route.params.sono,
                );
              }
            }
          }
        }
        await saveUserInLocalStorageAsync(
          !tableAC2Toggle,
          'tableAC2Toggle' + route.params.sono,
        );
        break;
      case 'AC3Toggle':
        setTableAC3Toggle(!tableAC3Toggle);
        if (!tableAC3Toggle === true) {
          if (tableAC1Toggle === true) {
            if (tableAC2Toggle === true) {
              if (tableAC4Toggle === true) {
                setACunitTableToggle(true);
                await saveUserInLocalStorageAsync(
                  true,
                  'ACunittableToggle' + route.params.sono,
                );
              }
            }
          }
        } else if (!tableAC3Toggle === false) {
          if (tableAC1Toggle === true) {
            if (tableAC2Toggle === true) {
              if (tableAC4Toggle === true) {
                setACunitTableToggle(false);
                await saveUserInLocalStorageAsync(
                  false,
                  'ACunittableToggle' + route.params.sono,
                );
              }
            }
          }
        }
        await saveUserInLocalStorageAsync(
          !tableAC3Toggle,
          'tableAC3Toggle' + route.params.sono,
        );
        break;
      case 'AC4Toggle':
        setTableAC4Toggle(!tableAC4Toggle);
        if (!tableAC4Toggle === true) {
          if (tableAC1Toggle === true) {
            if (tableAC2Toggle === true) {
              if (tableAC3Toggle === true) {
                setACunitTableToggle(true);
                await saveUserInLocalStorageAsync(
                  true,
                  'ACunittableToggle' + route.params.sono,
                );
              }
            }
          }
        } else if (!tableAC4Toggle === false) {
          if (tableAC1Toggle === true) {
            if (tableAC2Toggle === true) {
              if (tableAC3Toggle === true) {
                setACunitTableToggle(false);
                await saveUserInLocalStorageAsync(
                  false,
                  'ACunittableToggle' + route.params.sono,
                );
              }
            }
          }
        }
        await saveUserInLocalStorageAsync(
          !tableAC4Toggle,
          'tableAC4Toggle' + route.params.sono,
        );
        break;

      default:
        setToggle(!toggle);
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
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        searchIcon={false}
        title={'Steps'}
        onPressStatusFun={() => {
          if (enableStatus === true && jobstatusValue == 'In Progress') {
            selectStatusFun(jobstatusValue);
          } else if (jobstatusValue == 'Complete') {
            alert('work order is completed');
          } else {
            alert(
              'There are uncompleted steps. please complete before marking the work order as complete',
            );
          }
        }}
        // disabled={enableStatus === true ? false : true}
        // subtitle={showEdit === true ? 'Cancel' : 'Edit'}
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
            onPress={() => collapseFun('GenSteps')}>
            <Icon
              name={
                genStepsExpanded === true
                  ? 'chevron-down-outline'
                  : 'chevron-forward-outline'
              }
              size={17}
              color={'#000'}
            />
            <Text style={styles.incompletedTextUi}>GENERAL STEPS</Text>
          </TouchableOpacity>

          {genStepsExpanded === true && (
            <View>
              <View style={{flex: 0}}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{marginTop: 3}}>
                    <Text style={{color: 'grey'}}>
                      Complete these steps to move forward with the Job
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 15,
                      marginTop: 9,
                      height:
                        DocsArr.length > 0
                          ? (windowHeight * 25) / 100
                          : (windowHeight * 10) / 100,
                      width: (windowWidth * 90) / 100,
                      borderWidth: 1,
                      borderColor: 'black',
                      borderRadius: 3,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity onPress={savePickedFile}>
                        <View style={{flexDirection: 'row'}}>
                          <View>
                            <Icon name="md-attach" size={42} color="black" />
                          </View>
                          <View style={{marginLeft: 5}}>
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'black',
                              }}>
                              Attach a Document
                            </Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                              Required
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <View style={{marginTop: 10}}>
                        <ToggleSwitch
                          disabled={
                            jobstatusValue != '' &&
                            docToggle === true &&
                            jobstatusValue === 'Complete'
                              ? true
                              : false
                          }
                          isOn={docToggle} // There should be a state like this.state.isOn(Set default value)
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          // label='Example label'
                          // labelStyle={{color: 'black', fontWeight: '900'}}
                          size="small"
                          onToggle={() => setToggleFun('Docs')} //To update state
                          icon={
                            docToggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                        />
                      </View>
                    </View>

                    <View style={{marginTop: 10}}>
                      {DocsArr.length > 0 && (
                        <ScrollView
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          // contentContainerStyle={{flexDirection: 'row'}}
                        >
                          {DocsArr.map(item => (
                            <View
                              style={{marginRight: 8, backgroundColor: 'grey'}}
                              // onPress={() => PhotoEditFun(item)}
                            >
                              <Image
                                source={{uri: item.docUrl}}
                                style={{width: 100, height: 100}}
                              />
                              <View style={{justifyContent: 'flex-end'}}>
                                <Icon
                                  name="document"
                                  size={15}
                                  style={{
                                    position: 'absolute',
                                    alignSelf: 'flex-end',
                                    padding: 8,
                                  }}
                                  color={'#fff'}
                                />
                              </View>
                            </View>
                          ))}
                        </ScrollView>
                      )}
                    </View>
                  </View>
                </View>
              </View>

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
                    height:
                      PhotoArray.length > 0
                        ? (windowHeight * 25) / 100
                        : (windowHeight * 10) / 100,
                    width: (windowWidth * 90) / 100,
                    borderWidth: 1,
                    borderRadius: 3,
                    borderColor: 'black',
                    justifyContent: 'center',
                  }}>
                  {/* <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Photoscreen', {
                        sono: route.params.sono,
                      })
                    }> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Photoscreen', {
                          sono: route.params.sono,
                        })
                      }>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View>
                          <Icon
                            name="ios-camera"
                            size={40}
                            color="black"
                            style={{marginTop: 3}}
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Take a Photo of Job
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Required
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View style={{marginTop: 15}}>
                      <ToggleSwitch
                        disabled={
                          jobstatusValue != '' &&
                          photoToggle === true &&
                          jobstatusValue === 'Complete'
                            ? true
                            : false
                        }
                        isOn={photoToggle} // There should be a state like this.state.isOn(Set default value)
                        onColor="#26A688"
                        offColor="#E9EBEC"
                        // label='Example label'
                        // labelStyle={{color: 'black', fontWeight: '900'}}
                        size="small"
                        onToggle={() => setToggleFun('Photos')} //To update state
                        icon={
                          photoToggle === true ? (
                            <Icon name="checkmark-circle-outline" size={33} />
                          ) : (
                            <Icon name="time-outline" size={33} />
                          )
                        }
                      />
                    </View>
                  </View>
                  {/* </TouchableOpacity> */}
                  <View style={{marginTop: 10}}>
                    {PhotoArray.length > 0 && (
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        // contentContainerStyle={{flexDirection: 'row'}}
                      >
                        {PhotoArray.map(item => (
                          <TouchableOpacity
                            style={{marginRight: 8, backgroundColor: 'grey'}}
                            onPress={() => PhotoEditFun(item)}>
                            <Image
                              source={{uri: item.imgUrl}}
                              style={{width: 100, height: 100}}
                            />
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    )}
                  </View>
                </View>
              </View>

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
                    height:
                      VideoArray.length > 0
                        ? (windowHeight * 25) / 100
                        : (windowHeight * 10) / 100,
                    width: (windowWidth * 90) / 100,
                    borderWidth: 1,
                    borderRadius: 3,
                    borderColor: 'black',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Videoscreen', {
                          sono: route.params.sono,
                        })
                      }>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View>
                          <Icon
                            name="ios-videocam"
                            size={40}
                            color="black"
                            style={{marginTop: 3}}
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Take a Video of Job
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Required
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View style={{marginTop: 15}}>
                      <ToggleSwitch
                        disabled={
                          jobstatusValue != '' &&
                          videoToggle === true &&
                          jobstatusValue === 'Complete'
                            ? true
                            : false
                        }
                        isOn={videoToggle} // There should be a state like this.state.isOn(Set default value)
                        onColor="#26A688"
                        offColor="#E9EBEC"
                        // label='Example label'
                        // labelStyle={{color: 'black', fontWeight: '900'}}
                        size="small"
                        onToggle={() => setToggleFun('Videos')} //To update state
                        icon={
                          videoToggle === true ? (
                            <Icon name="checkmark-circle-outline" size={33} />
                          ) : (
                            <Icon name="time-outline" size={33} />
                          )
                        }
                      />
                    </View>
                  </View>

                  <View style={{marginTop: 10}}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      {VideoArray.map(item => (
                        <TouchableOpacity
                          onPress={() => VideoEditFun(item)}
                          style={{flex: 1, flexDirection: 'row'}}>
                          <Image
                            source={{uri: item.videoUrl}}
                            style={{width: 100, height: 100, marginLeft: 10}}
                            // resizeMode="contain"
                          />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={{marginTop: 10}} />

        {/* .......................................................EQuipment steps......................    */}

        <View>
          <TouchableOpacity
            style={styles.incompletedIconText}
            onPress={() => collapseFun('EquipSteps')}>
            <Icon
              name={
                EquipStepsExpanded === true
                  ? 'chevron-down-outline'
                  : 'chevron-forward-outline'
              }
              size={17}
              color={'#000'}
            />
            <Text style={styles.incompletedTextUi}>EQUIPMENT STEPS</Text>
          </TouchableOpacity>
          {EquipStepsExpanded === true && (
            <View>
              <View>
                <View style={{flex: 0}}>
                  <View style={{paddingHorizontal: 20, marginTop: 5}}>
                    <Text style={{fontSize: 15}}>
                      Steps to be Completed based on the Equipment
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        // paddingHorizontal: 15,
                        marginTop: 9,
                        height: (windowHeight * 14) / 100,
                        width: (windowWidth * 90) / 100,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 3,
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{padding: 5}}>
                            <Icon name="settings" size={35} color="black" />
                          </View>
                          <View style={{marginTop: 2}}>
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'black',
                                marginLeft: 5,
                              }}>
                              Add Equipment
                            </Text>
                            <Text
                              style={{
                                marginLeft: 5,
                                fontSize: 15,
                                fontWeight: 'bold',
                              }}>
                              Required
                            </Text>
                          </View>
                        </View>

                        <View style={{marginTop: 10, marginRight: 15}}>
                          <ToggleSwitch
                            disabled={
                              jobstatusValue != '' &&
                              equipAddToggle === true &&
                              jobstatusValue === 'Complete'
                                ? true
                                : false
                            }
                            isOn={equipAddToggle} // There should be a state like this.state.isOn(Set default value)
                            onColor="#26A688"
                            offColor="#E9EBEC"
                            // label='Example label'
                            // labelStyle={{color: 'black', fontWeight: '900'}}
                            size="small"
                            onToggle={() => setToggleFun('EquipmentAddToggle')} //To update state
                            icon={
                              equipAddToggle === true ? (
                                <Icon
                                  name="checkmark-circle-outline"
                                  size={33}
                                />
                              ) : (
                                <Icon name="time-outline" size={33} />
                              )
                            }
                          />
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        disabled={
                          jobstatusValue != '' &&
                          equipAddToggle === true &&
                          jobstatusValue === 'Complete'
                            ? true
                            : false
                        }>
                        <View
                          style={{
                            borderRadius: 4,
                            backgroundColor: '#a1a2a4',
                            height: 32,
                            marginTop: 3,
                            width: (windowWidth * 85) / 100,
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Icon
                              name="md-add"
                              size={25}
                              style={{marginTop: 4}}
                              color="black"
                            />
                            <Text
                              style={{
                                marginTop: 3,
                                marginLeft: 4,
                                fontSize: 18,
                                color: 'black',
                                fontWeight: 'bold',
                              }}>
                              Add
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {/* 
            <View style={{paddingHorizontal: 12, marginTop: 10}}>
        <Text style={{fontSize: 17}}>Today</Text>
      </View> */}

                <View
                  style={{
                    marginTop: 15,
                    height:
                      PhotoArray.length > 0
                        ? (windowHeight * 85) / 100
                        : (windowHeight * 70) / 100,
                    alignSelf: 'center',
                    width: (windowWidth * 90) / 100,
                    borderWidth: 1,
                    borderRadius: 2,
                    borderColor: 'black',
                  }}>
                  <View
                    style={{
                      borderRadius: 5,
                      // height: (windowHeight * 10) / 100,
                      // alignSelf: 'center',
                      width: (windowWidth * 86) / 100,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          // alignSelf: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{marginTop: 4, paddingHorizontal: 10}}>
                          <Text
                            style={{
                              marginTop: 4,
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Deep Fryer
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 16, fontWeight: '700'}}>
                              Serial No:
                            </Text>
                            <Text
                              style={{
                                marginLeft: 5,
                                fontSize: 16,
                                fontWeight: '700',
                              }}>
                              AJSGHF1934
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 16, fontWeight: '700'}}>
                              Modal:
                            </Text>
                            <Text
                              style={{
                                marginLeft: 5,
                                fontSize: 16,
                                fontWeight: '700',
                              }}>
                              1934KSF
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <View style={{flexDirection: 'column'}}>
                          <TouchableOpacity
                            onPress={() => setViewHeight(!viewHeight)}>
                            <Icon
                              name={
                                viewHeight === true
                                  ? 'chevron-down'
                                  : 'chevron-back-outline'
                              }
                              size={25}
                              style={{marginTop: 2, marginLeft: 8}}
                              color={'#000'}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                  {viewHeight === true && (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setEquipModalVisible(true);
                          // setEquipmentObject(it);
                        }}
                        style={{
                          marginRight: 5,
                          flexDirection: 'row',
                          alignSelf: 'flex-end',
                        }}>
                        <Text
                          style={{
                            marginRight: 2,
                            fontWeight: 'bold',
                            color: 'black',
                            letterSpacing: 0.4,
                          }}>
                          View Equipment
                        </Text>
                        <Icon
                          name={'chevron-forward'}
                          size={20}
                          style={{}}
                          color={'#000'}
                        />
                      </TouchableOpacity>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View
                          style={{flex: 1, flexDirection: 'row', marginTop: 4}}>
                          <Image
                            source={require('../Images/image1.jpg')}
                            style={{marginLeft: 10, width: 100, height: 100}}
                            // resizeMode="contain"
                          />

                          <Image
                            source={require('../Images/img2.jpg')}
                            style={{width: 100, height: 100, marginLeft: 10}}
                            // resizeMode="contain"
                          />
                          <Image
                            source={require('../Images/img2.jpg')}
                            style={{width: 100, height: 100, marginLeft: 10}}
                            // resizeMode="contain"
                          />
                          <Image
                            source={require('../Images/img2.jpg')}
                            style={{width: 100, height: 100, marginLeft: 10}}
                            // resizeMode="contain"
                          />
                          <Image
                            source={require('../Images/img2.jpg')}
                            style={{
                              width: 100,
                              height: 100,
                              marginRight: 20,
                              marginLeft: 10,
                            }}
                            // resizeMode="contain"
                          />
                        </View>
                      </ScrollView>
                      <View>
                        <View
                          style={{
                            // flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              // flex: 1,
                              // paddingHorizontal: 15,
                              marginTop: 9,
                              height: (windowHeight * 8) / 100,
                              width: (windowWidth * 84) / 100,
                              borderWidth: 1,
                              borderColor: 'black',
                              borderRadius: 3,
                              justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                Linking.openURL(
                                  'mailto:support@example.com?subject=SendMail&body=Description',
                                )
                              }
                              title="support@example.com">
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <View style={{flexDirection: 'row'}}>
                                  <View
                                    style={{
                                      marginTop: 5,
                                      padding: 5,
                                      marginLeft: 4,
                                    }}>
                                    <Icon name="mail" size={38} color="black" />
                                  </View>
                                  <View style={{marginTop: 5}}>
                                    <Text
                                      style={{
                                        fontSize: 17,
                                        letterSpacing: 0.5,
                                        fontWeight: 'bold',
                                        color: 'black',
                                        marginLeft: 4,
                                        marginTop: 5,
                                      }}>
                                      Email Customer
                                    </Text>
                                    <Text
                                      style={{
                                        marginLeft: 4,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                      }}>
                                      Required
                                    </Text>
                                    {/* <TextInput style={{ color: 'black', fontSize: 18 }} placeholder="Click Here to Type"></TextInput> */}
                                  </View>
                                </View>

                                <View style={{marginTop: 10, marginRight: 15}}>
                                  <ToggleSwitch
                                    disabled={
                                      jobstatusValue != '' &&
                                      DFEmailToggle === true &&
                                      jobstatusValue === 'Complete'
                                        ? true
                                        : false
                                    }
                                    isOn={DFEmailToggle} // There should be a state like this.state.isOn(Set default value)
                                    onColor="#26A688"
                                    offColor="#E9EBEC"
                                    // label='Example label'
                                    // labelStyle={{color: 'black', fontWeight: '900'}}
                                    size="small"
                                    onToggle={() =>
                                      setToggleFun('DeepFryerEmailCustToggle')
                                    }
                                    icon={
                                      DFEmailToggle === true ? (
                                        <Icon
                                          name="checkmark-circle-outline"
                                          size={33}
                                        />
                                      ) : (
                                        <Icon name="time-outline" size={33} />
                                      )
                                    }
                                  />
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>

                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Photoscreen', {
                              sono: route.params.sono,
                            })
                          }
                          style={{
                            //  flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              // flex: 1,
                              // paddingHorizontal: 15,
                              marginTop: 12,
                              // height: (windowHeight * 8) / 100,
                              // width: (windowWidth * 84) / 100,
                              height:
                                PhotoArray.length > 0
                                  ? (windowHeight * 25) / 100
                                  : (windowHeight * 10) / 100,
                              width: (windowWidth * 84) / 100,
                              borderWidth: 1,
                              borderColor: 'black',
                              borderRadius: 3,
                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <View
                                  style={{
                                    marginTop: 5,
                                    padding: 5,
                                    marginLeft: 4,
                                  }}>
                                  <Icon name="camera" size={38} color="black" />
                                </View>
                                <View style={{marginTop: 5}}>
                                  <Text
                                    style={{
                                      fontSize: 17,
                                      letterSpacing: 0.5,
                                      fontWeight: 'bold',
                                      color: 'black',
                                      marginLeft: 4,
                                      marginTop: 5,
                                    }}>
                                    Take Photo(s)
                                  </Text>
                                  <Text
                                    style={{
                                      marginLeft: 4,
                                      fontSize: 15,
                                      fontWeight: 'bold',
                                    }}>
                                    Required
                                  </Text>
                                </View>

                                {/* <TextInput style={{ color: 'black', fontSize: 18 }} placeholder="Click Here to Type"></TextInput> */}
                              </View>

                              <View style={{marginTop: 10, marginRight: 15}}>
                                <ToggleSwitch
                                  disabled={
                                    jobstatusValue != '' &&
                                    DFTakepicToggle === true &&
                                    jobstatusValue === 'Complete'
                                      ? true
                                      : false
                                  }
                                  isOn={DFTakepicToggle} // There should be a state like this.state.isOn(Set default value)
                                  onColor="#26A688"
                                  offColor="#E9EBEC"
                                  // label='Example label'
                                  // labelStyle={{color: 'black', fontWeight: '900'}}
                                  size="small"
                                  onToggle={() =>
                                    setToggleFun('DeepFryerTakePhotoToggle')
                                  } //To update state
                                  icon={
                                    DFTakepicToggle === true ? (
                                      <Icon
                                        name="checkmark-circle-outline"
                                        size={33}
                                      />
                                    ) : (
                                      <Icon name="time-outline" size={33} />
                                    )
                                  }
                                />
                              </View>
                            </View>

                            <View style={{marginTop: 3, marginLeft: 15}}>
                              {PhotoArray.length > 0 && (
                                <ScrollView
                                  horizontal={true}
                                  showsHorizontalScrollIndicator={false}
                                  // contentContainerStyle={{flexDirection: 'row'}}
                                >
                                  {PhotoArray.map(item => (
                                    <TouchableOpacity
                                      style={{
                                        marginRight: 8,
                                        backgroundColor: 'grey',
                                      }}
                                      onPress={() => PhotoEditFun(item)}>
                                      <Image
                                        source={{uri: item.imgUrl}}
                                        style={{width: 100, height: 100}}
                                      />
                                    </TouchableOpacity>
                                  ))}
                                </ScrollView>
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => setsignModalVisible(true)}>
                          <View
                            style={{
                              // flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                // flex: 1,
                                // paddingHorizontal: 15,
                                marginTop: 12,
                                height: (windowHeight * 8) / 100,
                                width: (windowWidth * 84) / 100,
                                borderWidth: 1,
                                borderColor: 'black',
                                borderRadius: 3,
                                justifyContent: 'center',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{flexDirection: 'row', marginLeft: 4}}>
                                  <View style={{marginTop: 5, padding: 5}}>
                                    <Icon
                                      name="create"
                                      size={38}
                                      color="black"
                                    />
                                  </View>
                                  <View style={{marginTop: 5}}>
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        letterSpacing: 0.5,
                                        fontWeight: 'bold',
                                        color: 'black',
                                        marginLeft: 4,
                                        marginTop: 5,
                                      }}>
                                      Customer Signature
                                    </Text>
                                    <Text
                                      style={{
                                        marginLeft: 3,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                      }}>
                                      Required
                                    </Text>
                                    {/* <TextInput  placeholder="Click Here to Type"></TextInput>  */}
                                  </View>
                                </View>

                                <View style={{marginTop: 10, marginRight: 15}}>
                                  <ToggleSwitch
                                    disabled={
                                      jobstatusValue != '' &&
                                      DFNotesToggle === true &&
                                      jobstatusValue === 'Complete'
                                        ? true
                                        : false
                                    }
                                    isOn={DFNotesToggle} // There should be a state like this.state.isOn(Set default value)
                                    onColor="#26A688"
                                    offColor="#E9EBEC"
                                    // label='Example label'
                                    // labelStyle={{color: 'black', fontWeight: '900'}}
                                    size="small"
                                    onToggle={() =>
                                      setToggleFun('DeepFryerNotesToggle')
                                    } //To update state
                                    icon={
                                      DFNotesToggle === true ? (
                                        <Icon
                                          name="checkmark-circle-outline"
                                          size={33}
                                        />
                                      ) : (
                                        <Icon name="time-outline" size={33} />
                                      )
                                    }
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            // flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              // flex: 1,
                              // paddingHorizontal: 15,
                              marginTop: 12,
                              height: (windowHeight * 8) / 100,
                              width: (windowWidth * 84) / 100,
                              borderWidth: 1,
                              borderColor: 'black',
                              borderRadius: 3,
                              justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate(FillouttheForm);
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <View style={{flexDirection: 'row'}}>
                                  <View
                                    style={{
                                      marginTop: 5,
                                      padding: 5,
                                      marginLeft: 4,
                                    }}>
                                    <Icon
                                      name="document"
                                      size={38}
                                      color="black"
                                    />
                                  </View>
                                  <View style={{marginTop: 5}}>
                                    <Text
                                      style={{
                                        fontSize: 17,
                                        letterSpacing: 0.5,
                                        fontWeight: 'bold',
                                        color: 'black',
                                        marginLeft: 4,
                                        marginTop: 5,
                                      }}>
                                      Complete a Form
                                    </Text>
                                    <Text
                                      style={{
                                        marginLeft: 4,
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                      }}>
                                      Requires action
                                    </Text>
                                    {/* <TextInput style={{ color: 'black', fontSize: 18 }} placeholder="Click Here to Type"></TextInput> */}
                                  </View>
                                </View>

                                <View style={{marginTop: 10, marginRight: 15}}>
                                  <ToggleSwitch
                                    disabled={
                                      jobstatusValue != '' &&
                                      DFCFormToggle === true &&
                                      jobstatusValue === 'Complete'
                                        ? true
                                        : false
                                    }
                                    isOn={DFCFormToggle} // There should be a state like this.state.isOn(Set default value)
                                    onColor="#26A688"
                                    offColor="#E9EBEC"
                                    // label='Example label'
                                    // labelStyle={{color: 'black', fontWeight: '900'}}
                                    size="small"
                                    onToggle={() =>
                                      setToggleFun(
                                        'DeepFryerCompleteFormToggle',
                                      )
                                    } //To update state
                                    icon={
                                      DFCFormToggle === true ? (
                                        <Icon
                                          name="checkmark-circle-outline"
                                          size={33}
                                        />
                                      ) : (
                                        <Icon name="time-outline" size={33} />
                                      )
                                    }
                                  />
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>

                <View
                  style={{
                    flex: 1,
                    marginTop: 15,
                    height:
                      acviewHeight === true
                        ? (windowHeight * 70) / 100
                        : (windowHeight * 11) / 100,
                    alignSelf: 'center',
                    width: (windowWidth * 90) / 100,
                    borderWidth: 1,
                  }}>
                  <View
                    style={{
                      borderRadius: 5,
                      height: (windowHeight * 10) / 100,
                      // alignSelf: 'center',
                      width: (windowWidth * 86) / 100,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          // alignSelf: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{marginTop: 4, paddingHorizontal: 10}}>
                          <Text
                            style={{
                              marginTop: 4,
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Ac Unit
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 16, fontWeight: '700'}}>
                              Serial No:
                            </Text>
                            <Text
                              style={{
                                marginLeft: 5,
                                fontSize: 16,
                                fontWeight: '700',
                              }}>
                              AJSGHF1934
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 16, fontWeight: '700'}}>
                              Modal:
                            </Text>
                            <Text
                              style={{
                                marginLeft: 5,
                                fontSize: 16,
                                fontWeight: '700',
                              }}>
                              1934KSF
                            </Text>
                          </View>

                          {/* <View
                     
                        style={{
                          flex:1,
                          marginRight: 5,
                          flexDirection: 'row',
                          alignSelf: 'flex-end',
                        }}>
                        <Text
                          style={{
                            marginRight: 2,
                            fontWeight: 'bold',
                            color: 'black',
                            letterSpacing: 0.4
                          }}>
                          View Equipment
                        </Text>
                        <Icon
                          name={'chevron-forward'}
                          size={20}
                          style={{}}
                          color={'#000'}
                        />
                        </View> */}
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{flexDirection: 'row', alignSelf: 'center'}}
                        onPress={() => setacViewHeight(!acviewHeight)}>
                        {/* <Icon
                  name="chevron-back"
                  size={18}
                  style={{ marginTop: 2, marginRight: 5 }}
                  color={'grey'}


                /> */}

                        <Icon
                          name={
                            acviewHeight === true
                              ? 'chevron-down'
                              : 'chevron-back-outline'
                          }
                          size={25}
                          style={{marginTop: 1}}
                          color={'#000'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {acviewHeight === true && (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setEquipModalVisible(true);
                          // setEquipmentObject(it);
                        }}
                        style={{
                          marginRight: 5,
                          flexDirection: 'row',
                          alignSelf: 'flex-end',
                        }}>
                        <Text
                          style={{
                            marginRight: 2,
                            fontWeight: 'bold',
                            color: 'black',
                            letterSpacing: 0.4,
                          }}>
                          View Equipment
                        </Text>
                        <Icon
                          name={'chevron-forward'}
                          size={20}
                          style={{}}
                          color={'#000'}
                        />
                      </TouchableOpacity>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View
                          style={{flex: 1, flexDirection: 'row', marginTop: 4}}>
                          <Image
                            source={require('../Images/image1.jpg')}
                            style={{marginLeft: 10, width: 100, height: 100}}
                            // resizeMode="contain"
                          />

                          <Image
                            source={require('../Images/img2.jpg')}
                            style={{width: 100, height: 100, marginLeft: 10}}
                            // resizeMode="contain"
                          />
                          <Image
                            source={require('../Images/img2.jpg')}
                            style={{width: 100, height: 100, marginLeft: 10}}
                            // resizeMode="contain"
                          />
                          <Image
                            source={require('../Images/img2.jpg')}
                            style={{width: 100, height: 100, marginLeft: 10}}
                            // resizeMode="contain"
                          />
                          <Image
                            source={require('../Images/img2.jpg')}
                            style={{
                              width: 100,
                              height: 100,
                              marginRight: 20,
                              marginLeft: 10,
                            }}
                            // resizeMode="contain"
                          />
                        </View>
                      </ScrollView>
                      <View>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              paddingHorizontal: 15,
                              marginTop: 10,
                              height: (windowHeight * 40) / 100,
                              width: (windowWidth * 84) / 100,
                              borderWidth: 1,
                              borderRadius: 5,
                              borderColor: 'black',
                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <View
                                style={{flexDirection: 'row', marginTop: 10}}>
                                <View
                                  style={{
                                    // height: 30,
                                    // width: 30,
                                    // backgroundColor: '#e9ebec',
                                    marginTop: 3,
                                  }}>
                                  <Icon
                                    name="ios-albums"
                                    size={30}
                                    color="black"
                                    style={{marginTop: 1}}
                                  />
                                </View>
                                <View style={{marginLeft: 10}}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}>
                                    Refill Freon
                                  </Text>
                                  <Text
                                    style={{fontSize: 15, fontWeight: 'bold'}}>
                                    Requires action
                                  </Text>
                                </View>
                              </View>

                              <View style={{marginTop: 15}}>
                                <ToggleSwitch
                                  disabled={
                                    jobstatusValue != '' &&
                                    ACunittableToggle === true &&
                                    jobstatusValue === 'Complete'
                                      ? true
                                      : false
                                  }
                                  isOn={ACunittableToggle} // There should be a state like this.state.isOn(Set default value)
                                  onColor="#26A688"
                                  offColor="#E9EBEC"
                                  // label='Example label'
                                  // labelStyle={{color: 'black', fontWeight: '900'}}
                                  size="small"
                                  onToggle={() =>
                                    setToggleFun('ACunitMainToggle')
                                  } //To update state
                                  icon={
                                    ACunittableToggle === true ? (
                                      <Icon
                                        name="checkmark-circle-outline"
                                        size={33}
                                      />
                                    ) : (
                                      <Icon name="time-outline" size={33} />
                                    )
                                  }
                                />
                              </View>
                            </View>

                            <View style={{marginTop: 10}}>
                              <View
                                style={{
                                  borderBottomColor: 'black',
                                  borderBottomWidth: 1,
                                }}
                              />
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <View
                                style={{flexDirection: 'row', marginTop: 10}}>
                                <View
                                  style={{
                                    // height: 30,
                                    // width: 30,
                                    // backgroundColor: '#e9ebec',
                                    marginTop: 3,
                                  }}>
                                  <Icon
                                    name="md-settings"
                                    size={30}
                                    color="black"
                                    style={{marginTop: 1}}
                                  />
                                </View>
                                <View style={{marginLeft: 10}}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}>
                                    Remove Caps
                                  </Text>
                                  <Text
                                    style={{fontSize: 15, fontWeight: 'bold'}}>
                                    Requires action
                                  </Text>
                                </View>
                              </View>

                              <View style={{marginTop: 15}}>
                                <ToggleSwitch
                                  disabled={
                                    jobstatusValue != '' &&
                                    tableAC1Toggle === true &&
                                    jobstatusValue === 'Complete'
                                      ? true
                                      : false
                                  }
                                  isOn={tableAC1Toggle} // There should be a state like this.state.isOn(Set default value)
                                  onColor="#26A688"
                                  offColor="#E9EBEC"
                                  // label='Example label'
                                  // labelStyle={{color: 'black', fontWeight: '900'}}
                                  size="small"
                                  onToggle={() => setToggleFun('AC1Toggle')} //To update state
                                  icon={
                                    tableAC1Toggle === true ? (
                                      <Icon
                                        name="checkmark-circle-outline"
                                        size={33}
                                      />
                                    ) : (
                                      <Icon name="time-outline" size={33} />
                                    )
                                  }
                                />
                              </View>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <View
                                style={{flexDirection: 'row', marginTop: 10}}>
                                <View
                                  style={{
                                    // height: 30,
                                    // width: 30,
                                    // backgroundColor: '#e9ebec',
                                    marginTop: 3,
                                  }}>
                                  <Icon
                                    name="md-eye"
                                    size={30}
                                    color="black"
                                    style={{marginTop: 1}}
                                  />
                                </View>
                                <View style={{marginLeft: 10}}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}>
                                    Hook Up Gauges
                                  </Text>
                                  <Text
                                    style={{fontSize: 15, fontWeight: 'bold'}}>
                                    Requires action
                                  </Text>
                                </View>
                              </View>

                              <View style={{marginTop: 15}}>
                                <ToggleSwitch
                                  disabled={
                                    jobstatusValue != '' &&
                                    tableAC2Toggle === true &&
                                    jobstatusValue === 'Complete'
                                      ? true
                                      : false
                                  }
                                  isOn={tableAC2Toggle} // There should be a state like this.state.isOn(Set default value)
                                  onColor="#26A688"
                                  offColor="#E9EBEC"
                                  // label='Example label'
                                  // labelStyle={{color: 'black', fontWeight: '900'}}
                                  size="small"
                                  onToggle={() => setToggleFun('AC2Toggle')} //To update state
                                  icon={
                                    tableAC2Toggle === true ? (
                                      <Icon
                                        name="checkmark-circle-outline"
                                        size={33}
                                      />
                                    ) : (
                                      <Icon name="time-outline" size={33} />
                                    )
                                  }
                                />
                              </View>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <View
                                style={{flexDirection: 'row', marginTop: 10}}>
                                <View
                                  style={{
                                    // height: 30,
                                    // width: 30,
                                    // backgroundColor: '#e9ebec',
                                    marginTop: 3,
                                  }}>
                                  <Icon
                                    name="logo-yen"
                                    size={30}
                                    color="black"
                                    style={{marginTop: 1}}
                                  />
                                </View>
                                <View style={{marginLeft: 10}}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}>
                                    Mark Freon Level
                                  </Text>
                                  <Text
                                    style={{fontSize: 15, fontWeight: 'bold'}}>
                                    Requires action
                                  </Text>
                                </View>
                              </View>

                              <View style={{marginTop: 15}}>
                                <ToggleSwitch
                                  disabled={
                                    jobstatusValue != '' &&
                                    tableAC3Toggle === true &&
                                    jobstatusValue === 'Complete'
                                      ? true
                                      : false
                                  }
                                  isOn={tableAC3Toggle} // There should be a state like this.state.isOn(Set default value)
                                  onColor="#26A688"
                                  offColor="#E9EBEC"
                                  // label='Example label'
                                  // labelStyle={{color: 'black', fontWeight: '900'}}
                                  size="small"
                                  onToggle={() => setToggleFun('AC3Toggle')} //To update state
                                  icon={
                                    tableAC3Toggle === true ? (
                                      <Icon
                                        name="checkmark-circle-outline"
                                        size={33}
                                      />
                                    ) : (
                                      <Icon name="time-outline" size={33} />
                                    )
                                  }
                                />
                              </View>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <View
                                style={{flexDirection: 'row', marginTop: 10}}>
                                <View
                                  style={{
                                    // height: 30,
                                    // width: 30,
                                    // backgroundColor: '#e9ebec',
                                    marginTop: 3,
                                  }}>
                                  <Icon
                                    name="calendar-outline"
                                    size={30}
                                    color="black"
                                    style={{marginTop: 1}}
                                  />
                                </View>
                                <View style={{marginLeft: 10}}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}>
                                    Adjust as Needed
                                  </Text>
                                  <Text
                                    style={{fontSize: 15, fontWeight: 'bold'}}>
                                    Requires action
                                  </Text>
                                </View>
                              </View>

                              <View style={{marginTop: 15}}>
                                <ToggleSwitch
                                  disabled={
                                    jobstatusValue != '' &&
                                    tableAC4Toggle === true &&
                                    jobstatusValue === 'Complete'
                                      ? true
                                      : false
                                  }
                                  isOn={tableAC4Toggle} // There should be a state like this.state.isOn(Set default value)
                                  onColor="#26A688"
                                  offColor="#E9EBEC"
                                  // label='Example label'
                                  // labelStyle={{color: 'black', fontWeight: '900'}}
                                  size="small"
                                  onToggle={() => setToggleFun('AC4Toggle')} //To update state
                                  icon={
                                    tableAC4Toggle === true ? (
                                      <Icon
                                        name="checkmark-circle-outline"
                                        size={33}
                                      />
                                    ) : (
                                      <Icon name="time-outline" size={33} />
                                    )
                                  }
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                </View>

                {/* <View style={{marginBottom: 50}}></View> */}
              </View>
            </View>
          )}
        </View>

        <View style={{marginTop: 10}} />

        {/* ................................................Closing Steps..................................... */}

        <View>
          <TouchableOpacity
            style={styles.incompletedIconText}
            onPress={() => collapseFun('ClosingSteps')}>
            <Icon
              name={
                ClosingStepsExpanded === true
                  ? 'chevron-down-outline'
                  : 'chevron-forward-outline'
              }
              size={17}
              color={'#000'}
            />
            <Text style={styles.incompletedTextUi}>CLOSING STEPS</Text>
          </TouchableOpacity>
          {ClosingStepsExpanded === true && (
            <View>
              <View style={{flex: 0}}>
                <View style={{paddingHorizontal: 20, marginTop: 5}}>
                  <Text style={{fontSize: 15, letterSpacing: 0.5}}>
                    Steps to confirm cleanup and finalization
                  </Text>
                </View>

                <TouchableOpacity onPress={() => setnotesModalVisible(true)}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        // paddingHorizontal: 15,
                        marginTop: 9,
                        height: (windowHeight * 10) / 100,
                        width: (windowWidth * 90) / 100,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 3,
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{padding: 5, marginLeft: 4}}>
                            <Icon
                              name="create-outline"
                              size={38}
                              color="black"
                            />
                          </View>
                          <View style={{marginTop: 5}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                letterSpacing: 0.5,
                                color: 'black',
                                marginLeft: 3,
                              }}>
                              Complete the Job Notes
                            </Text>
                            <Text
                              style={{
                                marginLeft: 4,
                                fontSize: 15,
                                fontWeight: 'bold',
                              }}>
                              Required
                            </Text>
                            {/* <TouchableOpacity
                            onPress={() => setnotesModalVisible(true)}>
                            <View
                              style={{
                                // paddingHorizontal: 15,
                                marginTop: 5,
                                backgroundColor: '#e8e9',
                                // // alignSelf: 'flex-start',
                                // alignItems: 'flex-start',
                                // justifyContent: 'flex-start',
                              }}>
                              <View
                                style={{
                                  height: 35,
                                  width: (windowWidth * 55) / 100,
                                  backgroundColor: '#e8e9f3',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  alignSelf: 'flex-start',
                                }}>
                                <Icon
                                  name="add-outline"
                                  size={20}
                                  color="#050709"
                                />
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
                          </TouchableOpacity> */}
                            {/* <TextInput
                            style={{
                              color: 'black',
                              fontSize: 18,
                              width: (windowWidth * 60) / 100,
                            }}
                            placeholder="Click Here to Type"></TextInput> */}
                          </View>
                        </View>

                        <View style={{marginTop: 10, marginRight: 15}}>
                          <ToggleSwitch
                            disabled={
                              jobstatusValue != '' &&
                              ClosingStepsNotesToggle === true &&
                              jobstatusValue === 'Complete'
                                ? true
                                : false
                            }
                            isOn={ClosingStepsNotesToggle} // There should be a state like this.state.isOn(Set default value)
                            onColor="#26A688"
                            offColor="#E9EBEC"
                            // label='Example label'
                            // labelStyle={{color: 'black', fontWeight: '900'}}
                            size="small"
                            onToggle={() =>
                              setToggleFun('CloseStepsNotesToggle')
                            } //To update state
                            icon={
                              ClosingStepsNotesToggle === true ? (
                                <Icon
                                  name="checkmark-circle-outline"
                                  size={33}
                                />
                              ) : (
                                <Icon name="time-outline" size={33} />
                              )
                            }
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{flex: 0}}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity>
                    <View
                      style={{
                        flex: 1,
                        // paddingHorizontal: 15,
                        marginTop: 12,
                        height:
                          PhotoArray.length > 0
                            ? (windowHeight * 25) / 100
                            : (windowHeight * 10) / 100,
                        width: (windowWidth * 90) / 100,
                        // height: (windowHeight * 10) / 100,
                        // width: (windowWidth * 90) / 100,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 3,
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View>
                            <Icon
                              name="md-camera"
                              size={40}
                              color="black"
                              style={{marginLeft: 8}}
                            />
                          </View>
                          <View>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: 'black',
                                marginLeft: 10,
                                letterSpacing: 0.4,
                              }}>
                              Take a Photo of The Site
                            </Text>
                            <Text
                              style={{
                                marginLeft: 10,
                                fontSize: 15,
                                fontWeight: 'bold',
                              }}>
                              Required
                            </Text>
                            {/* <TextInput placeholder=" Get Signature"></TextInput> */}
                          </View>
                        </View>

                        <View style={{marginTop: 10, marginRight: 15}}>
                          <ToggleSwitch
                            disabled={
                              jobstatusValue != '' &&
                              ClosingStepsSignToggle === true &&
                              jobstatusValue === 'Complete'
                                ? true
                                : false
                            }
                            isOn={ClosingStepsSignToggle} // There should be a state like this.state.isOn(Set default value)
                            onColor="#26A688"
                            offColor="#E9EBEC"
                            // label='Example label'
                            // labelStyle={{color: 'black', fontWeight: '900'}}
                            size="small"
                            onToggle={() =>
                              setToggleFun('CloseStepsSignToggle')
                            } //To update state
                            icon={
                              ClosingStepsSignToggle === true ? (
                                <Icon
                                  name="checkmark-circle-outline"
                                  size={33}
                                />
                              ) : (
                                <Icon name="time-outline" size={33} />
                              )
                            }
                          />
                        </View>
                      </View>
                      <View style={{marginTop: 3, marginLeft: 15}}>
                        {PhotoArray.length > 0 && (
                          <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            // contentContainerStyle={{flexDirection: 'row'}}
                          >
                            {PhotoArray.map(item => (
                              <TouchableOpacity
                                style={{
                                  marginRight: 8,
                                  backgroundColor: 'grey',
                                }}
                                onPress={() => PhotoEditFun(item)}>
                                <Image
                                  source={{uri: item.imgUrl}}
                                  style={{width: 100, height: 100}}
                                />
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

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
                      height:
                        VideoArray.length > 0
                          ? (windowHeight * 25) / 100
                          : (windowHeight * 10) / 100,
                      width: (windowWidth * 90) / 100,
                      borderWidth: 1,
                      borderRadius: 3,
                      borderColor: 'black',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Videoscreen', {
                            sono: route.params.sono,
                          })
                        }>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                          <View>
                            <Icon
                              name="ios-videocam"
                              size={35}
                              color="black"
                              style={{marginTop: 3}}
                            />
                          </View>
                          <View style={{marginLeft: 10}}>
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'black',
                              }}>
                              Take a Video of The Job
                            </Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                              Required
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <View style={{marginTop: 15}}>
                        <ToggleSwitch
                          disabled={
                            jobstatusValue != '' &&
                            videoToggle === true &&
                            jobstatusValue === 'Complete'
                              ? true
                              : false
                          }
                          isOn={videoToggle} // There should be a state like this.state.isOn(Set default value)
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          // label='Example label'
                          // labelStyle={{color: 'black', fontWeight: '900'}}
                          size="small"
                          onToggle={() => setToggleFun('Videos')} //To update state
                          icon={
                            videoToggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                        />
                      </View>
                    </View>

                    <View style={{marginTop: 10}}>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {VideoArray.map(item => (
                          <TouchableOpacity
                            onPress={() => VideoEditFun(item)}
                            style={{flex: 1, flexDirection: 'row'}}>
                            <Image
                              source={{uri: item.videoUrl}}
                              style={{width: 100, height: 100, marginLeft: 10}}
                              // resizeMode="contain"
                            />
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{flex: 0}}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 15,
                      marginTop: 10,
                      height: (windowHeight * 40) / 100,
                      width: (windowWidth * 90) / 100,
                      borderWidth: 1,
                      borderRadius: 3,
                      borderColor: 'black',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View
                          style={{
                            // height: 30,
                            // width: 30,
                            // backgroundColor: '#e9ebec',
                            marginTop: 3,
                          }}>
                          <Icon
                            name="ios-albums"
                            size={30}
                            color="black"
                            style={{marginTop: 1}}
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Additional Work
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Required
                          </Text>
                        </View>
                      </View>

                      <View style={{marginTop: 15}}>
                        <ToggleSwitch
                          disabled={
                            jobstatusValue != '' &&
                            tableFinalizeToggle === true &&
                            jobstatusValue === 'Complete'
                              ? true
                              : false
                          }
                          isOn={tableFinalizeToggle} // There should be a state like this.state.isOn(Set default value)
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          // label='Example label'
                          // labelStyle={{color: 'black', fontWeight: '900'}}
                          size="small"
                          onToggle={() => setToggleFun('FinalizeMainToggle')} //To update state
                          icon={
                            tableFinalizeToggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                        />
                      </View>
                    </View>

                    <View style={{marginTop: 10}}>
                      <View
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: 1,
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View
                          style={{
                            // height: 30,
                            // width: 30,
                            // backgroundColor: '#e9ebec',
                            marginTop: 3,
                          }}>
                          <Icon
                            name="md-contract"
                            size={30}
                            color="black"
                            style={{marginTop: 1}}
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Regrease Everything
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Not Required
                          </Text>
                        </View>
                      </View>

                      <View style={{marginTop: 15}}>
                        <ToggleSwitch
                          disabled={
                            jobstatusValue != '' &&
                            tableF1Toggle === true &&
                            jobstatusValue === 'Complete'
                              ? true
                              : false
                          }
                          isOn={tableF1Toggle} // There should be a state like this.state.isOn(Set default value)
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          // label='Example label'
                          // labelStyle={{color: 'black', fontWeight: '900'}}
                          size="small"
                          onToggle={() => setToggleFun('F1Toggle')} //To update state
                          icon={
                            tableF1Toggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View
                          style={{
                            // height: 30,
                            // width: 30,
                            // backgroundColor: '#e9ebec',
                            marginTop: 3,
                          }}>
                          <Icon
                            name="md-eye"
                            size={30}
                            color="black"
                            style={{marginTop: 1}}
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Empty Grease Pans
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Not Required
                          </Text>
                        </View>
                      </View>

                      <View style={{marginTop: 15}}>
                        <ToggleSwitch
                          disabled={
                            jobstatusValue != '' &&
                            tableF2Toggle === true &&
                            jobstatusValue === 'Complete'
                              ? true
                              : false
                          }
                          isOn={tableF2Toggle} // There should be a state like this.state.isOn(Set default value)
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          // label='Example label'
                          // labelStyle={{color: 'black', fontWeight: '900'}}
                          size="small"
                          onToggle={() => setToggleFun('F2Toggle')} //To update state
                          icon={
                            tableF2Toggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View
                          style={{
                            // height: 30,
                            // width: 30,
                            // backgroundColor: '#e9ebec',
                            marginTop: 3,
                          }}>
                          <Icon
                            name="logo-yen"
                            size={30}
                            color="black"
                            style={{marginTop: 1}}
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Clean Up Tools
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Not Required
                          </Text>
                        </View>
                      </View>

                      <View style={{marginTop: 15}}>
                        <ToggleSwitch
                          disabled={
                            jobstatusValue != '' &&
                            tableF3Toggle === true &&
                            jobstatusValue === 'Complete'
                              ? true
                              : false
                          }
                          isOn={tableF3Toggle} // There should be a state like this.state.isOn(Set default value)
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          // label='Example label'
                          // labelStyle={{color: 'black', fontWeight: '900'}}
                          size="small"
                          onToggle={() => setToggleFun('F3Toggle')} //To update state
                          icon={
                            tableF3Toggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View
                          style={{
                            // height: 30,
                            // width: 30,
                            // backgroundColor: '#e9ebec',
                            marginTop: 3,
                          }}>
                          <Icon
                            name="calendar-outline"
                            size={30}
                            color="black"
                            style={{marginTop: 1}}
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Clean Up Cardboard
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Not Required
                          </Text>
                        </View>
                      </View>

                      <View style={{marginTop: 15}}>
                        <ToggleSwitch
                          disabled={
                            jobstatusValue != '' &&
                            tableF4Toggle === true &&
                            jobstatusValue === 'Complete'
                              ? true
                              : false
                          }
                          isOn={tableF4Toggle} // There should be a state like this.state.isOn(Set default value)
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          // label='Example label'
                          // labelStyle={{color: 'black', fontWeight: '900'}}
                          size="small"
                          onToggle={() => setToggleFun('F4Toggle')} //To update state
                          icon={
                            tableF4Toggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* ..................................................Possibel Revenue Steps..................................... */}

        <View style={{marginTop: 10}}>
          <TouchableOpacity
            style={styles.incompletedIconText}
            onPress={() => collapseFun('PossibleSteps')}>
            <Icon
              name={
                PossibleStepsExpanded === true
                  ? 'chevron-down-outline'
                  : 'chevron-forward-outline'
              }
              size={17}
              color={'#000'}
            />
            <Text style={styles.incompletedTextUi}>POSSIBLE REVENUES</Text>
          </TouchableOpacity>
          {PossibleStepsExpanded === true && (
            <View>
              <View style={{flex: 0}}>
                <View style={{paddingHorizontal: 20, marginTop: 5}}>
                  <Text style={{fontSize: 15}}>
                    Additional Steps that can be added for a fee.
                  </Text>
                </View>

                <TouchableOpacity onPress={() => setnotesModalVisible(true)}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        // paddingHorizontal: 15,
                        marginTop: 9,
                        height: (windowHeight * 10) / 100,
                        width: (windowWidth * 90) / 100,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 3,
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{marginTop: 2, padding: 5, marginLeft: 4}}>
                            <Icon
                              name="create-outline"
                              size={38}
                              color="black"
                            />
                          </View>
                          <View style={{marginTop: 5}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                letterSpacing: 0.5,
                                color: 'black',
                                marginLeft: 3,
                              }}>
                              Add Additional Notes
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                marginLeft: 4,
                              }}>
                              Not Required
                            </Text>
                            {/* <TouchableOpacity
                            onPress={() => setnotesModalVisible(true)}>
                            <View
                              style={{
                                // paddingHorizontal: 15,
                                marginTop: 5,
                                backgroundColor: '#e8e9',
                                // // alignSelf: 'flex-start',
                                // alignItems: 'flex-start',
                                // justifyContent: 'flex-start',
                              }}>
                              <View
                                style={{
                                  height: 35,
                                  width: (windowWidth * 55) / 100,
                                  backgroundColor: '#e8e9f3',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  alignSelf: 'flex-start',
                                }}>
                                <Icon
                                  name="add-outline"
                                  size={20}
                                  color="#050709"
                                />
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
                          </TouchableOpacity> */}
                          </View>
                        </View>

                        <View style={{marginTop: 10, marginRight: 15}}>
                          <ToggleSwitch
                            disabled={
                              jobstatusValue != '' &&
                              PRStepsNotesToggle === true &&
                              jobstatusValue === 'Complete'
                                ? true
                                : false
                            }
                            isOn={PRStepsNotesToggle} // There should be a state like this.state.isOn(Set default value)
                            onColor="#26A688"
                            offColor="#E9EBEC"
                            // label='Example label'
                            // labelStyle={{color: 'black', fontWeight: '900'}}
                            size="small"
                            onToggle={() =>
                              setToggleFun('PossibleRevenueStepsNotesToggle')
                            } //To update state
                            icon={
                              PRStepsNotesToggle === true ? (
                                <Icon
                                  name="checkmark-circle-outline"
                                  size={33}
                                />
                              ) : (
                                <Icon name="time-outline" size={33} />
                              )
                            }
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{flex: 0}}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => setsignModalVisible(true)}>
                    <View
                      style={{
                        flex: 1,
                        // paddingHorizontal: 15,
                        marginTop: 9,
                        height: (windowHeight * 10) / 100,
                        width: (windowWidth * 90) / 100,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 3,
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View>
                            <Icon
                              name="md-attach"
                              size={45}
                              color="black"
                              style={{marginLeft: 4}}
                            />
                          </View>
                          <View>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: 'black',
                                letterSpacing: 0.5,
                                marginLeft: 3,
                              }}>
                              Get Customer Signature
                            </Text>
                            <Text
                              style={{
                                color: 'grey',
                                fontSize: 15,
                                fontWeight: 'bold',
                                marginLeft: 4,
                              }}>
                              Not Required
                            </Text>
                          </View>
                        </View>

                        <View style={{marginTop: 10, marginRight: 15}}>
                          <ToggleSwitch
                            disabled={
                              jobstatusValue != '' &&
                              PRStepsSignToggle === true &&
                              jobstatusValue === 'Complete'
                                ? true
                                : false
                            }
                            isOn={PRStepsSignToggle} // There should be a state like this.state.isOn(Set default value)
                            onColor="#26A688"
                            offColor="#E9EBEC"
                            // label='Example label'
                            // labelStyle={{color: 'black', fontWeight: '900'}}
                            size="small"
                            onToggle={() =>
                              setToggleFun('PossibleRevenueStepsSignToggle')
                            } //To update state
                            icon={
                              PRStepsSignToggle === true ? (
                                <Icon
                                  name="checkmark-circle-outline"
                                  size={33}
                                />
                              ) : (
                                <Icon name="time-outline" size={33} />
                              )
                            }
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flex: 0}}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 15,
                      marginTop: 10,
                      height: (windowHeight * 40) / 100,
                      width: (windowWidth * 90) / 100,
                      borderWidth: 1,
                      borderRadius: 3,
                      borderColor: 'black',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View
                          style={{
                            // height: 30,
                            // width: 30,
                            // backgroundColor: '#e9ebec',
                            marginTop: 3,
                          }}>
                          <Icon
                            name="ios-albums"
                            size={30}
                            color="black"
                            style={{marginTop: 1}}
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Additional Work
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Not Required
                          </Text>
                        </View>
                      </View>

                      <View style={{marginTop: 15}}>
                        <ToggleSwitch
                          disabled={
                            jobstatusValue != '' &&
                            tableHToggle === true &&
                            jobstatusValue === 'Complete'
                              ? true
                              : false
                          }
                          isOn={tableHToggle} // There should be a state like this.state.isOn(Set default value)
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          // label='Example label'
                          // labelStyle={{color: 'black', fontWeight: '900'}}
                          size="small"
                          onToggle={() => setToggleFun('MainToggle')} //To update state
                          icon={
                            tableHToggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                        />
                      </View>
                    </View>

                    <View style={{marginTop: 10}}>
                      <View
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: 1,
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View
                          style={{
                            // height: 30,
                            // width: 30,
                            // backgroundColor: '#e9ebec',
                            marginTop: 3,
                          }}>
                          <Icon
                            name="md-contract"
                            size={30}
                            color="black"
                            style={{marginTop: 1}}
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Regrease Everything
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Not Required
                          </Text>
                        </View>
                      </View>

                      <View style={{marginTop: 15}}>
                        <ToggleSwitch
                          disabled={
                            jobstatusValue != '' &&
                            tables1Toggle === true &&
                            jobstatusValue === 'Complete'
                              ? true
                              : false
                          }
                          isOn={tables1Toggle} // There should be a state like this.state.isOn(Set default value)
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          // label='Example label'
                          // labelStyle={{color: 'black', fontWeight: '900'}}
                          size="small"
                          onToggle={() => setToggleFun('s1Toggle')} //To update state
                          icon={
                            tables1Toggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View
                          style={{
                            // height: 30,
                            // width: 30,
                            // backgroundColor: '#e9ebec',
                            marginTop: 3,
                          }}>
                          <Icon
                            name="md-eye"
                            size={30}
                            color="black"
                            style={{marginTop: 1}}
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Empty Grease Pans
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Not Required
                          </Text>
                        </View>
                      </View>

                      <View style={{marginTop: 15}}>
                        <ToggleSwitch
                          disabled={
                            jobstatusValue != '' &&
                            tables2Toggle === true &&
                            jobstatusValue === 'Complete'
                              ? true
                              : false
                          }
                          isOn={tables2Toggle} // There should be a state like this.state.isOn(Set default value)
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          // label='Example label'
                          // labelStyle={{color: 'black', fontWeight: '900'}}
                          size="small"
                          onToggle={() => setToggleFun('s2Toggle')} //To update state
                          icon={
                            tables2Toggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View
                          style={{
                            // height: 30,
                            // width: 30,
                            // backgroundColor: '#e9ebec',
                            marginTop: 3,
                          }}>
                          <Icon
                            name="logo-yen"
                            size={30}
                            color="black"
                            style={{marginTop: 1}}
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Clean Up Tools
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Not Required
                          </Text>
                        </View>
                      </View>

                      <View style={{marginTop: 15}}>
                        <ToggleSwitch
                          disabled={
                            jobstatusValue != '' &&
                            tables3Toggle === true &&
                            jobstatusValue === 'Complete'
                              ? true
                              : false
                          }
                          isOn={tables3Toggle} // There should be a state like this.state.isOn(Set default value)
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          // label='Example label'
                          // labelStyle={{color: 'black', fontWeight: '900'}}
                          size="small"
                          onToggle={() => setToggleFun('s3Toggle')} //To update state
                          icon={
                            tables3Toggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View
                          style={{
                            // height: 30,
                            // width: 30,
                            // backgroundColor: '#e9ebec',
                            marginTop: 3,
                          }}>
                          <Icon
                            name="calendar-outline"
                            size={30}
                            color="black"
                            style={{marginTop: 1}}
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Clean Up Cardboard
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Not Required
                          </Text>
                        </View>
                      </View>

                      <View style={{marginTop: 15}}>
                        <ToggleSwitch
                          disabled={
                            jobstatusValue != '' &&
                            tables4Toggle === true &&
                            jobstatusValue === 'Complete'
                              ? true
                              : false
                          }
                          isOn={tables4Toggle} // There should be a state like this.state.isOn(Set default value)
                          onColor="#26A688"
                          offColor="#E9EBEC"
                          // label='Example label'
                          // labelStyle={{color: 'black', fontWeight: '900'}}
                          size="small"
                          onToggle={() => setToggleFun('s4Toggle')} //To update state
                          icon={
                            tables4Toggle === true ? (
                              <Icon name="checkmark-circle-outline" size={33} />
                            ) : (
                              <Icon name="time-outline" size={33} />
                            )
                          }
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
        <View style={{marginBottom: 100}}></View>

        {/* ...................................................Add Equip Modal................... */}
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
                      <Text style={{fontSize: 12, fontWeight: '200'}}>
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
                      <Text style={{fontSize: 12, fontWeight: '400'}}>
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
                      <Text style={{fontSize: 12, fontWeight: '400'}}>
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
                        </TextInput> */}
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
                                eqType === true ? 'chevron-up' : 'chevron-down'
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
                                portBol === true ? 'chevron-up' : 'chevron-down'
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
                          /> */}
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
                    <View style={{marginTop: 10}}>
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
                      <View style={{marginTop: 20}}>
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

        {/* ...............................................SignatureModal........................ */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={signModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setsignModalVisible(!signModalVisible);
          }}>
          <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => setsignModalVisible(false)}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <View style={styles.notescenteredView}>
                <TouchableWithoutFeedback style={styles.SignAddmodalView}>
                  <View style={styles.SignAddmodalView}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        height: (windowHeight * 15) / 100,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '700',
                            color: '#000',
                            letterSpacing: 0.5,
                            lineHeight: 22,
                            marginTop: 10,
                          }}>
                          Signature
                        </Text>
                        <Icon
                          name="close-circle-outline"
                          size={20}
                          style={{marginTop: 10}}
                          color={'#000'}
                          onPress={() => setsignModalVisible(false)}
                        />
                      </View>
                      <View>
                        <SignatureCapture
                          ref={signatureView}
                          style={styles.signature}
                          onSaveEvent={_onSaveEvent}
                          // onDragEvent={_onDragEvent}
                          saveImageFileInExtStorage={false}
                          showNativeButtons={false}
                          showTitleLabel={false}
                          backgroundColor="#EFF0F1"
                          strokeColor="#000000"
                          minStrokeWidth={4}
                          maxStrokeWidth={4}
                          viewMode={'portrait'}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#000',
                            textTransform: 'uppercase',
                            letterSpacing: 1.5,
                            fontWeight: '700',
                            marginTop: 10,
                          }}>
                          Click to use previous Signatures
                        </Text>
                        <Image
                          source={{uri: signdata}}
                          style={{
                            height: 80,
                            width: '100%',
                            marginTop: 10,
                            // overflow: 'hidden',
                            borderRadius: 6,
                          }}
                          resizeMode="stretch"
                        />
                      </View>
                      <TouchableOpacity
                        onPress={saveSign}
                        style={{
                          alignItems: 'center',
                          height: 40,
                          width: (windowWidth * 90) / 100,
                          backgroundColor: 'black',
                          justifyContent: 'center',
                          borderRadius: 30 / 4,
                          marginTop: 25,
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
                </TouchableWithoutFeedback>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>
        {/* ....................................................Attach Modal....................... */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={attachModalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setattachModalVisible(!attachModalVisible);
          }}>
          <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => setattachModalVisible(false)}
              style={{
                flex: 1,
                // justifyContent: 'center',
                // alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <View>
                <TouchableWithoutFeedback style={styles.AttachDocmodalView}>
                  <View style={styles.AttachDocmodalView}>
                    <View
                      style={{
                        padding: 20,
                        // justifyContent: 'space-around',
                        height: (windowHeight * 20) / 100,
                      }}>
                      {/* <TextInput
                          placeholder="Please Input Note"
                          style={{
                            borderWidth: 1,
                            borderRadius:5,
                            borderColor: 'grey',
                            height: 30,
                            marginLeft:10,
                            // marginTop: 10,
                            width: (windowWidth * 60) / 100,
                            color: '#000',
                          }}
                          
                        /> */}
                      {/* <View
                          style={{
                            marginLeft: 20,
                            flexDirection: 'row',
                            // borderWidth: 1,
                            borderColor: '#000',
                            width: (windowWidth * 70) / 100,
                            height: 30,
                            backgroundColor: '#f2f2f2',
                            borderRadius: 5,
                            // paddingBottom: 10,
                          }}> */}

                      {/* <Icon
                            name="happy"
                            color="grey"
                            size={18}
                            style={{ marginTop: 5, marginRight: 10 }}
                          />
                          <Icon
                            name="mic"
                            color="grey"
                            size={18}
                            style={{marginTop: 5, marginRight: 10}}
                          /> */}
                      {/* </View> */}
                      {/* </View> */}
                      {/* <TextInput
                          placeholder="Please Input Note"
                          style={{
                            borderWidth: 1,
                            borderColor: 'grey',
                            height: 40,
                            marginTop: 10,
                            width: (windowWidth * 89) / 100,
                            color: '#000',
                          }}
                        /> */}
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            padding: 20,
                          }}>
                          <View>
                            <View
                              style={{
                                height: 50,
                                width: 50,
                                borderRadius: 25,
                                backgroundColor: '#fce8e6',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Icon
                                name="chatbox"
                                size={25}
                                color={'#e1463c'}
                              />
                            </View>
                            <View style={{marginTop: 4, marginLeft: 5}}>
                              <Text style={{fontSize: 15}}>GIFs</Text>
                            </View>
                          </View>

                          <View>
                            <View
                              style={{
                                height: 50,
                                width: 50,
                                borderRadius: 25,
                                backgroundColor: '#feefe3',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Icon
                                name="logo-google"
                                size={25}
                                color={'#d5711b'}
                              />
                            </View>
                            <View style={{marginTop: 4}}>
                              <Text style={{fontSize: 15}}>Stickers</Text>
                            </View>
                          </View>

                          <View>
                            <View
                              style={{
                                height: 50,
                                width: 50,
                                borderRadius: 25,
                                backgroundColor: '#f3e8fd',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Icon
                                name="color-palette"
                                size={25}
                                color={'#9655ce'}
                              />
                            </View>
                            <View style={{marginTop: 4, marginLeft: 5}}>
                              <Text style={{fontSize: 15}}>Files</Text>
                            </View>
                          </View>

                          <View>
                            <View
                              style={{
                                height: 50,
                                width: 50,
                                borderRadius: 25,
                                backgroundColor: '#e6f4ea',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 5,
                              }}>
                              <Icon
                                name="location"
                                size={25}
                                color={'#34a856'}
                              />
                            </View>
                            <View style={{marginTop: 4}}>
                              <Text style={{fontSize: 15}}>Location</Text>
                            </View>
                          </View>
                        </View>

                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                              padding: 20,
                            }}>
                            <View>
                              <View
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 25,
                                  backgroundColor: '#e8f0fe',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginLeft: 10,
                                }}>
                                <Icon
                                  name="person"
                                  size={25}
                                  color={'#1e77ec'}
                                />
                              </View>
                              <View style={{marginTop: 4, marginLeft: 3}}>
                                <Text style={{fontSize: 15}}>Contact</Text>
                              </View>
                            </View>

                            <View>
                              <View
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 25,
                                  backgroundColor: '#feefe3',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginLeft: 15,
                                }}>
                                <Icon name="time" size={25} color={'#d5711b'} />
                              </View>
                              <View style={{marginTop: 4, marginLeft: 10}}>
                                <Text style={{fontSize: 15}}>Schedule</Text>
                              </View>
                            </View>

                            <View>
                              <View
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 25,
                                  backgroundColor: '#fef7e0',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginLeft: 10,
                                }}>
                                <Icon
                                  name="color-palette"
                                  size={25}
                                  color={'#eeb638'}
                                />
                              </View>
                              <View style={{marginTop: 4, marginLeft: 10}}>
                                <Text style={{fontSize: 15}}>Weather</Text>
                              </View>
                            </View>

                            <View>
                              <View
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 25,
                                  backgroundColor: '#fde7f3',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginLeft: 15,
                                }}>
                                <Icon
                                  name="location"
                                  size={25}
                                  color={'#e41d8a'}
                                />
                              </View>
                              <View style={{marginTop: 4}}>
                                <Text style={{fontSize: 15}}>Restaurants</Text>
                              </View>
                            </View>
                          </View>
                        </View>

                        {/* <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: '#00A36C',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="chatbox" size={35} color={'white'} />
              </View>
              <View>
                <Text
                  style={{fontWeight: 'bold', color: '#000', lineHeight: 30}}>
                  Replies
                </Text>
              </View>
            </View>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: '#43C6DB',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="logo-google" size={35} color={'white'} />
              </View>
              <View>
                <Text
                  style={{fontWeight: 'bold', color: '#000', lineHeight: 30}}>
                  Glympse
                </Text>
              </View>
            </View>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: '#FFA500',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="color-palette" size={35} color={'white'} />
              </View>
              <View>
                <Text
                  style={{fontWeight: 'bold', color: '#000', lineHeight: 30}}>
                  Colluge
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="ellipsis-vertical" size={35} color={'white'} />
              </View>
              <View>
                <Text
                  style={{fontWeight: 'bold', color: '#000', lineHeight: 30}}>
                  More
                </Text>
              </View>
            </View>
          </View> */}

                        <View style={{marginBottom: 10}}></View>
                      </View>

                      {/* <View>
                        <Text>jo</Text>
                      </View> */}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>

        {/* ...................................................Equipinfo modal........................ */}
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
                        Air Conditioning Unit
                        {/* {EquipmentObject.description} */}
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
                  {/* <View
                  style={{
                    borderBottomColor: '#d3d3d3',
                    borderBottomWidth: 3,
                    marginTop: 5,
                    width: '95%',
                    alignSelf: 'center',
                  }}
                /> */}

                  <View style={{flex: 1}}>
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
                                  <Text style={{marginLeft: 3}}>
                                    Jan 12 2022
                                  </Text>
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
                                  <Text style={{marginLeft: 3}}>
                                    Jan 12 2022
                                  </Text>
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
                                    style={{marginTop: 2}}
                                    color={'#000'}
                                  />
                                </View>
                                <View>
                                  <Text style={{marginLeft: 3}}>
                                    Jan 12 2022
                                  </Text>
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

                          {/* <View style={{ marginTop: 10 }}>
                                                    <Text style={{ textDecorationLine: 'underline', textAlign: 'center', fontSize: 17, color: 'blue' }}>Click Here to Equipment Attachments</Text>
                                                </View> */}

                          <View style={{marginBottom: 50}}></View>
                        </View>
                      </TouchableWithoutFeedback>
                    </ScrollView>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={notesModalVisible}
        onRequestClose={() => {
          setnotesModalVisible(!notesModalVisible);
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
                        placeholder=" Title"
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
  SignAddmodalView: {
    // justifyContent: 'flex-end',
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    // padding: 15,
    marginTop: (windowHeight * 70) / 100,
    alignItems: 'center',
    shadowColor: '#000',
    // borderRadius:20,
    height: (windowHeight * 50) / 100,
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
  AttachDocmodalView: {
    // justifyContent: 'flex-end',
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    // padding: 15,
    marginTop: (windowHeight * 60) / 100,
    // alignItems: 'center',
    shadowColor: '#000',
    // borderRadius:20,
    height: (windowHeight * 40) / 100,
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

  incompletedTextUi: {
    color: '#050709',
    fontSize: 16,
    // fontWeight: '500',
    fontFamily: 'Sofia_Pro_Regular',
    paddingLeft: 8,
    lineHeight: 18,
    letterSpacing: 0.4,
    // fontWeight: 'bold',
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
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 0.1,
    marginTop: 20,
    borderRadius: 6,
    // height:200,
    // marginBottom: 20,
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
  notescenteredView: {
    height: 240,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
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
    //  height: (windowHeight *25) / 100,
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
});

export default StepsTab;
