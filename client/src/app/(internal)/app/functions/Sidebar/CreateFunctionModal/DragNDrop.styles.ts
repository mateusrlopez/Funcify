"use client";

import styled, { css } from "styled-components";

export const DragNDropArea = styled.div`
    ${({ theme }) => css`
        width: 100%;
        height: 100px;
        border: 1px dashed ${theme.colors.darkestGray};
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${theme.fontSize.sm};
        font-weight: ${theme.fontWeight.regular};
        font-family: ${theme.fontFamily.inter};
        color: ${theme.colors.darkestGray};
        cursor: pointer;
        margin-top: 10px;
    `}
`;
