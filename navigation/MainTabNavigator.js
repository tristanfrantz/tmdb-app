import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import WatchlistScreen from '../screens/WatchlistScreen';
import MovieScreen from '../screens/MovieScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SeriesScreen from '../screens/SeriesScreen';
import PlotScreen from '../screens/PlotScreen';
import BiographyScreen from '../screens/BiographyScreen';
import RatingScreen from '../screens/RatingScreen';
import SeasonsScreen from '../screens/SeasonsScreen';
import CategoryScreen from '../screens/CategoryScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: 'Home',
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
      headerBackTitle: 'Back',
    }),
  },
  Movie: {
    screen: MovieScreen,
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
  Seasons: {
    screen: SeasonsScreen,
    navigationOptions: () => ({
      title: 'Seasons',
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
  Category: {
    screen: CategoryScreen,
    navigationOptions: () => ({
      headerBackTitle: 'Back',
    }),
  },
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
  Movie: {
    screen: MovieScreen,
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
  Seasons: {
    screen: SeasonsScreen,
    navigationOptions: () => ({
      title: 'Seasons',
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
    navigationOptions: () => ({
      title: 'Watchlist',
    }),
    headerTitleStyle: {
      ...Platform.select({
        android: {
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      }),
    },
  },
  Movie: {
    screen: MovieScreen,
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
  Seasons: {
    screen: SeasonsScreen,
    navigationOptions: () => ({
      title: 'Seasons',
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

const MainTabNavigator = createBottomTabNavigator({
  HomeStack,
  SearchStack,
  WatchlistStack,
});

export default MainTabNavigator;
