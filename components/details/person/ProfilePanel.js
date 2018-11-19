import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text, FlatList, ScrollView,
} from 'react-native';
import UsefulImage from '../../UsefulImage';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  toggleContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ccc',
  },
  iconContainer: {
    paddingRight: 8,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  mediaContainer: {
    width: 80,
    marginRight: 5,
    alignItems: 'center',
  },
  mediaImage: {
    height: 120,
    width: 80,
  },
  movieTitleText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
  },
  dateText: {
    fontSize: 10,
    color: 'grey',
    textAlign: 'center',
  },
});

class ProfilePanel extends React.Component {
  onSeriesPress = (item) => {
    this.props.navigation.navigate({ key: `tv${item.id}`, routeName: 'Series', params: item });
  };

  onMoviePress = (item) => {
    this.props.navigation.navigate({ key: `movie${item.id}`, routeName: 'Movie', params: item });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.mediaContainer}
      onPress={() => {
        item.title ? this.onMoviePress(item) : this.onSeriesPress(item);
      }}
    >
      <UsefulImage style={styles.mediaImage} imgPath={item.poster_path} />
      <Text style={styles.movieTitleText}>{item.title ? item.title : item.name}</Text>
      <Text style={styles.dateText}>
        {item.release_date ? item.release_date : item.first_air_date}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const { title, credits } = this.props;
    const creditsList = credits.map((c, i) => ({ ...c, key: `${i}` }));

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        <ScrollView horizontal>
          <FlatList horizontal data={creditsList} renderItem={this.renderItem} />
        </ScrollView>
      </View>
    );
  }
}

export default ProfilePanel;
