import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableOpacity, View, Text, Image, FlatList, TextInput, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import string from '../../../theme/AppStrings'
import image from "../../../theme/Images";


import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class AdjustMember extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
          
            message: '',
            memberData: null,
            data: [
                {
                    id: 1,
                    name: 'Mr.George'
                },
                {
                    id: 2,
                    name: 'Mr.George'
                },

                {
                    id: 3,
                    name: 'Mr.Jeff'
                },
                {
                    id: 4,
                    name: 'Mr.Doge'
                },

            ],
            dataInActive: [
                {
                    id: 1,
                    name: 'Mr.George'
                },
                {
                    id: 2,
                    name: 'Mr.Jeff'
                },
                {
                    id: 3,
                    name: 'Mr.Doge'
                },
            ]

        }
    }
    AdjustMembers(memberData) {
        this.setState({
            visible: true,
         
        })
    }
    renderItemComponent = (data) =>
        <View style={styles.mainContainer}>
            <View style={styles.row}>
                <Image style={styles.personImg} source={image.person} />
                <Text style={styles.txt}>{data.item.name}</Text>
            </View>
            <Image source={image.menu} />
        </View>
    ItemSeparator = () => <View style={{
    }}
    />
    render() {
        return (
            <Modal
                transparent
                visible={this.state.visible}
                animationType="slide" >
                <View style={styles.addFilter}>
                    <View
                        style={styles.addfltrInfo}>
                        <View style={styles.main}>
                            <Text style={styles.viewMembers}>View Members</Text>
                            <TouchableOpacity onPress={() => this.setState({ visible: false })}>
                                <Image source={image.cross} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.actvChat}>CURRENTLY IN THE CHAT :</Text>


                        <View style={{ marginTop: 10 }}>

                        </View>

                        <View style={{ height: 450 }}>

                            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>


                                <View style={{ paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View>
                                            <Image style={{ height: 50, width: 50 }} source={require('../../../Images/person1.png')} />
                                        </View>
                                        <View style={{ marginTop: 20, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.Davis</Text>
                                        </View>

                                    </View>
                                    <View style={{ marginTop: 12 }}>
                                        <Icon name="ellipsis-vertical" size={25} color={'black'} style={{ marginTop: 4 }} />
                                    </View>

                                </View>

                                <View style={{ marginTop: 10, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View>
                                            <Image style={{ height: 50, width: 50 }} source={require('../../../Images/person1.png')} />
                                        </View>
                                        <View style={{ marginTop: 20, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.George</Text>
                                        </View>

                                    </View>
                                    <View style={{ marginTop: 12 }}>
                                        <TouchableOpacity>
                                            <Icon name="ellipsis-vertical" size={25} color={'black'} style={{ marginTop: 5 }} />
                                        </TouchableOpacity>
                                    </View>

                                </View>

                                <View style={{ marginTop: 10, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View>
                                            <Image style={{ height: 50, width: 50 }} source={require('../../../Images/person1.png')} />
                                        </View>
                                        <View style={{ marginTop: 20, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.Victor</Text>
                                        </View>

                                    </View>
                                    <View style={{ marginTop: 12 }}>
                                        <Icon name="ellipsis-vertical" size={25} color={'black'} style={{ marginTop: 5 }} />
                                    </View>

                                </View>

                                <View style={{ marginTop: 10, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View>
                                            <Image style={{ height: 50, width: 50 }} source={require('../../../Images/person1.png')} />
                                        </View>
                                        <View style={{ marginTop: 20, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.Davis</Text>
                                        </View>

                                    </View>
                                    <View style={{ marginTop: 12 }}>
                                        <Icon name="ellipsis-vertical" size={25} color={'black'} style={{ marginTop: 5 }} />
                                    </View>

                                </View>





                            </ScrollView>



                            <View style={{ marginTop: 20 }}>

                            </View>

                            <View>
                                <Text style={{ fontWeight: 'bold', letterSpacing: 0.8, color: 'black' }}>OTHER MEMBERS OF YOUR ORGANISATION</Text>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                                <View>
                                    <View
                                        style={{
                                            marginTop: 10,
                                            width: (windowWidth * 92) / 100,
                                            borderWidth: 1,
                                            borderRadius: 4,
                                            height: 44,
                                            borderColor: 'grey',
                                        }}>
                                        <View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
                                            <Icon
                                                name="search"
                                                size={20}
                                                color={'black'}
                                                style={{ marginTop: 8 }}
                                            />

                                            <TextInput
                                                style={{ marginLeft: 5, fontSize: 18, width: '100%' }}
                                                placeholder="Please Search User Here"></TextInput>
                                        </View>
                                    </View>
                                    {/* <View style={{
                  marginTop: 15, width: (windowWidth * 92) / 100, borderWidth: 1, borderRadius: 4, height: 40
                }}>
                  <View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
                    <Icon
                      name="search"
                      size={20}
                      color={'#000'}
                      style={{ marginTop: 5 }}
                    />
                    <TextInput style={{ marginLeft: 5, fontSize: 18, borderWidth: 0 }} placeholder="Search Models"></TextInput>
                  </View>
                </View> */}
                                </View>

                            </View>



                            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={{ marginTop: 8 }}>


                                <View style={{ paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View>
                                            <Image style={{ height: 50, width: 50 }} source={require('../../../Images/person1.png')} />
                                        </View>
                                        <View style={{ marginTop: 20, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.Davis</Text>
                                        </View>

                                    </View>
                                    <View style={{ marginTop: 12 }}>
                                        <Icon name="ellipsis-vertical" size={25} color={'black'} style={{ marginTop: 5 }} />
                                    </View>

                                </View>

                                <View style={{ marginTop: 10, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View>
                                            <Image style={{ height: 50, width: 50 }} source={require('../../../Images/person1.png')} />
                                        </View>
                                        <View style={{ marginTop: 20, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.George</Text>
                                        </View>

                                    </View>
                                    <View style={{ marginTop: 12 }}>
                                        <Icon name="ellipsis-vertical" size={25} color={'black'} style={{ marginTop: 5 }} />
                                    </View>

                                </View>

                                <View style={{ marginTop: 10, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View>
                                            <Image style={{ height: 50, width: 50 }} source={require('../../../Images/person1.png')} />
                                        </View>
                                        <View style={{ marginTop: 20, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.Victor</Text>
                                        </View>

                                    </View>
                                    <View style={{ marginTop: 12 }}>
                                        <Icon name="ellipsis-vertical" size={25} color={'black'} style={{ marginTop: 5 }} />
                                    </View>

                                </View>

                                <View style={{ marginTop: 10, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View>
                                            <Image style={{ height: 50, width: 50 }} source={require('../../../Images/person1.png')} />
                                        </View>
                                        <View style={{ marginTop: 20, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Mr.Davis</Text>
                                        </View>

                                    </View>
                                    <View style={{ marginTop: 12 }}>
                                        <Icon name="ellipsis-vertical" size={25} color={'black'} style={{ marginTop: 5 }} />
                                    </View>

                                </View>












                            </ScrollView>

                        </View>


                        <View style={{ borderRadius: 8, marginTop: 10, height: 40, width: (windowWidth * 90 / 100), backgroundColor: 'black' }}>
                            <Text style={{ letterSpacing: 0.5, marginTop: 7, color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>SAVE</Text>
                        </View>







                    </View>

                    {/* <View style={{ marginBottom: 60 }}>

                        </View> */}





                </View>
            </Modal>
        )
    }


}

const styles = StyleSheet.create({
    addFilter: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // height:(windowHeight*90/100)

        // justifyContent: 'flex-end'

    },
    addfltrInfo: {
        backgroundColor: '#fff',
        marginTop: (windowHeight * 20 / 100),
        height: (windowHeight * 98 / 100),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 10
    },
    viewMembers: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        letterSpacing: 0.5
    },
    actvChat: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginHorizontal: 10,
        letterSpacing: 0.7
    },
    othermembrs: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        marginHorizontal: 10,
        marginTop: 15
    },
    searchInput: {
        marginTop: 10,
        marginHorizontal: 10,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchImg: {
        alignSelf: 'center',
        marginHorizontal: 5
    },
    textInputEnterMsg: {
        color: 'black',
        height: 35,
        marginTop: 2,
        fontSize: 12,
    },
    mainContainer: {
        marginTop: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    personImg: {
        height: 50,
        width: 50
    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10,
        alignSelf: 'center'
    }, row: {
        flexDirection: 'row'
    }

});

export default AdjustMember;