import {
  StyleSheet, TouchableOpacity, Text, View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../../store/actions/watchlist';

const styles = StyleSheet.create({
  button: {
    height: 40,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addToWatchlistBtn: {
    backgroundColor: '#0081e6',
  },
  removeFromWatchlistBtn: {
    backgroundColor: 'gray',
  },
  addIcon: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

class AddWatchlistButton extends React.Component {
  render() {
    const media = this.props.medias.filter(m => m.key === this.props.media.id)[0];

    return (
      <View>
        {!media ? (
          <TouchableOpacity
            style={[styles.button, styles.addToWatchlistBtn]}
            onPress={() => this.props.dispatch(addToWatchlist(this.props.media))}
          >
            <Icon name="plus" style={styles.addIcon}>
              <Text style={styles.text}> ADD TO WATCHLIST</Text>
            </Icon>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.removeFromWatchlistBtn]}
            onPress={() => this.props.dispatch(removeFromWatchlist(media.key))}
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

const mapStateToProps = state => ({ medias: state.watchlist });
export default connect(mapStateToProps)(AddWatchlistButton);
