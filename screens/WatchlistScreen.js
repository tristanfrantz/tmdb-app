import React from 'react';
import Watchlist from '../components/watchlist/Watchlist';

class WatchlistScreen extends React.Component {
  render() {
    return <Watchlist navigation={this.props.navigation} />;
  }
}
export default WatchlistScreen;
