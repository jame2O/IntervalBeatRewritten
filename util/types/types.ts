//Setup recommendation types for easier formatting when fectching song recs from Spotify API.

export type MinMaxRecommendation = {
    seedArtists: string[];
    seedTracks: string[];
    seedGenres: string[];
    min_acousticness: number;
    max_acousticness: number;
    min_danceability: number;
    max_danceability: number;
    min_duration_ms: number;
    max_duration_ms: number;
    min_energy: number;
    max_energy: number;
    min_instrumentalness: number;
    max_instrumentalness: number;
    min_key: number;
    max_key: number;
    min_liveness: number;
    max_liveness: number;
    min_loudness: number;
    min_mode: number;
    max_mode: number;
    min_popularity: number;
    max_popularity: number;
    min_speechiness: number;
    max_speechiness: number;
    min_tempo: number;
    max_tempo: number;
    min_time_signature: number;
    max_time_signature: number;
    min_valence: number;
    max_valence: number;
};

export type TargetRecommendation = {
    seedArtists: string[];
    seedTracks: string[];
    seedGenres: string[];
    target_acousticness: number;
    target_danceability: number;
    target_duration_ms: number;
    target_energy: number;
    target_instrumentalness: number;
    target_key: number;
    target_liveness: number;
    target_loudness: number;
    target_mode: number;
    tagret_popularity: number;
    target_speechiness: number;
    target_tempo: number;
    target_time_signature: number;
    target_valence: number;
};