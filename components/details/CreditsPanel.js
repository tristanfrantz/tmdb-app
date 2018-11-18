import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text, FlatList, ScrollView,
} from 'react-native';
import UsefulImage from '../UsefulImage';

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
  nameText: {
    fontSize: 12,
    textAlign: 'center',
  },
  characterText: {
    fontSize: 10,
    color: 'grey',
    textAlign: 'center',
  },
});

class CreditsPanel extends React.Component {
  onPress = (item) => {
    this.props.navigation.navigate({
      key: `profile${item.id}${item.credit_id}`,
      routeName: 'Profile',
      params: item,
    });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mediaContainer} onPress={() => this.onPress(item)}>
      <UsefulImage style={styles.mediaImage} imgPath={item.profile_path} />
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.characterText}>{item.character}</Text>
    </TouchableOpacity>
  );

  render() {
    const { title, people } = this.props;
    const peopleList = people.map((c, i) => ({ ...c, key: `${i}` }));

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        <ScrollView horizontal>
          <FlatList horizontal data={peopleList} renderItem={this.renderItem} />
        </ScrollView>
      </View>
    );
  }
}

export default CreditsPanel;
