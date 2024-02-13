import { ResetPassword } from "@/app/(external)/admin/_views/Reset";
import { ReactNode } from "react";

import { Panel } from "./_components/Panel";

const Page = (): ReactNode => {
    return (
        <Panel>
            {/* <Login /> */}
            {/* <Setup /> */}
            {/* <FirstAccess /> */}
            {/* <ForgotPassword /> */}
            <ResetPassword />
        </Panel>
    );
};

export default Page;
