import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};

const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const itemHorizontalMargin = wp(0.5);

const styles = StyleSheet.create({
  slideInnerContainer: {
    flex: 1,
    paddingHorizontal: itemHorizontalMargin,
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: '#1a1917',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainerEven: {
    backgroundColor: '#1a1917',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },

  textContainer: {
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  textContainerEven: {
    backgroundColor: '#1a1917',
  },
  title: {
    color: '#1a1917',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  titleEven: {
    color: 'white',
  },
  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: 'italic',
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default class SliderEntry extends React.Component {
  render() {
    const {
      data: { title, backdrop_path },
    } = this.props;

    const uppercaseTitle = title ? (
      <Text style={[styles.title, styles.titleEven]} numberOfLines={2}>
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.slideInnerContainer}
        onPress={() => {
          this.props.navigation.push('Movie', this.props.data);
        }}
      >
        <View style={styles.shadow} />
        <View style={[styles.imageContainer, styles.imageContainerEven]}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500/${backdrop_path}` }}
            style={styles.image}
          />
        </View>
        <View style={[styles.textContainer, styles.textContainerEven]}>{uppercaseTitle}</View>
      </TouchableOpacity>
    );
  }
}
