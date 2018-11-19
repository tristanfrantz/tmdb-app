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
  tmdbLogoSmall: {
    width: 16,
    height: 18,
  },
  ratingText: {
    fontSize: 16,
    color: '#fff',
  },
  votesText: {
    color: 'grey',
    paddingTop: 2,
    fontSize: 14,
  },
  ratingTextSmall: {
    fontSize: 14,
    color: '#fff',
  },
  votesTextSmall: {
    color: 'grey',
    paddingTop: 2,
    fontSize: 12,
  },
});

class TmdbRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { rating, votes, small } = this.props;
    return (
      <View style={styles.container}>
        <Image style={small ? styles.tmdbLogoSmall : styles.tmdbLogo} source={tmdbLogoPath} />
        <View>
          {rating !== 0 && rating !== 0.0 && votes !== 0 && rating !== undefined ? (
            <View style={styles.ratingContainer}>
              <Text style={small ? styles.ratingTextSmall : styles.ratingText}>{rating}</Text>
              <Text style={small ? styles.votesTextSmall : styles.votesText}>
                {`/10 | ${votes}`}
              </Text>
            </View>
          ) : (
            <Text style={[small ? styles.votesTextSmall : styles.votesText, { paddingLeft: 5 }]}>
              N/A
            </Text>
          )}
        </View>
      </View>
    );
  }
}

export default TmdbRating;
