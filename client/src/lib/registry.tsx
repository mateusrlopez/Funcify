"use client";

import { IReactChildren } from "@/interfaces/core";
import { useServerInsertedHTML } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

const StyledComponentsRegistry = ({ children }: IReactChildren): ReactNode => {
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        styledComponentsStyleSheet.instance.clearTag();
        return <>{styles}</>;
    });

    if (typeof window !== "undefined") return <>{children}</>;

    return (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
            {children}
        </StyleSheetManager>
    );
};

export default StyledComponentsRegistry;
