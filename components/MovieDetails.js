import React from 'react';
import {
  StyleSheet, TouchableOpacity, ScrollView, View, Text, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Bubbles } from 'react-native-loader';
import ImdbRating from './ImdbRating';
import YourRating from './YourRating';
import AddWishlistButton from './AddWishlistButton';
import DetailsPanel from './DetailsPanel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 5,
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      loading: false,
    };
  }

  async componentDidMount() {
    const { imdbID } = this.props.navigation.state.params;
    const movie = this.props.movies.filter(m => m.key === imdbID)[0];
    if (movie) {
      this.setState({ item: movie.details });
    } else {
      this.setState({ loading: true });
      const apiKey = '14cfd31';
      await fetch(`http://omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
        .then(res => res.json())
        .then(res => this.setState({ item: res }))
        .catch(err => console.log(err));
      this.setState({ loading: false });
    }
  }

  render() {
    const movie = this.state.item;
    const { loading } = this.state;
    const { navigation } = this.props;
    let oldRating = 0;
    if (!this.props.ratedMovies.filter(m => m.key === movie.imdbID)[0]) {
      oldRating = 0;
    } else {
      oldRating = this.props.ratedMovies.filter(m => m.key === movie.imdbID)[0].rating;
    }
    const ratingItem = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Poster: movie.Poster,
      YourRating: oldRating,
    };

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {loading ? (
          <View style={styles.loading}>
            <Bubbles size={15} color="rgba(39, 40, 41, 0.3)" />
          </View>
        ) : (
          <View>
            <View style={styles.movieContainer}>
              <Image style={styles.poster} source={{ uri: movie.Poster }} />
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                  {movie.Title}
                  <Text style={styles.year}>{` (${movie.Year})`}</Text>
                </Text>
                <View style={styles.detailsContainer}>
                  <ImdbRating rating={movie.imdbRating} votes={movie.imdbVotes} />
                  <YourRating navigation={navigation} ratingItem={ratingItem} />
                  <Text style={styles.text}>
                    {'Genre: '}
                    <Text style={styles.shadowText}>{movie.Genre}</Text>
                  </Text>
                  <Text style={styles.shadowText}>{`Rated ${movie.Rated} | ${movie.Runtime}`}</Text>
                </View>
              </View>
            </View>
            <AddWishlistButton movie={movie} />

            <TouchableOpacity
              style={styles.plotContainer}
              onPress={() => navigation.navigate('Plot', movie)}
            >
              <View style={styles.plotTextContainer}>
                <Text>{movie.Plot}</Text>
              </View>
              <View style={styles.plotArrow}>
                <Icon size={22} name="angle-right" />
              </View>
            </TouchableOpacity>

            <DetailsPanel title="Actors" content={movie.Actors} />
            <DetailsPanel title="Directors" content={movie.Director} />
            <DetailsPanel title="Writers" content={movie.Writer} />
            <DetailsPanel title="Awards" content={movie.Awards} />
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ movies: state.watchlist, ratedMovies: state.ratedMovies });
export default connect(mapStateToProps)(MovieDetails);
