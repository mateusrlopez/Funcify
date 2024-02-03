import { Login } from "@/app/(external)/admin/_views/login";
import { ReactNode } from "react";

import { Panel } from "./_components/panel";

const Admin = (): ReactNode => {
    return (
        <Panel>
            <Login />
            {/* <Setup /> */}
            {/* <FirstAccess /> */}
            {/* <ForgotPassword /> */}
        </Panel>
    );
};

export default Admin;
