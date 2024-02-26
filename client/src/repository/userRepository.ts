import { client } from "@/lib/axios-client";
import { AxiosResponse } from "axios";

const PREFIX = "users";

export async function createUser(data: CreateUser): Promise<UserSchema> {
    const response: AxiosResponse<UserSchema> = await client.request({
        method: "POST",
        url: PREFIX,
        data,
    });

    return response.data;
}

export async function updateUser(id: string, data: UpdateUser): Promise<UserSchema> {
    const response: AxiosResponse<UserSchema> = await client.request({
        method: "PUT",
        url: `${PREFIX}/${id}`,
        data,
    });

    return response.data;
}

export async function getAllUsers(): Promise<GetAllUsers> {
    const response: AxiosResponse<GetAllUsers> = await client.request({
        method: "GET",
        url: PREFIX,
    });

    return response.data;
}

export async function getUser(id: string): Promise<UserSchema> {
    const response: AxiosResponse<UserSchema> = await client.request({
        method: "GET",
        url: `${PREFIX}/${id}`,
    });

    return response.data;
}

export async function deleteUser(id: string): Promise<void> {
    await client.request({
        method: "DELETE",
        url: `${PREFIX}/${id}`,
    });
}
