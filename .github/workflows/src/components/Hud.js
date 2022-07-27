/** 
 * Created by Bhanuchandar on 22/04/22
 **/

 import React from 'react';
 import { Modal, ActivityIndicator, StyleSheet,View, Dimensions, Text as RNText } from 'react-native';
 import PropTypes from 'prop-types';
 
 
 let { width, height } = Dimensions.get('window')
 
 const Hud = ({
     showHud,
     loaderColor,
     showLoadingText,
     loadingText,
     loadingTextStyle
 }) => {
 
     return (
         <Modal
             animationType="fade"
             transparent={true}
             visible={showHud}
         >
             <View style={styles.container}>
                 <View style={styles.hudContainer}>
                     <ActivityIndicator color={loaderColor} size='small' hidesWhenStopped={!showHud} />
                     {showLoadingText ? (
                         <Text style={[styles.txtLoad, loadingTextStyle]}>{loadingText}</Text>
                     ) : null}
                 </View>
             </View>
         </Modal>
     )
 }
 
 Hud.propTypes = {
     showHud: PropTypes.bool,
     loaderColor: PropTypes.string,
     showLoadingText: PropTypes.bool,
     loadingText: PropTypes.string,
     loadingTextStyle: RNText.propTypes.style
 }
 
 Hud.defaultProps = {
     loaderColor: "#151D56",
     showLoadingText: false,
     loadingText: 'Loading...'
 }
 
 const styles = StyleSheet.create({
     container: {
         backgroundColor: 'rgba(0, 0, 0, 0.2)',
         justifyContent: 'center',
         width,
         height
     },
     hudContainer: {
         paddingHorizontal: 20,
         paddingVertical: 15,
         backgroundColor: "#FFF",
         alignSelf: 'center',
         borderRadius: 5,
     },
     txtLoad: {
         marginTop: 10,
         fontSize: 16
     }
 })
 
 export default Hud;