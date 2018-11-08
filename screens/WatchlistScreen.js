import React from 'react';
import { ScrollView, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import WatchlistItem from '../components/WatchlistItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
  },
});

class WatchlistScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { medias } = this.props;
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={medias}
          renderItem={({ item }) => (
            <WatchlistItem media={item.details} navigation={this.props.navigation} />
          )}
          keyExtractor={item => `${item.details.id}`}
        />
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({ medias: state.watchlist });
export default connect(mapStateToProps)(WatchlistScreen);
