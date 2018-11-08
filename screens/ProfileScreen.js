import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import ActorDetails from '../components/ActorDetails';

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
        <ActorDetails navigation={this.props.navigation} />
      </View>
    );
  }
}

export default ProfileScreen;
