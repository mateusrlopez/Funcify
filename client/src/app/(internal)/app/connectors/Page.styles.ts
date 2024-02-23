"use client";

import styled from "styled-components";

export const Root = styled.section`
    width: 100%;
    height: calc(100vh - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 1200px;
    height: calc(100vh - 40px);
    border-left: 1px solid ${({ theme }) => theme.colors.darkestGray};
    border-right: 1px solid ${({ theme }) => theme.colors.darkestGray};
`;
