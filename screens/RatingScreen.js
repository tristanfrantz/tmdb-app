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
import { addRating, removeRating, updateRating } from '../store/actions/ratings';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.themeDarkGrey,
    width: '100%',
    height: '100%',
  },
  rateBtn: {
    marginTop: '5%',
    width: '90%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#0081e6',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlignVertical: 'center',
    paddingTop: 9,
  },
  poster: {
    marginTop: '5%',
    height: 240,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 130,
    textAlignVertical: 'center',
    color: 'white',
  },
  title: {
    margin: '3%',
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
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
      starCount: this.props.navigation.state.params.ratingItem.UserRating,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  onSubmitRating(id) {
    const { starCount } = this.state;
    if (starCount === 0) {
      return;
    }
    const { ratingItem } = this.props.navigation.state.params;

    if (ratingItem.UserRating === 0) {
      this.props.dispatch(addRating(starCount, id));
    } else if (starCount !== ratingItem.UserRating && ratingItem.UserRating !== 0) {
      this.props.dispatch(updateRating(starCount, id));
    }
    const popAction = StackActions.pop({ n: 1 });
    this.props.navigation.dispatch(popAction);
  }

  onRemoveRating(id) {
    this.props.dispatch(removeRating(id));

    const popAction = StackActions.pop({ n: 1 });
    this.props.navigation.dispatch(popAction);
  }

  render() {
    const { ratingItem } = this.props.navigation.state.params;
    return (
      <ImageBackground
        style={styles.container}
        blurRadius={4}
        opacity={0.5}
        source={{ uri: ratingItem.poster }}
      >
        {this.state.starCount === 0 ? (
          <Image style={styles.poster} source={{ uri: ratingItem.poster }} />
        ) : (
          <View style={styles.poster}>
            <Text style={styles.counterText}>{this.state.starCount}</Text>
          </View>
        )}
        <Text style={styles.title}>{`How would you rate ${ratingItem.title}?`}</Text>
        <StarRating
          disabled={false}
          emptyStar="ios-star"
          emptyStarColor="#8a8c91"
          fullStar="ios-star"
          fullStarColor="#5487d3"
          iconSet="Ionicons"
          maxStars={10}
          rating={this.state.starCount}
          selectedStar={rating => this.onStarRatingPress(rating)}
          starSize={30}
        />
        <TouchableOpacity style={styles.rateBtn} onPress={() => this.onSubmitRating(ratingItem.id)}>
          <Text style={styles.btnText}>RATE</Text>
        </TouchableOpacity>
        {ratingItem.UserRating !== 0 && (
          <TouchableOpacity
            style={[styles.rateBtn, { backgroundColor: '#3c3f42' }]}
            onPress={() => this.onRemoveRating(ratingItem.id)}
          >
            <Text style={styles.btnText}>REMOVE RATING</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    );
  }
}

export default connect()(RatingScreen);
