import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { themes } from "../../../../styles";

const height = Dimensions.get("window").height;

const styles = theme => ({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  subContainer: {
    flexDirection: "column",
    width: 100,
    height: 40,
    justifyContent: "space-between",
    alignItems: "center"
  },
  actionText: {
    fontSize: 30,
    textAlign: "center"
  }
});
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
      multiplier,
      theme
    } = this.props;
    return (
      <View style={styles(theme).container}>
        <View style={styles(theme).subContainer}>
          <TouchableOpacity onPress={handleIncreaseDice}>
            <Ionicons
              name="md-arrow-dropup"
              size={40}
              color={numberOfDice > 2 ? "gray" : "black"}
            />
          </TouchableOpacity>
          <Text style={styles(theme).actionText}># {numberOfDice}</Text>
          <TouchableOpacity onPress={handleDecreaseDice}>
            <Ionicons
              name="md-arrow-dropdown"
              size={40}
              color={numberOfDice < 2 ? "gray" : "black"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles(theme).subContainer}>
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
