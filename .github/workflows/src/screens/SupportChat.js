import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WSCall from '../services/WSCall';
import FlatList from '../components/FlatList';
import Hud from '../components/Hud';
import moment from "moment";

const SupportChat = ({ navigation, route }) => {

    const [message, setMessage] = React.useState('');
    const [messageListArr, setMessageListArr] = React.useState([]);
    const [showHud, setShowHud] = useState(false)
    const [token, setToken] = useState('')


    useEffect(() => {
        getMessages()
    }, []);

    const getMessages = () => {
        setShowHud(true)
        id = token
        fetch('http://twl.9packsoftware.com:443/list-message/:' + `${id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(responseJson => {
                setShowHud(false)
                setMessage('')
                responseJson.map((listmessage) => {
                    setMessageListArr([listmessage])                   

                })

            })
            .catch(error => {
                console.error(error);
            });

    }

    const sendMessages = async () => {
        if (!message.trim()) {
            alert('Please Enter Message');
            return;
        } else {
            fetch('http://twl.9packsoftware.com:443/message-conversation', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Body: message,
                    Author: "Bhanu",
                    chatId: "CHf268dd0a11de4268b7848c48a27305e1"
                }),
            })
                .then(response => response.json())
                .then(responseJson => {
                    setMessage('')
                  
                    alert(responseJson.sucess);
                    setToken(responseJson.token)

                })
                .catch(error => {
                    console.error(error);
                });
        }

    }



    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.mainRow}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()

                }}>

                    <Image style={styles.backImg} source={require('../Images/backimg.png')} />
                </TouchableOpacity>

                <View style={styles.column}>
                    <Text style={styles.headerTxt}>Support Chat</Text>
                    <Text style={styles.secondaryTxt}>Job #000234 . Micheal Chang</Text>
                </View>
                <View style={styles.right}>
                    <Image style={styles.video} source={require('../Images/video.png')} />
                    <Image style={styles.user} source={require('../Images/user.png')} />
                </View>
            </View>
            <View style={styles.search}>
                <View style={styles.searchRow}>
                    <Image style={styles.user} source={require('../Images/search.png')} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search Chat"
                    />
                </View>
            </View>
            <View style={styles.viewchattimeln}></View>
            <View style={styles.chatBg}>
                <Image style={styles.arrow} source={require('../Images/rightarrow.png')} />
                <Text style={styles.chatbegunstyl}>Chat has begun</Text>
            </View>
             {/* <Text style={styles.headerTxt}>Inprogress</Text> */}

            {/* <View style={styles.chatMsg}>
                <Image style={styles.user} source={require('../Images/usericon.png')} />
                <View style={styles.msgBg}>
                    <Text style={styles.msgTxtMain}>{"Michael Brown"}<Text style={styles.msgTxttime}>  {"10:27 AM"}</Text></Text>
                    <Text style={styles.msgTxtMain}>{"Hello team I need help as I am not able to start the motor."}</Text>
                </View>
            </View> */}
            {/* <View style={styles.chatMsg}>
                <View style={styles.msgBgScnd}>
                    <Text style={styles.msgTxtMainScnd}>{"Daniel Davis"}<Text style={styles.msgTxttimeScnd}>  {"10:27 AM"}</Text></Text>
                    <Text style={styles.msgMainScnd}>{"Did you turn the key on?"}</Text>
                </View>
                <Image style={styles.userScnd} source={require('../Images/msgscndusr.png')} />
            </View> */}
            <FlatList
                enableRefresh
                refreshing={showHud}
                onRefresh={() => {
                    getMessages()
                }}
                data={messageListArr}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(messageListArr) => {
                    return (
                        <View style={styles.chatMsg}>
                            <Image style={styles.user} source={require('../Images/usericon.png')} />
                            <View style={styles.msgBg}>
                                <Text style={styles.msgTxtMain}>{messageListArr.item.body}<Text style={styles.msgTxttime}>  {moment(messageListArr.item.dateCreated).utc().format('YYYY-MM-DD H:mma')}</Text></Text>
                                <Text style={styles.msgTxtMain}>{"Nope. Thanks. I will now close out the job."}</Text>
                            </View>
                        </View>
                    );
                }}
            />

            <View style={styles.bottomvw}>
                <View style={styles.enterMsgBg}>

                    <TextInput
                        style={styles.textInputEnterMsg}
                        onChangeText={setMessage}
                        value={message}
                        placeholder="Type a message"
                    />
                </View>
                <View style={styles.attachment}>
                    <Icon
                        name="attach-outline"
                        size={18}
                        color={'#000'}
                    />
                </View>
                <TouchableOpacity onPress={() => {
                    sendMessages()

                }}>
                    <View style={styles.sendMsg}>
                        <Image source={require('../Images/rightarrow.png')} />
                    </View>

                </TouchableOpacity>

            </View>
            <Hud showHud={showHud} />

        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        margin: 10,
        borderBottomWidth: 1,
        fontSize: 20,
        padding: 3,
    },
    backImg: {
        marginTop: -15
    },
    mainRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 10
    },
    headerTxt: {
        color: '#3A3D41',
        fontSize: 14,
        marginHorizontal: 10,
        fontFamily: 'Sofia_pro_Bold',
        fontWeight: 'bold'
    },
    secondaryTxt: {
        color: '#60666C',
        fontSize: 10,
        marginHorizontal: 10
    },
    right: {
        marginLeft: 'auto',
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column',
    },
    video: {
        marginHorizontal: 10
    },
    search: {
        backgroundColor: '#EFF0F1',
        height: 35,
        borderRadius: 5,
        marginTop: 8,
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15
    },
    textInput: {
        color: '#60666C',
        height: 35,
        marginTop: 5
    },
    textInputEnterMsg: {
        color: '#60666C',
        height: 35,
        marginTop: 2,
        fontSize: 12,
        marginHorizontal: 10
    },
    viewLine: {
        borderWidth: 2,
        borderColor: '#D1D1D6',
        marginTop: 8
    },
    viewchattimeln: {
        borderWidth: 1,
        height: 0.5,
        borderColor: '#D3D7D9',
        marginTop: 25,
        marginHorizontal: 15
    },
    chatline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    chatBg: {
        width: 130,
        height: 30,
        marginTop: -18,
        backgroundColor: '#D3D7D9',
        borderRadius: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    chatBgScnd: {
        width: 220,
        height: 30,
        marginTop: -18,
        backgroundColor: '#D3D7D9',
        borderRadius: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        marginHorizontal: 10
    },
    chatbegunstyl: {
        color: '#3A3D41',
        fontSize: 10,
        fontFamily: 'Sofia_pro_Bold',
        fontWeight: 'bold'
    },
    chatMsg: {
        marginHorizontal: 26.5,
        marginVertical: 10,
        flexDirection: 'row'
    },
    msgBg: {
        backgroundColor: '#EFF0F1',
        height: 76,
        width: '95%',
        marginLeft: 10,
        borderRadius: 10
    },
    msgBgScnd: {
        backgroundColor: '#1A60A3',
        height: 76,
        width: '90%',
        marginLeft: 10,
        borderRadius: 10
    },
    msgTxtMain: {
        color: '#3A3D41',
        fontSize: 12,
        fontFamily: 'Sofia_pro_Bold',
        fontWeight: 'bold',
        marginTop: 12,
        marginLeft: 12
    },
    msgTxttime: {
        color: '#3A3D41',
        fontSize: 12,
        fontFamily: 'Sofia_pro_Bold',
        fontWeight: 'normal',
        marginTop: 12,
        marginLeft: 5
    },
    msgTxtMainScnd: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Sofia_pro_Bold',
        fontWeight: 'bold',
        marginTop: 12,
        marginLeft: 'auto',
        marginRight: 15
    },
    msgMainScnd: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Sofia_pro_Bold',
        fontWeight: 'bold',
        marginTop: 12,
        marginHorizontal: 15
    },
    msgTxttimeScnd: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Sofia_pro_Bold',
        fontWeight: 'normal',
        marginTop: 12,
    },
    userScnd: {
        marginHorizontal: 15
    },
    bottomvw: {
        marginTop: 'auto',
        // marginBottom: -15,
        flexDirection: 'row'
    },
    enterMsgBg: {
        backgroundColor: "#EFF0F1",
        height: 35,
        width: '65%',
        borderRadius: 5,
        marginHorizontal: 15
    },
    attachment: {
        backgroundColor: "#EFF0F1",
        height: 35,
        width: 30,
        borderRadius: 5,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    sendMsg: {
        backgroundColor: "#EFF0F1",
        height: 35,
        width: 30,
        borderRadius: 5,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center'

    },

});

export default SupportChat;