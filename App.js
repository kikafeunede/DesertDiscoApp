import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserProvider, useUser } from './src/context/UserContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import ItineraryScreen from './src/screens/ItineraryScreen';
import PackingScreen from './src/screens/PackingScreen';
import ScavengerHuntScreen from './src/screens/ScavengerHuntScreen';

const Tab = createBottomTabNavigator();

function AppContent() {
  const { currentUser, isLoading } = useUser();

  // TEMPORARY: Clear saved user on app load (remove this after testing)
  // useEffect(() => {
  //   AsyncStorage.removeItem('currentUser');
  // }, []);

  // Show loading spinner while checking for saved user
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F1E8' }}>
        <ActivityIndicator size="large" color="#ba005f" />
      </View>
    );
  }

  // Show welcome screen if no user selected
  if (!currentUser) {
    return <WelcomeScreen />;
  }

  // Show main app if user is selected
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
            backgroundColor: '#F5F1E8',
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

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
