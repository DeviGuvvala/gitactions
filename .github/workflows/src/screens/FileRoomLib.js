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

const FileRoomLibrary = ({navigation, route}) => {
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
        title={'File Room'}
        // subtitle={showEdit === true ? 'Cancel' : 'Edit'}
        isItIcon={true}
        Iconname="arrow-back-outline"
        iconOnPress={() => navigation.goBack()}
        taglineText="Job #0000234. Michel chang"
        openModal={() => {
          setModalVisible(!modalVisible);
        }}
        showsideText={true}
        rightIconname="ellipsis-vertical"
        onPressFun={() => showEditFun()}
        onPressMenu={() => setHeaderModal(!headerModal)}
        // jobstatusValue={jobstatusValue}
      />
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

export default FileRoomLibrary;
