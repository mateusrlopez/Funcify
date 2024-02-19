"use client";

import { Root, Item } from "@radix-ui/react-toggle-group";
import styled, { css } from "styled-components";

export const StyledRoot = styled(Root)`
    display: inline-flex;
    width: max-content;

    @media (max-width: 768px) {
        width: 100%;
        display: flex;
    }
`;

export const StyledItem = styled(Item)`
    ${({ theme }) => css`
        all: unset;
        color: ${theme.colors.darkestGray};
        font-family: ${theme.fontFamily.inter};
        font-size: ${theme.fontSize.default};
        font-weight: ${theme.fontWeight.regular};
        background-color: ${theme.colors.gray20};
        padding: 0 13px;
        height: 42px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        border: 1px solid transparent;

        &:focus {
            border: 1px solid ${theme.colors.darkestGray};
        }

        &:hover {
            cursor: pointer;
            background: ${theme.colors.gray30};
        }

        &:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }

        &:last-child {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }

        &[data-state="on"] {
            background: ${theme.colors.gray50};
        }

        @media (max-width: 768px) {
            padding: 0 10px;
            flex-grow: 1;
        }
    `};
`;
