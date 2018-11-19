import React from 'react';
import {
  StyleSheet, ScrollView, View, Text, Platform,
} from 'react-native';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeDarkGrey,
  },
  textContainer: {
    padding: 15,
  },
  nameText: {
    fontWeight: '600',
    fontSize: 22,
    color: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#ccc',
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
    const { id } = this.props.navigation.state.params;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${id}/?api_key=${tmdbApiKey}&language=en-US`,
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

    if (error) {
      return <Error message="Biography could not be found." />;
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.text}>{item.biography}</Text>
        </View>
      </ScrollView>
    );
  }
}
