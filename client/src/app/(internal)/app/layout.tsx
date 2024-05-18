import { IReactChildren } from "@/interfaces/core";
import { ReactNode, Suspense } from "react";

import { Navbar } from "./_components/Navbar";
import { Root } from "./styles";

export default function Layout({ children }: IReactChildren): ReactNode {
    return (
        <Root>
            <Navbar />
            <Suspense>{children}</Suspense>
        </Root>
    );
}
