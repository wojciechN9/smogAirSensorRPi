import datetime
import RPi.GPIO as GPIO
import time
import serial
import logging

from sensorDatum import SensorDatum
from settings import Settings, WorkingEnvironment

def is_checksum_correct(data_received):
        control_number = data_received[22] << 8 | data_received[23]
        frame_sum = 0
        for x in range(0,22):
            frame_sum += data_received[x] 
        
        if control_number == frame_sum:
            return True
        else:
            return False


def setup_sensor():
    GPIO.setmode(GPIO.BCM)
    time.sleep(0.1)

def read_sensor_data():
    try:
        port = serial.Serial("/dev/ttyAMA0", baudrate=9600, timeout=3.0)
        rcv = port.read(24)
        if not is_checksum_correct(rcv):
            raise IOError("Connection with air quality sensor is broken") 
            
        if Settings.WORKING_ENVRONMENT == WorkingEnvironment.INSIDE:   
            start_byte = 4
        else:
            start_byte = 10      
        
        pm1  = rcv[start_byte] << 8 | rcv[start_byte + 1]
        pm25 = rcv[start_byte + 2] << 8 | rcv[start_byte + 3]
        pm10 = rcv[start_byte + 4] << 8 | rcv[start_byte + 5]       
        smog_values = {'pm1': pm1, 'pm25': pm25, 'pm10': pm10}
        
        return smog_values
    except IOError as error:
            logging.error(error)

class AirQualitySensor:
    
    
    def get_sensor_datum(time_of_measure):
        
        setup_sensor()
        sensor_received_data = read_sensor_data()
        
        sensor_datum = SensorDatum()
        sensor_datum.pm10_sample = sensor_received_data['pm10']
        sensor_datum.pm25_sample = sensor_received_data['pm25']
        sensor_datum.measure_datetime = time_of_measure
        return sensor_datum
        
