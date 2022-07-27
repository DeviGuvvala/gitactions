import React, {useState} from 'react';
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
import { FAB } from 'react-native-paper';
// import ActionButton from 'react-native-action-button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CallScreen = props => {
  const [viewHeight, setViewHeight] = useState(false);
  const [secondviewHeight, setsecondViewHeight] = useState(false);
  const [yesterdayviewHeight, setyesterdayViewHeight] = useState(false);
  const [secondyesterdayviewHeight, setsecondyesterdayViewHeight] =
    useState(false);
  return (
    <View style={{flex:1}}>
      
  
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: 12, marginTop: 10}}>
        <Text style={{fontSize: 17}}>Today</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          marginTop: 5,
          // borderWidth: 1,
          // borderColor: '#000',
          // width: (windowWidth * 95) / 100,
          alignSelf: 'center',
          paddingVertical: 10,
         borderRadius:4
        }}>
        <View
          style={{
            // marginTop: 20,
            height:
              viewHeight === true
                ? (windowHeight * 19) / 100
                : (windowHeight * 8) / 100,
            alignSelf: 'center',
            width: (windowWidth * 90) / 100,
            borderWidth: 1,
            borderRadius:8
          }}>
          <View
            style={{
              borderRadius: 5,
              height: (windowHeight * 8) / 100,
              alignSelf: 'center',
              width: (windowWidth * 86) / 100,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{alignSelf: 'center'}}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/person.png')}
                    style={{width: 50, height: 50, marginTop: 4, marginLeft: 4}}
                    resizeMode="contain"
                  />
                </View>
                <View style={{marginTop: 4, paddingHorizontal: 10}}>
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    Customer Called
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="call"
                      size={18}
                      style={{marginTop: 2}}
                      color={'grey'}
                    />
                    <Text
                      style={{marginLeft: 5, fontSize: 16, fontWeight: '700'}}>
                      Mobile
                    </Text>
                    <Text
                      style={{marginLeft: 5, fontSize: 16, fontWeight: '700'}}>
                      5:59 PM
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{flexDirection: 'row', alignSelf: 'center'}}
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
                  style={{marginTop: 2}}
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
            width: (windowWidth * 90) / 100,
            borderWidth: 1,
            borderRadius:8
          }}>
          <View
            style={{
              borderRadius: 5,
              height: (windowHeight * 8) / 100,
              alignSelf: 'center',
              width: (windowWidth * 86) / 100,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{alignSelf: 'center'}}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/person.png')}
                    style={{width: 50, height: 50, marginTop: 4, marginLeft: 4}}
                    resizeMode="contain"
                  />
                </View>
                <View style={{marginTop: 4, paddingHorizontal: 10}}>
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    Customer Called
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="call"
                      size={18}
                      style={{marginTop: 2}}
                      color={'grey'}
                    />
                    <Text
                      style={{marginLeft: 5, fontSize: 16, fontWeight: '700'}}>
                      Mobile
                    </Text>
                    <Text
                      style={{marginLeft: 5, fontSize: 16, fontWeight: '700'}}>
                      5:59 PM
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{flexDirection: 'row', alignSelf: 'center'}}
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
                  style={{marginTop: 2}}
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

       

        {/* <View style={{marginBottom: 50}}></View> */}
      </ScrollView>

      <View style={{paddingHorizontal: 12, marginTop: 10}}>
        <Text style={{fontSize: 17}}>Yesterday</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          marginTop: 5,
          // borderWidth: 1,
          // borderColor: '#000',
          // width: (windowWidth * 95) / 100,
          alignSelf: 'center',
          paddingVertical: 10,
          borderRadius:4
        }}>
        <View
          style={{
            // marginTop: 20,
            height:
              yesterdayviewHeight === true
                ? (windowHeight * 19) / 100
                : (windowHeight * 8) / 100,
            alignSelf: 'center',
            width: (windowWidth * 90) / 100,
            borderWidth: 1,
            borderRadius:8
          }}>
          <View
            style={{
              borderRadius: 5,
              height: (windowHeight * 8) / 100,
              alignSelf: 'center',
              width: (windowWidth * 86) / 100,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{alignSelf: 'center'}}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/person.png')}
                    style={{width: 50, height: 50, marginTop: 4, marginLeft: 4}}
                    resizeMode="contain"
                  />
                </View>
                <View style={{marginTop: 4, paddingHorizontal: 10}}>
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    Customer Called
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="call"
                      size={18}
                      style={{marginTop: 2}}
                      color={'grey'}
                    />
                    <Text
                      style={{marginLeft: 5, fontSize: 16, fontWeight: '700'}}>
                      Mobile
                    </Text>
                    <Text
                      style={{marginLeft: 5, fontSize: 16, fontWeight: '700'}}>
                      5:59 PM
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{flexDirection: 'row', alignSelf: 'center'}}
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
                    secondyesterdayviewHeight === true
                      ? 'chevron-back'
                      : 'chevron-down-outline'
                  }
                  size={20}
                  style={{marginTop: 2}}
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
            width: (windowWidth * 90) / 100,
            borderWidth: 1,
            borderRadius:8
          }}>
          <View
            style={{
              borderRadius: 5,
              height: (windowHeight * 8) / 100,
              alignSelf: 'center',
              width: (windowWidth * 86) / 100,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{alignSelf: 'center'}}>
                  {/* <Text style={{marginTop:3,paddingHorizontal:10}}>icon view</Text> */}
                  <Image
                    source={require('../Images/person.png')}
                    style={{width: 50, height: 50, marginTop: 4, marginLeft: 4}}
                    resizeMode="contain"
                  />
                </View>
                <View style={{marginTop: 4, paddingHorizontal: 10}}>
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    Customer Called
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="call"
                      size={18}
                      style={{marginTop: 2}}
                      color={'grey'}
                    />
                    <Text
                      style={{marginLeft: 5, fontSize: 16, fontWeight: '700'}}>
                      Mobile
                    </Text>
                    <Text
                      style={{marginLeft: 5, fontSize: 16, fontWeight: '700'}}>
                      5:59 PM
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{flexDirection: 'row', alignSelf: 'center'}}
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
                  style={{marginTop: 2}}
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

      
      </ScrollView>
      <View style={{marginBottom: 30}} />
    </ScrollView>


    {/* <ActionButton buttonColor="#3498db">
        <ActionButton.Item buttonColor='#9b59b6' onPress={() => props.navigation.navigate('AddtoCallScreen')}>
          <Icon name="md-call" style={{
            fontSize: 20,
            height: 22,
            color: 'white',
         
          }} />
        </ActionButton.Item>
       

      </ActionButton> */}
<View>
<FAB
    style={styles.fab}
    large
    icon="phone"
    color='white'
    onPress={() => props.navigation.navigate('AddtoCallScreen')}
  />
  </View>
    </View>
  );
};


const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
 backgroundColor:'#3498db'
  },
  fab2: {
    position: 'absolute',
    // marginBottom: 16,
    right: 0,
    bottom: 0,
 backgroundColor:'#3498db'
  },
})


export default CallScreen;