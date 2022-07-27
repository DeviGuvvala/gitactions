/**
 * toggle-switch-react-native
 * Toggle Switch component for react native, it works on iOS and Android
 * https://github.com/aminebenkeroum/toggle-switch-react-native
 * Email:amine.benkeroum@gmail.com
 * Blog: https://medium.com/@aminebenkeroum/
 * @benkeroumamine
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';

import PropTypes from 'prop-types';
//  import Icon from 'react-native-vector-icons/Ionicons';

export default class ToggleSwitch extends React.Component {
  static calculateDimensions(size) {
    switch (size) {
      case 'small':
        return {
          width: 45,
          padding: 14,
          circleWidth: 30,
          circleHeight: 30,
          translateX: 25,
        };
      case 'large':
        return {
          width: 100,
          padding: 20,
          circleWidth: 30,
          circleHeight: 30,
          translateX: 38,
        };
      case 'medium':
        return {
          width: 80,
          padding: 15,
          circleWidth: 30,
          circleHeight: 30,
          translateX: 30,
        };
      default:
        return {
          width: 60,
          padding: 12,
          circleWidth: 18,
          circleHeight: 18,
          translateX: 26,
        };
    }
  }

  static propTypes = {
    isOn: PropTypes.bool.isRequired,
    label: PropTypes.string,
    onColor: PropTypes.string.isRequired,
    offColor: PropTypes.string.isRequired,
    size: PropTypes.string,
    labelStyle: PropTypes.object,
    onToggle: PropTypes.func.isRequired,
    icon: PropTypes.object,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    isOn: false,
    onColor: '#634fc9',
    offColor: '#ecf0f1',
    size: 'medium',
    labelStyle: {},
    icon: null,
    disabled: false,
    text: null,
  };

  offsetX = new Animated.Value(0);
  dimensions = ToggleSwitch.calculateDimensions(this.props.size);

  createToggleSwitchStyle = () => ({
    justifyContent: 'center',
    width: this.dimensions.width,
    borderRadius: 20,
    padding: this.dimensions.padding,
    backgroundColor: this.props.isOn ? this.props.onColor : this.props.offColor,
  });

  createInsideCircleStyle = () => ({
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 2,
    // alignSelf:'center',
    elevation: 10,
    position: 'absolute',
    //  top:'90%',
    backgroundColor: 'white',
    transform: [{translateX: this.offsetX}],
    width: this.dimensions.circleWidth,
    height: this.dimensions.circleHeight,
    borderRadius: this.dimensions.circleWidth / 2,
  });

  render() {
    const toValue = this.props.isOn
      ? this.dimensions.width - this.dimensions.translateX
      : 0;

    Animated.timing(this.offsetX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    return (
      <View style={styles.container}>
        {this.props.label ? (
          <Text style={[styles.labelStyle, this.props.labelStyle]}>
            {this.props.label}
          </Text>
        ) : null}
        <TouchableOpacity
          disabled={this.props.disabled}
          style={this.createToggleSwitchStyle()}
          activeOpacity={0.8}
          onPress={() => {
            this.props.onToggle(!this.props.isOn);
          }}>
          {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
           <Image
              style={{height: 10, width: 10}}
              source={require('../assets/images/time.png')} //TODO UPDATE WITH YOUR CHECK IMGAE
            />
            <Image
              style={{height: 10, width: 10}}
              source={require('../assets/images/tick.png')} //TODO UPDATE WITH YOUR CROSS IMGAE
            />
           </View> */}
          <View style={styles.toggletext}>{this.props.text}</View>

          <Animated.View style={this.createInsideCircleStyle()}>
            <View style={styles.innercircle}>{this.props.icon}</View>
            {/* <View style={styles.innercircle}>{this.props.text}</View> */}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    marginHorizontal: 10,
  },
  innercircle: {
    position: 'absolute',
    // backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 33,
    height: 33,
    bottom: '0.2%',
    left: '0.2%',
  },
  toggletext: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 55,
    height: 33,
    bottom: '0.2%',
    left: '0.2%',
  },
});
