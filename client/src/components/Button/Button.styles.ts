"use client";

import { CoreTheme } from "@/theme/core";
import { Slot } from "@radix-ui/react-slot";
import styled, { css } from "styled-components";

export const CommonStyles = css`
    ${({ theme }) => css`
        padding: 0 13px;
        border: none;
        font-family: ${theme.fontFamily.inter};
        font-size: ${theme.fontSize.default};
        font-weight: ${theme.fontWeight.regular};
        height: 42px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;

        &:focus {
            outline: 1px solid ${theme.colors.black};
        }
    `}
`;

const VARIANTS = {
    primary: {
        backgroundColor: CoreTheme.colors.darkestGray,
        fontColor: CoreTheme.colors.gray10,
        hoverBackgroundColor: CoreTheme.colors.black,
    },
    secondary: {
        backgroundColor: CoreTheme.colors.gray50,
        fontColor: CoreTheme.colors.darkestGray,
        hoverBackgroundColor: CoreTheme.colors.gray70,
    },
    tertiary: {
        backgroundColor: CoreTheme.colors.gray80,
        fontColor: CoreTheme.colors.gray10,
        hoverBackgroundColor: CoreTheme.colors.gray100,
    },
};

export const PolymorphicComponent = styled(Slot)<{
    $full: boolean;
    $variant: keyof typeof VARIANTS;
}>`
    ${CommonStyles};
    ${({ $full, $variant }) => css`
        background: ${VARIANTS[$variant].backgroundColor};
        color: ${VARIANTS[$variant].fontColor};
        width: ${!$full ? "max-content" : "100%"};

        &:hover {
            background: ${VARIANTS[$variant].hoverBackgroundColor};
        }
    `}
`;

export const StyledButton = styled.button<{ $full: boolean; $variant: keyof typeof VARIANTS }>`
    ${CommonStyles};
    ${({ $full, $variant }) => css`
        background: ${VARIANTS[$variant].backgroundColor};
        color: ${VARIANTS[$variant].fontColor};
        width: ${!$full ? "max-content" : "100%"};

        &:hover {
            background: ${VARIANTS[$variant].hoverBackgroundColor};
        }
    `}
`;
