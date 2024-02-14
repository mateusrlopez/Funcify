import { ReactNode } from "react";

import { CodeEditor } from "./CodeEditor";
import { DataSources } from "./DataSources";
import { Root } from "./Page.styles";
import { Sidebar } from "./Sidebar";

const Page = (): ReactNode => (
    <Root>
        <Sidebar />
        <CodeEditor />
        <DataSources />
    </Root>
);

export default Page;
