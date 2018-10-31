import {
  StyleSheet, TouchableOpacity, Text, View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../actions/movies';

const styles = StyleSheet.create({
  button: {
    height: 40,
    padding: 10,
    borderRadius: 10,
  },
  addToWatchlistBtn: {
    backgroundColor: '#0081e6',
  },
  removeFromWatchlistBtn: {
    backgroundColor: 'gray',
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
    const movie = this.props.movies.filter(m => m.key === this.props.imdbId)[0];

    return (
      <View>
        {!movie ? (
          <TouchableOpacity
            style={[styles.button, styles.addToWatchlistBtn]}
            onPress={() => this.props.dispatch(addToWatchlist(this.props.imdbId))}
          >
            <Icon name="plus" style={styles.addIcon}>
              <Text style={styles.text}> ADD TO WATCHLIST</Text>
            </Icon>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.removeFromWatchlistBtn]}
            onPress={() => this.props.dispatch(removeFromWatchlist(this.props.imdbId))}
          >
            <Icon name="check" style={styles.addIcon}>
              <Text style={styles.text}> ADDED TO WATCHLIST</Text>
            </Icon>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({ movies: state.watchlist });
export default connect(mapStateToProps)(AddWishlistButton);
