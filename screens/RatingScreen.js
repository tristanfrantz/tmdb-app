import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
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
  },
  rateBtn: {
    marginTop: '5%',
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
    marginTop: '5%',
    height: 240,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    fontSize: 130,
    textAlignVertical: 'center',
    color: '#3d5f99',
  },
  title: {
    marginVertical: '5%',
    fontSize: 25,
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

  onRemoveRating(imdbID) {
    this.props.dispatch(removeRating(imdbID));

    const popAction = StackActions.pop({ n: 1 });
    this.props.navigation.dispatch(popAction);
  }

  render() {
    const { ratingItem } = this.props.navigation.state.params;
    return (
      <ImageBackground
        style={[styles.container, { width: '100%', height: '100%' }]}
        blurRadius={4}
        opacity={0.5}
        source={{ uri: ratingItem.Poster }}
      >
        {this.state.starCount === 0 ? (
          <Image style={styles.poster} source={{ uri: ratingItem.Poster }} />
        ) : (
          <View style={styles.poster}>
            <Text style={styles.counter}>{this.state.starCount}</Text>
          </View>
        )}
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
        {ratingItem.YourRating !== 0 && (
          <TouchableOpacity
            style={[styles.rateBtn, { backgroundColor: '#3c3f42' }]}
            onPress={() => this.onRemoveRating(ratingItem.imdbID)}
          >
            <Text style={styles.btnText}>REMOVE RATING</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    );
  }
}

export default connect()(RatingScreen);
