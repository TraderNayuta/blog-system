package user

import "github.com/gin-gonic/gin"

func InitUserRouter(r *gin.RouterGroup) {
	auth := r.Group("/user")

	AuthRouter(auth)
}
