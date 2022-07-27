import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import HeaderOptionModal from '../components/HeaderOptionModal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WoEQuipLibraryScreen = ({navigation, route}) => {
  const [pExpanded, setpExpanded] = React.useState(true);
  const [vExpanded, setvExpanded] = React.useState(true);
  const [dExpanded, setdExpanded] = React.useState(true);
  const [headerModal, setHeaderModal] = React.useState(false);

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
      default:
        break;
    }
    console.log(item);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        searchIcon={false}
        title={'FileRoom'}
        // subtitle={showEdit === true ? 'Cancel' : 'Edit'}
        isItIcon={true}
        Iconname="arrow-back-outline"
        iconOnPress={() => navigation.goBack()}
        taglineText="Job #0000234. Michel chang"
        openModal={() => {
          setModalVisible(!modalVisible);
        }}
        showsideText={true}
        // rightIconname="ellipsis-vertical"
        onPressFun={() => showEditFun()}
        onPressMenu={() => setHeaderModal(!headerModal)}
        // jobstatusValue={jobstatusValue}
      />
      <ScrollView>
        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
              Air Conditioning Unit
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
                Install Date :{' '}
              </Text>
              <Text style={{fontSize: 16, fontWeight: '600'}}>04/12/2021</Text>
            </View>
          </View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
                Modal :{' '}
              </Text>
              <Text style={{fontSize: 16, fontWeight: '600'}}>5967JKF</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
                Serial No:{' '}
              </Text>
              <Text style={{fontSize: 16, fontWeight: '600'}}>1934KHDY7</Text>
            </View>
          </View>
        </View>
        <Collapse
          isExpanded={pExpanded}
          onToggle={isExpanded => setpExpanded(isExpanded)}>
          <CollapseHeader>
            <TouchableOpacity
              onPress={() => funExpand('photos')}
              style={{
                marginTop: 5,
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

        {/* <Margin bottom={12} /> */}
        <View style={{marginBottom: 80}}></View>
      </ScrollView>
      <HeaderOptionModal
        Visible={headerModal}
        navigation={navigation}
        closeModal={() => setHeaderModal(false)}
      />
    </View>
  );
};
export default WoEQuipLibraryScreen;
