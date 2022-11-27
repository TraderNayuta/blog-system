package main

import (
	"fmt"
	"go-blog-server/router"
)

func main() {
	r := router.InitRouter()

	err := r.Run()
	if err != nil {
		fmt.Println("服务器启动失败！")
	}
}
