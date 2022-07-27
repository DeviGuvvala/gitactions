import React, {useState} from 'react';
import Firebase from '@react-native-firebase/app'
import PushNotification from "react-native-push-notification";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loginscreen from './src/screens/Loginscreen';
import Homepage from './src/screens/Homepage';
import WorkorderDetailScreen from './src/screens/WorkorderDetailScreen';
import WoEQuipLibraryScreen from './src/screens/WoEQuipLibraryScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import Photoscreen from './src/screens/Photoscreen';
import Videoscreen from './src/screens/Videoscreen';
import FormScreen from './src/screens/FormScreen';
import PhotoPreviewScreen from './src/screens/PhotoPreviewScreen';
import AddtoCallScreen from './src/screens/AddtoCallScreen';
import CustomerProfileScreen from './src/screens/CustomerProfileScreen';
import TechDocsTab, {TechDocsScreen} from './src/screens/TechDocsTab';
import WorkOrderNotesScreen from './src/screens/WorkOrderNotesScreen';
import Library from './src/screens/Library';
import ChatScreen from './src/screens/ChatScreen';
import FillouttheForm from './src/screens/FillouttheForm';
import TechDocsLibraryScreen from './src/screens/TechDocsLibraryScreen';
import CommunicationDetailsScreen from './src/screens/CommunicationDetailsScreen';
import LocationScreen from './src/screens/LocationScreen';
import SearchScreen from './src/screens/SearchScreen';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import {getUserFromStorageAsync} from './src/services/LocalStorage';
import FileRoomTab from './src/screens/FileRoomTab';
import {Communicationstack} from './src/screens/CommunicationsStack';
import FileRoomLibrary from './src/screens/FileRoomLib';
import Settings from './src/screens/Settings';
import ChatGalleryScreen from './src/screens/ChatGalleryScreen';
import AccountInfoScreen from './src/screens/AccountInfoScreen';
import FindWaldo from './src/screens/FindWaldo';
import CustWorkOrdersScreen from './src/screens/CustWorkOrdersScreen';
import CustomerEquipScreen from './src/screens/CustomerEquipScreen';
import CustServiceLocScreen from './src/screens/CustServiceLocScreen';
import CustCommuScreen from './src/screens/CustCommScreen';
import CustSettingsScreen from './src/screens/CustSettingsScreen';
import CustomerMsgScreen from './src/screens/CustomerMsgScreen';
import BranchFileRoomScreen from './src/screens/BranchFileRoomScreen';
import CustomerPreferenceScreen from './src/screens/CustomerPreferenceScreen';
import CustEquipmentInfoScreen from './src/screens/CustEquipmentInfoScreen';
import AddtoChatScreen from './src/screens/AddtoChatScreen';
import ViewEqptInfoScreen from './src/screens/ViewEqptInfoScreen';
import AddTechnicianScreen from './src/screens/AddTechnicianScreen';
import ChatScreenSDK from './src/screens/ChatScreenSDK';
import {LogBox} from 'react-native';

const Stack = createNativeStackNavigator();

const FileRoam = createNativeStackNavigator();

const TechDocs = createNativeStackNavigator();

const SettingsStack = createNativeStackNavigator();

const CustomerProfile = createNativeStackNavigator();

const CustomerProfileSettings = createNativeStackNavigator();

export function SettingsScreen() {
  return (
    <SettingsStack.Navigator
      initialRouteName="FileRoomTab"
      screenOptions={{animation: 'none'}}>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
      <SettingsStack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <SettingsStack.Screen
        name="FindWaldo"
        component={FindWaldo}
        options={{
          headerShown: false,
        }}
      /> */}
    </SettingsStack.Navigator>
  );
}

export function FileRoamStack(props) {
  const prop = props.route.params;
  return (
    <FileRoam.Navigator
      initialRouteName="FileRoomTab"
      screenOptions={{animation: 'none'}}>
      <FileRoam.Screen
        name="FileRoomTab"
        component={FileRoomTab}
        options={{
          headerShown: false,
        }}
        initialParams={prop}
      />
      <FileRoam.Screen
        name="FRLibrary"
        component={FileRoomLibrary}
        options={{
          headerShown: false,
        }}
      />
    </FileRoam.Navigator>
  );
}
export function TechDocsStack(props) {
  const prop = props.route.params;
  return (
    <TechDocs.Navigator
      initialRouteName="TechDocsTab"
      screenOptions={{animation: 'none'}}>
      <TechDocs.Screen
        name="Tab"
        component={TechDocsTab}
        options={{
          headerShown: false,
        }}
        initialParams={prop}
      />
      <TechDocs.Screen
        name="DocsLibrary"
        component={TechDocsLibraryScreen}
        options={{
          headerShown: false,
        }}
      />
    </TechDocs.Navigator>
  );
}

