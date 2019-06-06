# smogAirSensorRPi
Fetching data from air quality sensor and present this data on the web page

Working project is available: http://szpek.pl

# Requirements
  - Raspberry PI with network connection
  - Air quality sensor (PM3003)
  - Online server

# About the project
The project is composed from four different apps. Two of them are working on a RPi and another two are working on online server. Also there are two db's on the RPi and server.

First app on the Rpi is recieving data from PM3003 and save results to local db every 5 seconds.

The second app starts working every full hour. Gets data from local db which was got from PM3003 from last hour and counting artithmetic mean. After that, counted mean is exported to server db.

The last two apps are placed on server. First of them is webservice which fetching data from server db and provides url to bunch of this data converted to JSON.

![alt text](https://github.com/wojciechN9/smogAirSensorRPi/blob/master/imgs/DSC_0672.JPG)
Air quality sensor

![alt text](https://github.com/wojciechN9/smogAirSensorRPi/blob/master/imgs/DSC_0679.JPG)
Connection to RPi 3

Feel free to use my code :)
