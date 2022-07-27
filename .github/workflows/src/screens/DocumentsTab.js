import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import ToggleSwitch from '../components/ToggleSwitch';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DocumentsTab = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <CollapsibleView
          // expanded={false}
          // initExpanded={true}
          duration={100}
          title={
            <Text
              style={{
                color: '#000',
                fontSize: 19,
                fontWeight: 'bold',
                paddingLeft: 8,
              }}>
              Incomplete
            </Text>
          }
          style={{
            borderWidth: 0,
            backgroundColor: '#fff',
            alignSelf: 'flex-start',
          }}
          arrowStyling={{size: 18, thickness: 2}}
          titleStyle={{alignSelf: 'flex-start'}}>
          <View
            style={{flex: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                height: 80,
                width: (windowWidth * 90) / 100,
                borderWidth: 1,
                borderRadius: 1,
                borderColor: 'black',
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{flexDirection: 'row', marginTop: 10, marginLeft: 20}}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      backgroundColor: '#e9ebec',
                      marginTop: 3,
                    }}>
                    {/* <Icon name="md-mail" size={40} color="black" style={{ marginTop: 3 }} /> */}
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'black',
                        // marginTop: 8,
                      }}>
                      Descriptioon of step
                    </Text>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                      Requires action
                    </Text>
                  </View>
                </View>

                <View style={{marginTop: 15, marginRight: 30}}>
                  <ToggleSwitch
                    isOn={toggle} // There should be a state like this.state.isOn(Set default value)
                    onColor="#26A688"
                    offColor="#E9EBEC"
                    // label='Example label'
                    // labelStyle={{color: 'black', fontWeight: '900'}}
                    size="small"
                    onToggle={() => setToggle(!toggle)} //To update state
                    icon={
                      toggle === true ? (
                        <Icon name="checkmark-circle-outline" size={33} />
                      ) : (
                        <Icon name="time-outline" size={33} />
                      )
                    }
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 0,
              marginTop: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 80,
                width: (windowWidth * 90) / 100,
                borderWidth: 1,
                borderRadius: 1,
                borderColor: 'black',
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{flexDirection: 'row', marginTop: 10, marginLeft: 20}}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      backgroundColor: '#e9ebec',
                      marginTop: 3,
                    }}>
                    {/* <Icon name="md-mail" size={40} color="black" style={{ marginTop: 3 }} /> */}
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'black',
                        // marginTop: 8,
                      }}>
                      Descriptioon of step
                    </Text>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                      Requires action
                    </Text>
                  </View>
                </View>

                <View style={{marginTop: 15, marginRight: 30}}>
                  <ToggleSwitch
                    isOn={toggle} // There should be a state like this.state.isOn(Set default value)
                    onColor="#26A688"
                    offColor="#E9EBEC"
                    // label='Example label'
                    // labelStyle={{color: 'black', fontWeight: '900'}}
                    size="small"
                    onToggle={() => setToggle(!toggle)} //To update state
                    icon={
                      toggle === true ? (
                        <Icon name="checkmark-circle-outline" size={33} />
                      ) : (
                        <Icon name="time-outline" size={33} />
                      )
                    }
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 0,
              marginTop: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 80,
                width: (windowWidth * 90) / 100,
                borderWidth: 1,
                borderRadius: 1,
                borderColor: 'black',
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{flexDirection: 'row', marginTop: 10, marginLeft: 20}}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      backgroundColor: '#e9ebec',
                      marginTop: 3,
                    }}>
                    {/* <Icon name="md-mail" size={40} color="black" style={{ marginTop: 3 }} /> */}
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'black',
                        // marginTop: 8,
                      }}>
                      Descriptioon of step
                    </Text>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                      Requires action
                    </Text>
                  </View>
                </View>

                <View style={{marginTop: 15, marginRight: 30}}>
                  <ToggleSwitch
                    isOn={toggle} // There should be a state like this.state.isOn(Set default value)
                    onColor="#26A688"
                    offColor="#E9EBEC"
                    // label='Example label'
                    // labelStyle={{color: 'black', fontWeight: '900'}}
                    size="small"
                    onToggle={() => setToggle(!toggle)} //To update state
                    icon={
                      toggle === true ? (
                        <Icon name="checkmark-circle-outline" size={33} />
                      ) : (
                        <Icon name="time-outline" size={33} />
                      )
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </CollapsibleView>

        {/* ////////////completed stage/////////////////////// */}

        <CollapsibleView
          // expanded={false}
          // initExpanded={true}
          duration={100}
          title={
            <Text
              style={{
                color: '#000',
                fontSize: 19,
                fontWeight: 'bold',
                paddingLeft: 8,
              }}>
              Completed
            </Text>
          }
          style={{
            borderWidth: 0,
            backgroundColor: '#fff',
            alignSelf: 'flex-start',
          }}
          arrowStyling={{size: 18, thickness: 2}}
          titleStyle={{alignSelf: 'flex-start'}}>
          <View
            style={{flex: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                height: 190,
                width: (windowWidth * 90) / 100,
                borderWidth: 1,
                borderRadius: 1,
                borderColor: 'black',
                marginTop: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{flexDirection: 'row', marginTop: 10, marginLeft: 20}}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      backgroundColor: '#e9ebec',
                      marginTop: 3,
                    }}>
                    {/* <Icon name="md-mail" size={40} color="black" style={{ marginTop: 3 }} /> */}
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'black',
                        // marginTop: 8,
                      }}>
                      Descriptioon of step
                    </Text>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                      Requires action
                    </Text>
                  </View>
                </View>

                <View style={{marginTop: 15, marginRight: 30}}>
                  <ToggleSwitch
                    isOn={toggle} // There should be a state like this.state.isOn(Set default value)
                    onColor="#26A688"
                    offColor="#E9EBEC"
                    // label='Example label'
                    // labelStyle={{color: 'black', fontWeight: '900'}}
                    size="small"
                    onToggle={() => setToggle(!toggle)} //To update state
                    icon={
                      toggle === true ? (
                        <Icon name="checkmark-circle-outline" size={33} />
                      ) : (
                        <Icon name="time-outline" size={33} />
                      )
                    }
                  />
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View
                      style={{
                        height: 100,
                        width: 100,
                        backgroundColor: '#5c5c5c',
                        borderRadius: 4,
                        marginLeft: 20,
                      }}></View>
                    <View
                      style={{
                        marginLeft: 10,
                        height: 100,
                        width: 100,
                        backgroundColor: '#5c5c5c',
                        borderRadius: 4,
                      }}></View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </CollapsibleView>
        <View style={{marginBottom: 300}}></View>
      </ScrollView>
     {/* <View 
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          // bottom: 30,
          height:'8%',
          width: '100%',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            height: 40,
            width: (windowWidth * 43) / 100,
            backgroundColor: 'black',
            borderRadius: 6,
          }}>
          <View
            style={{
              height:40,
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: 12,
            }}>
            <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>
              Request Support
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 40,
            width: (windowWidth * 43) / 100,
            backgroundColor: '#e9ebec',
            borderRadius: 6,
          }}>
          <View
            style={{
              height:40,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              // marginTop: 12,
              flexDirection:'row',
              width:'85%',
              alignSelf:'center'
            }}>
              <Icon name='add-circle-outline' size={24} color={'#000'}/>
            <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
              New Content
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default DocumentsTab;
