# Aula Virtual

Plataforma profesor–estudiante para una sola materia.

- **backend/**: Go + Gin + PostgreSQL (pgx, golang-migrate, JWT en cookie httpOnly)
- **frontend/**: React + Vite + TypeScript + Tailwind CSS v4 + React Router

## Con Docker (recomendado)

```bash
cp .env.example .env            # pon tu contraseña de PostgreSQL en DATABASE_URL
docker compose up -d --build
```

La base de datos **no** corre en Docker: es tu PostgreSQL local (puerto 5432, BD `interfaces`),
el mismo que ves en pgAdmin. Los contenedores llegan a él mediante `host.docker.internal`.

| Servicio  | URL / puerto en tu PC |
|-----------|-----------------------|
| Web       | http://localhost:3000 |
| API       | http://localhost:8080/api |
| PostgreSQL| localhost:5432 (local, BD `interfaces`) |

Crear el profesor:
```bash
docker compose exec backend ./seed -email profe@correo.com -password "secreto123" -first Ana -last Pérez
```

Tras cambiar código: `docker compose up -d --build`. Los datos viven en tu PostgreSQL local,
así que `docker compose down` no los borra.

## Sin Docker (desarrollo local)

### 1. Base de datos
La base de datos se llama `interfaces` (ya creada en pgAdmin). Si no existiera:
```sql
CREATE DATABASE interfaces;
```

### 2. Backend
```bash
cd backend
cp .env.example .env      # edita DATABASE_URL (tu contraseña) y JWT_SECRET
go run ./cmd/api          # aplica las migraciones y arranca en :8080
```

Crear la cuenta del profesor (el registro público solo crea estudiantes):
```bash
go run ./cmd/seed -email profe@correo.com -password "secreto123" -first Ana -last Pérez
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev               # http://localhost:5173 (/api se reenvía a :8080)
```

## API actual

| Método | Ruta                 | Acceso      |
|--------|----------------------|-------------|
| GET    | /api/health          | público     |
| POST   | /api/auth/register   | público (crea estudiante) |
| POST   | /api/auth/login      | público     |
| POST   | /api/auth/logout     | público     |
| GET    | /api/auth/me         | autenticado |
| GET    | /api/teacher/ping    | profesor    |
| GET    | /api/student/ping    | estudiante  |

## Rutas del frontend

| Ruta          | Vista                         |
|---------------|-------------------------------|
| /             | Página de inicio pública      |
| /login        | Iniciar sesión                |
| /registro     | Registro de estudiante        |
| /profesor     | Panel del profesor (protegido)|
| /estudiante   | Panel del estudiante (protegido)|

## Migraciones
Viven en `backend/migrations/` (`NNNNNN_nombre.up.sql` / `.down.sql`) y se aplican solas al iniciar la API.
Para una tabla nueva, crea el siguiente número (`000002_...`).
