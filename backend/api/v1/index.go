package v1

import (
	"go-blog-server/api/v1/user"

	"github.com/gin-gonic/gin"
)

func InitV1Api(r *gin.RouterGroup) {
	auth := r.Group("/v1")

	user.InitUserApi(auth)
}
