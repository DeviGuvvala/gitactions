import React, {useState, useEffect, useRef} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Modal,KeyboardAvoidingView,TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustSettingsScreen = ({ navigation, route }) => {
    const [updateModalVisible, setupdateModalVisible] = useState(false);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <TouchableOpacity>
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View
                            style={{
                                paddingHorizontal: 15,
                                marginTop: 10,
                                height: 50,
                                width: (windowWidth * 90) / 100,
                                borderWidth: 1,
                                borderColor: 'black',
                                borderRadius: 3,
                                justifyContent: 'center'
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',

                                    // marginTop: 14,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 19,
                                        fontFamily: 'Sofia_Pro_Regular',
                                        // fontWeight: 'bold',
                                        color: 'black',
                                    }}>
                                    See Customer Info
                                </Text>
                                <Icon name="arrow-forward-outline" size={20} color={'#000'} style={{ marginTop: 5 }} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => setupdateModalVisible(true)}>
                        <View
                            style={{
                                paddingHorizontal: 15,
                                marginTop: 9,
                                height: 50,
                                width: (windowWidth * 90) / 100,
                                borderWidth: 1,
                                borderColor: 'black',
                                borderRadius: 3,
                                justifyContent: 'center'
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    // marginTop: 10,
                                }}>
                                <Text
                                    style={{
                                        // marginTop: 5,
                                        fontSize: 19,
                                        fontFamily: 'Sofia_Pro_Regular',
                                        // fontWeight: 'bold',
                                        color: 'black',
                                    }}>
                                    Update App
                                </Text>
                                <Icon name="arrow-forward-outline" size={20} color={'#000'} style={{ marginTop: 5 }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={()=>navigation.navigate('CustomerPreferenceScreen')}
 
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            paddingHorizontal: 15,
                            marginTop: 9,
                            height: 50,
                            width: (windowWidth * 90) / 100,
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 3,
                            justifyContent: 'center'
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                // marginTop: 10,
                            }}>
                            <Text
                                style={{
                                    // marginTop: 5,
                                    fontSize: 19,
                                    fontFamily: 'Sofia_Pro_Regular',
                                    // fontWeight: 'bold',
                                    color: 'black',
                                }}>
                                Change Customer Preferences
                            </Text>
                            <Icon name="arrow-forward-outline" size={20} color={'#000'} style={{ marginTop: 4 }} />
                        </View>
                    </View>
                </TouchableOpacity>

               

                <View style={{ marginBottom: 100 }}></View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={updateModalVisible}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setupdateModalVisible(!updateModalVisible);
                }}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => setupdateModalVisible(false)}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}>
                        <View style={styles.notescenteredView}>
                            <TouchableWithoutFeedback style={styles.UpdatemodalView}>
                                <View style={styles.UpdatemodalView}>
                                    <View
                                        style={{
                                            height: (windowHeight * 20) / 100,
                                        }}>
                                        <View style={{
                                            flex: 1, flexDirection
                                                : 'row'
                                        }}>
                                            <View style={{ paddingHorizontal: '30%' }}>
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                        fontWeight: '700',
                                                        color: '#000',
                                                        marginTop: 10,

                                                    }}>
                                                    App Up to Date
                                                </Text>
                                            </View>

                                            <View style={{ marginTop: 13, marginRight: 10 }}>
                                                <Icon
                                                    name="close-circle-outline"
                                                    size={20}
                                                    color={'#000'}
                                                    onPress={() => setupdateModalVisible(false)}
                                                />
                                            </View>

                                        </View>
                                        <View style={{ alignSelf: 'center', marginTop: 15, }}>
                                            <Icon
                                                name="checkmark-done-outline"
                                                size={60}
                                                color={'#000'}
                                                onPress={() => setupdateModalVisible(false)}
                                            />
                                        </View>

                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Modal>

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
    UpdatemodalView: {
        // justifyContent: 'flex-end',
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        // padding: 15,
        marginTop: (windowHeight * 70) / 100,
        // alignItems: 'center',
        shadowColor: '#000',
        // borderRadius:20,
        height: (windowHeight * 30) / 100,
        width: windowWidth,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 5,
    },
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

export default CustSettingsScreen;
