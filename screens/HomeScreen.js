import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MediaCarousel from '../components/MediaCarousel';
import CategoryTiles from '../components/CategoryTiles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
        <MediaCarousel navigation={this.props.navigation} data={this.state.results} />
        <CategoryTiles navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}
