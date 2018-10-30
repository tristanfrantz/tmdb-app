import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../actions/movies';

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
    };
  }

  render() {
    const { details } = this.state;
    const { imdbID } = this.props.navigation.state.params;
    return (
      <View>
        <Text>{details.Title}</Text>
        <Text>{details.Runtime}</Text>
        <TouchableOpacity onPress={() => this.props.dispatch(addToWatchlist(imdbID))}>
          <Text>Add to fav!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => ({ todos: state.todos });
export default connect(mapStateToProps)(MovieDetails);
