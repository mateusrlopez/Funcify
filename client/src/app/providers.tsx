"use client";

import StyledComponentsRegistry from "@/lib/registry";
import { CoreTheme } from "@/theme/core";
import { PropsWithChildren, ReactElement } from "react";
import { ThemeProvider } from "styled-components";

const Providers = ({ children }: PropsWithChildren): ReactElement => {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={CoreTheme}>
                {children}
            </ThemeProvider>
        </StyledComponentsRegistry>
    );
};

export default Providers;