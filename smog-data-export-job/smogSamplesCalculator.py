from typing import List

from sensorAverageData import SensorAverageData
from sesnsorDatum import SensorDatum


class SmogSamplesCalculator:
    @classmethod
    def calculate_average_values(cls, sensor_data: List[SensorDatum]):
        sensor_average_data = SensorAverageData(sensor_data)
        return sensor_average_data
