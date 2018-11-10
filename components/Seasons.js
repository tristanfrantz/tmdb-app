import React from 'react';
import {
  StyleSheet, View, Text, FlatList, Image,
} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Loading from './Loading';
import Error from './Error';
import ListItemSeperator from './ListItemSeperator';
import PlotContainer from './PlotContainer';
import EpisodeListItem from './EpisodeListItem';

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
    width: '72%',
    paddingHorizontal: 8,
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

  async componentWillMount() {
    const episodeDetails = this.props.navigation.state.params;
    let seasons;
    try {
      seasons = episodeDetails.seasons.map((c, i) => ({
        ...c,
        key: `${i}`,
      }));
      seasons = await Promise.all(
        seasons.map(async (season) => {
          season.episodes = await this.getEpisodes(episodeDetails.id, season.season_number);
          return season;
        }),
      );
      this.setState({ seasons, loading: false });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  getEpisodes = async (id, seasonNumber) => {
    const tmdbApiKey = '698a64988eda32cea2480262c47df2da';
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${tmdbApiKey}&language=en-US`,
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

  renderEpisode = ({ item }) => <EpisodeListItem info={item} navigation={this.props.navigation} />;

  renderItem = ({ item }) => {
    const { navigation } = this.props;

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
              <Text style={{ fontStyle: 'italic' }}>{`Premiered ${item.air_date}`}</Text>
              <Text>{`${item.episode_count} Episodes`}</Text>
              <PlotContainer navigation={navigation} item={item} />
            </View>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={{ paddingHorizontal: 10 }}>
            <ListItemSeperator />
            <FlatList
              data={item.episodes}
              renderItem={this.renderEpisode}
              ListEmptyComponent={<Error message="No episodes could be found." />}
              ItemSeparatorComponent={() => <ListItemSeperator />}
            />
          </View>
        </CollapseBody>
      </Collapse>
    );
  };

  render() {
    const { loading, error, seasons } = this.state;

    if (error) {
      return <Error message="The seasons could not be found." />;
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={() => <ListItemSeperator />}
          data={seasons}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default Seasons;
