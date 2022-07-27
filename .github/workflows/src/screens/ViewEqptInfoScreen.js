import React, { useEffect, useState, useRef, useLayoutEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView,
    Linking,
    Modal,
    TextInput,
    Image,
    RefreshControl,
} from 'react-native';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList,
} from 'accordion-collapse-react-native';
import image from '../theme/Images';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import SignatureCapture from 'react-native-signature-capture';
import {
    getUserFromStorageAsync,
    saveUserInLocalStorageAsync,
} from '../services/LocalStorage';
import moment from 'moment';
import ConnectionCheck from '../components/ConnectionCheck';
// import {saveUserInLocalStorageAsync} from '../services/LocalStorage';
// import {getUserFromStorageAsync} from '../services/LocalStorage';
import { getworkordersasync, workorderDetailsasync } from '../services/Services';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ViewEqptInfoScreen = ({ navigation, route }) => {
    console.log(route.params)


    const [WOStatus, setWOStatus] = useState({
        jobStatus: jobstatusValue,
        sono: route.params.sono,
    });
    const [jobstatusValue, setjobstatusValue] = useState('');
    const [pExpanded, setpExpanded] = React.useState(true);
    // const [EquipmentObject, setEquipmentObject] = React.useState({});
    const [GalleryExpanded, setGalleryExpanded] = React.useState(true);
    const [dExpanded, setdExpanded] = React.useState(true);
    const [partsExpanded, setpartsExpanded] = React.useState(true);
    const [mExpanded, setmExpanded] = React.useState(true);
    const [uExpanded, setuExpanded] = React.useState(true);
    const [IExpanded, setIExpanded] = React.useState(true);
    const [SExpanded, setSExpanded] = React.useState(true);
    const [interExpanded, setinterExpanded] = React.useState(true);
    const [vExpanded, setvExpanded] = React.useState(true);
    const [yExpanded, setyExpanded] = React.useState(true);
    const [prevExpanded, setprevExpanded] = React.useState(true);
    const [SignModalOpen, setSignModalOpen] = React.useState(false);
    const signatureView = React.useRef(null);
    const [signdata, setsigndata] = React.useState(null);
    const [EquipModalVisible, setEquipModalVisible] = React.useState(false);
    const [EquipmentObject, setEquipmentObject] = React.useState({});
    const [EqObj, setEqObj] = React.useState({});
    const [workorders, setworkorders] = useState([]);
    const [networkModal, setNetworkModal] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [EqItem, setEqItem] = React.useState({});



    const [searchphotosHeight, setsearchphotosHeight] = React.useState(false);
    const [searchgalleryHeight, setsearchgalleryHeight] = React.useState(false);
    const [searchdocsHeight, setsearchdocsHeight] = React.useState(false);
    const [searchpartsHeight, setsearchpartsHeight] = React.useState(false);
    const [searchmHeight, setsearchmHeight] = React.useState(false);
    const [searchuHeight, setsearchuHeight] = React.useState(false);
    const [searchIHeight, setsearchIHeight] = React.useState(false);
    const [searchSHeight, setsearchSHeight] = React.useState(false);
    const [searchinterHeight, setsearchinterHeight] = React.useState(false);
    const [searchvHeight, setsearchvHeight] = React.useState(false);
    const [searchyHeight, setsearchyHeight] = React.useState(false);
    const [searchprevHeight, setsearchprevHeight] = React.useState(false);


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
            case 'previous':
                setprevExpanded(!prevExpanded);
                break;
            default:
                break;
        }
        console.log(item);
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

    React.useEffect(() => {
        saveSignLocal();
    }, []);

    const saveSignLocal = async () => {
        let res = await getUserFromStorageAsync('SaveSign');
        setsigndata(res);
    };
    const saveDigitalSign = () => {
        setSignModalOpen(true);
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

    useLayoutEffect(() => {
        getStatusAsync();
        getworkorders();
        // workorderDetailsFun();
        // equipmentTypeFun();
        // getManufacturDataFun();
        // getPartsNoFun();
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <Header
                searchIcon={false}
                title={'Equipment Info'}
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
                 onPressMenu={() =>  {setEqItem(route.params.EqObj),setEquipModalVisible(!EquipModalVisible)}}
                jobstatusValue={jobstatusValue}
                sono={route.params.EqObj.sono}
                customerName={route.params.EqObj.cname}

            />




            <View
                style={{
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <View>
                    <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Sofia_Pro_Bold', }}>
                        {/* {EqObj.} */}
                        {route.params.EqObj.description}
                    </Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, color: 'black' }}>
                            Modal :
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>{route.params.EqObj.modelNo} </Text>
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
                        <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Sofia_Pro_Regular', }}>Install Date : </Text>
                    </View>
                    <View>
                        <Text style={{ marginTop: 3 }}>04/20/2020</Text>
                    </View>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Sofia_Pro_Regular', }}>Serial No : </Text>
                    </View>
                    <View>
                        <Text style={{ marginTop: 3 }}>{route.params.EqObj.serialNo}</Text>
                    </View>
                </View>


            </View>










            <View style={{ flexDirection: 'row', marginTop: 5, alignSelf: 'center' }}>
                <TouchableOpacity>
                    <Image source={image.one} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={image.two} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={{ marginHorizontal: 3 }} source={image.three} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={image.four} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={{ marginHorizontal: 3 }} source={image.five} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={image.six} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={{ marginHorizontal: 3 }} source={image.seven} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={image.eight} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={{ marginHorizontal: 3 }} source={image.nine} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={image.ten} />
                </TouchableOpacity>
            </View>




            <View
                style={{
                    marginTop: 5,
                    alignSelf: 'center',
                    borderBottomColor: 'black',
                    width: (windowWidth * 85 / 100),
                    borderBottomWidth: 1,
                }}
            />
            <ScrollView>
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

                                    <TouchableOpacity onPress={() => { setsearchphotosHeight(!searchphotosHeight) }}>
                                        <Icon
                                            name={
                                                searchphotosHeight === true ? 'close' : 'search'
                                            }
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
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {searchphotosHeight === true && (
                                    <View>
                                        <View
                                            style={{
                                                height: 38,
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
                                            {/* <Icon
                  style={{marginHorizontal: 10}}
                  name="search-outline"
                  size={20}
                /> */}
                                            <TextInput
                                                placeholder="Name"
                                                // value={Title}
                                                // onChangeText={text => setTitle(text)}
                                                style={{
                                                    fontSize: 17,
                                                    height: 45,
                                                    width: '100%',
                                                    marginLeft: 10,
                                                    letterSpacing: 0.4,
                                                }}
                                            />
                                        </View>


                                    </View>
                                )}
                            </View>

                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    paddingHorizontal: 15,
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    marginTop: 20,
                                }}>
                                <View
                                    style={{
                                        // marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}></View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}></View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}></View>

                            </View>
                        </View>

                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    paddingHorizontal: 15,
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    marginTop: 10,
                                }}>
                                <View
                                    style={{
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}></View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}></View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>

                                </View>
                            </View>
                        </View>
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

                                        <TouchableOpacity onPress={() => { setsearchgalleryHeight(!searchgalleryHeight) }}>
                                            <Icon
                                                name={
                                                    searchgalleryHeight === true ? 'close' : 'search'
                                                }
                                                size={20}
                                                color={'#000'}
                                                style={{ marginTop: 2, marginRight: 4 }}
                                            />

                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {searchgalleryHeight === true && (
                                    <View>
                                        <View
                                            style={{
                                                height: 38,
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
                                            {/* <Icon
                  style={{marginHorizontal: 10}}
                  name="search-outline"
                  size={20}
                /> */}
                                            <TextInput
                                                placeholder="Name"
                                                // value={Title}
                                                // onChangeText={text => setTitle(text)}
                                                style={{
                                                    fontSize: 17,
                                                    height: 45,
                                                    width: '100%',
                                                    marginLeft: 10,
                                                    letterSpacing: 0.4,
                                                }}
                                            />
                                        </View>


                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    paddingHorizontal: 15,
                                    marginTop: 20,
                                }}>
                                <View
                                    style={{
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    paddingHorizontal: 15,
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    marginTop: 10,
                                }}>
                                <View
                                    style={{
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}></View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}></View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}></View>
                            </View>
                        </View>
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

                                        <TouchableOpacity onPress={() => { setsearchdocsHeight(!searchdocsHeight) }}>
                                            <Icon
                                                name={
                                                    searchdocsHeight === true ? 'close' : 'search'
                                                }
                                                size={20}
                                                color={'#000'}
                                                style={{ marginTop: 2, marginRight: 4 }}
                                            />

                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {searchdocsHeight === true && (
                                    <View>
                                        <View
                                            style={{
                                                height: 38,
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
                                            {/* <Icon
                  style={{marginHorizontal: 10}}
                  name="search-outline"
                  size={20}
                /> */}
                                            <TextInput
                                                placeholder="Name"
                                                // value={Title}
                                                // onChangeText={text => setTitle(text)}
                                                style={{
                                                    fontSize: 17,
                                                    height: 45,
                                                    width: '100%',
                                                    marginLeft: 10,
                                                    letterSpacing: 0.4,
                                                }}
                                            />
                                        </View>


                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}>
                                <View
                                    style={{
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                            </View>
                        </View>

                        {/* 
          <View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <View style={{ height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>


            </View>

          </View> */}
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

                                        <TouchableOpacity onPress={() => { setsearchpartsHeight(!searchpartsHeight) }}>
                                            <Icon
                                                name={
                                                    searchpartsHeight === true ? 'close' : 'search'
                                                }
                                                size={20}
                                                color={'#000'}
                                                style={{ marginTop: 2, marginRight: 4 }}
                                            />

                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {searchpartsHeight === true && (
                                    <View>
                                        <View
                                            style={{
                                                height: 38,
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
                                            {/* <Icon
                  style={{marginHorizontal: 10}}
                  name="search-outline"
                  size={20}
                /> */}
                                            <TextInput
                                                placeholder="Name"
                                                // value={Title}
                                                // onChangeText={text => setTitle(text)}
                                                style={{
                                                    fontSize: 17,
                                                    height: 45,
                                                    width: '100%',
                                                    marginLeft: 10,
                                                    letterSpacing: 0.4,
                                                }}
                                            />
                                        </View>


                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}>
                                <View
                                    style={{
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                            </View>
                        </View>

                        {/* 
          <View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <View style={{ height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>


            </View>

          </View> */}
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

                                        <TouchableOpacity onPress={() => { setsearchmHeight(!searchmHeight) }}>
                                            <Icon
                                                name={
                                                    searchmHeight === true ? 'close' : 'search'
                                                }
                                                size={20}
                                                color={'#000'}
                                                style={{ marginTop: 2, marginRight: 4 }}
                                            />

                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {searchmHeight === true && (
                                    <View>
                                        <View
                                            style={{
                                                height: 38,
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
                                            {/* <Icon
                  style={{marginHorizontal: 10}}
                  name="search-outline"
                  size={20}
                /> */}
                                            <TextInput
                                                placeholder="Name"
                                                // value={Title}
                                                // onChangeText={text => setTitle(text)}
                                                style={{
                                                    fontSize: 17,
                                                    height: 45,
                                                    width: '100%',
                                                    marginLeft: 10,
                                                    letterSpacing: 0.4,
                                                }}
                                            />
                                        </View>


                                    </View>
                                )}
                            </View>

                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}>
                                <View
                                    style={{
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                            </View>
                        </View>

                        {/* 
          <View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <View style={{ height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>


            </View>

          </View> */}
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

                                        <TouchableOpacity onPress={() => { setsearchuHeight(!searchuHeight) }}>
                                            <Icon
                                                name={
                                                    searchuHeight === true ? 'close' : 'search'
                                                }
                                                size={20}
                                                color={'#000'}
                                                style={{ marginTop: 2, marginRight: 4 }}
                                            />

                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {searchuHeight === true && (
                                    <View>
                                        <View
                                            style={{
                                                height: 38,
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
                                            {/* <Icon
                  style={{marginHorizontal: 10}}
                  name="search-outline"
                  size={20}
                /> */}
                                            <TextInput
                                                placeholder="Name"
                                                // value={Title}
                                                // onChangeText={text => setTitle(text)}
                                                style={{
                                                    fontSize: 17,
                                                    height: 45,
                                                    width: '100%',
                                                    marginLeft: 10,
                                                    letterSpacing: 0.4,
                                                }}
                                            />
                                        </View>


                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}>
                                <View
                                    style={{
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                            </View>
                        </View>

                        {/* 
          <View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <View style={{ height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>


            </View>

          </View> */}
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

                                        <TouchableOpacity onPress={() => { setsearchIHeight(!searchIHeight) }}>
                                            <Icon
                                                name={
                                                    searchIHeight === true ? 'close' : 'search'
                                                }
                                                size={20}
                                                color={'#000'}
                                                style={{ marginTop: 2, marginRight: 4 }}
                                            />

                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {searchIHeight === true && (
                                    <View>
                                        <View
                                            style={{
                                                height: 38,
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
                                            {/* <Icon
                  style={{marginHorizontal: 10}}
                  name="search-outline"
                  size={20}
                /> */}
                                            <TextInput
                                                placeholder="Name"
                                                // value={Title}
                                                // onChangeText={text => setTitle(text)}
                                                style={{
                                                    fontSize: 17,
                                                    height: 45,
                                                    width: '100%',
                                                    marginLeft: 10,
                                                    letterSpacing: 0.4,
                                                }}
                                            />
                                        </View>


                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10,
                                }}>
                                <View
                                    style={{
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                            </View>
                        </View>

                        {/* 
          <View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <View style={{ height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>


            </View>

          </View> */}
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

                                        <TouchableOpacity onPress={() => { setsearchSHeight(!searchSHeight) }}>
                                            <Icon
                                                name={
                                                    searchSHeight === true ? 'close' : 'search'
                                                }
                                                size={20}
                                                color={'#000'}
                                                style={{ marginTop: 2, marginRight: 4 }}
                                            />

                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {searchSHeight === true && (
                                    <View>
                                        <View
                                            style={{
                                                height: 38,
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
                                            {/* <Icon
                  style={{marginHorizontal: 10}}
                  name="search-outline"
                  size={20}
                /> */}
                                            <TextInput
                                                placeholder="Name"
                                                // value={Title}
                                                // onChangeText={text => setTitle(text)}
                                                style={{
                                                    fontSize: 17,
                                                    height: 45,
                                                    width: '100%',
                                                    marginLeft: 10,
                                                    letterSpacing: 0.4,
                                                }}
                                            />
                                        </View>


                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}>
                                <View
                                    style={{
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                            </View>
                        </View>

                        {/* 
          <View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <View style={{ height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>


            </View>

          </View> */}
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

                                        <TouchableOpacity onPress={() => { setsearchinterHeight(!searchinterHeight) }}>
                                            <Icon
                                                name={
                                                    searchinterHeight === true ? 'close' : 'search'
                                                }
                                                size={20}
                                                color={'#000'}
                                                style={{ marginTop: 2, marginRight: 4 }}
                                            />

                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {searchinterHeight === true && (
                                    <View>
                                        <View
                                            style={{
                                                height: 38,
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
                                            {/* <Icon
                  style={{marginHorizontal: 10}}
                  name="search-outline"
                  size={20}
                /> */}
                                            <TextInput
                                                placeholder="Name"
                                                // value={Title}
                                                // onChangeText={text => setTitle(text)}
                                                style={{
                                                    fontSize: 17,
                                                    height: 45,
                                                    width: '100%',
                                                    marginLeft: 10,
                                                    letterSpacing: 0.4,
                                                }}
                                            />
                                        </View>


                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}>
                                <View
                                    style={{
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                            </View>
                        </View>

                        {/* 
          <View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <View style={{ height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>


            </View>

          </View> */}
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

                                        <TouchableOpacity onPress={() => { setsearchvHeight(!searchvHeight) }}>
                                            <Icon
                                                name={
                                                    searchvHeight === true ? 'close' : 'search'
                                                }
                                                size={20}
                                                color={'#000'}
                                                style={{ marginTop: 2, marginRight: 4 }}
                                            />

                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {searchvHeight === true && (
                                    <View>
                                        <View
                                            style={{
                                                height: 38,
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
                                            {/* <Icon
                  style={{marginHorizontal: 10}}
                  name="search-outline"
                  size={20}
                /> */}
                                            <TextInput
                                                placeholder="Name"
                                                // value={Title}
                                                // onChangeText={text => setTitle(text)}
                                                style={{
                                                    fontSize: 17,
                                                    height: 45,
                                                    width: '100%',
                                                    marginLeft: 10,
                                                    letterSpacing: 0.4,
                                                }}
                                            />
                                        </View>


                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}>
                                <View
                                    style={{
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                            </View>
                        </View>

                        {/* 
          <View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <View style={{ height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>


            </View>

          </View> */}
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

                                        <TouchableOpacity onPress={() => { setsearchyHeight(!searchyHeight) }}>
                                            <Icon
                                                name={
                                                    searchyHeight === true ? 'close' : 'search'
                                                }
                                                size={20}
                                                color={'#000'}
                                                style={{ marginTop: 2, marginRight: 4 }}
                                            />

                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {searchyHeight === true && (
                                    <View>
                                        <View
                                            style={{
                                                height: 38,
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
                                            {/* <Icon
                  style={{marginHorizontal: 10}}
                  name="search-outline"
                  size={20}
                /> */}
                                            <TextInput
                                                placeholder="Name"
                                                // value={Title}
                                                // onChangeText={text => setTitle(text)}
                                                style={{
                                                    fontSize: 17,
                                                    height: 45,
                                                    width: '100%',
                                                    marginLeft: 10,
                                                    letterSpacing: 0.4,
                                                }}
                                            />
                                        </View>


                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}>
                                <View
                                    style={{
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 15,
                                        height: 120,
                                        width: (windowWidth * 28) / 100,
                                        backgroundColor: '#5c5c5c',
                                        borderRadius: 6,
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'black',
                                        }}></Text>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            marginLeft: 2,
                                            fontSize: 18,
                                            color: 'grey',
                                        }}></Text>
                                </View>
                            </View>
                        </View>

                        {/* 
          <View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <View style={{ height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>


            </View>

          </View> */}
                    </CollapseBody>
                </Collapse>





                <Collapse
                    isExpanded={prevExpanded}
                    onToggle={isExpanded => setprevExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('previous')}
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
                                            prevExpanded === true
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
                                        Previous Jobs
                                    </Text>
                                </View>
                                <View>


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
                        <View style={{ flex: 1 }}>
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={getworkorders}
                                    />
                                }>
                                <View style={{ marginTop: 5 }} />
                                <View>
                                    <View>
                                        {workorders.map(item => (
                                            <View style={{ flex: 0 }}>
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
                                                                borderRadius: 1,
                                                            }}>
                                                            <View
                                                                style={{
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'space-between',
                                                                    marginTop: 3,
                                                                }}>
                                                                <Text
                                                                    style={{
                                                                        fontFamily: 'Sofia_Pro_Bold',
                                                                        // fontStyle: 'regular',
                                                                        marginTop: 5,
                                                                        fontSize: 18,
                                                                        // fontWeight: 'bold',
                                                                        color: '#3a3d41',
                                                                    }}>
                                                                    Work Order #{item.sono}
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
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <TouchableOpacity onPress={() => shareFun()}>
                                                                        <Icon
                                                                            name="share-social"
                                                                            size={20}
                                                                            color={'#3a3d41'}
                                                                            style={{ marginTop: 6, marginRight: 15 }}

                                                                        />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity
                                                                        onPress={() => detailsScreen(item)}>
                                                                        <Icon
                                                                            name="arrow-forward-outline"
                                                                            size={20}
                                                                            color={'#3a3d41'}
                                                                            style={{ marginTop: 5 }}
                                                                        />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                            {/* <View style={{ flexDirection: 'row', marginTop: 4 }}>
                                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 1, height: 25, width: 100, backgroundColor: '#1a60a3', borderRadius: 12 }}>
                                                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>In Progress</Text>
                                                                </View>
                                                                <View style={{ marginLeft: 7, marginTop: 3 }}>
                                                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>{item.customerName}</Text>
                                                                </View>
                                                            </View> */}

                                                            <ScrollView
                                                                contentContainerStyle={{
                                                                    flexDirection: 'row',
                                                                    marginTop: 10,
                                                                }}
                                                                horizontal
                                                                showsHorizontalScrollIndicator={false}>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Icon
                                                                        name="location"
                                                                        size={35}
                                                                        color={'#3a3d41'}
                                                                        style={{ marginTop: 3 }}
                                                                        onPress={() => getLocationFun()}
                                                                    />
                                                                    <TouchableOpacity>

                                                                        <Icon
                                                                            name="person"
                                                                            size={35}
                                                                            color={'#3a3d41'}
                                                                            style={{ marginTop: 3, marginLeft: 5 }}
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
                                                                        backgroundColor: '#6a9dff',
                                                                        height: 40,
                                                                        paddingHorizontal: 10,
                                                                        // borderRadius: 3,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        marginLeft: 8,
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
                                                                    onPress={() =>
                                                                        navigation.navigate('BranchFileRoomScreen')
                                                                    }
                                                                    style={{
                                                                        backgroundColor: '#f6a609',
                                                                        height: 40,
                                                                        paddingHorizontal: 10,
                                                                        // borderRadius: 3,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        marginLeft: 8,
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
                                                                        height: 40,
                                                                        paddingHorizontal: 10,
                                                                        // borderRadius: 2,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        marginLeft: 8,
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
                                                                                height: 40,
                                                                                paddingHorizontal: 10,
                                                                                // borderRadius: 2,
                                                                                justifyContent: 'center',
                                                                                alignItems: 'center',
                                                                                marginLeft: 8,
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

                                <View style={{ marginTop: 10 }} />



                                <View>
                                    {workorders.map(item => (
                                        <View style={{ flex: 0 }}>
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
                                                            height: (windowHeight * 13) / 100,
                                                            width: (windowWidth * 95) / 100,
                                                            borderWidth: 1,
                                                            borderColor: 'black',
                                                            borderRadius: 1,
                                                        }}>
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                                marginTop: 3,
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    marginTop: 5,
                                                                    fontSize: 18,
                                                                    // fontWeight: 'bold',
                                                                    color: '#3a3d41',
                                                                    fontFamily: 'Sofia_Pro_Bold',
                                                                }}>
                                                                Work Order #{item.sono}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    marginTop: 9,
                                                                    fontSize: 15,
                                                                    fontWeight: 'bold',
                                                                }}>
                                                                {item.sechDate}
                                                            </Text>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Icon
                                                                    name="share-social"
                                                                    size={20}
                                                                    color={'#3a3d41'}
                                                                    style={{ marginTop: 5, marginRight: 15 }}
                                                                    onPress={() => shareFun()}
                                                                />
                                                                <TouchableOpacity
                                                                    onPress={() => detailsScreen(item)}>
                                                                    <Icon
                                                                        name="arrow-forward-outline"
                                                                        size={20}
                                                                        color={'#3a3d41'}
                                                                        style={{ marginTop: 5 }}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>

                                                        </View>
                                                        {/* <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 1, height: 25, width: 100, backgroundColor: '#1a60a3', borderRadius: 12 }}>
                                                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>In Progress</Text>
                                                                </View>

                                                                <View style={{ marginLeft: 7, marginTop: 3 }}>
                                                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>{item.customerName}</Text>
                                                                </View>
                                                            </View> */}

                                                        <ScrollView
                                                            contentContainerStyle={{
                                                                flexDirection: 'row',
                                                                marginTop: 8,
                                                            }}
                                                            horizontal
                                                            showsHorizontalScrollIndicator={false}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <TouchableOpacity onPress={() => getLocationFun()}>
                                                                    <Icon
                                                                        name="location"
                                                                        size={35}
                                                                        color={'#3a3d41'}
                                                                        style={{ marginTop: 3 }}
                                                                    />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                >
                                                                    <Icon
                                                                        name="person"
                                                                        size={35}
                                                                        color={'#3a3d41'}
                                                                        style={{ marginLeft: 5, marginTop: 3 }}
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
                                                                    height: 40,
                                                                    paddingHorizontal: 10,
                                                                    // borderRadius: 2,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    marginLeft: 8,
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
                                                                onPress={() =>
                                                                    navigation.navigate('BranchFileRoomScreen')
                                                                }
                                                                style={{
                                                                    backgroundColor: '#f6a609',
                                                                    height: 40,
                                                                    paddingHorizontal: 10,
                                                                    // borderRadius: 3,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    marginLeft: 8,
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
                                                                    height: 40,
                                                                    paddingHorizontal: 10,
                                                                    // borderRadius: 2,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    marginLeft: 8,
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
                                                                            height: 40,
                                                                            paddingHorizontal: 10,
                                                                            // borderRadius: 2,
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            marginLeft: 8,
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


                            </ScrollView>
                        </View>

                        {/* 
          <View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <View style={{ height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>
              <View style={{ marginLeft: 15, height: 120, width: windowWidth * 28 / 100, backgroundColor: '#5c5c5c', borderRadius: 6 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'black' }}></Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 2, fontSize: 18, color: 'grey' }}></Text>
              </View>


            </View>

          </View> */}
                    </CollapseBody>
                </Collapse>










                {/* <Margin bottom={12} /> */}
                <View style={{ marginBottom: 80 }}></View>
            </ScrollView>


            <View style={{ height: 10 }}>

            </View>

            <TouchableOpacity
                onPress={() => setEquipModalVisible(true)} >
                <View
                    style={{
                        height: 40,
                        backgroundColor: 'black',
                        marginBottom: 10,
                        alignSelf: 'center',
                        width: (windowWidth * 92) / 100,
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
                        EDIT  EQUIPMENT
                    </Text>
                </View>
            </TouchableOpacity>

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
                                            {EqItem.description}
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
                                                            <Text
                                                                style={{ fontFamily: 'Sofia_Pro_Bold' }}>
                                                                End of Warrenty :
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity
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
                                                                {/* <Icon
                                          name="calendar"
                                          size={15}
                                          style={{marginTop: 2}}
                                          color={'#000'}
                                        /> */}
                                                            </View>
                                                            <View>
                                                                <Text style={{ marginLeft: 3 }}>
                                                                    {/* Jan 12 2022 */}
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
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
                                                                {/* <Icon
                                          name="calendar"
                                          size={15}
                                          style={{marginTop: 2}}
                                          color={'#000'}
                                        /> */}
                                                            </View>
                                                            <View>
                                                                <Text style={{ marginLeft: 3 }}>
                                                                    {/* Jan 12 2022 */}
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>

                                                    <View>
                                                        <View>
                                                            <Text
                                                                style={{
                                                                    marginLeft: 8,
                                                                    fontFamily: 'Sofia_Pro_Bold',
                                                                    textAlign: 'center',
                                                                }}>
                                                                Last Serviced :
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity
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
                                                                {/* <Icon
                                          name="calendar"
                                          size={15}
                                          style={{marginTop: 2}}
                                          color={'#000'}
                                        /> */}
                                                            </View>
                                                            <View>
                                                                {/* <Text style={{ marginLeft: 3 }}>
                                          Jan 12 2022
                                        </Text> */}
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>

                                                <View style={{ marginTop: 10 }}>
                                                    <View style={{ paddingHorizontal: 15 }}>
                                                        <Text
                                                            style={{ fontFamily: 'Sofia_Pro_Bold' }}>
                                                            PART NUMBER
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity
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
                                                            {/* XHGUANGA121312 */}
                                                        </Text>
                                                    </TouchableOpacity>
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
                                                            {/* Cold Side Part */}
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
                                                            {/* Avvon */}
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
                                                                {/* 2022 */}
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
                                                                {/* FAIR */}
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
                                                            {/* <Text style={{ fontFamily: 'Sofia_Pro_Bold', letterSpacing: 0.5 }}>SAFETY ISSUE</Text> */}
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
                                                            {EquipmentObject.modelNo}
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
                                                            {EqItem.serialNo}
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
                                                            {/* No Alternate Equipment Written */}
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
                                                            {/* NEW YORK CITY */}
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
                                                            {/* No Representative Selected */}
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
                                                                    {/* 1 */}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View>
                                                        <View
                                                            style={{ marginTop: 10, marginLeft: 25 }}>
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
                                                                    {/* 1 */}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View>
                                                        <View
                                                            style={{ marginTop: 10, marginLeft: 35 }}>
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
                                                                    {/* 1 */}
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
                                                            {/* No Additional Instructions */}
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
                                                            {/* Prestige Building */}
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
                                                                {/* Scaler */}
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
                                                            {/* 4/51 */}
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
                                                            {/* 543001 */}
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
                                                            {/* EA23534 */}
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
                                                            {/* GA394 */}
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
                                                                {/* 0.00 */}
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
                                                                {/* 1 */}
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
                                                                {/* John */}
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
                                                                {/* Kyle */}
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
                                                            {/* R309 */}
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

                                <TouchableOpacity
                                    onPress={() => {
                                        setEquipModalVisible(false);
                                    }}>
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
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default ViewEqptInfoScreen;
