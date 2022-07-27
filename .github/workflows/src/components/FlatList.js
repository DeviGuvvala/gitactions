

 import React, { Component } from 'react';
 import { FlatList as ReactList, StyleSheet, RefreshControl, ActivityIndicator, TouchableHighlight, TouchableWithoutFeedback,View,Text } from 'react-native';
 import PropTypes from 'prop-types';
 import Swipeable from 'react-native-swipeable';
 
 class FlatList extends Component {
 
     constructor() {
         super();
         this.state = {
             showFooter: false,
             loadingDone: true,
             isSwiping: false,
         }
     }
 
     static propTypes = {
         data: PropTypes.array,
         NoDataComponent: PropTypes.element,
         enableRefresh: PropTypes.bool,
         enablePaging: PropTypes.bool,
         refreshing: PropTypes.bool,
         onRefresh: PropTypes.func,
         onPaging: PropTypes.func,
         renderItem: PropTypes.func,
         rightButtons: PropTypes.array,
         enableSwipeDelete: PropTypes.bool,
         onDelete: PropTypes.func,
         didSelectRow: PropTypes.func,
         horizontal: PropTypes.bool,
         numColumns: PropTypes.number,
     }
 
     static defaultProps = {
         data: [],
         NoDataComponent: <View><Text style={{ textAlign: 'center' }}>{"No Data Available"}</Text></View>,
         enableRefresh: false,
         onRefresh: () => { },
         enablePaging: false,
         rightButtons: [],
         horizontal: false,
         numColumns: 0,
     }
 
     handleScroll = (event) => {
         let yOffset = event.nativeEvent.contentOffset.y
         let contentHeight = event.nativeEvent.contentSize.height
         let value = yOffset / contentHeight
         if (value > 0.4) {
             if (this.props.onPaging, this.props.enablePaging) {
                 if (this.state.loadingDone == null) {
                     this.setState({ loadingDone: true })
                 }
                 if (this.state.loadingDone) {
                     console.log(value)
                     this.setState({ showFooter: true, loadingDone: false })
                     this.props.onPaging()
                 }
             } else {
                 this.setState({ showFooter: false })
             }
         }
     }
 
     onPagingEnd = () => {
         this.setState({ showFooter: false, loadingDone: null })
     }
 
     onScrollToItem = (index, canAnimate) => {
         // console.log('scroll===', `${index}`)
         this.inputRef.scrollToIndex({ animated: (canAnimate != null) ? canAnimate : true, index: index })
     }
 
     render() {
         const {
             data,
             NoDataComponent,
             enableRefresh,
             refreshing,
             onRefresh,
             renderItem,
             rightButtons,
             enableSwipeDelete,
             onDelete,
             didSelectRow,
             horizontal,
             numColumns,
             ...rest } = this.props
 
         const { currentlyOpenSwipeable } = this.state;
 
         const onOpen = (event, gestureState, swipeable) => {
             if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
                 currentlyOpenSwipeable.recenter();
             }
 
             this.setState({ currentlyOpenSwipeable: swipeable });
         };
 
         const onClose = () => currentlyOpenSwipeable.recenter();
 
         return (
 
             <>
                 {data.length > 0 ? (
                     // <View style={styles.container}>
                     <ReactList
                         ref={ref => { this.inputRef = ref; }}
                         showsVerticalScrollIndicator={false}
                         showsHorizontalScrollIndicator={false}
                         horizontal={horizontal}
                         numColumns={numColumns}
                         // style={{ width: '100%', height: '100%' }}
                         scrollEnabled={!this.state.isSwiping}
                         onScrollBeginDrag={() => {
                             if (this.state.currentlyOpenSwipeable) {
                                 this.state.currentlyOpenSwipeable.recenter()
                             }
                         }}
                         onScroll={this.handleScroll}
                         ListFooterComponent={this.state.showFooter ?
                             <View style={styles.vwLoaderTxt}>
                                 <ActivityIndicator color={"#000"} />
                                 <Text style={styles.loaderTxt}>Loading...</Text>
                             </View> : null}
                         refreshControl={
                             enableRefresh ? (
                                 <RefreshControl
                                     refreshing={refreshing}
                                     onRefresh={onRefresh}
                                 />
                             ) : null
                         }
                         data={data}
                         renderItem={(props) => {
                             let FinalrightButtons = []
                             if (enableSwipeDelete) {
                                 const deleteBtn = (
                                     <TouchableHighlight style={styles.deleteBtnVw}
                                         onPress={() => {
                                             this.state.currentlyOpenSwipeable.recenter()
                                             if (onDelete) {
                                                 onDelete(props.index)
                                             }
                                         }}>
                                         <Text style={styles.txtDelete}>Delete</Text>
                                     </TouchableHighlight>
                                 )
                                 FinalrightButtons.push(deleteBtn)
                             }
                             if (rightButtons.length > 0) {
                                 FinalrightButtons.push(...rightButtons)
                             }
 
                             let Item = (<TouchableWithoutFeedback onPress={() => {
                                 if (this.state.currentlyOpenSwipeable) {
                                     this.state.currentlyOpenSwipeable.recenter()
                                 }
                                 if (didSelectRow) {
                                     didSelectRow(props)
                                 }
                             }}>
                                 {renderItem(props)}
                             </TouchableWithoutFeedback>)
                             if (FinalrightButtons.length > 0 && !horizontal && numColumns == 0) {
                                 Item = <Swipeable
                                     onSwipeStart={() => this.setState({ isSwiping: true })}
                                     onSwipeRelease={() => this.setState({ isSwiping: false })}
                                     onRightButtonsOpenRelease={onOpen}
                                     onRightButtonsCloseRelease={onClose}
                                     onRef={ref => this.swipeable = ref} rightButtons={FinalrightButtons}>
                                     {Item}
                                 </Swipeable>
                             }
                             return (
                                 Item
                             )
                         }}
                         {...rest}
                     />
                     //     <View>
 
                     //     </View>
                     // </View>
                 ) :
                     this.props.NoDataComponent
                 }
             </>
         )
     }
 }
 
 const styles = StyleSheet.create({
     container: {
         // flex: 1,
         flexDirection: 'row'
     },
     vwLoaderTxt: {
         marginBottom: 70,
         flexDirection: 'row',
         justifyContent: 'center',
         marginTop: 10
     },
     loaderTxt: {
         marginLeft: 10
     },
     deleteBtnVw: {
         flex: 1,
         backgroundColor: 'red',
         justifyContent: 'center',
     },
     txtDelete: {
         // textAlign: 'center'
         marginLeft: 15
     },
     noDataTxt: {
         textAlign: 'center'
     },
 });
 
 export default FlatList;