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
  Picker,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  movieContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 16,
  },
  searchFieldContainer: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
  },
  searchTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 7,
    paddingLeft: 10,
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'lightgray',
    height: 40,
    flex: 3,
  },
  searchPicker: {
    flex: 1,
    height: 40,
    backgroundColor: 'lightgray',
    marginRight: 10,
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
      type: 'all',
      text: '',
    };
  }

  search = (input) => {
    const apiKey = '61930aa1';
    let stateType = this.state.type;
    console.log('search function: ');
    console.log(stateType);
    if (stateType === 'all') {
      stateType = '';
    }

    fetch(`http://omdbapi.com/?apikey=${apiKey}&s=${input}&type=${stateType}`)
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
        <View style={styles.searchFieldContainer}>
          <TextInput
            style={styles.searchTextInput}
            onChangeText={(text) => {
              this.search(text);
              this.setState({ text });
            }}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={this.state.type}
              mode="dropdown"
              style={styles.searchPicker}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ type: itemValue }, () => {
                  this.search(this.state.text);
                });
              }}
            >
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Movies" value="movie" />
              <Picker.Item label="Series" value="series" />
              <Picker.Item label="Episodes" value="episode" />
            </Picker>
          </View>
        </View>
        <ScrollView>
          <FlatList data={results} renderItem={this.renderItem} />
        </ScrollView>
      </View>
    );
  }
}

export default componentName;
