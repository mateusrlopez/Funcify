"use client";

import { Overlay as RadixOverlay, Content } from "@radix-ui/react-alert-dialog";
import styled, { css, keyframes } from "styled-components";

const overlayShow = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const contentShow = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

export const Overlay = styled(RadixOverlay)`
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2px);
    position: fixed;
    inset: 0;
    z-index: 9970;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }
`;

export const RadixContent = styled(Content)<{ width: string }>`
    background-color: ${({ theme }) => theme.colors.gray10};
    border-radius: 4px;
    height: max-content;
    box-shadow:
        hsl(206 22% 7% / 35%) 0 10px 38px -10px,
        hsl(206 22% 7% / 20%) 0 10px 20px -15px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: ${({ width }) => width};
    max-width: 1000px;
    max-height: 85vh;
    overflow: hidden;
    z-index: 9999;
    border: 1px solid ${({ theme }) => theme.colors.darkestGray};

    @media (prefers-reduced-motion: no-preference) {
        animation: ${contentShow} 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @media screen and (max-width: 768px) {
        width: calc(100% - 40px);
    }

    &:focus {
        outline: none;
    }
`;

export const ContainerHeader = styled.div`
    ${({ theme }) => css`
        font-size: ${theme.fontSize.md};
        font-weight: ${theme.fontWeight.bold};
        font-family: ${theme.fontFamily.inter};
        color: ${theme.colors.darkestGray};
        margin-bottom: 5px;
        padding: 25px 25px 15px 25px;
        width: 100%;
        height: max-content;
    `}
`;

export const ContainerBody = styled.div`
    padding: 25px 25px;
    width: 100%;
    height: max-content;
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 3px !important;
    }

    &::-webkit-scrollbar-track {
        background: transparent !important;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.darkestGray} !important;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.gray60} !important;
        cursor: pointer;
    }
`;

export const ContainerFooter = styled.div`
    padding: 15px 25px 25px 25px;
    width: 100%;
    height: max-content;

    > button {
        background: transparent;
    }
`;

export const CloseButton = styled.div`
    color: ${({ theme }) => theme.colors.darkestGray};
    transition: 0.3s ease-out;
    cursor: pointer;
    position: absolute;
    right: 25px;
    top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        transform: scale(1.1);
        color: ${({ theme }) => theme.colors.black};
        transition: 0.3s ease-in;
    }
`;
