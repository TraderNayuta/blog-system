package user

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthApi(g *gin.RouterGroup) {
	g.POST("/login", func(ctx *gin.Context) {
		body, _ := ioutil.ReadAll(ctx.Request.Body)
		fmt.Println(string(body))

		ctx.JSON(http.StatusOK, gin.H{
			"msg":  "login success",
			"data": "abc",
			// "name": username,
			// "pwd":  password,
		})
	})
}
