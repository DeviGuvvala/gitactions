import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomerMsgScreen = ({ navigation, route }) => {
  const [viewHeight, setViewHeight] = useState(false);
  const [secondviewHeight, setsecondViewHeight] = useState(false);
  const [yesterdayviewHeight, setyesterdayViewHeight] = useState(false);
  const [secondyesterdayviewHeight, setsecondyesterdayViewHeight] =
    useState(false);
  return (
    <View style={{ flex: 1,backgroundColor:'white' }}>
          {/* <View style={{ height: 45, backgroundColor: 'white' }}> */}
        <View style={{ paddingHorizontal: 5, flexDirection: 'row',justifyContent:'space-between',marginTop:10 }}>
          <Icon
            name="md-arrow-back"
            size={25}
            // style={{ marginTop: 5 }}
            // color={'#000'}
            onPress={() => navigation.goBack()}
          />

          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', letterSpacing: 0.6 }}>Customer Communications</Text>
          </View>

          <View>
            <TouchableOpacity>
              <Icon
                name="options"
                size={20}
                style={{marginRight:10,marginTop:2}}

                // color={'#000'}
              // onPress={() => navigation.goBack()}
              />
            </TouchableOpacity>
          </View>

</View>



      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
       
     

          <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen')}
            style={{
              marginTop: 20,
              borderRadius: 5,
              height: (windowHeight * 8) / 100,
              alignSelf: 'center',
              paddingHorizontal: 10,
              justifyContent: 'center'
              , width: (windowWidth * 95) / 100,
              borderWidth: 1
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'flex-start',
                  // backgroundColor: 'red',
                  width: '90%',
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/save.png')}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 35 / 2,
                    }}
                  // resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'space-around',
                    marginLeft: 8,
                    width: '94%',
                    // backgroundColor: 'green',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          // marginTop: 4,
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        Support Chat
                      </Text>
                      <Text
                        style={{
                          // marginTop: 4,
                          marginLeft: 5,
                          fontSize: 14,
                          // fontWeight: 'bold',
                          color: 'grey',
                        }}>
                        Rosco Davis
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginTop: 5,
                          // marginL: 5,
                          fontSize: 12,
                          // fontWeight: 'bold',
                          color: 'grey',
                        }}>
                        5:59 PM
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                      name="chatbubbles"
                      size={15}
                      style={{ marginTop: 2 }}
                      color={'grey'}
                    />
                    <Text
                      style={{
                        marginTop: 3,
                        marginLeft: 5,
                        fontSize: 12,
                        fontWeight: '700',
                      }}>
                      This is where the message should go.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon
                  name={'chevron-forward'}
                  size={20}
                  style={{ marginTop: 5 }}
                  color={'#000'}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen')}
            style={{
              marginTop: 10,
              borderRadius: 5,
              height: (windowHeight * 8) / 100,
              alignSelf: 'center',
              paddingHorizontal: 10,
              justifyContent: 'center'
              , width: (windowWidth * 95) / 100,
              borderWidth: 1
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'flex-start',
                  // backgroundColor: 'red',
                  width: '90%',
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/save.png')}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 35 / 2,
                    }}
                  // resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'space-around',
                    marginLeft: 8,
                    width: '94%',
                    // backgroundColor: 'green',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          // marginTop: 4,
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        Technician Chat
                      </Text>
                      <Text
                        style={{
                          // marginTop: 4,
                          marginLeft: 5,
                          fontSize: 14,
                          // fontWeight: 'bold',
                          color: 'grey',
                        }}>
                        Rosco Davis
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginTop: 5,
                          // marginL: 5,
                          fontSize: 12,
                          // fontWeight: 'bold',
                          color: 'grey',
                        }}>
                        5:59 PM
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                      name="chatbubbles"
                      size={15}
                      style={{ marginTop: 2 }}
                      color={'grey'}
                    />
                    <Text
                      style={{
                        marginTop: 3,
                        marginLeft: 5,
                        fontSize: 12,
                        fontWeight: '700',
                      }}>
                      This is where the message should go.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon
                  name={'chevron-forward'}
                  size={20}
                  style={{ marginTop: 5 }}
                  color={'#000'}
                />
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen')}
            style={{
              marginTop: 10,
              borderRadius: 5,
              height: (windowHeight * 8) / 100,
              alignSelf: 'center',
              paddingHorizontal: 10,
              justifyContent: 'center'
              , width: (windowWidth * 95) / 100,
              borderWidth: 1
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'flex-start',
                  // backgroundColor: 'red',
                  width: '90%',
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/save.png')}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 35 / 2,
                    }}
                  // resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'space-around',
                    marginLeft: 8,
                    width: '94%',
                    // backgroundColor: 'green',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          // marginTop: 4,
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        Dispatcher Chat
                      </Text>
                      <Text
                        style={{
                          // marginTop: 4,
                          marginLeft: 5,
                          fontSize: 14,
                          // fontWeight: 'bold',
                          color: 'grey',
                        }}>
                        Rosco Davis
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginTop: 5,
                          // marginL: 5,
                          fontSize: 12,
                          // fontWeight: 'bold',
                          color: 'grey',
                        }}>
                        5:59 PM
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                      name="chatbubbles"
                      size={15}
                      style={{ marginTop: 2 }}
                      color={'grey'}
                    />
                    <Text
                      style={{
                        marginTop: 3,
                        marginLeft: 5,
                        fontSize: 12,
                        fontWeight: '700',
                      }}>
                      This is where the message should go.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon
                  name={'chevron-forward'}
                  size={20}
                  style={{ marginTop: 5 }}
                  color={'#000'}
                />
              </View>
            </View>
          </TouchableOpacity>



       
        <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen')}
            style={{
              marginTop: 5,
              borderRadius: 5,
              height: (windowHeight * 8) / 100,
              alignSelf: 'center',
              paddingHorizontal: 10,
              justifyContent: 'center'
              , width: (windowWidth * 95) / 100,
              borderWidth: 1
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'flex-start',
                  // backgroundColor: 'red',
                  width: '90%',
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/save.png')}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 35 / 2,
                    }}
                  // resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'space-around',
                    marginLeft: 8,
                    width: '94%',
                    // backgroundColor: 'green',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          // marginTop: 4,
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        Support Chat
                      </Text>
                      <Text
                        style={{
                          // marginTop: 4,
                          marginLeft: 5,
                          fontSize: 14,
                          // fontWeight: 'bold',
                          color: 'grey',
                        }}>
                        Rosco Davis
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginTop: 5,
                          // marginL: 5,
                          fontSize: 12,
                          // fontWeight: 'bold',
                          color: 'grey',
                        }}>
                        5:59 PM
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                      name="chatbubbles"
                      size={15}
                      style={{ marginTop: 2 }}
                      color={'grey'}
                    />
                    <Text
                      style={{
                        marginTop: 3,
                        marginLeft: 5,
                        fontSize: 12,
                        fontWeight: '700',
                      }}>
                      This is where the message should go.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon
                  name={'chevron-forward'}
                  size={20}
                  style={{ marginTop: 5 }}
                  color={'#000'}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen')}
            style={{
              marginTop: 10,
              borderRadius: 5,
              height: (windowHeight * 8) / 100,
              alignSelf: 'center',
              paddingHorizontal: 10,
              justifyContent: 'center'
              , width: (windowWidth * 95) / 100,
              borderWidth: 1
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'flex-start',
                  // backgroundColor: 'red',
                  width: '90%',
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/save.png')}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 35 / 2,
                    }}
                  // resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'space-around',
                    marginLeft: 8,
                    width: '94%',
                    // backgroundColor: 'green',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          // marginTop: 4,
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        Technician Chat
                      </Text>
                      <Text
                        style={{
                          // marginTop: 4,
                          marginLeft: 5,
                          fontSize: 14,
                          // fontWeight: 'bold',
                          color: 'grey',
                        }}>
                        Rosco Davis
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginTop: 5,
                          // marginL: 5,
                          fontSize: 12,
                          // fontWeight: 'bold',
                          color: 'grey',
                        }}>
                        5:59 PM
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                      name="chatbubbles"
                      size={15}
                      style={{ marginTop: 2 }}
                      color={'grey'}
                    />
                    <Text
                      style={{
                        marginTop: 3,
                        marginLeft: 5,
                        fontSize: 12,
                        fontWeight: '700',
                      }}>
                      This is where the message should go.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon
                  name={'chevron-forward'}
                  size={20}
                  style={{ marginTop: 5 }}
                  color={'#000'}
                />
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen')}
            style={{
              marginTop: 10,
              borderRadius: 5,
              height: (windowHeight * 8) / 100,
              alignSelf: 'center',
              paddingHorizontal: 10,
              justifyContent: 'center'
              , width: (windowWidth * 95) / 100,
              borderWidth: 1
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'flex-start',
                  // backgroundColor: 'red',
                  width: '90%',
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/save.png')}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 35 / 2,
                    }}
                  // resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'space-around',
                    marginLeft: 8,
                    width: '94%',
                    // backgroundColor: 'green',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          // marginTop: 4,
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        Dispatcher Chat
                      </Text>
                      <Text
                        style={{
                          // marginTop: 4,
                          marginLeft: 5,
                          fontSize: 14,
                          // fontWeight: 'bold',
                          color: 'grey',
                        }}>
                        Rosco Davis
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginTop: 5,
                          // marginL: 5,
                          fontSize: 12,
                          // fontWeight: 'bold',
                          color: 'grey',
                        }}>
                        5:59 PM
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                      name="chatbubbles"
                      size={15}
                      style={{ marginTop: 2 }}
                      color={'grey'}
                    />
                    <Text
                      style={{
                        marginTop: 3,
                        marginLeft: 5,
                        fontSize: 12,
                        fontWeight: '700',
                      }}>
                      This is where the message should go.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon
                  name={'chevron-forward'}
                  size={20}
                  style={{ marginTop: 5 }}
                  color={'#000'}
                />
              </View>
            </View>
          </TouchableOpacity>
       


        

      
       
        <View style={{ marginBottom: 80 }} />
      </ScrollView>

    </View>
  );
};

export default CustomerMsgScreen;
