"use client";

import styled, { css } from "styled-components";

export const Root = styled.main`
    width: 100%;
    height: calc(100vh - 102px);
    display: grid;
    grid-template-columns: 300px 1fr 300px;
    grid-template-rows: 40px 1fr 62px;
    grid-column-gap: 0;
    grid-row-gap: 0;
`;

export const NullValueMessageContainer = styled.div`
    ${({ theme }) => css`
        width: 100%;
        height: calc(100vh - 102px);
        display: flex;
        flex-direction: column;
        gap: 30px;
        align-items: center;
        justify-content: center;
        color: ${theme.colors.gray70};

        > h2 {
            font-size: ${theme.fontSize.lg};
            font-weight: ${theme.fontWeight.bold};
            text-align: center;
            line-height: 1.3;
        }
    `}
`;
