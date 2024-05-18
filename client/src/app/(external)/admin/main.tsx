"use client";

import { Panel } from "@/app/(external)/admin/_components/Panel";
import { Login } from "@/app/(external)/admin/_views/Login";
import { Setup } from "@/app/(external)/admin/_views/Setup";
import { verifyIfSetupWasDone } from "@/repository/setupRepository";
import { useEffect, useState } from "react";

export default function Main() {
    const [setupIsDone, setSetupIsDone] = useState(false);

    useEffect(() => {
        (async () => {
            const { done } = await verifyIfSetupWasDone();
            setSetupIsDone(done);
        })();
    });

    return <Panel>{setupIsDone ? <Login /> : <Setup />}</Panel>;
}
