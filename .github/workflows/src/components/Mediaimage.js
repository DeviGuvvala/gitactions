import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';

const Mediaimage = props => {
  const [mediaUrl, setMediaUrl] = useState('');
  const [imageModal, setImageModal] = useState(false);

  useEffect(() => {
    console.log(props);
    if (props.message.media) {
      props.message.media
        .getContentTemporaryUrl()
        .then(url => {
          setMediaUrl(url);
          // mediaUrl = url;
          console.log(url, 'mediaUrl');
        })
        .catch(e => console.log(e));
    }
  }, []);

  const imageEnlargeFun = () => {
    setImageModal(!imageModal);
  };

  return (
    <View
      style={[
        styles.SenderchatMsg,
        {
          alignSelf: props.align === 'sender' ? 'flex-end' : 'flex-start',
        },
      ]}>
      <View
        style={[
          styles.sendmsgBg,
          {
            backgroundColor: props.align === 'sender' ? '#1A60A3' : '#9999ff',
            height: props.message.type === 'text' ? 70 : 150,
          },
        ]}>
        <View style={styles.usernametime}>
          <Text
            style={[
              styles.msgTxtMain,
              {color: props.align === 'sender' ? '#ffffff' : '#000000'},
            ]}>
            {props.message.author}
          </Text>
          <Text
            style={[
              styles.msgTxttime,
              {color: props.align === 'sender' ? '#ffffff' : '#000000'},
            ]}>
            {' '}
            {moment(props.message.dateCreated).utc().format('H:mma')}
          </Text>
        </View>
        {props.message.type === 'text' ? (
          <View style={styles.msgbody}>
            <Text
              style={[
                styles.msgTxtMain,
                {color: props.align === 'sender' ? '#ffffff' : '#000000'},
              ]}>
              {props.message.body}
            </Text>
          </View>
        ) : (
          mediaUrl != '' && (
            <TouchableOpacity style={styles.forImage} onPress={imageEnlargeFun}>
              <Image
                source={{uri: mediaUrl}}
                style={{width: 100, height: 100}}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={imageModal}
        onRequestClose={() => {
          setImageModal(!imageModal);
        }}>
        <View style={styles.mainModal}>
          <View
            style={{
              width: '90%',
              height: '100%',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                width: '90%',
                height: '90%',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Image
                source={{uri: mediaUrl}}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#1A60A3',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: 100,
                  height: 30,
                  elevation: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setImageModal(false);
                }}>
                <Text style={{color: '#fff'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Mediaimage;

const styles = StyleSheet.create({
  SenderchatMsg: {
    marginHorizontal: 30,
    marginVertical: 5,
    flexDirection: 'row',
    width: '70%',
    // alignSelf: 'flex-end',
  },
  mainModal: {
    width: '90%',
    height: '90%',
    marginTop: '10%',
    alignItems: 'center',
    // justifyContent: 'center',
    elevation: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  ReceiverchatMsg: {
    marginHorizontal: 10,
    marginVertical: 5,
    width: '70%',
    flexDirection: 'row',
    // alignSelf: 'flex-start',
  },
  forImage: {
    width: '90%',
    alignSelf: 'center',
  },
  usernametime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  msgbody: {
    width: '90%',
    alignSelf: 'center',
  },
  sendmsgBg: {
    // backgroundColor: '#a6a6a6',
    height: 76,
    width: '95%',
    // marginRight: 10,
    borderRadius: 10,
    justifyContent: 'space-evenly',
  },
  RecmsgBg: {
    // backgroundColor: '#9999ff',
    height: 76,
    width: '95%',
    marginLeft: 10,
    borderRadius: 10,
  },
  msgTxtMain: {
    color: '#3A3D41',
    fontSize: 12,
    fontFamily: 'Sofia_pro_Bold',
    fontWeight: 'bold',
    // marginTop: 12,
    // marginLeft: 12,
  },
  msgTxttime: {
    color: '#3A3D41',
    fontSize: 12,
    fontFamily: 'Sofia_pro_Bold',
    fontWeight: 'normal',
    // marginTop: 12,
    marginLeft: 5,
  },
});
