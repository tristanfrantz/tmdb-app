import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: Colors.themeLightGrey,
  },
});

class ListItemSeperator extends React.Component {
  render() {
    return <View style={styles.container} />;
  }
}

export default ListItemSeperator;
