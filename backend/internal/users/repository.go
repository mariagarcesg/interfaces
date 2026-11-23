package users

import (
	"context"
	"errors"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
)

const (
	RoleTeacher = "teacher"
	RoleStudent = "student"
)

var (
	ErrNotFound   = errors.New("usuario no encontrado")
	ErrEmailTaken = errors.New("el email ya está registrado")
)

type User struct {
	ID           int64     `json:"id"`
	FirstName    string    `json:"firstName"`
	LastName     string    `json:"lastName"`
	Email        string    `json:"email"`
	Role         string    `json:"role"`
	IsActive     bool      `json:"isActive"`
	CreatedAt    time.Time `json:"createdAt"`
	PasswordHash string    `json:"-"`
}

type CreateParams struct {
	FirstName    string
	LastName     string
	Email        string
	PasswordHash string
	Role         string
}

type Repository struct {
	pool *pgxpool.Pool
}

func NewRepository(pool *pgxpool.Pool) *Repository {
	return &Repository{pool: pool}
}

const selectUser = `
SELECT u.id, u.first_name, u.last_name, u.email, r.name, u.is_active, u.created_at, u.password_hash
FROM users u
JOIN roles r ON r.id = u.role_id
`

func scanUser(row pgx.Row) (*User, error) {
	var u User
	err := row.Scan(&u.ID, &u.FirstName, &u.LastName, &u.Email, &u.Role, &u.IsActive, &u.CreatedAt, &u.PasswordHash)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func (r *Repository) Create(ctx context.Context, p CreateParams) (*User, error) {
	var id int64
	err := r.pool.QueryRow(ctx, `
		INSERT INTO users (first_name, last_name, email, password_hash, role_id)
		VALUES ($1, $2, $3, $4, (SELECT id FROM roles WHERE name = $5))
		RETURNING id`,
		p.FirstName, p.LastName, p.Email, p.PasswordHash, p.Role,
	).Scan(&id)
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == "23505" {
			return nil, ErrEmailTaken
		}
		return nil, err
	}
	return r.FindByID(ctx, id)
}

func (r *Repository) FindByID(ctx context.Context, id int64) (*User, error) {
	return scanUser(r.pool.QueryRow(ctx, selectUser+" WHERE u.id = $1", id))
}

func (r *Repository) FindByEmail(ctx context.Context, email string) (*User, error) {
	return scanUser(r.pool.QueryRow(ctx, selectUser+" WHERE LOWER(u.email) = LOWER($1)", email))
}
