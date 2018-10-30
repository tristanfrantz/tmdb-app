import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DetailsScreen from '../screens/DetailsScreen';
import PlotScreen from '../screens/PlotScreen';

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

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
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
  SettingsStack,
});
