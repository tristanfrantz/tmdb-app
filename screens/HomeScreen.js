import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import MediaCarousel from '../components/carousel/MediaCarousel';
import CategoryTiles from '../components/categories/CategoryTiles';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeDarkGrey,
  },
  carouselContainer: {
    height: 290,
  },
  tilesContainer: {
    height: 300,
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

    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(res => this.setState({
        results: res.results.map((c, i) => ({ ...c, key: `${i}` })),
      }))
      .catch(() => {
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
