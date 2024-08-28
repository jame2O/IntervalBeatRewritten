//Format: [Min HR Percent, Min Intensity Score, Max Intensity Score]
export const hrIntensityTable = {
    'Z1': [0, 64, 20, 30],
    'Z2': [65, 79, 30, 40],
    'Z3': [80, 85, 45, 60],
    'Z4': [86, 92, 65, 75],
    'Z5': [93, 100, 80, 90]
};
//Table to calculate IntensityScore scales based off time spent in different HR Zones. 
//Format: Zone: {Time in Seconds: Scale}
//Zone 5 is a special case and is not included in the table.
export const hrIntensityTimeScaleTable = {
    'Z3': {
        900: 1.1,
        1800: 1.2,
        3600: 1.3,
    },
    'Z4': {
        900: 1.1,
        1800: 1.25,
        2700: 1.45,
    },
}
