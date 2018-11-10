import React from 'react';
import {
  StyleSheet, View, Text, Image, Dimensions,
} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TmdbRating from './TmdbRating';

const ratio = Dimensions.get('window').width / 500;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  text: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 18,
  },
  poster: {
    height: 280 * ratio,
    width: '100%',
  },
  detailsArrow: {
    justifyContent: 'center',
  },
});

class EpisodeListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      droppedDown: false,
    };
  }

  render() {
    const { info } = this.props;
    const { droppedDown } = this.state;

    return (
      <View style={styles.container}>
        <Collapse
          isCollapsed={droppedDown}
          onToggle={isCollapsed => this.setState({ droppedDown: isCollapsed })}
        >
          <CollapseHeader>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>{`${info.episode_number}. ${info.name}`}</Text>
                <View style={{ marginLeft: 20 }}>
                  <TmdbRating rating={info.vote_average.toPrecision(2)} votes={info.vote_count} />
                </View>
              </View>

              <View style={styles.detailsArrow}>
                {!droppedDown ? (
                  <Icon size={22} name="angle-right" />
                ) : (
                  <Icon size={22} name="angle-down" />
                )}
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text>{info.overview}</Text>
            <Image
              style={styles.poster}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${info.still_path}`,
              }}
            />
          </CollapseBody>
        </Collapse>
      </View>
    );
  }
}

export default EpisodeListItem;
