import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image,
} from 'react-native';
import AddWishlistButton from './AddWishlistButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 8,
  },
  movieContainer: {
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
});

class MovieListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = (item) => {
    this.props.navigation.navigate('Details', item);
  };

  render() {
    const { movie } = this.props;
    return (
      <TouchableOpacity style={styles.movieContainer} onPress={() => this.onPress(movie)}>
        <Image style={styles.poster} source={{ uri: movie.Poster }} />
        <View style={styles.details}>
          <Text style={styles.title}>{movie.Title}</Text>
          <Text style={styles.text}>{movie.Year}</Text>
          <View style={styles.watchlistBtn}>
            <AddWishlistButton movie={movie} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default MovieListItem;
