import { Login } from "@/app/(external)/admin/_views/login";
import { ReactElement } from "react";

import { Panel } from "./_components/panel";

const Admin = (): ReactElement => {
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
