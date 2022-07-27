import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


export const Styles = StyleSheet.create({

    user: {
        width: 40,
        height: 40,
    },
    mrgnhrzntl: {
        marginLeft: 10,
    },
    directionRow: {
        flexDirection: 'row'
    },
    fullName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
    },
    plusImg: {
        marginTop: 20,
        marginLeft: 'auto',
    },
    column: {
        flexDirection: 'column',
    },
    vwLn: {
        borderWidth: 0.5,
        borderColor: '#EFF0F1',
        width: '95%',
        marginHorizontal: 15,
    },
    currentTxt: {
        marginVertical: 15,
        marginHorizontal: 15,
        fontSize: 14,
        fontFamily: 'Sofia_Pro_Bold',
        color: colors.black,
        letterSpacing: 0.5,
    },
    inputTxt: {
        height: 45,
        marginHorizontal: 15,
        borderRadius: 8,
        marginTop: 12,
        alignItems: 'center',
        borderWidth: 1,
    },
    search: {
        fontSize: 18,
        height: 45,
        width: '100%',
        fontFamily: 'Sofia_Pro_Bold',
        letterSpacing: 0.5,
        color: colors.black,
    },
    vwLnbtm: {
        borderColor: '#afafaf',
        borderWidth: 1,
        marginBottom: 10
    },
    btmCancel: {
        height: 40,
        width: windowWidth,
        justifyContent: 'space-around',
        marginBottom: 15
    },
    cancel: {
        height: 40,
        width: (windowWidth * 40) / 100,
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        // marginLeft:20
    },
    cancelBg: {
        height: 40,
        width: '90%',
        backgroundColor: '#c92d07',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginLeft:20
    },
    cancelTxt: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Sofia_Pro_Bold',
    },
    bgnTxt: {
        fontSize: 18,
        fontFamily: 'Sofia_Pro_Bold',
        color: colors.black,
    },
    bgnBg: {
        height: 40,
        width: (windowWidth * 40) / 100,
        backgroundColor: '#EFF0F1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    bold: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 14,
        alignSelf: 'center'
    },
    normal: {
        fontWeight: 'normal',
        color: '#000',
        fontSize: 14,
        alignSelf: 'center'

    },
    memberOrg: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 15,
        marginTop: 20
    },
    search: {
        fontSize: 14,
        height: 45,
        width: '100%',
        fontFamily: 'Sofia_Pro_Bold',
        letterSpacing: 0.5,
        color: colors.black,
    },
    addMain: {
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
        color: colors.black,
    },
    plusImg: {
        marginTop: 20,
        marginLeft: 'auto',
    },

});