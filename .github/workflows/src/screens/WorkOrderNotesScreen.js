import React from 'react'
import { View, Text, TouchableOpacity,Dimensions } from 'react-native'
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WorkOrderNotesScreen = ({navigation,route}) => {

    const [custnote1, setcustnote1] = React.useState(false);
    const [companynote1, setcompanynote1] = React.useState(false);
  
    const collapseFun = item => {
      switch (item) {
        case 'customer note':
          setcustnote1(!custnote1);
          break;
        case 'company note':
          setcompanynote1(!companynote1);
          break;
  
        default:
          break;
      }
    };
  

    
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                searchIcon={false}
                title={'Notes'}
                // subtitle={showEdit === true ? 'Cancel' : 'Edit'}
                isItIcon={true}
                Iconname="arrow-back-outline"
                 iconOnPress={() => navigation.goBack()}
                taglineText="Job #0000234. Michel chang"
                // openModal={() => {
                //   setModalVisible(!modalVisible);
                // }}
                showsideText={true}
                rightIconname="ellipsis-vertical"
            // onPressFun={() => showEditFun()}
            // onPressMenu={() => setHeaderModal(!headerModal)}
            // jobstatusValue={jobstatusValue}
            />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginTop: 3,
                    paddingHorizontal: 15,
                    // marginVertical: 10,
                    marginBottom: 1,
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: 'Sofia_Pro_Bold',
                        fontStyle: 'normal',
                        //  lineHeight: 20,
                        letterSpacing: 0.2,
                        color: '#050709',
                    }}>
                    Notes 
                </Text>

            </View>

            <View
                style={{
                    marginTop: 3,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 2,
                }}
            />


            <View style={{ paddingHorizontal: 15,marginTop:3 }}>
                <Text
                    style={{
                        fontSize: 15,
                        fontFamily: 'Sofia_Pro_Regular',
                        fontStyle: 'normal',
                        lineHeight: 18,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        color: 'grey',
                    }}>
                    Technician Notes About the Job
                </Text>
            </View>



           

        <View style={{width: '95%', alignSelf: 'center', marginTop:5}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              alignSelf: 'center',
            }}
            onPress={() => collapseFun('customer note')}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row',marginTop:3}}>
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
              <View style={{paddingHorizontal: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    //   fontFamily: 'Sofia_Pro_Regular',
                    //   fontStyle: 'normal',
                    //   lineHeight: 22,
                    //   letterSpacing: 0.25,
                    color: '#585A5B',
                  }}>
                  Another solution is to add a height property to the parent
                  View container. This sometimes works well when calculating the
                  height against the screen height
                </Text>
              </View>
            </View>
          )}
        </View>

     
       
        
        <View style={{width: '95%', alignSelf: 'center', marginBottom: 10}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              alignSelf: 'center',
            }}
            onPress={() => collapseFun('company note')}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row',marginTop:4}}>
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
                    fontWeight: 'bold',
                    //   fontFamily: 'Sofia_Pro_Bold',
                    //   fontStyle: 'normal',
                    //   lineHeight: 22,
                    //   letterSpacing: 0.25,
                    color: '#050709',
                    marginTop: 2,
                  }}
                  numberOfLines={1}>
                  Victor
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
              <View style={{paddingHorizontal: 18}}>
                <Text
                  style={{
                    fontSize: 16,
                    //   fontFamily: 'Sofia_Pro_Regular',
                    //   fontStyle: 'normal',
                    //   lineHeight: 22,
                    //   letterSpacing: 0.25,
                    color: '#585A5B',
                  }}>
                  Another solution is to add a height property to the parent
                  View container. This sometimes works well when calculating the
                  height against the screen height
                </Text>
              </View>
            </View>
          )}
        </View>

          <View style={{paddingHorizontal: 15, marginTop: 10,flexDirection:'row', alignSelf: 'flex-end',}}>
            <View
              style={{
                height: 35,
                width: 45,
                backgroundColor: '#d3d3d3',
                // flexDirection: 'row',
                 alignItems: 'center',
                justifyContent: 'center',
                marginRight:10,
                borderRadius:4,
               
              }}>
              <Icon name="add-outline" size={20} color="#050709" />
            </View>


            <View
              style={{
                height: 35,
                width: 45,
                backgroundColor: '#d3d3d3',
                borderRadius:4,
                // flexDirection: 'row',
                 alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',
                marginRight:10,
              }}>
              <Icon name="create" size={20} color="#050709" />
            </View>


            <View
              style={{
                height: 35,
                width: 45,
                backgroundColor: '#d3d3d3',
                borderRadius:4,
                // flexDirection: 'row',
                 alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',
                marginRight:10
              }}>
              <Icon name="trash" size={20} color="black" />
            </View>
          </View>
      

        </View>
    )
}
export default WorkOrderNotesScreen