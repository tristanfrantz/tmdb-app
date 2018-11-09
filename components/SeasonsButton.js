import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: 'lightgray',
    borderBottomColor: 'lightgray',
    marginTop: 10,
  },
  text: {
    flex: 8,
    fontSize: 16,
    color: 'gray',
  },
  plotArrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class SeasonsButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.text}>Seasons</Text>
        <View style={styles.plotArrow}>
          <Icon size={22} name="angle-right" />
        </View>
      </TouchableOpacity>
    );
  }
}

export default SeasonsButton;
