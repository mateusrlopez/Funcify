"use client";

import { CoreTheme } from "@/theme/core";
import Link from "next/link";
import styled, { css } from "styled-components";

export const Root = styled.footer`
    ${({ theme }) => css`
        width: 100%;
        height: 40px;
        background: ${theme.colors.gray20};
        border-top: 1px solid ${theme.colors.darkestGray};
        display: flex;
        align-items: center;
        justify-content: space-between;
    `}
`;

export const ProjectInfo = styled.div`
    ${({ theme }) => css`
        width: 300px;
        height: 39px;
        border-right: 1px solid ${theme.colors.darkestGray};
        background: ${theme.colors.darkestGray};
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 0 10px;
    `}
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const Text = styled.span<{
    $fontSize: keyof typeof CoreTheme.fontSize;
    $fontWeight: keyof typeof CoreTheme.fontWeight;
}>`
    ${({ theme, $fontSize, $fontWeight }) => css`
        display: block;
        text-align: left;
        font-size: ${theme.fontSize[$fontSize]};
        font-weight: ${theme.fontWeight[$fontWeight]};
        color: ${theme.colors.white};
    `}
`;

export const StyledLink = styled(Link)`
    width: 25px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.white};

    &:hover {
        transform: scale(1.05);
    }
`;
