import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Game, Reservation } from '../types';
import { gameApi, reservationApi } from '../api';
import ReservationForm from '../components/ReservationForm';
import ReservationList from '../components/ReservationList';

interface ReservationScreenProps {
  game: Game;
  onBack: () => void;
}

const ReservationScreen: React.FC<ReservationScreenProps> = ({ game, onBack }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const data = await gameApi.getReservations(game.id);
      setReservations(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load reservations');
      console.error('Error loading reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReservationSubmit = async (reservation: Omit<Reservation, 'id' | 'created_at'>) => {
    try {
      if (editingReservation) {
        await reservationApi.update(editingReservation.id!, reservation);
      } else {
        await reservationApi.create(reservation);
      }
      
      setShowForm(false);
      setEditingReservation(null);
      await loadReservations();
    } catch (error) {
      Alert.alert('Error', 'Failed to save reservation');
      console.error('Error saving reservation:', error);
    }
  };

  const handleEdit = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await reservationApi.delete(id);
      await loadReservations();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete reservation');
      console.error('Error deleting reservation:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowForm(true)}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gameInfo}>
        <Text style={styles.gameTitle}>{game.opponent}</Text>
        <Text style={styles.gameDate}>{formatDate(game.date)} at {game.start_time}</Text>
        
        <View style={styles.capacityInfo}>
          <View style={styles.capacityStat}>
            <Text style={styles.capacityNumber}>{game.suite_capacity}</Text>
            <Text style={styles.capacityLabel}>Capacity</Text>
          </View>
          <View style={styles.capacityStat}>
            <Text style={styles.capacityNumber}>{game.reserved_spots}</Text>
            <Text style={styles.capacityLabel}>Reserved</Text>
          </View>
          <View style={styles.capacityStat}>
            <Text style={[styles.capacityNumber, game.available_spots === 0 && styles.fullCapacity]}>
              {game.available_spots}
            </Text>
            <Text style={styles.capacityLabel}>Available</Text>
          </View>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#003278" />
        </View>
      ) : (
        <View style={styles.content}>
          <ReservationList
            reservations={reservations}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </View>
      )}

      <ReservationForm
        visible={showForm}
        gameId={game.id}
        initialData={editingReservation}
        onSubmit={handleReservationSubmit}
        onCancel={() => {
          setShowForm(false);
          setEditingReservation(null);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#003278',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#003278',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameInfo: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003278',
    marginBottom: 4,
  },
  gameDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  capacityInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  capacityStat: {
    alignItems: 'center',
  },
  capacityNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003278',
  },
  fullCapacity: {
    color: '#c8102e',
  },
  capacityLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReservationScreen;