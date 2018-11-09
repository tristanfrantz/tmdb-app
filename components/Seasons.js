import React from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { Bubbles } from 'react-native-loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    margin: 5,
  },
  poster: {
    height: 100,
    width: 100,
    marginRight: 5,
  },
  textContainer: {
    flexDirection: 'column',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

class Seasons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasons: {},
      error: false,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      let s = this.props.navigation.state.params;
      s = s.map((c, i) => ({ ...c, key: `${i}` }));
      this.setState({ seasons: s });
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.listItemContainer}>
        <Image
          style={styles.poster}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{item.name}</Text>
          <Text>episodes: {item.episode_count}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { loading, error, seasons } = this.state;
    const { navigation } = this.props;

    if (error) {
      return (
        <View>
          <Text>Seasons not found :(</Text>
        </View>
      );
    }

    if (loading) {
      return (
        <View style={styles.loading}>
          <Bubbles size={15} color="rgba(39, 40, 41, 0.3)" />
        </View>
      );
    }

    console.log(seasons);
    return (
      <View style={styles.container}>
        <FlatList data={seasons} renderItem={this.renderItem} />
      </View>
    );
  }
}

export default Seasons;
