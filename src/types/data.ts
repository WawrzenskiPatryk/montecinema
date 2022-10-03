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
  seances: Array<SeanceData>;
}
