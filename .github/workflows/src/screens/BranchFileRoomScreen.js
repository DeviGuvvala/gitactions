import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    TextInput,
    FlatList,
    Image
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
import ToggleSwitch from '../components/ToggleSwitch';
import {
    getUserFromStorageAsync,
    saveUserInLocalStorageAsync,
  } from '../services/LocalStorage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BranchFileRoomScreen = ({ navigation, route }) => {

    const [galleryArr,setGalleryArr]=React.useState([]);
    const [toggle, setToggle] = useState(true);
    const [pExpanded, setpExpanded] = React.useState(true);
    const [GalleryExpanded, setGalleryExpanded] = React.useState(true);
    const [dExpanded, setdExpanded] = React.useState(true);
    const [partsExpanded, setpartsExpanded] = React.useState(true);
    const [mExpanded, setmExpanded] = React.useState(true);
    const [uExpanded, setuExpanded] = React.useState(true);
    const [searchequipHeight, setsearchequipHeight] = React.useState(false);

    const [IExpanded, setIExpanded] = React.useState(true);
    const [SExpanded, setSExpanded] = React.useState(true);
    const [interExpanded, setinterExpanded] = React.useState(true);
    const [vExpanded, setvExpanded] = React.useState(true);
    const [yExpanded, setyExpanded] = React.useState(true);
    const [headerModal, setHeaderModal] = React.useState(false);

    const [SignModalOpen, setSignModalOpen] = React.useState(false);
    const signatureView = React.useRef(null);
    const [signdata, setsigndata] = React.useState(null);

    // const collapseFun = item => {
    //     switch (item) {
    //         case 'customer note':
    //             setcustnote1(!custnote1);
    //             break;
    //         case 'customer note2':
    //             setcustnote2(!custnote2);
    //             break;
    //         case 'company note':
    //             setcompanynote1(!companynote1);
    //             break;
    //         case 'company note2':
    //             setcompanynote2(!companynote2);
    //             break;

    //         default:
    //             break;
    //     }
    // };


    const funExpand = item => {
        switch (item) {
            case 'photos':
                setpExpanded(!pExpanded);
                break;
            case 'Gallery':
                setGalleryExpanded(!GalleryExpanded);
                break;
            case 'docs':
                setdExpanded(!dExpanded);
                break;
            case 'parts':
                setpartsExpanded(!partsExpanded);
                break;
            case 'maintenance':
                setmExpanded(!mExpanded);
                break;
            case 'user':
                setuExpanded(!uExpanded);
                break;
            case 'installation':
                setIExpanded(!IExpanded);
                break;
            case 'service':
                setSExpanded(!SExpanded);
                break;
            case 'interactive':
                setinterExpanded(!interExpanded);
                break;
            case 'video':
                setvExpanded(!vExpanded);
                break;
            case 'youtube':
                setyExpanded(!yExpanded);
                break;
            default:
                break;
        }
        console.log(item);
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
        getLibrary();
    }, []);

    const getLibrary=async()=>{
        const GalleryUrl=await getUserFromStorageAsync('Library');
    const GalleryArr=[...GalleryArr,GalleryUrl]
        setGalleryArr(GalleryArr);
      }

    // const funExpand = item => {
    //     switch (item) {
    //         case 'Recent':
    //             setrecentExpanded(!recentExpanded);
    //             break;
    //         case 'Gallery':
    //             setgalleryExpanded(!galleryExpanded);
    //             break;
    //         case 'Documents':
    //             setdocumentsExpanded(!documentsExpanded);
    //             break;
    //         case 'Partslist':
    //             setpartslistExpanded(!partslistExpanded);
    //             break;
    //         case 'Maintenance':
    //             setmaintenanceExpanded(!maintenanceExpanded);
    //             break;
    //         case 'UserManuals':
    //             setusermanualsExpanded(!usermanualsExpanded);
    //             break;
    //         case 'InstallationManuals':
    //             setinstallationmanualsExpanded(!installationmanualsExpanded);
    //             break;
    //         case 'service':
    //             setserviceExpanded(!serviceExpanded);
    //             break;
    //         case '3dexploded':
    //             setthreedexplodedExpanded(!threedexplodedExpanded);
    //             break;
    //         case 'currentequipment':
    //             setcurrentequipExpanded(!currentequipExpanded);
    //             break;
    //         case 'Similar':
    //             setsimilarExpanded(!similarExpanded);
    //             break;
    //         case 'FilesBasedonPreviousJob':
    //             setfilesbasedView(!filesbasedview);
    //             break;
    //         default:
    //             break;
    //     }
    //     console.log(item);
    // };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                searchIcon={false}
                title={'Branch File Room'}
                // subtitle={showEdit === true ? 'Cancel' : 'Edit'}
                isItIcon={true}
                Iconname="arrow-back-outline"
                iconOnPress={() => navigation.goBack()}
                taglineText="Michel chang"
                openModal={() => {
                    setModalVisible(!modalVisible);
                }}
                showsideText={true}
                // rightIconname="ellipsis-vertical"
                onPressFun={() => showEditFun()}
                onPressMenu={() => setHeaderModal(!headerModal)}
            // jobstatusValue={jobstatusValue}
            />
            <ScrollView>


                <View
                    style={{
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <View>
                        <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Sofia_Pro_Bold', }}>
                            Spring Fileld Branch
                        </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>
                                Building :{' '}
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>04/21/2020</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    // paddingVertical: 5,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // flexDirection:'row'
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Sofia_Pro_Regular', }}>First Service : </Text>
                        </View>
                        <View>
                            <Text style={{ marginTop: 3 }}>04/20/2020</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Sofia_Pro_Regular', }}>Equipment : </Text>
                        </View>
                        <View>
                            <Text style={{ marginTop: 3 }}>46 units</Text>
                        </View>
                    </View>


                </View>


                <View style={{
                    // paddingVertical: 5,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // flexDirection:'row'
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Sofia_Pro_Regular', }}>Last Service : </Text>
                        </View>
                        <View>
                            <Text style={{ marginTop: 3 }}>04/20/2020</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Sofia_Pro_Regular', }}>Jobs Open  : </Text>
                        </View>
                        <View>
                            <Text style={{ marginTop: 3 }}>38         </Text>
                        </View>
                    </View>


                </View>


                <View style={{
                    // paddingVertical: 5,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // flexDirection:'row'
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Sofia_Pro_Regular', }}>Warenty Ends : </Text>
                        </View>
                        <View>
                            <Text style={{ marginTop: 3 }}>04/20/2020</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Sofia_Pro_Regular', }}>Jobs Closed  : </Text>
                        </View>
                        <View>
                            <Text style={{ marginTop: 3 }}>28         </Text>
                        </View>
                    </View>


                </View>



                <View
                    style={{
                        borderRadius: 6,
                        marginTop: 10,
                        height: 40,
                        backgroundColor: '#eff0f1',
                        width: (windowWidth * 93) / 100,
                        alignSelf: 'center',
                    }}>
                    <View
                        style={{ flexDirection: 'row', marginTop: 5, paddingHorizontal: 10 }}>
                        <View>
                            <Icon
                                name="search"
                                size={20}
                                color={'#000'}
                                style={{ marginTop: 3 }}
                            />
                        </View>
                        <TouchableOpacity
                            style={{ marginTop: 2, marginLeft: 5 }}
                            onPress={() => setsearchequipHeight(!searchequipHeight)}>
                            {searchequipHeight === true ? (
                                <Text style={{ fontSize: 17, fontFamily: 'Sofia_Pro_Bold', letterSpacing: 0.5 }}>Click here to close search</Text>
                            ) : (
                                <Text style={{ fontSize: 17, fontFamily: 'Sofia_Pro_Bold', letterSpacing: 0.5 }}>Click here to open search</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={() => setsearchequipHeight(!searchequipHeight)}>
                            <Icon
                                name={
                                    searchequipHeight === true ? 'chevron-up' : 'chevron-down'
                                }
                                size={20}
                                color={'#000'}
                                style={{ marginLeft: 60, marginTop: 4 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {searchequipHeight === true && (
                        <View>
                            <View
                                style={{
                                    height: 45,
                                    marginHorizontal: 15,
                                    // borderWidth: 0.5,
                                    borderColor: '#000',
                                    marginTop: 10,
                                    borderRadius: 8,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: (windowWidth * 92) / 100,
                                    backgroundColor: '#EFF0F1',
                                }}>
                                <Icon
                                    style={{ marginHorizontal: 10, }}
                                    name="search-outline"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Search Manufactures"
                                    // value={Title}
                                    // onChangeText={text => setTitle(text)}
                                    style={{
                                        fontSize: 17,
                                        height: 45,
                                        width: '100%',
                                        letterSpacing: 0.4
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    height: 45,
                                    marginHorizontal: 15,
                                    // borderWidth: 0.5,
                                    // borderColor: '#000',
                                    marginTop: 10,
                                    borderRadius: 8,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: (windowWidth * 92) / 100,
                                    backgroundColor: '#EFF0F1',
                                }}>
                                <Icon
                                    style={{ marginHorizontal: 10 }}
                                    name="search-outline"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Search Models"
                                    // value={Title}
                                    // onChangeText={text => setTitle(text)}
                                    style={{
                                        fontSize: 17,
                                        height: 45,
                                        width: '100%',
                                        letterSpacing: 0.5
                                    }}
                                />
                            </View>
                        </View>
                    )}
                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        marginTop: 12,
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: 20, fontFamily: 'Sofia_Pro_Bold', color: '#3a3d41' }}>
                        Equipments
                    </Text>
                    <Icon name="chevron-forward" size={28} color={'#000'} onPress={() => { navigation.navigate('CustomerEquipScreen') }} />
                </View>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        alignSelf: 'center',
                        width: (windowWidth * 95) / 100
                    }}
                />

                <View style={{ paddingHorizontal: 10, marginTop: 3 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro_Regular', letterSpacing: 0.5, color: 'black' }}>
                        All of the Customer Equipment.Click to view all.
                    </Text>
                </View>

                <View style={{ height: 100 }}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>


                        <View
                            style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                marginRight: 10,

                            }}>
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
                                    borderRadius: 4
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: 'Sofia_Pro_Bold',
                                        fontStyle: 'normal',
                                        lineHeight: 24,
                                        letterSpacing: 0.5,
                                        color: '#050709',
                                        textAlign: 'center'
                                        // numberOfLines:'2'
                                    }}>
                                    Air Conditioner
                                </Text>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 4,
                                            // alignItems: 'center',
                                            // marginLeft: 'auto',
                                            // marginHorizontal: 5,
                                        }}>
                                        <ToggleSwitch
                                            isOn={toggle} // There should be a state like this.state.isOn(Set default value)
                                            onColor="#26A688"
                                            offColor="#E9EBEC"
                                            size="medium"
                                            onToggle={() => setToggle(!toggle)} //To update state
                                            icon={
                                                toggle === true ? (
                                                    <Icon
                                                        name="checkmark-circle-outline"
                                                        size={33}
                                                    />
                                                ) : (
                                                    <Icon name="time-outline" size={33} />
                                                )
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

                                    <TouchableOpacity onPress={() => navigation.navigate('ViewEqptInfoScreen')}>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ fontSize: 16, color: 'blue', textDecorationLine: 'underline' }}>View Eqpt Info</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>



                        <View
                            style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                marginRight: 10,

                            }}>
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
                                    borderRadius: 4
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: 'Sofia_Pro_Bold',
                                        fontStyle: 'normal',
                                        lineHeight: 24,
                                        letterSpacing: 0.5,
                                        color: '#050709',
                                        textAlign: 'center'
                                        // numberOfLines:'2'
                                    }}>
                                    Air Conditioner
                                </Text>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 4,
                                            // alignItems: 'center',
                                            // marginLeft: 'auto',
                                            // marginHorizontal: 5,
                                        }}>
                                        <ToggleSwitch
                                            isOn={toggle} // There should be a state like this.state.isOn(Set default value)
                                            onColor="#26A688"
                                            offColor="#E9EBEC"
                                            size="medium"
                                            onToggle={() => setToggle(!toggle)} //To update state
                                            icon={
                                                toggle === true ? (
                                                    <Icon
                                                        name="checkmark-circle-outline"
                                                        size={33}
                                                    />
                                                ) : (
                                                    <Icon name="time-outline" size={33} />
                                                )
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
                                    <TouchableOpacity onPress={() => navigation.navigate('ViewEqptInfoScreen')}>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ fontSize: 16, color: 'blue', textDecorationLine: 'underline' }}>View Eqpt Info</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>




                        <View
                            style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                marginRight: 10,

                            }}>
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
                                    borderRadius: 4
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: 'Sofia_Pro_Bold',
                                        fontStyle: 'normal',
                                        lineHeight: 24,
                                        letterSpacing: 0.5,
                                        color: '#050709',
                                        textAlign: 'center'
                                        // numberOfLines:'2'
                                    }}>
                                    Air Conditioner
                                </Text>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 4,
                                            // alignItems: 'center',
                                            // marginLeft: 'auto',
                                            // marginHorizontal: 5,
                                        }}>
                                        <ToggleSwitch
                                            isOn={toggle} // There should be a state like this.state.isOn(Set default value)
                                            onColor="#26A688"
                                            offColor="#E9EBEC"
                                            size="medium"
                                            onToggle={() => setToggle(!toggle)} //To update state
                                            icon={
                                                toggle === true ? (
                                                    <Icon
                                                        name="checkmark-circle-outline"
                                                        size={33}
                                                    />
                                                ) : (
                                                    <Icon name="time-outline" size={33} />
                                                )
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

                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ fontSize: 16, color: 'blue', textDecorationLine: 'underline' }}>View Eqpt Info</Text>
                                    </View>
                                </View>
                            </View>

                        </View>


                    </ScrollView>



                </View>



                {/* <View style={{ marginBottom: 10 }}></View> */}


                <Collapse
                    isExpanded={pExpanded}
                    onToggle={isExpanded => setpExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('photos')}
                            style={{
                                marginTop: 15,
                                // marginLeft:10,
                                // flexDirection: 'row',
                                // width: '95%',
                                // alignSelf: 'center',
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name={
                                            pExpanded === true
                                                ? 'chevron-down-outline'
                                                : 'chevron-forward-outline'
                                        }
                                        size={25}
                                        color={'#000'}
                                        style={{ marginTop: 2, marginLeft: 4 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Sofia_Pro_Bold',
                                            fontSize: 19,
                                            color: '#000',
                                            paddingLeft: 5,
                                        }}>
                                        Recently Viewed Items
                                    </Text>
                                </View>
                                <View>

                                    <Icon
                                        name='search'
                                        size={20}
                                        color={'#000'}
                                        style={{ marginTop: 2, marginRight: 4 }}
                                    />

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />

                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        
                    </CollapseBody>
                </Collapse>



                <Collapse
                    isExpanded={GalleryExpanded}
                    onToggle={isExpanded => setGalleryExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('Gallery')}
                            style={{
                                marginTop: 15,
                                // flexDirection: 'row',
                                // width: '95%',
                                // alignSelf: 'center',
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name={
                                            GalleryExpanded === true
                                                ? 'chevron-down-outline'
                                                : 'chevron-forward-outline'
                                        }
                                        size={25}
                                        color={'#000'}
                                        style={{ marginTop: 2, marginLeft: 4 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Sofia_Pro_Bold',
                                            fontSize: 19,
                                            color: '#000',
                                            paddingLeft: 5,
                                        }}>
                                        Gallery
                                    </Text>
                                </View>
                                <View>

                                    <TouchableOpacity>

                                        <Icon
                                            name='search'
                                            size={20}
                                            color={'#000'}
                                            style={{ marginTop: 2, marginRight: 4 }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                    <FlatList
              data={galleryArr}
              numColumns={3}
              renderItem={({item, index}) => (
                <View>
                  {console.log(item)}
                  <Image
                    source={{uri: item.imgUrl ? item.imgUrl : item.videoUrl}}
                    style={{
                      marginLeft: 15,
                      marginTop:10,
                      height: 120,
                      width: (windowWidth * 28) / 100,
                      // backgroundColor: '#5c5c5c',
                      borderRadius: 6,
                    }}
                    // resizeMode="contain"
                  />
                </View>
              )}
              keyExtractor={(item, index) => 'key' + index}
            />
                    </CollapseBody>
                </Collapse>




                <Collapse
                    isExpanded={dExpanded}
                    onToggle={isExpanded => setdExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('docs')}
                            style={{
                                marginTop: 15,
                                // flexDirection: 'row',
                                // width: '95%',
                                // alignSelf: 'center',
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name={
                                            dExpanded === true
                                                ? 'chevron-down-outline'
                                                : 'chevron-forward-outline'
                                        }
                                        size={25}
                                        color={'#000'}
                                        style={{ marginTop: 2, marginLeft: 4 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Sofia_Pro_Bold',
                                            fontSize: 19,
                                            color: '#000',
                                            paddingLeft: 5,
                                        }}>
                                        Documents
                                    </Text>
                                </View>
                                <View>

                                    <TouchableOpacity>

                                        <Icon
                                            name='search'
                                            size={20}
                                            color={'#000'}
                                            style={{ marginTop: 2, marginRight: 4 }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                                
                    </CollapseBody>
                </Collapse>



                <Collapse
                    isExpanded={partsExpanded}
                    onToggle={isExpanded => setpartsExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('parts')}
                            style={{
                                marginTop: 15,
                                // flexDirection: 'row',
                                // width: '95%',
                                // alignSelf: 'center',
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name={
                                            partsExpanded === true
                                                ? 'chevron-down-outline'
                                                : 'chevron-forward-outline'
                                        }
                                        size={25}
                                        color={'#000'}
                                        style={{ marginTop: 2, marginLeft: 4 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Sofia_Pro_Bold',
                                            fontSize: 19,
                                            color: '#000',
                                            paddingLeft: 5,
                                        }}>
                                        Parts Manuals
                                    </Text>
                                </View>
                                <View>

                                    <TouchableOpacity>

                                        <Icon
                                            name='search'
                                            size={20}
                                            color={'#000'}
                                            style={{ marginTop: 2, marginRight: 4 }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                       

                       
                    </CollapseBody>
                </Collapse>




                <Collapse
                    isExpanded={mExpanded}
                    onToggle={isExpanded => setmExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('maintenance')}
                            style={{
                                marginTop: 15,
                                // flexDirection: 'row',
                                // width: '95%',
                                // alignSelf: 'center',
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name={
                                            mExpanded === true
                                                ? 'chevron-down-outline'
                                                : 'chevron-forward-outline'
                                        }
                                        size={25}
                                        color={'#000'}
                                        style={{ marginTop: 2, marginLeft: 4 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Sofia_Pro_Bold',
                                            fontSize: 19,
                                            color: '#000',
                                            paddingLeft: 5,
                                        }}>
                                        Maintenance Log
                                    </Text>
                                </View>
                                <View>

                                    <TouchableOpacity>

                                        <Icon
                                            name='search'
                                            size={20}
                                            color={'#000'}
                                            style={{ marginTop: 2, marginRight: 4 }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />

                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                      
       
                    </CollapseBody>
                </Collapse>



                <Collapse
                    isExpanded={uExpanded}
                    onToggle={isExpanded => setuExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('user')}
                            style={{
                                marginTop: 15,
                                // flexDirection: 'row',
                                // width: '95%',
                                // alignSelf: 'center',
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name={
                                            uExpanded === true
                                                ? 'chevron-down-outline'
                                                : 'chevron-forward-outline'
                                        }
                                        size={25}
                                        color={'#000'}
                                        style={{ marginTop: 2, marginLeft: 4 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Sofia_Pro_Bold',
                                            fontSize: 19,
                                            color: '#000',
                                            paddingLeft: 5,
                                        }}>
                                        User Manuals
                                    </Text>
                                </View>
                                <View>

                                    <TouchableOpacity>

                                        <Icon
                                            name='search'
                                            size={20}
                                            color={'#000'}
                                            style={{ marginTop: 2, marginRight: 4 }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                       

                     
                    </CollapseBody>
                </Collapse>





                <Collapse
                    isExpanded={IExpanded}
                    onToggle={isExpanded => setIExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('installation')}
                            style={{
                                marginTop: 15,
                                // flexDirection: 'row',
                                // width: '95%',
                                // alignSelf: 'center',
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name={
                                            uExpanded === true
                                                ? 'chevron-down-outline'
                                                : 'chevron-forward-outline'
                                        }
                                        size={25}
                                        color={'#000'}
                                        style={{ marginTop: 2, marginLeft: 4 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Sofia_Pro_Bold',
                                            fontSize: 19,
                                            color: '#000',
                                            paddingLeft: 5,
                                        }}>
                                        Installation & Operation Manuals
                                    </Text>
                                </View>
                                <View>

                                    <TouchableOpacity>

                                        <Icon
                                            name='search'
                                            size={20}
                                            color={'#000'}
                                            style={{ marginTop: 2, marginRight: 4 }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        
    
                    </CollapseBody>
                </Collapse>





                <Collapse
                    isExpanded={SExpanded}
                    onToggle={isExpanded => setSExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('service')}
                            style={{
                                marginTop: 15,
                                // flexDirection: 'row',
                                // width: '95%',
                                // alignSelf: 'center',
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name={
                                            SExpanded === true
                                                ? 'chevron-down-outline'
                                                : 'chevron-forward-outline'
                                        }
                                        size={25}
                                        color={'#000'}
                                        style={{ marginTop: 2, marginLeft: 4 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Sofia_Pro_Bold',
                                            fontSize: 19,
                                            color: '#000',
                                            paddingLeft: 5,
                                        }}>
                                        Service Bulletins
                                    </Text>
                                </View>
                                <View>

                                    <TouchableOpacity>

                                        <Icon
                                            name='search'
                                            size={20}
                                            color={'#000'}
                                            style={{ marginTop: 2, marginRight: 4 }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                       

                       
                    </CollapseBody>
                </Collapse>




                <Collapse
                    isExpanded={interExpanded}
                    onToggle={isExpanded => setinterExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('interactive')}
                            style={{
                                marginTop: 15,
                                // flexDirection: 'row',
                                // width: '95%',
                                // alignSelf: 'center',
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name={
                                            interExpanded === true
                                                ? 'chevron-down-outline'
                                                : 'chevron-forward-outline'
                                        }
                                        size={25}
                                        color={'#000'}
                                        style={{ marginTop: 2, marginLeft: 4 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Sofia_Pro_Bold',
                                            fontSize: 19,
                                            color: '#000',
                                            paddingLeft: 5,
                                        }}>
                                        Interactive Part Diagrams
                                    </Text>
                                </View>
                                <View>

                                    <TouchableOpacity>

                                        <Icon
                                            name='search'
                                            size={20}
                                            color={'#000'}
                                            style={{ marginTop: 2, marginRight: 4 }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        

                      
                    </CollapseBody>
                </Collapse>



                <Collapse
                    isExpanded={vExpanded}
                    onToggle={isExpanded => setvExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('video')}
                            style={{
                                marginTop: 15,
                                // flexDirection: 'row',
                                // width: '95%',
                                // alignSelf: 'center',
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name={
                                            vExpanded === true
                                                ? 'chevron-down-outline'
                                                : 'chevron-forward-outline'
                                        }
                                        size={25}
                                        color={'#000'}
                                        style={{ marginTop: 2, marginLeft: 4 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Sofia_Pro_Bold',
                                            fontSize: 19,
                                            color: '#000',
                                            paddingLeft: 5,
                                        }}>
                                        Videos Based On Current Equipment
                                    </Text>
                                </View>
                                <View>

                                    <TouchableOpacity>

                                        <Icon
                                            name='search'
                                            size={20}
                                            color={'#000'}
                                            style={{ marginTop: 2, marginRight: 4 }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                                 
                    </CollapseBody>
                </Collapse>





                <Collapse
                    isExpanded={yExpanded}
                    onToggle={isExpanded => setyExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('youtube')}
                            style={{
                                marginTop: 15,
                                // flexDirection: 'row',
                                // width: '95%',
                                // alignSelf: 'center',
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name={
                                            yExpanded === true
                                                ? 'chevron-down-outline'
                                                : 'chevron-forward-outline'
                                        }
                                        size={25}
                                        color={'#000'}
                                        style={{ marginTop: 2, marginLeft: 4 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Sofia_Pro_Bold',
                                            fontSize: 19,
                                            color: '#000',
                                            paddingLeft: 5,
                                        }}>
                                        Similar Youtube Videos
                                    </Text>
                                </View>
                                <View>

                                    <TouchableOpacity>

                                        <Icon
                                            name='search'
                                            size={20}
                                            color={'#000'}
                                            style={{ marginTop: 2, marginRight: 4 }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                      

                       
                    </CollapseBody>
                </Collapse>


              
                <View style={{ marginBottom: 80 }}></View>
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
  
});
export default BranchFileRoomScreen;
