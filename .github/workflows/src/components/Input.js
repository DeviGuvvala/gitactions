import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

const Input=(props) => (
    <View style={props.error ? styles.errorPadding : undefined}>
      {props.error ? <Text style={styles.errorText}>{props.error}</Text> : null}
      <View style={[styles.container, props.error ? styles.noPaddingTop : undefined]}>
        <View style={styles.row}>
          <View style={styles.icon}>
            <Icon size={18} color={colors.gray_7} name={props.leftIcon} />
          </View>
          <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChange}
            maxLength={80}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
            autoCompleteType={props.autoCompleteType}
            placeholderTextColor={colors.gray_7}
            autoCapitalize="none"
            onFocus={props.onBlur}
            onBlur={props.onBlur}
          />
        </View>
        {props.placeholder === 'Password' && (
          <View style={styles.icon}>
            <Icon
              size={18}
              color={colors.gray_7}
              name={props.showPassword ? 'eye-off' : 'eye'}
              onPress={props.onRightButtonPress}
            />
          </View>
        )}
      </View>
    </View>
  );
  
  const styles = StyleSheet.create({
    icon: {
      justifyContent: 'center',
    },
    errorPadding: {
      paddingTop: 8,
    },
    noPaddingTop: {
      paddingTop: 0,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 13,
      backgroundColor: colors.background,
    },
    row: {
      flexDirection: 'row',
      flexShrink: 1,
      paddingRight: 5,
    },
    input: {
      fontFamily: 'sofia-pro-bold',
      color: colors.gray_7,
      fontSize: 14,
      marginLeft: 13,
      padding: 0,
      width: '100%',
      flexShrink: 1,
    },
    errorText: {
      fontFamily: 'sofia-pro-bold',
      color: colors.red,
      fontSize: 10,
      marginBottom: 9,
    },
  });
  
  export default Input;