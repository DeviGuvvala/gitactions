import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import ToggleSwitch from '../components/ToggleSwitch';

import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchScreen = ({ navigation, route }) => {
  const [exactmatchExpanded, setexactmatchExpanded] = React.useState(true);
  const [keyphraseExpanded, setkeyphraseExpanded] = React.useState(true);
  const [searchInput, setSearchInput] = React.useState('');
  const [errText, setErrText] = React.useState(false);
  const [toggle, setToggle] = useState(true);

  const collapseFun = item => {
    switch (item) {
      case 'ExactMatch':
        setexactmatchExpanded(!exactmatchExpanded);
        break;
      case 'KeyPhrase':
        setkeyphraseExpanded(!keyphraseExpanded);
        break;
      default:
        break;
    }
    // console.log(item);
  };
  const seradchInputFun = text => {
    if (text.length === 0) {
      setErrText(false);
      setSearchInput(text);
    } else {
      // setSearchInput(text);
      let searchtext = text.toLowerCase();
      // console.log(searchtext, 'Nagesh');
      if (searchtext === 'air condition') {
        setErrText(false);
        setSearchInput(searchtext);
      } else {
        setErrText(true);
        setSearchInput(searchtext);
      }
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{ justifyContent: 'center', alignItems: 'center', flex: 0.15 }}>
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Icon
            name="chevron-back"
            size={25}
            color={'#000'}
            onPress={() => navigation.goBack()}
          />
          <Text style={{ color: '#000', fontSize: 20, fontWeight: '700' }}>
            Global Search
          </Text>
          <Text> </Text>
        </View>
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="search" size={20} color={'#000'} />
            <TextInput
              style={{ color: 'black', fontSize: 16, fontWeight: '400' }}
              placeholder="Enter Search"
              value={searchInput}
              onChangeText={text => seradchInputFun(text)}
              onSubmitEditing={() => { }}
            />
          </View>
          {errText === true ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '27%',
              }}>
              <Text style={{ color: 'red' }}>Invalid Entry</Text>
              <Icon name="close-circle" size={15} color={'#000'} />
            </View>
          ) : (
            <View>
              <Text> </Text>
            </View>
          )}
        </View>
        <View style={{ borderWidth: 0.3, width: '100%', borderColor: 'grey' }} />
      </View>

      {searchInput === '' ? (
        <ScrollView style={{flex:1}}>
        <View >

         

          <View style={{flexDirection:'row',marginRight:4}}>
            <View>
            <Icon name="chevron-down-outline"
                  size={20}
                  color={'#3a3d41'}
                  style={{ marginTop: 10}}
                />
            </View>
            <View style={{marginLeft:5,marginTop:10}}>
              <Text style={{fontSize:15,letterSpacing:0.5,fontWeight:'bold'}} >Work Orders</Text>
            </View>

            </View>
          <View style={{ justifyContent: 'space-around', marginTop: 10, flexDirection: 'row' }}>
            <View style={{ height: 170, width: (windowWidth * 45 / 100), borderWidth: 1, borderRadius: 5, borderColor: 'black' }}>
              <View>
                <Text style={{ textAlign: 'center', marginTop: 4, fontSize: 17, fontWeight: 'bold', color: 'black', letterSpacing: 0.5 }}>Work Order #0012</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 4, alignSelf: 'center' }}>
                <Icon
                  name="location"
                  size={30}
                  color={'#3a3d41'}
                  style={{ marginTop: 3 }}
                />
                <Icon
                  name="person"
                  size={30}
                  color={'#3a3d41'}
                  style={{ marginTop: 3, marginLeft: 5 }}
                />
                <Icon
                  name="share-social"
                  size={30}
                  color={'#3a3d41'}
                  style={{ marginTop: 3, marginLeft: 5 }}
                />
                <Icon
                  name="arrow-forward-outline"
                  size={30}
                  color={'#3a3d41'}
                  style={{ marginTop: 3, marginLeft: 5 }}
                />
              </View>
              <View style={{ marginTop: 3 }}>
                <Text style={{ textDecorationLine: 'underline', letterSpacing: 0.5, color: 'black', textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>Description</Text>
              </View>

              <View>
                <Text style={{ textAlign: 'center', fontSize: 15 }}>In publishing andlying on meaningful conten whott.</Text>
              </View>

              <View style={{ borderRadius: 10, marginTop: 5, height: 25, width: 70, backgroundColor: '#1a60a3', justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>To Do</Text>
              </View>
            </View>

            <View style={{ height: 170, width: (windowWidth * 45 / 100), borderWidth: 1, borderRadius: 5, borderColor: 'black' }}>
              <View>
                <Text style={{ textAlign: 'center', marginTop: 4, fontSize: 17, fontWeight: 'bold', color: 'black', letterSpacing: 0.5 }}>Work Order #0012</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 4, alignSelf: 'center' }}>
                <Icon
                  name="location"
                  size={30}
                  color={'#3a3d41'}
                  style={{ marginTop: 3 }}
                />
                <Icon
                  name="person"
                  size={30}
                  color={'#3a3d41'}
                  style={{ marginTop: 3, marginLeft: 5 }}
                />
                <Icon
                  name="share-social"
                  size={30}
                  color={'#3a3d41'}
                  style={{ marginTop: 3, marginLeft: 5 }}
                />
                <Icon
                  name="arrow-forward-outline"
                  size={30}
                  color={'#3a3d41'}
                  style={{ marginTop: 3, marginLeft: 5 }}
                />
              </View>
              <View style={{ marginTop: 3 }}>
                <Text style={{ textDecorationLine: 'underline', letterSpacing: 0.5, color: 'black', textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>Description</Text>
              </View>

              <View>
                <Text style={{ textAlign: 'center', fontSize: 15 }}>In publishing andlying on meaningful conten whott.</Text>
              </View>
              <View style={{ borderRadius: 10, marginTop: 5, height: 25, width: 70, backgroundColor: '#1a60a3', justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>To Do</Text>
              </View>
            </View>

          </View>


          <View style={{flexDirection:'row',marginRight:4}}>
            <View>
            <Icon name="chevron-down-outline"
                  size={20}
                  color={'#3a3d41'}
                  style={{ marginTop: 4}}
                />
            </View>
            <View style={{marginLeft:5,marginTop:4}}>
              <Text style={{fontSize:15,letterSpacing:0.5,fontWeight:'bold'}} >Equipments</Text>
            </View>

            </View>
          <View style={{ width: '92%', marginLeft: 10 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>

              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  marginRight: 20,
                }}>
                <View
                  style={{
                    height: 74,
                    width: 230,
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'black',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    backgroundColor: '#FFFFFF',
                  }}>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: 'center',
                        fontFamily: 'Sofia_Pro_Bold',
                        fontStyle: 'normal',
                        lineHeight: 24,
                        letterSpacing: 0.5,
                        color: '#050709',
                        // numberOfLines:'2'
                      }}>
                      Air Conditioner
                    </Text>
                  </TouchableOpacity>
                  {/* <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Sofia_Pro_Regular',
                          fontStyle: 'normal',
                          lineHeight: 22,
                          letterSpacing: 0.25,
                          color: '#050709',
                        }}>
                        In Service - Serial:
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Sofia_Pro_Bold',
                            fontStyle: 'normal',
                            lineHeight: 22,
                            letterSpacing: 0.25,
                            color: '#585A5B',
                          }}>
                          {item.modelNo}
                        </Text>
                      </Text> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
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
                        // onToggle={() => navigation.navigate("ViewEqptInfoScreen",{EqObj:item})}
                         onToggle={() => setToggle(!toggle)} //To update state
                        icon={
                          toggle === true ? (
                            <Icon name="checkmark-circle-outline" size={33} />
                          ) : (
                            <Icon name="time-outline" size={33} />
                          )
                        }
                        text={
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 16,
                              fontWeight: 'bold',
                              // position: 'absolute',
                            }}>
                            active
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

                    <TouchableOpacity>
                      <View style={{ marginTop: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'blue',
                            textDecorationLine: 'underline',
                          }}>
                          View Eqpt Info
                        </Text>
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
                    borderRadius: 4,
                    borderColor: 'black',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    backgroundColor: '#FFFFFF',
                  }}>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: 'center',
                        fontFamily: 'Sofia_Pro_Bold',
                        fontStyle: 'normal',
                        lineHeight: 24,
                        letterSpacing: 0.5,
                        color: '#050709',
                        // numberOfLines:'2'
                      }}>
                      Air Conditioner
                    </Text>
                  </TouchableOpacity>
                  {/* <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Sofia_Pro_Regular',
                          fontStyle: 'normal',
                          lineHeight: 22,
                          letterSpacing: 0.25,
                          color: '#050709',
                        }}>
                        In Service - Serial:
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Sofia_Pro_Bold',
                            fontStyle: 'normal',
                            lineHeight: 22,
                            letterSpacing: 0.25,
                            color: '#585A5B',
                          }}>
                          {item.modelNo}
                        </Text>
                      </Text> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
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
                        // onToggle={() => navigation.navigate("ViewEqptInfoScreen",{EqObj:item})}
                        onToggle={() => setToggle(!toggle)} //To update state
                        icon={
                          toggle === true ? (
                            <Icon name="checkmark-circle-outline" size={33} />
                          ) : (
                            <Icon name="time-outline" size={33} />
                          )
                        }
                        text={
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 16,
                              fontWeight: 'bold',
                              // position: 'absolute',
                            }}>
                            active
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

                    <TouchableOpacity>
                      <View style={{ marginTop: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'blue',
                            textDecorationLine: 'underline',
                          }}>
                          View Eqpt Info
                        </Text>
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
                    borderRadius: 4,
                    borderColor: 'black',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    backgroundColor: '#FFFFFF',
                  }}>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: 'center',
                        fontFamily: 'Sofia_Pro_Bold',
                        fontStyle: 'normal',
                        lineHeight: 24,
                        letterSpacing: 0.5,
                        color: '#050709',
                        // numberOfLines:'2'
                      }}>
                      Air Conditioner
                    </Text>
                  </TouchableOpacity>
                  {/* <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Sofia_Pro_Regular',
                          fontStyle: 'normal',
                          lineHeight: 22,
                          letterSpacing: 0.25,
                          color: '#050709',
                        }}>
                        In Service - Serial:
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Sofia_Pro_Bold',
                            fontStyle: 'normal',
                            lineHeight: 22,
                            letterSpacing: 0.25,
                            color: '#585A5B',
                          }}>
                          {item.modelNo}
                        </Text>
                      </Text> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
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
                        // onToggle={() => navigation.navigate("ViewEqptInfoScreen",{EqObj:item})}
                        onToggle={() => setToggle(!toggle)} //To update state
                        icon={
                          toggle === true ? (
                            <Icon name="checkmark-circle-outline" size={33} />
                          ) : (
                            <Icon name="time-outline" size={33} />
                          )
                        }
                        text={
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 16,
                              fontWeight: 'bold',
                              // position: 'absolute',
                            }}>
                            active
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

                    <TouchableOpacity>
                      <View style={{ marginTop: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'blue',
                            textDecorationLine: 'underline',
                          }}>
                          View Eqpt Info
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </ScrollView>
          </View>


          <View style={{flexDirection:'row',marginRight:4}}>
            <View>
            <Icon name="chevron-down-outline"
                  size={20}
                  color={'#3a3d41'}
                  style={{ marginTop: 4}}
                />
            </View>
            <View style={{marginLeft:5,marginTop:4}}>
              <Text style={{fontSize:15,letterSpacing:0.5,fontWeight:'bold'}} >Customers</Text>
            </View>

            </View>
          <View style={{ width: '92%', marginLeft: 10 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>

              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  marginRight: 20,
                }}>
                <View
                  style={{
                    // flexDirection: 'row',
                    height: 120,
                    width: 250,
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'black',

                    justifyContent: 'space-evenly',
                    paddingHorizontal: 10,
                    backgroundColor: '#FFFFFF',
                  }}>

                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={require('../Images/person.png')}
                      style={{ width: 30, height: 30, marginTop: 2 }}
                      resizeMode="contain"

                    />
                    <TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 10,
                          // textAlign: 'center',
                          fontFamily: 'Sofia_Pro_Bold',
                          // fontStyle: 'normal',
                          lineHeight: 24,
                          letterSpacing: 0.5,
                          color: '#050709',
                          marginTop: 2
                          // numberOfLines:'2'
                        }}>
                        Micheal Chang
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text style={{ fontSize: 15 }}>In publishing andlying on meaningful conten whott.</Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 35,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // backgroundColor: 'blue',
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        width: '33.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="call"
                        size={20}
                        color={'black'}
                      />
                      {/* <Text
                        style={{
                          fontSize: 14,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Call
                      </Text> */}
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={onSendSMSMessage} */}
                    <TouchableOpacity

                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        // borderLeftWidth: 1,
                        width: '32.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="chatbubble"
                        size={20}
                        color={'black'}
                      />
                      {/* <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Message
                      </Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={getLocationFun}
                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        width: '33.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="location"
                        size={20}
                        color={'#000'}
                      />
                      {/* <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Direction
                      </Text> */}
                    </TouchableOpacity>
                  </View>


                </View>
              </View>


              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  marginRight: 20,
                }}>
                <View
                  style={{
                    // flexDirection: 'row',
                    height: 120,
                    width: 250,
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'black',

                    justifyContent: 'space-evenly',
                    paddingHorizontal: 10,
                    backgroundColor: '#FFFFFF',
                  }}>

                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={require('../Images/person.png')}
                      style={{ width: 30, height: 30, marginTop: 2 }}
                      resizeMode="contain"

                    />
                    <TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 10,
                          // textAlign: 'center',
                          fontFamily: 'Sofia_Pro_Bold',
                          // fontStyle: 'normal',
                          lineHeight: 24,
                          letterSpacing: 0.5,
                          color: '#050709',
                          marginTop: 2
                          // numberOfLines:'2'
                        }}>
                        Micheal Chang
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text style={{ fontSize: 15 }}>In publishing andlying on meaningful conten whott.</Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 35,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // backgroundColor: 'blue',
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        width: '33.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="call"
                        size={20}
                        color={'black'}
                      />
                      {/* <Text
                        style={{
                          fontSize: 14,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Call
                      </Text> */}
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={onSendSMSMessage} */}
                    <TouchableOpacity

                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        // borderLeftWidth: 1,
                        width: '32.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="chatbubble"
                        size={20}
                        color={'black'}
                      />
                      {/* <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Message
                      </Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={getLocationFun}
                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        width: '33.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="location"
                        size={20}
                        color={'#000'}
                      />
                      {/* <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Direction
                      </Text> */}
                    </TouchableOpacity>
                  </View>


                </View>
              </View>



              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  marginRight: 20,
                }}>
                <View
                  style={{
                    // flexDirection: 'row',
                    height: 120,
                    width: 250,
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'black',

                    justifyContent: 'space-evenly',
                    paddingHorizontal: 10,
                    backgroundColor: '#FFFFFF',
                  }}>

                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={require('../Images/person.png')}
                      style={{ width: 30, height: 30, marginTop: 2 }}
                      resizeMode="contain"

                    />
                    <TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 10,
                          // textAlign: 'center',
                          fontFamily: 'Sofia_Pro_Bold',
                          // fontStyle: 'normal',
                          lineHeight: 24,
                          letterSpacing: 0.5,
                          color: '#050709',
                          marginTop: 2
                          // numberOfLines:'2'
                        }}>
                        Micheal Chang
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text style={{ fontSize: 15 }}>In publishing andlying on meaningful conten whott.</Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 35,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // backgroundColor: 'blue',
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        width: '33.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="call"
                        size={20}
                        color={'black'}
                      />
                      {/* <Text
                        style={{
                          fontSize: 14,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Call
                      </Text> */}
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={onSendSMSMessage} */}
                    <TouchableOpacity

                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        // borderLeftWidth: 1,
                        width: '32.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="chatbubble"
                        size={20}
                        color={'black'}
                      />
                      {/* <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Message
                      </Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={getLocationFun}
                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        width: '33.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="location"
                        size={20}
                        color={'#000'}
                      />
                      {/* <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Direction
                      </Text> */}
                    </TouchableOpacity>
                  </View>


                </View>
              </View>






            </ScrollView>
          </View>


          <View style={{flexDirection:'row',marginRight:4}}>
            <View>
            <Icon name="chevron-down-outline"
                  size={20}
                  color={'#3a3d41'}
                  style={{ marginTop: 4}}
                />
            </View>
            <View style={{marginLeft:5,marginTop:4}}>
              <Text style={{fontSize:15,letterSpacing:0.5,fontWeight:'bold'}} >Branches</Text>
            </View>

            </View>
          <View style={{ width: '92%', marginLeft: 10 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>

              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  marginRight: 20,
                }}>
                <View
                  style={{
                    // flexDirection: 'row',
                    height: 120,
                    width: 250,
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'black',

                    justifyContent: 'space-evenly',
                    paddingHorizontal: 10,
                    backgroundColor: '#FFFFFF',
                  }}>

                  <View style={{ flexDirection: 'row' ,justifyContent:'space-between'}}>
                   
                    <TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 2,
                          // textAlign: 'center',
                          fontFamily: 'Sofia_Pro_Bold',
                          // fontStyle: 'normal',
                          lineHeight: 24,
                          letterSpacing: 0.5,
                          color: '#050709',
                          marginTop: 2
                          // numberOfLines:'2'
                        }}>
                        Springfield IL/MI Branch
                      </Text>
                    </TouchableOpacity>

                    <Icon name="chevron-forward"
                  size={20}
                  color={'#3a3d41'}
                  style={{ marginTop: 4}}
                />
                  </View>

                  <View style={{flexDirection:'row'}}>
                   <Text style={{fontWeight:'bold'}}>Store No :</Text>
                   <Text>141ABX</Text>
                  </View>

                  <View style={{flexDirection:'row'}}>
                   <Text style={{fontWeight:'bold'}}>Contact No :</Text>
                   <Text>9847584587</Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 35,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // backgroundColor: 'blue',
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        width: '33.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="location"
                        size={20}
                        color={'black'}
                        
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'black',
                          fontWeight: '500',
                          marginTop: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Address
                      </Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={onSendSMSMessage} */}
                    <TouchableOpacity

                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        // borderLeftWidth: 1,
                        width: '32.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="person"
                        size={20}
                        color={'black'}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Contact
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={getLocationFun}
                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        width: '33.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="person"
                        size={20}
                        color={'#000'}
                        style={{marginLeft:8}}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        File Room
                      </Text>
                    </TouchableOpacity>
                  </View>


                </View>
              </View>


              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  marginRight: 20,
                }}>
                <View
                  style={{
                    // flexDirection: 'row',
                    height: 120,
                    width: 250,
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'black',

                    justifyContent: 'space-evenly',
                    paddingHorizontal: 10,
                    backgroundColor: '#FFFFFF',
                  }}>

                  <View style={{ flexDirection: 'row' ,justifyContent:'space-between'}}>
                   
                    <TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 2,
                          // textAlign: 'center',
                          fontFamily: 'Sofia_Pro_Bold',
                          // fontStyle: 'normal',
                          lineHeight: 24,
                          letterSpacing: 0.5,
                          color: '#050709',
                          marginTop: 2
                          // numberOfLines:'2'
                        }}>
                        Springfield IL/MI Branch
                      </Text>
                    </TouchableOpacity>

                    <Icon name="chevron-forward"
                  size={20}
                  color={'#3a3d41'}
                  style={{ marginTop: 4}}
                />
                  </View>

                  <View style={{flexDirection:'row'}}>
                   <Text style={{fontWeight:'bold'}}>Store No :</Text>
                   <Text>141ABX</Text>
                  </View>

                  <View style={{flexDirection:'row'}}>
                   <Text style={{fontWeight:'bold'}}>Contact No :</Text>
                   <Text>9847584587</Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 35,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // backgroundColor: 'blue',
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        width: '33.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="location"
                        size={20}
                        color={'black'}
                        
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'black',
                          fontWeight: '500',
                          marginTop: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Address
                      </Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={onSendSMSMessage} */}
                    <TouchableOpacity

                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        // borderLeftWidth: 1,
                        width: '32.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="person"
                        size={20}
                        color={'black'}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Contact
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={getLocationFun}
                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        width: '33.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="person"
                        size={20}
                        color={'#000'}
                        style={{marginLeft:8}}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        File Room
                      </Text>
                    </TouchableOpacity>
                  </View>


                </View>
              </View>



              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  marginRight: 20,
                }}>
                <View
                  style={{
                    // flexDirection: 'row',
                    height: 120,
                    width: 250,
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'black',

                    justifyContent: 'space-evenly',
                    paddingHorizontal: 10,
                    backgroundColor: '#FFFFFF',
                  }}>

                  <View style={{ flexDirection: 'row' ,justifyContent:'space-between'}}>
                   
                    <TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 2,
                          // textAlign: 'center',
                          fontFamily: 'Sofia_Pro_Bold',
                          // fontStyle: 'normal',
                          lineHeight: 24,
                          letterSpacing: 0.5,
                          color: '#050709',
                          marginTop: 2
                          // numberOfLines:'2'
                        }}>
                        Springfield IL/MI Branch
                      </Text>
                    </TouchableOpacity>

                    <Icon name="chevron-forward"
                  size={20}
                  color={'#3a3d41'}
                  style={{ marginTop: 4}}
                />
                  </View>

                  <View style={{flexDirection:'row'}}>
                   <Text style={{fontWeight:'bold'}}>Store No :</Text>
                   <Text>141ABX</Text>
                  </View>

                  <View style={{flexDirection:'row'}}>
                   <Text style={{fontWeight:'bold'}}>Contact No :</Text>
                   <Text>9847584587</Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 35,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // backgroundColor: 'blue',
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        width: '33.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="location"
                        size={20}
                        color={'black'}
                        
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'black',
                          fontWeight: '500',
                          marginTop: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Address
                      </Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={onSendSMSMessage} */}
                    <TouchableOpacity

                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        // borderLeftWidth: 1,
                        width: '32.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="person"
                        size={20}
                        color={'black'}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        Contact
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={getLocationFun}
                      style={{
                        flexDirection: 'row',
                        borderColor: 'black',
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        width: '33.33%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="person"
                        size={20}
                        color={'#000'}
                        style={{marginLeft:8}}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontWeight: '500',
                          marginLeft: 5,
                          lineHeight: 18,
                          letterSpacing: 0.2,
                        }}>
                        File Room
                      </Text>
                    </TouchableOpacity>
                  </View>


                </View>
              </View>


           






            </ScrollView>
          </View>


        </View>
        <View style={{marginBottom:50}}>

        </View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          {searchInput === 'air condition' && (
            <ScrollView style={{ flex: 1 }}>
              <View style={{ marginTop: 10 }} />
              <View>
                <TouchableOpacity
                  style={styles.incompletedIconText}
                  onPress={() => collapseFun('ExactMatch')}>
                  <Icon
                    name={
                      exactmatchExpanded === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={15}
                    color={'#000'}
                  />
                  <Text style={styles.incompletedTextUi}>Exact Matches</Text>
                </TouchableOpacity>
                {exactmatchExpanded === true && (
                  <View>
                    <View style={{ flex: 0 }}>
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
                            borderWidth: 2,
                            borderColor: '#d3d3d3',
                            borderRadius: 3,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 8,
                            }}>
                            <Text
                              style={{
                                marginTop: 5,
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'black',
                              }}>
                              Service order 1702
                            </Text>
                            <Text
                              style={{
                                marginTop: 7,
                                fontSize: 15,
                                fontWeight: 'bold',
                              }}>
                              01/12/2021
                            </Text>
                            {/* <Text style={{marginTop: 5, fontSize: 18}}>05</Text> */}
                            <Icon
                              name="share-social"
                              size={20}
                              color={'#46494d'}
                              style={{ marginTop: 5 }}
                            />
                            <TouchableOpacity>
                              <Icon
                                name="arrow-forward-outline"
                                size={20}
                                color={'#46494d'}
                                style={{ marginTop: 5 }}
                              />
                            </TouchableOpacity>
                          </View>
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
                                size={25}
                                color={'grey'}
                                style={{ marginTop: 3 }}
                              />
                              <TouchableOpacity>
                                {/* // onPress={() => setcontactModalVisible(true)}> */}
                                <Icon
                                  name="person"
                                  size={25}
                                  color={'grey'}
                                  style={{ marginTop: 3, marginLeft: 5 }}
                                />
                              </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#6A9DFF',
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  color: '#3A3D41',
                                }}>
                                Service Type
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#FF5757',
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  color: '#3A3D41',
                                }}>
                                12 Steps
                              </Text>
                            </TouchableOpacity>
                            {/* {item.woEquipments.map((it, index) => ( */}
                            <TouchableOpacity>
                              <View
                                style={{
                                  backgroundColor: '#52E0FF',
                                  height: 30,
                                  paddingHorizontal: 10,
                                  borderRadius: 4,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: '#3A3D41',
                                  }}>
                                  Equipments
                                </Text>
                              </View>
                            </TouchableOpacity>
                            {/* ))} */}
                          </ScrollView>
                        </View>
                      </View>
                    </View>

                    <View style={{ flex: 0 }}>
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
                            borderWidth: 2,
                            borderColor: '#d3d3d3',
                            borderRadius: 3,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 8,
                            }}>
                            <Text
                              style={{
                                marginTop: 5,
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'black',
                              }}>
                              Service order 1702
                            </Text>
                            <Text
                              style={{
                                marginTop: 7,
                                fontSize: 15,
                                fontWeight: 'bold',
                              }}>
                              01/12/2021
                            </Text>
                            {/* <Text style={{marginTop: 5, fontSize: 18}}>05</Text> */}
                            <Icon
                              name="share-social"
                              size={20}
                              color={'#46494d'}
                              style={{ marginTop: 5 }}
                            />
                            <TouchableOpacity>
                              <Icon
                                name="arrow-forward-outline"
                                size={20}
                                color={'#46494d'}
                                style={{ marginTop: 5 }}
                              />
                            </TouchableOpacity>
                          </View>
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
                                size={25}
                                color={'grey'}
                                style={{ marginTop: 3 }}
                              />
                              <TouchableOpacity>
                                {/* // onPress={() => setcontactModalVisible(true)}> */}
                                <Icon
                                  name="person"
                                  size={25}
                                  color={'grey'}
                                  style={{ marginTop: 3, marginLeft: 5 }}
                                />
                              </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#6A9DFF',
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  color: '#3A3D41',
                                }}>
                                Service Type
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#FF5757',
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  color: '#3A3D41',
                                }}>
                                12 Steps
                              </Text>
                            </TouchableOpacity>
                            {/* {item.woEquipments.map((it, index) => ( */}
                            <TouchableOpacity>
                              <View
                                style={{
                                  backgroundColor: '#52E0FF',
                                  height: 30,
                                  paddingHorizontal: 10,
                                  borderRadius: 4,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: '#3A3D41',
                                  }}>
                                  Equipments
                                </Text>
                              </View>
                            </TouchableOpacity>
                            {/* ))} */}
                          </ScrollView>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>

              <View style={{ marginTop: 10 }} />
              <View>
                <TouchableOpacity
                  style={styles.incompletedIconText}
                  onPress={() => collapseFun('KeyPhrase')}>
                  <Icon
                    name={
                      keyphraseExpanded === true
                        ? 'chevron-down-outline'
                        : 'chevron-forward-outline'
                    }
                    size={15}
                    color={'#000'}
                  />
                  <Text style={styles.incompletedTextUi}>
                    Contains Key Phrase
                  </Text>
                </TouchableOpacity>
                {keyphraseExpanded === true && (
                  <View>
                    <View style={{ flex: 0 }}>
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
                            borderWidth: 2,
                            borderColor: '#d3d3d3',
                            borderRadius: 3,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 8,
                            }}>
                            <Text
                              style={{
                                marginTop: 5,
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'black',
                              }}>
                              Service order 1702
                            </Text>
                            <Text
                              style={{
                                marginTop: 7,
                                fontSize: 15,
                                fontWeight: 'bold',
                              }}>
                              01/12/2021
                            </Text>
                            {/* <Text style={{marginTop: 5, fontSize: 18}}>05</Text> */}
                            <Icon
                              name="share-social"
                              size={20}
                              color={'#46494d'}
                              style={{ marginTop: 5 }}
                            />
                            <TouchableOpacity>
                              <Icon
                                name="arrow-forward-outline"
                                size={20}
                                color={'#46494d'}
                                style={{ marginTop: 5 }}
                              />
                            </TouchableOpacity>
                          </View>
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
                                size={25}
                                color={'grey'}
                                style={{ marginTop: 3 }}
                              />
                              <TouchableOpacity>
                                {/* // onPress={() => setcontactModalVisible(true)}> */}
                                <Icon
                                  name="person"
                                  size={25}
                                  color={'grey'}
                                  style={{ marginTop: 3, marginLeft: 5 }}
                                />
                              </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#6A9DFF',
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  color: '#3A3D41',
                                }}>
                                Service Type
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#FF5757',
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  color: '#3A3D41',
                                }}>
                                12 Steps
                              </Text>
                            </TouchableOpacity>
                            {/* {item.woEquipments.map((it, index) => ( */}
                            <TouchableOpacity>
                              <View
                                style={{
                                  backgroundColor: '#52E0FF',
                                  height: 30,
                                  paddingHorizontal: 10,
                                  borderRadius: 4,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: '#3A3D41',
                                  }}>
                                  Equipments
                                </Text>
                              </View>
                            </TouchableOpacity>
                            {/* ))} */}
                          </ScrollView>
                        </View>
                      </View>
                    </View>

                    <View style={{ flex: 0 }}>
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
                            borderWidth: 2,
                            borderColor: '#d3d3d3',
                            borderRadius: 3,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 8,
                            }}>
                            <Text
                              style={{
                                marginTop: 5,
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'black',
                              }}>
                              Service order 1702
                            </Text>
                            <Text
                              style={{
                                marginTop: 7,
                                fontSize: 15,
                                fontWeight: 'bold',
                              }}>
                              01/12/2021
                            </Text>
                            {/* <Text style={{marginTop: 5, fontSize: 18}}>05</Text> */}
                            <Icon
                              name="share-social"
                              size={20}
                              color={'#46494d'}
                              style={{ marginTop: 5 }}
                            />
                            <TouchableOpacity>
                              <Icon
                                name="arrow-forward-outline"
                                size={20}
                                color={'#46494d'}
                                style={{ marginTop: 5 }}
                              />
                            </TouchableOpacity>
                          </View>
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
                                size={25}
                                color={'grey'}
                                style={{ marginTop: 3 }}
                              />
                              <TouchableOpacity>
                                {/* // onPress={() => setcontactModalVisible(true)}> */}
                                <Icon
                                  name="person"
                                  size={25}
                                  color={'grey'}
                                  style={{ marginTop: 3, marginLeft: 5 }}
                                />
                              </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#6A9DFF',
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  color: '#3A3D41',
                                }}>
                                Service Type
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#FF5757',
                                height: 30,
                                paddingHorizontal: 10,
                                borderRadius: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  color: '#3A3D41',
                                }}>
                                12 Steps
                              </Text>
                            </TouchableOpacity>
                            {/* {item.woEquipments.map((it, index) => ( */}
                            <TouchableOpacity>
                              <View
                                style={{
                                  backgroundColor: '#52E0FF',
                                  height: 30,
                                  paddingHorizontal: 10,
                                  borderRadius: 4,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: '#3A3D41',
                                  }}>
                                  Equipments
                                </Text>
                              </View>
                            </TouchableOpacity>
                            {/* ))} */}
                          </ScrollView>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
          {errText === true && (
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../Images/SearchErr.png')}
                style={{ width: '80%', height: '55%' }}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  incompletedIconText: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
  },

  incompletedTextUi: {
    color: '#050709',
    fontSize: 14,
    // fontWeight: '500',
    fontFamily: 'Sofia_Pro_Regular',
    paddingLeft: 8,
    lineHeight: 18,
    letterSpacing: 0.2,
  },

  contactModaltexticonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '90%',
    alignSelf: 'center',
    height: 35,
  },
  contactNameTextUi: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
    lineHeight: 24,
    letterSpacing: 0.5,
    // marginLeft: 8,
  },
  contactDescViewUi: {
    width: '90%',
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    // backgroundColor: 'green',
  },
  contactDescTextUi: {
    color: '#000',
    fontWeight: '500',
    letterSpacing: 0.2,
    lineHeight: 18,
    fontSize: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  equipmodalView: {
    margin: 20,
    backgroundColor: 'white',
    // borderRadius: 10,
    // padding: 15,
    marginTop: 10,
    // alignItems: "center",
    shadowColor: '#000',
    height: (windowHeight * 62) / 100,
    width: (windowWidth * 85) / 100,
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
export default SearchScreen;
