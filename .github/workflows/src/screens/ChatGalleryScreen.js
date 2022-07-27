import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChatGalleryScreen = ({ navigation, route }) => {
  const [pExpanded, setpExpanded] = React.useState(true);
  const [vExpanded, setvExpanded] = React.useState(true);
  const [dExpanded, setdExpanded] = React.useState(true);
  const [callExpanded, setcallExpanded] = React.useState(true);
  const [custnote1, setcustnote1] = React.useState(true);
  const [companynote1, setcompanynote1] = React.useState(true);
  const funExpand = item => {
    switch (item) {
      case 'photos':
        setpExpanded(!pExpanded);
        break;
      case 'videos':
        setvExpanded(!vExpanded);
        break;
      case 'docs':
        setdExpanded(!dExpanded);
        break;
      case 'callrec':
        setcallExpanded(!callExpanded);
        break;
      case 'customer note':
        setcustnote1(!custnote1);
        break;
      case 'company note':
        setcompanynote1(!companynote1);
        break;
      default:
        break;
    }
    console.log(item);
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ height: 45, backgroundColor: 'white' }}>
        <View style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
          <View style={{ marginLeft: 1, marginTop: 5 }}>
            <Icon
              name="md-arrow-back"
              size={28}
              style={{ marginTop: 3 }}
              color={'#000'}
              onPress={() => navigation.goBack()}
            />
          </View>

          <View style={{ marginLeft: '20%' }}>
            <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black', marginTop: 5, letterSpacing: 0.6 }}>Chat Gallery</Text>
          </View>
        </View>
      </View>
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
                size={20}
                color={'#000'}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 19,
                  color: 'black',
                  paddingLeft: 10,
                }}>
                GALLERY
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
                    height: 120,
                    width: (windowWidth * 28) / 100,
                    backgroundColor: '#5c5c5c',
                    borderRadius: 6,
                  }}>

                </View>
                <View
                  style={{
                    marginLeft: 15,
                    height: 120,
                    width: (windowWidth * 28) / 100,
                    backgroundColor: '#5c5c5c',
                    borderRadius: 6,
                  }}>

                </View>
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
                  }}>

                </View>
                <View
                  style={{
                    marginLeft: 15,
                    height: 120,
                    width: (windowWidth * 28) / 100,
                    backgroundColor: '#5c5c5c',
                    borderRadius: 6,
                  }}>

                </View>
                {/* <View
                  style={{
                    marginLeft: 15,
                    height: 120,
                    width: (windowWidth * 28) / 100,
                    backgroundColor: '#5c5c5c',
                    borderRadius: 6,
                  }}>
                 
                </View> */}
              </View>
            </View>
          </CollapseBody>
        </Collapse>


        <Collapse
          isExpanded={vExpanded}
          onToggle={isExpanded => setvExpanded(isExpanded)}>
          <CollapseHeader>
            <TouchableOpacity
              onPress={() => funExpand('videos')}
              style={{
                marginTop: 15,
                flexDirection: 'row',
                width: '95%',
                alignSelf: 'center',
              }}>
              <Icon
                name={
                  vExpanded === true
                    ? 'chevron-down-outline'
                    : 'chevron-forward-outline'
                }
                size={20}
                color={'#000'}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 19,
                  color: 'black',
                  paddingLeft: 10,
                }}>
                MANUALS
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
                  }}>

                </View>
                <View
                  style={{
                    marginLeft: 15,
                    height: 120,
                    width: (windowWidth * 28) / 100,
                    backgroundColor: '#5c5c5c',
                    borderRadius: 6,
                  }}>

                </View>
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
                size={20}
                color={'#000'}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 19,
                  color: 'black',
                  paddingLeft: 10,
                }}>
                DOCUMENTS
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
          isExpanded={callExpanded}
          onToggle={isExpanded => setcallExpanded(isExpanded)}>
          <CollapseHeader>
            <TouchableOpacity
              onPress={() => funExpand('callrec')}
              style={{
                marginTop: 15,
                flexDirection: 'row',
                width: '95%',
                alignSelf: 'center',
              }}>
              <Icon
                name={
                  callExpanded === true
                    ? 'chevron-down-outline'
                    : 'chevron-forward-outline'
                }
                size={20}
                color={'#000'}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 19,
                  color: 'black',
                  paddingLeft: 10,
                }}>
                CALL RECORDINGS
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
                  marginTop: 10,
                  height: (windowHeight * 40) / 100,
                  width: (windowWidth * 93) / 100,
                  borderWidth: 1,
                  borderColor: 'grey',
                  alignSelf: 'center',
                  borderRadius: 10

                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ padding: 5 }}>
                    <Text>Called : 10:39 AM</Text>
                  </View>
                  <View style={{ padding: 5 }}>
                    <Text>Duration : 4min 12 sec</Text>
                  </View>
                </View>



                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    // marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontSize: 20, fontFamily: 'Sofia_Pro_Bold', color: '#3a3d41' }}>
                    Notes (2)
                  </Text>
                  <Icon name="chevron-forward" size={28} color={'#000'} />
                </View>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    alignSelf: 'center',
                    width: (windowWidth * 85) / 100
                  }}
                />

                <View style={{ paddingHorizontal: 10, marginTop: 3 }}>
                  <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro', letterSpacing: 0.5, color: 'black' ,letterSpacing:0.5}}>Technician Notes about the job.</Text>
                </View>


                <TouchableOpacity>
                  <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
                    <View
                      style={{
                        height: 35,
                        width: (windowWidth * 87) / 100,
                        backgroundColor: '#a1a2a4',
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
                            fontSize: 15,
                            fontWeight: 'bold',
                            //   fontFamily: 'Sofia_Pro_Bold',
                            //   fontStyle: 'normal',
                            //   lineHeight: 22,
                            //   letterSpacing: 0.25,
                            color: '#050709',
                          }}>
                          Add
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={{ width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      alignSelf: 'center',
                    }}
                    onPress={() => funExpand('customer note')}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{ flexDirection: 'row', marginTop: 3 }}>
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
                            //   fontStyle: 'normal',
                            //   lineHeight: 22,
                            //   letterSpacing: 0.25,
                            color: '#050709',
                            fontWeight: 'bold',
                            marginTop: 2,
                          }}
                          numberOfLines={1}>
                          George Victor
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            marginTop: 2,
                            //   fontFamily: 'Sofia_Pro_Regular',
                            //   fontStyle: 'normal',
                            //   lineHeight: 18,
                            //   letterSpacing: 0.2,
                            color: '#050709',
                          }}>
                          10/10/2021
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {custnote1 === true && (
                    <View>
                      <View style={{ paddingHorizontal: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Sofia_Pro',
                            //   fontStyle: 'normal',
                            //   lineHeight: 22,
                            letterSpacing: 0.5,
                            color: 'black',
                          }}>
                          Another solution is to add a height property to the parent
                          View container. This
                        </Text>
                      </View>
                    </View>
                  )}
                </View>



                <View style={{ width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      alignSelf: 'center',
                    }}
                    onPress={() => funExpand('company note')}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{ flexDirection: 'row', marginTop: 3 }}>
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
                            //   fontStyle: 'normal',
                            //   lineHeight: 22,
                            //   letterSpacing: 0.25,
                            color: '#050709',
                            fontWeight: 'bold',
                            marginTop: 2,
                          }}
                          numberOfLines={1}>
                          George Victor
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            marginTop: 2,
                            //   fontFamily: 'Sofia_Pro_Regular',
                            //   fontStyle: 'normal',
                            //   lineHeight: 18,
                            //   letterSpacing: 0.2,
                            color: '#050709',
                          }}>
                          10/10/2021
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {companynote1 === true && (
                    <View>
                      <View style={{ paddingHorizontal: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Sofia_Pro',
                            //   fontStyle: 'normal',
                            //   lineHeight: 22,
                            letterSpacing: 0.5,
                            color: 'black',
                          }}>
                          Another solution is to add a height property to the parent
                          View container. This
                        </Text>
                      </View>
                    </View>
                  )}
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
                  marginTop: 20,
                  height: (windowHeight * 70) / 100,
                  width: (windowWidth * 93) / 100,
                  borderWidth: 1,
                  borderColor: 'grey',
                  alignSelf: 'center',
                  borderRadius: 10

                }}>
               
               <Image
                source={require('../Images/image1.jpg')}
                style={{ width: (windowWidth*93)/100, height: (windowHeight*30)/100,marginTop:10 }}
                resizeMode="contain"
              />


                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                     marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontSize: 20, fontFamily: 'Sofia_Pro_Bold', color: '#3a3d41' }}>
                    Notes (2)
                  </Text>
                  <Icon name="chevron-forward" size={28} color={'#000'} />
                </View>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    alignSelf: 'center',
                    width: (windowWidth * 85) / 100
                  }}
                />

                <View style={{ paddingHorizontal: 10, marginTop: 3 }}>
                  <Text style={{ fontSize: 16, fontFamily: 'Sofia_Pro', letterSpacing: 0.5, color: 'black' ,letterSpacing:0.5}}>Technician Notes about the job.</Text>
                </View>


                <TouchableOpacity>
                  <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
                    <View
                      style={{
                        height: 35,
                        width: (windowWidth * 87) / 100,
                        backgroundColor: '#a1a2a4',
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
                            fontSize: 15,
                            fontWeight: 'bold',
                            //   fontFamily: 'Sofia_Pro_Bold',
                            //   fontStyle: 'normal',
                            //   lineHeight: 22,
                            //   letterSpacing: 0.25,
                            color: '#050709',
                          }}>
                          Add
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={{ width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      alignSelf: 'center',
                    }}
                    onPress={() => funExpand('customer note')}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{ flexDirection: 'row', marginTop: 3 }}>
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
                            //   fontStyle: 'normal',
                            //   lineHeight: 22,
                            //   letterSpacing: 0.25,
                            color: '#050709',
                            fontWeight: 'bold',
                            marginTop: 2,
                          }}
                          numberOfLines={1}>
                          George Victor
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            marginTop: 2,
                            //   fontFamily: 'Sofia_Pro_Regular',
                            //   fontStyle: 'normal',
                            //   lineHeight: 18,
                            //   letterSpacing: 0.2,
                            color: '#050709',
                          }}>
                          10/10/2021
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {custnote1 === true && (
                    <View>
                      <View style={{ paddingHorizontal: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Sofia_Pro',
                            //   fontStyle: 'normal',
                            //   lineHeight: 22,
                            letterSpacing: 0.5,
                            color: 'black',
                          }}>
                          Another solution is to add a height property to the parent
                          View container. This
                        </Text>
                      </View>
                    </View>
                  )}
                </View>



                <View style={{ width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      alignSelf: 'center',
                    }}
                    onPress={() => funExpand('company note')}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{ flexDirection: 'row', marginTop: 3 }}>
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
                            //   fontStyle: 'normal',
                            //   lineHeight: 22,
                            //   letterSpacing: 0.25,
                            color: '#050709',
                            fontWeight: 'bold',
                            marginTop: 2,
                          }}
                          numberOfLines={1}>
                          George Victor
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            marginTop: 2,
                            //   fontFamily: 'Sofia_Pro_Regular',
                            //   fontStyle: 'normal',
                            //   lineHeight: 18,
                            //   letterSpacing: 0.2,
                            color: '#050709',
                          }}>
                          10/10/2021
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {companynote1 === true && (
                    <View>
                      <View style={{ paddingHorizontal: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Sofia_Pro',
                            //   fontStyle: 'normal',
                            //   lineHeight: 22,
                            letterSpacing: 0.5,
                            color: 'black',
                          }}>
                          Another solution is to add a height property to the parent
                          View container. This
                        </Text>
                      </View>
                    </View>
                  )}
                </View>


             
               

              </View>
            </View>


          </CollapseBody>
        </Collapse>

        {/* <Margin bottom={12} /> */}
        <View style={{ marginBottom: 80 }}></View>
      </ScrollView>

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

export default ChatGalleryScreen;
