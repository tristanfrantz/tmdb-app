import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  plotContainer: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  plotTextContainer: {
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
    const { navigation, item } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {item.overview ? (
          <TouchableOpacity
            style={styles.plotContainer}
            onPress={() => navigation.push('Plot', item)}
          >
            <View style={styles.plotTextContainer}>
              <Text numberOfLines={4}>{item.overview}</Text>
            </View>
            <View style={styles.plotArrow}>
              <Icon size={22} name="angle-right" />
            </View>
          </TouchableOpacity>
        ) : (
          <Text />
        )}
      </View>
    );
  }
}

export default PlotContainer;
