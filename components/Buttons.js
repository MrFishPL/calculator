import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Item from "./Item";
import { useState } from "react";

import { scaledSize } from '../scaledSize';
const REM = scaledSize(10);

const Buttons = ({ equalFunction, delFunction, addNumberFunction, addDotFunction, clearCalcusFunction, addSymbolFunction, addFuncFunction, addBracketsFunction }) => {
  const [isPortrait, setIsPortrait] = useState(
    Dimensions.get("window").height / Dimensions.get("window").width > 1
  );

  Dimensions.addEventListener("change", () => {
    setIsPortrait(
      Dimensions.get("window").height / Dimensions.get("window").width > 1
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
      <Item onPress={clearCalcusFunction} text="C" color="#cc4234" />
      <Item onPress={() => addNumberFunction(7)} text="7" color="#efbb81" />
      <Item onPress={() => addNumberFunction(4)} text="4" color="#efbb81" />
      <Item onPress={() => addNumberFunction(1)} text="1" color="#efbb81" />
      <Item onPress={delFunction} text="DEL" color="#cc4234" />
      </View>

      <View style={styles.row}>
      <Item onPress={addBracketsFunction} text="( )" color="#94b760" />
      <Item onPress={() => addNumberFunction(8)} text="8" color="#efbb81" />
      <Item onPress={() => addNumberFunction(5)} text="5" color="#efbb81" />
      <Item onPress={() => addNumberFunction(2)} text="2" color="#efbb81" />
      <Item onPress={() => addNumberFunction(0)} text="0" color="#efbb81" />
      </View>

      <View style={styles.row}>
      <Item onPress={() => addSymbolFunction("%")} text="%" color="#94b760" />
      <Item onPress={() => addNumberFunction(9)} text="9" color="#efbb81" />
      <Item onPress={() => addNumberFunction(6)} text="6" color="#efbb81" />
      <Item onPress={() => addNumberFunction(3)} text="3" color="#efbb81" />
      <Item onPress={addDotFunction} text="." color="#efbb81" />
      </View>

      {(!isPortrait && <>
      <View style={styles.row}>
      <Item onPress={() => addFuncFunction("pow")} text="x²" color="#94b760" />
      <Item onPress={() => addFuncFunction("√")} text="√" color="#94b760" />
      <Item onPress={() => addFuncFunction("sin")} text="sin" color="#94b760" />
      <Item onPress={() => addFuncFunction("cos")} text="cos" color="#94b760" />
      <Item onPress={() => addFuncFunction("ln")} text="ln" color="#94b760" />
      </View>
      </>)}

      <View style={styles.row}>
      <Item onPress={() => addSymbolFunction("/")} text="/" color="#94b760" />
      <Item onPress={() => addSymbolFunction("×")} text="×" color="#94b760" />
      <Item onPress={() => addSymbolFunction("-")}  text="-" color="#94b760" />
      <Item onPress={() => addSymbolFunction("+")}  text="+" color="#94b760" />
      <Item onPress={equalFunction} text="=" color="#fff" backgroundColor="#506532" />
      </View>    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: REM,
    padding: REM,
  },

  row: {
    flex: 1,
    gap: REM,
  }
});

export default Buttons;
