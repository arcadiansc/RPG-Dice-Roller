import React from "react";
import {
  View,
  Text,
  Dimensions,
  Button,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
  PixelRatio
} from "react-native";
import { Audio } from "expo";
import * as Animatable from "react-native-animatable";
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
import { themes } from "../../styles";
import SettingsMenu from "./components/SettingsMenu";
import ThemeScreen from "../ThemeScreen";
import AchievementBar from "../../components/AchievementBar";
import { validator } from "../../achievements";
import AchievementScreen from "../AchivementScreen";

const diceFour = require("../../assets/dice_4.png");
const diceSix = require("../../assets/dice_6.png");
const diceEight = require("../../assets/dice_8.png");
const diceTen = require("../../assets/dice_10.png");
const diceTwelve = require("../../assets/dice_12.png");
const diceTwenty = require("../../assets/dice_20.png");
const dicePercent = require("../../assets/dice_percent.png");
const coin = require("../../assets/dice_coin.png");
const rollIcon = require("../../assets/roll.png");
const { height, width } = Dimensions.get("window");

const styles = theme => ({
  container: {
    height,
    width,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  topContainer: {
    backgroundColor: themes[theme].primary,
    height: height / 1.2,
    width: "100%",
    padding: 50,
    justifyContent: "space-between"
  },
  titleText: {
    color: themes[theme].mainText,
    fontSize: 32
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lastRollText: {
    color: themes[theme].mainText,
    fontSize: 16
  },
  diceResultContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  resultText: {
    color: themes[theme].mainText,
    fontSize: 64,
    marginTop: 20
  },
  divider: {
    backgroundColor: themes[theme].mainText,
    height: 1,
    width: "40%"
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
  button: {
    height: height * 0.1,
    width: width * 0.2,
    position: "absolute",
    top: height / 1.25,
    // backgroundColor: themes[theme].accent,
    justifyContent: "center",
    // borderRadius: 20,
    alignItems: "center",
    alignSelf: "center"
  },
  image: {
    height: height * 0.1,
    width: width * 0.2
  }
});
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
      showHistory: false,
      hasMultiplier: false,
      theme: "Default",
      showMain: true,
      showThemeScreen: false,
      achievementName: "Set your first theme!",
      showAchievement: false,
      stats: {},
      achievements: []
    };
    this.menu = false;
  }

  componentDidMount() {
    // AsyncStorage.clear();
    this.handleGetAllRolls();
  }

  handleItemPress = item => {
    this.setState({
      currentDice: item
    });
  };

  handleRoll = () => {
    const {
      currentDice,
      numberOfDice,
      multiplier,
      stats,
      achievements,
      achievementName,
      showAchievement
    } = this.state;
    console.log("achievements: ", achievements);
    const achievObj = Object.keys(achievements).length
      ? JSON.parse(achievements)
      : {};
    const statsObj = Object.keys(stats).length ? JSON.parse(stats) : {};
    if (currentDice === 2) {
      const flip = coinFlip(numberOfDice);
      const joined = flip.join();
      statsObj.flips = statsObj.flips ? statsObj.flips + 1 : 1;
      const checkAchiv = validator(statsObj, "flip");
      let newAchiev = achievObj;
      if (checkAchiv) {
        newAchiev = Object.assign(achievObj, {
          [checkAchiv.id]: checkAchiv.text
        });
        this.setState({
          showAchievement: true,
          achievementName: checkAchiv.text
        });
      }
      this.imageRef.rubberBand(800);
      this.handlePlayAudio(true);
      this.handleStoreRoll(joined, statsObj, newAchiev);
      this.setState({
        result: joined,
        lastRoll: joined,
        hasMultiplier: 0
      });
    } else if (currentDice === "%") {
      const roll = percentRoll(numberOfDice);
      const addedTogether = roll.reduce((accum, val) => accum + val);
      const lastRoll = `${numberOfDice} D ${currentDice} : ${roll} + ${multiplier} `;
      statsObj.rolls = statsObj.rolls ? statsObj.rolls + 1 : 1;
      const checkAchiv = validator(statsObj, "roll");
      let newAchiev = achievObj;
      if (checkAchiv) {
        newAchiev = Object.assign(achievObj, {
          [checkAchiv.id]: checkAchiv.text
        });
        this.setState({
          showAchievement: true,
          achievementName: checkAchiv.text
        });
      }
      this.handleStoreRoll(lastRoll, statsObj, newAchiev);
      this.imageRef.swing(800);
      this.handlePlayAudio();
      this.setState({
        result: this.handleMultiplier(addedTogether),
        lastRoll,
        hasMultiplier: multiplier
      });
    } else {
      const roll = randomDiceRoll(numberOfDice, currentDice);
      const addedTogether = roll.reduce((accum, val) => accum + val);
      const lastRoll = `${numberOfDice} D ${currentDice} : ${roll} + ${multiplier} `;
      statsObj.rolls = statsObj.rolls ? statsObj.rolls + 1 : 1;
      const checkAchiv = validator(statsObj, "roll");
      let newAchiev = achievObj;
      if (checkAchiv) {
        newAchiev = Object.assign(achievObj, {
          [checkAchiv.id]: checkAchiv.text
        });
        this.setState({
          showAchievement: true,
          achievementName: checkAchiv.text
        });
      }
      this.handleStoreRoll(lastRoll, statsObj, newAchiev);
      this.imageRef.swing(800);
      this.handlePlayAudio();
      this.setState({
        result: this.handleMultiplier(addedTogether),
        lastRoll,
        hasMultiplier: multiplier
      });
    }
  };

  handlePlayAudio = async flip => {
    const soundObject = new Audio.Sound();
    try {
      if (flip) {
        await soundObject.loadAsync(require("../../assets/coinflip.wav"));
      } else {
        await soundObject.loadAsync(require("../../assets/dice_sound.wav"));
      }
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      alert("error: ", error);
    }
  };

  handleClearStorage = () => {
    AsyncStorage.removeItem("History");
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
    const { currentDice, theme } = this.state;
    switch (currentDice) {
      case 4:
        return (
          <Image
            resizeMode="stretch"
            source={diceFour}
            style={styles(theme).image}
          />
        );
      case 6:
        return (
          <Image
            resizeMode="stretch"
            source={diceSix}
            style={styles(theme).image}
          />
        );
      case 8:
        return (
          <Image
            resizeMode="stretch"
            source={diceEight}
            style={styles(theme).image}
          />
        );
      case 10:
        return (
          <Image
            resizeMode="stretch"
            source={diceTen}
            style={styles(theme).image}
          />
        );
      case 12:
        return (
          <Image
            resizeMode="stretch"
            source={diceTwelve}
            style={styles(theme).image}
          />
        );
      case 20:
        return (
          <Image
            resizeMode="stretch"
            source={diceTwenty}
            style={styles(theme).image}
          />
        );
      case "%":
        return (
          <Image
            resizeMode="stretch"
            source={dicePercent}
            style={styles(theme).image}
          />
        );
      case 2:
        return (
          <Image
            resizeMode="stretch"
            source={coin}
            style={styles(theme).image}
          />
        );
      default:
        return null;
    }
  };

  handleStoreRoll = async (roll, stats, achivements) => {
    const { history } = this.state;
    const time = new Date().getTime();
    const newHistory = Object.assign(history, { [time]: roll });
    try {
      await AsyncStorage.multiSet([
        ["History", JSON.stringify(newHistory)],
        ["Stats", JSON.stringify(stats)],
        ["Achievements", JSON.stringify(achivements)]
      ]);
      this.handleGetAllRolls();
    } catch (e) {
      console.log("error: ", e);
    }
  };

  handleGetAllRolls = async () => {
    const stats = await AsyncStorage.getItem("Stats");
    const theme = await AsyncStorage.getItem("Theme");
    const achievements = await AsyncStorage.getItem("Achievements");
    const history = await AsyncStorage.getItem("History");
    this.setState({
      stats: stats ? stats : {},
      theme: theme ? theme : "Default",
      achievements: achievements ? achievements : {},
      history: history ? JSON.parse(history) : {}
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
      showHistory: true,
      showMain: false,
      showThemeScreen: false,
      showAchievementScreen: false
    });
  };

  handleShowMainScreen = () => {
    this.setState({
      showHistory: false,
      showMain: true,
      showThemeScreen: false
    });
    this.setState({
      showHistory: false,
      showMain: true,
      showThemeScreen: false,
      showAchievementScreen: false
    });
  };

  handleShowThemeScreen = () => {
    this.setState({
      showHistory: false,
      showMain: false,
      showThemeScreen: true,
      showAchievementScreen: false
    });
  };

  handleShowAchievementScreen = () => {
    this.setState({
      showHistory: false,
      showMain: false,
      showThemeScreen: false,
      showAchievementScreen: true
    });
  };

  handleThemePress = async theme => {
    try {
      await AsyncStorage.setItem("Theme", theme);
    } catch (e) {
      console.log("e: ", e);
    }
    this.setState({
      theme
    });
  };

  handleDismiss = () => {
    this.setState({
      showAchievement: false
    });
  };

  handleTextColor = () => {
    const { hasMultiplier, theme } = this.state;
    if (hasMultiplier > 0) {
      return themes[theme].accent;
    } else if (hasMultiplier < 0) {
      return "red";
    }
    return themes[theme].mainText;
  };

  render() {
    const {
      lastRoll,
      result,
      currentDice,
      numberOfDice,
      multiplier,
      showHistory,
      history,
      hasMultiplier,
      theme,
      showMain,
      showThemeScreen,
      achievementName,
      showAchievement,
      showAchievementScreen,
      achievements
    } = this.state;
    const { handleToggleDrawer, currentScreen } = this.props;
    if (currentScreen === "history") {
      return (
        <React.Fragment>
          {showAchievement && <AchievementBar theme={theme} />}
          <HistoryScreen
            handleGoBack={this.handleShowMainScreen}
            history={history}
            theme={theme}
            handleToggleDrawer={handleToggleDrawer}
            handleClearStorage={this.handleClearStorage}
          />
        </React.Fragment>
      );
    } else if (currentScreen === "main") {
      return (
        <View style={styles(theme).container}>
          {showAchievement && (
            <AchievementBar
              handleDismiss={this.handleDismiss}
              theme={theme}
              achievementName={achievementName}
            />
          )}
          <View style={styles(theme).topContainer}>
            <View>
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
                  <Ionicons
                    name="md-menu"
                    size={30}
                    color={themes[theme].mainText}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles(theme).lastRollText}>{lastRoll}</Text>
            </View>
            <View style={styles(theme).diceResultContainer}>
              <Animatable.View ref={ref => (this.imageRef = ref)}>
                {this.handleDiceIcon()}
              </Animatable.View>
              <Text
                style={{
                  color: this.handleTextColor(),
                  fontSize: 40,
                  marginTop: 20
                }}
              >
                {result}
              </Text>
            </View>
            <View>
              <View style={styles(theme).dividerContainer}>
                <View style={styles(theme).divider} />
                <Text style={styles(theme).dividerText}>D</Text>
                <View style={styles(theme).divider} />
              </View>
              <Entries
                theme={theme}
                currentDice={currentDice}
                handleItemPress={this.handleItemPress}
              />
            </View>
            <TouchableOpacity
              onPress={this.handleRoll}
              style={styles(theme).button}
            >
              <ImageBackground
                style={{
                  height: height * 0.1,
                  width: width * 0.2,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                resizeMode="stretch"
                source={rollIcon}
              >
                <Text
                  style={{ color: "white", fontSize: 26, fontWeight: "bold" }}
                >
                  {currentDice === 2 ? "Flip" : "Roll"}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <BottomActions
            handleIncreaseDice={this.handleIncreaseDice}
            handleDecreaseDice={this.handleDecreaseDice}
            numberOfDice={numberOfDice}
            multiplier={multiplier}
            theme={theme}
            handleIncreaseAdd={this.handleIncreaseAdd}
            handleDecreaseAdd={this.handleDecreaseAdd}
          />
        </View>
      );
    } else if (currentScreen === "themes") {
      return (
        <ThemeScreen
          handleThemePress={this.handleThemePress}
          handleGoBack={this.handleShowMainScreen}
          theme={theme}
          handleToggleDrawer={handleToggleDrawer}
        />
      );
    } else if (currentScreen === "trophies") {
      return (
        <AchievementScreen
          handleGoBack={this.handleShowMainScreen}
          theme={theme}
          achievements={achievements}
          handleToggleDrawer={handleToggleDrawer}
        />
      );
    }
  }
}

export default MainScreen;
