package utils

import (
	"example/demogo/config"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var Logger *zap.SugaredLogger

func getLevelLogger(level string) zapcore.Level {
	if level == "debug" {
		return zap.DebugLevel
	}

	return zap.ErrorLevel
}

func init() {
	var err error
	level := zap.NewAtomicLevelAt(getLevelLogger(config.APP_LOG_LEVEL))
	encoder := zap.NewProductionEncoderConfig()

	zapConfig := zap.NewProductionConfig()
	zapConfig.EncoderConfig = encoder
	zapConfig.Level = level
	zapConfig.Development = config.IS_DEVELOP_MODE
	zapConfig.Encoding = "json"
	zapConfig.InitialFields = map[string]interface{}{"idtx": "999"}
	zapConfig.OutputPaths = []string{"stdout", config.APP_LOG_FOLDER + "app_log.log"}
	zapConfig.ErrorOutputPaths = []string{"stderr"}
	logger, err := zapConfig.Build()

	if err != nil {
		panic(err)
	}

	Logger = logger.Sugar()
}
