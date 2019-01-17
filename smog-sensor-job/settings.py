from enum import Enum

class WorkingEnvironment(Enum):
    INSIDE = 1
    OUTSIDE = 2

class Settings:
    pi_db = ""
    PI_DB_CS = dict(entry.split('=') for entry in pi_db.split(';'))
    WORKING_ENVRONMENT = WorkingEnvironment.OUTSIDE