"use client";

import styled, { css } from "styled-components";

export const Root = styled.section`
    ${({ theme }) => css`
        width: 100%;
        height: calc(100vh - 102px);
        background: ${theme.colors.gray20};
        border-left: 1px solid ${theme.colors.darkestGray};
        border-bottom: 1px solid ${theme.colors.darkestGray};
        display: flex;
        flex-direction: column;
    `}
`;

export const Header = styled.div`
    padding: 0 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkestGray};
`;

export const Title = styled.span`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        height: 39px;
        width: max-content;
        font-size: ${theme.fontSize.default};
        font-weight: ${theme.fontWeight.bold};
        font-family: ${theme.fontFamily.inter};
        color: ${theme.colors.darkestGray};
        user-select: none;
    `}
`;

export const Body = styled.div`
    width: 100%;
    height: calc(100% - 56px);
`;

export const DatasourceButton = styled.button`
    ${({ theme }) => css`
        all: unset;
        width: 100%;
        height: 40px;
        background-color: ${theme.colors.darkestGray};
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 10px;
        font-size: ${theme.fontSize.default};
        font-weight: ${theme.fontWeight.bold};
        font-family: ${theme.fontFamily.inter};
        color: ${theme.colors.gray10};
        cursor: pointer;

        &:hover {
            background-color: ${theme.colors.black};
        }
    `}
`;

export const DatasourceContent = styled.div<{ $visible: boolean }>`
    width: 100%;
    height: ${({ $visible }) => ($visible ? "calc(100% - 63px)" : "0")};
    visibility: ${({ $visible }) => ($visible ? "calc(100% - 80px)" : "0")};
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.gray10};
`;

export const Form = styled.form`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;

    & > :last-child {
        margin-top: 40px;
    }
`;

export const DatasourceSectionTitle = styled.span`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: ${theme.fontSize.default};
        font-weight: ${theme.fontWeight.bold};
        font-family: ${theme.fontFamily.inter};
        color: ${theme.colors.gray80};
        user-select: none;
        margin-bottom: 5px;
    `}
`;
