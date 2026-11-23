// Crea la cuenta del profesor. Uso:
//
//	go run ./cmd/seed -email profe@correo.com -password "secreto123" -first Ana -last Pérez
package main

import (
	"context"
	"flag"
	"log"

	"interfaces/backend/internal/auth"
	"interfaces/backend/internal/config"
	"interfaces/backend/internal/db"
	"interfaces/backend/internal/users"
)

func main() {
	email := flag.String("email", "", "email del profesor")
	password := flag.String("password", "", "contraseña (mínimo 8 caracteres)")
	first := flag.String("first", "Profesor", "nombre")
	last := flag.String("last", "Principal", "apellido")
	flag.Parse()

	if *email == "" || len(*password) < 8 {
		log.Fatal("Debes indicar -email y -password (mínimo 8 caracteres)")
	}

	cfg, err := config.Load()
	if err != nil {
		log.Fatal(err)
	}
	if err := db.Migrate(cfg.DatabaseURL); err != nil {
		log.Fatal(err)
	}

	ctx := context.Background()
	pool, err := db.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Fatal(err)
	}
	defer pool.Close()

	hash, err := auth.HashPassword(*password)
	if err != nil {
		log.Fatal(err)
	}

	u, err := users.NewRepository(pool).Create(ctx, users.CreateParams{
		FirstName:    *first,
		LastName:     *last,
		Email:        *email,
		PasswordHash: hash,
		Role:         users.RoleTeacher,
	})
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Profesor creado: %s (id %d)", u.Email, u.ID)
}
