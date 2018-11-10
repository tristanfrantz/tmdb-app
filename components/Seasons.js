import React from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { Bubbles } from 'react-native-loader';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import SearchListItemSeperator from './SearchListItemSeperator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 10,
  },
  poster: {
    height: 150,
    width: 100,
    marginRight: 5,
  },
  textContainer: {
    flexDirection: 'column',
    paddingLeft: 8,
  },
  textTitle: {
    fontWeight: '600',
    fontSize: 18,
  },
  episodeText: {
    textAlign: 'center',
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
      let seasons = this.props.navigation.state.params;
      seasons = seasons.map((c, i) => ({
        ...c,
        key: `${i}`,
      }));
      seasons = await Promise.all(
        seasons.map(async season => {
          season.episodes = await this.getEpisodes(
            season.id,
            season.season_number
          );
          return season;
        })
      );
      this.setState({ seasons });
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  getEpisodes = async (id, seasonNumber) => {
    const tmdbApiKey = '698a64988eda32cea2480262c47df2da';
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${tmdbApiKey}&language=en-US`
      );
      const json = await response.json();
      const results = json.episodes.map((c, i) => ({
        ...c,
        key: `${i}`,
      }));
      return results;
    } catch (e) {
      return [];
    }
  };

  renderItem = ({ item }) => {
    return (
      <Collapse>
        <CollapseHeader>
          <View style={styles.listItemContainer}>
            <Image
              style={styles.poster}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>{item.name}</Text>
              <Text>episodes: {item.episode_count}</Text>
            </View>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <FlatList
            data={item.episodes}
            renderItem={this.renderEpisode}
            ListEmptyComponent={
              <Text style={styles.episodeText}>No episodes found</Text>
            }
          />
        </CollapseBody>
      </Collapse>
    );
  };

  renderEpisode = ({ item }) => {
    return (
      <Text style={styles.episodeText}>
        {item.episode_number}: {item.name}
      </Text>
    );
  };

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

    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={() => <SearchListItemSeperator />}
          data={seasons}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default Seasons;
