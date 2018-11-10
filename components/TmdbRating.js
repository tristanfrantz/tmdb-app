import React from 'react';
import {
  StyleSheet, Image, View, Text,
} from 'react-native';

const tmdbLogoPath = require('../assets/images/tmdb-logo.png');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  ratingContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
  },
  tmdbLogo: {
    width: 20,
    height: 23,
  },
  ratingText: {
    fontSize: 16,
  },
  votesText: {
    color: 'grey',
    paddingTop: 2,
    fontSize: 14,
  },
});

class TmdbRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { rating, votes } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.tmdbLogo} source={tmdbLogoPath} />
        <View>
          {rating !== 0 && rating !== 0.0 && rating !== undefined ? (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{rating}</Text>
              <Text style={styles.votesText}>{`/10 | ${votes}`}</Text>
            </View>
          ) : (
            <Text style={[styles.votesText, { paddingLeft: 5 }]}>N/A</Text>
          )}
        </View>
      </View>
    );
  }
}

export default TmdbRating;
