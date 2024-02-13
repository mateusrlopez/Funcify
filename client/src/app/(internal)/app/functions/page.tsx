import { ReactNode } from "react";

import { Connector } from "./Connector";
import { Root } from "./Page.styles";
import { Sidebar } from "./Sidebar";

const Page = (): ReactNode => (
    <Root>
        <Sidebar />
        <div />
        <Connector />
    </Root>
);

export default Page;
