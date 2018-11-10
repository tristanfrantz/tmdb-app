import React from 'react';
import {
  ScrollView, View, StyleSheet, Dimensions,
} from 'react-native';
import MediaCarousel from '../components/MediaCarousel';
import CategoryTiles from '../components/CategoryTiles';

const { height: viewportHeight } = Dimensions.get('window');
const tilesHeight = viewportHeight * 0.5;
const carouselHeight = viewportHeight * 0.45;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    height: carouselHeight,
    margin: 10,
  },
  tilesContainer: {
    height: tilesHeight,
    margin: 10,
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

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <MediaCarousel navigation={this.props.navigation} data={this.state.results} />
        </View>
        <View style={styles.tilesContainer}>
          <CategoryTiles navigation={this.props.navigation} />
        </View>
      </ScrollView>
    );
  }
}
