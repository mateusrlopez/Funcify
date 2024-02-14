"use client";

import { CoreTheme } from "@/theme/core";
import Link from "next/link";
import styled, { css } from "styled-components";

export const Root = styled.footer`
    ${({ theme }) => css`
        width: 100%;
        height: 62px;
        background: ${theme.colors.gray20};
        border-top: 1px solid ${theme.colors.darkestGray};
        display: flex;
        align-items: center;
        justify-content: space-between;
    `}
`;

export const Actions = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    flex-grow: 1;
    border-right: 1px solid ${({ theme }) => theme.colors.darkestGray};
`;

export const ProjectInfo = styled.div`
    ${({ theme }) => css`
        width: 299px;
        height: 61px;
        background: ${theme.colors.gray100};
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
    $color: keyof typeof CoreTheme.colors;
}>`
    ${({ theme, $fontSize, $fontWeight, $color }) => css`
        display: flex;
        align-items: center;
        gap: 7px;
        text-align: left;
        font-size: ${theme.fontSize[$fontSize]};
        font-weight: ${theme.fontWeight[$fontWeight]};
        color: ${theme.colors[$color]};
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
