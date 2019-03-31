import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Menu, { MenuItem } from "react-native-material-menu";
import { themes } from "../../styles";
import AchievementContainer from "./components/AchievementContainer";

const { height, width } = Dimensions.get("window");
const styles = theme => ({
  container: {
    height,
    width,
    backgroundColor: themes[theme].primary,
    padding: 50
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleText: {
    color: themes[theme].mainText,
    fontSize: 32
  },
  divider: {
    backgroundColor: themes[theme].mainText,
    height: 2,
    width: "25%"
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    justifyContent: "space-between"
  },
  dividerText: {
    color: themes[theme].mainText,
    fontWeight: "bold",
    fontSize: 18
  },
  clearText: {
    color: themes[theme].clearText,
    alignSelf: "flex-end",
    marginTop: 10,
    fontSize: 24
  },
  historyText: {
    fontSize: 16,
    color: themes[theme].mainText,
    marginTop: 10
  },
  scrollView: {
    maxHeight: "70%"
  },
  goBackButton: {
    height: 50,
    width: 120,
    borderRadius: 25,
    backgroundColor: themes[theme].accent,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40
  },
  listItem: {
    fontSize: 26,
    color: themes[theme].mainText
  },
  buttonText: {
    color: themes[theme].mainText
  }
});
class AchievementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setMenuRef = ref => {
    this.menu = ref;
  };

  hideMenu = () => {
    this.menu.hide();
  };

  showMenu = () => {
    this.menu.show();
  };

  render() {
    const {
      history,
      handleGoBack,
      achievements,
      theme,
      handleToggleDrawer
    } = this.props;
    return (
      <View style={styles(theme).container}>
        <View style={styles(theme).header}>
          <Text style={styles(theme).titleText}>Dice Roller</Text>
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={handleToggleDrawer}
          >
            <Ionicons name="md-menu" size={30} color={themes[theme].mainText} />
          </TouchableOpacity>
        </View>
        <View style={styles(theme).dividerContainer}>
          <View style={styles(theme).divider} />
          <Text style={styles(theme).dividerText}>Achievements</Text>
          <View style={styles(theme).divider} />
        </View>
        <ScrollView style={{ height: "50%" }}>
          {Object.values(JSON.parse(achievements)).map(item => {
            console.log("item: ", item);
            return (
              <AchievementContainer
                theme={theme}
                key={item}
                achievementName={item}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default AchievementScreen;
