import React from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import AddWishlistButton from './AddWishlistButton';
import { SearchBar, Icon } from 'react-native-elements';
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
  filterButtons: {
    borderRadius: 100,
    width: 70,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
    const input = this.state.text;
    let type = '';
    if (this.state.moviesFilter && !this.state.seriesFilter) {
      type = 'movie';
    } else if (this.state.seriesFilter && !this.state.moviesFilter) {
      type = 'series';
    }

    fetch(`http://omdbapi.com/?apikey=${apiKey}&s=${input}&type=${type}`)
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

  onItemPress = item => {
    if (item.id === 1) {
      this.setState(
        prevState => ({ moviesFilter: !prevState.moviesFilter }),
        () => {
          this.search();
        }
      );
    } else if (item.id === 2) {
      this.setState(
        prevState => ({ seriesFilter: !prevState.seriesFilter }),
        () => {
          this.search();
        }
      );
    }
  };

  onChangeText = text => {
    this.setState({ text }, () => {
      this.search();
    });
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
              this.onChangeText(text);
            }}
            placeholder="Search"
            clearButtonMode="while-editing"
            clearIcon={<Icon type="fontAwesome" name="times-circle-o" />}
          />
          <TagSelect
            data={[{ id: 1, label: 'Movies' }, { id: 2, label: 'Series' }]}
            onItemPress={item => {
              this.onItemPress(item);
            }}
            containerStyle={{ paddingTop: 5 }}
            itemStyle={styles.filterButtons}
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
