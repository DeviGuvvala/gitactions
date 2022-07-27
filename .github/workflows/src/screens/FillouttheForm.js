
import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,

} from 'react-native';

const FillouttheForm = ({ navigation, route }) => {

    const [signature, setSignature] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.mainRow}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Image style={styles.backImg} source={require('../Images/backimg.png')} />
                </TouchableOpacity>
                <View style={styles.column}>
                    <Text style={styles.headerTxt}>Fill out this form.</Text>
                </View>
                <TouchableOpacity style={styles.menuMain} onPress={() => {
                }}>
                    <Image style={styles.menu} source={require('../Images/menu.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.scndryRow}>
                <Text style={styles.headerTxt1}>Job #000234 . Michael Chan</Text>
                <Text style={styles.inprogrs}>In Progress</Text>
            </View>
            <View style={styles.vwLn}></View>
            <Text style={styles.nameTxt}>Hello John Smith,</Text>
            <Text style={styles.signTxt}>{'Countney Love was on-site to do an evaluation per your request. Upon approval, if needed parts will be ordered or obtained. Part availability may be limited. Ground shipping takes on average 2-3 business days. If this is an emergancy, NDA is optional for an additional charge. Note, NDA cannot be ordered past 3 P.M. in most cases. Please sign below to allow to proceed in ordering these parts and continue with the work at hand. Once the document is signed and you have clicked finished, you can close the website.'}</Text>
            <View style={styles.scndryRow}>
                <Text style={styles.sign}>Please sign here.</Text>
                <View style={{flexDirection:'column'}}>
                <TextInput  
                    style={{height: 38, fontSize: 14,marginTop:-5}}  
                    placeholder="Signature"  
                    onChangeText={(signature) => setSignature(signature)}  
                />  
                <View style={styles.vwLnsig}></View>
                </View>               
            </View>
            <View style={styles.scndryRow}>
                <Text style={styles.sign}>Please date here.</Text>
                <View style={{flexDirection:'column'}}>
                <TextInput  
                    style={{height: 38, fontSize: 14,marginTop:-5}}  
                    placeholder= "15-03-2022"
                    onChangeText={(signature) => setSignature(signature)}  
                />  
                <View style={styles.vwLnsig}></View>
                </View>               
            </View>
                <View style={{marginLeft:2, marginRight:2, height:35, width:390, marginTop:230, borderRadius:5, alignItems:'center', backgroundColor:'#000', borderWidth:1
                    }}>
                <Text
                   style={{ color: '#fff', letterSpacing: 1.5, marginTop: 4, fontSize:14, fontWeight: '700',
                     }}>
                     Request Support
                </Text>

                </View>
        </View>
        
    );
};

export default FillouttheForm;

const styles = StyleSheet.create({
    mainRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 15,
        justifyContent: 'space-between'
    },
    headerTxt: {
        color: '#000',
        fontSize: 18,
        marginHorizontal: 10,
        fontFamily: 'Sofia_pro_Bold',
        fontWeight: 'bold'
    },
    headerTxt1: {
        color: '#000',
        fontSize: 16,
        marginHorizontal: 10,
        marginLeft:2,
        fontFamily: 'Sofia_pro_Bold',
        fontWeight: 'bold'
    },
    secondaryTxt: {
        color: '#60666C',
        fontSize: 10,
        marginHorizontal: 10
    },
    scndryRow: {
        flexDirection: 'row',
        marginTop: 15
    },
    inprogrs: {
        marginLeft: 'auto',
        fontSize: 14,
        marginRight:2,
        fontWeight: '700',
        color: 'red'
    },
    vwLn: {
        borderWidth: 1,
        height: 0.5,
        width: '100%'
    },
    vwLnsig:{
        borderWidth: 0.2,
        width: 250,
        marginTop:-10
    },
    nameTxt: {
        marginHorizontal: 3,
        marginTop: 20,
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16
    },
    signTxt: {
        marginHorizontal: 3,
        marginTop: 20,
        color: '#000',
        fontSize: 16,
        letterSpacing: 0.6,
        lineHeight:20,
        fontWeight: '600',
    },
    
    sign:{
        marginHorizontal: 3,
        color: '#000',
        fontSize: 16,
        fontWeight:'bold'
    }
});

