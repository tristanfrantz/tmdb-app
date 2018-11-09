import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Bubbles } from 'react-native-loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

  renderItem = ({ item }) => <Text>{item.name}</Text>;

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
