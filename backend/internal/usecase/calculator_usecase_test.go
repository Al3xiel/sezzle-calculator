package usecase

import (
	"testing"
)

func TestCalculatorUsecase_Calculate(t *testing.T) {
	uc := NewCalculatorUsecase()

	tests := []struct {
		name      string
		op        string
		a, b      float64
		want      float64
		expectErr bool
	}{
		{"Addition valid", "add", 5, 3, 8, false},
		{"Subtraction valid", "subtract", 10, 4, 6, false},
		{"Multiplication valid", "multiply", 3, 4, 12, false},
		{"Division valid", "divide", 10, 2, 5, false},
		{"Division by zero error", "divide", 10, 0, 0, true},
		{"Square root valid", "sqrt", 9, 0, 3, false},
		{"Square root negative error", "sqrt", -4, 0, 0, true},
		{"Power valid", "power", 2, 3, 8, false},
		{"Percentage valid", "percentage", 200, 15, 30, false},
		{"Invalid operation error", "invalid", 1, 1, 0, true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := uc.Calculate(tt.op, tt.a, tt.b)

			if (err != nil) != tt.expectErr {
				t.Errorf("Calculate() error = %v, expectErr %v", err, tt.expectErr)
				return
			}

			if !tt.expectErr && got != tt.want {
				t.Errorf("Calculate() = %v, want %v", got, tt.want)
			}
		})
	}
}
