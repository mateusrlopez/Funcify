import { Connector } from "@/app/(internal)/app/functions/connector";
import { Sidebar } from "@/app/(internal)/app/functions/sidebar";
import { ReactNode } from "react";

import { Root } from "./page.styles";

const Functions = (): ReactNode => (
    <Root>
        <Sidebar />
        <div />
        <Connector />
    </Root>
);

export default Functions;
