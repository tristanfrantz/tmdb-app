import React from 'react';
import { Image, View } from 'react-native';

const missingImage = require('../assets/images/missing-image.png');

export default class UsefulImage extends React.Component {
  render() {
    const { style, imgPath } = this.props;

    return (
      <View>
        {imgPath !== null ? (
          <Image style={style} source={{ uri: `https://image.tmdb.org/t/p/w500/${imgPath}` }} />
        ) : (
          <Image style={style} source={missingImage} />
        )}
      </View>
    );
  }
}
