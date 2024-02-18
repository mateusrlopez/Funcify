package responses

import "github.com/mateusrlopez/funcify/entities"

type DataSources struct {
	DataSources []DataSource `json:"dataSources"`
}

func NewDataSources(dataSources []entities.DataSource) DataSources {
	res := DataSources{}

	for _, dataSource := range dataSources {
		res.DataSources = append(res.DataSources, NewDataSource(dataSource))
	}

	return res
}
