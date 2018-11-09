import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet, Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const styles = StyleSheet.create({
  slide: {
    backgroundColor: 'grey',
  },
});

class HomeCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      input: '',
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

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <Carousel
        ref={(c) => {
          this.carousel = c;
        }}
        data={this.state.results}
        renderItem={this.renderItem}
        sliderWidth={sliderWidth}
        slideHeight={slideHeight}
        itemWidth={itemWidth}
      />
    );
  }
}

export default HomeCarousel;
