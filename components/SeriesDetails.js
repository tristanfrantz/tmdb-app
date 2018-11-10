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
import SeasonsButton from './SeasonsButton';
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

class SeriesDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: {},
      loading: true,
      error: false,
    };
  }

  async componentDidMount() {
    const { id } = this.props.navigation.state.params;
    const apiKey = '698a64988eda32cea2480262c47df2da';
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits`,
      );
      const json = await response.json();
      this.setState({ series: json });
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  getGenres = (series) => {
    let a;
    const genreString = series.genres.reduce((acc, genre) => {
      const { name } = genre;
      if (name) {
        a = `${acc}${name}, `;
      }
      return a;
    }, '');
    if (genreString === '') {
      return 'N/A';
    }
    return genreString.slice(0, genreString.length - 2);
  };

  render() {
    const { series, loading, error } = this.state;
    const { navigation } = this.props;
    let oldRating = 0;
    if (!this.props.ratedMedia.filter(m => m.key === series.id)[0]) {
      oldRating = 0;
    } else {
      oldRating = this.props.ratedMedia.filter(m => m.key === series.id)[0].rating;
    }
    const ratingItem = {
      id: series.id,
      title: series.name,
      poster: `https://image.tmdb.org/t/p/w500/${series.poster_path}`,
      UserRating: oldRating,
    };

    const genres = series.genres ? this.getGenres(series) : 'N/A';

    if (error) {
      return <Error message="The movie could not be found." />;
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.movieContainer}>
          <UsefulImage passedStyle={styles.poster} imgPath={series.poster_path} />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{series.name}</Text>
            <View style={styles.detailsContainer}>
              <TmdbRating rating={series.vote_average} votes={series.vote_count} />
              <UserRating navigation={navigation} ratingItem={ratingItem} />
              <Text style={styles.text}>
                {'Genres: '}
                <Text style={styles.shadowText}>{genres}</Text>
              </Text>
            </View>
          </View>
        </View>
        <AddWatchlistButton
          media={series}
          extraInfo={{ whatType: 0, style: { backgroundColor: 'gray' } }}
        />
        <SeasonsButton navigation={navigation} seasonsDetails={series} />
        <PlotContainer navigation={navigation} item={series} />
        <CreditsPanel navigation={navigation} title="Cast" people={series.credits.cast} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ ratedMedia: state.ratedMedia });
export default connect(mapStateToProps)(SeriesDetails);
