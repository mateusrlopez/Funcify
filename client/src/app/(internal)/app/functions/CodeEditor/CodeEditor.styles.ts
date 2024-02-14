"use client";

import styled, { css } from "styled-components";

export const Root = styled.section`
    flex-grow: 1;
    height: calc(100vh - 102px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

export const Toolbar = styled.div`
    width: 100%;
    height: 40px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkestGray};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 0 10px;
`;

export const LastUpdate = styled.span`
    ${({ theme }) => css`
        color: ${theme.colors.gray100};
        font-size: ${theme.fontSize.sm};
        font-weight: ${theme.fontWeight.regular};
        font-family: ${theme.fontFamily.inter};
        letter-spacing: ${theme.letterSpacing.sm};
    `}
`;

export const Settings = styled.button`
    ${({ theme }) => css`
        all: unset;
        width: 26px;
        height: 26px;
        border: 1px solid ${theme.colors.darkestGray};
        background-color: ${theme.colors.gray20};
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
            background-color: ${theme.colors.gray40};
        }

        &:focus {
            outline: 1px solid ${theme.colors.darkestGray};
        }
    `};
`;
