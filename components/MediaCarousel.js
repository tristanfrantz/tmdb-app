import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';
import Loading from './Loading';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const carouselHeight = viewportHeight * 0.45;

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(86);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth;

const styles = StyleSheet.create({
  container: {
    height: carouselHeight,
    margin: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class MediaCarousel extends Component {
  renderItem({ item }) {
    return <SliderEntry navigation={this.props.navigation} data={item} />;
  }

  render() {
    const { data } = this.props;
    if (!Array.isArray(data) || !data.length) {
      return <Loading />;
    }
    return (
      <View style={styles.container}>
        <Carousel
          ref={c => (this.ref = c)}
          data={data}
          renderItem={this.renderItem.bind(this)}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          loop
          loopClonesPerSide={2}
        />
      </View>
    );
  }
}
