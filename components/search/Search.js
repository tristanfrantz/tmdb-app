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
import { Ionicons } from '@expo/vector-icons';
import Loading from '../Loading';
import Error from '../Error';
import SearchListItem from './SearchListItem';
import ListItemSeperator from '../ListItemSeperator';
import { addRecentSearch, clearRecentSearch } from '../../store/actions/recentSearch';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeDarkGrey,
  },
  searchFieldContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
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
  recentSearchText: {
    fontSize: 15,
    maxWidth: '92%',
    color: '#fff',
  },
  recentSearchTitle: {
    fontSize: 20,
    color: '#fff',
  },
  loadingContainer: {
    height: 50,
  },
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      input: '',
      loading: false,
      error: false,
    };
  }

  onPress = (item) => {
    this.props.navigation.navigate({ key: `movie${item.id}`, routeName: 'Movie', params: item });
  };

  onChangeText = (input) => {
    this.setState({ error: false, input }, () => {
      this.search();
    });
  };

  async search() {
    const apiKey = '698a64988eda32cea2480262c47df2da';
    const { input } = this.state;
    this.setState({ loading: true });
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${input}`,
      );
      const json = await response.json();
      if (json.total_results === 0) {
        this.setState({ error: true });
      }
      this.setState({ results: json.results.map((c, i) => ({ ...c, key: `${i}` })) });
    } catch (e) {
      this.setState({ results: [] });
    }
    // Prevents re-rendering to often
    setTimeout(() => {
      this.setState({ loading: false });
    }, 100);
  }

  renderItem = ({ item }) => <SearchListItem item={item} navigation={this.props.navigation} />;

  renderRecentSearchItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recentSearch}
      onPress={() => this.onChangeText(item.searchString)}
    >
      <Text numberOfLines={1} style={styles.recentSearchText}>{item.searchString}</Text>
      <Ionicons name="ios-arrow-forward" size={25} color="lightgray" />
    </TouchableOpacity>
  );

  render() {
    const {
      results, input, loading, error,
    } = this.state;
    const { recentSearch } = this.props;

    return (
      <View style={styles.container}>
        <SearchBar
          autoFocus
          value={input}
          darkTheme
          round
          showLoading={loading}
          onChangeText={text => this.onChangeText(text)}
          placeholder="Search movies, series or actors..."
          clearButtonMode="while-editing"
          onSubmitEditing={() => {
            if (input !== '') this.props.dispatch(addRecentSearch(input));
          }}
          {...Platform.select({
            android: {
              clearIcon: { color: '#86939e', name: 'cancel' },
            },
          })}
        />
        {input.length && loading && (
          <View style={styles.loadingContainer}>
            <Loading />
          </View>
        )}
        {input.length && !results.length && error && !loading && (
          <Error message="No results." />
        )}
        {recentSearch.length > 0
          && !input.length && (
            <View>
              <View style={styles.recentSearch}>
                <Text style={styles.recentSearchTitle}>Recent Searches</Text>
                <TouchableOpacity onPress={() => this.props.dispatch(clearRecentSearch())}>
                  <Text style={{ color: '#fff' }}>Clear</Text>
                </TouchableOpacity>
              </View>
              <ListItemSeperator />
              <ScrollView>
                <FlatList
                  data={recentSearch}
                  renderItem={this.renderRecentSearchItem}
                  ItemSeparatorComponent={() => <ListItemSeperator />}
                />
              </ScrollView>
            </View>
        )}
        {input.length && !loading && (
          <ScrollView>
            <FlatList
              data={results}
              renderItem={this.renderItem}
              ItemSeparatorComponent={() => <ListItemSeperator />}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({ recentSearch: state.recentSearch });
export default connect(mapStateToProps)(Search);
