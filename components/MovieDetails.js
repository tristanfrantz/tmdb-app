import React from 'react';
import {
  StyleSheet, TouchableOpacity, ScrollView, View, Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Bubbles } from 'react-native-loader';
import ImdbRating from './ImdbRating';
import YourRating from './YourRating';
import AddWishlistButton from './AddWishlistButton';
import DetailsPanel from './DetailsPanel';
import UsefulImage from './UsefulImage';

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
    fontWeight: '600',
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
      movie: {},
      loading: true,
      error: false,
    };
  }

  async componentDidMount() {
    const { id } = this.props.navigation.state.params;
    const apiKey = '698a64988eda32cea2480262c47df2da';

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits`,
      );
      const json = await response.json();
      this.setState({ movie: json });
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  getMovieGenres = (movie) => {
    const genreString = movie.genres.reduce((acc, genre) => {
      const { name } = genre;
      if (name) {
        acc += `${name}, `;
      }
      return acc;
    }, '');
    if (genreString === '') {
      return 'N/A';
    }
    return genreString.slice(0, genreString.length - 2);
  };

  render() {
    const { movie, loading, error } = this.state;
    const { navigation } = this.props;
    let oldRating = 0;
    if (!this.props.ratedMedia.filter(m => m.key === movie.id)[0]) {
      oldRating = 0;
    } else {
      oldRating = this.props.ratedMedia.filter(m => m.key === movie.id)[0].rating;
    }
    const ratingItem = {
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      yourRating: oldRating,
    };

    const genres = movie.genres ? this.getMovieGenres(movie) : 'N/A';

    if (error) {
      return (
        <View>
          <Text>Movie was not found :(</Text>
        </View>
      );
    }

    if (loading) {
      return (
        <View style={styles.loading}>
          <Bubbles size={15} color="rgba(39, 40, 41, 0.3)" />
        </View>
      );
    }
    let runTime = movie.runtime;
    if (runTime > 60) {
      runTime = `Runtime ${Math.floor(runTime / 60)} h ${runTime % 60}min`;
    } else if (runTime) {
      runTime = `Runtime ${runTime % 60}min`;
    } else {
      runTime = 'N/A';
    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.movieContainer}>
          <UsefulImage passedStyle={styles.poster} imgPath={movie.poster_path} />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              {movie.title}
              <Text style={styles.year}>
                {movie.release_date ? ` (${movie.release_date})` : ''}
              </Text>
            </Text>
            <View style={styles.detailsContainer}>
              <ImdbRating rating={movie.vote_average} votes={movie.vote_count} />
              <YourRating navigation={navigation} ratingItem={ratingItem} />
              <Text style={styles.text}>
                {'Genres: '}
                <Text style={styles.shadowText}>{genres}</Text>
              </Text>
              <Text style={styles.shadowText}>{runTime}</Text>
            </View>
          </View>
        </View>
        <AddWishlistButton
          media={movie}
          extraInfo={{ whatType: 0, style: { backgroundColor: 'gray' } }}
        />
        <TouchableOpacity
          style={styles.plotContainer}
          onPress={() => navigation.push('Plot', movie)}
        >
          <View style={styles.plotTextContainer}>
            <Text numberOfLines={4}>{movie.overview}</Text>
          </View>
          <View style={styles.plotArrow}>
            <Icon size={22} name="angle-right" />
          </View>
        </TouchableOpacity>
        <DetailsPanel navigation={navigation} title="Cast" people={movie.credits.cast} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ ratedMedia: state.ratedMedia });
export default connect(mapStateToProps)(MovieDetails);
