"use client";

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

export const ErrorMessagePassword = styled.span`
    ${({ theme }) => css`
        width: 100%;
        height: max-content;
        display: flex;
        align-items: center;
        gap: 3px;
        font-size: ${theme.fontSize.sm};
        font-weight: ${theme.fontWeight.regular};
        font-family: ${theme.fontFamily.inter};
        color: ${theme.colors.lighterRed};
        margin-top: -10px;
    `}
`;
