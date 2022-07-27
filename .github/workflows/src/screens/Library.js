import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  FlatList,
  Modal,
  Image,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,

} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import Hud from '../components/Hud';
import {
  getUserFromStorageAsync,
  saveUserInLocalStorageAsync,
} from '../services/LocalStorage';
import {
  getworkordersasync,
} from '../services/Services';
import { useIsFocused } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Library = () => {
  const isFocused = useIsFocused();

  // const [showHud, setShowHud] = React.useState(false);
  const [pExpanded, setpExpanded] = React.useState(true);
  const [GalleryExpanded, setGalleryExpanded] = React.useState(true);
  const [openorcloseTxt, setOpenorcloseTxt] = React.useState('CLOSE ALL');
  const [dExpanded, setdExpanded] = React.useState(true);
  const [partsExpanded, setpartsExpanded] = React.useState(true);
  const [mExpanded, setmExpanded] = React.useState(true);
  const [uExpanded, setuExpanded] = React.useState(true);
  const [IExpanded, setIExpanded] = React.useState(true);
  const [SExpanded, setSExpanded] = React.useState(true);
  const [interExpanded, setinterExpanded] = React.useState(true);
  const [vExpanded, setvExpanded] = React.useState(true);
  const [yExpanded, setyExpanded] = React.useState(true);
  const [galleryArr, setGalleryArr] = React.useState([]);

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

  React.useEffect(() => {
    // setShowHud(true)
    
    getLibrary();

  }, [isFocused]);

  const getLibrary = async () => {
    let GalleryArr = [];
    let PUrl = {};
    let VUrl = {};
    let user = await getUserFromStorageAsync('EmpID');
    const presentDate = '01-26-2022'; //moment(currentDate).format('MM-DD-YYYY');
    const res = await getworkordersasync(
      user,
      // password,
      // companycode,
      presentDate,
    );
    res.data.map(async item => {
      let PhotoUrl = await getUserFromStorageAsync('mediaUrl' + item.sono);
      let VideoUrl = await getUserFromStorageAsync('videoUrl' + item.sono);
      PhotoUrl.map(it => {
        PUrl = it;
        GalleryArr = [PUrl, ...GalleryArr];
      });
      VideoUrl.map(it => {
        VUrl = it;
        GalleryArr = [VUrl, ...GalleryArr];
      });
      console.log(GalleryArr);
      setGalleryArr(GalleryArr);
      // setShowHud(false)
    });
  };
 
 
 
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
              }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
            {/* <View>
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
            </View> */}
          </CollapseBody>
        </Collapse>



        <Collapse
          isExpanded={GalleryExpanded}
          onToggle={isExpanded => setGalleryExpanded(isExpanded)}>
          <CollapseHeader>
            <TouchableOpacity
              onPress={() => funExpand('Gallery')}
              style={{
                marginTop: 5,
                // flexDirection: 'row',
                // width: '95%',
                // alignSelf: 'center',
              }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
            <FlatList
              data={galleryArr}
              numColumns={3}
              renderItem={({ item, index }) => (
                <View>
                  {console.log(item)}
                  <Image
                    source={{ uri: item.imgUrl ? item.imgUrl : item.videoUrl }}
                    style={{
                      marginLeft: 15,
                      marginTop: 10,
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
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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

                </View>
              </View>
            </TouchableOpacity>
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
          </CollapseHeader>
          <CollapseBody>
            {/* <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
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
            </View> */}

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
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
            {/* <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
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
            </View> */}

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
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon
                    name={
                      IExpanded === true
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
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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



          </CollapseBody>
        </Collapse>














        {/* <Margin bottom={12} /> */}
        <View style={{ marginBottom: 80 }}></View>
      </ScrollView>

      <View style={{ height: 10 }}>

      </View>

      <TouchableOpacity onPress={() => {
        setpExpanded(!pExpanded), setGalleryExpanded(!GalleryExpanded),
          setdExpanded(!dExpanded), setpartsExpanded(!partsExpanded), setmExpanded(!mExpanded), setuExpanded(!uExpanded), setIExpanded(!IExpanded), setSExpanded(!SExpanded), setinterExpanded(!interExpanded), setvExpanded(!vExpanded), setyExpanded(!yExpanded);
        if (openorcloseTxt === 'COLLAPSE ALL') {
          setOpenorcloseTxt('OPEN ALL')
        }
        else {
          setOpenorcloseTxt('COLLAPSE ALL')
        }
      }}
      >
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
            {openorcloseTxt}
          </Text>
        </View>
      </TouchableOpacity>
      {/* <Hud showHud={showHud} /> */}
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

export default Library;
