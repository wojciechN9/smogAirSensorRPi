import logging

from mysql.connector import Error, MySQLConnection

from sensorAverageData import SensorAverageData
from sesnsorDatum import SensorDatum
from settings import Settings


class SqlService:
    @staticmethod
    def get_sensor_data(date_from, date_to):
        query = "SELECT Id, PM10_sample, PM25_sample, Meassure_timestamp " \
                "FROM smog_sample " \
                "WHERE Meassure_timestamp > %s AND Meassure_timestamp < %s"
        val = (date_from, date_to)

        try:
            connection = MySQLConnection(**Settings.PI_DB_CS)

            db_cursor = connection.cursor()
            db_cursor.execute(query, val)

            result = db_cursor.fetchall()

            sensor_data = []
            for row in result:
                sensor_data.append(SensorDatum(row[0], row[1], row[2], row[3]))
            return sensor_data
        except Error as error:
            logging.error(error)
            return None

        finally:
            if db_cursor:
                db_cursor.close()
            connection.close()

    @staticmethod
    def save_average_data(calculated_data: SensorAverageData, current_timestamp):
        query = "INSERT INTO smog_history (Pm10_value, Pm25_value, Sample_count, Period_from, Period_to, Execution_timestamp)" \
                "VALUES (%s, %s, %s, %s, %s, %s)"
        val = (calculated_data.pm10_value, calculated_data.pm25_value, calculated_data.samples_quantity,
               calculated_data.period_from, calculated_data.period_to, current_timestamp)

        try:
            connection = MySQLConnection(**Settings.SERVER_PROD_DB_CS)

            db_cursor = connection.cursor()
            db_cursor.execute(query, val)

            connection.commit()
        except Error as error:
            logging.error(error)

        finally:
            if db_cursor:
                db_cursor.close()
            connection.close()
