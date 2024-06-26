"use client";

import styled, { css } from "styled-components";

export const Root = styled.ul`
    width: 100%;
    height: calc(100vh - 160px);
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 3px !important;
    }

    &::-webkit-scrollbar-track {
        background: transparent !important;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.darkestGray} !important;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.gray60} !important;
        cursor: pointer;
    }
`;

export const ErrorMessage = styled.h2`
    ${({ theme }) => css`
        color: ${theme.colors.darkestGray};
        font-size: ${theme.fontSize.md};
        font-weight: ${theme.fontWeight.bold};
    `};
`;
