import { Game, Reservation } from './types';

const API_BASE = 'http://localhost:3001/api';

export const gameApi = {
  getAll: async (): Promise<Game[]> => {
    const response = await fetch(`${API_BASE}/games`);
    return response.json();
  },

  getReservations: async (gameId: number): Promise<Reservation[]> => {
    const response = await fetch(`${API_BASE}/games/${gameId}/reservations`);
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
    return response.json();
  },

  delete: async (id: number): Promise<{ changes: number }> => {
    const response = await fetch(`${API_BASE}/reservations/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }
};