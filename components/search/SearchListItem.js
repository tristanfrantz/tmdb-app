import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { addRecentSearch } from '../../store/actions/recentSearch';
import UsefulImage from '../UsefulImage';

const MEDIA_TYPES = {
  MOVIE: 'movie',
  SERIES: 'tv',
  PERSON: 'person',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
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
    fontWeight: '600',
    fontSize: 20,
    color: 'lightgray',
  },
  text: {
    fontSize: 16,
    color: 'lightgray',
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

class SearchListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSeriesPress = (item) => {
    this.props.navigation.navigate({ key: `tv${item.id}`, routeName: 'Series', params: item });
    this.props.dispatch(addRecentSearch(item.name));
  };

  onPersonPress = (item) => {
    this.props.navigation.navigate({
      key: `profile${item.id}${item.credit_id}`,
      routeName: 'Profile',
      params: item,
    });
    this.props.dispatch(addRecentSearch(item.name));
  };

  onMoviePress = (item) => {
    this.props.navigation.navigate({ key: `movie${item.id}`, routeName: 'Movie', params: item });
    this.props.dispatch(addRecentSearch(item.title));
  };

  render() {
    const { item } = this.props;
    if (item.media_type === MEDIA_TYPES.MOVIE) {
      return (
        <TouchableOpacity style={styles.container} onPress={() => this.onMoviePress(item)}>
          <UsefulImage style={styles.poster} imgPath={item.poster_path} />
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
        <TouchableOpacity style={styles.container} onPress={() => this.onSeriesPress(item)}>
          <UsefulImage style={styles.poster} imgPath={item.poster_path} />
          <View style={styles.details}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.text}>{item.first_air_date}</Text>
            <Text style={styles.shadowText}>Series</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.onPersonPress(item)}>
        <UsefulImage style={styles.poster} imgPath={item.profile_path} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.text}>{item.first_air_date}</Text>
          <Text style={styles.shadowText}>Person</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect()(SearchListItem);
