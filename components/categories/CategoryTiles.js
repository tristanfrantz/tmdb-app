import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import Categories from '../../constants/Categories';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  colContainer: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#081c24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    fontSize: 21,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

class CategoryTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
  }

  onPress = (category) => {
    this.setState({ disabled: true });
    this.props.navigation.navigate('Category', category);
    setTimeout(() => {
      this.setState({
        disabled: false,
      });
    }, 100);
  };

  render() {
    // Prevents user double clicking too fast
    const { disabled } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.colContainer}
            onPress={() => this.onPress(Categories.UPCOMING_MOVIES)}
            disabled={disabled}
          >
            <Text style={styles.tileText}>{Categories.UPCOMING_MOVIES}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.colContainer}
            onPress={() => this.onPress(Categories.POPULAR_MOVIES)}
            disabled={disabled}
          >
            <Text style={styles.tileText}>{Categories.POPULAR_MOVIES}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.colContainer}
            onPress={() => this.onPress(Categories.POPULAR_SERIES)}
            disabled={disabled}
          >
            <Text style={styles.tileText}>{Categories.POPULAR_SERIES}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.colContainer}
            onPress={() => this.onPress(Categories.TOP_MOVIES)}
            disabled={disabled}
          >
            <Text style={styles.tileText}>{Categories.TOP_MOVIES}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.colContainer}
            onPress={() => this.onPress(Categories.TOP_SERIES)}
            disabled={disabled}
          >
            <Text style={styles.tileText}>{Categories.TOP_SERIES}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CategoryTiles;
