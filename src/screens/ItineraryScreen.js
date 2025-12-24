// src/screens/ItineraryScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserHeader from '../components/UserHeader';

const colors = {
  chartreuse: '#bcaa01',
  orange: '#ef7102',
  plum: '#782946',
  oliveGreen: '#777c3e',
  magenta: '#ba005f',
  background: '#F5F1E8',
  text: '#2F4F4F',
};

const ItineraryScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <UserHeader />
      <ScrollView style={styles.scrollContainer}>
        {/* Friday, January 17 */}
        <View style={styles.dayCard}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayTitle}>Friday, January 17</Text>
            <Text style={styles.daySubtitle}>Cozy Night In</Text>
          </View>
          <View style={styles.dayContent}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.orange }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>Morning</Text>
                <Text style={styles.eventTitle}>Rolling Arrivals</Text>
                <Text style={styles.eventDescription}>
                  Meet at La Dea Santa Fe
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.orange }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>3:00 PM</Text>
                <Text style={styles.eventTitle}>Check-in</Text>
                <Text style={styles.eventDescription}>
                  Official check-in time at La Dea
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.orange }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>4:30 PM</Text>
                <Text style={styles.eventTitle}>Walk to Happy Hour</Text>
                <Text style={styles.eventDescription}>
                  Nearby spot
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.orange }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>6:30 PM</Text>
                <Text style={styles.eventTitle}>Change into Cozies</Text>
                <Text style={styles.eventDescription}>
                  Back to the house, get comfortable
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.orange }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>Evening</Text>
                <Text style={styles.eventTitle}>Dinner & Drinks at Home</Text>
                <Text style={styles.eventDescription}>
                  Cozy night in 
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.orange }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>7:00 PM</Text>
                <Text style={styles.eventTitle}>Special Guest, Games & Drinks</Text>
                <Text style={styles.eventDescription}>
                  Surprise guest appearance! Bring $1 bills.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Saturday, January 18 */}
        <View style={styles.dayCard}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayTitle}>Saturday, January 18</Text>
            <Text style={styles.daySubtitle}>Desert Disco Night!</Text>
          </View>
          <View style={styles.dayContent}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.magenta }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>Morning</Text>
                <Text style={styles.eventTitle}>Walk to Coffee</Text>
                <Text style={styles.eventDescription}>
                  Neighborhood spot
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.magenta }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>9:00 AM</Text>
                <Text style={styles.eventTitle}>Walk / Hike</Text>
                <Text style={styles.eventDescription}>
                  Scenic walk near Ojo Santa Fe
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.magenta }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>10:30 AM</Text>
                <Text style={styles.eventTitle}>Ojo Santa Fe Hot Springs</Text>
                <Text style={styles.eventDescription}>
                  Relax and soak in the hot springs
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.magenta }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>12:00 PM</Text>
                <Text style={styles.eventTitle}>Brunch / Lunch</Text>
                <Text style={styles.eventDescription}>
                  Grab a bite in town
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.magenta }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>1:00 PM</Text>
                <Text style={styles.eventTitle}>Home to Shower, Chill, & Change</Text>
                <Text style={styles.eventDescription}>
                  Get ready for the evening
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.magenta }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>5:30 PM</Text>
                <Text style={styles.eventTitle}>Drinks in Town</Text>
                <Text style={styles.eventDescription}>
                  Wear Desert Disco attire!
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.magenta }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>7:00 PM</Text>
                <Text style={styles.eventTitle}>Dinner in Town</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.magenta }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>9:00 PM</Text>
                <Text style={styles.eventTitle}>More Drinks & Dancing</Text>
                <Text style={styles.eventDescription}>
                  Bring your dancing shoes
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sunday, January 19 */}
        <View style={styles.dayCard}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayTitle}>Sunday, January 19</Text>
            <Text style={styles.daySubtitle}>Scavenger Hunt & Relax Day</Text>
          </View>
          <View style={styles.dayContent}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.plum }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>10:00 AM</Text>
                <Text style={styles.eventTitle}>Walk / Hike</Text>
                <Text style={styles.eventDescription}>
                  Scenic walk in the neighborhood
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.plum }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>1:00 PM</Text>
                <Text style={styles.eventTitle}>Drinks / Snacks at La Plazuela</Text>
                <Text style={styles.eventDescription}>
                  Afternoon refreshments
                </Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.plum }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>2:30 PM</Text>
                <Text style={styles.eventTitle}>Scavenger Hunt</Text>
                <Text style={styles.eventDescription}>
                  Team competition around Santa Fe
                </Text>
                <TouchableOpacity
                  style={styles.huntButton}
                  onPress={() => navigation.navigate('Hunt')}
                >
                  <Icon name="search" size={18} color="white" />
                  <Text style={styles.huntButtonText}>Open Scavenger Hunt</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.plum }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>7:00 PM</Text>
                <Text style={styles.eventTitle}>Dinner at Home</Text>

              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.plum }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>Evening</Text>
                <Text style={styles.eventTitle}>Pack & Prep</Text>
                <Text style={styles.eventDescription}>
                  Get ready for Monday checkout
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Monday, January 20 */}
        <View style={styles.dayCard}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayTitle}>Monday, January 20</Text>
            <Text style={styles.daySubtitle}>Departure Day</Text>
          </View>
          <View style={styles.dayContent}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.oliveGreen }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>11:00 AM</Text>
                <Text style={styles.eventTitle}>Check-out</Text>

              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: colors.oliveGreen }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timeText}>Safe Travels!</Text>
                <Text style={styles.eventTitle}>Head Home</Text>
                <Text style={styles.eventDescription}>
                  See y'all in Cabo!
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  dayCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  dayHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EDE4',
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  daySubtitle: {
    fontSize: 14,
    color: colors.oliveGreen,
    fontWeight: '500',
  },
  dayContent: {
    padding: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: 16,
  },
  timelineContent: {
    flex: 1,
  },
  timeText: {
    fontSize: 13,
    color: colors.oliveGreen,
    fontWeight: '600',
    marginBottom: 6,
  },
  eventTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: colors.oliveGreen,
    lineHeight: 20,
  },
  huntButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.magenta,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 12,
  },
  huntButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 30,
  },
});

export default ItineraryScreen;
