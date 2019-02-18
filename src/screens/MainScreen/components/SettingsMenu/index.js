import React, { Component } from "react";
import { View, Text } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";

class SettingsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pageX, pageY, showMenu } = this.props;
    return (
      <React.Fragment>
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>Show menu</Text>}
        >
          <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
          <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
          <MenuItem onPress={this.hideMenu} disabled>
            Menu item 3
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

export default SettingsMenu;
