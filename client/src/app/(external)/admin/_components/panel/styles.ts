"use client";

import styled from "styled-components";

export const Root = styled.main`
    width: 800px;
    min-height: 450px;
    background: ${({ theme }) => theme.colors.gray10};
    border-bottom: 7px solid ${({ theme }) => theme.colors.lighterCyan};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.gray30};
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 850px) {
        width: 100%;
        display: block;
    }
`;

export const Image = styled.div`
    width: 100%;
    height: 100%;
    background-color: #d9d9e0;
    background-image: url("/assets/images/login-illustration.png");
    background-size: cover;
    background-position: center;
    filter: opacity(60%);

    @media (max-width: 850px) {
        display: none;
    }
`;

export const Content = styled.div`
    width: 100%;
    height: 100%;
`;
