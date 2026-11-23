package auth

import (
	"net/http"
	"slices"

	"github.com/gin-gonic/gin"
)

const (
	ContextUserID = "userID"
	ContextRole   = "role"
)

// RequireAuth valida la cookie de sesión y guarda el usuario en el contexto.
func RequireAuth(tokens *TokenService) gin.HandlerFunc {
	return func(c *gin.Context) {
		cookie, err := c.Cookie(CookieName)
		if err != nil || cookie == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "No autenticado"})
			return
		}
		userID, role, err := tokens.Parse(cookie)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Sesión expirada o inválida"})
			return
		}
		c.Set(ContextUserID, userID)
		c.Set(ContextRole, role)
		c.Next()
	}
}

// RequireRole debe ir después de RequireAuth.
func RequireRole(roles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		if !slices.Contains(roles, c.GetString(ContextRole)) {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "No tienes permiso para esta acción"})
			return
		}
		c.Next()
	}
}
