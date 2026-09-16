package httpdelivery

import (
	"net/http"

	"github.com/Al3xiel/sezzle-calculator/backend/internal/entity"
	"github.com/Al3xiel/sezzle-calculator/backend/internal/usecase"
	"github.com/gin-gonic/gin"
)

type CalculatorHandler struct {
	calculatorUsecase *usecase.CalculatorUsecase
}

func NewCalculatorHandler(r *gin.Engine, uc *usecase.CalculatorUsecase) {
	handler := &CalculatorHandler{calculatorUsecase: uc}
	r.POST("/calculate", handler.Calculate)
}

func (h *CalculatorHandler) Calculate(c *gin.Context) {
	var req entity.CalculationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request payload"})
		return
	}

	result, err := h.calculatorUsecase.Calculate(req.Operation, req.A, req.B)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, entity.CalculationResponse{Result: result})
}
