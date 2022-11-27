package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthRouter(g *gin.RouterGroup) {
	g.GET("/login", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"msg": "login success",
		})
	})
}
