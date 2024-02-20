import { client } from "@/lib/axios-client";

const PREFIX = "auth";

export async function signIn(email: string, password: string): Promise<void> {
    await client.request({
        url: `${PREFIX}/sign-in`,
        method: "POST",
        data: { email, password },
    });
}

export async function signOut(): Promise<void> {
    await client.request({
        url: `${PREFIX}/sign-out`,
        method: "DELETE",
    });
}
