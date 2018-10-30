import {
  StyleSheet, TouchableOpacity, Text, Platform,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  button: {
    height: 40,
    padding: 10,
    backgroundColor: '#0081e6',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  addIcon: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

class AddWishlistButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity style={styles.button}>
        <Icon name="plus" style={styles.addIcon}>
          <Text style={styles.text}> Add to Watchlist</Text>
        </Icon>
      </TouchableOpacity>
    );
  }
}

export default AddWishlistButton;
