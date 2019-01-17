#!/smog-pi-job/bin/python3 

import datetime
import logging

from apscheduler.schedulers.blocking import BlockingScheduler

from airQualitySensor import AirQualitySensor
from sqlService import SqlService

# exception logger
logger = logging.getLogger()

log_formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s - %(funcName)s")
log_file_handler = logging.FileHandler('app.log')
log_file_handler.setLevel(logging.ERROR)
log_file_handler.setFormatter(log_formatter)

log_console_handler = logging.StreamHandler()
log_console_handler.setLevel(logging.DEBUG)
log_console_handler.setFormatter(log_formatter)

logger.addHandler(log_file_handler)
logger.addHandler(log_console_handler)
logger.setLevel(logging.DEBUG)


def job():
    time_of_measure = datetime.datetime.now()
    sensor_datum = AirQualitySensor.get_sensor_datum(time_of_measure)
    logging.debug("Sensor values: pm10 " + str(sensor_datum.pm10_sample) + ", pm2.5: " + str(sensor_datum.pm25_sample))
    SqlService.save_sensor_datum(sensor_datum)


while True:
    scheduler = BlockingScheduler()
    scheduler.add_job(job, 'interval', seconds=5)
    scheduler.start()
