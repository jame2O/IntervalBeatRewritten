//Required stuff
import { MinMaxRecommendation, TargetRecommendation } from "../types/types";
import { hrIntensityTable, hrIntensityTimeScaleTable } from "../tables";

//Attempt to best follow figma flowcharts. However bullshittery incoming:

export function convertToSongProperties(heartRate: number, cadence: number, prevHrZone: string, prevCadence: number, time: number) {
    time++;
    //Declare needed variables
    let intensityScore = 0;
    let zoneChange: string = "";
    let tempoChange: number;
    let intensityTempo: number[];
    for (let zones in hrIntensityTable) {
        if (!hrIntensityTable.hasOwnProperty(zones)) {
            continue;
        }
        if (
          heartRate >
            hrIntensityTable[zones as keyof typeof hrIntensityTable][0] &&
          heartRate < hrIntensityTable[zones as keyof typeof hrIntensityTable][1]
        ) {
            zoneChange = zones
            break;
        } 
        
    }
    //Heart Rate zone comparison. If there's a match, check the time spent in that zone.
    let scaling = 1
    if (zoneChange == prevHrZone) {
        scaling = checkHrDuration(time, prevHrZone);
    } 
    //Cadence comparison 
    if (cadence >= prevCadence*1.1 || cadence <= prevCadence*0.9) {
        tempoChange = cadence;
    } else {
        tempoChange = prevCadence;
    }
    return [intensityScore, time]
}
function checkHrDuration(time: number, zone: string) {
    //Check which zone were in, then compare the times with that of the table.
    //Returns the scaling for intensity score
    for (let zones in hrIntensityTimeScaleTable) {
        //Select correct zone
        if (!hrIntensityTable.hasOwnProperty(zones) || zone != zones) {
          continue;
        }
        //Find correct timescale in table.
        let element = hrIntensityTimeScaleTable[zones as keyof typeof hrIntensityTimeScaleTable]
        let current = 0;
        for (let timestamp in element) {
            if (time < Number(current)) {
                return timestamp[1];
            }
        }
        //Return the last element in the array if the time is not bounded (max scaling)
        return element[element.length-1][1]
        
    }
}