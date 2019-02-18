import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const topRow = ["C", 4, 6, 8];
const bottomRow = [10, 12, 20, "%"];
const styles = {
  entry: {
    fontSize: 24,
    color: "white"
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40
  }
};
const Entries = ({ handleItemPress, currentDice }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {topRow.map((item, idx) => (
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: currentDice === item ? 2 : null,
              borderColor: "white",
              borderRadius: 25
            }}
            onPress={() => handleItemPress(item)}
            key={idx}
          >
            <Text style={styles.entry}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {bottomRow.map((item, idx) => (
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: currentDice === item ? 2 : null,
              borderColor: "white",
              borderRadius: 25
            }}
            onPress={() => handleItemPress(item)}
            key={idx}
          >
            <Text style={styles.entry}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Entries;
