import React from 'react';
import {
  StyleSheet, TouchableOpacity, ScrollView, View, Text, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImdbRating from './ImdbRating';
import AddWishlistButton from './AddWishlistButton';
import DetailsPanel from './DetailsPanel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 8,
  },
  movieContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  plotContainer: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  plotTextContainer: {
    flex: 8,
  },
  plotArrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    height: 240,
    width: 160,
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  year: {
    fontWeight: 'normal',
    color: 'grey',
    fontSize: 18,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 16,
  },
  shadowText: {
    fontSize: 14,
    color: 'grey',
  },
});

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
    };
  }

  componentDidMount() {
    const apiKey = '14cfd31';
    const { imdbID } = this.props.navigation.state.params;

    fetch(`http://omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
      .then(res => res.json())
      .then(res => this.setState({ item: res }))
      .catch(err => console.log(err));
  }

  render() {
    const { item } = this.state;
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.movieContainer}>
          <Image style={styles.poster} source={{ uri: item.Poster }} />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              {item.Title}
              <Text style={styles.year}>{` (${item.Year})`}</Text>
            </Text>
            <View style={styles.detailsContainer}>
              <ImdbRating rating={item.imdbRating} votes={item.imdbVotes} />
              <Text style={styles.text}>
                {'Genre: '}
                <Text style={styles.shadowText}>{item.Genre}</Text>
              </Text>
              <Text style={styles.shadowText}>{`Rated ${item.Rated} | ${item.Runtime}`}</Text>
            </View>
          </View>
        </View>
        <AddWishlistButton imdbId={item.imdbID} />

        <TouchableOpacity
          style={styles.plotContainer}
          onPress={() => this.props.navigation.navigate('Plot', item)}
        >
          <View style={styles.plotTextContainer}>
            <Text>{item.Plot}</Text>
          </View>
          <View style={styles.plotArrow}>
            <Icon size={22} name="angle-right" />
          </View>
        </TouchableOpacity>

        <DetailsPanel title="Actors" content={item.Actors} />
        <DetailsPanel title="Directors" content={item.Directors} />
        <DetailsPanel title="Writers" content={item.Writers} />
        <DetailsPanel title="Awards" content={item.Awards} />
      </ScrollView>
    );
  }
}

export default MovieDetails;
