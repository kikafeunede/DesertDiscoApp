// src/screens/WalletScreen.js - Updated with new colors
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WalletScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎫 Digital Wallet</Text>
      <Text style={styles.subtitle}>Your tickets & passes</Text>
      <Text style={styles.emoji}>🎟️✨</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F1E8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ba005f', // Updated magenta
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777c3e', // Updated olive
    marginBottom: 20,
  },
  emoji: {
    fontSize: 40,
  },
});

export default WalletScreen;
