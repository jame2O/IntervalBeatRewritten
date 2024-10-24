## Import required libraries

import requests
from flask import Flask, request, jsonify
import numpy as np
import pandas as pd



## Declare flask and spotify url for requests

app = Flask(__name__)

SPOTIFY_URL = "https://api.spotify.com/v1"
@app.route('/convert', methods = ['POST'])
def convert(current_hr, 
            cadence, 
            prev_hr_zone,
            prev_cadence, 
            elapsed_time,
            cadence_matching):
    
    ## IMPLEMENTED ON PC
    return 0;

@app.route('/get_recommendations', methods = ['POST'])
def get_recommendations():
    ## Get headers
    auth_code = request.headers.get('auth')
    if not auth_code:
        return jsonify({"error": "Missing auth header"}), 400
    HEADERS = {
        "Authorization": f"Bearer {auth_code}",
    }
    ## Setup request
    
    try:
        r = requests.get(f'{SPOTIFY_URL}/recommendations', params={
            "min_popularity": 80,
            "seed_genres": "rock"
        }, headers=HEADERS)
        
        r.raise_for_status()  # This will raise an exception for HTTP errors
        
        return jsonify(r.json())  # Return the response as JSON
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500