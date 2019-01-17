import logging

from mysql.connector import MySQLConnection, Error

from settings import Settings


class SqlService:

    @staticmethod
    def save_sensor_datum(sensor_data):
        query = "INSERT INTO smog_sample (PM10_sample, PM25_sample, Meassure_timestamp) VALUES (%s, %s, %s)"
        val = (sensor_data.pm10_sample, sensor_data.pm25_sample, sensor_data.measure_datetime)

        try:
            connection = MySQLConnection(**Settings.PI_DB_CS)

            db_cursor = connection.cursor()
            db_cursor.execute(query, val)

            connection.commit()
        except Error as error:
            logging.error(error)

        finally:    
            if db_cursor:
                db_cursor.close()
            connection.close()
