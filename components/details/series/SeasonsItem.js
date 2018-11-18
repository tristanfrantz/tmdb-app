import React from 'react';
import {
  StyleSheet, View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Collapsible from 'react-native-collapsible';
import UsefulImage from '../../UsefulImage';
import PlotContainer from '../PlotContainer';
import ListItemSeperator from '../../ListItemSeperator';
import Error from '../../Error';
import EpisodeListItem from './EpisodeListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 2,
  },
  toggleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    paddingRight: 8,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  poster: {
    height: 150,
    width: 100,
    marginRight: 5,
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

class SeasonsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

  toggle = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  renderEpisode = ({ item }) => <EpisodeListItem info={item} navigation={this.props.navigation} />;

  render() {
    const { item, navigation } = this.props;
    const { isCollapsed } = this.state;
    return (
      <View>
        <TouchableOpacity onPress={() => this.toggle()}>
          <View style={styles.container}>
            <UsefulImage passedStyle={styles.poster} imgPath={item.poster_path} />
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>{item.name}</Text>
              <Text style={{ fontStyle: 'italic' }}>{`Premiered ${item.air_date}`}</Text>
              <Text>{`${item.episode_count} Episodes`}</Text>
              <PlotContainer navigation={navigation} item={item} />
            </View>
          </View>
        </TouchableOpacity>

        <Collapsible collapsed={isCollapsed}>
          <View style={{ paddingHorizontal: 10 }}>
            <FlatList
              data={item.episodes}
              renderItem={this.renderEpisode}
              ListEmptyComponent={<Error message="No episodes could be found." />}
              ItemSeparatorComponent={() => <ListItemSeperator />}
            />
          </View>
        </Collapsible>
      </View>
    );
  }
}

export default SeasonsItem;
