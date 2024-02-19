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
        color: ${theme.colors.darkestGray};
        text-decoration: none;
        background-color: ${theme.colors.gray20};
        border: 1px solid ${theme.colors.darkestGray};
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        overflow: hidden;

        &[data-selected="true"] {
            background-color: ${theme.colors.darkestGray};
            color: ${theme.colors.gray10};
        }

        &:hover {
            background-color: ${theme.colors.darkestGray};
            color: ${theme.colors.gray10};
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
        background-color: ${theme.colors.darkestGray};

        &[data-selected="true"] {
            background-color: ${theme.colors.darkestGray};
            color: ${theme.colors.gray10};
        }
    `}
`;
