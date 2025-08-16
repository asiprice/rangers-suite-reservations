import { Game, Reservation } from '../types';
import { getBackendUrl } from '../utils/environment';

const API_BASE = getBackendUrl();

console.log(`📱 Mobile API base URL: ${API_BASE}`);

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