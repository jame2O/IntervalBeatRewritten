## Import libs and tables

import numpy as np
import pandas as pd
import math
from util.tables import (HR_INTENSITY_TIME_SCALE_TB, 
                    HR_INTENSITY_TB, 
                    CADENCE_TEMPO_TB)

def convert(current_hr,
            max_hr, 
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
    
    for zone in HR_INTENSITY_TB:
        if (current_hr > (HR_INTENSITY_TB[zone][0] * max_hr) and
            current_hr < (HR_INTENSITY_TB[zone][1] * max_hr)):
            
            new_zone = zone
            break
        
    ## Update tempo. If cadence matching is enabled,
    ## match tempo to cadence. If not, use foxed values
    ## from the table.
    
    if not cadence_matching:
        i = 0
        for target_cadence in CADENCE_TEMPO_TB.loc["cadence"]:
            if (target_cadence > cadence):
                new_tempo = CADENCE_TEMPO_TB.loc["tempo"].iloc[i]
            else:
                enable_max_tempo = True
            i = i + 1
    else:
        new_tempo = cadence
    
    ## Update the intensity score.
    ## NOTE: Currently, only uses the MIN Intensity Score (does not
    # account for range)
    
    intensity_score = HR_INTENSITY_TB[new_zone][2]
    
    ## Heart Rate Zone Comparisons
    ## Scale based on time spent in that zone
    
    scaling = 1
    if (new_zone == prev_hr_zone):
        scaling = check_hr_duration(elapsed_time, prev_hr_zone)
        intensity_score = intensity_score * scaling
    else:
        print("TBD")

    ## Cadence Comparions
    
    if ((cadence >= prev_cadence*1.1) or (cadence <= prev_cadence*0.9)):
        new_tempo = cadence
    else:
        new_tempo = prev_cadence
        
    ## Calculate loudness (based on agreed formula)
    
    new_loudness = (2*math.exp(0.17917 * (intensity_score / 10))) - 12
    
    ## Build the song props dict and return it
    
    return {
        'min_acousticness': 0,
        'max_acousticness': 0.5,
        'target_danceability': 0,
        'target_energy': 0,
        'min_instrumentalness': 0,
        'max_instrumentalness': 0.75,
        'target_liveness': -1,
        'min_loudness': new_loudness-1,
        'max_loudness': new_loudness,
        'target_mode': 1,
        'min_popularity': 50,
        'max_popularity': 100,
        'min_tempo': new_tempo - 10,
        'max_tempo': new_tempo + 10,
        'min_valence': new_valence,
        'max_valence': 1,
        'min_duration_ms': 0,
        'max_duration_ms': 99999,
    }

    

def check_hr_duration(elapsed_time, prev_hr_zone):
    ## Check which zone were in, then compare the times with those in the table
    ## Returns the scaling for intensity score
    ## We start with the special case (Z5):
    
    if (prev_hr_zone == 'Z5'):
        return 2
    for zone in HR_INTENSITY_TIME_SCALE_TB:
        if zone == prev_hr_zone:
            # Dict
            zone_data = HR_INTENSITY_TIME_SCALE_TB[zone]
            for i in range(len(zone_data['time_band'])):
                if elapsed_time < zone_data['time_band'][i]:
                    return zone_data['scale'][i]
                
            return zone_data['time_band'][len(zone_data['time_band'])-1]

    return 1
