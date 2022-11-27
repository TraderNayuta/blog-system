package api

import (
	"go-blog-server/router/api/user"

	"github.com/gin-gonic/gin"
)

func InitApi(r *gin.Engine) {
	api := r.Group("/api")

	user.InitUserRouter(api)
}
