import React from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Bubbles } from 'react-native-loader';
import MovieListItem from './MovieListItem';
import SearchListItemSeperator from './SearchListItemSeperator';
import { addRecentSearch, clearRecentSearch } from '../store/actions/media';

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
  recentSearch: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      input: '',
      seriesFilter: false,
      moviesFilter: false,
      loading: false,
      error: false,
    };
  }

  onPress = (item) => {
    this.props.navigation.navigate('Details', item);
  };

  onTagPress = (item) => {
    if (item.id === 1) {
      this.setState(
        prevState => ({ filter: !prevState.moviesFilter }),
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

  onChangeText = (input) => {
    this.setState({ error: false, input }, () => {
      this.search();
    });
  };

  async search() {
    const apiKey = '698a64988eda32cea2480262c47df2da';
    const { input } = this.state;

    try {
      this.setState({ loading: true });
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${input}`,
      );
      const json = await response.json();
      if (json.total_results === 0) {
        this.setState({ error: true });
      }
      this.setState({ results: json.results.map((c, i) => ({ ...c, key: `${i}` })) });
    } catch (e) {
      console.log(e);
      this.setState({ results: [] });
    }
    this.setState({ loading: false });
  }

  renderItem = ({ item }) => <MovieListItem item={item} navigation={this.props.navigation} />;

  renderRecentSearchItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recentSearch}
      onPress={() => this.onChangeText(item.searchString)}
    >
      <Text style={{ fontSize: 15 }}>{item.searchString}</Text>
      <Icon name="ios-arrow-forward" size={25} color="#6f7277" />
    </TouchableOpacity>
  );

  render() {
    const {
      results, input, loading, error,
    } = this.state;
    const { recentSearch } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.searchFieldContainer}>
          <SearchBar
            value={input}
            lightTheme
            containerStyle={{ backgroundColor: 'white' }}
            round
            showLoading={loading}
            onChangeText={i => this.onChangeText(i)}
            placeholder="Search movies, series or actors..."
            clearButtonMode="while-editing"
            onSubmitEditing={() => {
              this.props.dispatch(addRecentSearch(input));
            }}
            {...Platform.select({
              android: {
                clearIcon: { color: '#86939e', name: 'cancel' },
              },
            })}
          />
        </View>
        {error && (
          <View>
            <Text>{`Nothing was found matching ${input} :(`}</Text>
          </View>
        )}
        {recentSearch.length > 0
          && input.length === 0 && (
            <View>
              <View style={styles.recentSearch}>
                <Text style={{ fontSize: 20 }}>Recent Searches</Text>
                <TouchableOpacity onPress={() => this.props.dispatch(clearRecentSearch())}>
                  <Text>Clear</Text>
                </TouchableOpacity>
              </View>
              <SearchListItemSeperator />
            </View>
        )}

        {input.length === 0 ? (
          <ScrollView>
            <FlatList
              data={recentSearch}
              renderItem={this.renderRecentSearchItem}
              ItemSeparatorComponent={() => <SearchListItemSeperator />}
            />
          </ScrollView>
        ) : (
          <ScrollView>
            <FlatList
              data={results}
              renderItem={this.renderItem}
              ItemSeparatorComponent={() => <SearchListItemSeperator />}
            />
          </ScrollView>
        )}
        {loading && (
          <View style={styles.loading}>
            <Bubbles size={15} color="rgba(39, 40, 41, 0.3)" />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({ recentSearch: state.recentSearch });
export default connect(mapStateToProps)(MovieSearch);
