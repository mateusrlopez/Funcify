"use client";

import styled, { css } from "styled-components";

export const Root = styled.aside`
    ${({ theme }) => css`
        width: 100%;
        height: calc(100vh - 80px);
        background: ${theme.colors.gray40};
        border-right: 1px solid ${theme.colors.lighterCyan};
    `};
`;
