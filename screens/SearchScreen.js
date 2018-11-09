import React from 'react';
import { StyleSheet, View } from 'react-native';
import MovieSearch from '../components/MovieSearch';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class SearchScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MovieSearch navigation={this.props.navigation} />
      </View>
    );
  }
}

export default SearchScreen;
