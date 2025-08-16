import React, { useState, useEffect } from 'react';
import { Reservation } from '../types';

interface ReservationFormProps {
  gameId: number;
  initialData?: Reservation | null;
  onSubmit: (reservation: Omit<Reservation, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  gameId,
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    guest_name: '',
    contact_info: '',
    party_size: 1,
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        guest_name: initialData.guest_name,
        contact_info: initialData.contact_info,
        party_size: initialData.party_size,
        notes: initialData.notes
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      game_id: gameId,
      ...formData
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'party_size' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="reservation-form-overlay">
      <form className="reservation-form" onSubmit={handleSubmit}>
        <h3>{initialData ? 'Edit Reservation' : 'New Reservation'}</h3>
        
        <div className="form-group">
          <label htmlFor="guest_name">Guest Name *</label>
          <input
            type="text"
            id="guest_name"
            name="guest_name"
            value={formData.guest_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact_info">Contact Info</label>
          <input
            type="text"
            id="contact_info"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
            placeholder="Email or phone number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="party_size">Party Size *</label>
          <input
            type="number"
            id="party_size"
            name="party_size"
            value={formData.party_size}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Any special requests or notes"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Update' : 'Create'} Reservation
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;