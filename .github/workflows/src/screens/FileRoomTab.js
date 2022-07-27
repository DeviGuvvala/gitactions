import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import ToggleSwitch from '../components/ToggleSwitch';
import HeaderOptionModal from '../components/HeaderOptionModal';
import {
  getUserFromStorageAsync,
  saveUserInLocalStorageAsync,
} from '../services/LocalStorage';
import {
  localStoragePhotos,
  localStorageVideos,
} from '../components/localStoragePhotos';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FileRoomTab = ({navigation, route}) => {
  let PHArray = localStoragePhotos(route.params.sono);
  let VIArray = localStorageVideos(route.params.sono);
  const [jobstatusValue, setjobstatusValue] = React.useState('');
  const [toggle, setToggle] = useState(true);
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
  const [custnote1, setcustnote1] = React.useState(true);
  const [currentjobEquip, setcurrentjobEquip] = React.useState(true);
  const [custnote2, setcustnote2] = React.useState(true);
  const [companynote1, setcompanynote1] = React.useState(true);
  const [companynote2, setcompanynote2] = React.useState(true);
  const [galleryArr, setgalleryArr] = React.useState([]);
  const [DocArray, setDocArray] = React.useState([]);
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

  const getGalleryAsync = async () => {
    let res = await getUserFromStorageAsync('DocUrl' + route.params.sono);
    console.log(res, 'res===>');
    let GalleryArr = [...PHArray, ...VIArray];
    console.log(GalleryArr, 'GalleryArr');
    setDocArray(res);
    setgalleryArr(GalleryArr);
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
  React.useEffect(() => {
    // getGalleryAsync();
    getStatusAsync();
  }, []);
  React.useEffect(() => {
    getGalleryAsync();
    // getStatusAsync();
  }, [PHArray, VIArray]);
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
      case 'currentjobEquipment':
        setcurrentjobEquip(!currentjobEquip);
        break;
      default:
        break;
    }
    console.log(item);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        searchIcon={false}
        title={'File Room'}
        onPressStatusFun={() => selectStatusFun(jobstatusValue)}
        disabled={true}
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
            style={{flexDirection: 'row', marginTop: 5, paddingHorizontal: 10}}>
            <View>
              <Icon
                name="search"
                size={20}
                color={'#000'}
                style={{marginTop: 3}}
              />
            </View>
            <TouchableOpacity
              style={{marginTop: 2, marginLeft: 5}}
              onPress={() => setsearchequipHeight(!searchequipHeight)}>
              {searchequipHeight === true ? (
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: 'Sofia_Pro_Bold',
                    letterSpacing: 0.5,
                  }}>
                  Click here to close search
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: 'Sofia_Pro_Bold',
                    letterSpacing: 0.5,
                  }}>
                  Click here to open search
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => setsearchequipHeight(!searchequipHeight)}>
              <Icon
                name={
                  searchequipHeight === true ? 'chevron-up' : 'chevron-down'
                }
                size={20}
                color={'#000'}
                style={{marginLeft: 60, marginTop: 4}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
                  style={{marginHorizontal: 10}}
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
                    letterSpacing: 0.4,
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
                  style={{marginHorizontal: 10}}
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
                    letterSpacing: 0.5,
                  }}
                />
              </View>
            </View>
          )}
        </View>

        {/* .........................Recently viewd items............................. */}

        <Collapse
          isExpanded={recentExpanded}
          onToggle={isExpanded => setrecentExpanded(isExpanded)}>
          <CollapseHeader>
            <TouchableOpacity
              onPress={() => funExpand('Recent')}
              style={styles.collapseHeaderstyle}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={
                      recentExpanded === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={25}
                    color={'#000'}
                    style={{marginTop: 2, marginLeft: 4}}
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
                    name="search"
                    size={20}
                    color={'#000'}
                    style={{marginTop: 2, marginRight: 4}}
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
            {/* <View>
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
                  }}></View>
              </View>
            </View> */}
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={
                      galleryExpanded === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={25}
                    color={'#000'}
                    style={{marginTop: 2, marginLeft: 4}}
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

                <TouchableOpacity>
                  <View>
                    <Icon
                      name="search"
                      size={20}
                      color={'#000'}
                      style={{marginTop: 2, marginRight: 4}}
                    />
                  </View>
                </TouchableOpacity>
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
            {/* <View>
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
            </View> */}

            {/* <View>
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
            </View> */}
          </CollapseBody>
        </Collapse>
        {/* ......................................DocumentsView....................................... DocArray*/}

        <Collapse
          isExpanded={documentsExpanded}
          onToggle={isExpanded => setdocumentsExpanded(isExpanded)}>
          <CollapseHeader>
            <TouchableOpacity
              onPress={() => funExpand('Documents')}
              style={styles.collapseHeaderstyle}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={
                      documentsExpanded === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={25}
                    color={'#000'}
                    style={{marginTop: 2, marginLeft: 4}}
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

                <TouchableOpacity>
                  <View>
                    <Icon
                      name="search"
                      size={20}
                      color={'#000'}
                      style={{marginTop: 2, marginRight: 4}}
                    />
                  </View>
                </TouchableOpacity>
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
              data={DocArray}
              numColumns={3}
              renderItem={({item, index}) => (
                <View
                // style={{marginRight: 8, backgroundColor: 'grey'}}
                // onPress={() => PhotoEditFun(item)}
                >
                  <Image
                    source={{uri: item.docUrl}}
                    style={{
                      marginLeft: 15,
                      height: 120,
                      width: (windowWidth * 28) / 100,
                      backgroundColor: '#5c5c5c',
                      borderRadius: 6,
                    }}
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
              )}
              keyExtractor={(item, index) => 'key' + index}
            />
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={
                      partslistExpanded === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={25}
                    color={'#000'}
                    style={{marginTop: 2, marginLeft: 4}}
                  />
                  <Text
                    style={{
                      fontFamily: 'Sofia_Pro_Bold',
                      fontSize: 19,
                      color: '#000',
                      paddingLeft: 5,
                    }}>
                    Part Manuals
                  </Text>
                </View>

                <TouchableOpacity>
                  <View>
                    <Icon
                      name="search"
                      size={20}
                      color={'#000'}
                      style={{marginTop: 2, marginRight: 4}}
                    />
                  </View>
                </TouchableOpacity>
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
            {/* <View>
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
            </View> */}
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={
                      maintenanceExpanded === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={25}
                    color={'#000'}
                    style={{marginTop: 2, marginLeft: 4}}
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

                <TouchableOpacity>
                  <View>
                    <Icon
                      name="search"
                      size={20}
                      color={'#000'}
                      style={{marginTop: 2, marginRight: 4}}
                    />
                  </View>
                </TouchableOpacity>
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
            {/* <View>
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
            </View> */}
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={
                      usermanualsExpanded === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={25}
                    color={'#000'}
                    style={{marginTop: 2, marginLeft: 4}}
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

                <TouchableOpacity>
                  <View>
                    <Icon
                      name="search"
                      size={20}
                      color={'#000'}
                      style={{marginTop: 2, marginRight: 4}}
                    />
                  </View>
                </TouchableOpacity>
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
            {/* <View>
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
            </View> */}
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={
                      installationmanualsExpanded === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={25}
                    color={'#000'}
                    style={{marginTop: 2, marginLeft: 4}}
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

                <TouchableOpacity>
                  <View>
                    <Icon
                      name="search"
                      size={20}
                      color={'#000'}
                      style={{marginTop: 2, marginRight: 4}}
                    />
                  </View>
                </TouchableOpacity>
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
            {/* <View>
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
            </View> */}
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={
                      serviceExpanded === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={25}
                    color={'#000'}
                    style={{marginTop: 2, marginLeft: 4}}
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

                <TouchableOpacity>
                  <View>
                    <Icon
                      name="search"
                      size={20}
                      color={'#000'}
                      style={{marginTop: 2, marginRight: 4}}
                    />
                  </View>
                </TouchableOpacity>
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
            {/* <View>
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
            </View> */}
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={
                      filesbasedview === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={25}
                    color={'#000'}
                    style={{marginTop: 2, marginLeft: 4}}
                  />
                  <Text
                    style={{
                      fontFamily: 'Sofia_Pro_Bold',
                      fontSize: 19,
                      color: '#000',
                      paddingLeft: 5,
                    }}>
                    Similar YouTube Videos
                  </Text>
                </View>

                <TouchableOpacity>
                  <View>
                    <Icon
                      name="search"
                      size={20}
                      color={'#000'}
                      style={{marginTop: 2, marginRight: 4}}
                    />
                  </View>
                </TouchableOpacity>
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
            {/* <View>
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
            </View> */}
          </CollapseBody>
        </Collapse>

        {/* ...............................................Current job....................... */}

        <Collapse
          isExpanded={currentjobEquip}
          onToggle={isExpanded => setcurrentjobEquip(isExpanded)}>
          <CollapseHeader>
            <TouchableOpacity
              onPress={() => funExpand('currentjobEquipment')}
              style={styles.collapseHeaderstyle}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={
                      currentjobEquip === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={25}
                    color={'#000'}
                    style={{marginTop: 2, marginLeft: 4}}
                  />
                  <Text
                    style={{
                      fontFamily: 'Sofia_Pro_Bold',
                      fontSize: 19,
                      color: '#000',
                      paddingLeft: 5,
                    }}>
                    Current Job Equipment
                  </Text>
                </View>

                {/* <TouchableOpacity>
                  <View>

                    <Icon
                      name='search'
                      size={20}
                      color={'#000'}
                      style={{ marginTop: 2, marginRight: 4 }}
                    />

                  </View>
                </TouchableOpacity> */}
              </View>

              {/* <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              /> */}
            </TouchableOpacity>
          </CollapseHeader>
          <CollapseBody>
            <View>
              <View style={styles.collapseBodyStyle}>
                <View>
                  <View>
                    <View style={{flex: 0}}>
                      <View
                        style={{
                          flex: 1,
                          // alignItems: 'center',
                          // justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            paddingHorizontal: 15,
                            marginTop: 9,
                            height: (windowHeight * 17) / 100,
                            width: (windowWidth * 92) / 100,
                            // width: '95%',
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 4,
                          }}>
                          <TouchableOpacity>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 2,
                              }}>
                              <View>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontFamily: 'Sofia_Pro_Bold',
                                    color: 'black',
                                  }}>
                                  AC Units
                                </Text>

                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{
                                      marginTop: 2,
                                      fontSize: 17,
                                      fontFamily: 'Sofia_Pro_Bold',
                                      color: 'black',
                                    }}>
                                    Serial No :{' '}
                                  </Text>
                                  <Text
                                    style={{
                                      marginTop: 6,
                                      fontSize: 15,
                                      color: 'black',
                                    }}>
                                    187438575AF
                                  </Text>
                                </View>

                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{
                                      marginTop: 2,
                                      fontSize: 17,
                                      fontFamily: 'Sofia_Pro_Bold',
                                      color: 'black',
                                    }}>
                                    Modal :{' '}
                                  </Text>
                                  <Text
                                    style={{
                                      marginTop: 6,
                                      fontSize: 15,
                                      color: 'black',
                                    }}>
                                    1874385AF
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginLeft: 'auto',
                                  marginHorizontal: 5,
                                }}>
                                <ToggleSwitch
                                  isOn={toggle} // There should be a state like this.state.isOn(Set default value)
                                  onColor="#26A688"
                                  offColor="#E9EBEC"
                                  size="large"
                                  onToggle={() => setToggle} //To update state
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
                                  text={
                                    <Text
                                      style={{
                                        color: '#fff',
                                        fontSize: 14,
                                        marginLeft: 5,
                                        fontWeight: 'bold',
                                        marginBottom: 3,
                                        // position: 'absolute',
                                      }}>
                                      ACTIVE
                                    </Text>
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

                              <View
                                style={{
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                }}>
                                <Icon
                                  name="chevron-forward"
                                  size={24}
                                  // style={{marginTop: 2}}
                                  color={'#000'}
                                />
                              </View>
                            </View>
                            {/* <View
                        style={{
                          width: '100%',
                          borderWidth: 0.5,
                          borderColor: '#000',
                          height: 1,
                        }}></View> */}
                            <View style={{flexDirection: 'row', marginTop: 8}}>
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="md-image"
                                size={30}
                                color={'#3a3d41'}
                              />
                              <Icon
                                name="md-document"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              {/* <Image style={{width:30,height:30,marginTop:5}}
                        source={require('../Images/round.png')}>

                        </Image> */}
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="settings-outline"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="md-image"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                name="md-image"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="cube"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                name="videocam-outline"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="logo-youtube"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                            </View>
                          </TouchableOpacity>
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
                            height: (windowHeight * 17) / 100,
                            width: (windowWidth * 92) / 100,
                            // width: '95%',
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 4,
                          }}>
                          <TouchableOpacity>
                            {/* <TouchableOpacity onPress={() => TechDocsMedia()}> */}
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 2,
                              }}>
                              <View>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontFamily: 'Sofia_Pro_Bold',
                                    color: 'black',
                                  }}>
                                  AC Units
                                </Text>

                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{
                                      marginTop: 2,
                                      fontSize: 17,
                                      fontFamily: 'Sofia_Pro_Bold',
                                      color: 'black',
                                    }}>
                                    Serial No :{' '}
                                  </Text>
                                  <Text
                                    style={{
                                      marginTop: 6,
                                      fontSize: 15,
                                      color: 'black',
                                    }}>
                                    187438575AF
                                  </Text>
                                </View>

                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{
                                      marginTop: 2,
                                      fontSize: 17,
                                      fontFamily: 'Sofia_Pro_Bold',
                                      color: 'black',
                                    }}>
                                    Modal :{' '}
                                  </Text>
                                  <Text
                                    style={{
                                      marginTop: 6,
                                      fontSize: 15,
                                      color: 'black',
                                    }}>
                                    1874385AF
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginLeft: 'auto',
                                  marginHorizontal: 5,
                                }}>
                                <ToggleSwitch
                                  isOn={toggle} // There should be a state like this.state.isOn(Set default value)
                                  onColor="#26A688"
                                  offColor="#E9EBEC"
                                  size="large"
                                  onToggle={() => setToggle} //To update state
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
                                  text={
                                    <Text
                                      style={{
                                        color: '#fff',
                                        fontSize: 14,
                                        marginLeft: 5,
                                        fontWeight: 'bold',
                                        marginBottom: 3,
                                        // position: 'absolute',
                                      }}>
                                      ACTIVE
                                    </Text>
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

                              <View
                                style={{
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                }}>
                                <Icon
                                  name="chevron-forward"
                                  size={24}
                                  // style={{marginTop: 2}}
                                  color={'#000'}
                                />
                              </View>
                            </View>
                            {/* <View
                        style={{
                          width: '100%',
                          borderWidth: 0.5,
                          borderColor: '#000',
                          height: 1,
                        }}></View> */}
                            <View style={{flexDirection: 'row', marginTop: 8}}>
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="md-image"
                                size={30}
                                color={'#3a3d41'}
                              />
                              <Icon
                                name="md-document"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              {/* <Image style={{width:30,height:30,marginTop:5}}
                        source={require('../Images/round.png')}>

                        </Image> */}
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="settings-outline"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="md-image"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                name="md-image"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="cube"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                name="videocam-outline"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="logo-youtube"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                            </View>
                          </TouchableOpacity>
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
                            height: (windowHeight * 17) / 100,
                            width: (windowWidth * 92) / 100,
                            // width: '95%',
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 4,
                          }}>
                          {/* <TouchableOpacity onPress={() => TechDocsMedia()}> */}
                          <TouchableOpacity>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 2,
                              }}>
                              <View>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontFamily: 'Sofia_Pro_Bold',
                                    color: 'black',
                                  }}>
                                  AC Units
                                </Text>

                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{
                                      marginTop: 2,
                                      fontSize: 17,
                                      fontFamily: 'Sofia_Pro_Bold',
                                      color: 'black',
                                    }}>
                                    Serial No :{' '}
                                  </Text>
                                  <Text
                                    style={{
                                      marginTop: 6,
                                      fontSize: 15,
                                      color: 'black',
                                    }}>
                                    187438575AF
                                  </Text>
                                </View>

                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{
                                      marginTop: 2,
                                      fontSize: 17,
                                      fontFamily: 'Sofia_Pro_Bold',
                                      color: 'black',
                                    }}>
                                    Modal :{' '}
                                  </Text>
                                  <Text
                                    style={{
                                      marginTop: 6,
                                      fontSize: 15,
                                      color: 'black',
                                    }}>
                                    1874385AF
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginLeft: 'auto',
                                  marginHorizontal: 5,
                                }}>
                                <ToggleSwitch
                                  isOn={toggle} // There should be a state like this.state.isOn(Set default value)
                                  onColor="#26A688"
                                  offColor="#E9EBEC"
                                  size="large"
                                  onToggle={() => setToggle} //To update state
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
                                  text={
                                    <Text
                                      style={{
                                        color: '#fff',
                                        fontSize: 14,
                                        marginLeft: 5,
                                        fontWeight: 'bold',
                                        marginBottom: 3,
                                        // position: 'absolute',
                                      }}>
                                      ACTIVE
                                    </Text>
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

                              <View
                                style={{
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                }}>
                                <Icon
                                  name="chevron-forward"
                                  size={24}
                                  // style={{marginTop: 2}}
                                  color={'#000'}
                                />
                              </View>
                            </View>
                            {/* <View
                        style={{
                          width: '100%',
                          borderWidth: 0.5,
                          borderColor: '#000',
                          height: 1,
                        }}></View> */}
                            <View style={{flexDirection: 'row', marginTop: 8}}>
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="md-image"
                                size={30}
                                color={'#3a3d41'}
                              />
                              <Icon
                                name="md-document"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              {/* <Image style={{width:30,height:30,marginTop:5}}
                        source={require('../Images/round.png')}>

                        </Image> */}
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="settings-outline"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="md-image"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                name="md-image"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="cube"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                name="videocam-outline"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                              <Icon
                                style={{marginHorizontal: 4}}
                                name="logo-youtube"
                                size={30}
                                // style={{marginTop: 2}}
                                color={'#3a3d41'}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </CollapseBody>
        </Collapse>
        <View style={{marginBottom: 30}}></View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginBottom: 1,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Sofia_Pro_Bold',
              fontStyle: 'normal',
              letterSpacing: 0.2,
              color: '#050709',
            }}>
            Customer Notes (2)
          </Text>

          <View style={{marginTop: 7}}>
            <Icon name="chevron-forward-outline" size={24} color={'#000'} />
          </View>
        </View>
        <View
          style={{
            marginTop: 3,
            borderBottomColor: 'grey',
            borderBottomWidth: 2,
          }}
        />
        <View style={{paddingHorizontal: 15, marginTop: 3}}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'Sofia_Pro_Regular',
              fontStyle: 'normal',
              lineHeight: 18,
              fontWeight: '400',
              letterSpacing: 0.2,
              color: 'grey',
            }}>
            External Notes about the Customer
          </Text>
        </View>

        <View style={{width: '95%', alignSelf: 'center', marginTop: 5}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              alignSelf: 'center',
            }}
            onPress={() => collapseFun('customer note')}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', marginTop: 3}}>
                <Icon
                  name={
                    custnote1 === true
                      ? 'chevron-down-outline'
                      : 'chevron-forward-outline'
                  }
                  size={24}
                  color={'#000'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Sofia_Pro_Bold',
                    color: '#050709',
                    fontWeight: 'bold',
                    marginTop: 2,
                  }}
                  numberOfLines={1}>
                  John Smith
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 2,
                    color: '#050709',
                  }}>
                  10/25/2021
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {custnote1 === true && (
            <View>
              <View style={{paddingHorizontal: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#585A5B',
                  }}>
                  Lorem ipsum dolor sit amit consecetur adipiscingelit, Risus,
                  veitaliquampelletesque corobutor duis pelletenesque luctus
                  enim orci
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={{width: '95%', alignSelf: 'center', marginTop: 5}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              alignSelf: 'center',
            }}
            onPress={() => collapseFun('customer note2')}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', marginTop: 3}}>
                <Icon
                  name={
                    custnote2 === true
                      ? 'chevron-down-outline'
                      : 'chevron-forward-outline'
                  }
                  size={24}
                  color={'#000'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Sofia_Pro_Bold',
                    color: '#050709',
                    fontWeight: 'bold',
                    marginTop: 2,
                  }}
                  numberOfLines={1}>
                  Gary John
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 2,
                    color: '#050709',
                  }}>
                  10/25/2021
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {custnote2 === true && (
            <View>
              <View style={{paddingHorizontal: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#585A5B',
                  }}>
                  Lorem ipsum dolor sit amit consecetur adipiscingelit, Risus,
                  veitaliquampelletesque corobutor duis pelletenesque luctus
                  enim orci
                </Text>
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            marginTop: 5,
            backgroundColor: '#e8e9',
          }}>
          <View
            style={{
              height: 35,
              width: (windowWidth * 100) / 100,
              backgroundColor: '#e8e9f3',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-start',
            }}>
            <Icon name="add-outline" size={22} color="#050709" />
            <View>
              <Text
                style={{
                  // marginLeft: 12,
                  fontSize: 15,
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

        <View style={{marginBottom: 20}}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginBottom: 1,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Sofia_Pro_Bold',
              fontStyle: 'normal',
              letterSpacing: 0.2,
              color: '#050709',
            }}>
            Company Notes (2)
          </Text>

          <View style={{marginTop: 7}}>
            <Icon name="chevron-forward-outline" size={24} color={'#000'} />
          </View>
        </View>
        <View
          style={{
            marginTop: 3,
            borderBottomColor: 'grey',
            borderBottomWidth: 2,
          }}
        />
        <View style={{paddingHorizontal: 15, marginTop: 3}}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'Sofia_Pro_Regular',
              fontStyle: 'normal',
              lineHeight: 18,
              fontWeight: '400',
              letterSpacing: 0.2,
              color: 'grey',
            }}>
            Internal Notes about the Customer
          </Text>
        </View>
        <View style={{width: '95%', alignSelf: 'center', marginTop: 5}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              alignSelf: 'center',
            }}
            onPress={() => collapseFun('company note')}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', marginTop: 3}}>
                <Icon
                  name={
                    companynote1 === true
                      ? 'chevron-down-outline'
                      : 'chevron-forward-outline'
                  }
                  size={24}
                  color={'#000'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Sofia_Pro_Bold',
                    color: '#050709',
                    fontWeight: 'bold',
                    marginTop: 2,
                  }}
                  numberOfLines={1}>
                  George Smith
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 2,
                    color: '#050709',
                  }}>
                  10/25/2021
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {companynote1 === true && (
            <View>
              <View style={{paddingHorizontal: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#585A5B',
                  }}>
                  Lorem ipsum dolor sit amit consecetur adipiscingelit, Risus,
                  veitaliquampelletesque corobutor duis pelletenesque luctus
                  enim orci
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={{width: '95%', alignSelf: 'center', marginTop: 5}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              alignSelf: 'center',
            }}
            onPress={() => collapseFun('company note2')}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', marginTop: 3}}>
                <Icon
                  name={
                    companynote2 === true
                      ? 'chevron-down-outline'
                      : 'chevron-forward-outline'
                  }
                  size={24}
                  color={'#000'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Sofia_Pro_Bold',
                    color: '#050709',
                    fontWeight: 'bold',
                    marginTop: 2,
                  }}
                  numberOfLines={1}>
                  John Gary
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 2,
                    color: '#050709',
                  }}>
                  10/25/2021
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {companynote2 === true && (
            <View>
              <View style={{paddingHorizontal: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#585A5B',
                  }}>
                  Lorem ipsum dolor sit amit consecetur adipiscingelit, Risus,
                  veitaliquampelletesque corobutor duis pelletenesque luctus
                  enim orci
                </Text>
              </View>
            </View>
          )}
        </View>
        <View>
          <View
            style={{
              height: 35,
              width: (windowWidth * 100) / 100,
              backgroundColor: '#e8e9f3',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-start',
            }}>
            <Icon name="add-outline" size={22} color="#050709" />
            <View>
              <Text
                style={{
                  // marginLeft: 12,
                  fontSize: 15,
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
        <View style={{marginBottom: 50}}></View>
      </ScrollView>
      <HeaderOptionModal
        Visible={headerModal}
        navigation={navigation}
        closeModal={() => setHeaderModal(false)}
      />
    </View>
  );
};

<TouchableOpacity onPress={() => setModalVisible(true)}>
  <View style={{paddingHorizontal: 15, marginTop: 20}}>
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
</TouchableOpacity>;

const styles = StyleSheet.create({
  collapseHeaderstyle: {
    marginTop: 15,
    // flexDirection: 'row',
    // width: '95%',
    // alignSelf: 'center',
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

export default FileRoomTab;
