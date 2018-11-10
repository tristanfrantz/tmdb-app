import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
    color: 'grey',
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
