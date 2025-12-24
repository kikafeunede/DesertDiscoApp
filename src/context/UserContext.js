// src/context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const users = [
    'Kika', 'Kailey', 'Mia', 'Kenzie', 'Beatrice', 'Sam', 
    'Zoey', 'Liz', 'Hayley', 'JD', 'Mel', 'Alyssa', 
    'Ellen', 'Mackenzie', 'Rylee', 'Sydney'
  ];

  // Load saved user on app start
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('currentUser');
      if (savedUser) {
        setCurrentUser(savedUser);
      }
    } catch (error) {
      console.log('Error loading user:', error);
    }
  };

  const selectUser = async (userName) => {
    try {
      await AsyncStorage.setItem('currentUser', userName);
      setCurrentUser(userName);
    } catch (error) {
      console.log('Error saving user:', error);
    }
  };

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      setCurrentUser(null);
    } catch (error) {
      console.log('Error clearing user:', error);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, selectUser, clearUser, users }}>
      {children}
    </UserContext.Provider>
  );
};
