import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
} from 'react-navigation';

import { SearchBar } from 'react-native-elements';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import WatchlistScreen from '../screens/WatchlistScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SeriesScreen from '../screens/SeriesScreen';
import PlotScreen from '../screens/PlotScreen';
import BiographyScreen from '../screens/BiographyScreen';
import RatingScreen from '../screens/RatingScreen';

const styles = StyleSheet.create({
  header: {
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#e1e8ee',
    width: '100%',
  },
});

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-home'}
    />
  ),
};

const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      header: null,
      headerTitleStyle: {
        ...Platform.select({
          android: {
            marginLeft: 'auto',
            marginRight: 'auto',
          },
        }),
      },
    }),
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: () => ({
      title: 'Movie',
      headerBackTitle: 'Back',
    }),
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: 'Profile',
      headerBackTitle: 'Back',
    }),
  },
  Series: {
    screen: SeriesScreen,
    navigationOptions: () => ({
      title: 'Series',
      headerBackTitle: 'Back',
    }),
  },
  Plot: {
    screen: PlotScreen,
    navigationOptions: () => ({
      title: 'Plot',
    }),
  },
  Biography: {
    screen: BiographyScreen,
    navigationOptions: () => ({
      title: 'Biography',
    }),
  },
  Rating: {
    screen: RatingScreen,
    navigationOptions: () => ({
      title: 'Rating',
    }),
  },
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-search${focused ? '' : '-outline'}` : 'md-search'}
    />
  ),
};

const WatchlistStack = createStackNavigator({
  Watchlist: {
    screen: WatchlistScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <View style={styles.header}>
          <SearchBar
            lightTheme
            onFocus={() => {
              navigation.dispatch(NavigationActions.navigate({ routeName: 'Search' }));
              this.searchFocus.blur();
            }}
            containerStyle={{ backgroundColor: 'white' }}
            round
            placeholder="Search movies, series or actors..."
            ref={(s) => {
              this.searchFocus = s;
            }}
          />
        </View>
      ),
    }),
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      header: null,
      headerTitleStyle: {
        ...Platform.select({
          android: {
            marginLeft: 'auto',
            marginRight: 'auto',
          },
        }),
      },
    }),
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: () => ({
      title: 'Movie',
      headerBackTitle: 'Back',
    }),
  },
  Series: {
    screen: SeriesScreen,
    navigationOptions: () => ({
      title: 'Series',
      headerBackTitle: 'Back',
    }),
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: 'Profile',
      headerBackTitle: 'Back',
    }),
  },
  Plot: {
    screen: PlotScreen,
    navigationOptions: () => ({
      title: 'Plot',
    }),
  },
  Biography: {
    screen: BiographyScreen,
    navigationOptions: () => ({
      title: 'Biography',
    }),
  },
  Rating: {
    screen: RatingScreen,
    navigationOptions: () => ({
      title: 'Rating',
    }),
  },
});

WatchlistStack.navigationOptions = {
  tabBarLabel: 'Watchlist',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-heart${focused ? '' : '-outline'}` : 'md-heart'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SearchStack,
  WatchlistStack,
});
