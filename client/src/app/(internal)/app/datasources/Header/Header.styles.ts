"use client";

import styled, { css } from "styled-components";

export const Root = styled.div`
    width: 100%;
    height: 60px;
    padding: 0 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkestGray};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SearchInput = styled.div`
    ${({ theme }) => css`
        width: 100%;
        height: 42px;
        display: flex;
        align-items: center;
        gap: 12px;
        background-color: ${theme.colors.gray10};
        border: 1px solid ${theme.colors.gray50};
        padding: 0 12px;
        resize: none;
        flex-grow: 1;
        border-radius: 4px;

        > svg {
            color: ${theme.colors.gray70};
        }

        > input {
            all: unset;
            width: 100%;
            height: 100%;
            padding: 10px 0;
            color: ${theme.colors.gray100};
            font-size: ${theme.fontSize.default};
            font-weight: ${theme.fontWeight.regular};
            font-family: ${theme.fontFamily.inter};
            letter-spacing: ${theme.letterSpacing.default};
        }

        &:focus-within {
            outline: none;
            border: 1px solid ${theme.colors.darkestGray};

            > svg {
                color: ${theme.colors.gray100};
            }
        }

        &::placeholder {
            font-weight: ${theme.fontWeight.regular};
            font-size: ${theme.fontSize.default};
            color: ${theme.colors.gray70};
        }
    `}
`;
