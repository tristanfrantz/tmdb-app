import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import MovieDetails from '../components/MovieDetails';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

class DetailsScreen extends React.Component {
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
        <MovieDetails navigation={this.props.navigation} />
      </View>
    );
  }
}

export default DetailsScreen;
