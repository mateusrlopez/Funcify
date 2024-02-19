"use client";

import styled, { css } from "styled-components";

export const Root = styled.button`
    ${({ theme }) => css`
        width: 40px;
        height: 39px;
        border: none;
        background: ${theme.colors.gray50};
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: ${theme.colors.darkestGray};

        &:hover {
            background-color: ${theme.colors.gray60};
        }

        &:focus {
            background-color: ${theme.colors.gray70};
        }
    `}
`;
