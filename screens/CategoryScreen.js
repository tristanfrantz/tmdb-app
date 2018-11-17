import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import CategoryList from '../components/categories/CategoryList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  category: {
    fontSize: 22,
    textAlign: 'center',
  },
});

class CategoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params,
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
  });

  render() {
    return (
      <View style={styles.container}>
        <CategoryList navigation={this.props.navigation} />
      </View>
    );
  }
}

export default CategoryScreen;
