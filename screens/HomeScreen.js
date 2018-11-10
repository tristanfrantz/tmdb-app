import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import MediaCarousel from '../components/MediaCarousel';

const { height: viewportHeight } = Dimensions.get('window');

const hp = (percentage) => {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
};
const carouselHeight = viewportHeight * 0.45;
const boxesHeight = viewportHeight * 0.5;

const CATEGORY_TYPES = {
  POPULAR_MOVIES: 'Popular Movies',
  POPULAR_SERIES: 'Popular Series',
  TOP_MOVIES: 'Top Rated Movies',
  TOP_SERIES: 'Top Rated Series',
  UPCOMING_MOVIES: 'Upcoming Movies',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {},
  carouselContainer: {
    height: carouselHeight,
  },
  boxesContainer: {
    height: boxesHeight,
    margin: 10,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  colContainer: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#323232', // ff9682
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    fontSize: 21,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    const apiKey = '698a64988eda32cea2480262c47df2da';

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(res => this.setState({
        results: res.results.map((c, i) => ({ ...c, key: `${i}` })),
      }))
      .catch((err) => {
        console.error(err);
        this.setState({ results: [] });
      });
  }

  onPress = (category) => {
    this.props.navigation.navigate('Category', category);
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.carouselContainer}>
          <MediaCarousel navigation={this.props.navigation} data={this.state.results} />
        </View>
        <View style={styles.boxesContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.colContainer}
              onPress={() => this.onPress(CATEGORY_TYPES.UPCOMING_MOVIES)}
            >
              <Text style={styles.tileText}>{CATEGORY_TYPES.UPCOMING_MOVIES}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.colContainer}
              onPress={() => this.onPress(CATEGORY_TYPES.POPULAR_MOVIES)}
            >
              <Text style={styles.tileText}>{CATEGORY_TYPES.POPULAR_MOVIES}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.colContainer}
              onPress={() => this.onPress(CATEGORY_TYPES.POPULAR_SERIES)}
            >
              <Text style={styles.tileText}>{CATEGORY_TYPES.POPULAR_SERIES}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.colContainer}
              onPress={() => this.onPress(CATEGORY_TYPES.TOP_MOVIES)}
            >
              <Text style={styles.tileText}>{CATEGORY_TYPES.TOP_MOVIES}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.colContainer}
              onPress={() => this.onPress(CATEGORY_TYPES.TOP_SERIES)}
            >
              <Text style={styles.tileText}>{CATEGORY_TYPES.TOP_SERIES}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
