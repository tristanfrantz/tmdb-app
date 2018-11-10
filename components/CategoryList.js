import React from 'react';
import {
  StyleSheet, View, ScrollView, FlatList, Text,
} from 'react-native';
import { Bubbles } from 'react-native-loader';
import ListItemSeperator from './ListItemSeperator';
import CategoryListItem from './CategoryListItem';

const CATEGORY_TYPES = {
  POPULAR_MOVIES: 'Popular Movies',
  POPULAR_SERIES: 'Popular Series',
  TOP_MOVIES: 'Top Rated Movies',
  TOP_SERIES: 'Top Rated Series',
  UPCOMING_MOVIES: 'Upcoming Movies',
};

const NUMBER_OF_PAGES = 5;
const RESULT_COUNT = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: true,
      error: false,
    };
  }

  async componentDidMount() {
    const category = this.props.navigation.state.params;
    const apiKey = '698a64988eda32cea2480262c47df2da';
    let apiCategory = 'movie/popular';

    if (category === CATEGORY_TYPES.POPULAR_MOVIES) {
      apiCategory = 'movie/popular';
    } else if (category === CATEGORY_TYPES.POPULAR_SERIES) {
      apiCategory = 'tv/popular';
    } else if (category === CATEGORY_TYPES.TOP_MOVIES) {
      apiCategory = 'movie/top_rated';
    } else if (category === CATEGORY_TYPES.TOP_SERIES) {
      apiCategory = 'tv/top_rated';
    } else if (category === CATEGORY_TYPES.UPCOMING_MOVIES) {
      apiCategory = 'movie/upcoming';
    }

    try {
      for (let i = 1; i < NUMBER_OF_PAGES + 1; i++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/${apiCategory}?api_key=${apiKey}&language=en-US&page=${i}`,
        );
        const json = await response.json();
        const res = await json.results.map((c, k) => ({
          ...c,
          key: `${k + (i - 1) * RESULT_COUNT}`,
        }));

        const newResults = this.state.results;
        newResults.push(...res);

        this.setState({ results: newResults });
      }
    } catch (e) {
      this.setState({ error: true });
    }
    this.setState({ loading: false });
  }

  renderItem = ({ item }) => <CategoryListItem media={item} navigation={this.props.navigation} />;

  render() {
    const { results, error, loading } = this.state;

    if (error) {
      return (
        <View>
          <Text>Oh no spaghettios! something went terribly wrong</Text>
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

    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={results}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <ListItemSeperator />}
        />
      </ScrollView>
    );
  }
}

export default CategoryList;
