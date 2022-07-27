import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SignatureCapture from 'react-native-signature-capture';
import {
  getUserFromStorageAsync,
  saveUserInLocalStorageAsync,
} from '../services/LocalStorage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustLibraryScreen = () => {
  const [pExpanded, setpExpanded] = React.useState(true);
  const [GalleryExpanded, setGalleryExpanded] = React.useState(true);
  const [dExpanded, setdExpanded] = React.useState(true);
  const [equipExpanded, setequipExpanded] = React.useState(true);
  const [mExpanded, setmExpanded] = React.useState(true);
  const [uExpanded, setuExpanded] = React.useState(true);
  const [IExpanded, setIExpanded] = React.useState(true);
  const [SExpanded, setSExpanded] = React.useState(true);
  const [interExpanded, setinterExpanded] = React.useState(true);
  const [vExpanded, setvExpanded] = React.useState(true);
  const [yExpanded, setyExpanded] = React.useState(true);
  const [SignModalOpen, setSignModalOpen] = React.useState(false);
  const signatureView = React.useRef(null);
  const [signdata, setsigndata] = React.useState(null);

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
      case 'Equipment':
        setequipExpanded(!equipExpanded);
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

  const _onSaveEvent = async result => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    alert('Signature Captured Successfully');
    console.log(result.encoded);
    setsigndata(`data:image/png;base64,${result.encoded}`);
    await saveUserInLocalStorageAsync(
      `data:image/png;base64,${result.encoded}`,
      'SaveSign',
    );
    setSignModalOpen(false);
  };

  function saveSign() {
    signatureView.current.saveImage();
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>




      <ScrollView>
        <Collapse
          isExpanded={pExpanded}
          onToggle={isExpanded => setpExpanded(isExpanded)}>
          <CollapseHeader>
            <TouchableOpacity
              onPress={() => funExpand('photos')}
              style={{
                marginTop: 15,
                flexDirection: 'row',
                width: '95%',
                alignSelf: 'center',
              }}>
              <Icon
                name={
                  pExpanded === true
                    ? 'chevron-down-outline'
                    : 'chevron-forward-outline'
                }
                size={25}
                color={'#000'}
                style={{ marginTop: 2 }}
              />
              <Text
                style={{
                  fontFamily: 'Sofia_Pro_Bold',
                  fontSize: 19,
                  color: '#000',
                  paddingLeft: 5,
                }}>
                Photos
              </Text>
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
                  marginTop: 10,
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
                flexDirection: 'row',
                width: '95%',
                alignSelf: 'center',
              }}>
              <Icon
                name={
                  GalleryExpanded === true
                    ? 'chevron-down-outline'
                    : 'chevron-forward-outline'
                }
                size={25}
                color={'#000'}
                style={{ marginTop: 1 }}
              />
              <Text
                style={{
                  fontFamily: 'Sofia_Pro_Bold',
                  fontSize: 19,
                  color: 'black',
                  paddingLeft: 9,
                }}>
                Videos
              </Text>
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
                flexDirection: 'row',
                width: '95%',
                alignSelf: 'center',
              }}>
              <Icon
                name={
                  dExpanded === true
                    ? 'chevron-down-outline'
                    : 'chevron-forward-outline'
                }
                size={25}
                color={'#000'}
                style={{ marginTop: 1 }}
              />
              <Text
                style={{
                  fontFamily: 'Sofia_Pro_Bold',

                  fontSize: 19,
                  color: 'black',
                  paddingLeft: 9,
                }}>
                Documents
              </Text>
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
          isExpanded={equipExpanded}
          onToggle={isExpanded => setequipExpanded(isExpanded)}>
          <CollapseHeader>
            <TouchableOpacity
              onPress={() => funExpand('Equipment')}
              style={{
                marginTop: 15,
                flexDirection: 'row',
                width: '95%',
                alignSelf: 'center',
              }}>
              <Icon
                name={
                  equipExpanded === true
                    ? 'chevron-down-outline'
                    : 'chevron-forward-outline'
                }
                size={25}
                color={'#000'}
                style={{ marginTop: 1 }}
              />
              <Text
                style={{
                  fontFamily: 'Sofia_Pro_Bold',

                  fontSize: 19,
                  color: 'black',
                  paddingLeft: 9,
                }}>
                Equipments
              </Text>
            </TouchableOpacity>
          </CollapseHeader>
          <CollapseBody>
            <View>
              <View
                style={{
                  flex: 1,
                  // flexDirection: 'row',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  borderRadius:3,
                  alignSelf: 'center',
                  marginTop: 10,
                  height: 100,
                  width: (windowWidth * 90) / 100,
                  borderWidth: 1,
                  borderColor: 'grey'
                }}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}} >
                  <View style={{ paddingLeft: 10, marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro_Bold', color: 'black' }}>Air Conditioning Unit</Text>
                  </View>
                  <View style={{marginTop:2}}>
                    <Icon
                      name=
                      'chevron-forward-outline'
                      size={25}
                      color={'#000'}
                      style={{ marginTop: 1 }}
                    />
                  </View>

                </View>


                <View style={{flex:1,flexDirection:'row'}} >
                  <View style={{ paddingLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro_Bold', color: 'black' }}>Modal : </Text>
                  </View>
                  <View style={{marginTop:5}}>
                    <Text style={{fontSize:16}}>4564JKF</Text>
                  </View>

                </View>



                <View style={{flex:1,flexDirection:'row'}} >
                  <View style={{ paddingLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro_Bold', color: 'black' }}>Serial No : </Text>
                  </View>
                  <View style={{marginTop:5}}>
                    <Text style={{fontSize:16}}>456478686868</Text>
                  </View>

                </View>

              </View>
            </View>

            <View>
              <View
                style={{
                  flex: 1,
                  // flexDirection: 'row',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  borderRadius:3,
                  alignSelf: 'center',
                  marginTop: 10,
                  height: 100,
                  width: (windowWidth * 90) / 100,
                  borderWidth: 1,
                  borderColor: 'grey'
                }}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}} >
                  <View style={{ paddingLeft: 10, marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro_Bold', color: 'black' }}>Air Conditioning Unit</Text>
                  </View>
                  <View style={{marginTop:2}}>
                    <Icon
                      name=
                      'chevron-forward-outline'
                      size={25}
                      color={'#000'}
                      style={{ marginTop: 1 }}
                    />
                  </View>

                </View>


                <View style={{flex:1,flexDirection:'row'}} >
                  <View style={{ paddingLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro_Bold', color: 'black' }}>Modal : </Text>
                  </View>
                  <View style={{marginTop:5}}>
                    <Text style={{fontSize:16}}>4564JKF</Text>
                  </View>

                </View>



                <View style={{flex:1,flexDirection:'row'}} >
                  <View style={{ paddingLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro_Bold', color: 'black' }}>Serial No : </Text>
                  </View>
                  <View style={{marginTop:5}}>
                    <Text style={{fontSize:16}}>456478686868</Text>
                  </View>

                </View>

              </View>
            </View>


            <View>
              <View
                style={{
                  flex: 1,
                  // flexDirection: 'row',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  borderRadius:3,
                  alignSelf: 'center',
                  marginTop: 10,
                  height: 100,
                  width: (windowWidth * 90) / 100,
                  borderWidth: 1,
                  borderColor: 'grey'
                }}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}} >
                  <View style={{ paddingLeft: 10, marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro_Bold', color: 'black' }}>Air Conditioning Unit</Text>
                  </View>
                  <View style={{marginTop:2}}>
                    <Icon
                      name=
                      'chevron-forward-outline'
                      size={25}
                      color={'#000'}
                      style={{ marginTop: 1 }}
                    />
                  </View>

                </View>


                <View style={{flex:1,flexDirection:'row'}} >
                  <View style={{ paddingLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro_Bold', color: 'black' }}>Modal : </Text>
                  </View>
                  <View style={{marginTop:5}}>
                    <Text style={{fontSize:16}}>4564JKF</Text>
                  </View>

                </View>



                <View style={{flex:1,flexDirection:'row'}} >
                  <View style={{ paddingLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro_Bold', color: 'black' }}>Serial No : </Text>
                  </View>
                  <View style={{marginTop:5}}>
                    <Text style={{fontSize:16}}>456478686868</Text>
                  </View>

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


















        {/* <Margin bottom={12} /> */}
        <View style={{ marginBottom: 80 }}></View>
      </ScrollView>
      {/* <Modal
        visible={SignModalOpen}
        onRequestClose={() => {
          setSignModalOpen(false);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            elevation: 10,
          }}>
          <SignatureCapture
            style={{
              flex: 1,
              borderColor: '#000033',
              borderWidth: 1,
            }}
            ref={signatureView}
            onSaveEvent={_onSaveEvent}
            // onDragEvent={_onDragEvent}
            saveImageFileInExtStorage={true}
            showNativeButtons={false}
            showTitleLabel={false}
            backgroundColor="#EFF0F1"
            strokeColor="#000000"
            minStrokeWidth={4}
            maxStrokeWidth={4}
            viewMode={'portrait'}
          />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                backgroundColor: '#eeeeee',
                margin: 10,
              }}
              onPress={saveSign}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
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
});

export default CustLibraryScreen;
