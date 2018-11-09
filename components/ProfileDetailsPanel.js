import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';

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
  },
  dateText: {
    fontSize: 10,
    color: 'grey',
    textAlign: 'center',
  },
});

class DetailsPanel extends React.Component {
  onPress = item => {
    this.props.navigation.push('Details', item);
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.mediaContainer}
      onPress={() => this.onPress(item)}
    >
      <Image
        style={styles.mediaImage}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
      />
      <Text style={styles.movieTitleText}>{item.title}</Text>
      <Text style={styles.dateText}>{item.release_date}</Text>
    </TouchableOpacity>
  );

  render() {
    const { title, credits } = this.props;
    const creditsList = credits.map((c, i) => ({ ...c, key: `${i}` }));

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        <ScrollView horizontal>
          <FlatList
            horizontal
            data={creditsList}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </View>
    );
  }
}

export default DetailsPanel;
