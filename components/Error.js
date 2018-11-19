import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: Colors.themeDarkGrey,
  },
  text: {
    textAlign: 'center',
    color: 'lightgray',
    fontSize: 18,
  },
});

class Error extends React.Component {
  render() {
    const { message } = this.props;
    const defaultMessage = 'An error has occured.';
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{message || defaultMessage}</Text>
      </View>
    );
  }
}

export default Error;
