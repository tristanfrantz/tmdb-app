import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import PersonDetails from '../components/details/person/PersonDetails';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class ProfileScreen extends React.Component {
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

  render() {
    return (
      <View style={styles.container}>
        <PersonDetails navigation={this.props.navigation} />
      </View>
    );
  }
}

export default ProfileScreen;
