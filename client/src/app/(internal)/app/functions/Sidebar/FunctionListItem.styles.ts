"use client";

import styled, { css } from "styled-components";

export const Root = styled.li`
    ${({ theme }) => css`
        all: unset;
        width: 100%;
        margin-left: 3px;
        padding: 10px 7px 10px 7px;
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
        gap: 10px;

        > span {
            width: calc(100% - 28px);
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: ${theme.colors.gray90};
        }

        &:hover {
            background: ${theme.colors.gray40};
        }

        &[data-selected="true"] {
            > span {
                font-weight: ${theme.fontWeight.bold};
                color: ${theme.colors.darkestGray};
            }
        }
    `};
`;
