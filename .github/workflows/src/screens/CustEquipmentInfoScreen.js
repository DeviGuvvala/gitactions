import React from 'react';
import {
    StyleSheet,
    Text,
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustEquipmentInfoScreen = ({ navigation, route }) => {
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

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                searchIcon={false}
                title={'Equipment Info'}
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
                            Air Conditioning Unit
                        </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                                Modal :{' '}
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>567khg</Text>
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
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Sofia_Pro_Bold', }}>Insall Date : </Text>
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
                            <Text style={{ marginTop: 3 }}>463495</Text>
                        </View>
                    </View>


                </View>









                {/* .........................Recently viewd items............................. */}

                <Collapse
                    isExpanded={recentExpanded}
                    onToggle={isExpanded => setrecentExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('Recent')}
                            style={styles.collapseHeaderstyle}>
                            <Icon
                                name={
                                    recentExpanded === true
                                        ? 'chevron-down-outline'
                                        : 'chevron-forward-outline'
                                }
                                size={20}
                                color={'#000'}
                                style={{ marginTop: 3 }}
                            />
                            <Text style={styles.collapseHeaderTextStyle}>Recently Viewed Items</Text>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View style={styles.collapseBodyStyle}>
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

                        <View>
                            <View style={styles.collapseBodyStyle}>
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




                {/* .......................Gallery View....................................... */}


                <Collapse
                    isExpanded={galleryExpanded}
                    onToggle={isExpanded => setgalleryExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('Gallery')}
                            style={styles.collapseHeaderstyle}>
                            <Icon
                                name={
                                    galleryExpanded === true
                                        ? 'chevron-down-outline'
                                        : 'chevron-forward-outline'
                                }
                                size={20}
                                color={'#000'}
                                style={{ marginTop: 3 }}
                            />
                            <Text style={styles.collapseHeaderTextStyle}>Gallery</Text>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View style={styles.collapseBodyStyle}>
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

                        <View>
                            <View style={styles.collapseBodyStyle}>
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


                {/* ......................................DocumentsView....................................... */}

                <Collapse
                    isExpanded={documentsExpanded}
                    onToggle={isExpanded => setdocumentsExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('Documents')}
                            style={styles.collapseHeaderstyle}>
                            <Icon
                                name={
                                    documentsExpanded === true
                                        ? 'chevron-down-outline'
                                        : 'chevron-forward-outline'
                                }
                                size={20}
                                color={'#000'}
                                style={{ marginTop: 3 }}
                            />
                            <Text style={styles.collapseHeaderTextStyle}>Documents</Text>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View style={styles.collapseBodyStyle}>
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

                {/* ................................................PartslistView........................................ */}

                <Collapse
                    isExpanded={partslistExpanded}
                    onToggle={isExpanded => setpartslistExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('Partslist')}
                            style={styles.collapseHeaderstyle}>
                            <Icon
                                name={
                                    partslistExpanded === true
                                        ? 'chevron-down-outline'
                                        : 'chevron-forward-outline'
                                }
                                size={20}
                                color={'#000'}
                                style={{ marginTop: 3 }}
                            />
                            <Text style={styles.collapseHeaderTextStyle}>Parts Manual</Text>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View style={styles.collapseBodyStyle}>
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

                {/* ...................................................Maintenance Log......................... */}

                <Collapse
                    isExpanded={maintenanceExpanded}
                    onToggle={isExpanded => setmaintenanceExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('Maintenance')}
                            style={styles.collapseHeaderstyle}>
                            <Icon
                                name={
                                    maintenanceExpanded === true
                                        ? 'chevron-down-outline'
                                        : 'chevron-forward-outline'
                                }
                                size={20}
                                color={'#000'}
                                style={{ marginTop: 3 }}
                            />
                            <Text style={styles.collapseHeaderTextStyle}>
                                Maintenance Log
                            </Text>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View style={styles.collapseBodyStyle}>
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

                {/* ...................................................UserManuals........................... */}

                <Collapse
                    isExpanded={usermanualsExpanded}
                    onToggle={isExpanded => setusermanualsExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('UserManuals')}
                            style={styles.collapseHeaderstyle}>
                            <Icon
                                name={
                                    usermanualsExpanded === true
                                        ? 'chevron-down-outline'
                                        : 'chevron-forward-outline'
                                }
                                size={20}
                                color={'#000'}
                                style={{ marginTop: 3 }}
                            />
                            <Text style={styles.collapseHeaderTextStyle}>
                                General Manuals
                            </Text>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View style={styles.collapseBodyStyle}>
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

                {/* ..................................................InstallationManuals............................ */}

                <Collapse
                    isExpanded={installationmanualsExpanded}
                    onToggle={isExpanded => setinstallationmanualsExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('InstallationManuals')}
                            style={styles.collapseHeaderstyle}>
                            <Icon
                                name={
                                    installationmanualsExpanded === true
                                        ? 'chevron-down-outline'
                                        : 'chevron-forward-outline'
                                }
                                size={20}
                                color={'#000'}
                                style={{ marginTop: 3 }}
                            />
                            <Text style={styles.collapseHeaderTextStyle}>
                                Installation and Operation Manuals
                            </Text>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View style={styles.collapseBodyStyle}>
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

                {/* ..................................................Servie........................................ */}

                <Collapse
                    isExpanded={serviceExpanded}
                    onToggle={isExpanded => setserviceExpanded(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('service')}
                            style={styles.collapseHeaderstyle}>
                            <Icon
                                name={
                                    serviceExpanded === true
                                        ? 'chevron-down-outline'
                                        : 'chevron-forward-outline'
                                }
                                size={20}
                                style={{ marginTop: 3 }}
                                color={'#000'}
                            />
                            <Text style={styles.collapseHeaderTextStyle}>
                                Service Bulletins
                            </Text>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View style={styles.collapseBodyStyle}>
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

                {/* ....................................................FilesBasedonPreviousJOb.............. */}

                <Collapse
                    isExpanded={filesbasedview}
                    onToggle={isExpanded => setfilesbasedView(isExpanded)}>
                    <CollapseHeader>
                        <TouchableOpacity
                            onPress={() => funExpand('FilesBasedonPreviousJob')}
                            style={styles.collapseHeaderstyle}>
                            <Icon
                                name={
                                    filesbasedview === true
                                        ? 'chevron-down-outline'
                                        : 'chevron-forward-outline'
                                }
                                size={20}
                                // style={{marginTop:3}}
                                color={'#000'}
                                style={{ marginTop: 3 }}
                            />
                            <Text style={styles.collapseHeaderTextStyle}>
                                Similar YouTube Videos
                            </Text>
                        </TouchableOpacity>
                    </CollapseHeader>
                    <CollapseBody>
                        <View>
                            <View style={styles.collapseBodyStyle}>
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

                <View style={{ marginBottom: 30 }}></View>








                {/* <Margin bottom={12} /> */}
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
export default CustEquipmentInfoScreen;
