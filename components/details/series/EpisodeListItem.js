import React from 'react';
import {
  StyleSheet, View, Text, Dimensions,
} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TmdbRating from '../../TmdbRating';
import UsefulImage from '../../UsefulImage';

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
  toggleContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
  },
  poster: {
    height: 280 * ratio,
    width: '100%',
  },
  detailsArrow: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  episodeContainer: {
    justifyContent: 'flex-start',
    flex: 12,
  },
});

class EpisodeListItem extends React.Component {
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

  render() {
    const { info } = this.props;
    const { isCollapsed } = this.state;

    return (
      <View style={styles.container}>
        <Collapse isCollapsed={!isCollapsed} onToggle={() => this.toggle()}>
          <CollapseHeader>
            <View style={styles.toggleContainer}>
              <View style={styles.episodeContainer}>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: '600' }}>{`${info.episode_number}. `}</Text>
                  {info.name}
                </Text>
              </View>

              <View style={styles.detailsArrow}>
                {isCollapsed ? (
                  <Icon size={22} name="angle-down" />
                ) : (
                  <Icon size={22} name="angle-up" />
                )}
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <TmdbRating rating={info.vote_average.toPrecision(2)} votes={info.vote_count} />
            <UsefulImage passedStyle={styles.poster} imgPath={info.still_path} />
            <Text>{info.overview}</Text>
          </CollapseBody>
        </Collapse>
      </View>
    );
  }
}

export default EpisodeListItem;
