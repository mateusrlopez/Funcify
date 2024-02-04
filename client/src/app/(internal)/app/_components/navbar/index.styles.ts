"use client";

import styled from "styled-components";

export const Root = styled.nav`
    width: 100%;
    height: 40px;
    background: ${({ theme }) => theme.colors.gray40};
    border-bottom: 1px solid ${({ theme }) => theme.colors.lighterCyan};
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Brand = styled.span`
    display: flex;
    align-items: center;
    height: 40px;
    padding-top: 5px;
`;

export const Group = styled.div`
    width: max-content;
    display: flex;
    align-items: center;
    gap: 30px;
`;
