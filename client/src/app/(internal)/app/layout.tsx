import { IReactChildren } from "@/interfaces/core";
import { ReactNode } from "react";

import { Navbar } from "./_components/Navbar";
import { Root } from "./styles";

export default function Layout({ children }: IReactChildren): ReactNode {
    return (
        <Root>
            <Navbar />
            {children}
        </Root>
    );
}
