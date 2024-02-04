import { Footer } from "@/app/(internal)/app/_components/footer";
import { Navbar } from "@/app/(internal)/app/_components/navbar";
import { IReactChildren } from "@/interfaces/core";
import { ReactNode } from "react";

import { Root } from "./styles";

const Layout = ({ children }: IReactChildren): ReactNode => (
    <Root>
        <Navbar />
        {children}
        <Footer />
    </Root>
);

export default Layout;
