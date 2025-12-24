// src/components/UserHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

const UserHeader = () => {
  const { currentUser } = useUser();

  if (!currentUser) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.greeting}>
          <Text style={styles.hiText}>Hi,</Text>
          <Text style={styles.nameText}>{currentUser}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E4DA',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  hiText: {
    fontSize: 16,
    color: colors.oliveGreen,
    marginRight: 6,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.magenta,
  },
});

export default UserHeader;