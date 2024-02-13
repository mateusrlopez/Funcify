import { Connector } from "@/app/(internal)/app/functions/Connector";
import { Sidebar } from "@/app/(internal)/app/functions/Sidebar";
import { ReactNode } from "react";

import { Root } from "./Page.styles";

const Page = (): ReactNode => (
    <Root>
        <Sidebar />
        <div />
        <Connector />
    </Root>
);

export default Page;
