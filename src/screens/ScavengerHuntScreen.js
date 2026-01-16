// src/screens/ScavengerHuntScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Alert, 
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/UserContext';
import { db, storage } from '../config/firebase';
import { collection, doc, setDoc, getDoc, onSnapshot, updateDoc, deleteField } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
  const { currentUser, userTeam, getUsersByTeam } = useUser();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loginCode, setLoginCode] = useState('');
  const [isHuntUnlocked, setIsHuntUnlocked] = useState(false);
  const [huntLoginCode, setHuntLoginCode] = useState('');
  const [activeTab, setActiveTab] = useState('hunt');
  const [addClueModalVisible, setAddClueModalVisible] = useState(false);
  const [editClueModalVisible, setEditClueModalVisible] = useState(false);
  const [selectedClue, setSelectedClue] = useState(null);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [teamManagementVisible, setTeamManagementVisible] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [teamReassignModalVisible, setTeamReassignModalVisible] = useState(false);
  
  const [newClue, setNewClue] = useState({
    title: '',
    description: '',
    location: '',
    points: '10',
    category: 'General',
  });

  const [clueCompletions, setClueCompletions] = useState({});

  // Initialize Firebase collections (run once)
  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        const huntRef = doc(db, 'hunts', 'desert-disco-2025');
        const huntSnap = await getDoc(huntRef);
        
        if (!huntSnap.exists()) {
          await setDoc(huntRef, { completions: {} });
          console.log('✅ Firebase hunt initialized!');
        }
      } catch (error) {
        console.error('Error initializing Firebase:', error);
      }
    };

    initializeFirebase();
  }, []);

  // Load unlock status on mount
  useEffect(() => {
    loadUnlockStatus();
  }, []);

  // Real-time listener for clue completions
  useEffect(() => {
    if (!isHuntUnlocked) return;

    const unsubscribe = onSnapshot(doc(db, 'hunts', 'desert-disco-2025'), (doc) => {
      if (doc.exists()) {
        setClueCompletions(doc.data().completions || {});
      }
    }, (error) => {
      console.error('Error listening to completions:', error);
    });

    return () => unsubscribe();
  }, [isHuntUnlocked]);

  const loadUnlockStatus = async () => {
    try {
      const huntUnlocked = await AsyncStorage.getItem('huntUnlocked');
      const manageUnlocked = await AsyncStorage.getItem('manageUnlocked');
      
      if (huntUnlocked === 'true') {
        setIsHuntUnlocked(true);
      }
      if (manageUnlocked === 'true') {
        setIsUnlocked(true);
      }
    } catch (error) {
      console.log('Error loading unlock status:', error);
    }
  };

  const [clues, setClues] = useState([
    // Historic Plaza & Downtown (15 clues)
    { id: 1, title: 'New Mexico Statehood', description: 'Stand where New Mexico statehood was signed - Palace of the Governors portal', location: 'Historic Plaza', points: 15, category: 'Historic Plaza' },
    { id: 2, title: 'Oldest House in USA', description: 'Find the oldest house in the USA (circa 1200s) on De Vargas Street', location: 'Historic Plaza', points: 20, category: 'Historic Plaza' },
    { id: 3, title: 'San Miguel Mission', description: 'Touch the adobe wall of San Miguel Mission - oldest church structure in the US', location: 'Historic Plaza', points: 15, category: 'Historic Plaza' },
    { id: 4, title: 'Miraculous Staircase', description: 'Photograph the miraculous spiral staircase at Loretto Chapel', location: 'Historic Plaza', points: 20, category: 'Historic Plaza' },
    { id: 5, title: 'Palace Portal Jewelry', description: 'Spot silver and turquoise jewelry under the Palace portal', location: 'Historic Plaza', points: 10, category: 'Historic Plaza' },
    { id: 6, title: 'La Fonda Bell Tower', description: 'Find the La Fonda hotel bell tower - take a rooftop photo if possible', location: 'Historic Plaza', points: 15, category: 'Historic Plaza' },
    { id: 7, title: 'Chile Ristra', description: 'Locate a chile ristra (hanging red chiles) on any building', location: 'Historic Plaza', points: 10, category: 'Historic Plaza' },
    { id: 8, title: 'Plaza Obelisk', description: 'Stand at the Plaza obelisk and make a wish for the bride', location: 'Historic Plaza', points: 15, category: 'Historic Plaza' },
    { id: 9, title: 'Cathedral Basilica', description: 'Find the Cathedral Basilica of St. Francis and photograph its Romanesque architecture', location: 'Historic Plaza', points: 15, category: 'Historic Plaza' },
    { id: 10, title: 'Coyote Fence', description: 'Spot a coyote fence (vertical cedar posts) anywhere downtown', location: 'Historic Plaza', points: 10, category: 'Historic Plaza' },
    { id: 11, title: 'Authentic Turquoise', description: 'Find authentic turquoise from a Native artisan - price check the most expensive piece', location: 'Historic Plaza', points: 15, category: 'Historic Plaza' },
    { id: 12, title: 'Historic Firehouse', description: 'Locate the Santa Fe Fire Department - one of the oldest firehouses', location: 'Historic Plaza', points: 10, category: 'Historic Plaza' },
    { id: 13, title: 'Vigas', description: 'Find vigas (wooden roof beams) protruding from an adobe building', location: 'Historic Plaza', points: 10, category: 'Historic Plaza' },
    { id: 14, title: 'Zia Sun Symbol', description: 'Spot a zia sun symbol anywhere (New Mexico state symbol)', location: 'Historic Plaza', points: 10, category: 'Historic Plaza' },
    { id: 15, title: 'Scottish Rite Temple', description: 'Find the Scottish Rite Temple - photograph its unusual architecture', location: 'Historic Plaza', points: 15, category: 'Historic Plaza' },

    // Canyon Road Art District (12 clues)
    { id: 16, title: 'El Farol', description: 'Find El Farol - the oldest cantina in Santa Fe (1835)', location: 'Canyon Road', points: 15, category: 'Canyon Road' },
    { id: 17, title: 'Allan Houser Sculpture', description: 'Spot a sculpture by Allan Houser (famous Native American artist)', location: 'Canyon Road', points: 20, category: 'Canyon Road' },
    { id: 18, title: 'Iconic Turquoise Door', description: 'Find the iconic turquoise door - most photographed door on Canyon Road', location: 'Canyon Road', points: 20, category: 'Canyon Road' },
    { id: 19, title: 'Geronimo Restaurant', description: 'Locate Geronimo Restaurant - peek inside or take an exterior photo', location: 'Canyon Road', points: 15, category: 'Canyon Road' },
    { id: 20, title: 'Pueblo Pottery', description: 'Find contemporary pueblo pottery - photograph the boldest geometric pattern', location: 'Canyon Road', points: 15, category: 'Canyon Road' },
    { id: 21, title: 'Sculpture Garden', description: 'Spot an outdoor sculpture garden and pose with the largest piece', location: 'Canyon Road', points: 15, category: 'Canyon Road' },
    { id: 22, title: 'Georgia O\'Keeffe Painting', description: 'Find a painting of Georgia O\'Keeffe\'s New Mexico landscapes', location: 'Canyon Road', points: 15, category: 'Canyon Road' },
    { id: 23, title: 'Gallery Dog', description: 'Locate a gallery dog and get permission for a photo', location: 'Canyon Road', points: 20, category: 'Canyon Road' },
    { id: 24, title: 'Tin Work', description: 'Find handmade tin work (retablos or niches)', location: 'Canyon Road', points: 10, category: 'Canyon Road' },
    { id: 25, title: 'Luminaria Hooks', description: 'Spot a luminaria (farolito) or the hooks where they hang at Christmas', location: 'Canyon Road', points: 10, category: 'Canyon Road' },
    { id: 26, title: 'Contemporary Native Jewelry', description: 'Find contemporary Native American jewelry with unusual stones', location: 'Canyon Road', points: 15, category: 'Canyon Road' },
    { id: 27, title: 'Metal Sculpture', description: 'Locate outdoor sculpture metal work - photograph the most intricate piece', location: 'Canyon Road', points: 15, category: 'Canyon Road' },

    // Railyard District (10 clues)
    { id: 28, title: 'Water Tower', description: 'Find the historic water tower - take a photo underneath', location: 'Railyard', points: 15, category: 'Railyard' },
    { id: 29, title: 'Farmers Market', description: 'Spot the farmers market pavilion (even if closed)', location: 'Railyard', points: 10, category: 'Railyard' },
    { id: 30, title: 'SITE Santa Fe', description: 'Find SITE Santa Fe contemporary art center', location: 'Railyard', points: 10, category: 'Railyard' },
    { id: 31, title: 'Train Depot', description: 'Locate the historic train depot or rail remnants', location: 'Railyard', points: 15, category: 'Railyard' },
    { id: 32, title: 'Street Art', description: 'Find outdoor murals or street art in the Railyard', location: 'Railyard', points: 10, category: 'Railyard' },
    { id: 33, title: 'Violet Crown Cinema', description: 'Spot Violet Crown Cinema or take a photo with the sign', location: 'Railyard', points: 10, category: 'Railyard' },
    { id: 34, title: 'Second Street Brewery', description: 'Find the Second Street Brewery beer garden', location: 'Railyard', points: 10, category: 'Railyard' },
    { id: 35, title: 'Industrial Sculpture', description: 'Locate recycled metal yard art or industrial sculpture', location: 'Railyard', points: 15, category: 'Railyard' },
    { id: 36, title: 'Iconik Coffee', description: 'Find Iconik Coffee Roasters and photograph their roasting equipment', location: 'Railyard', points: 15, category: 'Railyard' },
    { id: 37, title: 'Cowboy Hat', description: 'Spot a cowboy hat on someone - compliment them and get a photo', location: 'Railyard', points: 20, category: 'Railyard' },

    // Outdoor & Nature (11 clues)
    { id: 38, title: 'Cholla Cactus', description: 'Find cholla cactus - photograph its distinctive jointed appearance', location: 'Outdoors', points: 10, category: 'Outdoors' },
    { id: 39, title: 'Piñon Pine', description: 'Spot piñon pine trees (New Mexico state tree)', location: 'Outdoors', points: 10, category: 'Outdoors' },
    { id: 40, title: 'Sangre de Cristo Mountains', description: 'Capture a view of the Sangre de Cristo mountains', location: 'Outdoors', points: 15, category: 'Outdoors' },
    { id: 41, title: 'Juniper Trees', description: 'Find juniper trees with their blue berries', location: 'Outdoors', points: 10, category: 'Outdoors' },
    { id: 42, title: 'Rock Cairn', description: 'Photograph a rock cairn on any trail', location: 'Outdoors', points: 10, category: 'Outdoors' },
    { id: 43, title: 'Santa Fe River', description: 'Find the Santa Fe River (yes, it exists!)', location: 'Outdoors', points: 15, category: 'Outdoors' },
    { id: 44, title: 'Red Sandstone', description: 'Spot red sandstone formations', location: 'Outdoors', points: 10, category: 'Outdoors' },
    { id: 45, title: 'Scenic Overlook', description: 'Find a scenic overlook with 360-degree views', location: 'Outdoors', points: 20, category: 'Outdoors' },
    { id: 46, title: 'Chamisa Bush', description: 'Photograph a chamisa bush (rabbitbrush) - yellow flowering shrub', location: 'Outdoors', points: 10, category: 'Outdoors' },
    { id: 47, title: 'New Mexico Sunset', description: 'Capture a New Mexico sunset with pink and orange sky', location: 'Outdoors', points: 20, category: 'Outdoors' },
    { id: 48, title: 'Roadrunner', description: 'Find evidence of roadrunners (the bird, not cartoon)', location: 'Outdoors', points: 15, category: 'Outdoors' },

    // Food & Drink (15 clues)
    { id: 49, title: 'Christmas Style', description: 'Order "Christmas style" - red AND green chile on one plate', location: 'Restaurant', points: 15, category: 'Food' },
    { id: 50, title: 'Blue Corn', description: 'Find blue corn anything - tortillas, pancakes, chips', location: 'Restaurant', points: 10, category: 'Food' },
    { id: 51, title: 'Posole', description: 'Spot authentic posole on a menu', location: 'Restaurant', points: 10, category: 'Food' },
    { id: 52, title: 'Green Chile Stew', description: 'Find green chile stew - the New Mexico state question', location: 'Restaurant', points: 15, category: 'Food' },
    { id: 53, title: 'Sopapillas', description: 'Locate sopapillas - photograph them puffy and golden', location: 'Restaurant', points: 10, category: 'Food' },
    { id: 54, title: 'Hatch Chile Margarita', description: 'Find a margarita with Hatch chile rim', location: 'Bar', points: 15, category: 'Food' },
    { id: 55, title: 'Carne Adovada', description: 'Spot carne adovada on any menu', location: 'Restaurant', points: 10, category: 'Food' },
    { id: 56, title: 'Piñon Coffee', description: 'Find piñon coffee at any café', location: 'Café', points: 10, category: 'Food' },
    { id: 57, title: 'Biscochitos', description: 'Locate biscochitos (New Mexico state cookie) anywhere', location: 'Bakery', points: 15, category: 'Food' },
    { id: 58, title: 'Meow Wolf Reference', description: 'Find Meow Wolf-branded merchandise or references at a bar', location: 'Bar', points: 15, category: 'Food' },
    { id: 59, title: 'Fry Bread', description: 'Spot fry bread or Navajo tacos on a menu', location: 'Restaurant', points: 15, category: 'Food' },
    { id: 60, title: 'Local Honey', description: 'Find local honey from New Mexico wildflowers', location: 'Shop', points: 10, category: 'Food' },
    { id: 61, title: 'Lamb Dish', description: 'Locate a restaurant serving lamb (huge in NM)', location: 'Restaurant', points: 10, category: 'Food' },
    { id: 62, title: 'Kiwi Connection', description: 'Find NZ-style flat white coffee or reference to Kiwi anything', location: 'Café', points: 20, category: 'Food' },
    { id: 63, title: 'Calabacitas', description: 'Spot calabacitas (squash dish) on any menu', location: 'Restaurant', points: 10, category: 'Food' },

    // Shopping & Crafts (10 clues)
    { id: 64, title: 'Kokopelli', description: 'Find Kokopelli (humpbacked flute player) on anything', location: 'Shop', points: 10, category: 'Shopping' },
    { id: 65, title: 'Santos', description: 'Spot hand-carved santos (religious folk art)', location: 'Shop', points: 15, category: 'Shopping' },
    { id: 66, title: 'Storyteller Pottery', description: 'Find genuine storyteller pottery (Pueblo tradition)', location: 'Shop', points: 15, category: 'Shopping' },
    { id: 67, title: 'Chimayó Textiles', description: 'Locate hand-woven Chimayó textiles or blankets', location: 'Shop', points: 15, category: 'Shopping' },
    { id: 68, title: 'Concho Belt', description: 'Find silver concho belts (traditional Native metalwork)', location: 'Shop', points: 15, category: 'Shopping' },
    { id: 69, title: 'Turquoise & Coral', description: 'Spot turquoise and coral jewelry combination', location: 'Shop', points: 10, category: 'Shopping' },
    { id: 70, title: 'Tooled Leather', description: 'Find handmade leather goods with southwestern tooling', location: 'Shop', points: 10, category: 'Shopping' },
    { id: 71, title: 'Kachina Dolls', description: 'Locate kachina dolls (Hopi tradition)', location: 'Shop', points: 15, category: 'Shopping' },
    { id: 72, title: 'Piñon Incense', description: 'Find piñon incense or smudge sticks', location: 'Shop', points: 10, category: 'Shopping' },
    { id: 73, title: 'Pendleton Blankets', description: 'Spot Pendleton wool blankets or products', location: 'Shop', points: 10, category: 'Shopping' },

    // Mystical & Cultural (7 clues)
    { id: 74, title: 'Sage Bundles', description: 'Find a shop selling sage bundles for smudging', location: 'Shop', points: 10, category: 'Mystical' },
    { id: 75, title: 'NM Minerals', description: 'Locate crystals or mineral specimens from New Mexico', location: 'Shop', points: 10, category: 'Mystical' },
    { id: 76, title: 'Dreamcatchers', description: 'Find dreamcatchers (Ojibwe tradition, popular in Santa Fe)', location: 'Shop', points: 10, category: 'Mystical' },
    { id: 77, title: 'Spirit Animals', description: 'Spot spirit animal or totem references anywhere', location: 'Shop', points: 10, category: 'Mystical' },
    { id: 78, title: 'Tarot Shop', description: 'Find a tarot or metaphysical shop', location: 'Downtown', points: 15, category: 'Mystical' },
    { id: 79, title: 'Prayer Flags', description: 'Locate prayer flags (Tibetan, common in Santa Fe)', location: 'Outdoors', points: 10, category: 'Mystical' },
    { id: 80, title: 'Labyrinth', description: 'Find a labyrinth or mandala anywhere in town', location: 'Outdoors', points: 20, category: 'Mystical' },
  ]);

  const teams = ['Green Chiles', 'Sopaipillas', 'Frito Pies'];
  const categories = ['Historic Plaza', 'Canyon Road', 'Railyard', 'Outdoors', 'Food', 'Shopping', 'Mystical'];

  const handleLogin = async () => {
    if (loginCode === '459-WILD') {
      setIsUnlocked(true);
      setLoginCode('');
      try {
        await AsyncStorage.setItem('manageUnlocked', 'true');
      } catch (error) {
        console.log('Error saving unlock status:', error);
      }
    } else {
      Alert.alert('Incorrect Code', 'Please try again!');
      setLoginCode('');
    }
  };

  const handleHuntLogin = async () => {
    if (huntLoginCode.toUpperCase() === 'MEOWWOLF') {
      setIsHuntUnlocked(true);
      setHuntLoginCode('');
      try {
        await AsyncStorage.setItem('huntUnlocked', 'true');
      } catch (error) {
        console.log('Error saving unlock status:', error);
      }
    } else {
      Alert.alert('Incorrect Code', 'Please try again!');
      setHuntLoginCode('');
    }
  };

  const pickImage = async (clueId) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need camera roll permissions to upload photos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled && result.assets[0]) {
      completeClue(clueId, result.assets[0].uri);
    }
  };

  const takePhoto = async (clueId) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need camera permissions to take photos!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled && result.assets[0]) {
      completeClue(clueId, result.assets[0].uri);
    }
  };

  const completeClue = async (clueId, photoUri) => {
    if (!userTeam) {
      Alert.alert('Error', 'Could not determine your team');
      return;
    }

    try {
      Alert.alert('Uploading...', 'Please wait while we upload your photo');

      // Upload photo to Firebase Storage
      const response = await fetch(photoUri);
      const blob = await response.blob();
      const photoRef = ref(storage, `clue-photos/${clueId}-${userTeam}-${Date.now()}.jpg`);
      await uploadBytes(photoRef, blob);
      const photoURL = await getDownloadURL(photoRef);

      // Save completion to Firestore
      const huntRef = doc(db, 'hunts', 'desert-disco-2025');
      const newCompletions = {
        ...clueCompletions,
        [clueId]: {
          ...clueCompletions[clueId],
          [userTeam]: {
            completed: true,
            completedBy: currentUser,
            photo: photoURL,
            timestamp: new Date().toISOString(),
          }
        }
      };

      await setDoc(huntRef, { completions: newCompletions }, { merge: true });
      Alert.alert('Success!', `Clue completed for ${userTeam}!`);
    } catch (error) {
      console.error('Error completing clue:', error);
      Alert.alert('Error', 'Failed to complete clue. Please try again.');
    }
  };

  const undoCompletion = async (clueId) => {
    if (!userTeam) return;

    try {
      const huntRef = doc(db, 'hunts', 'desert-disco-2025');
      const newCompletions = { ...clueCompletions };
      
      if (newCompletions[clueId] && newCompletions[clueId][userTeam]) {
        delete newCompletions[clueId][userTeam];
      }

      await setDoc(huntRef, { completions: newCompletions }, { merge: true });
    } catch (error) {
      console.error('Error undoing completion:', error);
      Alert.alert('Error', 'Failed to undo completion.');
    }
  };

  const isClueCompletedByTeam = (clueId, team) => {
    return clueCompletions[clueId]?.[team]?.completed || false;
  };

  const getCluePhoto = (clueId, team) => {
    return clueCompletions[clueId]?.[team]?.photo || null;
  };

  const viewPhoto = (photoUri) => {
    setSelectedPhoto(photoUri);
    setPhotoModalVisible(true);
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
    if (!userTeam) return { total: 0, completed: 0, totalPoints: 0, earnedPoints: 0 };

    const total = clues.length;
    const completed = clues.filter(c => isClueCompletedByTeam(c.id, userTeam)).length;
    const totalPoints = clues.reduce((sum, c) => sum + c.points, 0);
    const earnedPoints = clues.filter(c => isClueCompletedByTeam(c.id, userTeam)).reduce((sum, c) => sum + c.points, 0);
    
    return { total, completed, totalPoints, earnedPoints };
  };

  const calculateTeamStats = (team) => {
    const completed = clues.filter(c => isClueCompletedByTeam(c.id, team)).length;
    const points = clues.filter(c => isClueCompletedByTeam(c.id, team)).reduce((sum, c) => sum + c.points, 0);
    return { clues: completed, points };
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      'Historic Plaza': colors.magenta,
      'Canyon Road': colors.orange,
      'Railyard': colors.chartreuse,
      'Outdoors': colors.plum,
      'Food': colors.orange,
      'Shopping': colors.chartreuse,
      'Mystical': colors.plum,
    };
    return categoryColors[category] || colors.oliveGreen;
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Group clues by category and filter by search
  const getCluesByCategory = () => {
    const grouped = {};
    
    categories.forEach(category => {
      const categoryClues = clues.filter(clue => {
        const matchesCategory = clue.category === category;
        const matchesSearch = searchQuery === '' ||
                            clue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            clue.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
      
      if (categoryClues.length > 0) {
        grouped[category] = categoryClues;
      }
    });
    
    return grouped;
  };

  const stats = calculateStats();
  const cluesByCategory = getCluesByCategory();

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
                <Text style={styles.statsTitle}>Team {userTeam}</Text>
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

              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                  <Icon name="search" size={20} color={colors.oliveGreen} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search clues..."
                    placeholderTextColor={colors.oliveGreen}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                      <Icon name="close" size={20} color={colors.oliveGreen} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Collapsible Category Sections */}
              <View style={styles.cluesContainer}>
                {Object.keys(cluesByCategory).length === 0 ? (
                  <View style={styles.emptyState}>
                    <Icon name="search-off" size={48} color={colors.oliveGreen} />
                    <Text style={styles.emptyStateText}>No clues match your search</Text>
                  </View>
                ) : (
                  Object.keys(cluesByCategory).map((category) => {
                    const categoryClues = cluesByCategory[category];
                    const isExpanded = expandedCategories[category];
                    const completedCount = categoryClues.filter(c => isClueCompletedByTeam(c.id, userTeam)).length;
                    
                    return (
                      <View key={category} style={styles.categorySection}>
                        <TouchableOpacity
                          style={[styles.categoryHeader, { backgroundColor: getCategoryColor(category) }]}
                          onPress={() => toggleCategory(category)}
                        >
                          <View style={styles.categoryHeaderLeft}>
                            <Icon 
                              name={isExpanded ? "expand-less" : "expand-more"} 
                              size={24} 
                              color="white" 
                            />
                            <Text style={styles.categoryHeaderText}>{category}</Text>
                          </View>
                          <Text style={styles.categoryCount}>
                            {completedCount}/{categoryClues.length}
                          </Text>
                        </TouchableOpacity>

                        {isExpanded && categoryClues.map((clue) => {
                          const completedByMyTeam = isClueCompletedByTeam(clue.id, userTeam);
                          const photo = getCluePhoto(clue.id, userTeam);
                          const completedByOtherTeams = teams.filter(t => t !== userTeam && isClueCompletedByTeam(clue.id, t));

                          return (
                            <View
                              key={clue.id}
                              style={[styles.clueCard, completedByMyTeam && styles.completedClueCard]}
                            >
                              <View style={styles.clueHeader}>
                                <Text style={styles.pointsBadge}>+{clue.points} pts</Text>
                              </View>

                              <Text style={[styles.clueTitle, completedByMyTeam && styles.completedText]}>
                                {clue.title}
                              </Text>
                              <Text style={styles.clueDescription}>{clue.description}</Text>
                              <Text style={styles.clueLocation}>📍 {clue.location}</Text>

                              {completedByMyTeam && (
                                <View style={styles.completedInfo}>
                                  <Text style={styles.completedBy}>✅ Completed by {userTeam}</Text>
                                  {photo && (
                                    <TouchableOpacity onPress={() => viewPhoto(photo)} style={styles.photoPreview}>
                                      <Image source={{ uri: photo }} style={styles.photoThumbnail} />
                                      <Text style={styles.viewPhotoText}>View Photo</Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              )}

                              {completedByOtherTeams.length > 0 && (
                                <Text style={styles.otherTeamsCompleted}>
                                  Also completed by: {completedByOtherTeams.join(', ')}
                                </Text>
                              )}

                              <View style={styles.clueActions}>
                                {!completedByMyTeam && (
                                  <View style={styles.actionButtons}>
                                    <TouchableOpacity
                                      style={[styles.completeButton, { flex: 1, marginRight: 8 }]}
                                      onPress={() => takePhoto(clue.id)}
                                    >
                                      <Icon name="photo-camera" size={20} color="white" />
                                      <Text style={styles.completeButtonText}>Take Photo</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      style={[styles.completeButton, { flex: 1 }]}
                                      onPress={() => pickImage(clue.id)}
                                    >
                                      <Icon name="photo-library" size={20} color="white" />
                                      <Text style={styles.completeButtonText}>Upload</Text>
                                    </TouchableOpacity>
                                  </View>
                                )}
                                {completedByMyTeam && (
                                  <TouchableOpacity
                                    style={styles.uncompleteButton}
                                    onPress={() => undoCompletion(clue.id)}
                                  >
                                    <Icon name="undo" size={20} color={colors.text} />
                                    <Text style={styles.uncompleteButtonText}>Undo</Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })
                )}
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
              .map(team => ({
                team,
                ...calculateTeamStats(team)
              }))
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
                <Text style={styles.manageTitle}>⚙️ Manage Hunt</Text>
                
                {/* Team Management Button */}
                <TouchableOpacity
                  style={styles.teamManagementButton}
                  onPress={() => setTeamManagementVisible(true)}
                >
                  <Icon name="group" size={24} color="white" />
                  <Text style={styles.teamManagementButtonText}>View Teams</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.addClueButton}
                  onPress={() => setAddClueModalVisible(true)}
                >
                  <Icon name="add-circle" size={24} color="white" />
                  <Text style={styles.addClueButtonText}>Add New Clue</Text>
                </TouchableOpacity>
              </View>

              {clues.map((clue) => {
                const teamsCompleted = teams.filter(t => isClueCompletedByTeam(clue.id, t));
                return (
                  <View key={clue.id} style={styles.manageClueCard}>
                    <View style={styles.manageClueInfo}>
                      <Text style={styles.manageClueTitle}>{clue.title}</Text>
                      <Text style={styles.manageClueCategory}>{clue.category} • {clue.points} pts</Text>
                      <Text style={styles.completionStatus}>
                        {teamsCompleted.length > 0 ? teamsCompleted.join(', ') : 'Not completed'}
                      </Text>
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
                );
              })}
            </View>
          )
        )}
      </ScrollView>

      {/* Team Management Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={teamManagementVisible}
        onRequestClose={() => setTeamManagementVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Team Management</Text>
              <TouchableOpacity onPress={() => setTeamManagementVisible(false)}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.teamManagementContent}>
              {teams.map(team => {
                const stats = calculateTeamStats(team);
                const teamMembers = getUsersByTeam(team);
                
                return (
                  <View key={team} style={styles.teamManagementCard}>
                    <View style={styles.teamHeader}>
                      <Icon name="group" size={24} color={getCategoryColor(team === 'Green Chiles' ? 'Food' : team === 'Sopaipillas' ? 'Shopping' : 'Mystical')} />
                      <Text style={styles.teamManagementName}>{team}</Text>
                    </View>
                    
                    <Text style={styles.teamManagementStats}>
                      {stats.clues} clues completed • {stats.points} points
                    </Text>

                    {/* Team Members Section */}
                    <View style={styles.teamMembersSection}>
                      <View style={styles.teamMembersHeader}>
                        <Text style={styles.teamMembersTitle}>Team Members (5):</Text>
                        <TouchableOpacity
                          style={styles.editTeamButton}
                          onPress={() => {
                            setEditingTeam(team);
                            setTeamReassignModalVisible(true);
                          }}
                        >
                          <Icon name="edit" size={16} color={colors.magenta} />
                          <Text style={styles.editTeamButtonText}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.membersList}>
                        {teamMembers.map((member, index) => (
                          <View key={index} style={[
                            styles.memberChip,
                            !member.hasLoggedIn && styles.memberChipInactive
                          ]}>
                            <Icon 
                              name={member.hasLoggedIn ? "person" : "person-outline"} 
                              size={14} 
                              color={member.hasLoggedIn ? colors.magenta : colors.oliveGreen} 
                            />
                            <Text style={[
                              styles.memberName,
                              !member.hasLoggedIn && styles.memberNameInactive
                            ]}>
                              {member.name}
                            </Text>
                            {member.hasLoggedIn && (
                              <Icon name="check-circle" size={14} color={colors.chartreuse} style={{ marginLeft: 4 }} />
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                    
                    {/* Show photos for this team */}
                    <View style={styles.teamPhotosSection}>
                      <Text style={styles.teamPhotosTitle}>Recent Completions:</Text>
                      <View style={styles.teamPhotos}>
                        {clues
                          .filter(c => isClueCompletedByTeam(c.id, team))
                          .slice(0, 6)
                          .map(clue => {
                            const photo = getCluePhoto(clue.id, team);
                            return photo ? (
                              <TouchableOpacity
                                key={clue.id}
                                onPress={() => viewPhoto(photo)}
                                style={styles.teamPhotoThumb}
                              >
                                <Image source={{ uri: photo }} style={styles.teamPhotoImage} />
                                <Text style={styles.teamPhotoCaption} numberOfLines={1}>
                                  {clue.title}
                                </Text>
                              </TouchableOpacity>
                            ) : null;
                          })}
                        {clues.filter(c => isClueCompletedByTeam(c.id, team)).length === 0 && (
                          <Text style={styles.noPhotosText}>No clues completed yet</Text>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Team Reassignment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={teamReassignModalVisible}
        onRequestClose={() => setTeamReassignModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit {editingTeam}</Text>
              <TouchableOpacity onPress={() => setTeamReassignModalVisible(false)}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.reassignContent}>
              <Text style={styles.reassignInstructions}>
                Team assignments are hardcoded in UserContext.js. To change teams, update the teamAssignments object and restart the app.
              </Text>
              <Text style={styles.reassignNote}>
                Current members of {editingTeam}:
              </Text>
              {editingTeam && getUsersByTeam(editingTeam).map((member, index) => (
                <Text key={index} style={styles.reassignMemberText}>• {member.name}</Text>
              ))}
              <TouchableOpacity
                style={styles.reassignCloseButton}
                onPress={() => setTeamReassignModalVisible(false)}
              >
                <Text style={styles.reassignCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Photo View Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={photoModalVisible}
        onRequestClose={() => setPhotoModalVisible(false)}
      >
        <View style={styles.photoModalOverlay}>
          <TouchableOpacity 
            style={styles.photoModalClose}
            onPress={() => setPhotoModalVisible(false)}
          >
            <Icon name="close" size={30} color="white" />
          </TouchableOpacity>
          {selectedPhoto && (
            <Image source={{ uri: selectedPhoto }} style={styles.fullPhoto} resizeMode="contain" />
          )}
        </View>
      </Modal>

      {/* Add Clue Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addClueModalVisible}
        onRequestClose={() => setAddClueModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Add New Clue</Text>
                    <TouchableOpacity onPress={() => {
                      Keyboard.dismiss();
                      setAddClueModalVisible(false);
                    }}>
                      <Icon name="close" size={24} color={colors.text} />
                    </TouchableOpacity>
                  </View>

                  <ScrollView 
                    style={styles.formContainer}
                    keyboardShouldPersistTaps="handled"
                  >
                    <Text style={styles.inputLabel}>Clue Title</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newClue.title}
                      onChangeText={(text) => setNewClue({...newClue, title: text})}
                      placeholder="e.g., Find the Turquoise Treasure"
                      placeholderTextColor={colors.oliveGreen}
                      returnKeyType="next"
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
                      returnKeyType="next"
                    />

                    <Text style={styles.inputLabel}>Location</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newClue.location}
                      onChangeText={(text) => setNewClue({...newClue, location: text})}
                      placeholder="e.g., Santa Fe Plaza"
                      placeholderTextColor={colors.oliveGreen}
                      returnKeyType="next"
                    />

                    <Text style={styles.inputLabel}>Points</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newClue.points}
                      onChangeText={(text) => setNewClue({...newClue, points: text})}
                      placeholder="10"
                      keyboardType="numeric"
                      placeholderTextColor={colors.oliveGreen}
                      returnKeyType="done"
                      onSubmitEditing={Keyboard.dismiss}
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

                    <TouchableOpacity 
                      style={styles.submitButton} 
                      onPress={() => {
                        Keyboard.dismiss();
                        addClue();
                      }}
                    >
                      <Text style={styles.submitButtonText}>Add Clue</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>

      {/* Edit Clue Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editClueModalVisible}
        onRequestClose={() => setEditClueModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Edit Clue</Text>
                    <TouchableOpacity onPress={() => {
                      Keyboard.dismiss();
                      setEditClueModalVisible(false);
                    }}>
                      <Icon name="close" size={24} color={colors.text} />
                    </TouchableOpacity>
                  </View>

                  {selectedClue && (
                    <ScrollView 
                      style={styles.formContainer}
                      keyboardShouldPersistTaps="handled"
                    >
                      <Text style={styles.inputLabel}>Clue Title</Text>
                      <TextInput
                        style={styles.textInput}
                        value={selectedClue.title}
                        onChangeText={(text) => setSelectedClue({...selectedClue, title: text})}
                        placeholder="e.g., Find the Turquoise Treasure"
                        placeholderTextColor={colors.oliveGreen}
                        returnKeyType="next"
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
                        returnKeyType="next"
                      />

                      <Text style={styles.inputLabel}>Location</Text>
                      <TextInput
                        style={styles.textInput}
                        value={selectedClue.location}
                        onChangeText={(text) => setSelectedClue({...selectedClue, location: text})}
                        placeholder="e.g., Santa Fe Plaza"
                        placeholderTextColor={colors.oliveGreen}
                        returnKeyType="next"
                      />

                      <Text style={styles.inputLabel}>Points</Text>
                      <TextInput
                        style={styles.textInput}
                        value={String(selectedClue.points)}
                        onChangeText={(text) => setSelectedClue({...selectedClue, points: parseInt(text) || 10})}
                        placeholder="10"
                        keyboardType="numeric"
                        placeholderTextColor={colors.oliveGreen}
                        returnKeyType="done"
                        onSubmitEditing={Keyboard.dismiss}
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

                      <TouchableOpacity 
                        style={styles.submitButton} 
                        onPress={() => {
                          Keyboard.dismiss();
                          editClue();
                        }}
                      >
                        <Text style={styles.submitButtonText}>Save Changes</Text>
                      </TouchableOpacity>
                    </ScrollView>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
  searchContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text,
  },
  cluesContainer: {
    padding: 15,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.oliveGreen,
    marginTop: 10,
  },
  categorySection: {
    marginBottom: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  categoryCount: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  clueCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    marginBottom: 10,
    marginLeft: 8,
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
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
  completedInfo: {
    marginTop: 10,
  },
  completedBy: {
    fontSize: 12,
    color: colors.chartreuse,
    fontWeight: '600',
    marginBottom: 8,
  },
  photoPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  photoThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  viewPhotoText: {
    fontSize: 14,
    color: colors.magenta,
    textDecorationLine: 'underline',
  },
  otherTeamsCompleted: {
    fontSize: 11,
    color: colors.oliveGreen,
    fontStyle: 'italic',
    marginTop: 5,
  },
  clueActions: {
    marginTop: 10,
  },
  actionButtons: {
    flexDirection: 'row',
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
    fontSize: 13,
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
  photoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoModalClose: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  fullPhoto: {
    width: '90%',
    height: '80%',
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
  teamManagementButton: {
    backgroundColor: colors.plum,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamManagementButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
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
  completionStatus: {
    fontSize: 12,
    color: colors.chartreuse,
    marginTop: 3,
    fontStyle: 'italic',
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
  teamManagementContent: {
    padding: 20,
  },
  teamManagementCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  teamManagementName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.magenta,
    marginLeft: 10,
  },
  teamManagementStats: {
    fontSize: 14,
    color: colors.oliveGreen,
    marginBottom: 15,
  },
  teamMembersSection: {
    marginTop: 15,
    marginBottom: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E8E4DA',
  },
  teamMembersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  teamMembersTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  editTeamButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 6,
    backgroundColor: colors.background,
  },
  editTeamButtonText: {
    fontSize: 12,
    color: colors.magenta,
    marginLeft: 4,
    fontWeight: '600',
  },
  membersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  memberChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  memberChipInactive: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  memberName: {
    fontSize: 13,
    color: colors.text,
    marginLeft: 5,
    fontWeight: '500',
  },
  memberNameInactive: {
    color: colors.oliveGreen,
    fontStyle: 'italic',
  },
  teamPhotosSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E8E4DA',
  },
  teamPhotosTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
  },
  teamPhotos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  teamPhotoThumb: {
    marginRight: 8,
    marginBottom: 8,
  },
  teamPhotoImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  teamPhotoCaption: {
    fontSize: 10,
    color: colors.oliveGreen,
    marginTop: 4,
    textAlign: 'center',
    width: 80,
  },
  noPhotosText: {
    fontSize: 13,
    color: colors.oliveGreen,
    fontStyle: 'italic',
  },
  reassignContent: {
    padding: 20,
  },
  reassignInstructions: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 20,
  },
  reassignNote: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.magenta,
    marginBottom: 10,
  },
  reassignMemberText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
    marginLeft: 10,
  },
  reassignCloseButton: {
    backgroundColor: colors.magenta,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  reassignCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
