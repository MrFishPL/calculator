import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { useState } from "react";

import { scaledSize } from '../scaledSize';
const REM = scaledSize(10);

const Item = ({ text, color, onPress = () => {}, backgroundColor = "#181c14" }) => {
  const addTextButtonStyles = {
    fontSize: 2.5 * REM,
    color: color,
  };

  const [isPortrait, setIsPortrait] = useState(
    Dimensions.get("window").height / Dimensions.get("window").width > 1
  );

  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: REM,

      borderRadius: 1000,
      alignItems: "center",
      justifyContent: "center",
      aspectRatio: (isPortrait && Math.min(
        Dimensions.get('window').height,
        Dimensions.get('window').width,
      ) < 600 ? "1/1" : "3.6/1"),
    },
  });  

  Dimensions.addEventListener("change", () => {
    setIsPortrait(
      Dimensions.get("window").height / Dimensions.get("window").width > 1
    );
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button} backgroundColor={backgroundColor}>
        <Text style={addTextButtonStyles}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
