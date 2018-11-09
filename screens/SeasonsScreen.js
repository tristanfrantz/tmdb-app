import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Seasons from '../components/Seasons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class SeasonsScreen extends React.Component {
  static navigationOptions = {
    ...Platform.select({
      android: {
        headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
          alignSelf: 'center',
        },
        headerRight: <View />,
      },
    }),
  };

  render() {
    const { navigation, seasons } = this.props;
    return (
      <View style={styles.container}>
        <Seasons navigation={navigation} seasons={seasons} />
      </View>
    );
  }
}

export default SeasonsScreen;
