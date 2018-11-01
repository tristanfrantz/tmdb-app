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
import AddWishlistButton from './AddWishlistButton';
import { SearchBar } from 'react-native-elements';
import { TagSelect } from 'react-native-tag-select';

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
  watchlistBtn: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
  },
});

class componentName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      text: '',
      moviesFilter: false,
      seriesFilter: false,
    };
  }

  search = () => {
    const apiKey = '14cfd31';
    let type = '';
    if (this.state.moviesFilter && !this.state.seriesFilter) {
      type = 'movie';
    } else if (this.state.seriesFilter && !this.state.moviesFilter) {
      type = 'series';
    }

    fetch(
      `http://omdbapi.com/?apikey=${apiKey}&s=${this.state.text}&type=${type}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          results: res.Search.map((c, i) => ({ ...c, key: `${i}` })),
        })
      )
      .catch(err => {
        console.log(err);
        this.setState({ results: [] });
      });
  };

  onPress = item => {
    this.props.navigation.navigate('Details', item);
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => this.onPress(item)}
    >
      <Image style={styles.poster} source={{ uri: item.Poster }} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.text}>{item.Year}</Text>
        <View style={styles.watchlistBtn}>
          <AddWishlistButton imdbId={item.imdbID} />
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { results } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.searchFieldContainer}>
          <SearchBar
            lightTheme
            round
            onChangeText={text => {
              this.setState({ text }, () => {
                this.search();
              });
            }}
            placeholder="Search"
          />
          <TagSelect
            data={[{ id: 1, label: 'Movies' }, { id: 2, label: 'Series' }]}
            onItemPress={item => {
              if (item.id === 1) {
                this.setState({ moviesFilter: !this.moviesFilter }, () => {
                  this.search();
                });
              } else if (item.id === 2) {
                this.setState({ seriesFilter: !this.seriesFilter }, () => {
                  this.search();
                });
              }
            }}
          />
        </View>
        <ScrollView>
          <FlatList data={results} renderItem={this.renderItem} />
        </ScrollView>
      </View>
    );
  }
}

export default componentName;
