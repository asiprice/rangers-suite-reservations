export interface Game {
  id: number;
  date: string;
  opponent: string;
  start_time: string;
  suite_capacity: number;
  reserved_spots: number;
  available_spots: number;
}

export interface Reservation {
  id?: number;
  game_id: number;
  guest_name: string;
  contact_info: string;
  party_size: number;
  notes: string;
  created_at?: string;
}