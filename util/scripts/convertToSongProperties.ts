//Required stuff
import { MinMaxRecommendation, TargetRecommendation } from "../types/types";
import { hrIntensityTable, hrIntensityTimeScaleTable } from "../tables";

//Attempt to best follow figma flowcharts. However bullshittery incoming:

export function convertToSongProperties(heartRate: number, cadence: number, prevHrZone: string, prevCadence: number, time: number) {
    time++;
    //Declare needed variables
    let intensityScore = 0;
    let newZone: string = "";
    let newTempo: number;
    let intensityTempo: number[];
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
    //Update the intensity score
    intensityScore = hrIntensityTable[newZone as keyof typeof hrIntensityTable][2]
    //Heart Rate zone comparison. If there's a match, check the time spent in that zone.
    let scaling = 1
    if (newZone == prevHrZone) {
        scaling = checkHrDuration(time, prevHrZone);
        intensityScore = intensityScore * scaling
    } else {

    }
    //Cadence comparison 
    if (cadence >= prevCadence*1.1 || cadence <= prevCadence*0.9) {
        newTempo = cadence;
    } else {
        newTempo = prevCadence;
    }



    return [intensityScore, time]
}
function checkHrDuration(time: number, zone: string) {
    //Check which zone were in, then compare the times with that of the table.
    //Returns the scaling for intensity score
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