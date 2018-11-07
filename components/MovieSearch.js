import React from 'react';
import {
  StyleSheet, ScrollView, FlatList, View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { TagSelect } from 'react-native-tag-select';
import MovieListItem from './MovieListItem';
import SearchListItemSeperator from './SearchListItemSeperator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
  },
  searchFieldContainer: {
    paddingBottom: 5,
  },
  filterButtons: {
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
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
      text: '',
      moviesFilter: false,
      seriesFilter: false,
    };
  }

  search = () => {
    const apiKey = '698a64988eda32cea2480262c47df2da';
    const input = this.state.text;
    let type = '';
    if (this.state.moviesFilter && !this.state.seriesFilter) {
      type = 'movie';
    } else if (this.state.seriesFilter && !this.state.moviesFilter) {
      type = 'series';
    }

    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${input}`,
    )
      .then(res => res.json())
      .then(res => this.setState({
        results: res.results.map((c, i) => ({ ...c, key: `${i}` })),
      }))
      .catch((err) => {
        console.log(err);
        this.setState({ results: [] });
      });
  };

  onPress = (item) => {
    this.props.navigation.navigate('Details', item);
  };

  onTagPress = (item) => {
    if (item.id === 1) {
      this.setState(
        prevState => ({ moviesFilter: !prevState.moviesFilter }),
        () => {
          this.search();
        },
      );
    } else if (item.id === 2) {
      this.setState(
        prevState => ({ seriesFilter: !prevState.seriesFilter }),
        () => {
          this.search();
        },
      );
    }
  };

  onChangeText = (text) => {
    this.setState({ text }, () => {
      this.search();
    });
  };

  renderItem = ({ item }) => <MovieListItem item={item} navigation={this.props.navigation} />;

  render() {
    const { results } = this.state;

    const searchPlaceholder = 'Search movies, series or episodes...';
    return (
      <View style={styles.container}>
        <View style={styles.searchFieldContainer}>
          <SearchBar
            lightTheme
            containerStyle={{ backgroundColor: 'white' }}
            round
            onChangeText={text => this.onChangeText(text)}
            placeholder={searchPlaceholder}
            clearButtonMode="while-editing"
          />
        </View>
        <ScrollView>
          <TagSelect
            data={[{ id: 1, label: 'Movies' }, { id: 2, label: 'Series' }]}
            onItemPress={(item) => {
              this.onTagPress(item);
            }}
            containerStyle={{ paddingTop: 5 }}
            itemStyle={styles.filterButtons}
          />
          <FlatList
            data={results}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <SearchListItemSeperator />}
          />
        </ScrollView>
      </View>
    );
  }
}

export default componentName;
