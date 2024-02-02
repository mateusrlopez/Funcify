"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as LabelPrimitive from "@radix-ui/react-label";
import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 99;
    width: max-content;
`;

export const CheckboxField = styled(CheckboxPrimitive.Root)`
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.gray60};
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 3px;
`;

export const CheckboxIndicator = styled(CheckboxPrimitive.Indicator)`
    color: ${({ theme }) => theme.colors.gray80};
    margin-top: 3px;
`;

export const Label = styled(LabelPrimitive.Label)`
    ${({ theme }) => css`
        color: ${theme.colors.gray80};
        font-size: ${theme.fontSize.sm};
        font-family: ${theme.fontFamily.inter};
        font-weight: ${theme.fontWeight.regular};
        line-height: ${theme.lineHeight.sm};
        letter-spacing: ${theme.letterSpacing.sm};
    `};
`;
