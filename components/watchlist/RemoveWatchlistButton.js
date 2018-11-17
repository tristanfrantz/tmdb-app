import {
  StyleSheet, TouchableOpacity, Text, View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { removeFromWatchlist } from '../../store/actions/media';

const styles = StyleSheet.create({
  button: {
    height: 32,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#bc142a',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 16,
  },
  text: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

class RemoveWatchlistButton extends React.Component {
  render() {
    const { media } = this.props;
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.dispatch(removeFromWatchlist(media.id))}
        >
          <Text style={styles.text}>
            <Icon name="times" style={styles.icon} />
            <Text style={styles.text}>REMOVE FROM WATCHLIST</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({ medias: state.watchlist });
export default connect(mapStateToProps)(RemoveWatchlistButton);
