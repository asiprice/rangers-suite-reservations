/**
 * Texas Rangers Suite Reservation App
 * Expo React Native App
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Game } from './src/types';
import { gameApi } from './src/api';
import GameList from './src/components/GameList';
import ReservationScreen from './src/screens/ReservationScreen';

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const gamesData = await gameApi.getAll();
      setGames(gamesData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load games. Make sure the backend server is running.');
      console.error('Error loading games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
  };

  const handleBackToGameList = () => {
    setSelectedGame(null);
    loadGames(); // Refresh games to update capacity counts
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#003278" />
        <Text style={styles.loadingText}>Loading Rangers Games...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Texas Rangers</Text>
        <Text style={styles.headerSubtitle}>Suite Reservations</Text>
      </View>

      {selectedGame ? (
        <ReservationScreen 
          game={selectedGame} 
          onBack={handleBackToGameList}
        />
      ) : (
        <GameList
          games={games}
          selectedGame={null}
          onGameSelect={handleGameSelect}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#003278',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#c8102e',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.9,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
