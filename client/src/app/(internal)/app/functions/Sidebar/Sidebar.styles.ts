"use client";

import styled, { css } from "styled-components";

export const Root = styled.aside`
    ${({ theme }) => css`
        width: 100%;
        height: calc(100vh - 102px);
        background: ${theme.colors.gray20};
        border-right: 1px solid ${theme.colors.darkestGray};
        display: flex;
        flex-direction: column;
        gap: 10px;
    `};
`;

export const SearchInput = styled.div`
    ${({ theme }) => css`
        width: 100%;
        height: 42px;
        display: flex;
        align-items: center;
        gap: 12px;
        background-color: ${theme.colors.gray10};
        border: 1px solid ${theme.colors.gray50};
        padding: 0 12px;
        resize: none;
        flex-grow: 1;
        border-radius: 4px;

        > svg {
            color: ${theme.colors.gray70};
        }

        > input {
            all: unset;
            width: 100%;
            height: 100%;
            padding: 10px 0;
            color: ${theme.colors.gray100};
            font-size: ${theme.fontSize.default};
            font-weight: ${theme.fontWeight.regular};
            font-family: ${theme.fontFamily.inter};
            letter-spacing: ${theme.letterSpacing.default};
        }

        &:focus-within {
            outline: none;
            border: 1px solid ${theme.colors.darkestGray};

            > svg {
                color: ${theme.colors.gray100};
            }
        }

        &::placeholder {
            font-weight: ${theme.fontWeight.regular};
            font-size: ${theme.fontSize.default};
            color: ${theme.colors.gray70};
        }
    `}
`;

export const FunctionList = styled.ul`
    width: 100%;
    border-top: 1px solid ${({ theme }) => theme.colors.darkestGray};
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

export const FunctionListTitle = styled.span`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        gap: 10px;
        width: max-content;
        font-size: ${theme.fontSize.default};
        font-weight: ${theme.fontWeight.bold};
        font-family: ${theme.fontFamily.inter};
        color: ${theme.colors.gray10};
        padding: 10px 10px 9px 10px;
        border-radius: 4px;
        background: ${theme.colors.gray100};
        margin: 10px 0 10px 10px;
        user-select: none;
    `}
`;
