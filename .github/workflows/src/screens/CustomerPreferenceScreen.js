import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    Linking,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    TextInput
} from 'react-native';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList,
} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import HeaderOptionModal from '../components/HeaderOptionModal';
import {useFocusEffect} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomerPreferenceScreen = ({ navigation, route }) => {
    const [jobstatusValue, setjobstatusValue] = React.useState('');
    const [recentExpanded, setrecentExpanded] = React.useState(true);
    const [galleryExpanded, setgalleryExpanded] = React.useState(true);
    const [documentsExpanded, setdocumentsExpanded] = React.useState(true);
    const [partslistExpanded, setpartslistExpanded] = React.useState(true);
    const [maintenanceExpanded, setmaintenanceExpanded] = React.useState(true);
    const [usermanualsExpanded, setusermanualsExpanded] = React.useState(true);
    const [installationmanualsExpanded, setinstallationmanualsExpanded] =
        React.useState(true);
    const [serviceExpanded, setserviceExpanded] = React.useState(true);
    const [threedexplodedExpanded, setthreedexplodedExpanded] =
        React.useState(true);
    const [currentequipExpanded, setcurrentequipExpanded] = React.useState(true);
    const [similarExpanded, setsimilarExpanded] = React.useState(true);
    const [headerModal, setHeaderModal] = React.useState(false);
    const [searchequipHeight, setsearchequipHeight] = React.useState(false);
    const [filesbasedview, setfilesbasedView] = React.useState(true);
    const [custnote1, setcustnote1] = React.useState(false);
    const [custnote2, setcustnote2] = React.useState(false);
    const [companynote1, setcompanynote1] = React.useState(false);
    const [companynote2, setcompanynote2] = React.useState(false);

    const collapseFun = item => {
        switch (item) {
            case 'customer note':
                setcustnote1(!custnote1);
                break;
            case 'customer note2':
                setcustnote2(!custnote2);
                break;
            case 'company note':
                setcompanynote1(!companynote1);
                break;
            case 'company note2':
                setcompanynote2(!companynote2);
                break;

            default:
                break;
        }
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
    React.useEffect(() => {
        getStatusAsync();
    }, []);

    const funExpand = item => {
        switch (item) {
            case 'Recent':
                setrecentExpanded(!recentExpanded);
                break;
            case 'Gallery':
                setgalleryExpanded(!galleryExpanded);
                break;
            case 'Documents':
                setdocumentsExpanded(!documentsExpanded);
                break;
            case 'Partslist':
                setpartslistExpanded(!partslistExpanded);
                break;
            case 'Maintenance':
                setmaintenanceExpanded(!maintenanceExpanded);
                break;
            case 'UserManuals':
                setusermanualsExpanded(!usermanualsExpanded);
                break;
            case 'InstallationManuals':
                setinstallationmanualsExpanded(!installationmanualsExpanded);
                break;
            case 'service':
                setserviceExpanded(!serviceExpanded);
                break;
            case '3dexploded':
                setthreedexplodedExpanded(!threedexplodedExpanded);
                break;
            case 'currentequipment':
                setcurrentequipExpanded(!currentequipExpanded);
                break;
            case 'Similar':
                setsimilarExpanded(!similarExpanded);
                break;
            case 'FilesBasedonPreviousJob':
                setfilesbasedView(!filesbasedview);
                break;
            default:
                break;
        }
        console.log(item);
    };


    useFocusEffect(
        React.useCallback(() => {
          console.log('Screen was focused');
    
          return () => {
            console.log('Screen was unfocused');
            navigation.goBack();
            // Useful for cleanup functions
          };
        }, []),
      );
    

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <ScrollView>
                <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, color: '#3a3d41', fontFamily: 'Sofia_Pro_Bold' }}>
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
                        alignSelf: 'center'
                    }}
                />

                <View style={{ paddingHorizontal: 10, marginTop: 3 }}>
                    <Text style={{ letterSpacing: 0.4, fontSize: 16, fontFamily: 'Sofia_Pro', letterSpacing: 0.4 }}>
                        Primary contact, Location and many other additional info that may be
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
                            borderColor: 'black'
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
                                        style={{ fontSize: 18, fontFamily: 'Sofia_Pro_Bold', color: '#3a3d41' }}>
                                        Micheal Chang
                                    </Text>
                                    <Text style={{ fontSize: 15, fontFamily: 'Sofia_Pro' }}>Primary Contact</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, marginRight: 15 }}>
                                <TouchableOpacity onPress={() => {
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
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Sofia_Pro' }}>
                                    Phone Number :
                                </Text>
                                <Text style={{ fontSize: 15, marginLeft: 10 }}>1-555-555-555-555</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Sofia_Pro' }}>
                                    Email Address :
                                </Text>
                                <Text style={{ fontSize: 15, marginLeft: 10 }}>ninePack@9pack.com</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Sofia_Pro' }}>
                                    Service Branch :{' '}
                                </Text>
                                <Text style={{ fontSize: 15, marginLeft: 5, fontFamily: 'Sofia_Pro' }}>SpringField Banglore</Text>
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
                                        style={{ fontSize: 18, color: 'black', fontFamily: 'Sofia_Pro_Bold' }}>
                                        SpringField IL/MI Branch
                                    </Text>
                                    {/* <Text style={{ fontSize: 15 }}>Primary Contact</Text> */}
                                </View>

                                <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Sofia_Pro' }}>
                                        Store Number :
                                    </Text>
                                    <Text style={{ fontSize: 15 }}>141ABX</Text>
                                </View>

                                <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Sofia_Pro' }}>Contact :</Text>
                                    <Text style={{ fontSize: 15, fontFamily: 'Sofia_Pro' }}>Tom Hanks</Text>
                                </View>
                            </View>


                            <View
                                style={{ flexDirection: 'row', marginTop: 20 }}>
                                <TouchableOpacity>
                                    <View style={{ marginTop: 4 }}>
                                        <Icon name="location" size={25} color={'#3a3d41'} />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={{ marginLeft: 5, marginTop: 1 }}>
                                        <Icon name="person" size={30} color={'#3a3d41'} />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={{ marginLeft: 5, marginTop: 3 }}>
                                        <Icon name="document" size={28} color={'#3a3d41'} />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={{ marginTop: 3 }}>
                                        <Icon name="chevron-forward" size={28} color={'#3a3d41'} />
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Sofia_Pro_Bold' }}>Please Select New Primary Contact</Text>
                </View>

                <View style={{flex:1, paddingHorizontal: 10, marginTop: 5, height: 45, width: (windowWidth * 95) / 100, borderWidth: 1, borderColor: 'black',alignSelf:'center',borderRadius:3}}>
                    <TextInput placeholder='Please Enter Name Here' style={{ fontSize: 18, color: 'grey', fontFamily: 'Sofia_Pro_Bold' }}></TextInput>
                </View>


                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Sofia_Pro_Bold' }}>Please Select New Primary Service Location</Text>
                </View>

                <View style={{flex:1, paddingHorizontal: 10, marginTop: 5, height: 45, width: (windowWidth * 95) / 100, borderWidth: 1, borderColor: 'black',alignSelf:'center',borderRadius:3}}>
                    <TextInput placeholder='Please Enter New Service Location Here' style={{ fontSize: 18, color: 'grey', fontFamily: 'Sofia_Pro_Bold' }}></TextInput>
                </View>



                <View style={{marginBottom:300}}>

                </View>


                


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
    collapseHeaderstyle: {
        marginTop: 15,
        flexDirection: 'row',
        width: '95%',
        alignSelf: 'center',
    },
    collapseHeaderTextStyle: {
        fontWeight: 'bold',
        fontSize: 19,
        color: 'black',
        paddingLeft: 10,
    },
    collapseBodyStyle: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginTop: 10,
    },
});
export default CustomerPreferenceScreen;
