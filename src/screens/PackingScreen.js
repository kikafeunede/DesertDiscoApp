// src/screens/PackingScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const PackingScreen = () => {
  const { currentUser } = useUser();
  const [packingItems, setPackingItems] = useState({
    general: [
      { id: 1, name: 'Undies', packed: false },
      { id: 2, name: 'Socks', packed: false },
      { id: 3, name: 'Wallet/ID', packed: false },
      { id: 4, name: 'Phone charger', packed: false },
      { id: 5, name: 'Sunglasses', packed: false },
      { id: 6, name: 'Toiletries (sunscreen, moisturizer, aquaphor)', packed: false },
      { id: 7, name: 'Warm layers, long sleeves', packed: false },
      { id: 8, name: 'Sweatshirt(s)', packed: false },
      { id: 9, name: 'Warm jacket', packed: false },
      { id: 10, name: 'Hat for sun', packed: false },
      { id: 11, name: 'Gloves', packed: false },
      { id: 12, name: 'Warm socks', packed: false },
    ],
    friday: [
      { id: 13, name: 'Warm clothes for Friday quick Happy Hour near the hotel', packed: false },
      { id: 14, name: '2-4x $1 bills if you have them', packed: false },
    ],
    saturday: [
      { id: 15, name: 'Hiking/walking clothes', packed: false },
      { id: 16, name: 'Exercise shoes', packed: false },
      { id: 17, name: 'Daytime clothes for brunch/lunch in town', packed: false },
      { id: 18, name: 'Cozy clothes for hanging at home / getting ready', packed: false },
      { id: 19, name: 'Going out clothes (think Disco, color, sparkle) - see Pinterest for inspiration', packed: false, link: 'https://www.pinterest.com/cheboludaaa/desert-disco/' },
    ],
    sunday: [
      { id: 20, name: 'Hiking/walking clothes (can repeat if you don\'t smell bad)', packed: false },
      { id: 21, name: 'Bathing suit', packed: false },
      { id: 22, name: 'Robe for spa if desired', packed: false },
      { id: 23, name: 'Comfortable, warm day clothes for activity', packed: false },
      { id: 24, name: 'Cozy clothes for at home dinner', packed: false },
    ],
  });

  // Load user's packing list when user changes
  useEffect(() => {
    if (currentUser) {
      loadPackingList();
    }
  }, [currentUser]);

  const loadPackingList = async () => {
    try {
      const savedList = await AsyncStorage.getItem(`packingList_${currentUser}`);
      if (savedList) {
        setPackingItems(JSON.parse(savedList));
      } else {
        // If no saved list, start with default
        savePackingList(packingItems);
      }
    } catch (error) {
      console.log('Error loading packing list:', error);
    }
  };

  const savePackingList = async (items) => {
    try {
      await AsyncStorage.setItem(`packingList_${currentUser}`, JSON.stringify(items));
    } catch (error) {
      console.log('Error saving packing list:', error);
    }
  };

  const toggleItem = (category, itemId) => {
    if (!currentUser) {
      Alert.alert('Select Your Name', 'Please select your name first to save your packing progress!');
      return;
    }

    const updatedItems = {
      ...packingItems,
      [category]: packingItems[category].map(item =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      ),
    };
    setPackingItems(updatedItems);
    savePackingList(updatedItems);
  };

  const resetList = () => {
    if (!currentUser) {
      Alert.alert('Select Your Name', 'Please select your name first!');
      return;
    }

    Alert.alert(
      'Reset Packing List',
      'Are you sure you want to uncheck all items?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            const resetItems = {};
            Object.keys(packingItems).forEach(category => {
              resetItems[category] = packingItems[category].map(item => ({
                ...item,
                packed: false
              }));
            });
            setPackingItems(resetItems);
            savePackingList(resetItems);
          }
        }
      ]
    );
  };

  const calculateProgress = () => {
    const allItems = Object.values(packingItems).flat();
    const packedItems = allItems.filter(item => item.packed).length;
    const totalItems = allItems.length;
    const percentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;
    return { packedItems, totalItems, percentage };
  };

  const getCategoryIcon = (category) => {
    const icons = {
      general: 'backpack',
      friday: 'local-bar',
      saturday: 'celebration',
      sunday: 'spa',
    };
    return icons[category] || 'check';
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      general: colors.magenta,
      friday: colors.orange,
      saturday: colors.chartreuse,
      sunday: colors.plum,
    };
    return categoryColors[category] || colors.oliveGreen;
  };

  const { packedItems, totalItems, percentage } = calculateProgress();

  return (
    <ScrollView style={styles.container}>
      {/* Progress Header */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>
          {currentUser ? `${currentUser}'s Packing Progress` : 'Packing Progress'}
        </Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {packedItems} of {totalItems} items packed ({percentage}%)
        </Text>

        {percentage === 100 && (
          <View style={styles.completeBadge}>
            <Icon name="verified" size={24} color="white" />
            <Text style={styles.completeText}>All packed! 🎉</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetList}
        >
          <Icon name="refresh" size={20} color={colors.magenta} />
          <Text style={styles.resetButtonText}>Reset All</Text>
        </TouchableOpacity>
      </View>

      {/* Trip Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Santa Fe Packing Tips</Text>
        <Text style={styles.tipsText}>
          • Layer up! Temps swing 20-30 degrees from day to night{'\n'}
          • High altitude = dry air (bring moisturizer & lip balm){'\n'}
          • Walking shoes are a must{'\n'}
        </Text>
      </View>

      {/* Packing Categories */}
      {Object.keys(packingItems).map((category) => {
        const categoryItems = packingItems[category];
        const packedCount = categoryItems.filter(item => item.packed).length;
        const totalCount = categoryItems.length;

        return (
          <View key={category} style={styles.categoryContainer}>
            <View style={[styles.categoryHeader, { backgroundColor: getCategoryColor(category) }]}>
              <Icon name={getCategoryIcon(category)} size={24} color="white" />
              <Text style={styles.categoryTitle}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
              <Text style={styles.categoryCount}>
                {packedCount}/{totalCount}
              </Text>
            </View>

            <View style={styles.itemsContainer}>
              {categoryItems.map((item) => (
                <View key={item.id} style={styles.itemRow}>
                  <TouchableOpacity
                    style={styles.itemCheckContainer}
                    onPress={() => toggleItem(category, item.id)}
                    disabled={!currentUser}
                  >
                    <View style={[
                      styles.checkbox,
                      item.packed && styles.checkedBox,
                      !currentUser && styles.disabledBox
                    ]}>
                      {item.packed && (
                        <Icon name="check" size={20} color="white" />
                      )}
                    </View>
                    <Text style={[
                      styles.itemText,
                      item.packed && styles.packedItemText
                    ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  {item.link && (
                    <TouchableOpacity
                      style={styles.linkButton}
                      onPress={() => {
                        Linking.openURL(item.link).catch(err => 
                          Alert.alert('Error', 'Could not open Pinterest link')
                        );
                      }}
                    >
                      <Icon name="open-in-new" size={20} color={colors.magenta} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
        );
      })}

      {/* Reminder */}
      {!currentUser && (
        <View style={styles.reminderContainer}>
          <Icon name="info" size={24} color={colors.orange} />
          <Text style={styles.reminderText}>
            Select your name to save your packing progress!
          </Text>
        </View>
      )}

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.chartreuse,
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    color: colors.oliveGreen,
    textAlign: 'center',
  },
  completeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.chartreuse,
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  completeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.magenta,
  },
  resetButtonText: {
    color: colors.magenta,
    fontWeight: '600',
    marginLeft: 8,
  },
  tipsContainer: {
    backgroundColor: colors.plum,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: 'white',
    lineHeight: 22,
  },
  categoryContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  categoryTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  categoryCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  itemsContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemCheckContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.oliveGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: colors.chartreuse,
    borderColor: colors.chartreuse,
  },
  disabledBox: {
    opacity: 0.5,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  packedItemText: {
    textDecorationLine: 'line-through',
    color: colors.oliveGreen,
  },
  linkButton: {
    padding: 8,
    marginLeft: 10,
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.orange,
  },
  reminderText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: colors.text,
  },
  bottomSpacer: {
    height: 30,
  },
});

export default PackingScreen;
