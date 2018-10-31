import React from 'react';
import { ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import MovieListItem from '../components/MovieListItem';

class WatchlistScreen extends React.Component {
  static navigationOptions = {
    title: 'Watchlist',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { movies } = this.props;
    return (
      <ScrollView>
        <FlatList data={movies} renderItem={({ item }) => <MovieListItem movie={item.details} />} />
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({ movies: state.watchlist });
export default connect(mapStateToProps)(WatchlistScreen);
