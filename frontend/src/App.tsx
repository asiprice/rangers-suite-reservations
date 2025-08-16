import React, { useState, useEffect } from 'react';
import { Game, Reservation } from './types';
import { gameApi, reservationApi } from './api';
import GameList from './components/GameList';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import './App.css';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    if (selectedGame) {
      loadReservations(selectedGame.id);
    }
  }, [selectedGame]);

  const loadGames = async () => {
    try {
      const gamesData = await gameApi.getAll();
      setGames(gamesData);
    } catch (error) {
      console.error('Error loading games:', error);
    }
  };

  const loadReservations = async (gameId: number) => {
    try {
      const reservationsData = await gameApi.getReservations(gameId);
      setReservations(reservationsData);
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setEditingReservation(null);
    setShowForm(false);
  };

  const handleReservationSubmit = async (reservation: Omit<Reservation, 'id' | 'created_at'>) => {
    try {
      if (editingReservation) {
        await reservationApi.update(editingReservation.id!, reservation);
      } else {
        await reservationApi.create(reservation);
      }
      
      await loadGames();
      if (selectedGame) {
        await loadReservations(selectedGame.id);
      }
      
      setShowForm(false);
      setEditingReservation(null);
    } catch (error) {
      console.error('Error saving reservation:', error);
    }
  };

  const handleReservationEdit = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setShowForm(true);
  };

  const handleReservationDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        await reservationApi.delete(id);
        await loadGames();
        if (selectedGame) {
          await loadReservations(selectedGame.id);
        }
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Texas Rangers Suite Reservations</h1>
      </header>
      
      <main className="App-main">
        <div className="games-section">
          <h2>Upcoming Games</h2>
          <GameList 
            games={games} 
            selectedGame={selectedGame}
            onGameSelect={handleGameSelect}
          />
        </div>

        {selectedGame && (
          <div className="reservations-section">
            <div className="section-header">
              <h2>
                Reservations for {selectedGame.opponent} - {selectedGame.date}
              </h2>
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                Add Reservation
              </button>
            </div>

            <div className="capacity-info">
              <span>Capacity: {selectedGame.suite_capacity}</span>
              <span>Reserved: {selectedGame.reserved_spots}</span>
              <span>Available: {selectedGame.available_spots}</span>
            </div>

            {showForm && (
              <ReservationForm
                gameId={selectedGame.id}
                initialData={editingReservation}
                onSubmit={handleReservationSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingReservation(null);
                }}
              />
            )}

            <ReservationList
              reservations={reservations}
              onEdit={handleReservationEdit}
              onDelete={handleReservationDelete}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
