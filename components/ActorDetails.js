import React from 'react';
import {
  StyleSheet, TouchableOpacity, ScrollView, View, Text, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Bubbles } from 'react-native-loader';
import ProfileDetailsPanel from './ProfileDetailsPanel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 5,
  },
  movieContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  plotContainer: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  plotTextContainer: {
    flex: 8,
  },
  plotArrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    height: 240,
    width: 160,
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  year: {
    fontWeight: 'normal',
    color: 'grey',
    fontSize: 18,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 16,
  },
  shadowText: {
    fontSize: 14,
    color: 'grey',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class ActorDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actor: {},
      loading: true,
      error: false,
    };
  }

  async componentDidMount() {
    const { id } = this.props.navigation.state.params;
    const apiKey = '698a64988eda32cea2480262c47df2da';

    try {
      const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US&append_to_response=movie_credits`);
      const json = await response.json();
      this.setState({ actor: json });
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  render() {
    const { actor, loading, error } = this.state;
    const { navigation } = this.props;

    if (error) {
      return (
        <View>
          <Text>Movie was not found :(</Text>
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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          <View style={styles.movieContainer}>
            <Image
              style={styles.poster}
              source={{ uri: `https://image.tmdb.org/t/p/w500/${actor.profile_path}` }}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                {actor.name}
                <Text style={styles.year}>{` (${actor.release_date})`}</Text>
              </Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.text}>
                  {'Genre: '}
                  <Text style={styles.shadowText}>{actor.Genre}</Text>
                </Text>
                <Text style={styles.shadowText}>{`Runtime ${actor.runtime}`}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.plotContainer}
            onPress={() => navigation.navigate('Bio', actor)}
          >
            <View style={styles.plotTextContainer}>
              <Text>{actor.biography}</Text>
            </View>
            <View style={styles.plotArrow}>
              <Icon size={22} name="angle-right" />
            </View>
          </TouchableOpacity>

          <ProfileDetailsPanel navigation={navigation} title="Movies" people={actor.movie_credits.cast} />


        </View>
      </ScrollView>
    );
  }
}

export default ActorDetails;
