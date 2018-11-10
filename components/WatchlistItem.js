import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import AddWishlistButton from './AddWishlistButton';
import UsefulImage from './UsefulImage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 8,
  },
  mediaContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 16,
  },
  poster: {
    height: 150,
    width: 100,
  },
  details: {
    flex: 1,
    paddingLeft: 18,
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

class WatchlistItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = (media) => {
    if (media.type === 'movie') {
      this.props.navigation.push('Details', media);
    }
    if (media.type === 'tv') {
      this.props.navigation.push('Series', media);
    }
  };

  render() {
    const { media } = this.props;
    const type = media.type === 'movie' ? 'Movie' : 'Series';
    return (
      <TouchableOpacity style={styles.mediaContainer} onPress={() => this.onPress(media)}>
        <UsefulImage passedStyle={styles.poster} imgPath={media.poster} />
        <View style={styles.details}>
          <Text style={styles.title}>{media.title}</Text>
          <Text style={styles.text}>{media.date}</Text>
          <Text style={styles.shadowText}>{type}</Text>
          <View style={styles.watchlistBtn}>
            <AddWishlistButton
              media={media}
              extraInfo={{ whatType: 1, style: { backgroundColor: '#bc142a' } }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default WatchlistItem;
