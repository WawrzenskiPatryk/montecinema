export interface GenreData {
  id: number;
  name: string;
}

export interface MovieData {
  id: number;
  title: string;
  genre: GenreData;
  poster_url: string;
  length: number;
  release_date: string;
  description: string;
}

export interface SeanceData {
  id: number;
  datetime: string;
  movie: number;
  hall: number;
}

export interface ScreeningData extends MovieData {
  seances: SeanceData[];
}

export interface UserData {
  id: number;
  email: string;
  role: 'user' | 'employee' | 'admin';
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

export interface ReservationStatus {
  id: 1 | 2 | 3;
  name: 'Booked' | 'Confirmed' | 'Cancelled';
}

export interface TicketData {
  id: number;
  price: '20.0' | '10.0' | '15.0' | '12.0';
  type: 'Adult' | 'Child' | 'Senior' | 'Student';
  seat: string;
}
export interface ReservationData {
  id: number;
  user_id: number;
  user_email: string;
  movie_title: string;
  seance_id: number;
  seance_datetime: string;
  status: ReservationStatus;
  tickets: TicketData[];
}
