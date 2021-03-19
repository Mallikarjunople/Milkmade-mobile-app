import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../constants'

const Separator = () => {
    return (
        <View
        style={{
          borderTopWidth: 1,
          borderTopColor: COLORS.gray,
          marginVertical: 5,
          marginHorizontal: 20,
        }}
      ></View>
    )
}

export default Separator
