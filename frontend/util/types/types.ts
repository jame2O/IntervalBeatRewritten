//Setup recommendation types for easier formatting when fectching song recs from Spotify API.

export type Recommendation = {
    seedArtists: string[];
    seedTracks: string[];
    seedGenres: string[];
    songProperties: MinMaxSongProperties | TargetSongProperties | MixedSongProperties;
};

export type MinMaxSongProperties = {
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
    max_loudness:number;
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
}

export type TargetSongProperties = {
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
}

export type MixedSongProperties = {
    min_acousticness: number;
    max_acousticness: number;
    target_danceability: number;
    min_duration_ms: number;
    max_duration_ms: number;
    target_energy: number;
    min_instrumentalness: number;
    max_instrumentalness: number;
    target_liveness: number;
    min_loudness: number;
    max_loudness:number;
    target_mode: number;
    min_popularity: number;
    max_popularity: number;
    min_tempo: number;
    max_tempo: number;
    min_valence: number;
    max_valence: number;
}

export type userProfile = {
    country: string;
    display_name: string;
    explicit_content: {
        filter_enabled: boolean; //Should explicit music be played?
        filter_locked: boolean; //Explicit filter is locked and user can't change it. (Don't touch..)
    };
    id: string;
    image: {
        url: string;
        height: number;
        width: number;
    }
    product: string; //Subcription type (free/premium)
    uri: string;
    profileData: profileData;
}
export type profileData = {
    topSongs: string[];
    topArtists: string[];
}