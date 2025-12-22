import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './src/screens/HomeScreen';
import ItineraryScreen from './src/screens/ItineraryScreen';
import PackingScreen from './src/screens/PackingScreen';
import ScavengerHuntScreen from './src/screens/ScavengerHuntScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#ba005f',
          tabBarInactiveTintColor: '#777c3e',
          headerStyle: {
            backgroundColor: '#ba005f',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarStyle: {
            backgroundColor: '#FFF8DC',
            borderTopColor: '#bcaa01',
            borderTopWidth: 2,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Itinerary" 
          component={ItineraryScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="schedule" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Packing" 
          component={PackingScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="luggage" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Hunt" 
          component={ScavengerHuntScreen}
          options={{
            headerTitle: 'Scavenger Hunt',
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
