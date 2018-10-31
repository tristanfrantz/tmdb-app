import React from 'react';
import {
  StyleSheet, ScrollView, View, Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textContainer: {
    padding: 15,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  text: {
    fontSize: 18,
  },
});

export default class PlotScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
    };
  }

  componentDidMount() {
    const apiKey = '14cfd31';
    const { imdbID } = this.props.navigation.state.params;

    fetch(`http://omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`)
      .then(res => res.json())
      .then(res => this.setState({ item: res }))
      .catch(err => console.log(err));
  }

  render() {
    const { item } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{item.Title}</Text>
          <Text style={styles.text}>{item.Plot}</Text>
        </View>
      </ScrollView>
    );
  }
}
