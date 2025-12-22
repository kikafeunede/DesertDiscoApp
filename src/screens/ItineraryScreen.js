// src/screens/ItineraryScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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

const ItineraryScreen = () => {
  const [itinerary] = useState([
    {
      id: 1,
      day: 'Thursday',
      date: 'January 16, 2025',
      events: [
        { time: '6:00 PM', activity: 'Arrival & Check-in', location: 'La Dea Santa Fe', icon: '🏠' },
        { time: '7:30 PM', activity: 'Grocery Run & Dinner Prep', location: 'Whole Foods Market', icon: '🛒' },
        { time: '9:00 PM', activity: 'Settle In & Early Rest', location: 'La Dea', icon: '😴' },
      ]
    },
    {
      id: 2,
      day: 'Friday',
      date: 'January 17, 2025',
      events: [
        { time: '9:00 AM', activity: 'Breakfast & Coffee', location: 'La Dea', icon: '☕' },
        { time: '10:30 AM', activity: 'Explore Downtown Santa Fe', location: 'Santa Fe Plaza', icon: '🚶‍♀️' },
        { time: '1:00 PM', activity: 'Lunch', location: 'The Shed Restaurant', icon: '🌮' },
        { time: '3:00 PM', activity: 'Canyon Road Art Walk', location: 'Canyon Road', icon: '🎨' },
        { time: '6:00 PM', activity: 'Dinner Prep at Home', location: 'La Dea', icon: '👩‍🍳' },
        { time: '8:00 PM', activity: '🤫 Secret Special Event', location: 'La Dea (cozy clothes!)', icon: '✨' },
      ]
    },
    {
      id: 3,
      day: 'Saturday',
      date: 'January 18, 2025',
      events: [
        { time: '8:00 AM', activity: 'Morning Hike', location: 'Atalaya Mountain Trail', icon: '🥾' },
        { time: '11:00 AM', activity: 'Post-Hike Brunch', location: 'Café Pasqual\'s', icon: '🥞' },
        { time: '1:00 PM', activity: 'Walk Around Town & Shopping', location: 'Santa Fe Plaza Area', icon: '🛍️' },
        { time: '4:00 PM', activity: 'Rest & Get Ready', location: 'La Dea', icon: '💄' },
        { time: '7:00 PM', activity: 'Dinner Out', location: 'Geronimo Restaurant', icon: '🍽️' },
        { time: '9:30 PM', activity: 'Night Out!', location: 'Downtown Santa Fe', icon: '🍸' },
      ]
    },
    {
      id: 4,
      day: 'Sunday',
      date: 'January 19, 2025',
      events: [
        { time: '9:30 AM', activity: 'Leisurely Walk', location: 'Railyard District', icon: '🚶‍♀️' },
        { time: '11:00 AM', activity: 'Hot Springs Adventure', location: 'Ten Thousand Waves', icon: '♨️' },
        { time: '2:00 PM', activity: 'Lunch in Town', location: 'Harry\'s Roadhouse', icon: '🍔' },
        { time: '4:00 PM', activity: 'Rest & Pack', location: 'La Dea', icon: '🧳' },
        { time: '6:00 PM', activity: 'Meow Wolf Experience', location: 'Meow Wolf Santa Fe', icon: '🌈' },
        { time: '9:00 PM', activity: 'Farewell Dinner', location: 'Local favorite TBD', icon: '🥂' },
      ]
    }
  ]);

  const handleEventPress = (event) => {
    Alert.alert(
      event.activity,
      `${event.icon} Time: ${event.time}\n📍 Location: ${event.location}`,
      [
        { text: 'Set Reminder', onPress: () => console.log('Reminder set') },
        { text: 'OK', style: 'cancel' }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏜️ Desert Disco Schedule</Text>
        <Text style={styles.subtitle}>January 16-19, 2025 • Santa Fe, NM</Text>
      </View>

      {itinerary.map((day) => (
        <View key={day.id} style={styles.dayContainer}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayTitle}>{day.day}</Text>
            <Text style={styles.dayDate}>{day.date}</Text>
          </View>

          {day.events.map((event, index) => (
            <TouchableOpacity
              key={index}
              style={styles.eventCard}
              onPress={() => handleEventPress(event)}
            >
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{event.time}</Text>
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.activityText}>
                  {event.icon} {event.activity}
                </Text>
                <Text style={styles.locationText}>📍 {event.location}</Text>
              </View>
              <Icon name="notifications" size={20} color={colors.magenta} />
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ✨ Ready for an unforgettable weekend in the Land of Enchantment! ✨
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
    backgroundColor: colors.plum,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
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
  },
  dayContainer: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  dayHeader: {
    backgroundColor: colors.chartreuse,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  dayDate: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.orange,
  },
  timeContainer: {
    backgroundColor: colors.magenta,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 15,
    minWidth: 60,
    alignItems: 'center',
  },
  timeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  eventDetails: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: colors.oliveGreen,
  },
  footer: {
    backgroundColor: colors.chartreuse,
    margin: 15,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
});

export default ItineraryScreen;
