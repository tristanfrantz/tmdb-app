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
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginLeft: 5,
    marginRight: 5,
  },
  toggleContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleText: {
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

class ProfileDetailsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

  toggle = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  onPress = (item) => {
    this.props.navigation.push('Details', item);
  };

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => this.onPress(item)}>
      <Image
        style={styles.profile}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
      />
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  render() {
    const { title, people } = this.props;
    const { isCollapsed } = this.state;

    const peopleList = people.map((c, i) => ({ ...c, key: `${i}` }));

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.toggleContainer} onPress={() => this.toggle()}>
          <View>
            <Text style={styles.toggleText}>{title}</Text>
          </View>
          <View style={styles.iconContainer}>
            {isCollapsed ? (
              <Icon size={22} name="angle-down" style={styles.addIcon} />
            ) : (
              <Icon size={22} name="angle-up" style={styles.addIcon} />
            )}
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsed}>
          <ScrollView horizontal>
            <FlatList horizontal data={peopleList} renderItem={this.renderItem} />
          </ScrollView>
        </Collapsible>
      </View>
    );
  }
}

export default ProfileDetailsPanel;
