// Package migrations embebe los archivos SQL para ejecutarlos al iniciar la API.
package migrations

import "embed"

//go:embed *.sql
var FS embed.FS
