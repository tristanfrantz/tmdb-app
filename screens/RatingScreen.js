import React from 'react';
import {
  StyleSheet, View, Platform, Text, TouchableOpacity, Image,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation';
import { addRating, removeRating, updateRating } from '../actions/movies';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  rateBtn: {
    marginVertical: '5%',
    width: '90%',
    height: 40,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#0081e6',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  poster: {
    marginTop: '10%',
    height: 240,
    width: 160,
  },
  title: {
    marginVertical: '5%',
    fontSize: 30,
    textAlign: 'center',
  },
});

class RatingScreen extends React.Component {
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
      starCount: this.props.navigation.state.params.ratingItem.YourRating,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  onSubmitRating(imdbID) {
    const { starCount } = this.state;
    const { YourRating } = this.props.navigation.state.params.ratingItem;

    if (YourRating === 0) {
      this.props.dispatch(addRating(starCount, imdbID));
    } else if (starCount !== YourRating && YourRating !== 0) {
      this.props.dispatch(updateRating(starCount, imdbID));
    }
    const popAction = StackActions.pop({ n: 1 });
    this.props.navigation.dispatch(popAction);
  }

  render() {
    const { ratingItem } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Image style={styles.poster} source={{ uri: ratingItem.Poster }} />
        <Text style={styles.title}>{`How would you rate ${ratingItem.Title}?`}</Text>
        <StarRating
          disabled={false}
          emptyStar="ios-star-outline"
          fullStar="ios-star"
          halfStar="ios-star-half"
          iconSet="Ionicons"
          maxStars={10}
          rating={this.state.starCount}
          selectedStar={rating => this.onStarRatingPress(rating)}
          fullStarColor="#3d5f99"
          starSize={30}
        />
        <TouchableOpacity
          style={styles.rateBtn}
          onPress={() => this.onSubmitRating(ratingItem.imdbID)}
        >
          <Text style={styles.btnText}>RATE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(RatingScreen);
