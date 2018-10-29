import React from 'react';
import { View, Text } from 'react-native';

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
    };
  }

  componentDidMount() {
    console.log(this.props);
    const apiKey = '61930aa1';
    const { imdbID } = this.props.navigation.state.params;

    fetch(`http://omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
      .then(res => res.json())
      .then(res => this.setState({ details: res }))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { details } = this.state;
    return (
      <View>
        <Text>{details.Title}</Text>
        <Text>{details.Runtime}</Text>
      </View>
    );
  }
}

export default MovieDetails;