export function CustProfileStack() {
  // const prop = props.route.params;
  // console.log(prop.params, props);
  return (
    <CustomerProfile.Navigator
      initialRouteName="AccountInfo"
      screenOptions={{animation: 'none'}}>
      <CustomerProfile.Screen
        name="AccountInfo"
        component={AccountInfoScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <CustomerProfile.Screen
        name="CustWorkOrdersScreen"
        component={CustWorkOrdersScreen}
        options={{
          headerShown: false,
        }}
      /> */}

      {/* <CustomerProfile.Screen
        name="CustomerEquipScreen"
        component={CustomerEquipScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <CustomerProfile.Screen
        name="CustServiceLocScreen"
        component={CustServiceLocScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <CustomerProfile.Screen
        name="CustCommScreen"
        component={CustCommuScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <CustomerProfile.Screen
        name="CustomerPreferenceScreen"
        component={CustomerPreferenceScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </CustomerProfile.Navigator>
  );
}

export function CustomerProfileSettingsStack() {
  // const prop = props.route.params;
  // console.log(prop.params, props);
  return (
    <CustomerProfileSettings.Navigator
      initialRouteName="CustSettings"
      screenOptions={{animation: 'none'}}>
      <CustomerProfileSettings.Screen
        name="CustSettings"
        component={CustSettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <CustomerProfile.Screen
        name="CustWorkOrdersScreen"
        component={CustWorkOrdersScreen}
        options={{
          headerShown: false,
        }}
      /> */}

      {/* <CustomerProfile.Screen
        name="CustomerEquipScreen"
        component={CustomerEquipScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <CustomerProfile.Screen
        name="CustServiceLocScreen"
        component={CustServiceLocScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <CustomerProfile.Screen
        name="CustCommScreen"
        component={CustCommuScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <CustomerProfileSettings.Screen
        name="CustomerPreferenceScreen"
        component={CustomerPreferenceScreen}
        options={{
          headerShown: false,
        }}
      />
    </CustomerProfileSettings.Navigator>
  );
}

const App = () => {
  const [user, setUser] = React.useState('');
  LogBox.ignoreAllLogs();
  const checkUser = async () => {
    let user = await getUserFromStorageAsync('EmpID');
    if (user != undefined) {
      setUser(user);
    } else setUser(undefined);
  };
  React.useEffect(() => {
    checkUser();
  //   Firebase.initializeApp()
  //   PushNotification.configure({
 
  //     // (optional) Called when Token is generated (iOS and Android)
  //     onRegister: function(token) {
  //         console.log( 'TOKEN:', token );
  //     },
   
  //     // (required) Called when a remote or local notification is opened or received
  //     onNotification: function(notification) {
  //         console.log( 'NOTIFICATION:', notification );
  //     },
   
  //     // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
  //     senderID: "YOUR GCM SENDER ID",
   
  //     // IOS ONLY (optional): default: all - Permissions to register.
  //     permissions: {
  //         alert: true,
  //         badge: true,
  //         sound: true
  //     },
   
  //     // Should the initial notification be popped automatically
  //     // default: true
  //     popInitialNotification: true,
   
  //     /**
  //       * (optional) default: true
  //       * - Specified if permissions (ios) and token (android and ios) will requested or not,
  //       * - if not, you must call PushNotificationsHandler.requestPermissions() later
  //       */
  //     requestPermissions: true,
  // });
  }, []);

  return (
    <InternetConnectionAlert
      onChange={connectionState => {
        // if (connectionState.isConnected === true) {
        //   setNetInfo(true);
        // } else {
        //   setNetInfo(false);
        // }
      }}
      title=""
      message={'you are currently offline'}
      closeInterval={4000}
      // errorColor={netInfo === true ? 'green' : 'red'}
      inactiveStatusBarBackgroundColor="#1A60A3">
      {user != '' && (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={user === undefined ? 'Login' : 'Home'}>
            <Stack.Screen
              name="Login"
              component={Loginscreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Home"
              component={Homepage}
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen
              name="CustomerPreferenceScreen"
              component={CustomerPreferenceScreen}
              options={{
                headerShown: false,
              }}
            /> */}

            <Stack.Screen
              name="SearchScreen"
              component={SearchScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="LocationScreen"
              component={LocationScreen}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="CustomerProfileScreen"
              component={CustomerProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CustomerEquipScreen"
              component={CustomerEquipScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CustWorkOrdersScreen"
              component={CustWorkOrdersScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="CustCommScreen"
              component={CustCommuScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="CustServiceLocScreen"
              component={CustServiceLocScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CustEquipmentInfoScreen"
              component={CustEquipmentInfoScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CustomerMsgScreen"
              component={CustomerMsgScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="BranchFileRoomScreen"
              component={BranchFileRoomScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="WorkorderDetailsScreen"
              component={WorkorderDetailScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ViewEqptInfoScreen"
              component={ViewEqptInfoScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="WoEQuipLibraryScreen"
              component={WoEQuipLibraryScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="WorkOrderNotesScreen"
              component={WorkOrderNotesScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CommunicationDetailsScreen"
              component={CommunicationDetailsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="FindWaldo"
              component={FindWaldo}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Photoscreen"
              component={Photoscreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Videoscreen"
              component={Videoscreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="FormScreen"
              component={FormScreen}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="AddTechnicianScreen"
              component={AddTechnicianScreen}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="PhotoPreviewScreen"
              component={PhotoPreviewScreen}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="Communicationstack"
              component={Communicationstack}
              options={{
                headerShown: false,
                headerTitle: 'Communications',
              }}
            />
            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ChatScreenSDK"
              component={ChatScreenSDK}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddtoCallScreen"
              component={AddtoCallScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddtoChatScreen"
              component={AddtoChatScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ChatGalleryScreen"
              component={ChatGalleryScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="FillouttheForm"
              component={FillouttheForm}
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen
              name="TecDocsLibrary"
              component={TechDocsStack}
              options={{
                headerShown: true,
              }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </InternetConnectionAlert>
  );
};

export default App;
