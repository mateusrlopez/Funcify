import { IReactChildren } from "@/interfaces/core";
import { ReactNode } from "react";

import { Navbar } from "./_components/Navbar";
import { Root } from "./styles";

const Layout = ({ children }: IReactChildren): ReactNode => (
    <Root>
        <Navbar />
        {children}
    </Root>
);

export default Layout;
