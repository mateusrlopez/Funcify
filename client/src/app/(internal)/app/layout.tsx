import { IReactChildren } from "@/interfaces/core";
import { ReactNode } from "react";

import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";
import { Root } from "./styles";

const Layout = ({ children }: IReactChildren): ReactNode => (
    <Root>
        <Navbar />
        {children}
        <Footer />
    </Root>
);

export default Layout;
