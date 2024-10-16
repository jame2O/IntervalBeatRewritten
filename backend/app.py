## Import required libraries

import requests
from flask import Flask
import numpy as np
import pandas as pd


## Import required tables

from util.convert import convert

## Declare flask and spotify url for requests

app = Flask(__name__)
SPOTIFY_URL = "https://api.spotify.com/v1"

@app.route('/convert', methods = ['POST'])
def c():
    params = convert(135, 210, 90, 'Z2', 85, 1200, False)
    print(params)
    r = requests.get(SPOTIFY_URL, params=params)

c()
    
    
    
    