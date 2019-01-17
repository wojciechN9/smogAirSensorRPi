import datetime
import random


class SensorDatum:
    id = 0
    pm10_sample = 0
    pm25_sample = 0
    measure_datetime = datetime.datetime.now()

    def __init__(self, id, pm10_sample, pm25_sample, measure_datetime):
        self.id = id
        self.pm10_sample = pm10_sample
        self.pm25_sample = pm25_sample
        self.measure_datetime = measure_datetime
