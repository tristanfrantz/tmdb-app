import React from 'react';
import { StyleSheet, View } from 'react-native';
import MovieDetails from '../components/MovieDetails';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MovieDetails navigation={this.props.navigation} />
      </View>
    );
  }
}


export default DetailsScreen;
