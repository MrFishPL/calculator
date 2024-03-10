import { View, Text, StyleSheet } from 'react-native'
import React from 'react';

import { scaledSize } from '../scaledSize';
const REM = scaledSize(10);


const Top = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.calcus}</Text>
      <Text style={styles.text2}>{props.res}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: REM,
    justifyContent: "space-between",
    paddingHorizontal: REM,
    paddingTop: 2*REM,
  },

  text: {
    color: "#efbb81",
    textAlign: "right",
    fontSize: 4 * REM,
  },

  text2: {
    color: "#6e5539",
    fontSize: 2 * REM,
    textAlign: "right",
  }
});

export default Top