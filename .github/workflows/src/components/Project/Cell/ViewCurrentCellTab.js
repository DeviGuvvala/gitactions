import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import string from '../../../theme/AppStrings';
import Icon from 'react-native-vector-icons/Ionicons';
import image from '../../../theme/Images';
import {Client} from '@twilio/conversations';

const ViewCurrentCellTab = props => {
  console.log(props);
  const [activeChat, setActiveChat] = useState([]);

  React.useEffect(() => {
    let userListArr = [];
    const client = TwilioClient(props.token);
    client.on('stateChanged', state => {
      if (state === 'initialized') {
        console.log('The connection has been: ', state);
      } else {
        console.log('failed status:', state);
      }
    });

    client.on('conversationJoined', conversation => {
      conversation
        .getParticipants()
        .then(res => {
          res.map(item => {
            if (item.identity != '124') {
              console.log('Conversation==>', item.identity);
              // userListArr.map(it => {
              //   if (!it.name) {
              userListArr.push({name: item.identity, item: conversation});
              setActiveChat(userListArr);
              //   } else {
              //     if (it.name != item.identity) {
              //       userListArr.push({name: item.identity});
              //       setActiveChat(userListArr);
              //     } else {
              //       console.log('Error');
              //     }
              //   }
              // });

              // }

              //   }
              // });
            }
          });
          // userListArr.filter((elem, pos) => {
          //   console.log(userListArr.indexOf(elem), pos, 'Nagesh');
          //   return userListArr.indexOf(elem) == pos;
          // });
          console.log(userListArr, 'Nagesh');
          // setActiveChat(userListArr);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }, []);

  const TwilioClient = token => {
    return new Client(token);
  };
  const Item = ({item}) => {
    let conversation = item.item;
    // console.log(title, 'titile');
    return (
      <View>
        <View style={styles.addMain}>
          <Image style={styles.user} source={image.person} />
          <View style={styles.mrgnhrzntl}>
            <Text style={styles.fullName}>{item.name}</Text>
          </View>
          <View style={styles.plusImg}>
            <TouchableOpacity onPress={() => {}}>
              <Icon
                name="remove"
                size={35}
                color={'black'}
                onPress={() =>
                  props.navigation.navigate('ChatScreenSDK', {
                    item: conversation,
                  })
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.vwLn}></View>
      </View>
    );
  };
  const renderItem = ({item, index}) => <Item item={item} />;
  return (
    <View>
      {console.log(activeChat, 'activeChat')}
      <Text style={styles.memberOrg}>
        {string.screens.addContact.currentMember}
      </Text>
      <View style={styles.inputTxt}>
        <Icon style={{marginHorizontal: 5}} name="search-outline" size={20} />
        <TextInput
          placeholder="Please enter search here"
          style={styles.search}
        />
      </View>
      <View style={{marginHorizontal: 15}}>
        {activeChat.length > 0 && (
          <FlatList
            data={activeChat}
            renderItem={renderItem}
            keyExtractor={item => item.deptNbr}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  memberOrg: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginTop: 20,
  },
  inputTxt: {
    height: 45,
    marginHorizontal: 15,
    borderRadius: 8,
    // marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  search: {
    fontSize: 14,
    height: 45,
    width: '100%',
    fontFamily: 'Sofia_Pro_Bold',
    letterSpacing: 0.5,
    color: 'black',
  },
  addMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    width: 40,
    height: 40,
  },
  mrgnhrzntl: {
    marginLeft: 10,
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  plusImg: {
    marginTop: 20,
    marginLeft: 'auto',
  },
});

export default ViewCurrentCellTab;
