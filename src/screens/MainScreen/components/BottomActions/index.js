import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = {
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  subContainer: {
    flexDirection: "column",
    width: 50,
    height: 60,
    justifyContent: "space-between",
    alignItems: "center"
  },
  actionText: {
    fontSize: 30,
    textAlign: "center"
  }
};
class BottomActions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleMultiplierText = () => {
    const { multiplier } = this.props;
    if (multiplier > 0) {
      return "#9999ff";
    } else if (multiplier === 0) {
      return "gray";
    } else {
      return "red";
    }
  };

  render() {
    const {
      numberOfDice,
      handleIncreaseDice,
      handleDecreaseDice,
      handleIncreaseAdd,
      handleDecreaseAdd,
      multiplier
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <TouchableOpacity onPress={handleIncreaseDice}>
            <Ionicons
              name="md-arrow-dropup"
              size={40}
              color={numberOfDice > 2 ? "gray" : "black"}
            />
          </TouchableOpacity>
          <Text style={styles.actionText}># {numberOfDice}</Text>
          <TouchableOpacity onPress={handleDecreaseDice}>
            <Ionicons
              name="md-arrow-dropdown"
              size={40}
              color={numberOfDice < 2 ? "gray" : "black"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity onPress={handleIncreaseAdd}>
            <Ionicons name="md-arrow-dropup" size={40} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              color: this.handleMultiplierText()
            }}
          >
            {multiplier < 0 ? null : "+"} {multiplier}
          </Text>
          <TouchableOpacity onPress={handleDecreaseAdd}>
            <Ionicons name="md-arrow-dropdown" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default BottomActions;
