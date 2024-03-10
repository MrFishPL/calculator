import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import Buttons from './components/Buttons';
import Top from './components/Top';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

import { scaledSize } from './scaledSize';
const REM = scaledSize(10);

export default function App() {
  const [height, setHeight] = useState(Dimensions.get("window").height);
  const [width, setWidth] = useState(Dimensions.get("window").width - 40);
  const [calcus, setCalcus] = useState("0");
  const [lastChar, setLastChar] = useState("0");
  const [isNotOpened, setIsNotOpened] = useState(true);
  const [newNumberCreated, setNewNumberCreated] = useState(true);
  const [result, setResult] = useState("");
  

  const addNumber = (n) => {
    if (calcus == "0") setCalcus(String(n));
    else if ([".", "(", "+", "-", "×", "/", "%"].includes(lastChar) || !isNaN(Number(lastChar))) setCalcus(calcus + String(n));
    else if (lastChar == ")") setCalcus(calcus + "×" + String(n));
    else {
      Alert.alert("Nieprawidłowy wybór");
      return;
    }

    setLastChar(String(n));
  };

  const equal = () => {
    const r = calculate();
    if (isNaN(Number(r))) {
      Alert.alert(r);
      return;
    }

    setCalcus(r);
  };

  const calculate = () => {
    try {
      const c = calcus.replaceAll("×", "*").replaceAll("√", "Math.sqrt");

      let x = eval("const pow = (n) => Math.pow(n, 2);const sin = Math.sin;const cos = Math.cos;const ln = Math.log;"+c);
      x = Math.round(x * 1000000)/1000000;

      if (isNaN(x) || x == Infinity) return "Nieistniejące działanie";
      if (Math.abs(x) > 999999999999999) return "Zbyt duży wynik";
      if (Math.abs(x) < 0.000001 && x != 0) return "Zbyt mały wynik";
      return String(x);
    }

    catch (e) {
      return "Błędne działanie";
    }
  };

  const del = () => {
    if (calcus.length == 1) {
      setCalcus("0");
      setLastChar("0");
      return;
    }

    if (!isNaN(Number(lastChar)) || ["+", "-", "×", "/", "%", ")"].includes(lastChar)) {
      if (lastChar == ")") setIsNotOpened(false);
      setLastChar(calcus[calcus.length - 2]);
      setCalcus(calcus.slice(0, -1));
      return;
    }

    if (lastChar == "(") {
      let c = calcus.slice(0, -1);
      if (c.length >= 1 && ["×", "+", "-", "/", "("].includes(c[c.length - 1])) {
        setLastChar(c[c.length - 1]);
        setCalcus(c);
        return;
      }

      c = c.split(/(?=[×+\-\/(])|(?<=[×+\-\/(])/).slice(0, -1).join("");

      if (c.length == 0) c = "0";

      setLastChar(c[c.length - 1]);
      setCalcus(c);
      return;
    }

    if (lastChar == ".") {
      setLastChar(calcus[calcus.length - 2]);
      setCalcus(calcus.slice(0, -1));
      setNewNumberCreated(true);
      return;
    }
  }

  const clearCalcus = () => {
    setCalcus("0");
    setLastChar("0");
    setIsNotOpened(true);
    setNewNumberCreated(true);
  };

  const addSymbol = (symbol) => {
    if (!isNaN(Number(lastChar)) || lastChar == ")" || (lastChar == "(" && symbol == "-")) {
      setCalcus(calcus + symbol);
    }
    
    else {
      Alert.alert("Nieprawidłowy wybór");
      return;
    }

    setNewNumberCreated(true);
    setLastChar(symbol);
  };

  const addDot = () => {
    if (!isNaN(Number(lastChar)) && newNumberCreated) setCalcus(calcus + ".");
    else {
      Alert.alert("Nieprawidłowy wybór");
      return;
    }

    setNewNumberCreated(false);
    setLastChar(".");
  }

  const addFunc = (func) => {
    if (calcus == "0") setCalcus(func + "(")
    else if (!isNaN(Number(lastChar)) || lastChar == ")") setCalcus(calcus + "×" + func + "(");
    else if (["(", "+", "-", "×", "/", "%"].includes(lastChar)) setCalcus(calcus + func + "(");
    else {
      Alert.alert("Nieprawidłowy wybór");
      return;
    }

    setNewNumberCreated(true);
    setLastChar("(");
    setIsNotOpened(false);
  };

  const addBrackets = () => {
    if (lastChar == "0") {
      setCalcus("(");
      setLastChar("(");
      setIsNotOpened(false);
      return;
    }

    if ((lastChar == ")" || !isNaN(Number(lastChar))) && isNotOpened) {
      setCalcus(calcus + "×(");
      setLastChar("(");
      setIsNotOpened(false);
      setNewNumberCreated(true);
      return;
    }

    if (lastChar == ")" || !isNaN(Number(lastChar))) {
      setCalcus(calcus + ")");
      setLastChar(")");
      setNewNumberCreated(true);
      return;
    }

    if (lastChar == ".") {
      Alert.alert("Nieprawidłowy wybór");
      return;
    }

    setNewNumberCreated(true);
    setCalcus(calcus + "(");
    setLastChar("(");
    setIsNotOpened(false);
  };

  useEffect(() => {
    if (calcus.split("(").length == calcus.split(")").length) {
      setIsNotOpened(true);
    }

    const sp = calcus.split(".");
    if (sp.length >= 2 && !isNaN(Number(sp[sp.length - 1])) && !isNaN(Number(sp[sp.length - 2]))) setNewNumberCreated(false);

    const r = calculate();
    if (isNaN(Number(r)) || !isNaN(Number(calcus))) {
      setResult("");
      return;
    }

    setResult(r);
  }, [calcus]);

  Dimensions.addEventListener("change", ({ screen: { height, width } }) => {
    setHeight(height);
    setWidth(width - 40);
  });

  return (
    
    <View style={styles.parent}>
      <SafeAreaView style={styles.container}>
      <Top calcus={calcus} res={result} />
      <View style={styles.hr} />
      <Buttons equalFunction={equal} delFunction={del} addDotFunction={addDot} addBracketsFunction={addBrackets} addFuncFunction={addFunc} addSymbolFunction={addSymbol} addNumberFunction={addNumber} clearCalcusFunction={clearCalcus} />
    
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: REM,
    flex: 1,
    alignItems: "stretch"
  },

  parent: {
    flex: 1,
    backgroundColor: "#000",
  },

  hr: {
    height: 2,
    marginLeft: REM,
    marginRight: REM,
    marginBottom: REM,
    marginTop: 0.5 * REM,
    backgroundColor: "#2a2a2a",
  }
});
