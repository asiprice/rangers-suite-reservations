import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Reservation } from '../types';

interface ReservationFormProps {
  visible: boolean;
  gameId: number;
  initialData?: Reservation | null;
  onSubmit: (reservation: Omit<Reservation, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  visible,
  gameId,
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    guest_name: '',
    contact_info: '',
    party_size: '1',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        guest_name: initialData.guest_name,
        contact_info: initialData.contact_info,
        party_size: initialData.party_size.toString(),
        notes: initialData.notes
      });
    } else {
      setFormData({
        guest_name: '',
        contact_info: '',
        party_size: '1',
        notes: ''
      });
    }
  }, [initialData, visible]);

  const handleSubmit = () => {
    if (!formData.guest_name.trim()) {
      Alert.alert('Error', 'Guest name is required');
      return;
    }

    const partySize = parseInt(formData.party_size);
    if (isNaN(partySize) || partySize < 1) {
      Alert.alert('Error', 'Party size must be a valid number');
      return;
    }

    onSubmit({
      game_id: gameId,
      guest_name: formData.guest_name.trim(),
      contact_info: formData.contact_info.trim(),
      party_size: partySize,
      notes: formData.notes.trim()
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {initialData ? 'Edit Reservation' : 'New Reservation'}
          </Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Guest Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.guest_name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, guest_name: text }))}
              placeholder="Enter guest name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Contact Info</Text>
            <TextInput
              style={styles.input}
              value={formData.contact_info}
              onChangeText={(text) => setFormData(prev => ({ ...prev, contact_info: text }))}
              placeholder="Email or phone number"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Party Size *</Text>
            <TextInput
              style={styles.input}
              value={formData.party_size}
              onChangeText={(text) => setFormData(prev => ({ ...prev, party_size: text }))}
              placeholder="Number of guests"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.notes}
              onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
              placeholder="Any special requests or notes"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003278',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003278',
  },
  form: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    height: 80,
  },
});

export default ReservationForm;