import { Game, Reservation } from '../types';

// For Expo development - use your computer's IP address when testing on physical device
// For simulator, localhost works fine
const API_BASE = __DEV__ ? 'http://localhost:3001/api' : 'http://localhost:3001/api';

export const gameApi = {
  getAll: async (): Promise<Game[]> => {
    const response = await fetch(`${API_BASE}/games`);
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }
    return response.json();
  },

  getReservations: async (gameId: number): Promise<Reservation[]> => {
    const response = await fetch(`${API_BASE}/games/${gameId}/reservations`);
    if (!response.ok) {
      throw new Error('Failed to fetch reservations');
    }
    return response.json();
  }
};

export const reservationApi = {
  create: async (reservation: Omit<Reservation, 'id' | 'created_at'>): Promise<{ id: number }> => {
    const response = await fetch(`${API_BASE}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    });
    if (!response.ok) {
      throw new Error('Failed to create reservation');
    }
    return response.json();
  },

  update: async (id: number, reservation: Omit<Reservation, 'id' | 'created_at'>): Promise<{ changes: number }> => {
    const response = await fetch(`${API_BASE}/reservations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    });
    if (!response.ok) {
      throw new Error('Failed to update reservation');
    }
    return response.json();
  },

  delete: async (id: number): Promise<{ changes: number }> => {
    const response = await fetch(`${API_BASE}/reservations/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete reservation');
    }
    return response.json();
  }
};