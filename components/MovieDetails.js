import React from 'react';
import {
  StyleSheet, ScrollView, View, Text,
} from 'react-native';
import { connect } from 'react-redux';
import Loading from './Loading';
import Error from './Error';
import TmdbRating from './TmdbRating';
import UserRating from './UserRating';
import AddWatchlistButton from './AddWatchlistButton';
import CreditsPanel from './CreditsPanel';
import UsefulImage from './UsefulImage';
import PlotContainer from './PlotContainer';

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
      this.setState({ movie: json, loading: false });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  // componentDidMount() {
  //   this.setState({ loading: false });
  // }

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
    if (!this.props.ratedMedia.filter(m => m.key === `movie${movie.id}`)[0]) {
      oldRating = 0;
    } else {
      oldRating = this.props.ratedMedia.filter(m => m.key === `movie${movie.id}`)[0].rating;
    }
    const ratingItem = {
      id: `movie${movie.id}`,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      UserRating: oldRating,
    };

    const genres = movie.genres ? this.getMovieGenres(movie) : 'N/A';

    if (error) {
      return <Error message="The movie could not be found." />;
    }

    if (loading) {
      return <Loading />;
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
              <TmdbRating rating={movie.vote_average} votes={movie.vote_count} />
              <UserRating navigation={navigation} ratingItem={ratingItem} />
              <Text style={styles.text}>
                {'Genres: '}
                <Text style={styles.shadowText}>{genres}</Text>
              </Text>
              <Text style={styles.shadowText}>{runTime}</Text>
            </View>
          </View>
        </View>
        <AddWatchlistButton
          media={movie}
          extraInfo={{ whatType: 0, style: { backgroundColor: 'gray' } }}
        />
        <PlotContainer navigation={navigation} item={movie} />
        {movie.credits
          && movie.credits.cast && (
            <CreditsPanel navigation={navigation} title="Cast" people={movie.credits.cast} />
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ ratedMedia: state.ratedMedia });
export default connect(mapStateToProps)(MovieDetails);
