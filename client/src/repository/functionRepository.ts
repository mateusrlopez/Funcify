import { client } from "@/lib/axios-client";
import { FunctionSchema, GetAllFunctions, UpdateFunction } from "@/types/function";
import { AxiosResponse } from "axios";

const PREFIX = "functions";

export async function createFunction(data: any): Promise<FunctionSchema> {
    const response: AxiosResponse<FunctionSchema> = await client.request({
        url: PREFIX,
        method: "POST",
        data,
    });

    return response.data;
}

export async function updateFunction<I, O>(
    functionId: string,
    data: UpdateFunction<I, O>
): Promise<FunctionSchema> {
    const response: AxiosResponse<FunctionSchema> = await client.request({
        url: `${PREFIX}/${functionId}`,
        method: "PUT",
        data,
    });

    return response.data;
}

export async function getAllFunctions(): Promise<GetAllFunctions> {
    const response: AxiosResponse<GetAllFunctions> = await client.request({
        url: PREFIX,
        method: "GET",
    });

    return response.data;
}

export async function getFunctionById(functionId: string): Promise<FunctionSchema> {
    const response: AxiosResponse<FunctionSchema> = await client.request({
        url: `${PREFIX}/${functionId}`,
        method: "GET",
    });

    return response.data;
}

export async function deleteFunction(functionId: string): Promise<void> {
    await client.request({
        url: `${PREFIX}/${functionId}`,
        method: "DELETE",
    });
}
