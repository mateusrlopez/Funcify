import { Footer } from "@/app/(internal)/app/functions/Footer";
import { ReactNode } from "react";

import { CodeEditor } from "./CodeEditor";
import { DataSources } from "./DataSources";
import { Root } from "./Page.styles";
import { Sidebar } from "./Sidebar";

const Page = (): ReactNode => (
    <>
        <Root>
            <Sidebar />
            <CodeEditor />
            <DataSources />
        </Root>
        <Footer />
    </>
);

export default Page;
