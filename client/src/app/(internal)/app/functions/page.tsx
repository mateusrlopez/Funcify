import { ReactNode } from "react";

import { CodeEditor } from "./CodeEditor";
import { Connector } from "./Connector";
import { Root } from "./Page.styles";
import { Sidebar } from "./Sidebar";

const Page = (): ReactNode => (
    <Root>
        <Sidebar />
        <CodeEditor />
        <Connector />
    </Root>
);

export default Page;
