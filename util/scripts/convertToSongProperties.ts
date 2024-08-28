//Import required stuff
import { MinMaxRecommendation, TargetRecommendation } from "../types/types";
import { hrIntensityTable, hrIntensityTimeScaleTable } from "../tables";

//Attempt to best follow figma flowcharts. However bullshittery incoming:

export function convertToSongProperties(heartRate: number, cadence: number, prevHrZone: string, prevCadence: number, time: number) {
    //Increment time
    time++;
    //Declare needed variables
    var intensityScore = 0;
    var zoneChange: string = "";
    var tempoChange: number;
    var intensityTempo: number[];
    for (var zones in hrIntensityTable) {
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
    if (zoneChange == prevHrZone) {
        checkHrDuration(time, prevHrZone);
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
    for (var zones in hrIntensityTimeScaleTable) {
        if (!hrIntensityTable.hasOwnProperty(zones) || zone != zones) {
          continue;
        }
        var element = hrIntensityTimeScaleTable[zones as keyof typeof hrIntensityTimeScaleTable]
        for (var timestamp in element) {
            if (time < Number(timestamp)) {
                return element[timestamp as keyof typeof element];
            }
        }
    }
}