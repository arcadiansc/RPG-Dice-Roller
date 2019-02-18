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

const { height, width } = Dimensions.get("window");
const styles = {
  container: {
    height,
    width,
    backgroundColor: "#343437",
    padding: 50
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleText: {
    color: "white",
    fontSize: 32
  },
  divider: {
    backgroundColor: "white",
    height: 2,
    width: "35%"
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    justifyContent: "space-between"
  },
  dividerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  clearText: {
    color: "red",
    alignSelf: "flex-end",
    marginTop: 10,
    fontSize: 24
  },
  historyText: {
    fontSize: 16,
    color: "white",
    marginTop: 10
  },
  scrollView: {
    maxHeight: "70%"
  },
  goBackButton: {
    height: 50,
    width: 120,
    backgroundColor: "#9999ff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40
  }
};
class HistoryScreen extends Component {
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
    const { history, handleGoBack, handleClearStorage } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Dice Roller</Text>
          <Menu
            ref={this.setMenuRef}
            style={{ backgroundColor: "gray" }}
            button={
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={this.showMenu}
              >
                <Ionicons name="md-more" size={30} color="white" />
              </TouchableOpacity>
            }
          >
            <MenuItem textStyle={{ color: "white" }} onPress={this.hideMenu}>
              History
            </MenuItem>
            <MenuItem textStyle={{ color: "white" }}>About</MenuItem>
            <MenuItem textStyle={{ color: "white" }} onPress={this.hideMenu}>
              Remove Ads
            </MenuItem>
          </Menu>
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>History</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity onPress={handleClearStorage}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
        <ScrollView style={styles.scrollView}>
          {history
            .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
            .reverse()
            .map((item, idx) => (
              <Text style={styles.historyText} key={idx}>
                {item[1]}
              </Text>
            ))}
        </ScrollView>
        <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HistoryScreen;
