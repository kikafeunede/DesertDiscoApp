// src/screens/LodgingScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
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

const LodgingScreen = () => {
  const [activeTab, setActiveTab] = useState('lodging');

  const lodgingInfo = {
    name: 'La Dea Santa Fe',
    address: '2861 Agua Fria St, Santa Fe, NM 87507',
    checkIn: '4:00 PM',
    checkOut: '11:00 AM',
    wifi: 'LaDeaGuest2025',
    parking: 'Free on-site parking available',
    amenities: [
      'Full Kitchen',
      'Washer & Dryer',
      'WiFi',
      'Fireplace',
      'Private Patio',
      'Mountain Views',
      'Hot Tub',
      'BBQ Grill'
    ],
    notes: [
      'Quiet hours after 10 PM',
      'No smoking anywhere on property',
      'Check recycling schedule on fridge',
      'Extra blankets in master bedroom closet'
    ]
  };

  const nearbySpots = [
    {
      name: 'Iconik Coffee Roasters',
      type: 'Coffee Shop',
      distance: '0.3 miles',
      walkTime: '6 min walk',
      description: 'Local favorite for specialty coffee',
      rating: '4.8⭐',
      priceRange: '$',
      hours: '6:30 AM - 6:00 PM'
    },
    {
      name: 'Whole Foods Market',
      type: 'Grocery',
      distance: '0.5 miles',
      walkTime: '10 min walk',
      description: 'Full grocery store for supplies',
      rating: '4.5⭐',
      priceRange: '$$',
      hours: '7:00 AM - 10:00 PM'
    },
    {
      name: 'Sazon',
      type: 'Restaurant',
      distance: '0.4 miles',
      walkTime: '8 min walk',
      description: 'Contemporary Mexican cuisine',
      rating: '4.7⭐',
      priceRange: '$$',
      hours: '5:00 PM - 9:00 PM'
    },
    {
      name: 'Midtown Bistro',
      type: 'Restaurant',
      distance: '0.6 miles',
      walkTime: '12 min walk',
      description: 'American fare with patio seating',
      rating: '4.4⭐',
      priceRange: '$$',
      hours: '11:00 AM - 9:00 PM'
    },
    {
      name: 'Paper Dosa',
      type: 'Restaurant',
      distance: '0.7 miles',
      walkTime: '14 min walk',
      description: 'South Indian street food',
      rating: '4.6⭐',
      priceRange: '$',
      hours: '11:30 AM - 2:30 PM, 5:30 PM - 9:00 PM'
    },
    {
      name: 'Chocolate Maven Bakery',
      type: 'Bakery/Cafe',
      distance: '0.8 miles',
      walkTime: '16 min walk',
      description: 'Artisanal chocolates & pastries',
      rating: '4.5⭐',
      priceRange: '$',
      hours: '7:00 AM - 6:00 PM'
    }
  ];

  const openMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://maps.apple.com/?q=${encodedAddress}`;
    Linking.openURL(mapsUrl);
  };

  const openPhone = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'lodging' && styles.activeTab]}
          onPress={() => setActiveTab('lodging')}
        >
          <Text style={[styles.tabText, activeTab === 'lodging' && styles.activeTabText]}>
            🏠 Our Place
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'spots' && styles.activeTab]}
          onPress={() => setActiveTab('spots')}
        >
          <Text style={[styles.tabText, activeTab === 'spots' && styles.activeTabText]}>
            📍 Nearby Spots
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'lodging' ? (
        // Lodging Information
        <View>
          <View style={styles.lodgingHeader}>
            <Text style={styles.lodgingName}>{lodgingInfo.name}</Text>
            <Text style={styles.address}>{lodgingInfo.address}</Text>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => openMaps(lodgingInfo.address)}
            >
              <Icon name="map" size={16} color="white" />
              <Text style={styles.mapButtonText}>Open in Maps</Text>
            </TouchableOpacity>
          </View>

          {/* Check-in Info */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>🗝️ Check-in Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Check-in:</Text>
              <Text style={styles.infoValue}>{lodgingInfo.checkIn}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Check-out:</Text>
              <Text style={styles.infoValue}>{lodgingInfo.checkOut}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>WiFi:</Text>
              <Text style={styles.wifiPassword}>{lodgingInfo.wifi}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Parking:</Text>
              <Text style={styles.infoValue}>{lodgingInfo.parking}</Text>
            </View>
          </View>

          {/* Amenities */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>✨ Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {lodgingInfo.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityTag}>
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* House Notes */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>📋 Important Notes</Text>
            {lodgingInfo.notes.map((note, index) => (
              <View key={index} style={styles.noteRow}>
                <Icon name="info" size={16} color={colors.orange} />
                <Text style={styles.noteText}>{note}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        // Nearby Spots
        <View>
          <Text style={styles.spotsHeader}>☕🍽️ Walking Distance from La Dea</Text>
          {nearbySpots.map((spot, index) => (
            <View key={index} style={styles.spotCard}>
              <View style={styles.spotHeader}>
                <View style={styles.spotInfo}>
                  <Text style={styles.spotName}>{spot.name}</Text>
                  <Text style={styles.spotType}>{spot.type} • {spot.priceRange}</Text>
                </View>
                <View style={styles.spotMeta}>
                  <Text style={styles.rating}>{spot.rating}</Text>
                  <Text style={styles.distance}>{spot.distance}</Text>
                  <Text style={styles.walkTime}>{spot.walkTime}</Text>
                </View>
              </View>
              
              <Text style={styles.spotDescription}>{spot.description}</Text>
              <Text style={styles.spotHours}>🕐 {spot.hours}</Text>
              
              <TouchableOpacity
                style={styles.directionsButton}
                onPress={() => openMaps(spot.name + ' Santa Fe NM')}
              >
                <Icon name="directions" size={16} color={colors.magenta} />
                <Text style={styles.directionsText}>Get Directions</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.magenta,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.oliveGreen,
  },
  activeTabText: {
    color: 'white',
  },
  lodgingHeader: {
    backgroundColor: colors.plum,
    margin: 15,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  lodgingName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  mapButton: {
    backgroundColor: colors.chartreuse,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  mapButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  infoCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.oliveGreen,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  wifiPassword: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.magenta,
    fontFamily: 'monospace',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityTag: {
    backgroundColor: colors.chartreuse,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    margin: 3,
  },
  amenityText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  noteText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  spotsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    margin: 20,
  },
  spotCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  spotInfo: {
    flex: 1,
  },
  spotName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 3,
  },
  spotType: {
    fontSize: 14,
    color: colors.oliveGreen,
  },
  spotMeta: {
    alignItems: 'flex-end',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.orange,
  },
  distance: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  walkTime: {
    fontSize: 12,
    color: colors.oliveGreen,
  },
  spotDescription: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
    lineHeight: 18,
  },
  spotHours: {
    fontSize: 12,
    color: colors.plum,
    marginBottom: 12,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.background,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.magenta,
  },
  directionsText: {
    fontSize: 12,
    color: colors.magenta,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default LodgingScreen;
