package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"

	"interfaces/backend/internal/auth"
	"interfaces/backend/internal/config"
	"interfaces/backend/internal/users"
)

func NewRouter(cfg *config.Config, pool *pgxpool.Pool) *gin.Engine {
	r := gin.Default()
	_ = r.SetTrustedProxies(nil)

	userRepo := users.NewRepository(pool)
	tokens := auth.NewTokenService(cfg.JWTSecret, cfg.JWTTTL)
	authHandler := auth.NewHandler(userRepo, tokens, cfg.CookieSecure)

	api := r.Group("/api")

	api.GET("/health", func(c *gin.Context) {
		if err := pool.Ping(c.Request.Context()); err != nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"status": "db_down"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	authGroup := api.Group("/auth")
	authGroup.POST("/register", authHandler.Register)
	authGroup.POST("/login", authHandler.Login)
	authGroup.POST("/logout", authHandler.Logout)
	authGroup.GET("/me", auth.RequireAuth(tokens), authHandler.Me)

	// Rutas protegidas por rol: aquí se irán agregando evaluaciones, etc.
	protected := api.Group("", auth.RequireAuth(tokens))
	teacher := protected.Group("/teacher", auth.RequireRole(users.RoleTeacher))
	teacher.GET("/ping", func(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"message": "hola profesor"}) })
	student := protected.Group("/student", auth.RequireRole(users.RoleStudent))
	student.GET("/ping", func(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"message": "hola estudiante"}) })

	return r
}
