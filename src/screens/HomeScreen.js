// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
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

const HomeScreen = () => {
  const openMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    Linking.openURL(`http://maps.apple.com/?address=${encodedAddress}`);
  };

  const nearbySpots = [
    {
      id: 1,
      name: 'Iconik Coffee Roasters',
      distance: '0.3 mi',
      walkTime: '6 min walk',
      type: 'Coffee',
      hours: '7am-5pm',
      address: '2744 Agua Fria St, Santa Fe, NM',
      rating: '⭐ 4.7',
    },
    {
      id: 2,
      name: 'Whole Foods Market',
      distance: '0.5 mi',
      walkTime: '10 min walk',
      type: 'Grocery',
      hours: '8am-9pm',
      address: '753 Cerrillos Rd, Santa Fe, NM',
      rating: '⭐ 4.4',
    },
    {
      id: 3,
      name: 'Sazon',
      distance: '0.4 mi',
      walkTime: '8 min walk',
      type: 'Restaurant',
      hours: '11am-9pm',
      address: '221 Shelby St, Santa Fe, NM',
      rating: '⭐ 4.6',
    },
    {
      id: 4,
      name: 'Midtown Bistro',
      distance: '0.6 mi',
      walkTime: '12 min walk',
      type: 'Restaurant',
      hours: '11:30am-9pm',
      address: '2791 Agua Fria St, Santa Fe, NM',
      rating: '⭐ 4.5',
    },
    {
      id: 5,
      name: 'Paper Dosa',
      distance: '0.7 mi',
      walkTime: '14 min walk',
      type: 'Indian Food',
      hours: '5pm-9pm',
      address: '551 W Cordova Rd, Santa Fe, NM',
      rating: '⭐ 4.8',
    },
    {
      id: 6,
      name: 'Chocolate Maven Bakery',
      distance: '0.8 mi',
      walkTime: '16 min walk',
      type: 'Bakery',
      hours: '7am-6pm',
      address: '821 W San Mateo Rd, Santa Fe, NM',
      rating: '⭐ 4.7',
    },
  ];

  const mainEvents = [
    {
      id: 1,
      day: 'Friday',
      date: 'Jan 17',
      title: 'Cozy Night In + Special Guest',
      time: '8:00 PM',
      icon: '🎉',
      color: colors.magenta,
      description: 'Secret special event at the house',
    },
    {
      id: 2,
      day: 'Saturday',
      date: 'Jan 18',
      title: 'Dinner at Geronimo',
      time: '7:00 PM',
      icon: '🍽️',
      color: colors.orange,
      description: 'Upscale dining experience',
    },
    {
      id: 3,
      day: 'Saturday',
      date: 'Jan 18',
      title: 'Night Out on the Town',
      time: '9:00 PM',
      icon: '🥂',
      color: colors.plum,
      description: 'Santa Fe nightlife',
    },
    {
      id: 4,
      day: 'Sunday',
      date: 'Jan 19',
      title: 'Ten Thousand Waves Hot Springs',
      time: '11:00 AM',
      icon: '♨️',
      color: colors.chartreuse,
      description: 'Relaxing hot springs spa day',
    },
    {
      id: 5,
      day: 'Sunday',
      date: 'Jan 19',
      title: 'Scavenger Hunt',
      time: 'All Day',
      icon: '🎯',
      color: colors.oliveGreen,
      description: 'Desert Disco adventure',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Trip Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Desert Disco 🏜️</Text>
        <Text style={styles.subtitle}>Santa Fe Bachelorette Weekend</Text>
        <Text style={styles.dates}>January 16-19, 2025</Text>
      </View>

      {/* Home Base - Lodging */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Home Base</Text>
        <View style={styles.lodgingCard}>
          <Text style={styles.lodgingName}>La Dea Santa Fe</Text>
          <Text style={styles.lodgingAddress}>2861 Agua Fria St, Santa Fe, NM 87507</Text>
          
          <View style={styles.lodgingDetails}>
            <View style={styles.lodgingRow}>
              <Icon name="schedule" size={16} color={colors.plum} />
              <Text style={styles.lodgingText}>Check-in: 4:00 PM</Text>
            </View>
            <View style={styles.lodgingRow}>
              <Icon name="schedule" size={16} color={colors.plum} />
              <Text style={styles.lodgingText}>Check-out: 11:00 AM</Text>
            </View>
            <View style={styles.lodgingRow}>
              <Icon name="wifi" size={16} color={colors.plum} />
              <Text style={styles.lodgingText}>WiFi: LaDeaGuest2025</Text>
            </View>
          </View>

          <Text style={styles.amenitiesTitle}>Amenities:</Text>
          <View style={styles.amenitiesGrid}>
            <Text style={styles.amenityItem}>🍳 Full Kitchen</Text>
            <Text style={styles.amenityItem}>🛁 Hot Tub</Text>
            <Text style={styles.amenityItem}>🔥 BBQ Grill</Text>
            <Text style={styles.amenityItem}>🧺 Washer/Dryer</Text>
          </View>

          <TouchableOpacity
            style={styles.directionsButton}
            onPress={() => openMaps('2861 Agua Fria St, Santa Fe, NM 87507')}
          >
            <Icon name="directions" size={20} color="white" />
            <Text style={styles.directionsButtonText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Weather Forecast */}
      <View style={styles.weatherContainer}>
        <Text style={styles.sectionTitle}>4-Day Forecast</Text>
        <View style={styles.weatherGrid}>
          <View style={styles.weatherCard}>
            <Text style={styles.weatherDay}>Thu 16</Text>
            <Text style={styles.weatherIcon}>☀️</Text>
            <Text style={styles.weatherTemp}>48°/21°</Text>
          </View>
          <View style={styles.weatherCard}>
            <Text style={styles.weatherDay}>Fri 17</Text>
            <Text style={styles.weatherIcon}>⛅</Text>
            <Text style={styles.weatherTemp}>45°/23°</Text>
          </View>
          <View style={styles.weatherCard}>
            <Text style={styles.weatherDay}>Sat 18</Text>
            <Text style={styles.weatherIcon}>☀️</Text>
            <Text style={styles.weatherTemp}>42°/26°</Text>
          </View>
          <View style={styles.weatherCard}>
            <Text style={styles.weatherDay}>Sun 19</Text>
            <Text style={styles.weatherIcon}>🌤️</Text>
            <Text style={styles.weatherTemp}>46°/24°</Text>
          </View>
        </View>
      </View>

      {/* Main Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Main Events</Text>
        {mainEvents.map(event => (
          <View key={event.id} style={[styles.eventCard, { borderLeftColor: event.color }]}>
            <View style={styles.eventHeader}>
              <Text style={styles.eventIcon}>{event.icon}</Text>
              <View style={styles.eventInfo}>
                <Text style={styles.eventDay}>{event.day}, {event.date}</Text>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Nearby Spots */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Spots (Walking Distance)</Text>
        {nearbySpots.map(spot => (
          <View key={spot.id} style={styles.spotCard}>
            <View style={styles.spotHeader}>
              <View style={styles.spotInfo}>
                <Text style={styles.spotName}>{spot.name}</Text>
                <Text style={styles.spotType}>{spot.type} • {spot.rating}</Text>
              </View>
              <View style={styles.spotDistance}>
                <Text style={styles.distanceText}>{spot.distance}</Text>
                <Text style={styles.walkTime}>{spot.walkTime}</Text>
              </View>
            </View>
            <Text style={styles.spotHours}>⏰ {spot.hours}</Text>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => openMaps(spot.address)}
            >
              <Icon name="map" size={16} color={colors.magenta} />
              <Text style={styles.mapButtonText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Trip Notes */}
      <View style={styles.notesContainer}>
        <Text style={styles.notesTitle}>Trip Tips</Text>
        <Text style={styles.notesText}>
          🌡️ Layer up! Temps swing from 20s to 40s{'\n'}
          💧 Stay hydrated at high altitude{'\n'}
          🧴 Bring sunscreen and moisturizer{'\n'}
          👟 Comfy shoes for walking downtown{'\n'}
          📸 Don't forget your camera!
        </Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  dates: {
    fontSize: 16,
    color: 'white',
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  lodgingCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lodgingName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  lodgingAddress: {
    fontSize: 14,
    color: colors.oliveGreen,
    marginBottom: 15,
  },
  lodgingDetails: {
    marginBottom: 15,
  },
  lodgingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lodgingText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
  },
  amenitiesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 10,
    marginBottom: 10,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  amenityItem: {
    width: '50%',
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  directionsButton: {
    backgroundColor: colors.magenta,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  directionsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  weatherContainer: {
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
  weatherGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherCard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  weatherDay: {
    fontSize: 12,
    color: colors.oliveGreen,
    marginBottom: 5,
  },
  weatherIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  weatherTemp: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eventIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  eventInfo: {
    flex: 1,
  },
  eventDay: {
    fontSize: 12,
    color: colors.oliveGreen,
    marginBottom: 3,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 3,
  },
  eventTime: {
    fontSize: 14,
    color: colors.plum,
    marginBottom: 3,
  },
  eventDescription: {
    fontSize: 13,
    color: colors.oliveGreen,
    fontStyle: 'italic',
  },
  spotCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  spotInfo: {
    flex: 1,
  },
  spotName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 3,
  },
  spotType: {
    fontSize: 13,
    color: colors.oliveGreen,
  },
  spotDistance: {
    alignItems: 'flex-end',
  },
  distanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.plum,
  },
  walkTime: {
    fontSize: 12,
    color: colors.oliveGreen,
  },
  spotHours: {
    fontSize: 13,
    color: colors.text,
    marginBottom: 10,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  mapButtonText: {
    fontSize: 13,
    color: colors.magenta,
    fontWeight: '600',
    marginLeft: 5,
  },
  notesContainer: {
    backgroundColor: colors.orange,
    padding: 20,
    margin: 15,
    borderRadius: 12,
    marginBottom: 30,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  notesText: {
    fontSize: 14,
    color: 'white',
    lineHeight: 22,
  },
});

export default HomeScreen;
