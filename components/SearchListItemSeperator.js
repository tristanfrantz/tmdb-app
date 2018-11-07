import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: '#c5c5c5',
    marginTop: 4,
    marginBottom: 4,
  },
});

class SearchListItemSeperator extends React.Component {
  render() {
    return <View style={styles.container} />;
  }
}

export default SearchListItemSeperator;
