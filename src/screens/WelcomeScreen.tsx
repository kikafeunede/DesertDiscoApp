// src/screens/WelcomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const colors = {
  chartreuse: '#bcaa01',
  orange: '#ef7102',
  plum: '#782946',
  oliveGreen: '#777c3e',
  magenta: '#ba005f',
  background: '#F5F1E8',
  text: '#2F4F4F',
};

const WelcomeScreen = ({ navigation }) => {
  const { setCurrentUser, setUserTeam, allUsers } = useUser();
  const [selectedName, setSelectedName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('currentUser');
      if (savedUser) {
        setIsLoggedIn(true);
        setSelectedName(savedUser);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  const handleSelectName = (name) => {
    setSelectedName(name);
  };

  const handleContinue = async () => {
    if (!selectedName) {
      Alert.alert('Select Your Name', 'Please select your name to continue');
      return;
    }

    try {
      await AsyncStorage.setItem('currentUser', selectedName);
      const user = allUsers.find(u => u.name === selectedName);
      if (user) {
        setCurrentUser(selectedName);
        setUserTeam(user.team);
        navigation.replace('Main');
      }
    } catch (error) {
      console.log('Error saving user:', error);
      Alert.alert('Error', 'Could not save your selection. Please try again.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Change Name',
      'Do you want to select a different name?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Change',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('currentUser');
              setIsLoggedIn(false);
              setSelectedName(null);
            } catch (error) {
              console.log('Error logging out:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>🌵 Desert Disco 🌵</Text>
          <Text style={styles.subtitle}>Santa Fe Bachelorette Weekend</Text>
          <Text style={styles.dates}>January 17-20, 2025</Text>
        </View>

        {isLoggedIn && (
          <View style={styles.loggedInBanner}>
            <View style={styles.loggedInInfo}>
              <Icon name="check-circle" size={24} color={colors.chartreuse} />
              <Text style={styles.loggedInText}>Logged in as {selectedName}</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Icon name="edit" size={20} color={colors.magenta} />
              <Text style={styles.logoutButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isLoggedIn ? 'Or select a different name:' : 'Who are you?'}
          </Text>
          <Text style={styles.sectionSubtitle}>Select your name to continue</Text>

          <View style={styles.namesGrid}>
            {allUsers.map((user) => (
              <TouchableOpacity
                key={user.name}
                style={[
                  styles.nameCard,
                  selectedName === user.name && styles.nameCardSelected,
                ]}
                onPress={() => handleSelectName(user.name)}
              >
                <View style={styles.nameCardContent}>
                  <Text style={[
                    styles.nameText,
                    selectedName === user.name && styles.nameTextSelected
                  ]}>
                    {user.name}
                  </Text>
                  <Text style={[
                    styles.teamText,
                    selectedName === user.name && styles.teamTextSelected
                  ]}>
                    Team {user.team}
                  </Text>
                  {user.hasLoggedIn && (
                    <View style={styles.loggedInBadge}>
                      <Icon name="check-circle" size={14} color={colors.chartreuse} />
                      <Text style={styles.loggedInBadgeText}>Active</Text>
                    </View>
                  )}
                </View>
                {selectedName === user.name && (
                  <Icon name="check-circle" size={28} color={colors.chartreuse} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, !selectedName && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedName}
        >
          <Text style={styles.continueButtonText}>
            {isLoggedIn ? 'Continue' : 'Let\'s Go!'}
          </Text>
          <Icon name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
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
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.magenta,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: colors.plum,
    marginBottom: 5,
    textAlign: 'center',
  },
  dates: {
    fontSize: 16,
    color: colors.oliveGreen,
    textAlign: 'center',
  },
  loggedInBanner: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loggedInInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  loggedInText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.magenta,
    marginLeft: 6,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: colors.oliveGreen,
    marginBottom: 20,
  },
  namesGrid: {
    gap: 12,
  },
  nameCard: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameCardSelected: {
    borderColor: colors.chartreuse,
    backgroundColor: '#f8fef0',
  },
  nameCardContent: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  nameTextSelected: {
    color: colors.magenta,
  },
  teamText: {
    fontSize: 14,
    color: colors.oliveGreen,
  },
  teamTextSelected: {
    color: colors.plum,
    fontWeight: '600',
  },
  loggedInBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  loggedInBadgeText: {
    fontSize: 12,
    color: colors.chartreuse,
    marginLeft: 4,
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: 10,
  },
  continueButton: {
    backgroundColor: colors.magenta,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: colors.oliveGreen,
    opacity: 0.5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default WelcomeScreen;
