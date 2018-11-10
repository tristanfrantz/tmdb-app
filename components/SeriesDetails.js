import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Bubbles } from 'react-native-loader';
import ImdbRating from './ImdbRating';
import YourRating from './YourRating';
import AddWishlistButton from './AddWishlistButton';
import DetailsPanel from './DetailsPanel';
import SeasonsButton from './SeasonsButton';
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
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits`
      );
      const json = await response.json();
      this.setState({ series: json });
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  getGenres = series => {
    const genreString = series.genres.reduce((acc, genre) => {
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
    const { series, loading, error } = this.state;
    const { navigation } = this.props;
    let oldRating = 0;
    if (!this.props.ratedMedia.filter(m => m.key === series.id)[0]) {
      oldRating = 0;
    } else {
      oldRating = this.props.ratedMedia.filter(m => m.key === series.id)[0]
        .rating;
    }
    const ratingItem = {
      id: series.id,
      title: series.name,
      poster: `https://image.tmdb.org/t/p/w500/${series.poster_path}`,
      yourRating: oldRating,
    };

    const genres = series.genres ? this.getGenres(series) : 'N/A';

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

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.movieContainer}>
          <UsefulImage
            passedStyle={styles.poster}
            imgPath={series.poster_path}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{series.name}</Text>
            <View style={styles.detailsContainer}>
              <ImdbRating
                rating={series.vote_average}
                votes={series.vote_count}
              />
              <YourRating navigation={navigation} ratingItem={ratingItem} />
              <Text style={styles.text}>
                {'Genres: '}
                <Text style={styles.shadowText}>{genres}</Text>
              </Text>
            </View>
          </View>
        </View>
        <AddWishlistButton
          media={series}
          extraInfo={{ whatType: 0, style: { backgroundColor: 'gray' } }}
        />
        <TouchableOpacity
          style={styles.plotContainer}
          onPress={() => navigation.push('Plot', series)}
        >
          <View style={styles.plotTextContainer}>
            <Text numberOfLines={4}>{series.overview}</Text>
          </View>
          <View style={styles.plotArrow}>
            <Icon size={22} name="angle-right" />
          </View>
        </TouchableOpacity>
        <SeasonsButton navigation={navigation} seasons={series.seasons} />
        <DetailsPanel
          navigation={navigation}
          title="Cast"
          people={series.credits.cast}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ ratedMedia: state.ratedMedia });
export default connect(mapStateToProps)(SeriesDetails);
