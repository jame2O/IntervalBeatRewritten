import { userProfile } from "../types/types";

export async function fetchAccessToken(authCode: string, client_id: string, client_secret: string, redirect_uri: string): Promise<any> {
    const params = new URLSearchParams();
    params.append("code", authCode);
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", redirect_uri);
    params.append("client_id", client_id);
    params.append("client_secret", client_secret);
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method:"POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: params.toString()
    });
    const { access_token } = await result.json();
    return access_token;
}
export async function fetchProfile(token: string): Promise<any> {
    const userDataJson = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}`}
    }).then((result) => result.json());
    //Get top 10 songs
    const userTopSongsRaw = await fetch("https://api.spotify.com/v1/me/top/tracks", {
        method: "GET", headers: { Authorization: `Bearer ${token}`}
    }).then((result) => result.json());
    //Get top 10 artists
    const userTopArtistsRaw = await fetch("https://api.spotify.com/v1/me/top/artists", {
        method: "GET", headers: { Authorization: `Bearer ${token}`}
    }).then((result) => result.json());
    const artistIDs = (userTopArtistsRaw.items).map((a:any) => a.id);
    const songIDs = (userTopSongsRaw.items).map((a:any) => a.id);
    let profile: userProfile = {
        country: userDataJson.country,
        display_name: userDataJson.display_name,
        explicit_content: userDataJson.explicit_content,
        id: userDataJson.id,
        image: userDataJson.image,
        product: userDataJson.product, //Subcription type (free/premium)
        uri: userDataJson.uri,
        profileData: {
            topArtists: artistIDs,
            topSongs: songIDs
        }

    };
    return(profile)
}