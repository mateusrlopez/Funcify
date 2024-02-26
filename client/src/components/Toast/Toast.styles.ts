"use client";

import * as Toast from "@radix-ui/react-toast";
import styled, { css } from "styled-components";

export const ToastProvider = styled(Toast.Provider)``;

export const ToastRoot = styled(Toast.Root)`
    ${({ theme }) => css`
        background-color: ${theme.colors.lighterGray};
        font-family: ${theme.fontFamily.inter};
        border: 1px solid ${theme.colors.darkestGray};
        padding: 15px 15px;
        border-radius: 4px;
        box-shadow:
            hsl(206 22% 7% / 35%) 0 10px 38px -10px,
            hsl(206 22% 7% / 20%) 0 10px 20px -15px;
        display: flex;
        align-items: center;
        z-index: 999;

        &[data-state="open"] {
            animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        &[data-state="closed"] {
            animation: hide 100ms ease-in;
        }

        &[data-swipe="move"] {
            transform: translateX(25);
        }

        &[data-swipe="cancel"] {
            transform: translateX(0);
            transition: transform 200ms ease-out;
        }

        &[data-swipe="end"] {
            animation: swipeOut 100ms ease-out;
        }

        @keyframes hide {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }

        @keyframes slideIn {
            from {
                transform: translateX(calc(100% + 25px));
            }
            to {
                transform: translateX(0);
            }
        }

        @keyframes swipeOut {
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(calc(100% + 25px));
            }
        }
    `};
`;

export const ToastIcon = styled.div`
    width: 40px;
    height: 30px;
    display: flex;
    align-items: center;
`;

export const ToastTitle = styled(Toast.Title)`
    ${({ theme }) => css`
        color: ${theme.colors.darkestGray};
        font-family: ${theme.fontFamily.inter};
        font-size: ${theme.fontSize.default};
        font-weight: ${theme.fontWeight.bold};
        line-height: ${theme.fontWeight.default};
    `};
`;

export const ToastDescription = styled(Toast.Description)`
    ${({ theme }) => css`
        color: ${theme.colors.gray80};
        font-family: ${theme.fontFamily.inter};
        font-size: ${theme.fontSize.sm};
        font-weight: ${theme.fontWeight.regular};
        line-height: 20px;
    `};
`;

export const ToastAction = styled(Toast.Action)``;

export const ToastViewport = styled(Toast.Viewport)`
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 500px;
    max-width: 100vw;
    margin: 0;
    list-style: none;
    z-index: 9999;
    outline: none;
    padding: 25px;
`;

export const ToastClose = styled(Toast.Close)`
    all: unset;
    width: 50px;
    height: 30px;
    background: none;
    display: flex;
    align-items: center;
    justify-content: end;
`;
