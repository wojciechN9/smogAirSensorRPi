import datetime
import logging
import time

from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger

from smogSamplesCalculator import SmogSamplesCalculator
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
    # sleep an half second to fetch all data from pi and performance
    current_timestamp = datetime.datetime.now()
    time.sleep(0.5)

    # left-open interval
    datetime_to = datetime.datetime.now().replace(second=1, microsecond=0)
    datetime_from = datetime_to - datetime.timedelta(hours=1, seconds=1)

    sensor_data = SqlService.get_sensor_data(datetime_from, datetime_to)
    print(sensor_data)
    if sensor_data:
        calculated_data = SmogSamplesCalculator.calculate_average_values(sensor_data)
        SqlService.save_average_data(calculated_data, current_timestamp)
        logging.info("DataSuccessfullyExported")
    else:
        logging.error("No data error")


scheduler = BlockingScheduler()
# every minute
#scheduler.add_job(job, CronTrigger.from_crontab('* * * * *'))
# every hour
scheduler.add_job(job, CronTrigger.from_crontab('0 * * * *'))
scheduler.start()
