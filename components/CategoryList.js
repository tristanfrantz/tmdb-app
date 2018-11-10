import React from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import Loading from './Loading';
import Error from './Error';
import ListItemSeperator from './ListItemSeperator';
import CategoryListItem from './CategoryListItem';
import Categories from '../constants/Categories';

const NUMBER_OF_PAGES = 5;
const RESULT_COUNT = 20;

const API_CATEGORIES = {
  POPULAR_MOVIES: 'movie/popular',
  POPULAR_SERIES: 'tv/popular',
  TOP_MOVIES: 'movie/top_rated',
  TOP_SERIES: 'tv/top_rated',
  UPCOMING_MOVIES: 'movie/upcoming',
};

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
    try {
      const results = await this.fetchMedia();
      this.setState({ results });
    } catch (e) {
      this.setState({ error: true });
    }
    this.setState({ loading: false });
  }

  getApiCategory = () => {
    const category = this.props.navigation.state.params;
    let apiCategory = API_CATEGORIES.POPULAR_MOVIES;
    console.log(category);
    if (category === Categories.POPULAR_MOVIES) {
      apiCategory = API_CATEGORIES.POPULAR_MOVIES;
    } else if (category === Categories.POPULAR_SERIES) {
      apiCategory = API_CATEGORIES.POPULAR_SERIES;
    } else if (category === Categories.TOP_MOVIES) {
      apiCategory = API_CATEGORIES.TOP_MOVIES;
    } else if (category === Categories.TOP_SERIES) {
      apiCategory = API_CATEGORIES.TOP_SERIES;
    } else if (category === Categories.UPCOMING_MOVIES) {
      apiCategory = API_CATEGORIES.UPCOMING_MOVIES;
    }
    console.log(apiCategory);

    return apiCategory;
  };

  fetchMedia = async () => {
    const apiKey = '698a64988eda32cea2480262c47df2da';
    const apiCategory = this.getApiCategory();
    const results = [];
    /* eslint-disable no-await-in-loop */
    for (let i = 1; i < NUMBER_OF_PAGES + 1; i += 1) {
      const response = await fetch(
        `https://api.themoviedb.org/3/${apiCategory}?api_key=${apiKey}&language=en-US&page=${i}`,
      );
      const json = await response.json();
      const res = await json.results.map((c, k) => ({
        ...c,
        key: `${k + (i - 1) * RESULT_COUNT}`,
      }));
      results.push(...res);
    }
    return results;
  };

  renderItem = ({ item }) => <CategoryListItem media={item} navigation={this.props.navigation} />;

  render() {
    const { results, error, loading } = this.state;

    if (error) {
      return <Error />;
    }

    if (loading) {
      return <Loading />;
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