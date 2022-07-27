import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Share,
  TextInput,
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
import { saveUserInLocalStorageAsync } from '../services/LocalStorage';
import { getUserFromStorageAsync } from '../services/LocalStorage';
import { getworkordersasync, workorderDetailsasync } from '../services/Services';
import { reportLogBoxError } from 'react-native/Libraries/LogBox/Data/LogBoxData';
import ToggleSwitch from '../components/ToggleSwitch';
// import Toast from 'react-native-simple-toast';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddtoCallScreen = props => {
  let network = ConnectionCheck();
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [sitevisitExpanded, setsitevisitExpanded] = React.useState(true);
  const [communicationsExpanded, setcommunicationsExpanded] = React.useState(true);
  const [prevjobExpanded, setprevjobExpanded] = React.useState(true);
  const [cmpvExpanded, setcmpvExpanded] = React.useState(true);
  const [contactModalVisible, setcontactModalVisible] = React.useState(false);
  const [EquipModalVisible, setEquipModalVisible] = React.useState(false);
  const [workorders, setworkorders] = useState([]);
  const [equipmentItem, setEquipmentItem] = useState({});
  const [toggle, setToggle] = useState(false);
  const [networkModal, setNetworkModal] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);






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
      default:
        break;
    }
    // console.log(item);
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

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>


      <View style={{ flexDirection: 'row', marginTop: 10, paddingHorizontal: 15 }}>
        <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro_Bold', color: 'black', letterSpacing: 0.5 }}>CURRENTLY IN CHAT (4)</Text>
        {/* <Icon name="search" size={25} color={'black'} /> */}
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

        <View style={{
          marginTop: 10, marginLeft: 20, height: 60, width: 170, borderWidth: 1, borderColor: 'black',
          backgroundColor: '#EFF0F1', borderRadius: 5
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View>
              <View style={{ marginTop: 3 }}>
                <Image style={{ height: 35, width: 35 }} source={require('../Images/person1.png')} />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 18, fontFamily: 'Sofia_Pro_Bold' }}>Mr Jason</Text>
            </View>

            <View style={{ marginTop: 12 }}>
              <Icon name="remove" size={25} color={'black'} />
            </View>
          </View>
        </View>



        <View style={{
          marginTop: 10, marginLeft: 20, height: 60, width: 170, borderWidth: 1, borderColor: 'black',
          backgroundColor: '#EFF0F1', borderRadius: 5
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View>
              <View style={{ marginTop: 3 }}>
                <Image style={{ height: 35, width: 35 }} source={require('../Images/person1.png')} />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 18, fontFamily: 'Sofia_Pro_Bold' }}>Mr Jason</Text>
            </View>

            <View style={{ marginTop: 12 }}>
              <Icon name="remove" size={25} color={'black'} />
            </View>
          </View>
        </View>



        <View style={{
          marginTop: 10, marginLeft: 20, height: 60, width: 170, borderWidth: 1, borderColor: 'black',
          backgroundColor: '#EFF0F1', borderRadius: 5
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View>
              <View style={{ marginTop: 3 }}>
                <Image style={{ height: 35, width: 35 }} source={require('../Images/person1.png')} />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 18, fontFamily: 'Sofia_Pro_Bold' }}>Mr Jason</Text>
            </View>

            <View style={{ marginTop: 12 }}>
              <Icon name="remove" size={25} color={'black'} />
            </View>
          </View>
        </View>

        <View style={{paddingRight:10}}>

        </View>

      </ScrollView>



      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, paddingHorizontal: 15 }}>
        <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro_Bold', color: 'black', letterSpacing: 0.5 }}>OTHER MEMBERS OF YOUR ORGANIZATION</Text>
        {/* <Icon name="search" size={25} color={'black'} /> */}
      </View>

      <View
        style={{
          height: 45,
          marginHorizontal: 15,
          borderRadius: 8,
          marginTop: 12,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1
          // backgroundColor: '#EFF0F1',
        }}>
        <Icon
          style={{ marginHorizontal: 10 }}
          name="search-outline"
          size={20}
        />
        <TextInput
          placeholder="Please Search Here"
          // value={Title}
          // onChangeText={text => setTitle(text)}
          style={{
            fontSize: 18,
            height: 45,
            width: '100%',
            fontFamily: 'Sofia_Pro_Bold',
            letterSpacing: 0.5,
            color: 'black'
          }}
        />
      </View>

      <ScrollView>

        <View style={{ paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>

            <View>
              <Image style={{ height: 80, width: 80 }} source={require('../Images/person1.png')} />
            </View>
            <View style={{ marginTop: 25, marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.Davis</Text>
            </View>

          </View>
          <View style={{ marginTop: 20 }}>
            <Icon name="add" size={35} color={'black'} />
          </View>

        </View>

        <View style={{ marginTop: 3, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>

            <View>
              <Image style={{ height: 80, width: 80 }} source={require('../Images/person1.png')} />
            </View>
            <View style={{ marginTop: 25, marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.Heyo</Text>
            </View>

          </View>
          <View style={{ marginTop: 20 }}>
            <Icon name="add" size={35} color={'black'} />
          </View>

        </View>

        <View style={{ marginTop: 3, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>

            <View>
              <Image style={{ height: 80, width: 80 }} source={require('../Images/person1.png')} />
            </View>
            <View style={{ marginTop: 25, marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.Tom</Text>
            </View>

          </View>
          <View style={{ marginTop: 20 }}>
            <Icon name="add" size={35} color={'black'} />
          </View>

        </View>





        {/* <View style={{flexDirection:'row',justifyContent:'space-between', marginTop: 10, paddingHorizontal: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold',color:'black' }}>Currently in the call (3)</Text>
        <Icon name="search" size={25} color={'black'} />
      </View> */}




        <View style={{ paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>

            <View>
              <Image style={{ height: 80, width: 80 }} source={require('../Images/person1.png')} />
            </View>
            <View style={{ marginTop: 25, marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.George (You)</Text>
            </View>

          </View>
          <View style={{ marginTop: 20 }}>
            <Icon name="add" size={30} color={'black'} />
          </View>

        </View>

        <View style={{ marginTop: 3, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>

            <View>
              <Image style={{ height: 80, width: 80 }} source={require('../Images/person1.png')} />
            </View>
            <View style={{ marginTop: 25, marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.Ranger</Text>
            </View>

          </View>
          <View style={{ marginTop: 20 }}>
            <Icon name="add" size={30} color={'black'} />
          </View>

        </View>

        <View style={{ marginTop: 3, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>

            <View>
              <Image style={{ height: 80, width: 80 }} source={require('../Images/person1.png')} />
            </View>
            <View style={{ marginTop: 25, marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.Daniel</Text>
            </View>

          </View>
          <View style={{ marginTop: 20 }}>
            <Icon name="add" size={30} color={'black'} />
          </View>

        </View>

        <View style={{ marginTop: 3, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>

            <View>
              <Image style={{ height: 80, width: 80 }} source={require('../Images/person1.png')} />
            </View>
            <View style={{ marginTop: 25, marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.victor</Text>
            </View>

          </View>
          <View style={{ marginTop: 20 }}>
            <Icon name="add" size={30} color={'black'} />
          </View>

        </View>

        <View style={{ marginBottom: 30 }}>

        </View>
      </ScrollView>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 0.5,
          marginTop: 2
        }}
      />

      <View style={{ marginBottom: 60 }}>

      </View>


      <View>



        <View style={{ marginBottom: 10, flexDirection: 'row', position: 'absolute', left: 0, right: 0, bottom: 0, height: 40, width: windowWidth, justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={()=>props.navigation.goBack()}>
          <View style={{ height: 40, width: (windowWidth * 40) / 100, backgroundColor: '#ca2c06', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Cancel</Text>
          </View>

          </TouchableOpacity>
         
          <View style={{
            height: 40, width: (windowWidth * 40) / 100, backgroundColor: '#26a688', justifyContent: 'center',
            alignItems: 'center', borderRadius: 5
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Call</Text>
          </View>
        </View>

      </View>



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

export default AddtoCallScreen;
