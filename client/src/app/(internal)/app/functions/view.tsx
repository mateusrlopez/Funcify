"use client";

import { CodeEditor } from "@/app/(internal)/app/functions/CodeEditor";
import { DataSources } from "@/app/(internal)/app/functions/DataSources";
import { NullValueMessageContainer } from "@/app/(internal)/app/functions/Page.styles";
import { Sidebar } from "@/app/(internal)/app/functions/Sidebar";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { FaCode } from "react-icons/fa6";

const View = (): ReactNode => {
    const searchParams = useSearchParams();
    const fid = searchParams.get("fid");

    return (
        <>
            <Sidebar />
            {fid ? (
                <>
                    <CodeEditor />
                    <DataSources />
                </>
            ) : (
                <NullValueMessageContainer>
                    <FaCode size={200} />
                    <h2>
                        Select an existing function or
                        <br /> create a new one aside...
                    </h2>
                </NullValueMessageContainer>
            )}
        </>
    );
};

export { View };
