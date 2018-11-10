import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};
const itemHorizontalMargin = wp(0.5);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 75,
  },
  slideInnerContainer: {
    flex: 1,
    paddingHorizontal: itemHorizontalMargin,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#323232',
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
    backgroundColor: '#1a1917',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: 'white',
  },
  subtitle: {
    marginTop: 6,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default class SliderEntry extends React.Component {
  onPress = (media) => {
    this.props.navigation.push('Movie', media);
  };

  render() {
    const { title, backdrop_path } = this.props.data;

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
        onPress={() => this.onPress(this.props.data)}
      >
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
