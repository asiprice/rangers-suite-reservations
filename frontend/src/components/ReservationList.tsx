import React from 'react';
import { Reservation } from '../types';

interface ReservationListProps {
  reservations: Reservation[];
  onEdit: (reservation: Reservation) => void;
  onDelete: (id: number) => void;
}

const ReservationList: React.FC<ReservationListProps> = ({
  reservations,
  onEdit,
  onDelete
}) => {
  if (reservations.length === 0) {
    return (
      <div className="no-reservations">
        <p>No reservations for this game yet.</p>
      </div>
    );
  }

  return (
    <div className="reservation-list">
      <h3>Current Reservations</h3>
      <div className="reservations-grid">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="reservation-card">
            <div className="reservation-header">
              <h4>{reservation.guest_name}</h4>
              <span className="party-size">{reservation.party_size} guest{reservation.party_size !== 1 ? 's' : ''}</span>
            </div>
            
            {reservation.contact_info && (
              <p className="contact-info">{reservation.contact_info}</p>
            )}
            
            {reservation.notes && (
              <p className="notes">{reservation.notes}</p>
            )}
            
            <div className="reservation-actions">
              <button 
                className="btn btn-sm btn-secondary"
                onClick={() => onEdit(reservation)}
              >
                Edit
              </button>
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(reservation.id!)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationList;