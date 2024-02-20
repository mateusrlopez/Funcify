import axios, { AxiosInstance } from "axios";

// TODO - Implements a configuration file to store the API URL
const API_HOST = "http://127.0.0.1:8080/api/v1/" as const;
const client: AxiosInstance = axios.create({
    baseURL: API_HOST,
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
    },
    withCredentials: true,
});

export { client };
