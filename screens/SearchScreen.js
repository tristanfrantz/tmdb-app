import React from 'react';
import { StyleSheet } from 'react-native';
import MovieSearch from '../components/MovieSearch';

export default class SearchScreen extends React.Component {
  render() {
    return <MovieSearch navigation={this.props.navigation} />;
  }
}
