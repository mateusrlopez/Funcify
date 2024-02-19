"use client";

import { Root } from "@radix-ui/react-toggle";
import styled, { css } from "styled-components";

const config = {
    sm: {
        fontSize: "15px",
        height: "32px",
    },
    md: {
        fontSize: "15px",
        height: "36px",
    },
    lg: {
        fontSize: "19px",
        height: "42px",
    },
};

type PropTypes = {
    size?: "sm" | "md" | "lg";
};

export const StyledRoot = styled(Root)<PropTypes>`
    all: unset;
    width: max-content;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    ${({ theme, size }) => css`
        height: ${config[size as keyof typeof config].height};
        background: ${theme.colors.gray80};
        border: 1px solid ${theme.colors.gray60};
        color: ${theme.colors.gray20};
        font-family: ${theme.fontFamily.inter};
        padding: 0 27px;
        font-size: ${config[size as keyof typeof config].fontSize};
        font-weight: ${theme.fontWeight.md};

        &[data-state="on"] {
            background: ${theme.colors.gray60};
        }
    `};

    &:hover {
        cursor: pointer;
    }
`;
