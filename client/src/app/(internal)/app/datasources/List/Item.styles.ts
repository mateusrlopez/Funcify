"use client";

import styled, { css } from "styled-components";

export const Root = styled.li`
    ${({ theme }) => css`
        width: 100%;
        height: max-content;
        padding: 10px;
        border: 1px solid ${theme.colors.darkestGray};
        border-left: 10px solid ${theme.colors.darkestGray};
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        &:hover {
            background: ${theme.colors.gray30};
        }
    `}
`;

export const Name = styled.h2`
    ${({ theme }) => css`
        display: block;
        font-size: ${theme.fontSize.md};
        font-weight: ${theme.fontWeight.bold};
        color: ${theme.colors.darkestGray};
    `}
`;

export const Text = styled.span`
    ${({ theme }) => css`
        display: block;
        font-size: ${theme.fontSize.sm};
        font-weight: ${theme.fontWeight.medium};
        color: ${theme.colors.gray90};
    `}
`;

export const Actions = styled.button`
    ${({ theme }) => css`
        all: unset;
        width: 26px;
        height: 26px;
        border: 1px solid ${theme.colors.darkestGray};
        background-color: ${theme.colors.gray20};
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
            background-color: ${theme.colors.gray40};
        }

        &:focus {
            outline: 1px solid ${theme.colors.darkestGray};
        }
    `};
`;
