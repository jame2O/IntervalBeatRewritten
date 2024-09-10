//Required stuff
import { MinMaxRecommendation, MinMaxSongProperties, TargetRecommendation } from "../types/types";
import { hrIntensityTable, hrIntensityTimeScaleTable, fixedCadenceTempoTable } from "../tables";

//Attempt to best follow figma flowcharts. However bullshittery incoming:

export function convertToSongProperties(heartRate: number, cadence: number, prevHrZone: string, prevCadence: number, currentTime: number, cadenceMatchingEnabled: boolean) {
    //Need to update time here.

    //Declare needed variables
    let intensityScore = 0;
    let newZone: string = "";
    let newTempo: number;
    let enableMaxTempo: boolean;
    let intensityTempo: number[];
    let newLoudness: number;
    let valence = 0.3;
    let newDanceability: number;
    //Update current HR zone
    for (let zones in hrIntensityTable) {
        if (!hrIntensityTable.hasOwnProperty(zones)) {
            continue;
        }
        if (
          heartRate >
            hrIntensityTable[zones as keyof typeof hrIntensityTable][0] &&
          heartRate < hrIntensityTable[zones as keyof typeof hrIntensityTable][1]
        ) {
            //Update to new zone
            newZone = zones
            break;
        } 
        
    }
    //Update tempo. If cadence matching is enabled, match tempo to cadence. If not, use fixed values from table.
    if (!cadenceMatchingEnabled) {
        for (let targetCadence in fixedCadenceTempoTable) {
            //Array order is preserved, so it *should* be safe to do this.
            if (Number(targetCadence[0]) > cadence) {
                newTempo = Number(targetCadence[1])
            } else {
                enableMaxTempo = true;
            }
        }
    } else {
        newTempo = cadence
    }

    //Update the intensity score
    intensityScore = hrIntensityTable[newZone as keyof typeof hrIntensityTable][2]
    //Heart Rate zone comparison. If there's a match, check the time spent in that zone.
    let scaling = 1
    if (newZone == prevHrZone) {
        scaling = checkHrDuration(currentTime, prevHrZone);
        intensityScore = intensityScore * scaling
    } else {

    }
    //Cadence comparison 
    if (cadence >= prevCadence*1.1 || cadence <= prevCadence*0.9) {
        newTempo = cadence;
    } else {
        newTempo = prevCadence;
    }
    //Calculate loudness
    newLoudness = (2 * Math.exp(0.017917 * intensityScore)) - 12
    
    //Create the song properties object and return it.
    //If we don't want to include a song property in the rec, set it to -1.
    let songProps: MinMaxSongProperties = {
        min_acousticness: -1,
        max_acousticness: -1,
        min_danceability: 0,
        max_danceability: 0,
        min_duration_ms: 0,
        max_duration_ms: 999999,
        min_energy: 0,
        max_energy: 100,
        min_instrumentalness: -1,
        max_instrumentalness: -1,
        min_key: -1,
        max_key: -1,
        min_liveness: -1,
        max_liveness: -1,
        min_loudness: newLoudness-1,
        max_loudness: newLoudness,
        min_mode: -1,
        max_mode: -1,
        min_popularity: 40,
        max_popularity: 100,
        min_speechiness: -1,
        max_speechiness: -1,
        min_tempo: newTempo - 10,
        max_tempo: newTempo + 10,
        min_time_signature: -1,
        max_time_signature: -1,
        min_valence: valence,
        max_valence: 1
    }
    
    //Finally, return the song properties and the new time.
    return [songProps, currentTime]
}
function checkHrDuration(time: number, zone: string) {
    //Check which zone were in, then compare the times with that of the table.
    //Returns the scaling for intensity score
    //We start with the Z5 special case.
    if (zone == 'Z5') {
        return 2;
    }
    for (let zones in hrIntensityTimeScaleTable) {
        //Select correct zone
        if (!hrIntensityTimeScaleTable.hasOwnProperty(zones) && zone == zones) {
          //Find correct timescale in table.
          let timestamps =
            hrIntensityTimeScaleTable[
              zones as keyof typeof hrIntensityTimeScaleTable
            ];
            for (let i in timestamps) {
                if (time < timestamps[i][0]) {
                return timestamps[i][1];
                }
            }
            //Return the last element in the array if the time is not bounded (max scaling)
            return timestamps[timestamps.length - 1][1];
        }
    }
    return 1;
}
