import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import MainScreen from "./src/screens/MainScreen";

const { height, width } = Dimensions.get("window");

const styles = {
  drawer: {
    backgroundColor: "#000000",
    opacity: 0.82,
    height,
    width: "55%",
    position: "absolute",
    zIndex: 999,
    alignSelf: "flex-end",
    padding: 40,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  icon: {
    color: "gray",
    alignSelf: "flex-end"
  },
  titles: {
    color: "white",
    fontSize: 28,
    marginTop: 20,
    fontWeight: "bold"
  },
  titleContainer: {
    height: "30%",
    flexDirection: "column",
    justifyContent: "space-between"
  }
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: "main",
      showDrawer: false
    };
  }

  handleHistoryClick = () => {
    this.setState({
      currentScreen: "history",
      showDrawer: false
    });
  };

  handleThemesClick = () => {
    this.setState({
      currentScreen: "themes",
      showDrawer: false
    });
  };

  handleTrophiesClick = () => {
    this.setState({
      currentScreen: "trophies",
      showDrawer: false
    });
  };

  handleToggleDrawer = () => {
    const { showDrawer } = this.state;
    this.setState({
      showDrawer: !showDrawer
    });
  };

  handleHomeClick = () => {
    this.setState({
      currentScreen: "main",
      showDrawer: false
    });
  };
  render() {
    const { currentScreen, showDrawer } = this.state;
    return (
      <React.Fragment>
        <MainScreen
          currentScreen={currentScreen}
          handleToggleDrawer={this.handleToggleDrawer}
        />
        {showDrawer && (
          <Animatable.View
            animation="slideInRight"
            duration={200}
            style={styles.drawer}
          >
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={this.handleToggleDrawer}
            >
              <Ionicons
                style={styles.icon}
                name="md-close"
                color="gray"
                size={40}
              />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={this.handleHomeClick}>
                <Text style={styles.titles}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleHistoryClick}>
                <Text style={styles.titles}>History</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleThemesClick}>
                <Text style={styles.titles}>Themes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleTrophiesClick}>
                <Text style={styles.titles}>Trophies</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        )}
      </React.Fragment>
    );
  }
}
