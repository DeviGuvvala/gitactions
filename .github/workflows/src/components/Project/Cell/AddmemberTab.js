import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import string from '../../../theme/AppStrings'
import Icon from 'react-native-vector-icons/Ionicons';
import image from '../../../theme/Images';
import Hud from '../../../components/Hud';
import ConnectionCheck from '../../../components/ConnectionCheck';
import { Dimensions } from 'react-native';

const AddmemberTab =props => {
    console.log("props====>",props)

    const [showHud, setShowHud] = useState(false);
    const [addContactArr, setAddContactArr] = useState([]);
    let network = ConnectionCheck();

    useEffect(() => {
            getContacts();


    }, []);
    useLayoutEffect(() => {
            getContacts();
            }, []);
    const getContacts = () => {
        setShowHud(true);
        if (network === true) {
            try {
                fetch(
                    'http://middleware.9packsoftware.com:443/middleware/getAllTechnicians',
                    {
                        method: 'GET',
                    },
                )
                    .then(response => response.json())
                    .then(async responseJson => {
                        setShowHud(false);
                        if (responseJson != null) {
                            setAddContactArr(responseJson);
                            // await saveUserInLocalStorageAsync(responseJson, 'ChatIDList');
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        } else {
            // let ChatidList = await getUserFromStorageAsync('ChatIDList');
            // setAddContactArr(ChatidList);
            setShowHud(false);
        }
    };
    const Item = ({ title }) => {
        return (
            <View>
                <View style={styles.addMain}>
                    <Image style={styles.user} source={image.person} />
                    <View style={styles.mrgnhrzntl}>
                        <Text style={styles.fullName}>
                            {title}
                        </Text>
                    </View>
                    <View style={styles.plusImg}>
                        <TouchableOpacity
                            onPress={() => {

                            }}>
                            <Icon name="add" size={35} color={'black'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.vwLn}></View>

            </View>
        );
    }
    const renderItem = ({ item }) => (
        <Item title={item.employeeName} />
    );
    return (
        <View>
            <Text style={styles.memberOrg}>{string.screens.addContact.otherMembers}</Text>
            <View style={styles.inputTxt}>
                <Icon
                    style={{ marginHorizontal: 5 }}
                    name="search-outline"
                    size={20}
                />
                <TextInput placeholder="Please enter search here" style={styles.search} />
            </View>
            <View style={{ marginHorizontal: 15 }}>
                <FlatList
                    style={{
                        flexGrow: 0,
                        height: Dimensions.get('window').height / 1.7
                    }}
                    data={addContactArr}
                    renderItem={renderItem}
                    keyExtractor={item => item.deptNbr}
                />
            </View>
            <Hud showHud={showHud} />
        </View>
    );
};

const styles = StyleSheet.create({
    memberOrg: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 15,
        marginTop: 20
    },
    inputTxt: {
        height: 45,
        marginHorizontal: 15,
        borderRadius: 8,
        marginTop: 12,
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

export default AddmemberTab;
