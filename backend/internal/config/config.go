package config

import (
	"errors"
	"os"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	Port         string
	DatabaseURL  string
	JWTSecret    string
	JWTTTL       time.Duration
	CookieSecure bool
}

func Load() (*Config, error) {
	// .env es opcional: en producción las variables vienen del entorno.
	_ = godotenv.Load()

	cfg := &Config{
		Port:         getEnv("PORT", "8080"),
		DatabaseURL:  os.Getenv("DATABASE_URL"),
		JWTSecret:    os.Getenv("JWT_SECRET"),
		JWTTTL:       24 * time.Hour,
		CookieSecure: os.Getenv("COOKIE_SECURE") == "true",
	}

	if cfg.DatabaseURL == "" {
		return nil, errors.New("DATABASE_URL es obligatorio")
	}
	if len(cfg.JWTSecret) < 32 {
		return nil, errors.New("JWT_SECRET es obligatorio y debe tener al menos 32 caracteres")
	}
	return cfg, nil
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
