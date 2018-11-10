import React from 'react';
import { ScrollView, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import WatchlistItem from './WatchlistItem';
import ListItemSeperator from './ListItemSeperator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Watchlist extends React.Component {
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
          ItemSeparatorComponent={() => <ListItemSeperator />}
        />
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({ medias: state.watchlist });
export default connect(mapStateToProps)(Watchlist);
