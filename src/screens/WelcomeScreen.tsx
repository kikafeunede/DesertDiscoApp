// src/screens/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  const { selectUser, users } = useUser();

  const handleSelectUser = (user: any) => {
    selectUser(user);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🏜️</Text>
        <Text style={styles.title}>Desert Disco</Text>
        <Text style={styles.subtitle}>Santa Fe Bachelorette Weekend</Text>
        <Text style={styles.dates}>January 16-19, 2025</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeTitle}>Welcome! Who are you?</Text>
        <Text style={styles.welcomeSubtitle}>
          Select your name to personalize your trip experience
        </Text>

        <ScrollView style={styles.userList}>
          {users.map((user) => (
            <TouchableOpacity
              key={user}
              style={styles.userCard}
              onPress={() => handleSelectUser(user)}
            >
              <Icon name="person" size={24} color={colors.magenta} />
              <Text style={styles.userName}>{user}</Text>
              <Icon name="arrow-forward" size={24} color={colors.oliveGreen} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Your selection will be saved and you can access your personalized packing list and trip details.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.magenta,
    padding: 40,
    alignItems: 'center',
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  dates: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: colors.oliveGreen,
    marginBottom: 20,
    textAlign: 'center',
  },
  userList: {
    flex: 1,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    flex: 1,
    fontSize: 18,
    color: colors.text,
    fontWeight: '600',
    marginLeft: 15,
  },
  footer: {
    backgroundColor: colors.plum,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  footerText: {
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default WelcomeScreen;
