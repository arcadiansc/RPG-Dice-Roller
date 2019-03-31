import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { themes } from "../../../../styles";

const topRow = [2, 4, 6, 8];
const bottomRow = [10, 12, 20, "%"];
const styles = theme => ({
  entry: {
    fontSize: 24,
    color: themes[theme].mainText
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
});
const Entries = ({ handleItemPress, currentDice, theme }) => {
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).row}>
        {topRow.map((item, idx) => (
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: currentDice === item ? 2 : null,
              backgroundColor:
                currentDice === item ? "rgba(216,216,216, 0.2)" : null,
              borderColor: themes[theme].entryBorder,
              borderRadius: 25
            }}
            onPress={() => handleItemPress(item)}
            key={idx}
          >
            <Text style={styles(theme).entry}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles(theme).row}>
        {bottomRow.map((item, idx) => (
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: currentDice === item ? 2 : null,
              backgroundColor:
                currentDice === item ? "rgba(216,216,216, 0.2)" : null,
              borderColor: themes[theme].entryBorder,
              borderRadius: 25
            }}
            onPress={() => handleItemPress(item)}
            key={idx}
          >
            <Text style={styles(theme).entry}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Entries;
