import React from 'react'
import { View, Text, TouchableOpacity,Linking } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SupportChat from './SupportChat';
import CustomerChat from './CustomerChat';
import AccountInfoScreen from './AccountInfoScreen';
import Library from './Library';
import Settings from './Settings';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import { CustProfileStack } from '../../App';
import { CustomerProfileSettingsStack } from '../../App';
import CustSettingsScreen from './CustSettingsScreen';
import CustLibraryScreen from './CustLibraryScreen';


const Tab = createMaterialTopTabNavigator();
const CustomerProfileScreen = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 45, backgroundColor: 'white' }}>
        <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
          <View style={{ marginLeft: 1 ,marginTop:5}}>
            <Icon
              name="md-arrow-back"
              size={28}
              style={{ marginTop: 3}}
              color={'#000'}
              onPress={() => navigation.goBack()}
            />
          </View>

          <View style={{ marginLeft: '20%' }}>
            <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black',marginTop:5,letterSpacing:0.6 }}>Customer  Profile</Text>
          </View>

          {/* <View>
            <TouchableOpacity>
            <Icon
              name="options"
              size={25}
              style={{ marginTop: 10,marginLeft:'40%'}}
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
      {/* <Header
        // searchIcon={false}
        title={'Customer Profile'}
        // subtitle={showEdit === true ? 'Cancel' : 'Edit'}
        isItIcon={true}
        Iconname="arrow-back-outline"
        iconOnPress={() => navigation.goBack()}
        // taglineText="Job #0000234. Michel chang"
        // openModal={() => {
        //   setModalVisible(!modalVisible);
        // }}
        // showsideText={true}
        // rightIconname="ellipsis-vertical"
        // onPressFun={() => showEditFun()}
        // onPressMenu={() => setHeaderModal(!headerModal)}
        // jobstatusValue={jobstatusValue}
      /> */}
      <Tab.Navigator
        screenOptions={{
          // swipeEnabled:false,
          tabBarLabelStyle: {
              fontSize: 15,
            // paddingLeft:8,
            fontWeight: 'bold',
            textTransform: 'none',
            width:'100%',
            // marginLeft:10
          },
          // tabBarItemStyle: { width: 100, padding: 0 },
          // tabBarStyle: { backgroundColor: 'powderblue' },
        }}>
        <Tab.Screen name="Account Info" component={CustProfileStack} />
        <Tab.Screen name="Library" component={CustLibraryScreen} style={{marginLeft:10}} />
        <Tab.Screen name="Settings" component={CustomerProfileSettingsStack} />
        {/* <Tab.Screen name="Library" component={Library} />
        {/* <Tab.Screen name="Global Search" component={Globalsearch} /> */}
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>


    </View>
  )
}
export default CustomerProfileScreen