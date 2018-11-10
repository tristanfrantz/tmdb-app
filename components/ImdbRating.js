import React from 'react';
import {
  StyleSheet, Image, View, Text,
} from 'react-native';

const imdbLogoPath = require('../assets/images/imdb-logo.png');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  ratingContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
  },
  imdbLogo: {
    width: 40,
    height: 20,
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

class ImdbRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { rating, votes } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.imdbLogo} source={imdbLogoPath} />
        <View>
          {rating !== 0 ? (
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

export default ImdbRating;
