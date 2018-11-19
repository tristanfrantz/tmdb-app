import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import TmdbRating from '../TmdbRating';
import UsefulImage from '../UsefulImage';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 8,
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
    color: Colors.textColor,
  },
  date: {
    fontSize: 16,
    color: '#ccc',
  },
  ratingContainer: {
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
      this.props.navigation.navigate({
        key: `movie${media.id}`,
        routeName: 'Movie',
        params: media,
      });
    } else {
      this.props.navigation.navigate({ key: `tv${media.id}`, routeName: 'Series', params: media });
    }
  };

  render() {
    const { media } = this.props;
    const title = media.title ? media.title : media.name;
    const type = media.title ? 'Movie' : 'Series';
    const date = media.title ? media.release_date : media.first_air_date;

    return (
      <TouchableOpacity style={styles.container} onPress={() => this.onPress(media)}>
        <UsefulImage style={styles.poster} imgPath={media.poster_path} />
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.shadowText}>{type}</Text>
          <View style={styles.ratingContainer}>
            <TmdbRating rating={media.vote_average} votes={media.vote_count} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CategoryListItem;
