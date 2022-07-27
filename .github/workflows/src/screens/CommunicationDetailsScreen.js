import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
// import ActionButton from 'react-native-action-button';
import {FAB} from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CommunicationDetailsScreen = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          {/* <View style={{ flex:1, flexDirection: 'row',  alignSelf: 'flex-end',paddingRight: 5,  }}>
          <Icon name="information-circle" size={23} color={'#000'} />
          <Icon name="person-add" size={23} color={'#000'} />
          <Icon name="folder-open" size={23} color={'#000'} />
          <Icon name="add" size={23} color={'#000'} />
          <Icon name="remove" size={23} color={'#000'} />
          <Icon name="document-text" size={23} color={'#000'} />
          <Icon name="business" size={23} color={'#000'} />
          <Icon name="send" size={23} color={'#000'} />
          <Icon name="cloud-upload-outline" size={23} color={'#000'} />
          <Icon name="image" size={23} color={'#000'} />
          <Icon name="attach" size={23} color={'#000'} />
          <Icon name="options" size={23} color={'#000'} />
          <Icon name="trash" size={23} color={'#000'} />
        </View>

        <View style={{ 
          flex:1, 
          flexDirection: 'row', 
          alignSelf: 'flex-start', 
          paddingLeft: 9,
          marginTop: 5,
          marginBottom: 10, 
          }}>
          
          <Text style={{ 
            fontSize: 15, 
            fontFamily: 'Sofia_pro_Bold', 
            fontWeight: 'bold', 
            color: 'black' 
            }}>

            Hello {"{Customer:Name},"} 
          </Text >
        </View>

        <View style={{ 
          flex:1, 
          flexDirection: 'row', 
          alignSelf: 'flex-start', 
          paddingLeft: 9,
          paddingRight: 2,
          marginTop: 5, 
          }}>
          <Text style={{ 
            fontSize: 15, 
            fontFamily: 'Sofia_pro_Bold', 
            fontWeight: 'bold', 
            lineHeight: 23,
            letterSpacing: 0.2,
            color: 'black' 
            }}>
            {"{Job:LeadTechAssigned}"} was on-site to do an evalution per your request. 
            Upon approval, if needed parts will be ordered or obtained. 
            Part availablility may be limited. Ground shipping takes an average 2-3 business days. 
            If this is an emergency, NDA is optional for an additional charge. 
            Note, NDA cannot be ordered past 3P.M. in most cases. 
            Please sign below to allow us to proceed in ordering these parts and continue with the work at hand. 
            Once the document is signed and you have clicked finished, you can close the website.
          </Text>
        </View> */}
          <View
            style={{
              height: 50,
              width: (windowWidth * 90) / 100,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <Icon name="mail-outline" size={30} color={'#000'} />
              <Text style={{fontSize: 18, marginLeft: 10, marginTop: 3}}>
                Email Received from Customer
              </Text>
              <Icon
                name="chevron-forward-outline"
                size={25}
                style={{marginLeft: 10, marginTop: 4}}
                color={'#000'}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 15,
              height: 50,
              width: (windowWidth * 90) / 100,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                }}>
                <Icon name="logo-usd" size={30} color={'#000'} />
                <Text style={{fontSize: 18, marginLeft: 10, marginTop: 3}}>
                  Email Received from Customer
                </Text>
              </View>
              <View style={{marginRight: 10}}>
                <Icon
                  name="chevron-forward-outline"
                  size={25}
                  style={{marginLeft: 10, marginTop: 3}}
                  color={'#000'}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 15,
              height: 50,
              width: (windowWidth * 90) / 100,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <Icon name="mail-outline" size={30} color={'#000'} />
              <Text style={{fontSize: 18, marginLeft: 10, marginTop: 3}}>
                Email Received from Customer
              </Text>
              <Icon
                name="chevron-forward-outline"
                size={25}
                style={{marginLeft: 10, marginTop: 4}}
                color={'#000'}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 15,
              height: 50,
              width: (windowWidth * 90) / 100,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <Icon name="mail-outline" size={30} color={'#000'} />
              <Text style={{fontSize: 18, marginLeft: 10, marginTop: 3}}>
                Email Received from Customer
              </Text>
              <Icon
                name="chevron-forward-outline"
                size={25}
                style={{marginLeft: 10, marginTop: 4}}
                color={'#000'}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 15,
              height: 50,
              width: (windowWidth * 90) / 100,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                }}>
                <Icon name="logo-usd" size={30} color={'#000'} />
                <Text style={{fontSize: 18, marginLeft: 10, marginTop: 3}}>
                  Email Received from Customer
                </Text>
              </View>
              <View style={{marginRight: 10}}>
                <Icon
                  name="chevron-forward-outline"
                  size={25}
                  style={{marginLeft: 10, marginTop: 3}}
                  color={'#000'}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <ActionButton buttonColor="#3498db">
        <ActionButton.Item buttonColor='#9b59b6' onPress={() => console.log("notes tapped!")}>
          <Icon name="md-mail" style={{
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
          icon="message"
          color="white"
          onPress={() =>
            Linking.openURL(
              'mailto:support@example.com?subject=SendMail&body=Description',
            )
          }
          title="support@example.com"
          // onPress={() => props.navigation.navigate('AddtoCallScreen')}
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
    backgroundColor: '#3498db',
  },
});
export default CommunicationDetailsScreen;
