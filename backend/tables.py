import numpy as np
import pandas as pd

HR_INTENSITY_TB = pd.DataFrame({
    'Z1': [0, 64, 20, 30],
    'Z2': [65, 79, 30, 40],
    'Z3': [80, 85, 45, 60],
    'Z4': [86, 92, 65, 75],
    'Z5': [93, 100, 80, 90]
}, index=["min_hr", "max_hr","min_intensity","max_intensity"])

HR_INTENSITY_TIME_SCALE_TB = pd.DataFrame({
    'Z3': {
        'time_band': [900, 1800, 3600],
        'scale': [1.1, 1.2, 1.3]
    },
    'Z4': {
        'time_band': [900, 1800, 2700],
        'scale': [1.1, 1.25, 1.45]
    }
})

CADENCE_TEMPO_TB = pd.DataFrame([
    [30, 50, 70],
    [120, 130, 150]
], index=["cadence","tempo"])

print(HR_INTENSITY_TIME_SCALE_TB)