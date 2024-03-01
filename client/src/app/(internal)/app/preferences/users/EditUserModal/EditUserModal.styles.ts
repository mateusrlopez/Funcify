"use client";

import styled, { css } from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const ErrorMessage = styled.span`
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
    `}
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
