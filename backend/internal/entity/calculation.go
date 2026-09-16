package entity

// CalculatioNRequest
// add, subtract, multiply, divide, sqrt, power, percentage
type CalculationRequest struct {
	Operation string  `json:"operation"`
	A         float64 `json:"a"`
	B         float64 `json:"b,omitempty"`
}

// CalculationResponse
type CalculationResponse struct {
	Result float64 `json:"result"`
	Error  string  `json:"error,omitempty"`
}
