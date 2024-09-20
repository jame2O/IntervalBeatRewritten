//Functions for retrieving data from different endpoints

export async function getSongTitles(token: string, songIds: string[]) {
    let parsedIds: string = "";
    for (const id of songIds) {
        parsedIds += id
        parsedIds += ","
    }
    const json = await fetch(`https://api.spotify.com/v1/tracks?ids=${parsedIds}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((result) => result.json());
    try {
        const tracks = await json.tracks;
        const trackNameList: string[] = [];
        for (const track of tracks) {
            trackNameList.push(track.name)
        }
        return trackNameList;
    } catch (e) {
        console.log(json.error.status);
    }
}
export async function getArtistTitles(token: string, artistIds: string[]) {
    let parsedIds: string = "";
    for (const id of artistIds) {
        parsedIds += id
        parsedIds += ","
    }
    const json = await fetch(`https://api.spotify.com/v1/artists?ids=${parsedIds}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((result) => result.json());
    try {
        const artists = await json.artists;
        const artistNameList: string[] = [];
        for (const artist of artists) {
            artistNameList.push(artist.name)
        }
        return artistNameList;
    } catch (e) {
        console.log(json.error.status);
    }
}