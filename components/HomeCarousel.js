import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Bubbles } from 'react-native-loader';
import SliderEntry from './SliderEntry';

const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(86);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 5,
    paddingTop: 10,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'lightgrey',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class HomeCarousel extends Component {
  renderItem({ item }) {
    return <SliderEntry navigation={this.props.navigation} data={item} />;
  }

  render() {
    const { data } = this.props;
    if (!Array.isArray(data) || !data.length) {
      return (
        <View style={styles.loading}>
          <Bubbles size={15} color="rgba(39, 40, 41, 0.3)" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
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
      </View>
    );
  }
}
