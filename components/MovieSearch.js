import React from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 8,
  },
  movieContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 16,
  },
  poster: {
    height: 150,
    width: 100,
  },
  details: {
    flex: 1,
    paddingLeft: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    fontSize: 16,
  },
});

class componentName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  search = (input) => {
    const apiKey = '61930aa1';

    fetch(`http://omdbapi.com/?apikey=${apiKey}&s=${input}`)
      .then(res => res.json())
      .then(res => this.setState({
        results: res.Search.map((c, i) => ({ ...c, key: `${i}` })),
      }))
      .catch((err) => {
        console.log(err);
        this.setState({ results: [] });
      });
  };

  onPress = (item) => {
    this.props.navigation.navigate('Details', item);
  };

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.movieContainer} onPress={() => this.onPress(item)}>
      <Image style={styles.poster} source={{ uri: item.Poster }} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.text}>{item.Year}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { results } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            marginBottom: 12,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={text => this.search(text)}
        />
        <ScrollView>
          <FlatList data={results} renderItem={this.renderItem} />
        </ScrollView>
      </View>
    );
  }
}

export default componentName;
