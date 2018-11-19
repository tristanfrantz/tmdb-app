import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';
import Loading from '../Loading';

const { width: viewportWidth } = Dimensions.get('window');

const sliderWidth = viewportWidth;
const itemWidth = viewportWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
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
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          loop
          loopClonesPerSide={2}
        />
      </View>
    );
  }
}
