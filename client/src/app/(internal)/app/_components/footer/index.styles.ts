"use client";

import { CoreTheme } from "@/theme/core";
import Link from "next/link";
import styled, { css } from "styled-components";

export const Root = styled.footer`
    width: 100%;
    height: 40px;
    background: ${({ theme }) => theme.colors.gray50};
    border-top: 1px solid ${({ theme }) => theme.colors.lighterCyan};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ProjectInfo = styled.div`
    width: 250px;
    height: 39px;
    border-right: 1px solid ${({ theme }) => theme.colors.lighterCyan};
    background: ${({ theme }) => theme.colors.lighterCyan};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 0 10px;
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
