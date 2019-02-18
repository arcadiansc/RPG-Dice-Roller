import React from "react";
import {
  View,
  Text,
  Dimensions,
  Button,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Menu, { MenuItem } from "react-native-material-menu";
import Entries from "./components/Entries";
import HistoryScreen from "../HistoryScreen";
import BottomActions from "./components/BottomActions";
import {
  randomDiceRoll,
  coinFlip,
  percentRoll
} from "../../services/diceRolling";
import SettingsMenu from "./components/SettingsMenu";

const diceFour = require("../../assets/dice_4.png");
const diceSix = require("../../assets/dice_6.png");
const diceEight = require("../../assets/dice_8.png");
const diceTen = require("../../assets/dice_10.png");
const diceTwelve = require("../../assets/dice_12.png");
const diceTwenty = require("../../assets/dice_20.png");
const dicePercent = require("../../assets/dice_percent.png");
const coin = require("../../assets/dice_coin.png");
const { height, width } = Dimensions.get("window");

const styles = {
  container: {
    height,
    width,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  topContainer: {
    backgroundColor: "#343437",
    height: height / 1.2,
    width: "100%",
    padding: 50
  },
  titleText: {
    color: "white",
    fontSize: 32
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lastRollText: {
    color: "white",
    fontSize: 10
  },
  diceResultContainer: {
    height: "50%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  resultText: {
    color: "white",
    fontSize: 64,
    marginTop: 20
  },
  divider: {
    backgroundColor: "white",
    height: 2,
    width: "40%"
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between"
  },
  dividerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  button: {
    marginTop: 40,
    height: 50,
    width: 100,
    backgroundColor: "#9999ff",
    justifyContent: "center",
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "center"
  },
  image: {
    height: 100,
    width: 100
  }
};
class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDice: 6,
      result: 0,
      lastRoll: "1 D4 : 2 + 0",
      numberOfDice: 1,
      multiplier: 0,
      settingsMenuX: 0,
      settingsMenuY: 0,
      showMenu: false,
      history: [],
      showHistory: false
    };
    this.menu = false;
  }

  componentDidMount() {
    this.handleGetAllRolls();
  }

  handleItemPress = item => {
    this.setState({
      currentDice: item
    });
  };

  handleRoll = () => {
    const { currentDice, numberOfDice, multiplier } = this.state;
    if (currentDice === "C") {
      const flip = coinFlip(numberOfDice);
      const joined = flip.join();
      this.handleStoreRoll(joined);
      this.setState({
        result: joined,
        lastRoll: joined
      });
    } else if (currentDice === "%") {
      const roll = percentRoll(numberOfDice);
      const addedTogether = roll.reduce((accum, val) => accum + val);
      const lastRoll = `${numberOfDice} D ${currentDice} : ${roll} + ${multiplier} `;
      this.handleStoreRoll(lastRoll);
      this;
      this.setState({
        result: this.handleMultiplier(addedTogether),
        lastRoll
      });
    } else {
      const roll = randomDiceRoll(numberOfDice, currentDice);
      const addedTogether = roll.reduce((accum, val) => accum + val);
      const lastRoll = `${numberOfDice} D ${currentDice} : ${roll} + ${multiplier} `;
      this.handleStoreRoll(lastRoll);
      this.setState({
        result: this.handleMultiplier(addedTogether),
        lastRoll
      });
    }
  };

  handleClearStorage = () => {
    AsyncStorage.clear();
    this.handleGetAllRolls();
  };

  handleSettingsClick = e => {
    const { pageX, pageY } = e.nativeEvent;
    this.setState({
      settingsMenuX: pageX,
      settingsMenuY: pageY
    });
  };

  handleMultiplier = roll => {
    const { multiplier } = this.state;
    if (multiplier > 0) {
      const val = roll + multiplier;
      return val;
    }
    const val = roll - multiplier;
    return val;
  };

  handleDiceIcon = () => {
    const { currentDice } = this.state;
    switch (currentDice) {
      case 4:
        return <Image source={diceFour} style={styles.image} />;
      case 6:
        return <Image source={diceSix} style={styles.image} />;
      case 8:
        return <Image source={diceEight} style={styles.image} />;
      case 10:
        return <Image source={diceTen} style={styles.image} />;
      case 12:
        return <Image source={diceTwelve} style={styles.image} />;
      case 20:
        return <Image source={diceTwenty} style={styles.image} />;
      case "%":
        return <Image source={dicePercent} style={styles.image} />;
      case "C":
        return <Image source={coin} style={styles.image} />;
      default:
        return null;
    }
  };

  handleStoreRoll = async roll => {
    const { history } = this.state;
    try {
      await AsyncStorage.setItem(`${history.length}`, roll);
      this.handleGetAllRolls();
    } catch (e) {
      console.log("error: ", e);
    }
  };

  handleGetAllRolls = () => {
    let values = [];
    AsyncStorage.getAllKeys((_, keys) => {
      console.log("keys: ", keys);
      AsyncStorage.multiGet(keys, (_, values) => {
        console.log("values: ", values);
        this.setState({
          history: values
        });
      });
    });
  };

  handleIncreaseDice = () => {
    if (this.state.numberOfDice > 2) {
      return;
    }
    this.setState(state => ({
      numberOfDice: state.numberOfDice + 1
    }));
  };
  handleDecreaseDice = () => {
    if (this.state.numberOfDice < 2) {
      return;
    }
    this.setState(state => ({
      numberOfDice: state.numberOfDice - 1
    }));
  };

  setMenuRef = ref => {
    this.menu = ref;
  };

  hideMenu = () => {
    this.menu.hide();
  };

  showMenu = () => {
    this.menu.show();
  };

  handleIncreaseAdd = () => {
    this.setState(state => ({
      multiplier: state.multiplier + 1
    }));
  };
  handleDecreaseAdd = () => {
    this.setState(state => ({
      multiplier: state.multiplier - 1
    }));
  };

  handleShowHistoryScreen = () => {
    this.hideMenu();
    this.setState({
      showHistory: true
    });
  };

  handleShowMainScreen = () => {
    this.setState({
      showHistory: false
    });
  };

  render() {
    const {
      lastRoll,
      result,
      currentDice,
      numberOfDice,
      multiplier,
      settingsMenuX,
      settingsMenuY,
      showMenu,
      showHistory,
      history
    } = this.state;
    return (
      <React.Fragment>
        {showHistory ? (
          <HistoryScreen
            handleGoBack={this.handleShowMainScreen}
            history={history}
            handleClearStorage={this.handleClearStorage}
          />
        ) : (
          <View style={styles.container}>
            <View onP style={styles.topContainer}>
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
                  <MenuItem
                    textStyle={{ color: "white" }}
                    onPress={this.handleShowHistoryScreen}
                  >
                    History
                  </MenuItem>
                  <MenuItem textStyle={{ color: "white" }}>About</MenuItem>
                  <MenuItem
                    textStyle={{ color: "white" }}
                    onPress={this.hideMenu}
                  >
                    Remove Ads
                  </MenuItem>
                </Menu>
              </View>
              <Text style={styles.lastRollText}>{lastRoll}</Text>
              <View style={styles.diceResultContainer}>
                {this.handleDiceIcon()}
                <Text style={styles.resultText}>{result}</Text>
              </View>
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>D</Text>
                <View style={styles.divider} />
              </View>
              <Entries
                currentDice={currentDice}
                handleItemPress={this.handleItemPress}
              />
              <TouchableOpacity onPress={this.handleRoll} style={styles.button}>
                <Text style={{ color: "white" }}>
                  {currentDice === "C" ? "Flip" : "Roll"}
                </Text>
              </TouchableOpacity>
            </View>
            <BottomActions
              handleIncreaseDice={this.handleIncreaseDice}
              handleDecreaseDice={this.handleDecreaseDice}
              numberOfDice={numberOfDice}
              multiplier={multiplier}
              handleIncreaseAdd={this.handleIncreaseAdd}
              handleDecreaseAdd={this.handleDecreaseAdd}
            />
          </View>
        )}
      </React.Fragment>
    );
  }
}

export default MainScreen;
