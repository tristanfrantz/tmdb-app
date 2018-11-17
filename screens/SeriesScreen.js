import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import SeriesDetails from '../components/details/series/SeriesDetails';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class SeriesScreen extends React.Component {
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
    return (
      <View style={styles.container}>
        <SeriesDetails navigation={this.props.navigation} />
      </View>
    );
  }
}

export default SeriesScreen;
