import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image,
} from 'react-native';
import ImdbRating from './ImdbRating';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 10,
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
    fontWeight: '600',
    fontSize: 18,
  },
  text: {
    fontSize: 16,
  },
  imdbRatingContainer: {
    paddingTop: 5,
  },
  shadowText: {
    fontSize: 14,
    color: 'grey',
  },
});

class CategoryListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = (media) => {
    if (media.title) {
      this.props.navigation.push('Details', media);
    } else {
      this.props.navigation.push('Series', media);
    }
  };

  render() {
    const { media } = this.props;
    const title = media.title ? media.title : media.name;
    const type = media.title ? 'Movie' : 'Series';
    const date = media.title ? media.release_date : media.first_air_date;

    return (
      <TouchableOpacity style={styles.container} onPress={() => this.onPress(media)}>
        <Image
          style={styles.poster}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${media.poster_path}` }}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{date}</Text>
          <Text style={styles.shadowText}>{type}</Text>
          <View style={styles.imdbRatingContainer}>
            <ImdbRating rating={media.vote_average} votes={media.vote_count} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CategoryListItem;
