import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Loading from '../../Loading';
import Error from '../../Error';
import ListItemSeperator from '../../ListItemSeperator';
import SeasonsItem from './SeasonsItem';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeDarkGrey,
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

  renderItem = ({ item }) => <SeasonsItem navigation={this.props.navigation} item={item} />;

  render() {
    const { loading, error, seasons } = this.state;

    if (error) {
      return <Error />;
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
          ListEmptyComponent={() => <Error message="No seasons found." />}
        />
      </View>
    );
  }
}

export default Seasons;
