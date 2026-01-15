// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../config/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userTeam, setUserTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  // Fixed team assignments with 15 people - YOUR ACTUAL NAMES
  const teamAssignments = {
    'Kika': 'Green Chiles',
    'Ellen': 'Green Chiles',
    'Mackenzie': 'Green Chiles',
    'Kenzie': 'Green Chiles',
    'Rylee': 'Green Chiles',
    
    'Kailey': 'Sopaipillas',
    'Sydney': 'Sopaipillas',
    'Zoey': 'Sopaipillas',
    'Melanie': 'Sopaipillas',
    'Liz': 'Sopaipillas',
    
    'Mia': 'Frito Pies',
    'Sam': 'Frito Pies',
    'Hayley': 'Frito Pies',
    'Alyssa': 'Frito Pies',
    'JD': 'Frito Pies',
  };

  useEffect(() => {
    loadUser();
    
    // Real-time listener for all users from Firebase
    const unsubscribe = onSnapshot(doc(db, 'users', 'all-users'), (doc) => {
      if (doc.exists()) {
        setAllUsers(doc.data().users || []);
      } else {
        setAllUsers([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('currentUser');
      const savedTeam = await AsyncStorage.getItem('userTeam');
      
      if (savedUser && savedTeam) {
        setCurrentUser(savedUser);
        setUserTeam(savedTeam);
      }
    } catch (error) {
      console.log('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAllUsersToFirebase = async (users) => {
    try {
      await setDoc(doc(db, 'users', 'all-users'), { users });
    } catch (error) {
      console.log('Error saving users to Firebase:', error);
    }
  };

  const selectUser = async (name) => {
    try {
      await AsyncStorage.setItem('currentUser', name);
      setCurrentUser(name);
      
      // Get pre-assigned team
      const team = teamAssignments[name];
      
      if (team) {
        await AsyncStorage.setItem('userTeam', team);
        setUserTeam(team);
        
        // Update all users list
        const updatedUsers = [...(allUsers || [])];
        const existingIndex = updatedUsers.findIndex(u => u.name === name);
        
        if (existingIndex >= 0) {
          updatedUsers[existingIndex] = { name, team };
        } else {
          updatedUsers.push({ name, team });
        }
        
        // Save to Firebase (this will trigger the real-time listener)
        await saveAllUsersToFirebase(updatedUsers);
      }
      
    } catch (error) {
      console.log('Error selecting user:', error);
    }
  };

  const getUsersByTeam = (team) => {
    // Get all assigned users for this team
    const assignedUsers = Object.entries(teamAssignments)
      .filter(([_, assignedTeam]) => assignedTeam === team)
      .map(([name, _]) => name);
    
    // Filter to only show users who have logged in
    const loggedInUsers = (allUsers || []).filter(u => u.team === team);
    
    // Return assigned users with their login status
    return assignedUsers.map(name => ({
      name,
      team,
      hasLoggedIn: loggedInUsers.some(u => u.name === name)
    }));
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      userTeam, 
      isLoading, 
      selectUser,
      allUsers: allUsers || [],
      getUsersByTeam,
      teamAssignments
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
