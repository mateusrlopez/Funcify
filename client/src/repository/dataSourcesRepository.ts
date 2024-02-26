import { client } from "@/lib/axios-client";
import { CreateDataSource, DataSourceSchema, GetAllDataSources } from "@/types/dataSource";
import { AxiosResponse } from "axios";

const PREFIX = "data-sources";

export async function createDataSource(data: CreateDataSource): Promise<DataSourceSchema> {
    const response: AxiosResponse<DataSourceSchema> = await client.request({
        url: PREFIX,
        method: "POST",
        data,
    });

    return response.data;
}

export async function getAllDataSources(): Promise<GetAllDataSources> {
    const response: AxiosResponse<GetAllDataSources> = await client.request({
        url: PREFIX,
        method: "GET",
    });

    return response.data;
}

export async function getDataSourceById(id: string): Promise<DataSourceSchema> {
    const response: AxiosResponse<DataSourceSchema> = await client.request({
        url: `${PREFIX}/${id}`,
        method: "GET",
    });

    return response.data;
}

export async function deleteDataSource(id: string): Promise<void> {
    await client.request({
        url: `${PREFIX}/${id}`,
        method: "DELETE",
    });
}
