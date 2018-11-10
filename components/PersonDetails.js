import React from 'react';
import {
  StyleSheet, TouchableOpacity, ScrollView, View, Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from './Loading';
import Error from './Error';
import ProfilePanel from './ProfilePanel';
import UsefulImage from './UsefulImage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 8,
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
    fontWeight: '600',
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

class PersonDetails extends React.Component {
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
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US&append_to_response=combined_credits`,
      );
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
      return <Error message="The person could not be found." />;
    }

    if (loading) {
      return <Loading />;
    }
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          <View style={styles.movieContainer}>
            <UsefulImage passedStyle={styles.poster} imgPath={actor.profile_path} />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{actor.name}</Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.text}>
                  {'Born: '}
                  <Text style={styles.shadowText}>{actor.birthday ? actor.birthday : 'N/A'}</Text>
                </Text>
                <Text style={styles.text}>
                  {'From: '}
                  <Text style={styles.shadowText}>
                    {actor.place_of_birth ? actor.place_of_birth : 'N/A'}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  {'Died: '}
                  <Text style={styles.shadowText}>{actor.deathday ? actor.deathday : 'N/A'}</Text>
                </Text>
                <Text style={styles.text}>
                  {'Department: '}
                  <Text style={styles.shadowText}>
                    {actor.known_for_department ? actor.known_for_department : 'N/A'}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.plotContainer}
            onPress={() => navigation.push('Biography', actor)}
          >
            <View style={styles.plotTextContainer}>
              <Text numberOfLines={4}>{actor.biography}</Text>
            </View>
            <View style={styles.plotArrow}>
              <Icon size={22} name="angle-right" />
            </View>
          </TouchableOpacity>

          {actor.combined_credits
            && actor.combined_credits.cast && (
              <ProfilePanel
                navigation={navigation}
                title="Known for"
                credits={actor.combined_credits.cast}
              />
          )}
        </View>
      </ScrollView>
    );
  }
}

export default PersonDetails;
