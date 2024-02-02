"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

export const Root = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding: 40px;
`;

export const Title = styled.h1`
    ${({ theme }) => css`
        font-size: ${theme.fontSize.md};
        font-weight: ${theme.fontWeight.bold};
        font-family: ${theme.fontFamily.inter};
        color: ${theme.colors.gray100};
        margin-bottom: 15px;
        text-align: center;
    `}
`;

export const ForgotPassword = styled(Link)`
    ${({ theme }) => css`
        all: unset;
        width: 100%;
        font-size: ${theme.fontSize.sm};
        font-weight: ${theme.fontWeight.regular};
        font-family: ${theme.fontFamily.inter};
        color: ${theme.colors.lighterCyan};
        margin-top: -5px;
        text-align: center;
        cursor: pointer;

        &:hover {
            color: ${theme.colors.darkestCyan};
        }
    `};
`;
