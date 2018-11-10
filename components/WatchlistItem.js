import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import RemoveWatchlistButton from './RemoveWatchlistButton';
import UsefulImage from './UsefulImage';
import TmdbRating from './TmdbRating';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 8,
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 8,
    flexDirection: 'column',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  poster: {
    height: 150,
    width: 100,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  text: {
    fontSize: 16,
  },
  ratingContainer: {
    paddingTop: 5,
  },
  shadowText: {
    fontSize: 14,
    color: 'grey',
  },
  removeWatchlistButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '90%',
  },
});

class WatchlistItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = (media) => {
    if (media.type === 'movie') {
      this.props.navigation.push('Movie', media);
    }
    if (media.type === 'tv') {
      this.props.navigation.push('Series', media);
    }
  };

  render() {
    const { media } = this.props;
    const type = media.type === 'movie' ? 'Movie' : 'Series';
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.onPress(media)}>
        <UsefulImage passedStyle={styles.poster} imgPath={media.poster} />
        <View style={styles.detailsContainer}>
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{media.title}</Text>
            <Text style={styles.text}>{media.date}</Text>
            <Text style={styles.shadowText}>{type}</Text>
            <View style={styles.ratingContainer}>
              <TmdbRating rating={media.rating} votes={media.votes} />
            </View>
          </View>
          <View style={styles.removeWatchlistButtonContainer}>
            <View style={styles.removeWatchlistButton}>
              <RemoveWatchlistButton media={media} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default WatchlistItem;
