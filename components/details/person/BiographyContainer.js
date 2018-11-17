import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bioContainer: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  bioTextContainer: {
    flex: 8,
  },
  plotArrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class PlotContainer extends React.Component {
  render() {
    const { navigation, person } = this.props;
    return (
      <View style={styles.container}>
        {person.biography ? (
          <TouchableOpacity
            style={styles.bioContainer}
            onPress={() => navigation.navigate('Biography', person)}
          >
            <View style={styles.bioTextContainer}>
              <Text numberOfLines={4}>{person.biography}</Text>
            </View>
            <View style={styles.plotArrow}>
              <Icon size={22} name="angle-right" />
            </View>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

export default PlotContainer;
