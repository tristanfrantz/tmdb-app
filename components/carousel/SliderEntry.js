import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import UsefulImage from '../UsefulImage';
import TmdbRating from '../TmdbRating';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideInnerContainer: {
    flex: 1,
  },
  backdropContainer: {
    flex: 4,
    backgroundColor: '#081c24',
    resizeMode: 'stretch',
  },
  panelContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#081c24',
  },
  infoContainer: {
    marginLeft: 135,
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: 'white',
  },
  poster: {
    flex: 2,
    height: 180,
    width: 120,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});

export default class SliderEntry extends React.Component {
  onPress = (media) => {
    this.props.navigation.navigate({ key: `movie${media.id}`, routeName: 'Movie', params: media });
  };

  render() {
    const { data } = this.props;

    return (
      <TouchableOpacity activeOpacity={1} onPress={() => this.onPress(data)} style={{ flex: 1 }}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500/${data.backdrop_path}` }}
          style={styles.backdropContainer}
        />
        <View style={styles.panelContainer}>
          <View style={styles.infoContainer}>
            <View style={{ paddingBottom: 3 }}>
              <TmdbRating small rating={data.vote_average} votes={data.vote_count} />
            </View>
            <Text numberOfLines={1} style={styles.title}>
              {data.title}
            </Text>
          </View>
        </View>
        <UsefulImage style={styles.poster} imgPath={data.poster_path} />
      </TouchableOpacity>
    );
  }
}
