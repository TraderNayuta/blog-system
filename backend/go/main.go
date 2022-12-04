package main

import (
	"fmt"
	"go-blog-server/api"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	api.InitApi(r)

	err := r.Run()
	if err != nil {
		fmt.Println("服务器启动失败！")
	}
}
