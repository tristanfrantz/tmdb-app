import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Bubbles } from 'react-native-loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Bubbles size={15} color="rgba(39, 40, 41, 0.3)" />
      </View>
    );
  }
}

export default Loading;
