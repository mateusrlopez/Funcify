import { Footer } from "@/app/(internal)/app/functions/Footer";

import { CodeEditor } from "./CodeEditor";
import { DataSources } from "./DataSources";
import { Root } from "./Page.styles";
import { Sidebar } from "./Sidebar";

export default function Page() {
    return (
        <>
            <Root>
                <Sidebar />
                <CodeEditor />
                <DataSources />
            </Root>
            <Footer />
        </>
    );
}
