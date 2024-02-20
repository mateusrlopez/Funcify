"use client";

import styled, { css, keyframes } from "styled-components";

const DiamondLoader = keyframes`
    0%  ,10% {
        transform: translate(-45px , -45px) rotate(-45deg)
}
    90% , 100% {
        transform: translate(0px , 0px) rotate(-45deg)
}
`;

export const Loader = styled.span`
    ${({ theme }) => css`
        position: relative;
        width: 45px;
        height: 45px;
        background-color: ${theme.colors.gray50};
        transform: rotate(45deg);
        overflow: hidden;

        &:after {
            content: "";
            position: absolute;
            inset: 5px;
            margin: auto;
            background: ${theme.colors.gray30};
        }

        &:before {
            content: "";
            position: absolute;
            inset: -15px;
            margin: auto;
            background: ${theme.colors.darkestGray};
            animation: ${DiamondLoader} 1.2s linear infinite;
        }
    `}
`;
