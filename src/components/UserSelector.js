// src/components/UserSelector.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
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

const UserSelector = () => {
  const { currentUser, selectUser, users } = useUser();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectUser = (user) => {
    selectUser(user);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="person" size={20} color={colors.magenta} />
        <Text style={styles.selectorText}>
          {currentUser || 'Select Your Name'}
        </Text>
        <Icon name="arrow-drop-down" size={24} color={colors.magenta} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Who are you?</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.userList}>
              {users.map((user) => (
                <TouchableOpacity
                  key={user}
                  style={[
                    styles.userItem,
                    currentUser === user && styles.selectedUserItem
                  ]}
                  onPress={() => handleSelectUser(user)}
                >
                  <Text style={[
                    styles.userName,
                    currentUser === user && styles.selectedUserName
                  ]}>
                    {user}
                  </Text>
                  {currentUser === user && (
                    <Icon name="check" size={24} color="white" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.magenta,
  },
  selectorText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  userList: {
    padding: 10,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  selectedUserItem: {
    backgroundColor: colors.magenta,
  },
  userName: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  selectedUserName: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserSelector;
