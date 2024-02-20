import { client } from "@/lib/axios-client";
import { AxiosResponse } from "axios";

const PREFIX = "setup";

export async function setup(email: string, password: string): Promise<void> {
    await client.request({
        url: `${PREFIX}`,
        method: "POST",
        data: { email, password },
    });
}

export async function verifyIfSetupWasDone(): Promise<SetupIsDoneResponse> {
    const response: AxiosResponse<SetupIsDoneResponse> = await client.request({
        url: `${PREFIX}`,
        method: "GET",
    });

    return response.data;
}
