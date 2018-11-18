import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        size={this.props.focused ? this.props.size + 2 : this.props.size}
        style={{ marginBottom: -2 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        name={this.props.name}
      />
    );
  }
}
