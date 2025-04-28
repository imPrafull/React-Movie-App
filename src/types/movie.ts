export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  adult: boolean;
  genre_ids: number[];
  genres?: Genre[];
  credits?: Credits;
  videos?: {
    results: Video[];
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  cast_id: number;
  character: string;
  name: string;
  profile_path: string;
}

export interface Crew {
  job: string;
  name: string;
}

export interface Video {
  key: string;
  type: string;
}