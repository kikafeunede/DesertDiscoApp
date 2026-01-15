// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
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

const HomeScreen = () => {
  const openDirections = (address) => {
    const url = `http://maps.apple.com/?address=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <UserHeader />
      <ScrollView style={styles.scrollContainer}>
        {/* Lodging Card */}
        <View style={[styles.card, { borderTopColor: colors.magenta }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: colors.magenta }]}>
              <Icon name="home" size={22} color="white" />
            </View>
            <Text style={styles.cardTitle}>Our Home Base</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.propertyName}>La Dea Santa Fe</Text>
            <TouchableOpacity onPress={() => openDirections('2861 Agua Fria St, Santa Fe, NM 87507')}>
              <Text style={styles.address}>2861 Agua Fria St, Santa Fe, NM 87507</Text>
            </TouchableOpacity>
            
            <View style={styles.checkInContainer}>
              <View style={styles.checkInBox}>
                <Text style={styles.checkInLabel}>Check-in</Text>
                <Text style={styles.checkInValue}>Thu 3:00 PM</Text>
              </View>
              <View style={styles.checkInDivider} />
              <View style={styles.checkInBox}>
                <Text style={styles.checkInLabel}>Check-out</Text>
                <Text style={styles.checkInValue}>Mon 11:00 AM</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Weather Card */}
        <View style={[styles.card, { borderTopColor: colors.orange }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: colors.orange }]}>
              <Icon name="wb-sunny" size={22} color="white" />
            </View>
            <Text style={styles.cardTitle}>January Weather</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.tempContainer}>
              <View style={styles.tempBox}>
                <Icon name="wb-sunny" size={36} color={colors.orange} />
                <Text style={styles.tempLabel}>Daytime</Text>
                <Text style={styles.tempValue}>45-50°F</Text>
              </View>
              <View style={styles.tempDivider} />
              <View style={styles.tempBox}>
                <Icon name="nights-stay" size={36} color={colors.plum} />
                <Text style={styles.tempLabel}>Nighttime</Text>
                <Text style={styles.tempValue}>20-25°F</Text>
              </View>
            </View>
            <View style={styles.weatherNote}>
              <Text style={styles.weatherNoteText}>
                Pack layers! Temperature swings 20-30 degrees from day to night
              </Text>
            </View>
          </View>
        </View>

        {/* Main Events Card */}
        <View style={[styles.card, { borderTopColor: colors.chartreuse }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: colors.chartreuse }]}>
              <Icon name="stars" size={22} color="white" />
            </View>
            <Text style={styles.cardTitle}>Weekend Highlights</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.highlightItem}>
              <View style={styles.highlightLeft}>
                <View style={[styles.highlightDot, { backgroundColor: colors.orange }]} />
                <View style={styles.highlightLine} />
              </View>
              <View style={styles.highlightContent}>
                <Text style={styles.highlightDay}>Friday Evening</Text>
                <Text style={styles.highlightTitle}>Special Guest</Text>
                <Text style={styles.highlightTime}>7:00 PM at the house</Text>
              </View>
            </View>

            <View style={styles.highlightItem}>
              <View style={styles.highlightLeft}>
                <View style={[styles.highlightDot, { backgroundColor: colors.magenta }]} />
                <View style={styles.highlightLine} />
              </View>
              <View style={styles.highlightContent}>
                <Text style={styles.highlightDay}>Saturday Morning</Text>
                <Text style={styles.highlightTitle}>Ojo Santa Fe Hot Springs</Text>
                <Text style={styles.highlightTime}>10:30 AM</Text>
              </View>
            </View>

            <View style={styles.highlightItem}>
              <View style={styles.highlightLeft}>
                <View style={[styles.highlightDot, { backgroundColor: colors.magenta }]} />
                <View style={styles.highlightLine} />
              </View>
              <View style={styles.highlightContent}>
                <Text style={styles.highlightDay}>Saturday Night</Text>
                <Text style={styles.highlightTitle}>Desert Disco Night Out</Text>
                <Text style={styles.highlightTime}>Drinks, dinner & dancing</Text>
              </View>
            </View>

            <View style={styles.highlightItem}>
              <View style={styles.highlightLeft}>
                <View style={[styles.highlightDot, { backgroundColor: colors.plum }]} />
              </View>
              <View style={styles.highlightContent}>
                <Text style={styles.highlightDay}>Sunday All Day</Text>
                <Text style={styles.highlightTitle}>Scavenger Hunt</Text>
                <Text style={styles.highlightTime}>Team competition around Santa Fe</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Nearby Spots Card */}
        <View style={[styles.card, { borderTopColor: colors.plum }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: colors.plum }]}>
              <Icon name="place" size={22} color="white" />
            </View>
            <Text style={styles.cardTitle}>Nearby Favorites</Text>
          </View>
          <View style={styles.cardContent}>
            {[
              { name: 'Tumbleroot Brewery', distance: '0.2 mi', type: 'Brewery/Restaurant', address: '2791 Agua Fria St, Santa Fe, NM 87507' },
              { name: 'Escondido Santa Fe', distance: '0.3 mi', type: 'Restaurant', address: '1101 P.º Corazon, Santa Fe, NM 87507' },
              { name: 'Java Joe\'s', distance: '0.5 mi', type: 'Coffee', address: '1248 Siler Rd, Santa Fe, NM 87507' },
              { name: 'Alicia\'s Tortilleria', distance: '0.8 mi', type: 'Restaurant', address: '1314 Rufina Cir, Santa Fe, NM 87507' },
              { name: 'Cafe Castro', distance: '0.9 mi', type: 'Restaurant', address: '2811 Cerrillos Rd, Santa Fe, NM 87507' },
              { name: 'Wild Leaven Bakery', distance: '0.9 mi', type: 'Coffee', address: '1189 Parkway Dr E3, Santa Fe, NM 87507' },
            ].map((spot, index) => (
              <TouchableOpacity
                key={index}
                style={styles.spotItem}
                onPress={() => openDirections(spot.address)}
              >
                <View style={styles.spotContent}>
                  <Text style={styles.spotName}>{spot.name}</Text>
                  <View style={styles.spotMeta}>
                    <Text style={styles.spotType}>{spot.type}</Text>
                    <View style={styles.spotDot} />
                    <Text style={styles.spotDistance}>{spot.distance}</Text>
                  </View>
                </View>
                <Icon name="chevron-right" size={20} color={colors.oliveGreen} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trip Tips Card */}
        <View style={[styles.card, { borderTopColor: colors.orange }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: colors.orange }]}>
              <Icon name="tips-and-updates" size={22} color="white" />
            </View>
            <Text style={styles.cardTitle}>Santa Fe Tips</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.tipItem}>
              <View style={styles.tipIconCircle}>
                <Icon name="local-drink" size={16} color={colors.chartreuse} />
              </View>
              <Text style={styles.tipText}>Stay hydrated - altitude is 7,000 ft</Text>
            </View>
            <View style={styles.tipItem}>
              <View style={styles.tipIconCircle}>
                <Icon name="checkroom" size={16} color={colors.chartreuse} />
              </View>
              <Text style={styles.tipText}>Pack warm layers for evenings</Text>
            </View>
            <View style={styles.tipItem}>
              <View style={styles.tipIconCircle}>
                <Icon name="wb-sunny" size={16} color={colors.chartreuse} />
              </View>
              <Text style={styles.tipText}>Sunscreen essential at high altitude</Text>
            </View>
            <View style={styles.tipItem}>
              <View style={styles.tipIconCircle}>
                <Icon name="directions-walk" size={16} color={colors.chartreuse} />
              </View>
              <Text style={styles.tipText}>Comfortable walking shoes recommended</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
  style={{
    backgroundColor: colors.magenta,
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center'
  }}
  onPress={async () => {
    try {
      Alert.alert('Initializing...', 'Setting up Firebase collections');
      
      // Initialize hunts collection
      await setDoc(doc(db, 'hunts', 'desert-disco-2025'), {
        completions: {},
        createdAt: new Date().toISOString()
      });
      
      // Initialize users collection
      await setDoc(doc(db, 'users', 'all-users'), {
        users: [],
        createdAt: new Date().toISOString()
      });
      
      Alert.alert('✅ Success!', 'Firebase initialized! Check Firebase Console.');
    } catch (error) {
      Alert.alert('❌ Error', error.message);
    }
  }}
>
</TouchableOpacity>

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
  card: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    borderTopWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  propertyName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  address: {
    fontSize: 15,
    color: colors.magenta,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  checkInContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF9F0',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.chartreuse,
  },
  checkInBox: {
    flex: 1,
    alignItems: 'center',
  },
  checkInDivider: {
    width: 1,
    backgroundColor: '#D8D4CA',
    marginHorizontal: 16,
  },
  checkInLabel: {
    fontSize: 13,
    color: colors.oliveGreen,
    marginBottom: 6,
    fontWeight: '500',
  },
  checkInValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  tempBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tempDivider: {
    width: 1,
    height: 80,
    backgroundColor: '#E8E4DA',
  },
  tempLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.oliveGreen,
    marginTop: 12,
    marginBottom: 4,
  },
  tempValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  weatherNote: {
    backgroundColor: '#FFF5F7',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.plum,
  },
  weatherNoteText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  highlightItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  highlightLeft: {
    alignItems: 'center',
    marginRight: 16,
    width: 20,
  },
  highlightDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginBottom: 6,
  },
  highlightLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E8E4DA',
  },
  highlightContent: {
    flex: 1,
    paddingBottom: 4,
  },
  highlightDay: {
    fontSize: 12,
    color: colors.oliveGreen,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  highlightTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 3,
  },
  highlightTime: {
    fontSize: 14,
    color: colors.oliveGreen,
  },
  spotItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EDE4',
  },
  spotContent: {
    flex: 1,
  },
  spotName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 5,
  },
  spotMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotType: {
    fontSize: 13,
    color: colors.oliveGreen,
  },
  spotDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.oliveGreen,
    marginHorizontal: 8,
  },
  spotDistance: {
    fontSize: 13,
    color: colors.oliveGreen,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  tipIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 30,
  },
});

export default HomeScreen;
