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
  container: {},
  toggleContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    paddingRight: 8,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 10,
  },

  itemContainer: {
    height: 120,
    width: 90,
  },
  profile: {
    height: 100,
    width: 75,
  },
});

class DetailsPanel extends React.Component {
  onPress = (item) => {
    this.props.navigation.push('Profile', item);
  };

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => this.onPress(item)}>
      <Image
        style={styles.profile}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}` }}
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  render() {
    const { title, people } = this.props;
    const peopleList = people.map((c, i) => ({ ...c, key: `${i}` }));

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.toggleContainer}>
          <View>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </TouchableOpacity>
        <ScrollView horizontal>
          <FlatList horizontal data={peopleList} renderItem={this.renderItem} />
        </ScrollView>
      </View>
    );
  }
}

export default DetailsPanel;
