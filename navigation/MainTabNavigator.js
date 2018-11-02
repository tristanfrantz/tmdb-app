import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import WatchlistScreen from '../screens/WatchlistScreen';
import DetailsScreen from '../screens/DetailsScreen';
import PlotScreen from '../screens/PlotScreen';
import RatingScreen from '../screens/RatingScreen';

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
      title: 'Search',
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
      title: 'Details',
    }),
  },
  Plot: {
    screen: PlotScreen,
    navigationOptions: () => ({
      title: 'Plot',
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
    navigationOptions: () => ({
      title: 'Watchlist',
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
      title: 'Details',
    }),
  },
  Plot: {
    screen: PlotScreen,
    navigationOptions: () => ({
      title: 'Plot',
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
