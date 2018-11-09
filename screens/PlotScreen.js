import React from 'react';
import {
  StyleSheet, ScrollView, View, Text, Platform,
} from 'react-native';
import { Bubbles } from 'react-native-loader';

const MEDIA_TYPES = {
  MOVIE: 'movie',
  SERIES: 'tv',
  PERSON: 'person',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textContainer: {
    padding: 15,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 22,
  },
  text: {
    fontSize: 18,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class PlotScreen extends React.Component {
  static navigationOptions = {
    ...Platform.select({
      android: {
        headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
          alignSelf: 'center',
        },
        headerRight: <View />,
      },
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      item: {},
      loading: true,
      error: false,
    };
  }

  async componentDidMount() {
    const tmdbApiKey = '698a64988eda32cea2480262c47df2da';
    const { item } = this.state;
    const { id } = this.props.navigation.state.params;
    let type = MEDIA_TYPES.MOVIE;

    if (item) {
      type = item.title ? MEDIA_TYPES.MOVIE : MEDIA_TYPES.SERIES;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${tmdbApiKey}&language=en-US`,
      );
      const json = await response.json();
      this.setState({ item: json });
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  render() {
    const { item, loading, error } = this.state;
    const title = item.title ? item.title : item.name;

    if (error) {
      return (
        <View>
          <Text>Oh no spaghettios! plot was not found </Text>
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
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.text}>{item.overview}</Text>
        </View>
      </ScrollView>
    );
  }
}
