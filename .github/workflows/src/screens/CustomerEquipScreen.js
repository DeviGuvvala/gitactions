import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import ToggleSwitch from '../components/ToggleSwitch';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomerEquipScreen = ({ navigation, route }) => {

  const [toggle, setToggle] = useState(false);
  const [filtermodalVisible, setfiltermodalVisible] = useState(false);
  // const [addFilterModalVisible, setaddFilterModalVisible] = useState(false);
  return (

    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={{ height: 45, backgroundColor: 'white' }}>
        <View style={{ paddingHorizontal: 5, flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
          <Icon
            name="md-arrow-back"
            size={30}
            // style={{ marginTop: 5 }}
            color={'#3a3d41'}
            onPress={() => navigation.goBack()}
          />

          <View style={{}}>
            <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black', letterSpacing: 0.6 }}>Equipment Page</Text>
          </View>

          <TouchableOpacity onPress={() => setfiltermodalVisible(!filtermodalVisible)}>
            <Icon
              name="options"
              size={25}
              style={{ marginTop: 3, marginRight: 5 }}
              color={'#3a3d41'}

            />
          </TouchableOpacity>
        </View>
      </View>



      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          marginTop: 15, width: (windowWidth * 95) / 100, borderWidth: 1, borderRadius: 4, height: 44, borderColor: 'grey'
        }}>
          <View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
            <Icon
              name="search"
              size={20}
              color={'black'}
              style={{ marginTop: 8 }}
            />

            <TextInput style={{ marginLeft: 5, fontSize: 18, width: '100%' }} placeholder="Please Enter Equipment Here"></TextInput>

          </View>

        </View>
      </View>



      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5
        }}>
        <View
          style={{
            paddingHorizontal: 15,
            marginTop: 9,
            height: (windowHeight * 17) / 100,
            // width: (windowWidth * 95) / 100,
            width: '95%',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 4,
          }}>

          <TouchableOpacity onPress={() => navigation.navigate('ViewEqptInfoScreen')}>
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

                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      marginTop: 2,
                      fontSize: 17,
                      fontFamily: 'Sofia_Pro_Bold',
                      color: 'black',
                    }}>
                    Serial No : {' '}
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

                <View style={{ flexDirection: 'row' }}>
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

              <View
                style={{ alignItems: 'center', alignSelf: 'center' }}>
                <Icon
                  name="chevron-forward"
                  size={24}
                  // style={{marginTop: 2}}
                  color={'#000'}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'black',
                height: 1,
                marginTop: 3
              }}></View>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Icon
                style={{ marginHorizontal: 4 }}
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
                style={{ marginHorizontal: 4 }}
                name="settings-outline"
                size={30}
                // style={{marginTop: 2}}
                color={'#3a3d41'}
              />
              <Icon
                style={{ marginHorizontal: 4 }}
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
                style={{ marginHorizontal: 4 }}
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
                style={{ marginHorizontal: 4 }}
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
          marginTop: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            paddingHorizontal: 15,
            marginTop: 9,
            height: (windowHeight * 17) / 100,
            // width: (windowWidth * 95) / 100,
            width: '95%',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 4,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('ViewEqptInfoScreen')}>
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

                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      marginTop: 2,
                      fontSize: 17,
                      fontFamily: 'Sofia_Pro_Bold',
                      color: 'black',
                    }}>
                    Serial No : {' '}
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

                <View style={{ flexDirection: 'row' }}>
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

              <View
                style={{ alignItems: 'center', alignSelf: 'center' }}>
                <Icon
                  name="chevron-forward"
                  size={24}
                  // style={{marginTop: 2}}
                  color={'#000'}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#000',
                height: 1,
                marginTop: 3
              }}></View>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Icon
                style={{ marginHorizontal: 4 }}
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
                style={{ marginHorizontal: 4 }}
                name="settings-outline"
                size={30}
                // style={{marginTop: 2}}
                color={'#3a3d41'}
              />
              <Icon
                style={{ marginHorizontal: 4 }}
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
                style={{ marginHorizontal: 4 }}
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
                style={{ marginHorizontal: 4 }}
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
          marginTop: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            paddingHorizontal: 15,
            marginTop: 9,
            height: (windowHeight * 17) / 100,
            // width: (windowWidth * 95) / 100,
            width: '95%',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 4,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('ViewEqptInfoScreen')}>
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

                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      marginTop: 2,
                      fontSize: 17,
                      fontFamily: 'Sofia_Pro_Bold',
                      color: 'black',
                    }}>
                    Serial No : {' '}
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

                <View style={{ flexDirection: 'row' }}>
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

              <View
                style={{ alignItems: 'center', alignSelf: 'center' }}>
                <Icon
                  name="chevron-forward"
                  size={24}
                  // style={{marginTop: 2}}
                  color={'#000'}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#000',
                height: 1,
                marginTop: 3
              }}></View>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Icon
                style={{ marginHorizontal: 4 }}
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
                style={{ marginHorizontal: 4 }}
                name="settings-outline"
                size={30}
                // style={{marginTop: 2}}
                color={'#3a3d41'}
              />
              <Icon
                style={{ marginHorizontal: 4 }}
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
                style={{ marginHorizontal: 4 }}
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
                style={{ marginHorizontal: 4 }}
                name="logo-youtube"
                size={30}
                // style={{marginTop: 2}}
                color={'#3a3d41'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={filtermodalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setfiltermodalVisible(!filtermodalVisible);
        }}>
        <TouchableOpacity
          onPress={() => setfiltermodalVisible(false)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              width: windowWidth,
              height: (windowHeight * 50) / 100,
              backgroundColor: 'white',
              marginTop: (windowHeight * 60) / 100,
            }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  padding: 10,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                    Add Filter
                  </Text>
                  <Icon
                    name="close-circle-outline"
                    size={25}
                    style={{ marginTop: 2 }}
                    color={'#000'}
                    onPress={() => setfiltermodalVisible(false)}
                  />
                </View>
                <View
                  style={{
                    margnTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 15, fontWeight: '600' }}>
                    POTENTIAL FILTERS
                  </Text>
                </View>
                {/* <View>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      fontWeight: '600',
                      marginLeft: 10,
                    }}>
                    Step Name
                  </Text>
                </View> */}
                <View
                  style={{
                    borderRadius: 5,
                    marginTop: 3,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    height: 35,
                    width: '95%',
                    backgroundColor: '#e9ebec',
                  }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: 'grey',
                      letterSpacing: 0.5,
                      fontSize: 15,
                      fontWeight: 'Sofia_Pro_bold',
                      alignSelf: 'center'
                    }}>
                    Filter by Date
                  </Text>
                </View>
                {/* <View>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      fontWeight: '600',
                      marginLeft: 10,
                    }}>
                    Step Name
                  </Text>
                </View> */}
                <View
                  style={{
                    borderRadius: 5,
                    marginTop: 15,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    height: 35,
                    width: '95%',
                    backgroundColor: '#e9ebec',
                  }}>
                  <View
                    style={{
                      // flexDirection: 'row',
                      // justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        marginLeft: 10,
                        alignSelf: 'center',
                        color: 'grey',
                        fontSize: 15,
                        fontWeight: '500',
                        letterSpacing: 0.5
                      }}>
                      Filter by Caller
                    </Text>
                    {/* <Icon
                      name="chevron-back-outline"
                      size={20}
                      style={{ marginRight: 10 }}
                      color={'#000'}
                    /> */}
                  </View>
                </View>
                {/* <View>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      fontWeight: '600',
                      marginLeft: 10,
                    }}>
                    Step Name
                  </Text>
                </View> */}
                <View
                  style={{
                    borderRadius: 5,
                    marginTop: 15,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    height: 35,
                    width: '95%',
                    backgroundColor: '#e9ebec',
                  }}>
                  <View
                    style={{
                      // flexDirection: 'row',
                      // justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        marginLeft: 10,
                        color: 'grey',
                        fontSize: 15,
                        fontWeight: '500',
                        alignSelf: 'center',
                        letterSpacing: 0.5
                      }}>
                      Filter by Called/Recieved
                    </Text>
                    {/* <Icon
                      name="chevron-back-outline"
                      size={20}
                      style={{ marginRight: 10 }}
                      color={'#000'}
                    /> */}
                  </View>
                </View>


                <View
                  style={{
                    borderRadius: 5,
                    marginTop: 15,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    height: 35,
                    width: '95%',
                    backgroundColor: '#e9ebec',
                  }}>
                  <View
                    style={{
                      // flexDirection: 'row',
                      // justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        marginLeft: 10,
                        color: 'grey',
                        fontSize: 15,
                        fontWeight: '500',
                        alignSelf: 'center',
                        letterSpacing: 0.5
                      }}>
                      Filter by Number of People
                    </Text>
                    {/* <Icon
                      name="chevron-back-outline"
                      size={20}
                      style={{ marginRight: 10 }}
                      color={'#000'}
                    /> */}
                  </View>
                </View>



                <TouchableOpacity>
                  <View
                    style={{
                      borderRadius: 5,
                      marginTop: 25,
                      alignSelf: 'center',
                      height: 35,
                      width: (windowWidth * 90) / 100,
                      backgroundColor: 'black',
                    }}>
                    <Text
                      style={{
                        marginTop: 6,
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      SAVE
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>


    </View>

  )
}
export default CustomerEquipScreen