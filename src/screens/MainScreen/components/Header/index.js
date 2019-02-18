import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons';

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  titleText: {
    color: 'white',
    fontSize: 32
  }
}
const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Dice Roller
      </Text>
    </View>
  )
}

export default Header;

