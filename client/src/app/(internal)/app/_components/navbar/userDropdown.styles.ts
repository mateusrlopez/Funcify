"use client";

import { CoreTheme } from "@/theme/core";
import styled, { css } from "styled-components";

export const Root = styled.div`
    width: max-content;
    display: flex;
    align-items: center;
    gap: 10px;
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
        text-align: right;
        font-size: ${theme.fontSize[$fontSize]};
        font-weight: ${theme.fontWeight[$fontWeight]};
        color: ${theme.colors.gray90};
    `}
`;

export const User = styled.span`
    ${({ theme }) => css`
        width: 30px;
        height: 30px;
        border-radius: 4px;
        background-color: ${theme.colors.lighterCyan};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${theme.fontSize.default};
        font-weight: ${theme.fontWeight.bold};
        color: ${theme.colors.white};
        cursor: pointer;
    `}
`;
