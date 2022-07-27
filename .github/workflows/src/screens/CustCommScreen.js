import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustCommScreen = ({ navigation, route }) => {
  const [viewHeight, setViewHeight] = useState(false);
  const [secondviewHeight, setsecondViewHeight] = useState(false);
  const [yesterdayviewHeight, setyesterdayViewHeight] = useState(false);
  const [secondyesterdayviewHeight, setsecondyesterdayViewHeight] =
    useState(false);
  return (
    <View style={{ flex: 1 }}>
        <View style={{ height: 45, backgroundColor: 'white' }}>
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
        {/* <View
          style={{
            // borderBottomColor: 'blue',
            borderBottomWidth: 1,
            marginTop: 4
          }}
        /> */}
      </View>




      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>

        <View style={{ paddingHorizontal: 12, marginTop: 10 }}>
          <Text style={{ fontSize: 17 }}>Today</Text>
        </View>
        <ScrollView>
          <View
            style={{
              // marginTop: 20,
              height:
                viewHeight === true
                  ? (windowHeight * 19) / 100
                  : (windowHeight * 8) / 100,
              alignSelf: 'center',
              width: (windowWidth * 92) / 100,
              borderWidth: 1,
              marginTop:3,
              borderRadius:2
            }}>
            <View
              style={{
                borderRadius: 5,
                height: (windowHeight * 8) / 100,
                alignSelf: 'center',
                width: (windowWidth * 86) / 100,
              }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ alignSelf: 'center' }}>
                    {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                    <Image
                      source={require('../Images/person1.png')}
                      style={{ width: 50, height: 50, marginTop: 4 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{ marginTop: 4, paddingHorizontal: 10 }}>
                    <Text
                      style={{
                        marginTop: 4,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      Customer Called
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon
                        name="call"
                        size={18}
                        style={{ marginTop: 2 }}
                        color={'grey'}
                      />
                      <Text
                        style={{ marginLeft: 5, fontSize: 16, fontWeight: '700' }}>
                        Mobile
                      </Text>
                      <Text
                        style={{ marginLeft: 5, fontSize: 16, fontWeight: '700' }}>
                        5:59 PM
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignSelf: 'center' }}
                  onPress={() => setViewHeight(!viewHeight)}>
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 16,
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    {viewHeight ? 'Less' : 'More'}
                  </Text>
                  {/* <Icon
                  name="chevron-back"
                  size={18}
                  style={{ marginTop: 2, marginRight: 5 }}
                  color={'grey'}

                /> */}
                  <Icon
                    name={
                      viewHeight === true
                        ? 'chevron-back'
                        : 'chevron-down-outline'
                    }
                    size={20}
                    style={{ marginTop: 2 }}
                    color={'#000'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {viewHeight === true && (
              <View>
                <View>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 16,
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    NOTE FROM PHONE CALL
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      marginLeft: 5,
                      padding: 5,
                      fontSize: 16,
                      fontWeight: '700',
                    }}>
                    Customer called to say door was now unlocked and we can
                    proceed with the job
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View
            style={{
              marginTop: 10,
              height:
                secondviewHeight === true
                  ? (windowHeight * 19) / 100
                  : (windowHeight * 8) / 100,
              alignSelf: 'center',
              width: (windowWidth * 92) / 100,
              borderWidth: 1,
              borderRadius:3
            }}>
            <View
              style={{
                borderRadius: 5,
                height: (windowHeight * 8) / 100,
                alignSelf: 'center',
                width: (windowWidth * 86) / 100,
              }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ alignSelf: 'center' }}>
                    {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                    <Image
                      source={require('../Images/person1.png')}
                      style={{ width: 50, height: 50, marginTop: 4}}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{ marginTop: 4, paddingHorizontal: 10 }}>
                    <Text
                      style={{
                        marginTop: 4,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      Customer Called
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon
                        name="call"
                        size={18}
                        style={{ marginTop: 2 }}
                        color={'grey'}
                      />
                      <Text
                        style={{ marginLeft: 5, fontSize: 16, fontWeight: '700' }}>
                        Mobile
                      </Text>
                      <Text
                        style={{ marginLeft: 5, fontSize: 16, fontWeight: '700' }}>
                        5:59 PM
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignSelf: 'center' }}
                  onPress={() => setsecondViewHeight(!secondviewHeight)}>
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 15,
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    {secondviewHeight ? 'Less' : 'More'}
                  </Text>
                  <Icon
                    name={
                      secondviewHeight === true
                        ? 'chevron-back'
                        : 'chevron-down-outline'
                    }
                    size={20}
                    style={{ marginTop: 2 }}
                    color={'#000'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {secondviewHeight === true && (
              <View>
                <View>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 16,
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    NOTE FROM PHONE CALL
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      marginLeft: 5,
                      padding: 5,
                      fontSize: 16,
                      fontWeight: '700',
                    }}>
                    Customer called to say door was now unlocked and we can
                    proceed with the job
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* .............................................3rd view.................. */}

          <View
            style={{
              marginTop: 10,
              borderRadius: 3,
              height: (windowHeight * 10) / 100,
              alignSelf: 'center',
              width: (windowWidth * 92) / 100,
              borderWidth: 1,
            }}>
            <View style={{marginTop:3, flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal:5 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ alignSelf: 'center' }}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/person1.png')}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                    
                    <Text
                      style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                      Support Chat
                    </Text>
                    <Text
                      style={{ fontSize: 16, fontWeight: '600', color: 'grey' }}>
                      Rosco Davis
                    </Text>
                    <Text style={{ fontSize: 16, marginLeft: 15,color:'grey',fontWeight:'600' }}>5:48 PM</Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Icon
                      name="chatbubbles"
                      size={20}
                      style={{ marginTop: 5 }}
                      color={'grey'}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: 16,
                        fontWeight: '700',
                        width: (windowWidth * 50) / 100,
                      }}
                      numberOfLines={2}>
                      This is where the message should go
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {/* <Text style={{ marginRight: 10, fontSize: 15, fontWeight: '700', color: 'black' }}>More</Text> */}
                <Icon
                  name="chevron-forward"
                  size={20}
                  style={{ marginTop: 2, }}
                  color={'black'}
                />
              </TouchableOpacity>
            </View>
          </View>
          
          <View
            style={{
              marginTop: 10,
              borderRadius: 3,
              height: (windowHeight * 8) / 100,
              alignSelf: 'center',
              width: (windowWidth * 92) / 100,
              borderWidth: 1,
            }}>
            <View style={{marginTop:3, flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal:5 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ alignSelf: 'center' }}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/person1.png')}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                    
                    <Text
                      style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                    Email
                    </Text>
                    <Text
                      style={{ fontSize: 16, fontWeight: '600', color: 'grey' }}>
                     Dispatcher
                    </Text>
                    <Text style={{ fontSize: 16, marginLeft: 15,color:'grey',fontWeight:'600' }}>5:48 PM</Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Icon
                      name="chatbubbles"
                      size={20}
                      style={{ marginTop: 5 }}
                      color={'grey'}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        marginTop:5,
                        fontSize: 16,
                        fontWeight: '700',
                        width: (windowWidth * 50) / 100,
                      }}
                      numberOfLines={2}>
                     Bill Sent to Customer
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {/* <Text style={{ marginRight: 10, fontSize: 15, fontWeight: '700', color: 'black' }}>More</Text> */}
                <Icon
                  name="chevron-forward"
                  size={20}
                  style={{ marginTop: 2, }}
                  color={'black'}
                />
              </TouchableOpacity>
            </View>
          </View>

        

          {/* <View style={{marginBottom: 50}}></View> */}
        </ScrollView>

        <View style={{ paddingHorizontal: 12, marginTop: 10 }}>
          <Text style={{ fontSize: 17 }}>Yesterday</Text>
        </View>
        <ScrollView>
          <View
            style={{
               marginTop: 5,
              height:
                yesterdayviewHeight === true
                  ? (windowHeight * 19) / 100
                  : (windowHeight * 8) / 100,
              alignSelf: 'center',
              width: (windowWidth * 92) / 100,
              borderWidth: 1,
              borderRadius:3
            }}>
            <View
              style={{
                borderRadius: 5,
                height: (windowHeight * 8) / 100,
                alignSelf: 'center',
                width: (windowWidth * 86) / 100,
              }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ alignSelf: 'center' }}>
                    {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                    <Image
                      source={require('../Images/person1.png')}
                      style={{ width: 50, height: 50, marginTop: 4,}}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{ marginTop: 4, paddingHorizontal: 10 }}>
                    <Text
                      style={{
                        marginTop: 4,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      Customer Called
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon
                        name="call"
                        size={18}
                        style={{ marginTop: 2 }}
                        color={'grey'}
                      />
                      <Text
                        style={{ marginLeft: 5, fontSize: 16, fontWeight: '700' }}>
                        Mobile
                      </Text>
                      <Text
                        style={{ marginLeft: 5, fontSize: 16, fontWeight: '700' }}>
                        5:59 PM
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignSelf: 'center' }}
                  onPress={() => setyesterdayViewHeight(!yesterdayviewHeight)}>
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 15,
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    {yesterdayviewHeight ? 'Less' : 'More'}
                  </Text>
                  {/* <Icon
                  name="chevron-forward"
                  size={18}
                  style={{ marginTop: 2, marginRight: 5 }}
                  color={'grey'}

                /> */}
                  <Icon
                    name={
                      yesterdayviewHeight === true
                        ? 'chevron-back'
                        : 'chevron-down-outline'
                    }
                    size={20}
                    style={{ marginTop: 2 }}
                    color={'#000'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {yesterdayviewHeight === true && (
              <View>
                <View>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 16,
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    NOTE FROM PHONE CALL
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      marginLeft: 5,
                      padding: 5,
                      fontSize: 16,
                      fontWeight: '700',
                    }}>
                    Customer called to say door was now unlocked and we can
                    proceed with the job
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View
            style={{
              marginTop: 10,
              height:
                secondyesterdayviewHeight === true
                  ? (windowHeight * 19) / 100
                  : (windowHeight * 8) / 100,
              alignSelf: 'center',
              width: (windowWidth * 92) / 100,
              borderWidth: 1,
              borderRadius:3
            }}>
            <View
              style={{
                borderRadius: 5,
                height: (windowHeight * 8) / 100,
                alignSelf: 'center',
                width: (windowWidth * 86) / 100,
              }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ alignSelf: 'center' }}>
                    {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                    <Image
                      source={require('../Images/person1.png')}
                      style={{ width: 50, height: 50, marginTop: 4, marginLeft: 4 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{ marginTop: 4, paddingHorizontal: 10 }}>
                    <Text
                      style={{
                        marginTop: 4,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      Customer Called
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon
                        name="call"
                        size={18}
                        style={{ marginTop: 2 }}
                        color={'grey'}
                      />
                      <Text
                        style={{ marginLeft: 5, fontSize: 16, fontWeight: '700' }}>
                        Mobile
                      </Text>
                      <Text
                        style={{ marginLeft: 5, fontSize: 16, fontWeight: '700' }}>
                        5:59 PM
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignSelf: 'center' }}
                  onPress={() =>
                    setsecondyesterdayViewHeight(!secondyesterdayviewHeight)
                  }>
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 15,
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    {secondyesterdayviewHeight ? 'Less' : 'More'}
                  </Text>
                  {/* <Icon
                  name="chevron-forward"
                  size={18}
                  style={{ marginTop: 2, marginRight: 5 }}
                  color={'grey'}

                /> */}
                  <Icon
                    name={
                      secondyesterdayviewHeight === true
                        ? 'chevron-back'
                        : 'chevron-down-outline'
                    }
                    size={20}
                    style={{ marginTop: 2 }}
                    color={'#000'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {secondyesterdayviewHeight === true && (
              <View>
                <View>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 16,
                      fontWeight: '700',
                      color: 'black',
                    }}>
                    NOTE FROM PHONE CALL
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      marginLeft: 5,
                      padding: 5,
                      fontSize: 16,
                      fontWeight: '700',
                    }}>
                    Customer called to say door was now unlocked and we can
                    proceed with the job
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* .............................................3rd view.................. */}

          <View
            style={{
              marginTop: 10,
              borderRadius: 3,
              height: (windowHeight * 10) / 100,
              alignSelf: 'center',
              width: (windowWidth * 92) / 100,
              borderWidth: 1,
            }}>
            <View style={{marginTop:3, flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal:5 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ alignSelf: 'center' }}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/person1.png')}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                    
                    <Text
                      style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                      Support Chat
                    </Text>
                    <Text
                      style={{ fontSize: 16, fontWeight: '600', color: 'grey' }}>
                      Rosco Davis
                    </Text>
                    <Text style={{ fontSize: 16, marginLeft: 15,color:'grey',fontWeight:'600' }}>5:48 PM</Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Icon
                      name="chatbubbles"
                      size={20}
                      style={{ marginTop: 5 }}
                      color={'grey'}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: 16,
                        fontWeight: '700',
                        width: (windowWidth * 50) / 100,
                      }}
                      numberOfLines={2}>
                      This is where the message should go
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {/* <Text style={{ marginRight: 10, fontSize: 15, fontWeight: '700', color: 'black' }}>More</Text> */}
                <Icon
                  name="chevron-forward"
                  size={20}
                  style={{ marginTop: 2, }}
                  color={'black'}
                />
              </TouchableOpacity>
            </View>
          </View>
          
          <View
            style={{
              marginTop: 10,
              borderRadius: 3,
              height: (windowHeight * 8) / 100,
              alignSelf: 'center',
              width: (windowWidth * 92) / 100,
              borderWidth: 1,
            }}>
            <View style={{marginTop:3, flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal:5 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ alignSelf: 'center' }}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/person1.png')}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                    
                    <Text
                      style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                    Email
                    </Text>
                    <Text
                      style={{ fontSize: 16, fontWeight: '600', color: 'grey' }}>
                     Dispatcher
                    </Text>
                    <Text style={{ fontSize: 16, marginLeft: 15,color:'grey',fontWeight:'600' }}>5:48 PM</Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Icon
                      name="chatbubbles"
                      size={20}
                      style={{ marginTop: 5 }}
                      color={'grey'}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        marginTop:5,
                        fontSize: 16,
                        fontWeight: '700',
                        width: (windowWidth * 50) / 100,
                      }}
                      numberOfLines={2}>
                     Bill Sent to Customer
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {/* <Text style={{ marginRight: 10, fontSize: 15, fontWeight: '700', color: 'black' }}>More</Text> */}
                <Icon
                  name="chevron-forward"
                  size={20}
                  style={{ marginTop: 2, }}
                  color={'black'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={{ marginBottom: 30 }} />
      </ScrollView>
    </View>
  );
};

export default CustCommScreen;
