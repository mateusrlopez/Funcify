"use client";

import styled from "styled-components";

export const Root = styled.main`
    width: 100%;
    height: calc(100vh - 80px);
    display: grid;
    grid-template-columns: 250px 1fr 400px;
    grid-template-rows: 40px 1fr 40px;
    grid-column-gap: 0;
    grid-row-gap: 0;
`;
