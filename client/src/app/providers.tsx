"use client";

import StyledComponentsRegistry from "@/lib/registry";
import { CoreTheme } from "@/theme/core";
import { PropsWithChildren, ReactNode } from "react";
import { ThemeProvider } from "styled-components";

const Providers = ({ children }: PropsWithChildren): ReactNode => {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={CoreTheme}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
    );
};

export default Providers;
