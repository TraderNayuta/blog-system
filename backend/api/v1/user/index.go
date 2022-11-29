package user

import "github.com/gin-gonic/gin"

func InitUserApi(r *gin.RouterGroup) {
	auth := r.Group("/user")

	// 注册授权api
	AuthApi(auth)
}
