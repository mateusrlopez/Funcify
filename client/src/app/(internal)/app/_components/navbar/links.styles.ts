"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

export const Root = styled.div`
    width: max-content;
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const Option = styled(Link)`
    ${({ theme }) => css`
        margin-top: 6px;
        height: 35px;
        padding-right: 15px;
        display: flex;
        gap: 15px;
        align-items: center;
        font-size: ${theme.fontSize.sm};
        font-weight: ${theme.fontWeight.medium};
        color: ${theme.colors.darkestCyan};
        text-decoration: none;
        background-color: ${theme.colors.gray50};
        border: 1px solid ${theme.colors.lighterCyan};
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        overflow: hidden;

        &[data-selected="true"] {
            background-color: ${theme.colors.lighterCyan};
            color: ${theme.colors.white};
        }

        &:hover {
            background-color: ${theme.colors.gray70};
        }
    `}
`;

export const Icon = styled.div`
    ${({ theme }) => css`
        width: 35px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${theme.colors.white};
        background-color: ${theme.colors.lighterCyan};

        &[data-selected="true"] {
            background-color: ${theme.colors.darkestCyan};
        }
    `}
`;
