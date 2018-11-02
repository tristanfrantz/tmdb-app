import React from 'react';
import {
  StyleSheet, TouchableOpacity, View, Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
  },
  votesText: {
    color: 'grey',
    paddingTop: 2,
    fontSize: 14,
  },
});

class YourRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { ratingItem } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Rating', { ratingItem })}>
          {ratingItem.YourRating !== 0 ? (
            <View style={styles.ratingContainer}>
              <Icon name="ios-star" size={23} color="#3d5f99" />
              <Text style={styles.ratingText}>
                {' '}
                {ratingItem.YourRating}
              </Text>
              <Text style={styles.votesText}>/10</Text>
            </View>
          ) : (
            <View style={styles.ratingContainer}>
              <Icon name="ios-star-outline" size={25} color="#6f7277" />
              <Text style={{ fontSize: 14, textAlignVertical: 'center' }}> RATE THIS</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default YourRating;
