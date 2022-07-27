import React from 'react'
import { View, Text } from 'react-native'

const Margin = (props) => {
    return (
        <View
    style={{
      marginTop: props.top,
      marginRight: props.right,
      marginBottom: props.bottom,
      marginLeft: props.left,
    }}>
    {props.children}
  </View>
    )
}

export default Margin
