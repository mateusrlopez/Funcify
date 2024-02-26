"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

export const Root = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

export const Title = styled.h1`
    ${({ theme }) => css`
        color: ${theme.colors.darkestGray};
        font-size: ${theme.fontSize.xl};
        font-weight: ${theme.fontWeight.bold};
    `}
`;

export const Message = styled.p`
    ${({ theme }) => css`
        color: ${theme.colors.darkestGray};
        font-size: ${theme.fontSize.default};
        font-weight: ${theme.fontWeight.medium};
    `}
`;

export const StyledLink = styled(Link)`
    ${({ theme }) => css`
        all: unset;
        color: ${theme.colors.gray80};
        font-size: ${theme.fontSize.default};
        font-weight: ${theme.fontWeight.medium};
        user-select: none;

        &:hover {
            color: ${theme.colors.gray60};
            cursor: pointer;
        }

        &:focus {
            color: ${theme.colors.darkestGray};
        }
    `}
`;
