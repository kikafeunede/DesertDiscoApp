// src/screens/ScavengerHuntScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
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

const ScavengerHuntScreen = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loginCode, setLoginCode] = useState('');
  const [isHuntUnlocked, setIsHuntUnlocked] = useState(false);
  const [huntLoginCode, setHuntLoginCode] = useState('');
  const [activeTab, setActiveTab] = useState('hunt');
  const [addClueModalVisible, setAddClueModalVisible] = useState(false);
  const [editClueModalVisible, setEditClueModalVisible] = useState(false);
  const [selectedClue, setSelectedClue] = useState(null);
  
  const [newClue, setNewClue] = useState({
    title: '',
    description: '',
    location: '',
    points: '10',
    category: 'General',
  });

  const [clues, setClues] = useState([
    // Historic Plaza + Downtown
    {
      id: 1,
      title: 'New Mexico Statehood Building',
      description: 'Find the building where New Mexico became a state',
      location: 'Historic Plaza',
      points: 15,
      category: 'Exploration',
      completed: false,
      completedBy: null,
    },
    {
      id: 2,
      title: 'The Oldest House',
      description: 'I\'m the oldest house, with tales to tell, find your next clue where spirits dwell',
      location: 'Historic Plaza',
      points: 20,
      category: 'Exploration',
      completed: false,
      completedBy: null,
    },
    {
      id: 3,
      title: 'Turquoise Dome',
      description: 'I\'m a turquoise dome, round and grand, find your next clue in this legislative land',
      location: 'Downtown',
      points: 15,
      category: 'Exploration',
      completed: false,
      completedBy: null,
    },
    {
      id: 4,
      title: 'Oldest Church Wall',
      description: 'Touch the oldest church wall and ask for relationship blessings',
      location: 'Historic Plaza',
      points: 15,
      category: 'Challenge',
      completed: false,
      completedBy: null,
    },
    {
      id: 5,
      title: 'Miracle Staircase',
      description: 'Find the miracle staircase',
      location: 'Loretto Chapel',
      points: 20,
      category: 'Exploration',
      completed: false,
      completedBy: null,
    },
    {
      id: 6,
      title: 'Native Artisan Jewelry',
      description: 'Spot Native artisan jewelry',
      location: 'Plaza',
      points: 10,
      category: 'Shopping',
      completed: false,
      completedBy: null,
    },
    {
      id: 7,
      title: 'Palace of the Governors',
      description: 'Pose royally at the Palace of the Governors',
      location: 'Plaza',
      points: 10,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 8,
      title: 'Chile Ristra',
      description: 'Find a chile ristra',
      location: 'Plaza Area',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 9,
      title: 'Plaza Bandstand Toast',
      description: 'Give a dramatic toast at the Plaza bandstand',
      location: 'Plaza',
      points: 15,
      category: 'Challenge',
      completed: false,
      completedBy: null,
    },
    {
      id: 10,
      title: 'Renaissance Cathedral Steps',
      description: 'Recreate a Renaissance painting on the cathedral steps',
      location: 'Cathedral',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 11,
      title: 'Animal Statue',
      description: 'Find an animal statue',
      location: 'Downtown',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 12,
      title: 'Turquoise Shutters',
      description: 'Find turquoise shutters',
      location: 'Downtown',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 13,
      title: 'Snake Mural',
      description: 'Spot a mural with a snake — recreate its shape',
      location: 'Downtown',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 14,
      title: 'Chile Pepper Image',
      description: 'Photograph any chile pepper image',
      location: 'Any',
      points: 10,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 15,
      title: 'Navajo Rug Pattern',
      description: 'Find a Navajo rug pattern — pick the boldest one',
      location: 'Plaza',
      points: 10,
      category: 'Shopping',
      completed: false,
      completedBy: null,
    },
    {
      id: 16,
      title: 'Jewelry Over $1,000',
      description: 'Spot a jewelry piece over $1,000',
      location: 'Plaza',
      points: 15,
      category: 'Shopping',
      completed: false,
      completedBy: null,
    },
    {
      id: 17,
      title: 'Dried Flowers Above Door',
      description: 'Find dried flowers above a door',
      location: 'Downtown',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 18,
      title: 'Vintage Postcards',
      description: 'Find vintage postcards — pick the most chaotic',
      location: 'Downtown',
      points: 10,
      category: 'Shopping',
      completed: false,
      completedBy: null,
    },
    {
      id: 19,
      title: 'Hanging Red Chiles',
      description: 'Find hanging red chiles',
      location: 'Any',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 20,
      title: 'Plaza Fountain Wish',
      description: 'Locate the Plaza fountain — make a wish for the bride',
      location: 'Plaza',
      points: 15,
      category: 'Challenge',
      completed: false,
      completedBy: null,
    },
    {
      id: 21,
      title: 'Iconic Adobe Building',
      description: 'Take a pic with an iconic Santa Fe adobe building',
      location: 'Any',
      points: 10,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },

    // Canyon Road Art Galleries
    {
      id: 22,
      title: 'Tall Sculpture Pose',
      description: 'Find a sculpture taller than you — copy its pose',
      location: 'Canyon Road',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 23,
      title: 'Giant Metal Flowers',
      description: 'Find giant metal flowers',
      location: 'Canyon Road',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 24,
      title: 'Coyote Painting Howl',
      description: 'Spot a painting with a coyote — howl accordingly',
      location: 'Canyon Road',
      points: 15,
      category: 'Challenge',
      completed: false,
      completedBy: null,
    },
    {
      id: 25,
      title: 'Black & White Art',
      description: 'Find art using only black + white',
      location: 'Canyon Road',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 26,
      title: 'Iconic Blue Door',
      description: 'Find the iconic blue door',
      location: 'Canyon Road',
      points: 20,
      category: 'Exploration',
      completed: false,
      completedBy: null,
    },
    {
      id: 27,
      title: 'Horse Art',
      description: 'Find art with a horse',
      location: 'Canyon Road',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 28,
      title: 'Circle Sculpture Frame',
      description: 'Find a sculpture shaped like a circle — frame someone\'s face',
      location: 'Canyon Road',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 29,
      title: 'Cloud-Themed Art',
      description: 'Spot cloud-themed art',
      location: 'Canyon Road',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 30,
      title: 'Gallery Dog',
      description: 'Find a gallery dog — politely get a pic',
      location: 'Canyon Road',
      points: 20,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 31,
      title: 'Geometric Pottery',
      description: 'Spot geometric pottery',
      location: 'Canyon Road',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 32,
      title: 'Neon Artwork',
      description: 'Find neon artwork',
      location: 'Canyon Road',
      points: 15,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 33,
      title: 'Pueblo Painting',
      description: 'Find a pueblo painting',
      location: 'Canyon Road',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 34,
      title: 'Human Sculpture Posture',
      description: 'Find a human sculpture — copy the posture',
      location: 'Canyon Road',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 35,
      title: 'Gold-Leaf Art',
      description: 'Spot gold-leaf art',
      location: 'Canyon Road',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 36,
      title: 'Hanging Lanterns',
      description: 'Find lanterns hanging at a gallery',
      location: 'Canyon Road',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },

    // Railyard District
    {
      id: 37,
      title: 'Water Tower Showdown',
      description: 'Find the giant water tower — Western showdown stance',
      location: 'Railyard',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 38,
      title: 'Train Crossing Runway',
      description: 'Find a train crossing sign — runway walk',
      location: 'Railyard',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 39,
      title: 'Animal Mural Mimic',
      description: 'Spot a mural with an animal — mimic it',
      location: 'Railyard',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 40,
      title: 'Latte Art',
      description: 'Find latte art',
      location: 'Railyard',
      points: 10,
      category: 'Food',
      completed: false,
      completedBy: null,
    },
    {
      id: 41,
      title: 'Rusted Train Part',
      description: 'Spot a rusted train part',
      location: 'Railyard',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 42,
      title: 'Cowboy Boots Compliment',
      description: 'Find cowboy boots on someone — compliment + photo',
      location: 'Railyard',
      points: 15,
      category: 'Challenge',
      completed: false,
      completedBy: null,
    },
    {
      id: 43,
      title: 'Farmers Market Sign',
      description: 'Find the farmers market sign',
      location: 'Railyard',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 44,
      title: 'Recycled Sculpture',
      description: 'Spot recycled-material sculpture',
      location: 'Railyard',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 45,
      title: 'Artsy Painted Bench',
      description: 'Find an artsy painted bench',
      location: 'Railyard',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 46,
      title: 'NM Hot Sauce',
      description: 'Locate NM-made hot sauce — pick the spiciest label',
      location: 'Railyard',
      points: 10,
      category: 'Food',
      completed: false,
      completedBy: null,
    },

    // Outdoors + Desert Vibes
    {
      id: 47,
      title: 'Tall Cactus',
      description: 'Find a cactus taller than you — no touching!',
      location: 'Outdoors',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 48,
      title: 'Mountain Range',
      description: 'Capture the mountain range',
      location: 'Outdoors',
      points: 10,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 49,
      title: 'Trail Sign Animal',
      description: 'Find a trail sign with an animal icon',
      location: 'Outdoors',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 50,
      title: 'Rock Cairn Pose',
      description: 'Find a rock cairn — pose as the extra rock',
      location: 'Outdoors',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 51,
      title: 'Windswept Tree',
      description: 'Spot a windswept tree',
      location: 'Outdoors',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 52,
      title: 'Stabby Desert Plant',
      description: 'Find a desert plant that looks stabby',
      location: 'Outdoors',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 53,
      title: 'Scenic Overlook',
      description: 'Capture a scenic overlook',
      location: 'Outdoors',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 54,
      title: 'Red Rock Explorer',
      description: 'Find red rock — explorer stance',
      location: 'Outdoors',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 55,
      title: 'Wildflower',
      description: 'Spot a wildflower',
      location: 'Outdoors',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 56,
      title: 'Santa Fe Sunset',
      description: 'Capture a Santa Fe sunset — pink/orange required',
      location: 'Outdoors',
      points: 20,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },

    // Food + Drink
    {
      id: 57,
      title: 'Christmas Style Chile',
      description: 'Find red & green chile (Christmas style)',
      location: 'Any restaurant',
      points: 15,
      category: 'Food',
      completed: false,
      completedBy: null,
    },
    {
      id: 58,
      title: 'Fancy Margarita',
      description: 'Spot a margarita with a fancy rim — cheers!',
      location: 'Bar/Restaurant',
      points: 15,
      category: 'Food',
      completed: false,
      completedBy: null,
    },
    {
      id: 59,
      title: 'Chile-Shaped Neon',
      description: 'Find chile-shaped neon',
      location: 'Downtown',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 60,
      title: 'Pastry Display',
      description: 'Photograph a pastry display',
      location: 'Bakery/Café',
      points: 10,
      category: 'Food',
      completed: false,
      completedBy: null,
    },
    {
      id: 61,
      title: 'String Lights',
      description: 'Find outdoor string lights — cozy group pic',
      location: 'Any',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 62,
      title: 'Santa Fe Menu Item',
      description: 'Spot a menu item named after Santa Fe',
      location: 'Restaurant',
      points: 10,
      category: 'Food',
      completed: false,
      completedBy: null,
    },
    {
      id: 63,
      title: 'Spicy Food Challenge',
      description: 'Get a pic of someone eating something spicy',
      location: 'Restaurant',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 64,
      title: 'Cinnamon Dessert',
      description: 'Find a cinnamon dessert',
      location: 'Bakery/Restaurant',
      points: 10,
      category: 'Food',
      completed: false,
      completedBy: null,
    },
    {
      id: 65,
      title: 'Food Truck',
      description: 'Locate a food truck',
      location: 'Any',
      points: 10,
      category: 'Food',
      completed: false,
      completedBy: null,
    },
    {
      id: 66,
      title: 'Chile Hot Chocolate',
      description: 'Find hot chocolate or coffee with chile',
      location: 'Café',
      points: 15,
      category: 'Food',
      completed: false,
      completedBy: null,
    },

    // Mystical + Fun
    {
      id: 67,
      title: 'Tarot/Psychic Shop',
      description: 'Find a tarot or psychic shop — foresee your future',
      location: 'Downtown',
      points: 15,
      category: 'Challenge',
      completed: false,
      completedBy: null,
    },
    {
      id: 68,
      title: 'Large Crystal',
      description: 'Spot a crystal bigger than your hand',
      location: 'Shop',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 69,
      title: 'Poncho Fashion Walk',
      description: 'Spot ponchos or flowy fabrics — fashion walk',
      location: 'Shop',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 70,
      title: 'Moon or Star Symbols',
      description: 'Find moon or star symbols',
      location: 'Any',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 71,
      title: 'Wind Chimes Sound',
      description: 'Locate wind chimes — record their sound',
      location: 'Shop/Outdoors',
      points: 15,
      category: 'Challenge',
      completed: false,
      completedBy: null,
    },
    {
      id: 72,
      title: 'Skull Decoration',
      description: 'Find a skull decoration',
      location: 'Shop',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 73,
      title: 'Geometric Blanket',
      description: 'Spot a geometric blanket',
      location: 'Shop',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 74,
      title: 'Weird Soap Scent',
      description: 'Find handmade soaps — choose the weirdest scent',
      location: 'Shop',
      points: 10,
      category: 'Shopping',
      completed: false,
      completedBy: null,
    },
    {
      id: 75,
      title: 'Feeling Candle',
      description: 'Locate a candle named after a feeling',
      location: 'Shop',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 76,
      title: 'Dreamcatcher',
      description: 'Find a dreamcatcher',
      location: 'Shop',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 77,
      title: 'Turquoise Jewelry',
      description: 'Spot turquoise jewelry — obviously',
      location: 'Plaza/Shop',
      points: 10,
      category: 'Shopping',
      completed: false,
      completedBy: null,
    },
    {
      id: 78,
      title: 'Kokopelli Dance',
      description: 'Find kokopelli — dance next to it',
      location: 'Any',
      points: 15,
      category: 'Photo',
      completed: false,
      completedBy: null,
    },
    {
      id: 79,
      title: 'Sun Symbol',
      description: 'Find a sun symbol',
      location: 'Any',
      points: 10,
      category: 'General',
      completed: false,
      completedBy: null,
    },
    {
      id: 80,
      title: 'Piñon Incense',
      description: 'Locate piñon incense — inhale dramatically',
      location: 'Shop',
      points: 15,
      category: 'Challenge',
      completed: false,
      completedBy: null,
    },
  ]);

  const teams = ['Green Chiles', 'Sopaipillas', 'Frito Pies'];
  const categories = ['General', 'Shopping', 'Photo', 'Food', 'Exploration', 'Challenge'];

  const handleLogin = () => {
    if (loginCode === '459-WILD') {
      setIsUnlocked(true);
      setLoginCode('');
    } else {
      Alert.alert('Incorrect Code', 'Please try again!');
      setLoginCode('');
    }
  };

  const handleHuntLogin = () => {
    if (huntLoginCode.toUpperCase() === 'MEOWWOLF') {
      setIsHuntUnlocked(true);
      setHuntLoginCode('');
    } else {
      Alert.alert('Incorrect Code', 'Please try again!');
      setHuntLoginCode('');
    }
  };

  const toggleClueComplete = (clueId, completedBy = null) => {
    setClues(clues.map(clue => 
      clue.id === clueId 
        ? { ...clue, completed: !clue.completed, completedBy: !clue.completed ? completedBy : null }
        : clue
    ));
  };

  const addClue = () => {
    if (!newClue.title || !newClue.description) {
      Alert.alert('Error', 'Please fill in title and description');
      return;
    }

    const clue = {
      id: clues.length + 1,
      title: newClue.title,
      description: newClue.description,
      location: newClue.location,
      points: parseInt(newClue.points) || 10,
      category: newClue.category,
      completed: false,
      completedBy: null,
    };

    setClues([...clues, clue]);
    setNewClue({ title: '', description: '', location: '', points: '10', category: 'General' });
    setAddClueModalVisible(false);
    Alert.alert('Success', 'Clue added successfully!');
  };

  const editClue = () => {
    if (!selectedClue.title || !selectedClue.description) {
      Alert.alert('Error', 'Please fill in title and description');
      return;
    }

    setClues(clues.map(clue => 
      clue.id === selectedClue.id ? selectedClue : clue
    ));
    setEditClueModalVisible(false);
    setSelectedClue(null);
    Alert.alert('Success', 'Clue updated successfully!');
  };

  const deleteClue = (clueId) => {
    Alert.alert(
      'Delete Clue',
      'Are you sure you want to delete this clue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setClues(clues.filter(clue => clue.id !== clueId))
        }
      ]
    );
  };

  const openEditModal = (clue) => {
    setSelectedClue({ ...clue });
    setEditClueModalVisible(true);
  };

  const calculateStats = () => {
    const total = clues.length;
    const completed = clues.filter(c => c.completed).length;
    const totalPoints = clues.reduce((sum, c) => sum + c.points, 0);
    const earnedPoints = clues.filter(c => c.completed).reduce((sum, c) => sum + c.points, 0);
    
    return { total, completed, totalPoints, earnedPoints };
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      General: colors.oliveGreen,
      Shopping: colors.magenta,
      Photo: colors.orange,
      Food: colors.chartreuse,
      Exploration: colors.plum,
      Challenge: colors.magenta,
    };
    return categoryColors[category] || colors.oliveGreen;
  };

  const stats = calculateStats();

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'hunt' && styles.activeTab]}
          onPress={() => setActiveTab('hunt')}
        >
          <Text style={[styles.tabText, activeTab === 'hunt' && styles.activeTabText]}>
            Hunt
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'leaderboard' && styles.activeTab]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.activeTabText]}>
            Leaderboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'manage' && styles.activeTab]}
          onPress={() => setActiveTab('manage')}
        >
          <Text style={[styles.tabText, activeTab === 'manage' && styles.activeTabText]}>
            Manage
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {activeTab === 'hunt' && (
          !isHuntUnlocked ? (
            <View style={styles.manageLoginContainer}>
              <View style={styles.loginCard}>
                <Text style={styles.loginTitle}>🎯 Desert Disco Scavenger Hunt</Text>
                <Text style={styles.loginSubtitle}>Enter code to start the hunt</Text>
                
                <TextInput
                  style={styles.loginInput}
                  value={huntLoginCode}
                  onChangeText={setHuntLoginCode}
                  placeholder="Enter hunt code"
                  placeholderTextColor={colors.oliveGreen}
                  autoCapitalize="characters"
                />
                
                <TouchableOpacity style={styles.loginButton} onPress={handleHuntLogin}>
                  <Icon name="lock-open" size={20} color="white" />
                  <Text style={styles.loginButtonText}>Start Hunt</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          ) : (
            <View>
              {/* Stats Header */}
              <View style={styles.statsHeader}>
                <Text style={styles.statsTitle}>Desert Disco Scavenger Hunt</Text>
                <View style={styles.statsRow}>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{stats.completed}/{stats.total}</Text>
                    <Text style={styles.statLabel}>Completed</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{stats.earnedPoints}/{stats.totalPoints}</Text>
                    <Text style={styles.statLabel}>Points</Text>
                  </View>
                </View>
              </View>

              {/* Clues List */}
              <View style={styles.cluesContainer}>
                {clues.map((clue) => (
                  <TouchableOpacity
                    key={clue.id}
                    style={[styles.clueCard, clue.completed && styles.completedClueCard]}
                    onLongPress={() => openEditModal(clue)}
                  >
                    <View style={styles.clueHeader}>
                      <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(clue.category) }]}>
                        <Text style={styles.categoryText}>{clue.category}</Text>
                      </View>
                      <Text style={styles.pointsBadge}>+{clue.points} pts</Text>
                    </View>

                    <Text style={[styles.clueTitle, clue.completed && styles.completedText]}>
                      {clue.title}
                    </Text>
                    <Text style={styles.clueDescription}>{clue.description}</Text>
                    <Text style={styles.clueLocation}>📍 {clue.location}</Text>

                    {clue.completed && clue.completedBy && (
                      <Text style={styles.completedBy}>✅ Completed by {clue.completedBy}</Text>
                    )}

                    <View style={styles.clueActions}>
                      {!clue.completed && (
                        <TouchableOpacity
                          style={styles.completeButton}
                          onPress={() => {
                            Alert.alert(
                              'Mark as Complete',
                              'Which team completed this clue?',
                              teams.map(team => ({
                                text: team,
                                onPress: () => toggleClueComplete(clue.id, team)
                              })).concat([{ text: 'Cancel', style: 'cancel' }])
                            );
                          }}
                        >
                          <Icon name="check-circle" size={20} color="white" />
                          <Text style={styles.completeButtonText}>Mark Complete</Text>
                        </TouchableOpacity>
                      )}
                      {clue.completed && (
                        <TouchableOpacity
                          style={styles.uncompleteButton}
                          onPress={() => toggleClueComplete(clue.id)}
                        >
                          <Icon name="undo" size={20} color={colors.text} />
                          <Text style={styles.uncompleteButtonText}>Undo</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )
        )}

        {activeTab === 'leaderboard' && (
          <View>
            <View style={styles.leaderboardHeader}>
              <Text style={styles.leaderboardTitle}>🏆 Team Leaderboard</Text>
              <Text style={styles.leaderboardSubtitle}>Which team is winning?</Text>
            </View>

            {teams
              .map(team => {
                const teamClues = clues.filter(c => c.completedBy === team);
                const teamPoints = teamClues.reduce((sum, c) => sum + c.points, 0);
                return { team, clues: teamClues.length, points: teamPoints };
              })
              .sort((a, b) => b.points - a.points)
              .map((teamData, index) => (
                <View key={teamData.team} style={styles.leaderboardCard}>
                  <View style={styles.leaderboardRank}>
                    <Text style={styles.rankNumber}>#{index + 1}</Text>
                  </View>
                  <View style={styles.leaderboardInfo}>
                    <Text style={styles.leaderboardName}>{teamData.team}</Text>
                    <Text style={styles.leaderboardStats}>
                      {teamData.clues} clues • {teamData.points} points
                    </Text>
                  </View>
                  {index === 0 && teamData.points > 0 && (
                    <Text style={styles.trophy}>👑</Text>
                  )}
                </View>
              ))}
          </View>
        )}

        {activeTab === 'manage' && (
          !isUnlocked ? (
            <View style={styles.manageLoginContainer}>
              <View style={styles.loginCard}>
                <Text style={styles.loginTitle}>🔒 Manage Clues</Text>
                <Text style={styles.loginSubtitle}>Enter code to manage hunt</Text>
                
                <TextInput
                  style={styles.loginInput}
                  value={loginCode}
                  onChangeText={setLoginCode}
                  placeholder="Enter code (XXX-XXXX)"
                  placeholderTextColor={colors.oliveGreen}
                  autoCapitalize="characters"
                  maxLength={8}
                />
                
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Icon name="lock-open" size={20} color="white" />
                  <Text style={styles.loginButtonText}>Unlock</Text>
                </TouchableOpacity>
                
                <Text style={styles.loginHint}>Hint: Check your trip details! 🏜️</Text>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.manageHeader}>
                <Text style={styles.manageTitle}>⚙️ Manage Clues</Text>
                <TouchableOpacity
                  style={styles.addClueButton}
                  onPress={() => setAddClueModalVisible(true)}
                >
                  <Icon name="add-circle" size={24} color="white" />
                  <Text style={styles.addClueButtonText}>Add New Clue</Text>
                </TouchableOpacity>
              </View>

              {clues.map((clue) => (
                <View key={clue.id} style={styles.manageClueCard}>
                  <View style={styles.manageClueInfo}>
                    <Text style={styles.manageClueTitle}>{clue.title}</Text>
                    <Text style={styles.manageClueCategory}>{clue.category} • {clue.points} pts</Text>
                  </View>
                  <View style={styles.manageClueActions}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => openEditModal(clue)}
                    >
                      <Icon name="edit" size={20} color={colors.magenta} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteClue(clue.id)}
                    >
                      <Icon name="delete" size={20} color={colors.orange} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )
        )}
      </ScrollView>

      {/* Add Clue Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addClueModalVisible}
        onRequestClose={() => setAddClueModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Clue</Text>
              <TouchableOpacity onPress={() => setAddClueModalVisible(false)}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <Text style={styles.inputLabel}>Clue Title</Text>
              <TextInput
                style={styles.textInput}
                value={newClue.title}
                onChangeText={(text) => setNewClue({...newClue, title: text})}
                placeholder="e.g., Find the Turquoise Treasure"
                placeholderTextColor={colors.oliveGreen}
              />

              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={newClue.description}
                onChangeText={(text) => setNewClue({...newClue, description: text})}
                placeholder="What do they need to find or do?"
                placeholderTextColor={colors.oliveGreen}
                multiline
                numberOfLines={3}
              />

              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.textInput}
                value={newClue.location}
                onChangeText={(text) => setNewClue({...newClue, location: text})}
                placeholder="e.g., Santa Fe Plaza"
                placeholderTextColor={colors.oliveGreen}
              />

              <Text style={styles.inputLabel}>Points</Text>
              <TextInput
                style={styles.textInput}
                value={newClue.points}
                onChangeText={(text) => setNewClue({...newClue, points: text})}
                placeholder="10"
                keyboardType="numeric"
                placeholderTextColor={colors.oliveGreen}
              />

              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.categorySelector}>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      { backgroundColor: newClue.category === category ? getCategoryColor(category) : '#f0f0f0' }
                    ]}
                    onPress={() => setNewClue({...newClue, category})}
                  >
                    <Text style={[
                      styles.categoryButtonText,
                      { color: newClue.category === category ? 'white' : colors.text }
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={addClue}>
                <Text style={styles.submitButtonText}>Add Clue</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Edit Clue Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editClueModalVisible}
        onRequestClose={() => setEditClueModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Clue</Text>
              <TouchableOpacity onPress={() => setEditClueModalVisible(false)}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {selectedClue && (
              <ScrollView style={styles.formContainer}>
                <Text style={styles.inputLabel}>Clue Title</Text>
                <TextInput
                  style={styles.textInput}
                  value={selectedClue.title}
                  onChangeText={(text) => setSelectedClue({...selectedClue, title: text})}
                  placeholder="e.g., Find the Turquoise Treasure"
                  placeholderTextColor={colors.oliveGreen}
                />

                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={selectedClue.description}
                  onChangeText={(text) => setSelectedClue({...selectedClue, description: text})}
                  placeholder="What do they need to find or do?"
                  placeholderTextColor={colors.oliveGreen}
                  multiline
                  numberOfLines={3}
                />

                <Text style={styles.inputLabel}>Location</Text>
                <TextInput
                  style={styles.textInput}
                  value={selectedClue.location}
                  onChangeText={(text) => setSelectedClue({...selectedClue, location: text})}
                  placeholder="e.g., Santa Fe Plaza"
                  placeholderTextColor={colors.oliveGreen}
                />

                <Text style={styles.inputLabel}>Points</Text>
                <TextInput
                  style={styles.textInput}
                  value={String(selectedClue.points)}
                  onChangeText={(text) => setSelectedClue({...selectedClue, points: parseInt(text) || 10})}
                  placeholder="10"
                  keyboardType="numeric"
                  placeholderTextColor={colors.oliveGreen}
                />

                <Text style={styles.inputLabel}>Category</Text>
                <View style={styles.categorySelector}>
                  {categories.map(category => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.categoryButton,
                        { backgroundColor: selectedClue.category === category ? getCategoryColor(category) : '#f0f0f0' }
                      ]}
                      onPress={() => setSelectedClue({...selectedClue, category})}
                    >
                      <Text style={[
                        styles.categoryButtonText,
                        { color: selectedClue.category === category ? 'white' : colors.text }
                      ]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={editClue}>
                  <Text style={styles.submitButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  manageLoginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 400,
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.magenta,
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 16,
    color: colors.oliveGreen,
    marginBottom: 30,
  },
  loginInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: colors.chartreuse,
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: colors.magenta,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  loginHint: {
    fontSize: 14,
    color: colors.plum,
    marginTop: 20,
    fontStyle: 'italic',
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
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.magenta,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.oliveGreen,
  },
  activeTabText: {
    color: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  statsHeader: {
    backgroundColor: colors.magenta,
    padding: 20,
    margin: 15,
    borderRadius: 12,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  cluesContainer: {
    padding: 15,
  },
  clueCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedClueCard: {
    backgroundColor: '#f0f0f0',
    opacity: 0.8,
  },
  clueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pointsBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.orange,
  },
  clueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.oliveGreen,
  },
  clueDescription: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  clueLocation: {
    fontSize: 14,
    color: colors.plum,
    marginBottom: 10,
  },
  completedBy: {
    fontSize: 12,
    color: colors.chartreuse,
    fontWeight: '600',
    marginTop: 5,
  },
  clueActions: {
    marginTop: 10,
  },
  completeButton: {
    backgroundColor: colors.chartreuse,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  completeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  uncompleteButton: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.oliveGreen,
  },
  uncompleteButtonText: {
    color: colors.text,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  leaderboardHeader: {
    backgroundColor: colors.orange,
    padding: 20,
    margin: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  leaderboardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  leaderboardSubtitle: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  leaderboardCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leaderboardRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.plum,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 3,
  },
  leaderboardStats: {
    fontSize: 14,
    color: colors.oliveGreen,
  },
  trophy: {
    fontSize: 24,
  },
  manageHeader: {
    padding: 15,
  },
  manageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  addClueButton: {
    backgroundColor: colors.magenta,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addClueButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  manageClueCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  manageClueInfo: {
    flex: 1,
  },
  manageClueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 3,
  },
  manageClueCategory: {
    fontSize: 14,
    color: colors.oliveGreen,
  },
  manageClueActions: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 8,
    marginRight: 10,
  },
  deleteButton: {
    padding: 8,
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
    maxHeight: '90%',
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
  formContainer: {
    padding: 20,
    maxHeight: 450,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.chartreuse,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 8,
  },
  categoryButtonText: {
    fontWeight: '500',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: colors.chartreuse,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ScavengerHuntScreen;
