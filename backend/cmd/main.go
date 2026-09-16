package main

import (
	httpdelivery "github.com/Al3xiel/sezzle-calculator/backend/internal/infrastructure"
	"github.com/Al3xiel/sezzle-calculator/backend/internal/usecase"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// 1. Inicializar capas
	calcUsecase := usecase.NewCalculatorUsecase()

	// 2. Registrar rutas y handlers
	httpdelivery.NewCalculatorHandler(r, calcUsecase)

	// 3. Levantar servidor
	r.Run(":8080")
}
