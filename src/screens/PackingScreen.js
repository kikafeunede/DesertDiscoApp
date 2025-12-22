// src/screens/PackingScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const colors = {
  chartreuse: '#bcaa01',
  orange: '#ef7102',
  plum: '#782946',
  oliveGreen: '#777c3e',
  magenta: '#ba005f',
  background: '#FFF8DC',
  text: '#2F4F4F',
};

const PackingScreen = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const packingCategories = [
    {
      title: '🏔️ High Desert Essentials',
      color: colors.magenta,
      items: [
        { id: 'layers', item: 'Layers! Temps vary 20-30°F day to night' },
        { id: 'sunscreen', item: 'Sunscreen (high altitude = strong UV)' },
        { id: 'sunglasses', item: 'Sunglasses' },
        { id: 'chapstick', item: 'Lip balm (dry climate)' },
        { id: 'moisturizer', item: 'Face & body moisturizer' },
        { id: 'waterBottle', item: 'Reusable water bottle' },
      ]
    },
    {
      title: '🥾 Adventure Gear',
      color: colors.chartreuse,
      items: [
        { id: 'hikingShoes', item: 'Hiking shoes/boots for Saturday morning' },
        { id: 'activewear', item: 'Workout/hiking clothes' },
        { id: 'daypack', item: 'Small daypack for hike' },
        { id: 'hatHike', item: 'Hat for sun protection' },
        { id: 'comfyShoes', item: 'Comfortable walking shoes' },
      ]
    },
    {
      title: '♨️ Hot Springs Ready',
      color: colors.orange,
      items: [
        { id: 'swimsuit', item: 'Bathing suit for Ten Thousand Waves' },
        { id: 'coverup', item: 'Cover-up or robe' },
        { id: 'flipflops', item: 'Flip flops or water shoes' },
        { id: 'hairTie', item: 'Hair tie (for hot springs)' },
        { id: 'towel', item: 'Quick-dry towel (optional)' },
      ]
    },
    {
      title: '🍽️ Dinner & Night Out',
      color: colors.plum,
      items: [
        { id: 'dressyOutfit1', item: 'Nice dinner outfit (Saturday)' },
        { id: 'goingOutOutfit', item: 'Going out outfit for nightlife' },
        { id: 'dressyShoes', item: 'Dressy shoes (low heels recommended)' },
        { id: 'jacket', item: 'Warm jacket/coat for evening' },
        { id: 'accessories', item: 'Jewelry & accessories' },
      ]
    },
    {
      title: '😴 Cozy Vibes',
      color: colors.oliveGreen,
      items: [
        { id: 'cozyClothes', item: 'Comfy clothes for Friday secret event' },
        { id: 'pajamas', item: 'Warm pajamas' },
        { id: 'slippers', item: 'Cozy slippers' },
        { id: 'sweater', item: 'Soft sweater or hoodie' },
        { id: 'leggings', item: 'Comfy leggings' },
      ]
    },
    {
      title: '🎉 Bachelorette Essentials',
      color: colors.magenta,
      items: [
        { id: 'camera', item: 'Camera or phone for photos' },
        { id: 'portableCharger', item: 'Portable phone charger' },
        { id: 'groupShirts', item: 'Matching group shirts (if planned)' },
        { id: 'decorations', item: 'Any bachelorette decorations' },
        { id: 'snacks', item: 'Favorite snacks for the house' },
      ]
    },
    {
      title: '🧴 Personal Care',
      color: colors.orange,
      items: [
        { id: 'toiletries', item: 'All toiletries & medications' },
        { id: 'makeup', item: 'Makeup & skincare' },
        { id: 'hairStuff', item: 'Hair products & styling tools' },
        { id: 'contacts', item: 'Contacts/glasses' },
        { id: 'firstAid', item: 'Any personal first aid items' },
      ]
    }
  ];

  const getProgress = () => {
    const totalItems = packingCategories.reduce((sum, category) => sum + category.items.length, 0);
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / totalItems) * 100);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🧳 Desert Disco Packing List</Text>
        <Text style={styles.subtitle}>Santa Fe High Desert Adventure</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Progress: {getProgress()}% packed</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${getProgress()}%` }]} />
          </View>
        </View>
      </View>

      <View style={styles.weatherReminder}>
        <Icon name="thermostat" size={20} color={colors.orange} />
        <Text style={styles.weatherText}>
          January weather: Highs 42-48°F, Lows 21-26°F. Pack layers!
        </Text>
      </View>

      {packingCategories.map((category, categoryIndex) => (
        <View key={categoryIndex} style={styles.categoryContainer}>
          <View style={[styles.categoryHeader, { backgroundColor: category.color }]}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </View>
          
          {category.items.map((packingItem, itemIndex) => (
            <TouchableOpacity
              key={packingItem.id}
              style={[
                styles.packingItem,
                checkedItems[packingItem.id] && styles.checkedItem
              ]}
              onPress={() => toggleItem(packingItem.id)}
            >
              <Icon 
                name={checkedItems[packingItem.id] ? 'check-box' : 'check-box-outline-blank'} 
                size={24} 
                color={checkedItems[packingItem.id] ? colors.chartreuse : colors.oliveGreen} 
              />
              <Text style={[
                styles.itemText,
                checkedItems[packingItem.id] && styles.checkedText
              ]}>
                {packingItem.item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 Packing Tips</Text>
        <View style={styles.tip}>
          <Text style={styles.tipText}>✈️ Pack layers in carry-on in case of lost luggage</Text>
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipText}>🌡️ High desert = big temperature swings, dress in layers</Text>
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipText}>👟 Bring broken-in shoes only - lots of walking!</Text>
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipText}>💧 Stay hydrated - high altitude + dry air</Text>
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
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    marginBottom: 15,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.chartreuse,
  },
  weatherReminder: {
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherText: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.text,
    flex: 1,
    fontWeight: '500',
  },
  categoryContainer: {
    margin: 15,
    marginBottom: 10,
  },
  categoryHeader: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  packingItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkedItem: {
    backgroundColor: '#f8f8f8',
    opacity: 0.7,
  },
  itemText: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: colors.oliveGreen,
  },
  tipsSection: {
    margin: 15,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  tip: {
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: colors.oliveGreen,
    lineHeight: 20,
  },
});

export default PackingScreen;
