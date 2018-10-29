import React from 'react';
import { StyleSheet } from 'react-native';
import MovieSearch from '../components/MovieSearch';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default class SearchScreen extends React.Component {
  render() {
    return <MovieSearch navigation={this.props.navigation} />;
  }
}
