"use client";

import { FunctionsProvider } from "@/app/_context/functions";
import { queryClient } from "@/lib/query-client";
import StyledComponentsRegistry from "@/lib/registry";
import { CoreTheme } from "@/theme/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

const Providers = ({ children }: { children: ReactNode }): ReactNode => {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={CoreTheme}>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <FunctionsProvider>{children}</FunctionsProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </StyledComponentsRegistry>
    );
};

export default Providers;
