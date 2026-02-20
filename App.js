import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [display, setDisplay] = useState("");
  const [sound, setSound] = useState(null);

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, []);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    );
    setSound(sound);
  };

  const playClick = async () => {
    if (sound) await sound.replayAsync();
  };

  const press = (val) => {
    playClick();
    setDisplay(display + val);
  };

  const clearAll = () => {
    playClick();
    setDisplay("");
  };

  const calculate = () => {
    playClick();
    try {
      const result = eval(display);
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display || "0"}</Text>

      <View style={styles.row}>
        <Button title="C" onPress={clearAll} />
        <Button title="÷" onPress={() => press("/")} orange />
      </View>

      <View style={styles.row}>
        <Button title="7" onPress={() => press("7")} />
        <Button title="8" onPress={() => press("8")} />
        <Button title="9" onPress={() => press("9")} />
        <Button title="×" onPress={() => press("*")} orange />
      </View>

      <View style={styles.row}>
        <Button title="4" onPress={() => press("4")} />
        <Button title="5" onPress={() => press("5")} />
        <Button title="6" onPress={() => press("6")} />
        <Button title="-" onPress={() => press("-")} orange />
      </View>

      <View style={styles.row}>
        <Button title="1" onPress={() => press("1")} />
        <Button title="2" onPress={() => press("2")} />
        <Button title="3" onPress={() => press("3")} />
        <Button title="+" onPress={() => press("+")} orange />
      </View>

      <View style={styles.row}>
        <Button title="0" onPress={() => press("0")} style={{ flex: 2 }} />
        <Button title="=" onPress={calculate} orange />
      </View>
    </View>
  );
}

const Button = ({ title, onPress, orange, style }) => (
  <TouchableOpacity
    style={[styles.button, orange && styles.orange, style]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  display: {
    fontSize: 48,
    textAlign: "right",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#ddd",
    padding: 20,
    margin: 5,
    alignItems: "center",
    borderRadius: 10,
  },
  orange: {
    backgroundColor: "#ff9500",
  },
  buttonText: {
    fontSize: 24,
  },
});
