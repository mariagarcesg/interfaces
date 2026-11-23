package auth

import (
	"errors"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"interfaces/backend/internal/users"
)

const CookieName = "session"

type Handler struct {
	users        *users.Repository
	tokens       *TokenService
	cookieSecure bool
}

func NewHandler(repo *users.Repository, tokens *TokenService, cookieSecure bool) *Handler {
	return &Handler{users: repo, tokens: tokens, cookieSecure: cookieSecure}
}

type registerRequest struct {
	FirstName string `json:"firstName" binding:"required,max=100"`
	LastName  string `json:"lastName"  binding:"required,max=100"`
	Email     string `json:"email"     binding:"required,email,max=255"`
	Password  string `json:"password"  binding:"required,min=8,max=72"`
}

type loginRequest struct {
	Email    string `json:"email"    binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// Register crea siempre una cuenta de estudiante. El profesor se crea con cmd/seed.
func (h *Handler) Register(c *gin.Context) {
	var req registerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos. Revisa los campos e intenta de nuevo."})
		return
	}

	hash, err := HashPassword(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo crear la cuenta"})
		return
	}

	user, err := h.users.Create(c.Request.Context(), users.CreateParams{
		FirstName:    strings.TrimSpace(req.FirstName),
		LastName:     strings.TrimSpace(req.LastName),
		Email:        strings.TrimSpace(req.Email),
		PasswordHash: hash,
		Role:         users.RoleStudent,
	})
	if errors.Is(err, users.ErrEmailTaken) {
		c.JSON(http.StatusConflict, gin.H{"error": "Ese email ya está registrado"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo crear la cuenta"})
		return
	}

	if !h.startSession(c, user) {
		return
	}
	c.JSON(http.StatusCreated, gin.H{"user": user})
}

func (h *Handler) Login(c *gin.Context) {
	var req loginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email y contraseña son obligatorios"})
		return
	}

	user, err := h.users.FindByEmail(c.Request.Context(), strings.TrimSpace(req.Email))
	if err != nil && !errors.Is(err, users.ErrNotFound) {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al iniciar sesión"})
		return
	}
	// Mismo mensaje para email inexistente y contraseña incorrecta.
	if user == nil || !CheckPassword(user.PasswordHash, req.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email o contraseña incorrectos"})
		return
	}
	if !user.IsActive {
		c.JSON(http.StatusForbidden, gin.H{"error": "Tu cuenta está desactivada"})
		return
	}

	if !h.startSession(c, user) {
		return
	}
	c.JSON(http.StatusOK, gin.H{"user": user})
}

func (h *Handler) Logout(c *gin.Context) {
	h.setCookie(c, "", -1)
	c.Status(http.StatusNoContent)
}

func (h *Handler) Me(c *gin.Context) {
	user, err := h.users.FindByID(c.Request.Context(), c.GetInt64(ContextUserID))
	if err != nil || !user.IsActive {
		h.setCookie(c, "", -1)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Sesión inválida"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"user": user})
}

func (h *Handler) startSession(c *gin.Context, user *users.User) bool {
	token, err := h.tokens.Generate(user.ID, user.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo iniciar la sesión"})
		return false
	}
	h.setCookie(c, token, int(h.tokens.TTL().Seconds()))
	return true
}

func (h *Handler) setCookie(c *gin.Context, value string, maxAge int) {
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie(CookieName, value, maxAge, "/", "", h.cookieSecure, true)
}
