package config

import "os"

var APP_ENV = os.Getenv("APP_ENV")
var IS_DEVELOP_MODE = APP_ENV == "develop"
var APP_LOG_LEVEL = os.Getenv("APP_LOG_LEVEL")
var APP_LOG_FOLDER = os.Getenv("APP_LOG_FOLDER")
