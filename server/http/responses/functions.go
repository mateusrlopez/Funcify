package responses

import (
	"github.com/mateusrlopez/funcify/entities"
)

type Functions struct {
	Functions []Function `json:"functions"`
}

func NewFunctions(functions []entities.Function) Functions {
	res := Functions{}

	for _, function := range functions {
		res.Functions = append(res.Functions, NewFunction(function))
	}

	return res
}
