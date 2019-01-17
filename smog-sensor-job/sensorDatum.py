import datetime
import random


class SensorDatum:
    pm10_sample = random.uniform(0, 100)
    pm25_sample = random.uniform(0, 100)
    measure_datetime = datetime.datetime.now()
