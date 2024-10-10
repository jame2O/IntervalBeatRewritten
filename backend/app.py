## Import required libraries

import requests
from flask import Flask
import numpy as np
import pandas as pd

## Import required tables

from tables import (HR_INTENSITY_TABLE, 
                    HR_INTENSITY_TIME_SCALE_TABLE)

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
    
    intensity_score = 0
    
    new_zone = 0
    new_tempo = 0
    new_danceability = 0
    new_loudness = 0
    new_valence = 0.3
    
    enable_max_tempo = False
    intensity_tempo = []
    
    ## Update current hr zone
    
    for zone in HR_INTENSITY_TABLE:
        if (current_hr > HR_INTENSITY_TABLE[zone][0] and
            current_hr < HR_INTENSITY_TABLE[zone][1]):
            
            new_zone = zone
            break
        
    ## Update tempo. If cadence matching is enabled,
    ## match tempo to cadence. If not, use foxed values
    ## from the table.
    
    if not cadence_matching:
        for target_cadence in 

    
    
    
    