package usecase

import (
	"errors"
	"math"
)

type CalculatorUsecase struct {
}

func NewCalculatorUsecase() *CalculatorUsecase {
	return &CalculatorUsecase{}
}

func (uc *CalculatorUsecase) Calculate(op string, a, b float64) (float64, error) {
	switch op {
	case "add":
		return a + b, nil
	case "subtract":
		return a - b, nil
	case "multiply":
		return a * b, nil
	case "divide":
		if b == 0 {
			return 0, errors.New("division by zero is not allowed")
		}
		return a / b, nil
	case "sqrt":
		if a < 0 {
			return 0, errors.New("cannot calculate square root of a negative number")
		}
		return math.Sqrt(a), nil
	case "power":
		return math.Pow(a, b), nil
	case "percentage":
		return (a * b) / 100, nil
	default:
		return 0, errors.New("invalid operation")
	}
}
