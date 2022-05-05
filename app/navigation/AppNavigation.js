import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Discovery from '../screens/Discovery';
import Player from '../screens/Player';
import PlayList from '../screens/PlayList';
import Setting from '../screens/Setting';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
export default function AppNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Discovery"
        component={Discovery}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="headphones" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Player"
        component={Player}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="compact-disc" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="PlayList"
        component={PlayList}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="bars" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
