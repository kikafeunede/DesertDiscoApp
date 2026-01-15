// src/screens/PackingListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const PackingListScreen = () => {
  const { currentUser } = useUser();
  const [packingItems, setPackingItems] = useState({});
  const [customItems, setCustomItems] = useState({});
  const [newItemText, setNewItemText] = useState('');
  const [newItemDay, setNewItemDay] = useState('General');

  const defaultItems = {
    'General': [
      'Undies',
      'Sunglasses',
      'Sunscreen',
      'Wallet/ID',
      'Sweatshirts',
      'Warm layers',
      'Hat for sun',
      'Gloves',
      'Warm socks',
    ],
    'Friday': [
      'Warm clothes for Friday Happy Hour near the hotel',
    ],
    'Saturday': [
      'Bathing suit for hot springs',
      'Robe',
      'Hiking/walking clothes',
      'Exercise shoes',
      'Daytime clothes for brunch/lunch',
      'Cozy clothes for hanging at home / getting ready',
      'Desert Disco Outfit',
    ],
    'Sunday': [
      'Hiking/walking clothes',
      'Warm clothes for Saturday activity in town',
      'Cozy clothes for dinner at home',
    ],
  };

  const openPinterest = () => {
    Linking.openURL('https://www.pinterest.com/cheboludaaa/desert-disco/');
  };

  useEffect(() => {
    loadPackingList();
  }, [currentUser]);

  const loadPackingList = async () => {
    if (!currentUser) return;
    
    try {
      const saved = await AsyncStorage.getItem(`packingList_${currentUser}`);
      const savedCustom = await AsyncStorage.getItem(`customItems_${currentUser}`);
      
      if (saved) {
        setPackingItems(JSON.parse(saved));
      }
      if (savedCustom) {
        setCustomItems(JSON.parse(savedCustom));
      }
    } catch (error) {
      console.log('Error loading packing list:', error);
    }
  };

  const savePackingList = async (items) => {
    if (!currentUser) return;
    
    try {
      await AsyncStorage.setItem(`packingList_${currentUser}`, JSON.stringify(items));
    } catch (error) {
      console.log('Error saving packing list:', error);
    }
  };

  const saveCustomItems = async (items) => {
    if (!currentUser) return;
    
    try {
      await AsyncStorage.setItem(`customItems_${currentUser}`, JSON.stringify(items));
    } catch (error) {
      console.log('Error saving custom items:', error);
    }
  };

  const toggleItem = (day, item) => {
    const key = `${day}_${item}`;
    const newPackingItems = {
      ...packingItems,
      [key]: !packingItems[key],
    };
    setPackingItems(newPackingItems);
    savePackingList(newPackingItems);
  };

  const addCustomItem = () => {
    if (!newItemText.trim()) {
      Alert.alert('Error', 'Please enter an item');
      return;
    }

    const newCustomItems = {
      ...customItems,
      [newItemDay]: [...(customItems[newItemDay] || []), newItemText.trim()],
    };
    
    setCustomItems(newCustomItems);
    saveCustomItems(newCustomItems);
    setNewItemText('');
    Alert.alert('Success', 'Item added!');
  };

  const deleteCustomItem = (day, item) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const newCustomItems = {
              ...customItems,
              [day]: customItems[day].filter(i => i !== item),
            };
            setCustomItems(newCustomItems);
            saveCustomItems(newCustomItems);
          },
        },
      ]
    );
  };

  const getDayColor = (day) => {
    const colorMap = {
      'Thursday': colors.magenta,
      'Friday': colors.orange,
      'Saturday': colors.plum,
      'Sunday': colors.chartreuse,
      'General': colors.oliveGreen,
    };
    return colorMap[day] || colors.text;
  };

  const getProgress = () => {
    let total = 0;
    let checked = 0;

    Object.keys(defaultItems).forEach(day => {
      total += defaultItems[day].length;
      defaultItems[day].forEach(item => {
        if (packingItems[`${day}_${item}`]) checked++;
      });
    });

    Object.keys(customItems).forEach(day => {
      total += (customItems[day] || []).length;
      (customItems[day] || []).forEach(item => {
        if (packingItems[`${day}_${item}`]) checked++;
      });
    });

    return total > 0 ? Math.round((checked / total) * 100) : 0;
  };

  const progress = getProgress();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Packing List</Text>
        <Text style={styles.headerSubtitle}>Get ready for Santa Fe! 🏜️</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}% Packed</Text>
        </View>
      </View>

      {Object.keys(defaultItems).map((day, index) => (
        <View key={index} style={styles.daySection}>
          <View style={[styles.dayHeader, { backgroundColor: getDayColor(day) }]}>
            <Icon name="luggage" size={20} color="white" />
            <Text style={styles.dayTitle}>{day}</Text>
          </View>

          {defaultItems[day].map((item, itemIndex) => {
            const key = `${day}_${item}`;
            const isChecked = packingItems[key];
            const isDesertDiscoOutfit = item === 'Desert Disco Outfit';
            
            return (
              <View key={itemIndex}>
                <TouchableOpacity
                  style={styles.itemRow}
                  onPress={() => toggleItem(day, item)}
                >
                  <Icon
                    name={isChecked ? 'check-box' : 'check-box-outline-blank'}
                    size={24}
                    color={isChecked ? colors.chartreuse : colors.oliveGreen}
                  />
                  <Text style={[styles.itemText, isChecked && styles.itemChecked]}>
                    {item}
                  </Text>
                </TouchableOpacity>
                
                {isDesertDiscoOutfit && (
                  <TouchableOpacity
                    style={styles.pinterestButton}
                    onPress={openPinterest}
                  >
                    <Icon name="checkroom" size={16} color="white" />
                    <Text style={styles.pinterestButtonText}>View Desert Disco Inspo</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}

          {(customItems[day] || []).map((item, itemIndex) => {
            const key = `${day}_${item}`;
            const isChecked = packingItems[key];
            
            return (
              <View key={`custom_${itemIndex}`} style={styles.itemRow}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => toggleItem(day, item)}
                >
                  <Icon
                    name={isChecked ? 'check-box' : 'check-box-outline-blank'}
                    size={24}
                    color={isChecked ? colors.chartreuse : colors.oliveGreen}
                  />
                  <Text style={[styles.itemText, isChecked && styles.itemChecked]}>
                    {item}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteCustomItem(day, item)}>
                  <Icon name="delete" size={20} color={colors.orange} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ))}

      <View style={styles.addItemSection}>
        <Text style={styles.addItemTitle}>Add Custom Item</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Item name"
            value={newItemText}
            onChangeText={setNewItemText}
            placeholderTextColor={colors.oliveGreen}
          />
          
          <View style={styles.daySelector}>
            {Object.keys(defaultItems).map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  newItemDay === day && { backgroundColor: getDayColor(day) },
                ]}
                onPress={() => setNewItemDay(day)}
              >
                <Text style={[
                  styles.dayButtonText,
                  newItemDay === day && styles.dayButtonTextActive,
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addCustomItem}>
            <Icon name="add-circle" size={24} color="white" />
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.magenta,
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  progressContainer: {
    width: '100%',
    marginTop: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.chartreuse,
  },
  progressText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  daySection: {
    marginBottom: 20,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 10,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 4,
    padding: 15,
    borderRadius: 8,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  itemChecked: {
    textDecorationLine: 'line-through',
    color: colors.oliveGreen,
  },
  pinterestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#470353',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 15,
    marginTop: 4,
    marginBottom: 8,
  },
  pinterestButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  addItemSection: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
  },
  addItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  inputContainer: {
    gap: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.chartreuse,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  daySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: colors.background,
  },
  dayButtonText: {
    fontSize: 14,
    color: colors.text,
  },
  dayButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: colors.magenta,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default PackingListScreen;
