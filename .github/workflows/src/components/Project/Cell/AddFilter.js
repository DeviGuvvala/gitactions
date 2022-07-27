import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableOpacity, View, Text, Image } from 'react-native';
import string from '../../../theme/AppStrings'
import colors from '../../../theme/colors'
import image from "../../../theme/Images";

class AddFilter extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            filterData: null
        }
    }
    addFilterChat(filterData) {
        this.setState({
            visible: true,
        })
    }
    render() {
        return (
            <Modal
                transparent
                visible={this.state.visible}
                animationType="slide"
            >
                <View style={styles.addFilter}>
                    <View
                        style={styles.addfltrInfo}>
                        <View style={styles.mainHedr}>
                            <Text style={styles.mainTxt}>{string.screens.chatScreen.addFltr}</Text>
                            <TouchableOpacity onPress={() => this.setState({ visible: false })}>
                                <Image source={image.cross} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.ptlfltr}>{string.screens.chatScreen.ptlFltr}</Text>
                        <View style={styles.filterBg}>
                            <Text style={styles.filterTxt}>{string.screens.chatScreen.filterByDate}</Text>
                        </View>
                        <View style={styles.filterBg}>
                            <Text style={styles.filterTxt}>{string.screens.chatScreen.filtrByClr}</Text>
                        </View>
                        <View style={styles.filterBg}>
                            <Text style={styles.filterTxt}>{string.screens.chatScreen.filtrBynumofpepl}</Text>
                        </View>
                        <View style={styles.filterBg}>
                            <Text style={styles.filterTxt}>{string.screens.chatScreen.filtrByclrec}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.setState({ visible: false })}>
                            <View style={styles.addFltrBg}>
                                <Text style={styles.filterTxtSave}>{string.screens.chatScreen.save}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }


}

const styles = StyleSheet.create({
    addFilter: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end'
    },
    addfltrInfo: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    mainHedr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 16
    },
    mainTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.addfilter
    },
    ptlfltr: {
        alignSelf: 'center',
        fontSize: 12,
        color: '#050709',
        fontWeight: 'bold'
    },
    filterBg: {
        marginTop: 2,
        marginVertical: 3,
        backgroundColor: '#E9EBEC',
        marginHorizontal: 23,
        borderRadius: 4,
        height: 40,
        justifyContent: 'center'
    },
    addFltrBg: {
        marginTop: 10,
        backgroundColor: '#000',
        marginHorizontal: 16,
        borderRadius: 4,
        height: 40,
        justifyContent: 'center'
    },
    filterTxt: {
        color: '#37393C',
        fontSize: 16,
        alignSelf: 'center',
        fontStyle: 'normal',
        fontFamily: 'Sofia Pro',
        fontWeight: 'bold'
    },
    filterTxtSave: {
        color: '#fff',
        fontSize: 16,
        alignSelf: 'center',
        fontStyle: 'normal',
        fontFamily: 'Sofia Pro',
        fontWeight: 'bold'
    }
});

export default AddFilter;