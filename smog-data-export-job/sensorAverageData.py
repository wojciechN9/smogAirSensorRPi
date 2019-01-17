import datetime
from operator import attrgetter
from typing import List

from sesnsorDatum import SensorDatum


class SensorAverageData:
    samples_quantity = 0
    pm10_value = 0
    pm25_value = 0
    period_from = datetime.datetime.now()
    period_to = datetime.datetime.now()

    def __init__(self, sensor_data: List[SensorDatum]):
        data_quantity = len(sensor_data)
        self.samples_quantity = data_quantity
        self.pm10_value = sum(data.pm10_sample for data in sensor_data) / data_quantity
        self.pm25_value = sum(data.pm25_sample for data in sensor_data) / data_quantity
        self.period_from = min(sensor_data, key=attrgetter('measure_datetime')).measure_datetime
        self.period_to = max(sensor_data, key=attrgetter('measure_datetime')).measure_datetime
