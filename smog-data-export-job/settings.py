class Settings:
    pi_db = ""
    PI_DB_CS = dict(entry.split('=') for entry in pi_db.split(';'))

    server_dev_db = ""
    SERVER_DEV_DB_CS = dict(entry.split('=') for entry in server_dev_db.split(';'))

    server_prod_db = ""
    SERVER_PROD_DB_CS = dict(entry.split('=') for entry in server_prod_db.split(';'))

