import React from 'react';
import { Image, View } from 'react-native';

const defualtIMG = require('../assets/images/robot-dev.png');

export default class UsefulImage extends React.Component {
  render() {
    const { passedStyle, imgPath } = this.props;

    return (
      <View>
        {imgPath !== null ? (
          <Image
            style={passedStyle}
            source={{ uri: `https://image.tmdb.org/t/p/w500/${imgPath}` }}
          />
        ) : (
          <Image style={passedStyle} source={defualtIMG} />
        )}
      </View>
    );
  }
}
