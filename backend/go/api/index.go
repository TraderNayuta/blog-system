package api

import (
	v1 "go-blog-server/api/v1"

	"github.com/gin-gonic/gin"
)

func InitApi(r *gin.Engine) {
	api := r.Group("/api")

	v1.InitV1Api(api)
}
