import requests
def get_recommendations():
    ## Get headers
    auth_code = "BQDFJKU_8Zq8m6uKXmwfdGh9qHFVli5WIsc0ONN141fn6yu2xaVJ-R3D_1eZV_MRXQZDqAcxN6PPDW7T7Iq0kMJhMt0kpVsZYlM4zZBtbniTFKn32kZ32HNw-VPNZv6BDhwSDfKLJ2Argf7tbLDIDm1QmOfALM6HKsj2kRCdpuYveYVOGrD0UzNeaKVkEBGwXWEVxmgu714ygJD6JVLiVAwBSV-yK1-92DegiMG_uMME3Vw"
    SPOTIFY_URL = "https://api.spotify.com/v1"
    HEADERS = {
        "Authorization": f"Bearer {auth_code}",
    }
    ## Setup request
    r = requests.get(f'{SPOTIFY_URL}/recommendations', params={
        "min_popularity": 80,
        "seed_genres": "rock"
        
    }, headers=HEADERS)
    print (r.json())
    
get_recommendations()