// src/screens/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useUser } from '../context/UserContext';

const colors = {
  chartreuse: '#bcaa01',
  orange: '#ef7102',
  plum: '#782946',
  oliveGreen: '#777c3e',
  magenta: '#ba005f',
  background: '#F5F1E8',
  text: '#2F4F4F',
};

const WelcomeScreen = () => {
  const { selectUser, allUsers } = useUser();

  // YOUR 15 ACTUAL NAMES
  const allNames = [
    'Mackenzie', 'Melanie', 'Kenzie', 'Rylee', 'Sydney', 
    'Kika', 'Kailey', 'Alyssa', 'JD', 'Ellen', 
    'Mia', 'Sam', 'Hayley', 'Zoey', 'Liz'
  ];

  // Filter out already selected names
  const availableNames = allNames.filter(
    name => !(allUsers || []).some(u => u.name === name)
  );

  const handleSelectName = async (name) => {
    if (!name || name.trim() === '') {
      Alert.alert('Error', 'Please enter a name');
      return;
    }

    // Check if name is already taken
    if ((allUsers || []).some(u => u.name === name)) {
      Alert.alert('Name Taken', 'This name is already in use. Please choose another.');
      return;
    }

    // Check if name is in the list
    if (!allNames.includes(name)) {
      Alert.alert('Invalid Name', 'Please choose from the provided names.');
      return;
    }

    await selectUser(name.trim());
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🏜️ Desert Disco</Text>
        <Text style={styles.subtitle}>Santa Fe Bachelorette Weekend</Text>
        <Text style={styles.dates}>January 16-19, 2025</Text>

        <Text style={styles.instruction}>Who are you?</Text>

        <View style={styles.namesGrid}>
          {availableNames.map((name) => (
            <TouchableOpacity
              key={name}
              style={styles.nameButton}
              onPress={() => handleSelectName(name)}
            >
              <Text style={styles.nameButtonText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {(allUsers || []).length > 0 && (
          <View style={styles.usersCountContainer}>
            <Text style={styles.usersCountText}>
              {allUsers.length} of 15 have joined
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.magenta,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.plum,
    textAlign: 'center',
    marginBottom: 5,
  },
  dates: {
    fontSize: 16,
    color: colors.oliveGreen,
    textAlign: 'center',
    marginBottom: 40,
  },
  instruction: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  namesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  nameButton: {
    backgroundColor: colors.magenta,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nameButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  usersCountContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  usersCountText: {
    fontSize: 14,
    color: colors.plum,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
