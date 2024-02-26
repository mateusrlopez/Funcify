"use client";

import { ReactNode } from "react";

import { Root, Title, Message, StyledLink } from "./NotFound.styles";

export default function NotFound(): ReactNode {
    return (
        <Root>
            <Title>Page Not Found</Title>
            <Message>The requested page was not found</Message>
            <StyledLink href="/">Back to root</StyledLink>
        </Root>
    );
}
