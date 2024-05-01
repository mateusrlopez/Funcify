import { verifyIfSetupWasDone } from "@/repository/setupRepository";
import { Metadata } from "next";

import { Panel } from "./_components/Panel";
import { Login } from "./_views/Login";
import { Setup } from "./_views/Setup";

export const metadata: Metadata = {
    title: "Admin",
};

export default async function Page() {
    const { done: setupIsDone }: SetupIsDoneResponse = await verifyIfSetupWasDone();

    await new Promise(resolve => {
        setTimeout(resolve, 2000);
    });

    return <Panel>{setupIsDone ? <Login /> : <Setup />}</Panel>;
}
