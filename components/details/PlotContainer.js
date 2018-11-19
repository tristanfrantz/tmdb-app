import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  plotText: {
    color: '#fff',
  },
});

class PlotContainer extends React.Component {
  render() {
    const { navigation, item } = this.props;
    return (
      <View style={styles.container}>
        {item.overview ? (
          <TouchableOpacity
            style={styles.plotContainer}
            onPress={() => navigation.navigate('Plot', item)}
          >
            <View style={styles.plotTextContainer}>
              <Text style={styles.plotText} numberOfLines={4}>
                {item.overview}
              </Text>
            </View>
            <View style={styles.plotArrow}>
              <Icon color="gray" size={22} name="angle-right" />
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
