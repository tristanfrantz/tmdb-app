import React from 'react';
import {
  StyleSheet, ScrollView, View, Text, Platform,
} from 'react-native';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Colors from '../constants/Colors';

const MEDIA_TYPES = {
  MOVIE: 'movie',
  SERIES: 'tv',
  PERSON: 'person',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeDarkGrey,
  },
  textContainer: {
    padding: 15,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 22,
    color: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#ccc',
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
    const { id, title, season_number } = this.props.navigation.state.params;

    if (season_number) {
      this.setState({ item: this.props.navigation.state.params, loading: false });
      return;
    }
    const type = title ? MEDIA_TYPES.MOVIE : MEDIA_TYPES.SERIES;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${tmdbApiKey}&language=en-US`,
      );
      const json = await response.json();
      this.setState({ item: json, loading: false });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  render() {
    const { item, loading, error } = this.state;
    const title = item.title ? item.title : item.name;

    if (error) {
      return <Error message="The plot could not be found." />;
    }

    if (loading) {
      return <Loading />;
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
