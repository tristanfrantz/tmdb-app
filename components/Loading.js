import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Bubbles } from 'react-native-loader';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.themeDarkGrey,
  },
});

class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Bubbles size={15} color="#ccc" />
      </View>
    );
  }
}

export default Loading;
