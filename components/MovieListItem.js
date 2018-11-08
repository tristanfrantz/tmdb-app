import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { addRecentSearch } from '../store/actions/media';
import UsefulImage from './UsefulImage';

const MEDIA_TYPES = {
  MOVIE: 'movie',
  SERIES: 'tv',
  PERSON: 'person',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 8,
  },
  movieContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  poster: {
    height: 100,
    width: 65,
  },
  details: {
    flex: 1,
    paddingLeft: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    fontSize: 16,
  },
  watchlistBtn: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
  },
  shadowText: {
    fontSize: 14,
    color: 'grey',
  },
});

class MovieListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSeriesPress = (item) => {
    this.props.navigation.push('Series', item);
    this.props.dispatch(addRecentSearch(item.name));
  };

  onPersonPress = (item) => {
    this.props.navigation.push('Profile', item);
    this.props.dispatch(addRecentSearch(item.name));
  };

  onMoviePress = (item) => {
    this.props.navigation.push('Details', item);
    this.props.dispatch(addRecentSearch(item.title));
  };

  renderRandomImage = () => <Image style={styles.poster} source={{ uri: '../../bragi' }} />;

  renderItem = ({ item }) => <MovieListItem item={item} navigation={this.props.navigation} />;

  render() {
    const { item } = this.props;
    if (item.media_type === MEDIA_TYPES.MOVIE) {
      return (
        <TouchableOpacity style={styles.movieContainer} onPress={() => this.onMoviePress(item)}>
          <UsefulImage passedStyle={styles.poster} imgPath={item.poster_path} />
          <View style={styles.details}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.release_date}</Text>
            <Text style={styles.shadowText}>Movie</Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (item.media_type === MEDIA_TYPES.SERIES) {
      return (
        <TouchableOpacity style={styles.movieContainer} onPress={() => this.onSeriesPress(item)}>
          <UsefulImage passedStyle={styles.poster} imgPath={item.poster_path} />
          <View style={styles.details}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.text}>{item.first_air_date}</Text>
            <Text style={styles.shadowText}>Series</Text>
          </View>
        </TouchableOpacity>
      );
    }
    // else (item.media_type === MEDIA_TYPES.PERSON) {
    return (
      <TouchableOpacity style={styles.movieContainer} onPress={() => this.onPersonPress(item)}>
        <UsefulImage passedStyle={styles.poster} imgPath={item.profile_path} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.text}>{item.first_air_date}</Text>
          <Text style={styles.shadowText}>Actor</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect()(MovieListItem);
