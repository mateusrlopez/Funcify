"use client";

import { Slot } from "@radix-ui/react-slot";
import styled, { css } from "styled-components";

export const CommonStyles = css`
    ${({ theme }) => css`
        padding: 7px 15px;
        background: ${theme.colors.darkestGray};
        border: none;
        font-family: ${theme.fontFamily.inter};
        font-size: ${theme.fontSize.default};
        font-weight: ${theme.fontWeight.regular};
        color: ${theme.colors.gray10};
        height: 42px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;

        &:focus {
            outline: 1px solid ${theme.colors.darkestCyan};
        }

        &:hover {
            background: ${theme.colors.black};
        }
    `}
`;

export const PolymorphicComponent = styled(Slot)<{ $full: boolean }>`
    ${CommonStyles};
    ${({ $full }) => css`
        width: ${!$full ? "max-content" : "100%"};
    `}
`;

export const StyledButton = styled.button<{ $full: boolean }>`
    ${CommonStyles};
    ${({ $full }) => css`
        width: ${!$full ? "max-content" : "100%"};
    `}
`;
