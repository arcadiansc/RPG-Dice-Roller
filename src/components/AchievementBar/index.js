import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { themes } from "../../styles";

const styles = theme => ({
  container: {
    width: "90%",
    alignSelf: "center",
    height: 70,
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: themes[theme].accent,
    position: "absolute",
    top: 50,
    zIndex: 1000,
    borderRadius: 20
  },
  text: {
    fontSize: 18,
    color: themes[theme].mainText
  },
  dismissText: {
    fontSize: 18,
    fontWeight: "bold",
    color: themes[theme].darkaccent
  }
});
class AchievementBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { theme, achievementName, handleDismiss } = this.props;
    return (
      <Animatable.View
        animation="bounceInDown"
        delay={0}
        style={styles(theme).container}
      >
        <Ionicons name="md-happy" size={30} color={themes[theme].mainText} />
        <Text style={styles(theme).text}>{achievementName}</Text>
        <TouchableOpacity onPress={handleDismiss}>
          <Text style={styles(theme).dismissText}>Dismiss</Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

export default AchievementBar;
