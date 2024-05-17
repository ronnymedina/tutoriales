package main

import (
	"example/demogo/utils"
	"time"
)

func main() {
	defer utils.Logger.Sync()

	for {
		time.Sleep(5 * time.Second)
		utils.Logger.Infoln("hello world")
	}
}
