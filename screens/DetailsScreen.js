import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import MovieDetails from '../components/MovieDetails';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  infoContainer: {
    margin: 10,
  },
  todoTitle: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 15,
  },
  addButton: {
    width: Dimensions.get('window').width * 0.7,
    height: 50,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 5,
  },
  addDateButton: {
    backgroundColor: '#eab633',
  },
  addImageButton: {
    backgroundColor: '#b834e5',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderColor: '#b834e5',
    borderWidth: 1,
  },
});

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
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

  render() {
    return (
      <View style={styles.container}>
        <MovieDetails navigation={this.props.navigation} />
      </View>
    );
  }
}

export default DetailsScreen;
