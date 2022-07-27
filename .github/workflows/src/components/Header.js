import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {
  saveUserInLocalStorageAsync,
  getUserFromStorageAsync,
} from '../services/LocalStorage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Header = props => {
  console.log(props, 'Header Props');
  // const panelRef = useRef(null);
  const [status, setStatus] = React.useState('');

  // useEffect(() => {
  //   getStatusAsync();
  // }, []);

  // const getStatusAsync = async () => {
  //   let user = await getUserFromStorageAsync('Jobstatus' + props.sono);
  //   console.log(user, 'user');
  //   if (user === undefined) setStatus('In Progress');
  //   else {
  //     if (user.sono === props.sono) {
  //       setStatus(user.jobStatus);
  //     } else {
  //       console.log(status, 'getStatusAsync');
  //       setStatus('In Progress');
  //     }
  //   }
  //   // console.log(status, 'getStatusAsync');
  // };
  const selectStatusFun = () => {
    props.onPressStatusFun();
    // console.log(status, 'selectStatusFun');
    // switch (status) {
    //   case 'In Progress':
    //     setStatus('Complete');
    //     saveUserInLocalStorageAsync(
    //       {jobStatus: 'Complete', sono: props.sono},
    //       'Jobstatus' + props.sono,
    //     );
    //     break;
    //   case 'Complete':
    //     setStatus('To Do');
    //     saveUserInLocalStorageAsync(
    //       {jobStatus: 'To Do', sono: props.sono},
    //       'Jobstatus' + props.sono,
    //     );
    //     break;
    //   case 'To Do':
    //     setStatus('In Progress');
    //     saveUserInLocalStorageAsync(
    //       {jobStatus: 'In Progress', sono: props.sono},
    //       'Jobstatus' + props.sono,
    //     );
    //     break;
    //   default:
    //     setStatus('In Progress');
    //     saveUserInLocalStorageAsync(
    //       {jobStatus: 'In Progress', sono: props.sono},
    //       'Jobstatus' + props.sono,
    //     );
    //     break;
    // }
  };

  const getColor = () => {
    if (props.jobstatusValue === 'In Progress') return 'red';
    else if (props.jobstatusValue === 'Complete') return 'green';
    else return 'blue';
  };
  return (
    <View
      style={{
        width: '100%',
        height: props.Iconname ? 80 : 65,
        justifyContent: 'space-between',
        // position:'absolute',
        // top:0,
        // left:0,
        // right:0,
        // elevation:5,
        // zIndex:100,
        backgroundColor: '#fff',
      }}>
      <View style={{width: '95%', alignSelf: 'center'}}>
        <View
          style={{
            // backgroundColor:'green',
            height: 45,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{width: '10%'}}>
            <Icon
              name={props.Iconname}
              size={24}
              color={'#000'}
              onPress={props.iconOnPress}
            />
          </View>
          <View>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: '#000'}}>
              {props.title}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            {props.searchIcon === true && (
              // <TouchableOpacity onPress={() => panelRef.current.togglePanel()}>
              <TouchableOpacity>
                <Icon
                  name="search-outline"
                  size={24}
                  color={'#000'}
                  style={{paddingHorizontal: 10}}
                  onPress={props.searchFun}
                />
              </TouchableOpacity>
            )}
            {/* <BottomSheet
            ref={ref => (panelRef.current = ref)}
            sliderMinHeight={0}
            isOpen={false}>
            <Text style={{ fontSize:20,fontWeight:'bold' }}>New Note</Text>
            <TextInput placeholder='Please Input Note'></TextInput>
            <View style={{alignItems:'center',height:30,width:windowWidth*90/100,backgroundColor:'black'}}>

            </View>
          </BottomSheet> */}

            <TouchableOpacity onPress={props.onPressMenu}>
              <Icon name={props.rightIconname} size={24} color={'#000'} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 14, color: '#000', fontWeight: 'bold'}}>
            Work Order #{props.sono}.
          </Text>
          {/* <Text style={{marginTop:3,color:'black'}}>{'\u2B23'}</Text> */}
          <Text style={{fontSize: 14, color: '#000',letterSpacing:0.3, fontWeight: 'bold',}}>
            {props.customerName}
          </Text>
          {/* <Text style={{fontSize: 14, color: '#000', fontWeight: 'bold'}}>
            {props.customerName}
          </Text> */}
          {props.showsideText === true && (
            <TouchableOpacity
              onPress={selectStatusFun}
              disabled={props.disabled}
              >
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: {getColor},
                  paddingHorizontal: 10,
                  // paddingVertical:5,
                  height: 30,
                  marginTop:2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontWeight: '500',
                    alignSelf: 'center',
                  }}>
                  Job Status :{' '}
                </Text> */}
                <Text
                  style={{
                    fontSize: 14,
                    color: getColor(),
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  {props.jobstatusValue}
                </Text>
                {/* <Icon name="chevron-down-outline" size={24} color={'#000'} /> */}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {props.Iconname && (
        <View style={{width: '100%', height: 1, backgroundColor: getColor()}} />
      )}
    </View>
  );
};

export default Header;
