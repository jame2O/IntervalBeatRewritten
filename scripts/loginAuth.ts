
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
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}`}
    });

    return await result.json();
}