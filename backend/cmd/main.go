package main

import (
	httpdelivery "github.com/Al3xiel/sezzle-calculator/backend/internal/infrastructure"
	"github.com/Al3xiel/sezzle-calculator/backend/internal/usecase"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	//CORS configuration to allow requests from frontend
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"}, // Añade los puertos de tu frontend
		AllowMethods:     []string{"POST", "GET", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Initialize usecase
	calcUsecase := usecase.NewCalculatorUsecase()

	// Register routes and handlers
	httpdelivery.NewCalculatorHandler(r, calcUsecase)

	// Start the server
	r.Run(":8080")
}
