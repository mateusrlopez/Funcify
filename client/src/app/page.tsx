"use client";

import { ReactNode } from "react";
import styled from "styled-components";

const Heading = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    padding: 0;
    text-align: center;
`;

const Home = (): ReactNode => {
    return (
        <main>
            <Heading>Initial Project</Heading>
        </main>
    );
};

export default Home;
