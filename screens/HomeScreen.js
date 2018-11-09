import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HomeCarousel from '../components/HomeCarousel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {},
  carouselContainer: {
    height: 300,
  },
  boxesContainer: {
    height: 400,
    margin: 10,




























































    
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  colContainer: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
  },
});

export default class HomeScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.carouselContainer}>
          <HomeCarousel />
        </View>
        <View style={styles.boxesContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.colContainer} />
            <TouchableOpacity style={styles.colContainer} />
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.colContainer} />
            <TouchableOpacity style={styles.colContainer} />
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.colContainer} />
            <TouchableOpacity style={styles.colContainer} />
          </View>
        </View>
      </ScrollView>
    );
  }
}
